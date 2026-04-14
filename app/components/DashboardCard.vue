<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ title }}</p>
        <p class="text-3xl font-bold mt-2 text-gray-900">{{ value }}</p>
      </div>
      <div :class="[iconClass, 'rounded-full p-3']">
        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <!-- Asesi Icon: Academic Cap -->
          <template v-if="type === 'asesi'">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 4.414V16a1 1 0 102 0V4.414l6.293 6.293a1 1 0 001.414-1.414l-7-7z" />
          </template>
          <!-- Asesor Icon: Users -->
          <template v-else-if="type === 'asesor'">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 15a9.976 9.976 0 00-1.846 2.603 3 3 0 019.753-1.077A10.009 10.009 0 0012.93 15zM3.075 15c1.052-1.181 2.902-1.852 4.925-1.852s3.873.671 4.925 1.852A9.974 9.974 0 008 18.75a9.974 9.974 0 00-4.925-3.75z" />
          </template>
          <!-- User Icon: Single User -->
          <template v-else-if="type === 'user'">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </template>
          <!-- Skema Icon: Building -->
          <template v-else-if="type === 'skema'">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </template>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number
  type: 'asesi' | 'asesor' | 'user' | 'skema'
}

const props = defineProps<Props>()

const iconClass = computed(() => {
  const baseClass = 'bg-'
  switch (props.type) {
    case 'asesi':
      return 'bg-blue-500'
    case 'asesor':
      return 'bg-green-500'
    case 'user':
      return 'bg-purple-500'
    case 'skema':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
})
</script>
