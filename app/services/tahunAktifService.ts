import { apiClient } from './api'

export interface TahunAktif {
  id?: number
  tahun: string
  status: 'aktif' | 'nonaktif'
}

export const tahunAktifService = {
  async getAll() {
    return apiClient.get('/tahun-aktif')
  },

  async getById(id: number) {
    return apiClient.get(`/tahun-aktif/${id}`)
  },

  async create(data: TahunAktif) {
    return apiClient.post('/tahun-aktif', data)
  },

  async update(id: number, data: TahunAktif) {
    return apiClient.put(`/tahun-aktif/${id}`, data)
  },

  async delete(id: number) {
    return apiClient.delete(`/tahun-aktif/${id}`)
  },
}
