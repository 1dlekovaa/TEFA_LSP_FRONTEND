<script setup>
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const rows = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const search = ref("");
const perPage = ref(10);
const currentPage = ref(1);

async function fetchData() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/asesor-skema");
    rows.value = response.data;
  } catch (e) {
    errorMessage.value =
      e?.data?.message || "Gagal mengambil data asesor skema";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);

const filteredData = computed(() => {
  if (!search.value) return rows.value;
  const q = search.value.toLowerCase();
  return rows.value.filter(
    (r) =>
      r.asesor_nama.toLowerCase().includes(q) ||
      r.skema_nama.toLowerCase().includes(q),
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredData.value.length / perPage.value)),
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredData.value.slice(start, start + perPage.value);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

async function removeAssignment(row) {
  if (
    !confirm(
      `Hapus skema "${row.skema_nama}" dari asesor "${row.asesor_nama}"?`,
    )
  )
    return;
  try {
    await api(`/asesor-skema/${row.asesor_id}/skema/${row.skema_id}`, {
      method: "DELETE",
    });
    await fetchData();
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus tugas asesor");
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Data Asesor Skema</h1>
    </div>

    <div class="text-sm text-gray-500 mb-4">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Asesor Skema</span>
    </div>

    <div class="bg-white rounded shadow border border-gray-100 p-4">
      <div class="flex justify-end items-center mb-4">
        <NuxtLink
          to="/pengaturan/asesor-skema/tambah"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1"
        >
          + Tambah Tugas
        </NuxtLink>
      </div>
      <div
        class="flex justify-between items-center mb-4 text-sm flex-wrap gap-2"
      >
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          entries
        </div>

        <div class="flex items-center">
          <span class="mr-2 text-gray-600">Search:</span>
          <input v-model="search" class="border px-3 py-1 rounded" />
        </div>
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-2">
        {{ errorMessage }}
      </p>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr class="bg-gray-50 text-gray-700 font-bold">
              <th class="border border-gray-200 p-3 text-center w-12">No</th>
              <th class="border border-gray-200 p-3 text-left">
                Asesor Kompetensi
              </th>
              <th class="border border-gray-200 p-3 text-left">
                Skema Sertifikasi
              </th>
              <th class="border border-gray-200 p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td
                class="border border-gray-200 p-6 text-center text-gray-400"
                colspan="4"
              >
                Memuat data...
              </td>
            </tr>
            <tr v-else-if="paginatedData.length === 0">
              <td
                class="border border-gray-200 p-6 text-center text-gray-400 italic"
                colspan="4"
              >
                Data tidak ditemukan...
              </td>
            </tr>
            <tr
              v-for="(row, index) in paginatedData"
              :key="`${row.asesor_id}-${row.skema_id}`"
              v-else
              class="hover:bg-blue-50/40"
            >
              <td class="border border-gray-200 p-3 text-center text-gray-500">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="border border-gray-200 p-3 font-medium">
                {{ row.asesor_nama }}
              </td>
              <td class="border border-gray-200 p-3">{{ row.skema_nama }}</td>
              <td class="border border-gray-200 p-3 text-center">
                <button
                  @click="removeAssignment(row)"
                  class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div>
          Showing
          {{ filteredData.length > 0 ? (currentPage - 1) * perPage + 1 : 0 }} to
          {{ Math.min(currentPage * perPage, filteredData.length) }} of
          {{ filteredData.length }} entries
        </div>

        <div class="flex gap-1">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded disabled:opacity-30"
          >
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="px-3 py-1 border rounded"
            :class="
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : ''
            "
          >
            {{ page }}
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
