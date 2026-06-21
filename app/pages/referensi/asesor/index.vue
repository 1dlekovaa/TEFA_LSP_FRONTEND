<script setup>
import { ref, reactive, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const asesors = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const search = ref("");
const currentPage = ref(1);
const lastPage = ref(1);

async function fetchAsesor(page = 1) {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/asesor", { query: { page } });
    asesors.value = response.data;
    currentPage.value = response.pagination.current_page;
    lastPage.value = response.pagination.last_page;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data asesor";
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchAsesor());

const filteredData = computed(() => {
  if (!search.value) return asesors.value;
  const q = search.value.toLowerCase();
  return asesors.value.filter(
    (a) =>
      a.nama_lengkap.toLowerCase().includes(q) ||
      a.no_MET.toLowerCase().includes(q)
  );
});

const changePage = (page) => {
  if (page < 1 || page > lastPage.value) return;
  fetchAsesor(page);
};

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editing = ref(null);
const form = reactive({
  nama_lengkap: "",
  no_MET: "",
  akun: "",
  status: "aktif",
});
const fotoFile = ref(null);
const formError = ref("");
const saving = ref(false);

function openCreateModal() {
  editing.value = null;
  form.nama_lengkap = "";
  form.no_MET = "";
  form.akun = "";
  form.status = "aktif";
  fotoFile.value = null;
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(item) {
  editing.value = item;
  form.nama_lengkap = item.nama_lengkap;
  form.no_MET = item.no_MET;
  form.akun = item.akun;
  form.status = item.status;
  fotoFile.value = null;
  formError.value = "";
  showFormModal.value = true;
}

function onFotoChange(e) {
  fotoFile.value = e.target.files[0] || null;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    if (editing.value) {
      if (fotoFile.value) {
        const body = toFormData({ ...form, foto: fotoFile.value }, "PUT");
        await api(`/asesor/${editing.value.id}`, { method: "POST", body });
      } else {
        await api(`/asesor/${editing.value.id}`, { method: "PUT", body: form });
      }
    } else {
      const body = fotoFile.value
        ? toFormData({ ...form, foto: fotoFile.value })
        : form;
      await api("/asesor", { method: "POST", body });
    }
    showFormModal.value = false;
    await fetchAsesor(currentPage.value);
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan data asesor";
  } finally {
    saving.value = false;
  }
}

async function deleteAsesor(item) {
  if (!confirm(`Hapus asesor "${item.nama_lengkap}"?`)) return;
  try {
    await api(`/asesor/${item.id}`, { method: "DELETE" });
    await fetchAsesor(currentPage.value);
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus asesor");
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Data Asesor</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <NuxtLink to="/referensi" class="hover:underline">Referensi</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Data Asesor</span>
    </div>

    <div class="flex justify-between items-center mb-4 text-sm gap-2 flex-wrap">
      <input
        v-model="search"
        placeholder="Search nama / no MET..."
        class="border px-2 py-1 rounded"
      />
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
      >
        + Tambah Asesor
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-center">Foto</th>
            <th class="p-2 border text-left">Nama Lengkap</th>
            <th class="p-2 border text-left">No MET</th>
            <th class="p-2 border text-left">Username</th>
            <th class="p-2 border text-center">Status</th>
            <th class="p-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="p-2 border text-center" colspan="7">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td class="p-2 border text-center" colspan="7">Tidak ada data</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="item.id" v-else>
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border text-center">
              <img
                v-if="item.foto"
                :src="useStorageUrl(item.foto)"
                class="w-10 h-10 rounded-full object-cover inline-block"
              />
              <span v-else class="text-gray-400 text-xs">-</span>
            </td>
            <td class="p-2 border">{{ item.nama_lengkap }}</td>
            <td class="p-2 border">{{ item.no_MET }}</td>
            <td class="p-2 border">{{ item.akun }}</td>
            <td class="p-2 border text-center">
              <span
                class="px-2 py-0.5 rounded text-xs"
                :class="item.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="p-2 border text-center space-x-1 whitespace-nowrap">
              <button @click="openEditModal(item)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
              <button @click="deleteAsesor(item)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded">Prev</button>
      <button
        v-for="page in lastPage"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 border rounded"
        :class="currentPage === page ? 'bg-blue-500 text-white' : ''"
      >
        {{ page }}
      </button>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="px-3 py-1 border rounded">Next</button>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editing ? "Edit Asesor" : "Tambah Asesor" }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Foto (opsional)</label>
            <input type="file" accept="image/*" @change="onFotoChange" class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Nama Lengkap</label>
            <input v-model="form.nama_lengkap" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">No MET</label>
            <input v-model="form.no_MET" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Username (Akun)</label>
            <input v-model="form.akun" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2 mt-1">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
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
