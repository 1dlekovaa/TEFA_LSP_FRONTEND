<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Referensi' },
      { label: 'Data Asesi' }
    ]" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data Asesi</h1>
        <p class="text-gray-600 mt-1">Kelola data peserta ujikom</p>
      </div>
    </div>

    <!-- Top Action Bar -->
    <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      <input 
        v-model="search"
        type="text"
        placeholder="Cari nama, no peserta, atau username..."
        class="w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div class="ml-auto flex gap-2">
        <button 
          @click="openCreateModal"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium"
        >
          + Tambah Asesi
        </button>

        <div class="relative">
          <button 
            @click="showDropdown = !showDropdown"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition font-medium"
          >
            Opsi ▼
          </button>
          
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
            <button 
              @click="handleImport"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              📥 Import Data
            </button>
            <button 
              @click="handleExport"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 border-t"
            >
              📤 Export Data
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-3 text-gray-600">Loading data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Foto</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">No Peserta</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kelas</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
              <img v-if="item.foto" :src="item.foto" :alt="item.nama_lengkap" class="w-10 h-10 rounded-full object-cover" />
              <div v-else class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                {{ item.nama_lengkap?.charAt(0) || 'A' }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ item.no_peserta }}</td>
            <td class="px-6 py-4 text-gray-900">{{ item.nama_lengkap || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ item.kelas }}</td>
            <td class="px-6 py-4 text-gray-600">{{ item.username || '-' }}</td>
            <td class="px-6 py-4">
              <StatusBadge :status="item.status" type="status" />
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button 
                @click="goToDetail(item.id!)"
                class="text-blue-500 hover:text-blue-700 font-medium"
              >
                Lihat
              </button>
              <button 
                @click="openEditModal(item)"
                class="text-green-500 hover:text-green-700 font-medium"
              >
                Edit
              </button>
              <button 
                @click="openDeleteDialog(item.id!, item.nama_lengkap)"
                class="text-red-500 hover:text-red-700 font-medium"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-gray-500">
              Tidak ada data
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination 
      v-if="!isLoading && items.length > 0"
      :pagination="pagination"
      :perPageOptions="perPageOptions"
      :canGoPrev="canGoPrev"
      :canGoNext="canGoNext"
      :goToPage="goToPage"
      :changePerPage="changePerPage"
      :prevPage="prevPage"
      :nextPage="nextPage"
    />

    <!-- Form Modal -->
    <Modal 
      :isOpen="modalOpen"
      :title="modalType === 'edit' ? 'Edit Asesi' : 'Tambah Asesi'"
      :showSubmit="true"
      :isSubmitting="isSubmitting"
      @close="closeModal"
      @submit="handleSubmit"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Foto</label>
          <input 
            ref="fotoInput"
            type="file"
            accept="image/*"
            @change="handleFotoChange"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p v-if="fotoFileName" class="text-sm text-gray-500 mt-1">File: {{ fotoFileName }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">No Peserta *</label>
          <input 
            v-model="formData.no_peserta"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
          <input 
            v-model="formData.nama_lengkap"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
          <input 
            v-model="formData.kelas"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tahun Aktif *</label>
          <select 
            v-model="formData.tahun_aktif_id"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Tahun Aktif</option>
            <option v-for="tahun in tahunAktifList" :key="tahun.id" :value="tahun.id">
              {{ tahun.tahun }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username *</label>
          <input 
            v-model="formData.username"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input 
            v-model="formData.password"
            type="password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select 
            v-model="formData.status"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
        </div>
      </div>
    </Modal>

    <!-- Delete Dialog -->
    <ConfirmDialog 
      :isOpen="deleteOpen"
      message="Apakah Anda yakin ingin menghapus data ini?"
      :isDeleting="isDeleting"
      @cancel="deleteOpen = false"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { usePagination } from '@/composables/usePagination'
import { useToast } from '@/composables/useToast'
import type { Asesi } from '@/services/asesiService'
import { asesiService } from '@/services/asesiService'
import type { TahunAktif } from '@/services/tahunAktifService'
import { tahunAktifService } from '@/services/tahunAktifService'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: "dashboard"
})

const router = useRouter()
const { success, error: toastError } = useToast()

const search = ref('')
const isLoading = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const error = ref<string | null>(null)
const items = ref<Asesi[]>([])
const tahunAktifList = ref<TahunAktif[]>([])
const showDropdown = ref(false)
const modalOpen = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const deleteOpen = ref(false)
const deleteId = ref<number | null>(null)
const deleteName = ref('')
const fotoInput = ref<HTMLInputElement | null>(null)
const fotoFile = ref<File | null>(null)
const fotoFileName = ref<string>('')

const { pagination, perPageOptions, goToPage, changePerPage, prevPage, nextPage, updateFromResponse, canGoPrev, canGoNext } = usePagination(10)

const formData = reactive<Asesi & { id?: number }>({
  id: undefined,
  no_peserta: '',
  nama_lengkap: '',
  kelas: '',
  tahun_aktif_id: 0,
  username: '',
  password: '',
  status: 'aktif',
})

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await asesiService.getAll(pagination.value.currentPage, pagination.value.perPage, search.value)
    
    if (response.success) {
      const data = response.data?.data || []
      items.value = Array.isArray(data) ? data : []
      updateFromResponse(response.data || { current_page: 1, total: 0, per_page: 10 })
    } else {
      error.value = response.error
      items.value = []
    }
  } catch (err: any) {
    console.error('Fetch error:', err)
    error.value = err.message
    items.value = []
  } finally {
    isLoading.value = false
  }
}

const fetchTahunAktif = async () => {
  try {
    const response = await tahunAktifService.getAll()
    if (response.success) {
      tahunAktifList.value = response.data.data
    }
  } catch (err: any) {
    console.error('Error fetching tahun aktif:', err)
  }
}

onMounted(() => {
  fetchTahunAktif()
  fetchData()
})

watch(() => pagination.value.currentPage, () => {
  fetchData()
})

watch(search, () => {
  pagination.value.currentPage = 1
  fetchData()
})

const openCreateModal = () => {
  modalType.value = 'create'
  formData.id = undefined
  formData.no_peserta = ''
  formData.nama_lengkap = ''
  formData.kelas = ''
  formData.tahun_aktif_id = 0
  formData.username = ''
  formData.password = ''
  formData.status = 'aktif'
  fotoFile.value = null
  fotoFileName.value = ''
  if (fotoInput.value) {
    fotoInput.value.value = ''
  }
  modalOpen.value = true
}

const openEditModal = (item: Asesi) => {
  modalType.value = 'edit'
  formData.id = item.id
  formData.no_peserta = item.no_peserta
  formData.nama_lengkap = item.nama_lengkap
  formData.kelas = item.kelas
  formData.tahun_aktif_id = item.tahun_aktif_id
  formData.username = item.username
  formData.status = item.status
  formData.password = ''
  fotoFile.value = null
  fotoFileName.value = ''
  if (fotoInput.value) {
    fotoInput.value.value = ''
  }
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const handleFotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    fotoFile.value = file
    fotoFileName.value = file.name
  } else {
    fotoFile.value = null
    fotoFileName.value = ''
  }
}

const handleSubmit = async () => {
  // Basic validation
  if (!formData.no_peserta || !formData.nama_lengkap || !formData.kelas || !formData.username) {
    toastError('Mohon isi semua field yang wajib diisi')
    return
  }
  
  if (formData.tahun_aktif_id === 0) {
    toastError('Mohon pilih tahun aktif')
    return
  }
  
  if (modalType.value === 'create' && !formData.password) {
    toastError('Password tidak boleh kosong saat membuat data baru')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Add file to form data if it exists
    const submitData = { ...formData }
    if (fotoFile.value) {
      (submitData as any).foto = fotoFile.value
    }
    
    if (modalType.value === 'create') {
      const response = await asesiService.create(submitData)
      if (response.success) {
        success('Data berhasil ditambahkan')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal menambahkan data')
      }
    } else {
      const response = await asesiService.update(formData.id!, submitData)
      if (response.success) {
        success('Data berhasil diperbarui')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal memperbarui data')
      }
    }
  } catch (err: any) {
    toastError(err.message)
  } finally {
    isSubmitting.value = false
  }
}

const goToDetail = (id: number) => {
  router.push(`/referensi/asesi/${id}`)
}

const openDeleteDialog = (id: number, name: string) => {
  deleteId.value = id
  deleteName.value = name
  deleteOpen.value = true
}

const handleDelete = async () => {
  if (!deleteId.value) return
  
  isDeleting.value = true
  
  try {
    const response = await asesiService.delete(deleteId.value)
    if (response.success) {
      success('Data berhasil dihapus')
      fetchData()
      deleteOpen.value = false
    } else {
      toastError(response.error || 'Gagal menghapus data')
    }
  } catch (err: any) {
    toastError(err.message)
  } finally {
    isDeleting.value = false
  }
}

const handleImport = () => {
  toastError('Fitur import akan diimplementasikan')
}

const handleExport = () => {
  toastError('Fitur export akan diimplementasikan')
}
</script>
