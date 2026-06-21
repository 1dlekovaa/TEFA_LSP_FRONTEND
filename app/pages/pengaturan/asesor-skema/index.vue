<script setup>
import { ref, reactive, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const assignments = ref([]);
const asesorOptions = ref([]);
const skemaOptions = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const search = ref("");
const currentPage = ref(1);
const lastPage = ref(1);

async function fetchAssignments(page = 1) {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/asesor-skema", { query: { page } });
    assignments.value = response.data;
    currentPage.value = response.pagination.current_page;
    lastPage.value = response.pagination.last_page;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data penugasan";
  } finally {
    loading.value = false;
  }
}

async function fetchOptions() {
  const [asesorRes, skemaRes] = await Promise.all([
    api("/asesor"),
    api("/skema"),
  ]);
  asesorOptions.value = asesorRes.data;
  skemaOptions.value = skemaRes.data;
}

onMounted(() => {
  fetchAssignments();
  fetchOptions();
});

const filteredData = computed(() => {
  if (!search.value) return assignments.value;
  const q = search.value.toLowerCase();
  return assignments.value.filter(
    (a) =>
      a.asesor.nama_lengkap.toLowerCase().includes(q) ||
      a.skema.nama_skema.toLowerCase().includes(q)
  );
});

const changePage = (page) => {
  if (page < 1 || page > lastPage.value) return;
  fetchAssignments(page);
};

// FORM TAMBAH PENUGASAN
const form = reactive({ asesor_id: "", skema_id: "" });
const formError = ref("");
const saving = ref(false);

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    await api("/asesor-skema", { method: "POST", body: form });
    form.asesor_id = "";
    form.skema_id = "";
    await fetchAssignments(currentPage.value);
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan penugasan";
  } finally {
    saving.value = false;
  }
}

async function deleteAssignment(item) {
  if (
    !confirm(
      `Hapus penugasan "${item.asesor.nama_lengkap}" dari skema "${item.skema.nama_skema}"?`
    )
  )
    return;
  try {
    await api(`/asesor-skema/${item.id}`, { method: "DELETE" });
    await fetchAssignments(currentPage.value);
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus penugasan");
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Asesor Skema</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Asesor Skema</span>
    </div>

    <p class="text-sm text-gray-500 mb-4">
      Skema yang belum ditugaskan ke seorang asesor di sini tidak akan terlihat
      oleh asesor tersebut.
    </p>

    <!-- FORM TAMBAH PENUGASAN -->
    <div class="bg-white rounded shadow p-4 mb-4">
      <form @submit.prevent="submitForm" class="flex gap-2 items-end flex-wrap">
        <div>
          <label class="text-sm text-gray-700">Asesor</label>
          <select v-model="form.asesor_id" required class="border rounded px-3 py-2 mt-1 block min-w-48">
            <option value="" disabled>Pilih Asesor</option>
            <option v-for="a in asesorOptions" :key="a.id" :value="a.id">
              {{ a.nama_lengkap }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-700">Skema</label>
          <select v-model="form.skema_id" required class="border rounded px-3 py-2 mt-1 block min-w-48">
            <option value="" disabled>Pilih Skema</option>
            <option v-for="s in skemaOptions" :key="s.id" :value="s.id">
              {{ s.nama_skema }}
            </option>
          </select>
        </div>
        <button type="submit" :disabled="saving" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Tambah Penugasan
        </button>
      </form>
      <p v-if="formError" class="text-red-500 text-sm mt-2">{{ formError }}</p>
    </div>

    <div class="mb-4 text-sm">
      <input v-model="search" placeholder="Search asesor / skema..." class="border px-2 py-1 rounded" />
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-left">Asesor</th>
            <th class="p-2 border text-left">Skema</th>
            <th class="p-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="p-2 border text-center" colspan="4">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td class="p-2 border text-center" colspan="4">Belum ada penugasan</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="item.id" v-else>
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ item.asesor.nama_lengkap }}</td>
            <td class="p-2 border">{{ item.skema.nama_skema }}</td>
            <td class="p-2 border text-center">
              <button @click="deleteAssignment(item)" class="bg-red-500 text-white px-2 py-1 rounded text-xs">
                Delete
              </button>
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
  </div>
</template>
