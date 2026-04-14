import { apiClient } from './api'

export interface Asesor {
  id?: number
  foto?: string
  nama_lengkap: string
  no_met: string
  username: string
  password?: string
  status: 'aktif' | 'nonaktif'
}

export const asesorService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    
    return apiClient.get(`/asesor?${params.toString()}`)
  },

  async getById(id: number) {
    return apiClient.get(`/asesor/${id}`)
  },

  async create(data: Asesor) {
    return apiClient.post('/asesor', data)
  },

  async update(id: number, data: Asesor) {
    return apiClient.put(`/asesor/${id}`, data)
  },

  async delete(id: number) {
    return apiClient.delete(`/asesor/${id}`)
  },

  async import(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return fetch(`${import.meta.env.NUXT_PUBLIC_API_URL}/asesor/import`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  },

  async export() {
    return fetch(`${import.meta.env.NUXT_PUBLIC_API_URL}/asesor/export`).then(res => res.blob())
  },
}
