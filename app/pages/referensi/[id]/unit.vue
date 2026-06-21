<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const skemaId = Number(route.params.id);

const api = useApi();
const { user } = useAuth();
const isAdmin = computed(() => user.value?.role === "administrator");

const jenisOptions = ["SKKNI", "standar khusus", "standar internasional"];

// DATA
const units = ref([]);
const skemaInfo = ref(null);
const loading = ref(false);
const errorMessage = ref("");

async function fetchUnits() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api(`/unit/skema/${skemaId}`);
    units.value = response.data;
    skemaInfo.value = response.skema;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data unit";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUnits);

// SEARCH & PAGINATION
const search = ref("");
const perPage = ref(5);
const currentPage = ref(1);

const filteredData = computed(() =>
  units.value.filter((item) =>
    (item?.nama_unit || "").toLowerCase().includes(search.value.toLowerCase())
  )
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredData.value.length / perPage.value))
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredData.value.slice(start, start + perPage.value);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// ACTION
const goBack = () => {
  router.push("/referensi");
};

const goToElemen = (unitId) => {
  router.push(`/referensi/${skemaId}/unit/${unitId}/elemen`);
};

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editing = ref(null);
const form = reactive({
  kode_unit: "",
  nama_unit: "",
  jenis_standar: "SKKNI",
  deskripsi: "",
  status: "aktif",
});
const formError = ref("");
const saving = ref(false);

function openCreateModal() {
  editing.value = null;
  form.kode_unit = "";
  form.nama_unit = "";
  form.jenis_standar = "SKKNI";
  form.deskripsi = "";
  form.status = "aktif";
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(item) {
  editing.value = item;
  form.kode_unit = item.kode_unit;
  form.nama_unit = item.nama_unit;
  form.jenis_standar = item.jenis_standar;
  form.deskripsi = item.deskripsi;
  form.status = item.status;
  formError.value = "";
  showFormModal.value = true;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    if (editing.value) {
      await api(`/unit/${editing.value.id}`, { method: "PUT", body: form });
    } else {
      await api("/unit", {
        method: "POST",
        body: { ...form, skema_id: skemaId },
      });
    }
    showFormModal.value = false;
    await fetchUnits();
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan data unit";
  } finally {
    saving.value = false;
  }
}

async function deleteUnit(item) {
  if (!confirm(`Hapus unit "${item.nama_unit}"?`)) return;
  try {
    await api(`/unit/${item.id}`, { method: "DELETE" });
    await fetchUnits();
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus unit");
  }
}
</script>

<template>
  <div>
    <!-- TITLE -->
    <h1 class="text-2xl font-semibold mb-1">Unit Skema</h1>

    <!-- BREADCRUMB -->
    <div class="mt-6">
      <nav class="text-sm text-gray-500 mb-4">
        <ol class="flex items-center gap-2 flex-wrap">
          <li>
            <NuxtLink to="/dashboard" class="hover:text-blue-600">Dashboard</NuxtLink>
          </li>
          <li>/</li>
          <li>Referensi</li>
          <li>/</li>
          <li>
            <NuxtLink to="/referensi" class="hover:text-blue-600">Data Skema</NuxtLink>
          </li>
          <li>/</li>
          <li class="text-blue-600 font-semibold">
            {{ skemaInfo?.nama_skema || "Data Unit" }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="bg-white rounded shadow p-4">
      <h2 class="font-semibold mb-4">Data Unit</h2>

      <!-- CONTROL -->
      <div class="flex justify-between items-center mb-4 text-sm flex-wrap gap-2">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
          entries
        </div>

        <div class="flex items-center gap-2">
          <span>Search:</span>
          <input v-model="search" class="border px-2 py-1 rounded" />
        </div>
      </div>

      <!-- BUTTON -->
      <div class="flex items-center gap-2 mb-4">
        <button
          @click="goBack"
          class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Kembali
        </button>
        <button
          v-if="isAdmin"
          @click="openCreateModal"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          + Tambah Unit
        </button>
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 border text-left">No</th>
              <th class="p-2 border text-left">Kode Unit</th>
              <th class="p-2 border text-left">Judul Unit</th>
              <th class="p-2 border text-left">Jenis Standar</th>
              <th class="p-2 border text-center">Elemen</th>
              <th class="p-2 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="p-2 border text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="filteredData.length === 0">
              <td colspan="6" class="p-2 border text-center text-gray-400">Belum ada unit</td>
            </tr>
            <tr v-for="(unit, index) in paginatedData" :key="unit.id" v-else class="hover:bg-gray-50">
              <td class="p-2 border">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="p-2 border">{{ unit.kode_unit }}</td>
              <td class="p-2 border">{{ unit.nama_unit }}</td>
              <td class="p-2 border capitalize">{{ unit.jenis_standar }}</td>

              <td class="p-2 border text-center">
                <button
                  @click="goToElemen(unit.id)"
                  class="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                >
                  {{ unit.jumlah_elemen }} Elemen
                </button>
              </td>

              <td class="p-2 border text-center space-x-1 whitespace-nowrap">
                <template v-if="isAdmin">
                  <button @click="openEditModal(unit)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                    Edit
                  </button>
                  <button @click="deleteUnit(unit)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Hapus
                  </button>
                </template>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing {{ filteredData.length > 0 ? (currentPage - 1) * perPage + 1 : 0 }}
          to {{ Math.min(currentPage * perPage, filteredData.length) }}
          of {{ filteredData.length }} entries
        </div>

        <div class="flex justify-center gap-1">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded disabled:opacity-30">
            Previous
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

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded disabled:opacity-30">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editing ? "Edit Unit" : "Tambah Unit" }}
        </h2>
        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Kode Unit</label>
            <input v-model="form.kode_unit" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Judul Unit</label>
            <input v-model="form.nama_unit" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Jenis Standar</label>
            <select v-model="form.jenis_standar" required class="w-full border rounded px-3 py-2 mt-1">
              <option v-for="j in jenisOptions" :key="j" :value="j" class="capitalize">{{ j }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-700">Deskripsi</label>
            <textarea v-model="form.deskripsi" class="w-full border rounded px-3 py-2 mt-1"></textarea>
          </div>
          <div>
            <label class="text-sm text-gray-700">Status</label>
            <select v-model="form.status" required class="w-full border rounded px-3 py-2 mt-1">
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
