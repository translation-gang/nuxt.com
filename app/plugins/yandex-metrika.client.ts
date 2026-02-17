declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

const YANDEX_METRIKA_ID = 106876068
const SCRIPT_URL = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`

export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  const route = useRoute()
  const nuxtApp = useNuxtApp()

  const initAndHit = () => {
    if (typeof window.ym !== 'function') return
    window.ym(YANDEX_METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true
    })
    window.ym(YANDEX_METRIKA_ID, 'hit', route.path)
  }

  if (document.querySelector('script[src*="mc.yandex.ru/metrika/tag.js"]')) {
    onNuxtReady(initAndHit)
  } else {
    const script = document.createElement('script')
    script.async = true
    script.src = SCRIPT_URL
    script.onload = initAndHit
    document.head.appendChild(script)
  }

  nuxtApp.hooks.hook('page:finish', () => {
    if (typeof window.ym === 'function') {
      window.ym(YANDEX_METRIKA_ID, 'hit', route.path)
    }
  })
})
