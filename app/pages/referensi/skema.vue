<script setup>
import { ref, computed } from "vue"

definePageMeta({
  layout: "dashboard"
})

// 📦 DATA
const skema = ref([])

// 🔍 SEARCH
const search = ref("")
const perPage = ref(5)
const currentPage = ref(1)

// 🔍 FILTER
const filteredData = computed(() => {
  return skema.value.filter(item =>
    (item?.judul || "")
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

// 📄 TOTAL PAGE
const totalPages = computed(() => {
  if (!filteredData.value.length) return 1
  return Math.ceil(filteredData.value.length / perPage.value)
})

// 📄 DATA PER HALAMAN
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredData.value.slice(start, start + perPage.value)
})

// 🔁 PINDAH HALAMAN
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
</script>

<template>
  <div>

    <!-- BREADCRUMB -->
    <div class="mb-6">
      <nav class="text-sm text-gray-500">
        <ol class="flex items-center gap-2">
          <li>Dashboard</li>
          <li>/</li>
          <li>Referensi</li>
          <li>/</li>
          <li class="text-blue-600 font-semibold">Skema</li>
        </ol>
      </nav>
    </div>

    <h1 class="text-2xl font-semibold mb-1">Skema</h1>
    <p class="text-gray-500 mb-4"></p>

    <div class="bg-white rounded shadow p-4">

      <!-- HEADER -->
      <h2 class="font-semibold mb-4">Data Skema</h2>

      <!-- CONTROL -->
      <div class="flex justify-between items-center mb-4 text-sm">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          entries
        </div>

        <div class="flex items-center gap-2">
          <span>Search:</span>
          <input
            v-model="search"
            class="border px-2 py-1 rounded"
          />
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 border text-left">No</th>
              <th class="p-2 border text-left">Nomor Skema</th>
              <th class="p-2 border text-left">Judul Skema</th>
              <th class="p-2 border text-left">Jenis Skema</th>
              <th class="p-2 border text-center">File</th>
              <th class="p-2 border text-center">Jumlah Unit</th>
              <th class="p-2 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in paginatedData"
              :key="index"
              class="hover:bg-gray-50"
            >
              <td class="p-2 border">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>

              <td class="p-2 border">{{ item?.nomor || '-' }}</td>
              <td class="p-2 border">{{ item?.judul || '-' }}</td>
              <td class="p-2 border">{{ item?.jenis || '-' }}</td>

              <!-- FILE BUTTON -->
              <td class="p-2 border text-center">
                <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                  ⬇
                </button>
              </td>

              <!-- BADGE UNIT -->
              <td class="p-2 border text-center">
                <span class="bg-green-500 text-white px-3 py-1 rounded text-xs">
                  {{ item?.unit }} Unit
                </span>
              </td>

              <!-- AKSI -->
              <td class="p-2 border text-center">
                <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                  ☰
                </button>
              </td>
            </tr>

            <tr v-if="paginatedData.length === 0">
              <td colspan="7" class="text-center p-4 text-gray-500">
                Tidak ada data
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FOOTER -->
      <div class="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing
          {{ (currentPage - 1) * perPage + 1 }}
          to
          {{ Math.min(currentPage * perPage, filteredData.length) }}
          of
          {{ filteredData.length }}
          entries
        </div>

        <!-- PAGINATION -->
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