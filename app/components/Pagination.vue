<template>
  <div class="flex items-center justify-between py-4">
    <div class="text-sm text-gray-600">
      Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-600">Per Page:</label>
        <select 
          :value="pagination.perPage"
          @change="changePerPage(Number(($event.target as HTMLSelectElement).value))"
          class="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <button 
          @click="prevPage"
          :disabled="!canGoPrev"
          :class="[
            'px-3 py-1 rounded text-sm font-medium',
            canGoPrev 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ]"
        >
          Previous
        </button>

        <div class="flex items-center space-x-1">
          <button 
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-2 py-1 rounded text-sm font-medium transition',
              page === pagination.currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button 
          @click="nextPage"
          :disabled="!canGoNext"
          :class="[
            'px-3 py-1 rounded text-sm font-medium',
            canGoNext 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '@/composables/usePagination'
import type { PaginationState } from '@/composables/usePagination'

interface Props {
  pagination: PaginationState
  perPageOptions: number[]
  canGoPrev: boolean
  canGoNext: boolean
  goToPage: (page: number) => void
  changePerPage: (perPage: number) => void
  prevPage: () => void
  nextPage: () => void
}

defineProps<Props>()

const visiblePages = computed(() => {
  const current = 1 // This should come from props
  const last = 5    // This should come from props
  const pages: number[] = []
  
  for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})
</script>
