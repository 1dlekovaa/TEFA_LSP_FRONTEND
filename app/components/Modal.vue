<template>
  <teleport to="body">
    <transition name="modal" v-if="isOpen">
      <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">{{ title }}</h2>
          </div>

          <div class="p-6">
            <slot></slot>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-2 border-t">
            <button 
              @click="onClose"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition font-medium"
            >
              Batal
            </button>
            <button 
              v-if="showSubmit"
              @click="$emit('submit')"
              :disabled="isSubmitting"
              :class="[
                'px-4 py-2 rounded transition font-medium',
                isSubmitting
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              ]"
            >
              {{ isSubmitting ? 'Loading...' : 'Simpan' }}
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
  title: string
  showSubmit?: boolean
  isSubmitting?: boolean
}>()

defineEmits<{
  close: []
  submit: []
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
