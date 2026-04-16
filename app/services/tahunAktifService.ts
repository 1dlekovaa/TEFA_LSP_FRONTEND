import { apiClient } from './api'

export interface TahunAktif {
  id?: number
  tahun: string
  status: 'aktif' | 'nonaktif'
}

// Mock data untuk development (will be replaced by real API)
const mockTahunAktif: TahunAktif[] = [
  { id: 1, tahun: '2023', status: 'nonaktif' },
  { id: 2, tahun: '2024', status: 'aktif' },
  { id: 3, tahun: '2025', status: 'aktif' },
]

export const tahunAktifService = {
  async getAll() {
    try {
      const response = await apiClient.get('/tahun-aktif')
      console.log('Tahun Aktif API response:', response)
      
      // If successful, return real data
      if (response.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
        return response
      }
      
      // If failed or empty, return mock data as fallback
      console.log('Tahun Aktif: Using mock data (API failed or empty)')
      return { 
        success: true, 
        data: { data: mockTahunAktif }
      }
    } catch (err) {
      // Return mock data on error
      console.log('Tahun Aktif API error, using mock data:', err)
      return { 
        success: true, 
        data: { data: mockTahunAktif }
      }
    }
  },

  async getById(id: number) {
    try {
      const response = await apiClient.get(`/tahun-aktif/${id}`)
      if (response.success) {
        return response
      }
      const found = mockTahunAktif.find(t => t.id === id)
      return { 
        success: !!found, 
        data: { data: found },
        error: found ? undefined : 'Tahun aktif tidak ditemukan'
      }
    } catch (err) {
      const found = mockTahunAktif.find(t => t.id === id)
      return { 
        success: !!found, 
        data: { data: found },
        error: found ? undefined : 'Tahun aktif tidak ditemukan'
      }
    }
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
