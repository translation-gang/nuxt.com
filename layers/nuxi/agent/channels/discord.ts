import { createDiscordAdapter } from '@chat-adapter/discord'
import { createMemoryState } from '@chat-adapter/state-memory'
import { createRedisState } from '@chat-adapter/state-redis'
import type { Message, Thread } from 'chat'
import { defineChannel } from 'eve/channels'
import { chatSdkChannel } from 'eve/channels/chat-sdk'
import { discordUserAuth, isAllowedDiscordChannel } from '../lib/discord-access.js'

const DISCORD_CONTEXT = [
  'The user is talking to Nuxi on Discord, in a thread (like Slack).',
  '**Discord formatting:** Use absolute nuxt.com links (`https://nuxt.com/docs/...`) — root-relative paths do not render as links on Discord. Standard Unicode emojis only (no Slack custom emojis). Never use `show_prompt` here. Keep replies compact — Discord splits messages over 2000 characters.'
]

const discordConfigured = Boolean(process.env.DISCORD_BOT_TOKEN?.trim())
const redisUrl = process.env.REDIS_URL?.trim()

// Durable state needs Redis when Discord actually runs in production.
if (discordConfigured && !redisUrl && process.env.VERCEL_ENV === 'production') {
  throw new Error('[nuxi:discord] REDIS_URL is required in production for durable Chat SDK state')
}

type DiscordBridge = ReturnType<typeof chatSdkChannel<{ discord: ReturnType<typeof createDiscordAdapter> }>>

function createDisabledDiscordBridge(): DiscordBridge {
  console.warn('[nuxi:discord] DISCORD_BOT_TOKEN unset — Discord channel disabled')
  return {
    bot: {
      initialize: async () => undefined,
      getAdapter: () => undefined,
      onNewMention: () => undefined,
      onSubscribedMessage: () => undefined
    },
    channel: defineChannel({}),
    send: async () => {
      throw new Error('[nuxi:discord] Discord channel is not configured')
    }
  } as unknown as DiscordBridge
}

function createDiscordBridge(): DiscordBridge {
  return chatSdkChannel({
    userName: 'Nuxi',
    adapters: {
      // Credentials resolve from DISCORD_BOT_TOKEN, DISCORD_PUBLIC_KEY and
      // DISCORD_APPLICATION_ID env vars on the eve service.
      discord: createDiscordAdapter()
    },
    state: redisUrl ? createRedisState() : createMemoryState(),
    // Keep the Discord principal when a HITL button click resumes a session.
    resolveInputAuth: event => discordUserAuth(event.user?.userId, event.user?.userName, event.thread?.channelId)
  })
}

export const { bot, channel, send } = discordConfigured
  ? createDiscordBridge()
  : createDisabledDiscordBridge()

const THREAD_TITLE_MAX_LENGTH = 90

function shouldDispatch(thread: Thread, message: Message): boolean {
  if (message.author.isMe || message.author.isBot === true) return false
  const allowed = isAllowedDiscordChannel(thread.channelId)
  if (!allowed) {
    console.warn('[nuxi:discord] dropped mention: channel not in DISCORD_ALLOWED_CHANNELS', { channelId: thread.channelId })
  }
  return allowed
}

function threadTitleFromMessage(text: string): string | undefined {
  const cleaned = text.replace(/<@[!&]?\d+>/g, '').replace(/\s+/g, ' ').trim()
  if (!cleaned) return undefined
  return cleaned.length > THREAD_TITLE_MAX_LENGTH
    ? `${cleaned.slice(0, THREAD_TITLE_MAX_LENGTH).trimEnd()}…`
    : cleaned
}

if (discordConfigured) {
  bot.onNewMention(async (thread: Thread, message: Message) => {
    if (!shouldDispatch(thread, message)) return
    await thread.subscribe()

    const title = threadTitleFromMessage(message.text)
    if (title) {
      void bot.getAdapter('discord')?.setThreadTitle(thread.id, title)
        .catch((error: unknown) => console.warn('[nuxi:discord] setThreadTitle failed', error))
    }

    await send(
      { message: message.text, context: DISCORD_CONTEXT },
      { thread, auth: discordUserAuth(message.author.userId, message.author.userName, thread.channelId) }
    )
  })

  bot.onSubscribedMessage(async (thread: Thread, message: Message) => {
    if (!shouldDispatch(thread, message)) return
    await send(
      { message: message.text },
      { thread, auth: discordUserAuth(message.author.userId, message.author.userName, thread.channelId) }
    )
  })
}

export default channel
