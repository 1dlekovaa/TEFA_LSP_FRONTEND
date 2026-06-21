<script setup>
import { ref } from "vue";
import { ChevronRight, LogOut } from "lucide-vue-next";

const openMenu = ref(null);
const { user, logout } = useAuth();
const router = useRouter();

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};

const isAdmin = computed(() => user.value?.role === "admin");

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>

<template>
  <aside class="w-64 bg-[#1C6B93] text-white p-4 space-y-2">
    <!-- HEADER SIDEBAR / LOGO -->
    <div class="p-6 border-b border-white/20 flex items-center gap-3">
      <!-- LOGO SEKOLAH -->
      <img
        src="/logo.png"
        alt="Logo Sekolah"
        class="w-16 h-16 object-contain"
      />

      <!-- TEXT -->
      <div>
        <h1 class="font-bold text-lg">LSP P1</h1>
        <p class="text-sm opacity-80">SMK NEGERI 1 GARUT</p>
      </div>
    </div>
    <!-- DASHBOARD (MENU UTAMA) -->
    <NuxtLink to="/dashboard" class="block px-4 py-2 rounded hover:bg-white/20">
      Dashboard
    </NuxtLink>

    <!-- REFERENSI -->
    <div>
      <button
        @click="toggleMenu('referensi')"
        class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded"
      >
        Referensi

        <ChevronRight
          class="w-4 transition duration-300"
          :class="openMenu === 'referensi' ? 'rotate-90' : ''"
        />
      </button>

      <div
        class="overflow-hidden transition-all duration-300"
        :class="openMenu === 'referensi' ? 'max-h-40' : 'max-h-0'"
      >
        <NuxtLink
          to="/referensi"
          class="block ml-6 py-2 rounded transition-all duration-200"
          exact-active-class="bg-white/30"
        >
          Data Skema
        </NuxtLink>

        <NuxtLink
          v-if="isAdmin"
          to="/referensi/pengguna"
          class="block ml-6 py-2 rounded transition-all duration-200"
          exact-active-class="bg-white/30"
        >
          Data Pengguna
        </NuxtLink>
      </div>
    </div>

    <!-- UJI KOMPETENSI -->
    <div>
      <button
        @click="toggleMenu('uji Kompetensi')"
        class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded"
      >
        Uji Kompetensi
        <ChevronRight
          class="w-4 transition duration-300"
          :class="openMenu === 'uji Kompetensi' ? 'rotate-90' : ''"
        />
      </button>
      <div
        class="overflow-hidden transition-all duration-300"
        :class="openMenu === 'uji Kompetensi' ? 'max-h-60' : 'max-h-0'"
      >
        <NuxtLink
          to="/uji-kompetensi/pengajuan"
          class="block ml-6 py-2 hover:bg-white/20 rounded"
        >
          Pengajuan APL(02)
        </NuxtLink>

        <NuxtLink
          to="/uji-kompetensi/pelaksanaan"
          class="block ml-6 py-2 hover:bg-white/20 rounded"
        >
          Pelaksanaan Ujikom
        </NuxtLink>

        <NuxtLink
          to="/uji-kompetensi/kerahasiaan"
          class="block ml-6 py-2 hover:bg-white/20 rounded"
        >
          Kerahasiaan (AK-01)</NuxtLink
        >
      </div>
    </div>

    <!-- PENGATURAN -->
    <div>
      <button
        @click="toggleMenu('pengaturan')"
        class="flex justify-between w-full px-4 py-2 hover:bg-white/20 rounded"
      >
        Pengaturan

        <ChevronRight
          class="w-4 transition duration-300"
          :class="openMenu === 'pengaturan' ? 'rotate-90' : ''"
        />
      </button>

      <div
        class="overflow-hidden transition-all duration-300"
        :class="openMenu === 'pengaturan' ? 'max-h-40' : 'max-h-0'"
      >
        <NuxtLink
          to="/pengaturan/profile"
          class="block ml-6 py-2 hover:bg-white/20 rounded"
        >
          Profile
        </NuxtLink>
      </div>
    </div>

    <!-- LOGOUT -->
    <button
      @click="handleLogout"
      class="flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white/20 text-left"
    >
      <LogOut class="w-4" />
      Logout
    </button>
  </aside>
</template>
