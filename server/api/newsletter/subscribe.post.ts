import { Resend } from 'resend'
import { z } from 'zod'
import { withQuery, withTrailingSlash } from 'ufo'

export default eventHandler(async (event) => {
  const { email } = await readValidatedBody(event, z.object({
    email: z.string().email().trim()
  }).parse)

  const { apiKey, audienceId } = useRuntimeConfig(event).resend
  if (!apiKey || !audienceId) {
    throw createError({
      statusCode: 500,
      message: 'Не настроена конфигурация Resend'
    })
  }

  const resend = new Resend(apiKey)

  // Check if the user is already subscribed
  const { data: contact } = await resend.contacts.get({ audienceId, id: email })
  if (contact && !contact.unsubscribed) {
    throw createError({
      message: 'Вы уже подписаны на рассылку ❤️',
      statusCode: 400
    })
  }

  const confirmation = generateConfirmation(event, email)
  const origin = import.meta.dev ? getRequestURL(event).origin : 'https://nuxt.com'
  const confirmationURL = withQuery(withTrailingSlash(origin), { email, confirmation })

  const { error } = await resend.emails.send({
    from: 'Nuxt Team <team@newsletter.nuxt.com>',
    to: email,
    subject: 'Подтвердите ваш email',
    template: {
      id: 'confirm-newsletter',
      variables: {
        confirmationURL
      }
    }
  })

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message || 'Не удалось отправить письмо подтверждения. Попробуйте снова.'
    })
  }

  return { ok: true }
})
