import { apiClient } from './api'

export type UserLevel = 'Administrator' | 'Asesor' | 'Asesi' | 'Validator'

export interface User {
  id?: number
  nama_lengkap: string
  username: string
  level: UserLevel
  password?: string
  status: 'aktif' | 'nonaktif'
}

export const userService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '', level: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    if (level) params.append('level', level)
    
    return apiClient.get(`/users?${params.toString()}`)
  },

  async getById(id: number) {
    return apiClient.get(`/users/${id}`)
  },

  async create(data: User) {
    return apiClient.post('/users', data)
  },

  async update(id: number, data: User) {
    return apiClient.put(`/users/${id}`, data)
  },

  async delete(id: number) {
    return apiClient.delete(`/users/${id}`)
  },

  async resetPassword(id: number, password: string) {
    return apiClient.put(`/users/${id}/reset-password`, { password })
  },
}
