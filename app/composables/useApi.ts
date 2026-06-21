export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')

  return $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
  })
}
