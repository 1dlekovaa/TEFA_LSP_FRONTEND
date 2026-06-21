export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") return;

  const { user, token, fetchMe, logout } = useAuth();

  if (!token.value) {
    return navigateTo("/login");
  }

  if (!user.value) {
    try {
      await fetchMe();
    } catch {
      await logout();
      return navigateTo("/login");
    }
  }
});
