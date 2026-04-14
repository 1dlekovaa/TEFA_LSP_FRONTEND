import { apiClient } from './api'

export const dashboardService = {
  async getStats() {
    return apiClient.get('/dashboard')
  },
}
