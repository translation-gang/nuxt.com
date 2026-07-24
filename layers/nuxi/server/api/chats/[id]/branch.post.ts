import { createError } from 'evlog'
import { eq, asc } from 'drizzle-orm'
import type { ExtractTablesWithRelations, InferSelectModel } from 'drizzle-orm'
import type { LibSQLTransaction } from 'drizzle-orm/libsql'
import { z } from 'zod'

type Tx = LibSQLTransaction<typeof schema, ExtractTablesWithRelations<typeof schema>>

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.uuid()
  }).parse)

  const { messageId } = await readValidatedBody(event, z.object({
    messageId: z.string().min(1)
  }).parse)

  const log = useLogger(event)
  log.set({
    user: { id: user.id, authenticated: true },
    branch: { sourceChatId: id, messageId }
  })

  const chat = await db.query.chats.findFirst({
    where: () => eq(schema.chats.id, id),
    with: {
      messages: {
        orderBy: () => asc(schema.messages.createdAt)
      }
    }
  })

  if (!chat) {
    throw createError({ message: 'Чат не найден', status: 404 })
  }
  if (chat.userId !== user.id) {
    throw createError({ message: 'Чат не найден', status: 404, why: 'Ответвление доступно только для ваших чатов.' })
  }

  type MessageRow = InferSelectModel<typeof schema.messages>

  const cutIndex = chat.messages.findIndex((m: MessageRow) => m.id === messageId)
  if (cutIndex === -1) {
    throw createError({ message: 'Сообщение не найдено в чате', status: 404, why: 'messageId отсутствует в этом чате.' })
  }
  const messagesToCopy = chat.messages.slice(0, cutIndex + 1)

  const newChatId = crypto.randomUUID()

  await db.transaction(async (tx: Tx) => {
    await tx.insert(schema.chats).values({
      id: newChatId,
      userId: chat.userId,
      title: chat.title ? `Branch of ${chat.title}` : null,
      visibility: 'private'
    })

    if (messagesToCopy.length) {
      await tx.insert(schema.messages).values(
        messagesToCopy.map((m: MessageRow) => ({
          id: crypto.randomUUID(),
          chatId: newChatId,
          role: m.role,
          parts: m.parts as unknown[],
          createdAt: m.createdAt
        }))
      )
    }
  })

  log.set({ branch: { newChatId, copiedMessages: messagesToCopy.length } })

  return { id: newChatId }
})
