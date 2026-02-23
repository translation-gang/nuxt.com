export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined' && typeof (window as any).ym !== 'function') {
    (window as any).ym = () => {}
  }
})
