import { apiClient } from './api'

export interface Asesi {
  id?: number
  foto?: string
  no_peserta: string
  nama_lengkap: string
  kelas: string
  tahun_aktif_id: number
  username: string
  password?: string
  status: 'aktif' | 'nonaktif'
}

export const asesiService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    
    return apiClient.get(`/asesi?${params.toString()}`)
  },

  async getById(id: number) {
    return apiClient.get(`/asesi/${id}`)
  },

  async create(data: Asesi) {
    return apiClient.post('/asesi', data)
  },

  async update(id: number, data: Asesi) {
    return apiClient.put(`/asesi/${id}`, data)
  },

  async delete(id: number) {
    return apiClient.delete(`/asesi/${id}`)
  },

  async import(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    return fetch(`${import.meta.env.NUXT_PUBLIC_API_URL}/asesi/import`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  },

  async export() {
    return fetch(`${import.meta.env.NUXT_PUBLIC_API_URL}/asesi/export`).then(res => res.blob())
  },
}
