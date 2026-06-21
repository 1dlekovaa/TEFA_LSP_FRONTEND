export function useStorageUrl(path?: string | null) {
  if (!path) return null

  const config = useRuntimeConfig()
  const base = config.public.apiBase.replace(/\/api\/?$/, '')

  return `${base}/storage/${path}`
}
