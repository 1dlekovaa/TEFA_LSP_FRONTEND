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
const currentPage = ref(1);
const lastPage = ref(1);

async function fetchData(page = 1) {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/tahun-aktif", { query: { page } });
    items.value = response.data;
    currentPage.value = response.pagination.current_page;
    lastPage.value = response.pagination.last_page;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data tahun aktif";
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchData());

const filteredData = computed(() => {
  if (!search.value) return items.value;
  const q = search.value.toLowerCase();
  return items.value.filter(
    (i) => i.tahun.toLowerCase().includes(q) || i.semester.toLowerCase().includes(q)
  );
});

const changePage = (page) => {
  if (page < 1 || page > lastPage.value) return;
  fetchData(page);
};

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editing = ref(null);
const form = reactive({ tahun: "", semester: "", is_active: false });
const formError = ref("");
const saving = ref(false);

function openCreateModal() {
  editing.value = null;
  form.tahun = "";
  form.semester = "";
  form.is_active = false;
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(item) {
  editing.value = item;
  form.tahun = item.tahun;
  form.semester = item.semester;
  formError.value = "";
  showFormModal.value = true;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    if (editing.value) {
      await api(`/tahun-aktif/${editing.value.id}`, { method: "PUT", body: form });
    } else {
      await api("/tahun-aktif", { method: "POST", body: form });
    }
    showFormModal.value = false;
    await fetchData(currentPage.value);
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan tahun aktif";
  } finally {
    saving.value = false;
  }
}

async function activate(item) {
  try {
    await api(`/tahun-aktif/${item.id}/activate`, { method: "POST" });
    await fetchData(currentPage.value);
  } catch (e) {
    alert(e?.data?.message || "Gagal mengaktifkan tahun aktif");
  }
}

async function deleteItem(item) {
  if (!confirm(`Hapus tahun aktif "${item.tahun} - ${item.semester}"?`)) return;
  try {
    await api(`/tahun-aktif/${item.id}`, { method: "DELETE" });
    await fetchData(currentPage.value);
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus tahun aktif");
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Tahun Aktif</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Tahun Aktif</span>
    </div>

    <div class="flex justify-between items-center mb-4 text-sm gap-2 flex-wrap">
      <input v-model="search" placeholder="Search tahun / semester..." class="border px-2 py-1 rounded" />
      <button @click="openCreateModal" class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">
        + Tambah Tahun Aktif
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-left">Tahun</th>
            <th class="p-2 border text-left">Semester</th>
            <th class="p-2 border text-center">Status</th>
            <th class="p-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="p-2 border text-center" colspan="5">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td class="p-2 border text-center" colspan="5">Tidak ada data</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="item.id" v-else>
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ item.tahun }}</td>
            <td class="p-2 border">{{ item.semester }}</td>
            <td class="p-2 border text-center">
              <span
                class="px-2 py-0.5 rounded text-xs"
                :class="item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'"
              >
                {{ item.is_active ? "Aktif" : "Nonaktif" }}
              </span>
            </td>
            <td class="p-2 border text-center space-x-1 whitespace-nowrap">
              <button v-if="!item.is_active" @click="activate(item)" class="bg-green-600 text-white px-2 py-1 rounded text-xs">Aktifkan</button>
              <button @click="openEditModal(item)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
              <button @click="deleteItem(item)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
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
      <div class="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 class="text-lg font-semibold mb-4">
          {{ editing ? "Edit Tahun Aktif" : "Tambah Tahun Aktif" }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Tahun</label>
            <input v-model="form.tahun" required placeholder="2026" class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Semester</label>
            <input v-model="form.semester" required placeholder="Ganjil / Genap" class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <label v-if="!editing" class="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" v-model="form.is_active" />
            Jadikan tahun aktif sekarang
          </label>

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
