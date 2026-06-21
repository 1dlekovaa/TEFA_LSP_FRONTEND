export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth()

  if (user.value?.role !== 'administrator') {
    return navigateTo('/dashboard')
  }
})
