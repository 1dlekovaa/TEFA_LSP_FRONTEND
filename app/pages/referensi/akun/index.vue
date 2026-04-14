<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Referensi' },
      { label: 'Data Akun' }
    ]" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Data Akun</h1>
        <p class="text-gray-600 mt-1">Kelola akun pengguna</p>
      </div>
    </div>

    <!-- Top Action Bar -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex items-center gap-4 mb-4">
        <input 
          v-model="search"
          type="text"
          placeholder="Cari nama atau username..."
          class="w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select 
          v-model="levelFilter"
          class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Level</option>
          <option value="Administrator">Administrator</option>
          <option value="Asesor">Asesor</option>
          <option value="Asesi">Asesi</option>
          <option value="Validator">Validator</option>
        </select>

        <div class="ml-auto">
          <button 
            @click="openCreateModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium whitespace-nowrap"
          >
            + Tambah Akun
          </button>
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
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Lengkap</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Level</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ item.nama_lengkap }}</td>
            <td class="px-6 py-4 text-gray-600">{{ item.username }}</td>
            <td class="px-6 py-4">
              <StatusBadge :status="item.level" type="level" />
            </td>
            <td class="px-6 py-4">
              <StatusBadge :status="item.status" type="status" />
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button 
                @click="openResetPasswordModal(item.id!, item.nama_lengkap)"
                class="text-yellow-500 hover:text-yellow-700 font-medium"
              >
                Reset PW
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
      :title="modalType === 'edit' ? 'Edit Akun' : 'Tambah Akun'"
      :showSubmit="true"
      :isSubmitting="isSubmitting"
      @close="closeModal"
      @submit="handleSubmit"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
          <input 
            v-model="formData.nama_lengkap"
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Level *</label>
          <select 
            v-model="formData.level"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Administrator">Administrator</option>
            <option value="Asesor">Asesor</option>
            <option value="Asesi">Asesi</option>
            <option value="Validator">Validator</option>
          </select>
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

    <!-- Reset Password Modal -->
    <Modal 
      :isOpen="resetPasswordOpen"
      title="Reset Password"
      :showSubmit="true"
      :isSubmitting="isSubmitting"
      @close="resetPasswordOpen = false"
      @submit="handleResetPassword"
    >
      <div class="space-y-4">
        <p class="text-gray-700">Reset password untuk: <strong>{{ resetPasswordName }}</strong></p>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru *</label>
          <input 
            v-model="newPassword"
            type="password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
import type { User } from '@/services/userService'
import { userService } from '@/services/userService'

definePageMeta({
  layout: "dashboard"
})

const { success, error: toastError } = useToast()

const search = ref('')
const levelFilter = ref('')
const isLoading = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const error = ref<string | null>(null)
const items = ref<User[]>([])
const modalOpen = ref(false)
const modalType = ref<'create' | 'edit'>('create')
const deleteOpen = ref(false)
const deleteId = ref<number | null>(null)
const deleteName = ref('')
const resetPasswordOpen = ref(false)
const resetPasswordId = ref<number | null>(null)
const resetPasswordName = ref('')
const newPassword = ref('')

const { pagination, perPageOptions, goToPage, changePerPage, prevPage, nextPage, updateFromResponse, canGoPrev, canGoNext } = usePagination(10)

const formData = reactive<User>({
  nama_lengkap: '',
  username: '',
  level: 'Asesi',
  password: '',
  status: 'aktif',
})

const fetchData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await userService.getAll(pagination.value.currentPage, pagination.value.perPage, search.value, levelFilter.value)
    
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

watch([search, levelFilter], () => {
  pagination.value.currentPage = 1
  fetchData()
})

const openCreateModal = () => {
  modalType.value = 'create'
  formData.nama_lengkap = ''
  formData.username = ''
  formData.level = 'Asesi'
  formData.password = ''
  formData.status = 'aktif'
  modalOpen.value = true
}

const openEditModal = (item: User) => {
  modalType.value = 'edit'
  formData.id = item.id
  formData.nama_lengkap = item.nama_lengkap
  formData.username = item.username
  formData.level = item.level
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
      const response = await userService.create(formData)
      if (response.success) {
        success('Akun berhasil ditambahkan')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal menambahkan akun')
      }
    } else {
      const response = await userService.update(formData.id!, formData)
      if (response.success) {
        success('Akun berhasil diperbarui')
        fetchData()
        closeModal()
      } else {
        toastError(response.error || 'Gagal memperbarui akun')
      }
    }
  } catch (err: any) {
    toastError(err.message)
  } finally {
    isSubmitting.value = false
  }
}

const openResetPasswordModal = (id: number, name: string) => {
  resetPasswordId.value = id
  resetPasswordName.value = name
  newPassword.value = ''
  resetPasswordOpen.value = true
}

const handleResetPassword = async () => {
  if (!resetPasswordId.value || !newPassword.value) {
    toastError('Password tidak boleh kosong')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await userService.resetPassword(resetPasswordId.value, newPassword.value)
    if (response.success) {
      success('Password berhasil direset')
      fetchData()
      resetPasswordOpen.value = false
    } else {
      toastError(response.error || 'Gagal mereset password')
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
    const response = await userService.delete(deleteId.value)
    if (response.success) {
      success('Akun berhasil dihapus')
      fetchData()
      deleteOpen.value = false
    } else {
      toastError(response.error || 'Gagal menghapus akun')
    }
  } catch (err: any) {
    toastError(err.message)
  } finally {
    isDeleting.value = false
  }
}
</script>
