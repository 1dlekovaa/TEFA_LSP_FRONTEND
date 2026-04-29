<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "dashboard",
});

// DATA
const skema = ref([
  { id: 1, nomor: "SKM-001", judul: "Pemrograman Web", jenis: "KKNI", unit: 3 },
  { id: 2, nomor: "SKM-002", judul: "Desain Grafis", jenis: "Klaster", unit: 5 },
  { id: 3, nomor: "SKM-003", judul: "Digital Marketing", jenis: "Okupasi", unit: 2 },
]);

// SEARCH & PAGINATION
const search = ref("");
const perPage = ref(10);
const currentPage = ref(1);

// FILTER
const filteredData = computed(() => {
  return skema.value.filter((item) =>
    item.judul.toLowerCase().includes(search.value.toLowerCase())
  );
});

// TOTAL PAGE
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / perPage.value));
});

// PAGINATION
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredData.value.slice(start, start + perPage.value);
});

// CHANGE PAGE
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
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
      <div>
        Show
        <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
        </select>
        entries
      </div>

      <!-- TABLE -->


      <!-- INFO + PAGINATION -->
      <div class="flex justify-between items-center mt-4 text-sm">

       

        
      </div>
    </div>

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
          <tr v-for="(item, index) in paginatedData" :key="item.id">
            <td class="p-2 border">
              {{ (currentPage - 1) * perPage + index + 1 }}
            </td>
            <td class="p-2 border">{{ item.nomor }}</td>
            <td class="p-2 border">{{ item.judul }}</td>
            <td class="p-2 border">{{ item.jenis }}</td>

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
                {{ item.unit }} Unit
              </NuxtLink>
            </td>

            <td class="p-2 border text-center">
              <NuxtLink
                :to="`/referensi/${item.id}/mukskema`"
                class="bg-green-500 text-white px-2 py-1 rounded text-xs inline-block"
              >
                ☰
              </NuxtLink>
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

  </div>
</template>