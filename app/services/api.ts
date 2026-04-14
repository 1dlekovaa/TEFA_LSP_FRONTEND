// Base API configuration
const BASE_URL = import.meta.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface RequestConfig {
  method?: string
  headers?: Record<string, string>
  body?: any
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl
  }

  async request(endpoint: string, config: RequestConfig = {}) {
    const { method = 'GET', headers = {}, body } = config
    
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    }

    const fetchOptions: any = {
      method,
      headers: defaultHeaders,
    }

    if (body && (method === 'POST' || method === 'PUT')) {
      fetchOptions.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(url, fetchOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error: any) {
      console.error('API Error:', error)
      return { success: false, error: error.message }
    }
  }

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' })
  }

  post(endpoint: string, body: any) {
    return this.request(endpoint, { method: 'POST', body })
  }

  put(endpoint: string, body: any) {
    return this.request(endpoint, { method: 'PUT', body })
  }

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
