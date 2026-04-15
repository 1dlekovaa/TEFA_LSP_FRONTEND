<script setup>
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="p-4">
    <h1>MUK SKEMA</h1>
    <p>Kode: {{ id }}</p>
  </div>
</template>