import { Resend } from 'resend'
import { z } from 'zod'

export default eventHandler(async (event) => {
  const { email, confirmation } = await readValidatedBody(event, z.object({
    email: z.string().email().trim(),
    confirmation: z.string()
  }).parse)

  const { apiKey, audienceId } = useRuntimeConfig(event).resend
  if (!apiKey || !audienceId) {
    throw createError({
      statusCode: 500,
      message: 'Не настроена конфигурация Resend'
    })
  }

  if (generateConfirmation(event, email) !== confirmation) {
    throw createError({
      statusCode: 400,
      message: 'Код подтверждения недействителен.'
    })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.contacts.create({
    email,
    audienceId
  })

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message || 'Не удалось оформить подписку. Попробуйте снова.'
    })
  }

  return { ok: true }
})
