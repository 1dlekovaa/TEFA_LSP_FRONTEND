<script setup>
import { ref, reactive, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const items = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const search = ref("");

async function fetchData() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/kop-surat");
    items.value = response.data;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data kop surat";
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchData());

const filteredData = computed(() => {
  if (!search.value) return items.value;
  const q = search.value.toLowerCase();
  return items.value.filter((i) => i.nama_lembaga.toLowerCase().includes(q));
});

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editing = ref(null);
const form = reactive({
  nama_lembaga: "",
  alamat: "",
  no_telepon: "",
  email: "",
  website: "",
});
const formError = ref("");
const saving = ref(false);

function resetForm() {
  form.nama_lembaga = "";
  form.alamat = "";
  form.no_telepon = "";
  form.email = "";
  form.website = "";
}

function openCreateModal() {
  editing.value = null;
  resetForm();
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(item) {
  editing.value = item;
  form.nama_lembaga = item.nama_lembaga;
  form.alamat = item.alamat;
  form.no_telepon = item.no_telepon;
  form.email = item.email;
  form.website = item.website;
  formError.value = "";
  showFormModal.value = true;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    if (editing.value) {
      await api(`/kop-surat/${editing.value.id}`, { method: "PUT", body: form });
    } else {
      await api("/kop-surat", { method: "POST", body: form });
    }
    showFormModal.value = false;
    await fetchData();
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan kop surat";
  } finally {
    saving.value = false;
  }
}

async function deleteItem(item) {
  if (!confirm(`Hapus kop surat "${item.nama_lembaga}"?`)) return;
  try {
    await api(`/kop-surat/${item.id}`, { method: "DELETE" });
    await fetchData();
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus kop surat");
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Kop Surat</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Kop Surat</span>
    </div>

    <div class="flex justify-between items-center mb-4 text-sm gap-2 flex-wrap">
      <input v-model="search" placeholder="Search nama lembaga..." class="border px-2 py-1 rounded" />
      <button @click="openCreateModal" class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">
        + Tambah Kop Surat
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-left">Nama Lembaga</th>
            <th class="p-2 border text-left">Alamat</th>
            <th class="p-2 border text-left">No Telepon</th>
            <th class="p-2 border text-left">Email</th>
            <th class="p-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="p-2 border text-center" colspan="6">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td class="p-2 border text-center" colspan="6">Tidak ada data</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="item.id" v-else>
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ item.nama_lembaga }}</td>
            <td class="p-2 border">{{ item.alamat }}</td>
            <td class="p-2 border">{{ item.no_telepon }}</td>
            <td class="p-2 border">{{ item.email }}</td>
            <td class="p-2 border text-center space-x-1 whitespace-nowrap">
              <button @click="openEditModal(item)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
              <button @click="deleteItem(item)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editing ? "Edit Kop Surat" : "Tambah Kop Surat" }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Nama Lembaga</label>
            <input v-model="form.nama_lembaga" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Alamat</label>
            <textarea v-model="form.alamat" required class="w-full border rounded px-3 py-2 mt-1"></textarea>
          </div>
          <div>
            <label class="text-sm text-gray-700">No Telepon</label>
            <input v-model="form.no_telepon" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Email</label>
            <input v-model="form.email" type="email" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Website (opsional)</label>
            <input v-model="form.website" class="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="showFormModal = false" class="px-4 py-2 rounded border">Batal</button>
            <button type="submit" :disabled="saving" class="px-4 py-2 rounded bg-blue-600 text-white">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
