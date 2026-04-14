import { ref } from 'vue'

export function useLoading() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  }
}
