<script setup>
import { ref, computed, watch } from "vue";

definePageMeta({
  layout: "dashboard",
});

// ================= DATA =================
const users = ref([
  { id: 1, nama: "Rini Anggraeni, S.Pd", username: "admin", level: "Administrator", password: "adminpassword" },
  { id: 2, nama: "Budi", username: "asesor1", level: "Asesor", password: "123456" },
  { id: 3, nama: "Sari", username: "user1", level: "Asesi", password: "userpassword" },
  { id: 4, nama: "A. Arief Rachman", username: "asesor2", level: "Asesor", password: "123" },
  { id: 5, nama: "Abdurrohman", username: "asesor3", level: "Asesor", password: "123" },
  { id: 6, nama: "Adhitia, S.Farm", username: "asesor4", level: "Asesor", password: "123" },
]);

// ================= STATE =================
const isFormPage = ref(false);
const editId = ref(null);

// ================= SEARCH + FILTER + PAGINATION =================
const search = ref("");
const selectedLevel = ref(""); 
const perPage = ref(5);
const currentPage = ref(1);

// Reset halaman ke 1 jika filter berubah agar navigasi tidak error
watch([search, selectedLevel, perPage], () => {
  currentPage.value = 1;
});

// ================= FORM LOGIC =================
const form = ref({
  nama: "",
  username: "",
  level: "",
  password: "",
});

const resetForm = () => {
  form.value = { nama: "", username: "", level: "", password: "" };
};

const openAddPage = () => {
  isFormPage.value = true;
  editId.value = null;
  resetForm();
};

const editUser = (user) => {
  isFormPage.value = true;
  editId.value = user.id;
  form.value = { ...user };
};

const backToTable = () => {
  isFormPage.value = false;
};

const saveUser = () => {
  if (!form.value.nama || !form.value.username || !form.value.level) return;
  if (editId.value) {
    const index = users.value.findIndex((u) => u.id === editId.value);
    if (index !== -1) users.value[index] = { id: editId.value, ...form.value };
  } else {
    users.value.push({ id: Date.now(), ...form.value });
  }
  isFormPage.value = false;
};

const resetPassword = (user) => {
  if (confirm(`Yakin untuk mereset password pengguna: ${user.nama}?`)) {
    const index = users.value.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users.value[index].password = "123456";
      alert(`Berhasil! Password sekarang adalah: 123456`);
    }
  }
};

const deleteUser = (user) => {
  if (confirm("Yakin mau hapus user ini?")) {
    users.value = users.value.filter((u) => u.id !== user.id);
  }
};

// ================= FILTER LOGIC =================
const filteredData = computed(() => {
  return users.value.filter((u) => {
    const matchesSearch = u.nama.toLowerCase().includes(search.value.toLowerCase());
    const matchesLevel = selectedLevel.value === "" || u.level === selectedLevel.value;
    return matchesSearch && matchesLevel;
  });
});

// ================= PAGINATION LOGIC =================
const totalPages = computed(() => {
  const total = Math.ceil(filteredData.value.length / perPage.value);
  return total > 0 ? total : 1;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + parseInt(perPage.value);
  return filteredData.value.slice(start, end);
});
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div v-if="!isFormPage">
      <h1 class="text-2xl font-bold">Pengguna</h1>
      <p class="text-sm text-gray-500 mb-6">LSP P1 - SMK NEGERI 1 GARUT</p>

      <nav class="text-sm text-gray-500 mb-4">
      <ol class="flex items-center gap-2 flex-wrap">
        <li>
          <NuxtLink to="/dashboard" class="hover:text-blue-600">
            Dashboard
          </NuxtLink>
        </li>
        <li>/</li>
        <li>Pengaturan</li>
        <li>/</li>
        <li>
          <NuxtLink to="/pengaturan/profile" class="hover:text-blue-600">
            Profile
          </NuxtLink>
        </li>
        
      </ol>
    </nav>


      <div class="bg-white p-4 rounded shadow-sm border border-gray-100">
        <h2 class="font-semibold mb-6 text-gray-700 text-base">Data Pengguna</h2>

        <!-- ROW 1: SHOW & SEARCH -->
        <div class="flex justify-between items-center mb-6 text-sm">
          <div>
            Show
            <select v-model="perPage" class="border px-2 py-1 rounded mx-1 outline-none cursor-pointer">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
            </select>
            entries
          </div>

          <div class="flex items-center">
            <span class="mr-2 text-gray-600">Search:</span>
            <input v-model="search" class="border px-3 py-1 rounded outline-blue-500 w-64" placeholder="Cari nama..." />
          </div>
        </div>

        <!-- ROW 2: ADD & FILTER -->
        <div class="flex justify-between items-center mb-4">
          <button
            @click="openAddPage"
            class="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-all shadow-sm"
          >
            + Tambah Data Pengguna
          </button>

          <select 
            v-model="selectedLevel" 
            class="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium outline-none cursor-pointer transition-all shadow-sm"
          >
            <option value="" class="bg-white text-gray-800">Filter Pengguna</option>
            <option value="Administrator" class="bg-white text-gray-800">Administrator</option>
            <option value="Asesor" class="bg-white text-gray-800">Asesor</option>
            <option value="Asesi" class="bg-white text-gray-800">Asesi</option>
            <option value="Validator" class="bg-white text-gray-800">Validator</option>
          </select>
        </div>

        <!-- TABLE -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr class="bg-gray-50 text-gray-700 font-bold">
                <th class="border border-gray-200 p-3 text-center w-12">No</th>
                <th class="border border-gray-200 p-3 text-left">Nama Lengkap</th>
                <th class="border border-gray-200 p-3 text-left">Username</th>
                <th class="border border-gray-200 p-3 text-left">Level Pengguna</th>
                <th class="border border-gray-200 p-3 text-center">Kata Sandi</th>
                <th class="border border-gray-200 p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in paginatedData" :key="user.id" class="hover:bg-blue-50/40 transition-colors">
                <td class="border border-gray-200 p-3 text-center text-gray-500">
                  {{ (currentPage - 1) * perPage + index + 1 }}
                </td>
                <td class="border border-gray-200 p-3 font-medium">{{ user.nama }}</td>
                <td class="border border-gray-200 p-3 text-gray-600">{{ user.username }}</td>
                <td class="border border-gray-200 p-3">{{ user.level }}</td>
                <td class="border border-gray-200 p-3 text-center">
                   <span v-if="user.password === '123456'" class="bg-yellow-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                      Default
                   </span>
                   <span v-else class="bg-[#22c55e] text-white px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                      Custom
                   </span>
                </td>
                <td class="border border-gray-200 p-3">
                  <div class="flex justify-center gap-1 font-medium">
                    <button @click="resetPassword(user)" class="bg-[#22c55e] text-white px-2 py-1 rounded text-xs italic hover:bg-green-600 transition-colors">Reset</button>
                    <button @click="editUser(user)" class="bg-[#3b82f6] text-white px-2 py-1 rounded text-xs italic hover:bg-blue-600 transition-colors">Edit</button>
                    <button @click="deleteUser(user)" class="bg-[#ef4444] text-white px-2 py-1 rounded text-xs italic hover:bg-red-600 transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredData.length === 0">
                <td colspan="6" class="p-10 text-center text-gray-400 italic">Data tidak ditemukan...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION CONTROLS -->
        <div class="flex justify-between items-center mt-6 text-xs text-gray-500">
          <div>
            Showing {{ filteredData.length > 0 ? (currentPage - 1) * perPage + 1 : 0 }} 
            to {{ Math.min(currentPage * perPage, filteredData.length) }} 
            of {{ filteredData.length }} entries
          </div>

          <div class="flex gap-1">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1" 
              class="px-3 py-1 border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all shadow-sm"
            >
              Previous
            </button>
            
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="currentPage = page" 
              class="px-3 py-1 border rounded transition-all shadow-sm" 
              :class="currentPage === page ? 'bg-[#3b82f6] text-white border-[#3b82f6]' : 'hover:bg-gray-50'"
            >
              {{ page }}
            </button>

            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages" 
              class="px-3 py-1 border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FORM SECTION -->
    <div v-else class="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg border border-gray-100">
      <h2 class="text-2xl font-bold mb-1 text-gray-800">{{ editId ? "Edit Pengguna" : "Tambah Pengguna" }}</h2>
      <p class="text-xs text-gray-400 mb-8 font-semibold uppercase tracking-wider">LSP P1 - SMK NEGERI 1 GARUT</p>
      
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
          <input v-model="form.nama" class="border p-2.5 rounded w-full outline-blue-500 transition-all" placeholder="Nama..." />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Username</label>
          <input v-model="form.username" class="border p-2.5 rounded w-full outline-blue-500 transition-all" placeholder="Username..." />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Level Pengguna</label>
          <select v-model="form.level" class="border p-2.5 rounded w-full outline-blue-500 transition-all cursor-pointer">
            <option value="">-- Pilih Level --</option>
            <option>Administrator</option>
            <option>Asesor</option>
            <option>Asesi</option>
            <option>Validator</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="text" class="border p-2.5 rounded w-full outline-blue-500 transition-all" placeholder="Password..." />
        </div>
      </div>

      <div class="flex gap-3 mt-10">
        <button @click="backToTable" class="bg-[#fbbf24] text-white px-8 py-2.5 rounded font-bold hover:bg-yellow-500 transition-colors shadow-md">Kembali</button>
        <button @click="saveUser" class="bg-[#22c55e] text-white px-8 py-2.5 rounded font-bold hover:bg-green-600 transition-colors shadow-md">Simpan Data</button>
      </div>
    </div>
  </div>
</template>