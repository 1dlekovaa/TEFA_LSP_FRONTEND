<script setup>
import { ref, computed, watch } from 'vue'

const search = ref('')
const perPage = ref(10)
const currentPage = ref(1)

const data = ref([])

// FILTER
const filteredData = computed(() => {
  return data.value.filter(d =>
    d.jenis?.toLowerCase().includes(search.value.toLowerCase())
  )
})

// TOTAL PAGE
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / perPage.value)
)

// PAGINATION
const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredData.value.slice(start, start + perPage.value)
})

// PINDAH HALAMAN
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// RESET PAGE SAAT SEARCH
watch(search, () => {
  currentPage.value = 1
})
</script>

<template>
  <div>
    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
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

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Jenis Bukti</th>
          <th>Persyaratan</th>
          <th>Ukuran file(Byte)</th>
          <th>Tipe File</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="paginated.length === 0">
          <td colspan="6" align="center">
            No data available in table
          </td>
        </tr>

        <tr v-for="(item, i) in paginated" :key="i">
          <td>{{ (currentPage - 1) * perPage + i + 1 }}</td>
          <td>{{ item.jenis }}</td>
          <td>{{ item.persyaratan }}</td>
          <td>{{ item.ukuran }}</td>
          <td>{{ item.tipe }}</td>
          <td>
            <button>Edit</button>
            <button>Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <div class="flex justify-between items-center mt-4 text-sm">

      <div>
        Showing
        {{ filteredData.length === 0 ? 0 : (currentPage - 1) * perPage + 1 }}
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
</template>