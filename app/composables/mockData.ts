// Mock data untuk testing
// Gunakan ini di development/testing untuk mock API responses

export const mockDashboardData = {
  asesi: 64,
  asesor: 12,
  user: 28,
  skema: 5,
}

export const mockAsesorList = [
  {
    id: 1,
    nama_lengkap: 'Asesor 1',
    no_met: 'MET0001',
    username: 'asesor_data_1',
    status: 'aktif' as const,
  },
  {
    id: 2,
    nama_lengkap: 'Asesor 2',
    no_met: 'MET0002',
    username: 'asesor_data_2',
    status: 'aktif' as const,
  },
  {
    id: 3,
    nama_lengkap: 'Asesor 3',
    no_met: 'MET0003',
    username: 'asesor_data_3',
    status: 'nonaktif' as const,
  },
  {
    id: 4,
    nama_lengkap: 'Asesor 4',
    no_met: 'MET0004',
    username: 'asesor_data_4',
    status: 'aktif' as const,
  },
  {
    id: 5,
    nama_lengkap: 'Asesor 5',
    no_met: 'MET0005',
    username: 'asesor_data_5',
    status: 'nonaktif' as const,
  },
]

export const mockAsesiList = [
  {
    id: 1,
    no_peserta: 'PST0001',
    nama_lengkap: 'Asesi Peserta 1',
    kelas: '10 A',
    tahun_aktif_id: 1,
    username: 'asesi_data_1',
    status: 'aktif' as const,
  },
  {
    id: 2,
    no_peserta: 'PST0002',
    nama_lengkap: 'Asesi Peserta 2',
    kelas: '10 B',
    tahun_aktif_id: 1,
    username: 'asesi_data_2',
    status: 'aktif' as const,
  },
  {
    id: 3,
    no_peserta: 'PST0003',
    nama_lengkap: 'Asesi Peserta 3',
    kelas: '10 A',
    tahun_aktif_id: 1,
    username: 'asesi_data_3',
    status: 'nonaktif' as const,
  },
  {
    id: 4,
    no_peserta: 'PST0004',
    nama_lengkap: 'Asesi Peserta 4',
    kelas: '11 A',
    tahun_aktif_id: 1,
    username: 'asesi_data_4',
    status: 'aktif' as const,
  },
  {
    id: 5,
    no_peserta: 'PST0005',
    nama_lengkap: 'Asesi Peserta 5',
    kelas: '11 B',
    tahun_aktif_id: 1,
    username: 'asesi_data_5',
    status: 'aktif' as const,
  },
]

export const mockUserList = [
  {
    id: 1,
    nama_lengkap: 'Administrator',
    username: 'admin',
    level: 'Administrator' as const,
    status: 'aktif' as const,
  },
  {
    id: 2,
    nama_lengkap: 'Guru Asesor',
    username: 'asesor1',
    level: 'Asesor' as const,
    status: 'aktif' as const,
  },
  {
    id: 3,
    nama_lengkap: 'Siswa Asesi',
    username: 'asesi1',
    level: 'Asesi' as const,
    status: 'aktif' as const,
  },
  {
    id: 4,
    nama_lengkap: 'Validator',
    username: 'validator1',
    level: 'Validator' as const,
    status: 'aktif' as const,
  },
]

export const mockTukList = [
  {
    id: 1,
    nama_tuk: 'TUK Sekolah Pusat',
    jenis_tuk: 'Sewaktu' as const,
    deskripsi: 'Tempat Uji Kompetensi di sekolah utama',
  },
  {
    id: 2,
    nama_tuk: 'TUK Industri Partner',
    jenis_tuk: 'Tempat Kerja' as const,
    deskripsi: 'Tempat Uji Kompetensi di industri partner',
  },
  {
    id: 3,
    nama_tuk: 'TUK Mandiri Cabang',
    jenis_tuk: 'Mandiri' as const,
    deskripsi: 'Tempat Uji Kompetensi mandiri di cabang',
  },
]

export const mockTahunAktifList = [
  {
    id: 1,
    tahun: '2023/2024',
    status: 'aktif' as const,
  },
  {
    id: 2,
    tahun: '2024/2025',
    status: 'aktif' as const,
  },
  {
    id: 3,
    tahun: '2022/2023',
    status: 'nonaktif' as const,
  },
]

// Pagination mock
export const mockPaginatedResponse = (data: any[]) => ({
  data,
  current_page: 1,
  per_page: 10,
  total: data.length,
  last_page: Math.ceil(data.length / 10),
  from: 1,
  to: Math.min(10, data.length),
})
