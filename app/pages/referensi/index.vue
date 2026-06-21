<script setup>
import { ref, reactive, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
});

const api = useApi();
const { user } = useAuth();
const isAdmin = computed(() => user.value?.role === "administrator");

const jenisOptions = ["KKNI", "okupasi", "klaster"];

// DATA
const skema = ref([]);
const loading = ref(false);
const errorMessage = ref("");

// SEARCH & PAGINATION
const search = ref("");
const perPage = ref(10);
const currentPage = ref(1);
const lastPage = ref(1);

async function fetchSkema(page = 1) {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/skema", { query: { page } });
    skema.value = response.data;
    currentPage.value = response.pagination.current_page;
    lastPage.value = response.pagination.last_page;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data skema";
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchSkema());

// FILTER
const filteredData = computed(() => {
  return skema.value.filter((item) =>
    item.nama_skema.toLowerCase().includes(search.value.toLowerCase())
  );
});

// TOTAL PAGE (dari server, bukan client-side)
const totalPages = computed(() => lastPage.value);

// CHANGE PAGE
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  fetchSkema(page);
};

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editing = ref(null);
const form = reactive({
  kode_skema: "",
  nama_skema: "",
  jenis_skema: "KKNI",
});
const fileSkema = ref(null);
const formError = ref("");
const saving = ref(false);

function openCreateModal() {
  editing.value = null;
  form.kode_skema = "";
  form.nama_skema = "";
  form.jenis_skema = "KKNI";
  fileSkema.value = null;
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(item) {
  editing.value = item;
  form.kode_skema = item.kode_skema;
  form.nama_skema = item.nama_skema;
  form.jenis_skema = item.jenis_skema;
  fileSkema.value = null;
  formError.value = "";
  showFormModal.value = true;
}

function onFileChange(e) {
  fileSkema.value = e.target.files[0] || null;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    if (editing.value) {
      if (fileSkema.value) {
        const body = toFormData({ ...form, file_skema: fileSkema.value }, "PUT");
        await api(`/skema/${editing.value.id}`, { method: "POST", body });
      } else {
        await api(`/skema/${editing.value.id}`, { method: "PUT", body: form });
      }
    } else {
      const body = fileSkema.value
        ? toFormData({ ...form, file_skema: fileSkema.value })
        : form;
      await api("/skema", { method: "POST", body });
    }
    showFormModal.value = false;
    await fetchSkema(currentPage.value);
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan data skema";
  } finally {
    saving.value = false;
  }
}

async function deleteSkema(item) {
  if (!confirm(`Hapus skema "${item.nama_skema}"?`)) return;
  try {
    await api(`/skema/${item.id}`, { method: "DELETE" });
    await fetchSkema(currentPage.value);
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus skema");
  }
}
</script>

<template>
  <div class="p-6">

    <!-- TITLE -->
    <h1 class="text-2xl font-semibold">Skema</h1>

    <!-- BREADCRUMB (PINDAH KE BAWAH TITLE) -->
    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <NuxtLink to="/referensi" class="hover:underline">Referensi</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Data Skema</span>
    </div>

    <!-- SEARCH -->
    <div class="flex justify-between items-center mb-4 text-sm">
      <div class="flex items-center gap-2">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
          entries
        </div>

        <input v-model="search" placeholder="Search nama skema..." class="border px-2 py-1 rounded" />
      </div>

      <button
        v-if="isAdmin"
        @click="openCreateModal"
        class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
      >
        + Tambah Skema
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <!-- TABLE -->
    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-left">Nomor</th>
            <th class="p-2 border text-left">Judul</th>
            <th class="p-2 border text-left">Jenis</th>
            <th class="p-2 border text-center">File</th>
            <th class="p-2 border text-center">Unit</th>
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
            <td class="p-2 border">
              {{ index + 1 }}
            </td>
            <td class="p-2 border">{{ item.kode_skema }}</td>
            <td class="p-2 border">{{ item.nama_skema }}</td>
            <td class="p-2 border">{{ item.jenis_skema }}</td>

            <td class="p-2 border text-center">
              <button class="bg-green-500 text-white px-2 py-1 rounded text-xs">
                Lihat
              </button>
            </td>

            <td class="p-2 border text-center">
              <NuxtLink
                :to="`/referensi/${item.id}/unit`"
                class="bg-green-500 text-white px-2 py-1 rounded text-xs inline-block"
              >
                {{ item.jumlah_unit }} Unit
              </NuxtLink>
            </td>

            <td class="p-2 border text-center space-x-1 whitespace-nowrap">
              <NuxtLink
                :to="`/referensi/${item.id}/mukskema`"
                class="bg-green-500 text-white px-2 py-1 rounded text-xs inline-block"
              >
                ☰
              </NuxtLink>
              <template v-if="isAdmin">
                <button @click="openEditModal(item)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                <button @click="deleteSkema(item)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="flex justify-center gap-2 mt-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 border rounded"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-1 border rounded"
        :class="currentPage === page ? 'bg-blue-500 text-white' : ''"
      >
        {{ page }}
      </button>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editing ? "Edit Skema" : "Tambah Skema" }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Kode Skema</label>
            <input v-model="form.kode_skema" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Nama Skema</label>
            <input v-model="form.nama_skema" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Jenis Skema</label>
            <select v-model="form.jenis_skema" required class="w-full border rounded px-3 py-2 mt-1">
              <option v-for="j in jenisOptions" :key="j" :value="j">{{ j }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-700">File Skema (opsional, PDF/DOC)</label>
            <input type="file" accept=".pdf,.doc,.docx" @change="onFileChange" class="w-full border rounded px-3 py-2 mt-1" />
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