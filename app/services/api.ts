// Base API configuration
const BASE_URL = import.meta.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface RequestConfig {
  method?: string
  headers?: Record<string, string>
  body?: any
  isFormData?: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl
  }

  async request(endpoint: string, config: RequestConfig = {}) {
    const { method = 'GET', headers = {}, body, isFormData = false } = config
    
    const url = `${this.baseUrl}${endpoint}`
    
    const fetchOptions: any = {
      method,
      headers,
    }

    // Handle FormData (for file uploads)
    if (isFormData && body instanceof FormData) {
      fetchOptions.body = body
      // Don't set Content-Type header for FormData, browser will set it with boundary
      // Only set custom headers, let browser set Content-Type
      fetchOptions.headers = headers
    } else {
      // Handle JSON
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      }
      fetchOptions.headers = defaultHeaders

      if (body && (method === 'POST' || method === 'PUT')) {
        fetchOptions.body = JSON.stringify(body)
      }
    }

    try {
      const response = await fetch(url, fetchOptions)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error: any) {
      console.error(`API Error [${method}] ${endpoint}:`, error.message)
      return { success: false, error: error.message }
    }
  }

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' })
  }

  post(endpoint: string, body: any, isFormData: boolean = false) {
    return this.request(endpoint, { method: 'POST', body, isFormData })
  }

  put(endpoint: string, body: any, isFormData: boolean = false) {
    return this.request(endpoint, { method: 'PUT', body, isFormData })
  }

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
