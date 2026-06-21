interface AuthUser {
  id: number
  name: string
  username: string
  role: 'administrator' | 'asesor' | 'asesi' | 'validator'
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const token = useCookie<string | null>('auth-token', { default: () => null })

  async function login(username: string, password: string) {
    const api = useApi()
    const response = await api<{ success: boolean; data: { user: AuthUser; token: string }; message?: string }>(
      '/login',
      { method: 'POST', body: { username, password } },
    )

    token.value = response.data.token
    user.value = response.data.user

    return response.data.user
  }

  async function logout() {
    const api = useApi()
    try {
      await api('/logout', { method: 'POST' })
    } finally {
      token.value = null
      user.value = null
    }
  }

  async function fetchMe() {
    if (!token.value) return null

    const api = useApi()
    const response = await api<{ success: boolean; data: AuthUser }>('/me')
    user.value = response.data
    return response.data
  }

  return { user, token, login, logout, fetchMe }
}
