export function toFormData(payload: Record<string, any>, methodOverride?: string) {
  const formData = new FormData()

  if (methodOverride) {
    formData.append('_method', methodOverride)
  }

  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) continue
    formData.append(key, value)
  }

  return formData
}
