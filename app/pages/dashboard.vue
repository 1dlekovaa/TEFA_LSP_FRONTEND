<script setup>
definePageMeta({
  layout: "dashboard"
})
import { User, Package, UserSearch, ClipboardCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-7xl mx-auto">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold tracking-tight">Dashboard</h1>
      <p class="text-sm text-slate-500 mt-1">
        LSP P1 - SMK NEGERI 1 GARUT
      </p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-2 gap-6">

      <!-- Card 1 -->
      <NuxtLink to="/referensi" class="bg-[#1C6B93] text-white rounded-xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
        <div class="flex items-center justify-between mb-4">
          <div class="bg-white/20 p-3 rounded-lg">
            <User class="w-6 h-6" />
          </div>
          <h2 class="text-5xl font-black">3</h2>
        </div>
        <p class="text-base uppercase tracking-wider text-white/80 font-semibold">
          Jumlah Skema
        </p>
      </NuxtLink>

      <!-- Card 2 -->
      <NuxtLink to="/referensi" class="bg-[#1C6B93] text-white rounded-xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
        <div class="flex items-center justify-between mb-4">
          <div class="bg-white/20 p-3 rounded-lg">
            <Package class="w-6 h-6" />
          </div>
          <h2 class="text-5xl font-black">13</h2>
        </div>
        <p class="text-base uppercase tracking-wider text-white/80 font-semibold">
          Jumlah Paket
        </p>
      </NuxtLink>

      <!-- Card 3 -->
      <NuxtLink to="/referensi" class="bg-[#1C6B93] text-white rounded-xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
        <div class="flex items-center justify-between mb-4">
          <div class="bg-white/20 p-3 rounded-lg">
            <UserSearch class="w-6 h-6" />
          </div>
          <h2 class="text-5xl font-black">64</h2>
        </div>
        <p class="text-base uppercase tracking-wider text-white/80 font-semibold">
          Jumlah Asesi
        </p>
      </NuxtLink>

      <!-- Card 4 -->
      <NuxtLink to="/referensi" class="bg-[#1C6B93] text-white rounded-xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
        <div class="flex items-center justify-between mb-4">
          <div class="bg-white/20 p-3 rounded-lg">
            <ClipboardCheck class="w-6 h-6" />
          </div>
          <h2 class="text-5xl font-black">30</h2>
        </div>
        <p class="text-base uppercase tracking-wider text-white/80 font-semibold">
          Ajual APL-02
        </p>
      </NuxtLink>

    </div>
  </div>
</template>