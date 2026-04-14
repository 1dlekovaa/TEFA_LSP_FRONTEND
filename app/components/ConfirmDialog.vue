<template>
  <teleport to="body">
    <transition name="modal" v-if="isOpen">
      <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 overflow-hidden">
          <div class="bg-red-500 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Konfirmasi Hapus</h2>
          </div>

          <div class="p-6">
            <p class="text-gray-700">{{ message }}</p>
            <p class="text-sm text-gray-500 mt-2">Aksi ini tidak dapat dibatalkan.</p>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-2 border-t">
            <button 
              @click="$emit('cancel')"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition font-medium"
            >
              Batal
            </button>
            <button 
              @click="$emit('confirm')"
              :disabled="isDeleting"
              :class="[
                'px-4 py-2 rounded transition font-medium text-white',
                isDeleting
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              ]"
            >
              {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  message: string
  isDeleting?: boolean
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
