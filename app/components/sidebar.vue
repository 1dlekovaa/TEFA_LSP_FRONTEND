<script setup>
import { ref } from "vue";
import { ChevronRight } from "lucide-vue-next";

const openMenu = ref(null);

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};
</script>

<template>
  <aside class="w-64 bg-[#1C6B93] text-white p-4 space-y-2">
    <!-- HEADER SIDEBAR / LOGO -->
    <div class="p-6 border-b border-white/20 flex items-center gap-3">
      <!-- LOGO SEKOLAH -->
      <img src="/logo.png" alt="Logo Sekolah" class="w-16 h-16 object-contain" />

      <!-- TEXT -->
      <div>
        <h1 class="font-bold text-lg">LSP P1</h1>
        <p class="text-sm opacity-80">SMK NEGERI 1 GARUT</p>
      </div>
    </div>
    <!-- DASHBOARD (MENU UTAMA) -->
    <NuxtLink to="/dashboard" class="block px-4 py-2 rounded hover:bg-white/20"> Dashboard </NuxtLink>

    <!-- REFERENSI -->
    <div>
      <button @click="toggleMenu('referensi')" class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">
        Referensi

        <ChevronRight class="w-4 transition duration-300" :class="openMenu === 'referensi' ? 'rotate-90' : ''" />
      </button>

      <div class="overflow-hidden transition-all duration-300" :class="openMenu === 'referensi' ? 'max-h-40' : 'max-h-0'">
        <NuxtLink to="/referensi" class="block ml-6 py-2 rounded transition-all duration-200" exact-active-class="bg-white/30"> Data Skema </NuxtLink>
      </div>
    </div>

    <!-- UJI KOMPETENSI -->
    <div>
      <button
        @click="toggleMenu('uji Kompetensi')"
        class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">

        Uji Kompetensi

        <ChevronRight
          class="w-4 transition duration-300"
          :class="openMenu==='uji Kompetensi'?'rotate-90':''"/>
      </button>

      <div
        class="overflow-hidden transition-all duration-300"
        :class="openMenu==='uji Kompetensi'
          ? 'max-h-60'
          : 'max-h-0'">

          <NuxtLink to="/uji-kompetisi/pengajuan" class="block ml-6 py-2 hover:bg-white/20 rounded">
          Pengajuan APL(02)
        </NuxtLink>

        <NuxtLink to="/uji/penilaian" class="block ml-6 py-2 hover:bg-white/20 rounded">
          Pelaksanaan Ujikom
        </NuxtLink>

        <NuxtLink to="/uji/penilaian" class="block ml-6 py-2 hover:bg-white/20 rounded"> Kerahasiaan (AK-01)</NuxtLink>
      </div>
    </div>

    <!-- PENGATURAN -->
    <div>
      <button @click="toggleMenu('pengaturan')" class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">
        Pengaturan

        <ChevronRight class="w-4 transition duration-300" :class="openMenu === 'pengaturan' ? 'rotate-90' : ''" />
      </button>

      <div class="overflow-hidden transition-all duration-300" :class="openMenu === 'pengaturan' ? 'max-h-40' : 'max-h-0'">
        <NuxtLink to="/pengaturan/user" class="block ml-6 py-2 hover:bg-white/20 rounded"> User </NuxtLink>
      </div>
    </div>
  </aside>
</template>
