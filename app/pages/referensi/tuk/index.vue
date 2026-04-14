<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Referensi' },
      { label: 'Data TUK' }
    ]" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data TUK</h1>
        <p class="text-gray-600 mt-1">Kelola Tempat Uji Kompetensi</p>
      </div>
    </div>

    <!-- Top Action Bar -->
    <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      <input 
        v-model="search"
        type="text"
        placeholder="Cari nama atau jenis TUK..."
        class="w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div class="ml-auto">
        <button 
          @click="openCreateModal"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium"
        >
          + Tambah TUK
        </button>
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
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama TUK</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis TUK</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Deskripsi</th>
            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
              <img v-if="item.foto" :src="item.foto" :alt="item.nama_tuk" class="w-10 h-10 rounded object-cover" />
              <div v-else class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                -
              </div>
            </td>
            <td class="px-6 py-4 text-gray-900">{{ item.nama_tuk }}</td>
            <td class="px-6 py-4">
              <StatusBadge :status="item.jenis_tuk" type="jenis" />
            </td>
            <td class="px-6 py-4 text-gray-600 truncate max-w-xs">{{ item.deskripsi || '-' }}</td>
            <td class="px-6 py-4 text-center space-x-2">
              <button 
                @click="openEditModal(item)"
                class="text-green-500 hover:text-green-700 font-medium"
              >
                Edit
              </button>
              <button 
                @click="openDeleteDialog(item.id!, item.nama_tuk)"
                class="text-red-500 hover:text-red-700 font-medium"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
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
      :title="modalType === 'edit' ? 'Edit TUK' : 'Tambah TUK'"
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama TUK *</label>
          <input 
            v-model="formData.nama_tuk"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jenis TUK *</label>
          <select 
            v-model="formData.jenis_tuk"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Sewaktu">Sewaktu</option>
            <option value="Mandiri">Mandiri</option>
            <option value="Tempat Kerja">Tempat Kerja</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea 
            v-model="formData.deskripsi"
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
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
import type { TUK } from '@/services/tukService'
import { tukService } from '@/services/tukService'

definePageMeta({
  layout: "dashboard"
})

const { success, error: toastError } = useToast()

const search = ref('')
const isLoading = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const error = ref<string | null>(null)
const items = ref<TUK[]>([])
const modalOpen = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const deleteOpen = ref(false)
const deleteId = ref<number | null>(null)
const deleteName = ref('')

const { pagination, perPageOptions, goToPage, changePerPage, prevPage, nextPage, updateFromResponse, canGoPrev, canGoNext } = usePagination(10)

const formData = reactive<TUK>({
  nama_tuk: '',
  jenis_tuk: 'Sewaktu',
  deskripsi: '',
})

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await tukService.getAll(pagination.value.currentPage, pagination.value.perPage, search.value)
    
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
  formData.nama_tuk = ''
  formData.jenis_tuk = 'Sewaktu'
  formData.deskripsi = ''
  modalOpen.value = true
}

const openEditModal = (item: TUK) => {
  modalType.value = 'edit'
  formData.id = item.id
  formData.nama_tuk = item.nama_tuk
  formData.jenis_tuk = item.jenis_tuk
  formData.deskripsi = item.deskripsi
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    if (modalType.value === 'create') {
      const response = await tukService.create(formData)
      if (response.success) {
        success('Data berhasil ditambahkan')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal menambahkan data')
      }
    } else {
      const response = await tukService.update(formData.id!, formData)
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

const openDeleteDialog = (id: number, name: string) => {
  deleteId.value = id
  deleteName.value = name
  deleteOpen.value = true
}

const handleDelete = async () => {
  if (!deleteId.value) return
  
  isDeleting.value = true
  
  try {
    const response = await tukService.delete(deleteId.value)
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
</script>
