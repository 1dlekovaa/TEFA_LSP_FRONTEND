import { apiClient } from './api'

export type JenisTUK = 'Sewaktu' | 'Mandiri' | 'Tempat Kerja'

export interface TUK {
  id?: number
  foto?: string
  nama_tuk: string
  jenis_tuk: JenisTUK
  deskripsi?: string
}

export const tukService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    
    return apiClient.get(`/tuk?${params.toString()}`)
  },

  async getById(id: number) {
    return apiClient.get(`/tuk/${id}`)
  },

  async create(data: TUK) {
    return apiClient.post('/tuk', data)
  },

  async update(id: number, data: TUK) {
    return apiClient.put(`/tuk/${id}`, data)
  },

  async delete(id: number) {
    return apiClient.delete(`/tuk/${id}`)
  },
}
