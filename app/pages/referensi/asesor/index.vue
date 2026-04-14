<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Referensi' },
      { label: 'Data Asesor' }
    ]" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data Asesor</h1>
        <p class="text-gray-600 mt-1">Kelola data asesor/penguji</p>
      </div>
    </div>

    <!-- Top Action Bar -->
    <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      <input 
        v-model="search"
        type="text"
        placeholder="Cari nama, no MET, atau username..."
        class="w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div class="ml-auto flex gap-2">
        <button 
          @click="openCreateModal"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium"
        >
          + Tambah Asesor
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
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">No MET</th>
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
                {{ item.nama_lengkap.charAt(0) }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-900">{{ item.nama_lengkap }}</td>
            <td class="px-6 py-4 text-gray-600">{{ item.no_met }}</td>
            <td class="px-6 py-4 text-gray-600">{{ item.username }}</td>
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
            <td colspan="6" class="px-6 py-12 text-center text-gray-500">
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
      :title="modalType === 'edit' ? 'Edit Asesor' : 'Tambah Asesor'"
      :showSubmit="true"
      :isSubmitting="isSubmitting"
      @close="closeModal"
      @submit="handleSubmit"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Foto</label>
          <input 
            type="file"
            accept="image/*"
            @change="e => (formData as any).foto = (e.target as HTMLInputElement).files?.[0]"
            class="w-full border border-gray-300 rounded px-3 py-2"
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
          <label class="block text-sm font-medium text-gray-700 mb-1">No MET *</label>
          <input 
            v-model="formData.no_met"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { usePagination } from '@/composables/usePagination'
import { useToast } from '@/composables/useToast'
import type { Asesor } from '@/services/asesorService'
import { asesorService } from '@/services/asesorService'
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
const items = ref<Asesor[]>([])
const showDropdown = ref(false)
const modalOpen = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const deleteOpen = ref(false)
const deleteId = ref<number | null>(null)
const deleteName = ref('')

const { pagination, perPageOptions, goToPage, changePerPage, prevPage, nextPage, updateFromResponse, canGoPrev, canGoNext } = usePagination(10)

const formData = reactive<Asesor>({
  nama_lengkap: '',
  no_met: '',
  username: '',
  password: '',
  status: 'aktif',
})

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await asesorService.getAll(pagination.value.currentPage, pagination.value.perPage, search.value)
    
    if (response.success) {
      items.value = response.data.data
      updateFromResponse(response.data)
    } else {
      error.value = response.error
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
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
  formData.nama_lengkap = ''
  formData.no_met = ''
  formData.username = ''
  formData.password = ''
  formData.status = 'aktif'
  modalOpen.value = true
}

const openEditModal = (item: Asesor) => {
  modalType.value = 'edit'
  formData.id = item.id
  formData.nama_lengkap = item.nama_lengkap
  formData.no_met = item.no_met
  formData.username = item.username
  formData.status = item.status
  formData.password = ''
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    if (modalType.value === 'create') {
      const response = await asesorService.create(formData)
      if (response.success) {
        success('Data berhasil ditambahkan')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal menambahkan data')
      }
    } else {
      const response = await asesorService.update(formData.id!, formData)
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
  router.push(`/referensi/asesor/${id}`)
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
    const response = await asesorService.delete(deleteId.value)
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
  // TODO: implement import
  toastError('Fitur import akan diimplementasikan')
}

const handleExport = () => {
  // TODO: implement export
  toastError('Fitur export akan diimplementasikan')
}
</script>
