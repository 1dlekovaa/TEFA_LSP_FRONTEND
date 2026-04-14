<template>
  <span :class="badgeClass">
    {{ statusLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type StatusType = 'aktif' | 'nonaktif' | 'Administrator' | 'Asesor' | 'Asesi' | 'Validator' | 'Sewaktu' | 'Mandiri' | 'Tempat Kerja'

const props = defineProps<{
  status: StatusType
  type?: 'status' | 'level' | 'jenis'
}>()

const badgeClass = computed(() => {
  let baseClasses = 'px-3 py-1 rounded-full text-sm font-medium'
  
  if (props.type === 'level') {
    switch (props.status) {
      case 'Administrator':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'Asesor':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'Asesi':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'Validator':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  } else if (props.type === 'jenis') {
    switch (props.status) {
      case 'Sewaktu':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'Mandiri':
        return `${baseClasses} bg-purple-100 text-purple-800`
      case 'Tempat Kerja':
        return `${baseClasses} bg-indigo-100 text-indigo-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  } else {
    // status type
    switch (props.status) {
      case 'aktif':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'nonaktif':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }
})

const statusLabel = computed(() => {
  if (props.type === 'level') {
    return props.status
  }
  return props.status.charAt(0).toUpperCase() + props.status.slice(1)
})
</script>
