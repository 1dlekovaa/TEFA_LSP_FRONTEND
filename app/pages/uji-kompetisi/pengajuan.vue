<script setup>
import { ref, computed } from "vue"

definePageMeta({
  layout: "dashboard"
})

// DATA DUMMY
const data = ref([
  { nama: "Budi", paket: "Paket A", skema: "Skema 1", status: "mengajukan" },
  { nama: "Siti", paket: "Paket B", skema: "Skema 2", status: "diterima" },
  { nama: "Andi", paket: "Paket C", skema: "Skema 3", status: "ditolak" },
  { nama: "Rina", paket: "Paket A", skema: "Skema 1", status: "mengajukan" },
  { nama: "Dewi", paket: "Paket B", skema: "Skema 2", status: "mengajukan" },
])

const status = ref("mengajukan")
const search = ref("")
const perPage = ref(10)
const page = ref(1)

// FILTER
const filtered = computed(() => {
  return data.value
    .filter(d => d.status === status.value)
    .filter(d =>
      d.nama.toLowerCase().includes(search.value.toLowerCase()) ||
      d.paket.toLowerCase().includes(search.value.toLowerCase())
    )
})

// PAGINATION
const totalPages = computed(() =>
  Math.ceil(filtered.value.length / perPage.value)
)

const paginated = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

// ACTION
const proses = (item) => {
  alert("Proses: " + item.nama)
}
</script>

<template>
  <div class="card">
    <h2 class="title">FR.APL-02. ASESMEN MANDIRI ASESI</h2>
    <p class="subtitle">LSP P1 - SMK NEGERI 1 GARUT</p>

    <!-- Tabs -->
    <div class="tabs">
      <div
        @click="status='mengajukan'; page=1"
        :class="['tab', status==='mengajukan' && 'active']"
      >
        Mengajukan
        <span class="count blue">
          {{ data.filter(d => d.status==='mengajukan').length }}
        </span>
      </div>

      <div
        @click="status='diterima'; page=1"
        :class="['tab', status==='diterima' && 'active']"
      >
        Diterima
        <span class="count green">
          {{ data.filter(d => d.status==='diterima').length }}
        </span>
      </div>

      <div
        @click="status='ditolak'; page=1"
        :class="['tab', status==='ditolak' && 'active']"
      >
        Ditolak
        <span class="count red">
          {{ data.filter(d => d.status==='ditolak').length }}
        </span>
      </div>
    </div>

    <!-- Top -->
    <div class="table-top">
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
        <input v-model="search" placeholder="Cari..." />
      </div>
    </div>

    <!-- Table -->
    <table class="data-table">
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
        <tr v-for="(item, i) in paginated" :key="i">
          <td>{{ (page - 1) * perPage + i + 1 }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.paket }}</td>
          <td>{{ item.skema }}</td>
          <td>2024-04-22</td>
          <td>
            <button class="btn-proses" @click="proses(item)">
              ✏️ Proses
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <span>
        Showing {{ paginated.length }} of {{ filtered.length }} entries
      </span>

      <div>
        <button
          v-for="p in totalPages"
          :key="p"
          @click="page = p"
          :class="['page-btn', p === page && 'active']"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  font-family: "Segoe UI", sans-serif;
}

.title {
  margin-bottom: 4px;
}

.subtitle {
  color: #777;
  margin-bottom: 15px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.tab {
  cursor: pointer;
  color: #666;
}

.tab.active {
  font-weight: bold;
  border-bottom: 2px solid #2196f3;
}

.count {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 5px;
  color: #fff;
}

.blue { background: #4fc3f7; }
.green { background: #66bb6a; }
.red { background: #ef5350; }

/* Top table */
.table-top {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.table-top input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f1f1f1;
}

.data-table th,
.data-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.data-table td:last-child {
  text-align: center;
}

/* Button */
.btn-proses {
  background: #5bc0de;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.btn-proses:hover {
  background: #31b0d5;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.page-btn {
  margin-left: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.page-btn.active {
  background: #2196f3;
  color: white;
}
</style>