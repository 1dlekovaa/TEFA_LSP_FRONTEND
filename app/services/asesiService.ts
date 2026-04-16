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

const normalizeAsesi = (item: any): Asesi => ({
  id: item.id,
  foto: item.foto || '',
  no_peserta: item.no_peserta || item.noPeserta || '',
  nama_lengkap: item.nama_lengkap || item.nama || '',
  kelas: item.kelas || '',
  tahun_aktif_id: item.tahun_aktif_id || item.tahun_aktif || 0,
  username: item.username || item.user_name || item.akun || '',
  status: item.status || 'nonaktif',
})

const toBackendPayload = (data: Asesi) => ({
  no_peserta: data.no_peserta,
  nama_lengkap: data.nama_lengkap,
  nama: data.nama_lengkap,
  kelas: data.kelas,
  tahun_aktif_id: data.tahun_aktif_id,
  tahun_aktif: data.tahun_aktif_id,
  username: data.username,
  akun: data.username,
  password: data.password,
  status: data.status,
})

export const asesiService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    
    const response = await apiClient.get(`/asesi?${params.toString()}`)

    if (!response.success) return response

    const list = Array.isArray(response.data?.data)
      ? response.data.data.map((item: any) => normalizeAsesi(item))
      : []

    return {
      ...response,
      data: {
        ...response.data,
        data: list,
      },
    }
  },

  async getById(id: number) {
    const response = await apiClient.get(`/asesi/${id}`)

    if (!response.success) return response

    return {
      ...response,
      data: {
        ...response.data,
        data: response.data?.data ? normalizeAsesi(response.data.data) : null,
      },
    }
  },

  async create(data: Asesi) {
    const payload = toBackendPayload(data)

    // If there's a file (foto), use FormData
    if ((data as any).foto instanceof File) {
      const formData = new FormData()
      formData.append('no_peserta', payload.no_peserta)
      formData.append('nama_lengkap', payload.nama_lengkap)
      formData.append('nama', payload.nama)
      formData.append('kelas', payload.kelas)
      formData.append('tahun_aktif_id', payload.tahun_aktif_id.toString())
      formData.append('tahun_aktif', payload.tahun_aktif.toString())
      formData.append('username', payload.username)
      formData.append('akun', payload.akun)
      formData.append('password', payload.password || '')
      formData.append('status', payload.status)
      formData.append('foto', (data as any).foto)
      
      return apiClient.post('/asesi', formData, true)
    }
    
    // Send as JSON if no file
    return apiClient.post('/asesi', payload)
  },

  async update(id: number, data: Asesi) {
    const payload = toBackendPayload(data)

    // If there's a file (foto), use FormData
    if ((data as any).foto instanceof File) {
      const formData = new FormData()
      formData.append('no_peserta', payload.no_peserta)
      formData.append('nama_lengkap', payload.nama_lengkap)
      formData.append('nama', payload.nama)
      formData.append('kelas', payload.kelas)
      formData.append('tahun_aktif_id', payload.tahun_aktif_id.toString())
      formData.append('tahun_aktif', payload.tahun_aktif.toString())
      formData.append('username', payload.username)
      formData.append('akun', payload.akun)
      
      // Only add password if it's provided (not empty)
      if (payload.password) {
        formData.append('password', payload.password)
      }
      
      formData.append('status', payload.status)
      formData.append('foto', (data as any).foto)
      
      return apiClient.put(`/asesi/${id}`, formData, true)
    }
    
    // Prepare data for JSON request (don't send password if empty)
    const updateData = { ...payload }
    if (!updateData.password) {
      delete updateData.password
    }
    
    return apiClient.put(`/asesi/${id}`, updateData)
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
