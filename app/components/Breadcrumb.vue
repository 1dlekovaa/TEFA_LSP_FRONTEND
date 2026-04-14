<template>
  <nav class="flex items-center space-x-2 text-sm">
    <NuxtLink 
      to="/dashboard" 
      class="text-blue-600 hover:text-blue-800 transition"
    >
      Dashboard
    </NuxtLink>

    <template v-for="(item, index) in items" :key="index">
      <span class="text-gray-500">/</span>
      <NuxtLink 
        v-if="item.to"
        :to="item.to"
        class="text-blue-600 hover:text-blue-800 transition"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-gray-700">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
