<script setup>
import { ref, computed } from "vue"

definePageMeta({
  layout: "dashboard"
})

/* ================= DATA ================= */
const dataAsesi = ref([
  { id: 1, nama: "Ahmad", paket: "RPL", skema: "Web Developer", tanggal: "2026-04-20", status: "mengajukan" },
  { id: 2, nama: "Budi", paket: "RPL", skema: "Mobile Developer", tanggal: "2026-04-21", status: "diterima" },
  { id: 3, nama: "Citra", paket: "TKJ", skema: "Network Engineer", tanggal: "2026-04-22", status: "mengajukan" },
])

/* ================= STATE ================= */
const search = ref("")
const perPage = ref(5)
const page = ref(1)
const status = ref("mengajukan")

/* ================= FILTER ================= */
const filteredData = computed(() => {
  return dataAsesi.value
    .filter(d => d.status === status.value)
    .filter(d =>
      d.nama.toLowerCase().includes(search.value.toLowerCase()) ||
      d.paket.toLowerCase().includes(search.value.toLowerCase())
    )
})

/* ================= PAGINATION ================= */
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / perPage.value)
)

const paginated = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredData.value.slice(start, start + perPage.value)
})

/* ================= ACTION ================= */
const proses = (item) => {
  alert("Proses: " + item.nama)
}
</script>

<template>
  <div>

    <!-- HEADER -->
    <div class="page-header">
      <h1>FR.AK-01. PERSETUJUAN ASESMEN DAN KERAHASIAAN</h1>
      <p class="sub-title">LSP P1 - SMK NEGERI 1 GARUT</p>

      <div class="breadcrumb">
        <span class="link">Home</span>
        /
        <span>Uji Kompetensi</span>
        /
        <span class="link">Asesi</span>
      </div>
    </div>

    <!-- CONTAINER -->
    <div class="container">

      <!-- Tabs -->
      <div class="tabs">
        <button
          @click="status='mengajukan'; page=1"
          :class="['tab', status==='mengajukan' && 'active']"
        >
          Mengajukan
          <span class="badge">
            {{ dataAsesi.filter(d => d.status==='mengajukan').length }}
          </span>
        </button>

        <button
          @click="status='diterima'; page=1"
          :class="['tab', status==='diterima' && 'active']"
        >
          Diterima
          <span class="badge">
            {{ dataAsesi.filter(d => d.status==='diterima').length }}
          </span>
        </button>
      </div>

      <!-- Table Controls -->
      <div class="table-controls">
        <div>
          Show
          <select v-model="perPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
          entries
        </div>

        <div>
          Search:
          <input type="text" v-model="search" placeholder="cari..." />
        </div>
      </div>

      <!-- Table -->
      <table class="custom-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Asesi</th>
            <th>Nama Paket</th>
            <th>Judul Skema</th>
            <th>Tanggal Asesmen</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in paginated" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.paket }}</td>
            <td>{{ item.skema }}</td>
            <td>{{ item.tanggal }}</td>
            <td>
              <button class="btn-proses" @click="proses(item)">
                Proses
              </button>
            </td>
          </tr>

          <tr v-if="paginated.length === 0">
            <td colspan="6" style="text-align:center;">
              Data tidak ditemukan
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          @click="page--"
          :disabled="page === 1"
        >
          Prev
        </button>

        <span>Halaman {{ page }} dari {{ totalPages }}</span>

        <button
          @click="page++"
          :disabled="page === totalPages"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>

/* ================= HEADER ================= */

.page-header {
  background: #ffffff;
  padding: 20px;
  border-bottom: 2px solid #333;
}

.page-header h1 {
  margin: 0;
  font-size: 22px;
}

.sub-title {
  margin: 5px 0;
  font-weight: 500;
}

.breadcrumb {
  font-size: 14px;
  color: #000000;
}

.link {
  color: #000000;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.container {
  padding: 20px;
  background: #f5f5f5;
}

/* ================= TABS ================= */

.tabs {
  border-bottom: 2px solid #000000;
  margin-bottom: 15px;
}

.tabs button {
  background: none;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 500;
}

.tabs button.active {
  border-bottom: 3px solid #1f5f7a;
  color: #1f5f7a;
}

.badge {
  background: #3fa7d6;
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 12px;
  margin-left: 5px;
}

/* ================= TABLE ================= */

.table-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

input {
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
}

select {
  padding: 5px; 
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.custom-table th {
  background: #f1f1f1;
  font-weight: 600;
}

.custom-table tbody tr:hover {
  background-color: #f9f9f9;
}

/* ================= BUTTON ================= */

.btn-proses {
  background: #2d7ff9;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-proses:hover {
  opacity: 0.8;
}

/* ================= PAGINATION ================= */

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>