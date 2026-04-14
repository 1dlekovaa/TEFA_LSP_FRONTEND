<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ChevronRight } from "lucide-vue-next";

const router = useRouter();
const openMenus = ref({
  referensi: false,
  uji: false,
  pengaturan: false
});
const user = ref(null);

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu];
};

// Get current user from localStorage
onMounted(() => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    user.value = JSON.parse(userStr);
  }
});

// Check if user is admin
const isAdmin = computed(() => user.value?.level === 'Administrator');
const isAsesor = computed(() => user.value?.level === 'Asesor');
const isAsesi = computed(() => user.value?.level === 'Asesi');

// Logout handler
const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <aside class="w-64 bg-[#1C6B93] text-white p-4 space-y-2 flex flex-col h-screen">
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

    <!-- MENU ITEMS -->
    <div class="flex-1 flex flex-col space-y-2 overflow-y-auto overflow-x-hidden pr-2 hide-scrollbar">
      <!-- DASHBOARD (MENU UTAMA) -->
      <NuxtLink to="/dashboard" class="block px-4 py-2 rounded hover:bg-white/20"> Dashboard </NuxtLink>

      <!-- USER INFO -->
      <div v-if="user" class="px-4 py-3 bg-white/10 rounded text-sm">
        <p class="text-white/80 text-xs">Logged in as:</p>
        <p class="font-semibold text-white truncate">{{ user.nama_lengkap }}</p>
        <p class="text-white/60 text-xs">{{ user.level }}</p>
      </div>

      <!-- REFERENSI (ADMIN ONLY) -->
      <div v-if="isAdmin">
        <button @click="toggleMenu('referensi')" class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">
          Referensi

          <ChevronRight class="w-4 transition duration-300" :class="openMenus.referensi ? 'rotate-90' : ''" />
        </button>

        <div class="overflow-hidden transition-all duration-300" :class="openMenus.referensi ? 'max-h-96' : 'max-h-0'">
          <NuxtLink to="/referensi/asesor" class="block ml-6 py-2 rounded transition-all duration-200 hover:bg-white/20"> Data Asesor </NuxtLink>
          <NuxtLink to="/referensi/asesi" class="block ml-6 py-2 rounded transition-all duration-200 hover:bg-white/20"> Data Asesi </NuxtLink>
          <NuxtLink to="/referensi/akun" class="block ml-6 py-2 rounded transition-all duration-200 hover:bg-white/20"> Data Akun </NuxtLink>
          <NuxtLink to="/referensi/tuk" class="block ml-6 py-2 rounded transition-all duration-200 hover:bg-white/20"> Data TUK </NuxtLink>
        </div>
      </div>

      <!-- UJI KOMPETENSI (ADMIN & ASESOR) -->
      <div v-if="isAdmin || isAsesor">
        <button @click="toggleMenu('uji')" class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">
          Uji Kompetensi

          <ChevronRight class="w-4 transition duration-300" :class="openMenus.uji ? 'rotate-90' : ''" />
        </button>

        <div class="overflow-hidden transition-all duration-300" :class="openMenus.uji ? 'max-h-60' : 'max-h-0'">
          <NuxtLink to="/uji/apl01" class="block ml-6 py-2 hover:bg-white/20 rounded"> APL-01 </NuxtLink>

          <NuxtLink to="/uji/apl02" class="block ml-6 py-2 hover:bg-white/20 rounded"> APL-02 </NuxtLink>

          <NuxtLink to="/uji/penilaian" class="block ml-6 py-2 hover:bg-white/20 rounded"> Penilaian </NuxtLink>
        </div>
      </div>

      <!-- PENGATURAN (ADMIN ONLY) -->
      <div v-if="isAdmin">
        <button @click="toggleMenu('pengaturan')" class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded">
          Pengaturan

          <ChevronRight class="w-4 transition duration-300" :class="openMenus.pengaturan ? 'rotate-90' : ''" />
        </button>

        <div class="overflow-hidden transition-all duration-300" :class="openMenus.pengaturan ? 'max-h-40' : 'max-h-0'">
          <NuxtLink to="/pengaturan/user" class="block ml-6 py-2 hover:bg-white/20 rounded"> User </NuxtLink>
        </div>
      </div>
    </div>

    <!-- LOGOUT BUTTON -->
    <div class="mt-auto pt-4 border-t border-white/20">
      <button @click="handleLogout" class="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white transition">
        Logout
      </button>
    </div>
  </aside>
</template>
