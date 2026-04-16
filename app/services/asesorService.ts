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

const normalizeAsesor = (item: any): Asesor => ({
  id: item.id,
  foto: item.foto || '',
  nama_lengkap: item.nama_lengkap || '',
  no_met: item.no_met || item.no_MET || '',
  username: item.username || item.user_name || item.akun || '',
  status: item.status || 'nonaktif',
})

const toBackendPayload = (data: Asesor) => ({
  nama_lengkap: data.nama_lengkap,
  no_met: data.no_met,
  no_MET: data.no_met,
  username: data.username,
  akun: data.username,
  password: data.password,
  status: data.status,
})

export const asesorService = {
  async getAll(page: number = 1, perPage: number = 10, search: string = '') {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('per_page', perPage.toString())
    if (search) params.append('search', search)
    
    const response = await apiClient.get(`/asesor?${params.toString()}`)

    if (!response.success) return response

    const list = Array.isArray(response.data?.data)
      ? response.data.data.map((item: any) => normalizeAsesor(item))
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
    const response = await apiClient.get(`/asesor/${id}`)

    if (!response.success) return response

    return {
      ...response,
      data: {
        ...response.data,
        data: response.data?.data ? normalizeAsesor(response.data.data) : null,
      },
    }
  },

  async create(data: Asesor) {
    const payload = toBackendPayload(data)

    // If there's a file (foto), use FormData
    if ((data as any).foto instanceof File) {
      const formData = new FormData()
      formData.append('nama_lengkap', payload.nama_lengkap)
      formData.append('no_met', payload.no_met)
      formData.append('no_MET', payload.no_MET)
      formData.append('username', payload.username)
      formData.append('akun', payload.akun)
      formData.append('password', payload.password || '')
      formData.append('status', payload.status)
      formData.append('foto', (data as any).foto)
      
      return apiClient.post('/asesor', formData, true)
    }
    
    // Send as JSON if no file
    return apiClient.post('/asesor', payload)
  },

  async update(id: number, data: Asesor) {
    const payload = toBackendPayload(data)

    // If there's a file (foto), use FormData
    if ((data as any).foto instanceof File) {
      const formData = new FormData()
      formData.append('nama_lengkap', payload.nama_lengkap)
      formData.append('no_met', payload.no_met)
      formData.append('no_MET', payload.no_MET)
      formData.append('username', payload.username)
      formData.append('akun', payload.akun)
      
      // Only add password if it's provided (not empty)
      if (payload.password) {
        formData.append('password', payload.password)
      }
      
      formData.append('status', payload.status)
      formData.append('foto', (data as any).foto)
      
      return apiClient.put(`/asesor/${id}`, formData, true)
    }
    
    // Prepare data for JSON request (don't send password if empty)
    const updateData = { ...payload }
    if (!updateData.password) {
      delete updateData.password
    }
    
    return apiClient.put(`/asesor/${id}`, updateData)
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
