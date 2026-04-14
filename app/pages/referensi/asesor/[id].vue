<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[
      { label: 'Referensi' },
      { label: 'Data Asesor', to: '/referensi/asesor' },
      { label: 'Detail' }
    ]" />

    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Detail Asesor</h1>
      </div>
      <NuxtLink 
        to="/referensi/asesor"
        class="text-blue-500 hover:text-blue-700 font-medium"
      >
        ← Kembali
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-3 text-gray-600">Loading data...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else-if="item" class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Photo -->
        <div class="flex flex-col items-center">
          <img 
            v-if="item.foto"
            :src="item.foto"
            :alt="item.nama_lengkap"
            class="w-32 h-32 rounded-full object-cover mb-4"
          />
          <div 
            v-else
            class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 mb-4"
          >
            {{ item.nama_lengkap.charAt(0) }}
          </div>
          <h2 class="text-2xl font-bold text-gray-900 text-center">{{ item.nama_lengkap }}</h2>
          <StatusBadge :status="item.status" type="status" class="mt-2" />
        </div>

        <!-- Details -->
        <div class="md:col-span-2 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-600">No MET:</label>
              <p class="text-gray-900 font-semibold">{{ item.no_met }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Username:</label>
              <p class="text-gray-900 font-semibold">{{ item.username }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Status:</label>
              <p class="text-gray-900 font-semibold capitalize">{{ item.status }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 mt-6 pt-4 border-t">
            <NuxtLink 
              :to="`/referensi/asesor/${item.id}/edit`"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-medium"
            >
              Edit
            </NuxtLink>
            <button 
              @click="openDeleteDialog"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { asesorService, Asesor } from '@/services/asesorService'

definePageMeta({
  layout: "dashboard"
})

const route = useRoute()
const router = useRouter()
const { success, error: toastError } = useToast()

const isLoading = ref(false)
const isDeleting = ref(false)
const error = ref<string | null>(null)
const deleteOpen = ref(false)
const item = ref<Asesor | null>(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const id = Number(route.params.id)
    const response = await asesorService.getById(id)
    
    if (response.success) {
      item.value = response.data.data
    } else {
      error.value = response.error
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

const openDeleteDialog = () => {
  deleteOpen.value = true
}

const handleDelete = async () => {
  if (!item.value?.id) return
  
  isDeleting.value = true
  
  try {
    const response = await asesorService.delete(item.value.id)
    if (response.success) {
      success('Data berhasil dihapus')
      router.push('/referensi/asesor')
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
