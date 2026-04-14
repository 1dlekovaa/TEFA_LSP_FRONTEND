<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { dashboardService } from '@/services/dashboardService'

definePageMeta({
  layout: "dashboard"
})

const isLoading = ref(false)
const error = ref<string | null>(null)
const stats = reactive({
  asesi: 0,
  asesor: 0,
  user: 0,
  skema: 0,
})

onMounted(async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await dashboardService.getStats()
    
    if (response.success) {
      stats.asesi = response.data.data?.asesi || 0
      stats.asesor = response.data.data?.asesor || 0
      stats.user = response.data.data?.user || 0
      stats.skema = response.data.data?.skema || 0
    } else {
      error.value = response.error
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Selamat datang di Admin Panel</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <p class="mt-3 text-gray-600">Loading data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-800">Gagal memuat data: {{ error }}</p>
    </div>

    <!-- Stats Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard 
        title="Jumlah Asesi"
        :value="stats.asesi"
        type="asesi"
      />
      <DashboardCard 
        title="Jumlah Asesor"
        :value="stats.asesor"
        type="asesor"
      />
      <DashboardCard 
        title="Jumlah Pengguna"
        :value="stats.user"
        type="user"
      />
      <DashboardCard 
        title="Jumlah Skema"
        :value="stats.skema"
        type="skema"
      />
    </div>
  </div>
</template>