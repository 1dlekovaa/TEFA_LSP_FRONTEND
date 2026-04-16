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
    <p class="text-sm text-gray-500 mb-4">LSP P1 - SMK NEGERI 1 GARUT</p>

    <!-- BREADCRUMB -->
    <nav class="text-sm text-gray-500 mb-4">
      <ol class="flex items-center gap-2 flex-wrap">
        <li>
          <NuxtLink to="/dashboard" class="hover:text-blue-600">
            Dashboard
          </NuxtLink>
        </li>
        <li>/</li>
        <li>Referensi</li>
        <li>/</li>
        <li>
          <NuxtLink to="/referensi/skema" class="hover:text-blue-600">
            Data Skema
          </NuxtLink>
        </li>
        
      </ol>
    </nav>

    <!-- CARD -->
    <div class="bg-white rounded shadow p-4">

      <h2 class="font-semibold mb-4">Data Skema </h2>

      <!-- HEADER TABLE -->
      <div class="flex justify-between items-center mb-4 text-sm">

        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 mx-1 rounded">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          entries
        </div>

        <div class="flex items-center gap-2">
          <span>Search:</span>
          <input v-model="search" class="border px-2 py-1 rounded" />
        </div>

      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm border border-gray-200">

          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 border">No</th>
              <th class="p-2 border">Nomor Skema</th>
              <th class="p-2 border">Judul Skema</th>
              <th class="p-2 border">Jenis Skema</th>
              <th class="p-2 border text-center">File</th>
              <th class="p-2 border text-center">Unit</th>
              <th class="p-2 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in paginatedData"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <td class="p-2 border text-center">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>

              <td class="p-2 border">{{ item.nomor }}</td>
              <td class="p-2 border">{{ item.judul }}</td>
              <td class="p-2 border text-center">{{ item.jenis }}</td>

              <!-- FILE -->
              <td class="p-2 border text-center">
                <button class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                  ⬇
                </button>
              </td>

              <!-- UNIT -->
              <td class="p-2 border text-center">
                <NuxtLink
                  :to="`/referensi/${item.id}/unit`"
                  class="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  {{ item.unit }} Unit
                </NuxtLink>
              </td>

              <!-- AKSI -->
              <td class="p-2 border text-center">
                <NuxtLink
                  :to="`/referensi/${item.id}/mukskema`"
                  class="inline-block bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  ☰
                </NuxtLink>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

      <!-- INFO + PAGINATION -->
      <div class="flex justify-between items-center mt-4 text-sm">

        <div>
          Showing
          {{ (currentPage - 1) * perPage + 1 }}
          to
          {{ Math.min(currentPage * perPage, filteredData.length) }}
          of {{ filteredData.length }} entries
        </div>

        <div class="flex gap-1">

          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded"
          >
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

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded"
          >
            Next
          </button>

        </div>
      </div>

    </div>
  </div>
</template>