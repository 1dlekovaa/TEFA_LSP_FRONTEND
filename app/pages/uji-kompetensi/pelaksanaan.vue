<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

definePageMeta({
  layout: "dashboard"
})

const router = useRouter()

const dataUjikom = ref([
  {
    id: 1,
    namaPaket: "Rekayasa Perangkat Lunak",
    tanggal: "2026-04-10",
    tuk: "Lab RPL 1",
    jumlahAsesi: 25,
  },  
])

const search = ref("")
const perPage = ref(10)
const currentPage = ref(1)

const filteredData = computed(() => {
  return dataUjikom.value.filter((item) =>
    item.namaPaket.toLowerCase().includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / perPage.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + parseInt(perPage.value)
  return filteredData.value.slice(start, end)
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function goToAsesi(id) {
  router.push(`/uji-kompetensi/asesi/${id}`)
}

function goToTest(id) {
  router.push(`/uji-kompetensi/test/${id}`)
}

function goToHome() {
  router.push("/dashboard")
}

function goToPelaksanaan() {
  router.push("/uji-kompetensi/pelaksanaan")
}
</script>

<template>
  <div>

    <div class="page-header">
      <h1>Jadwal Uji Kompetensi</h1>
      <p class="sub-title">LSP P1 - SMK NEGERI 1 GARUT</p>
      <div class="breadcrumb">
        <span class="link" @click="goToHome">Home</span>
        /
        <span>Uji Kompetensi</span>
        /
        <span class="link" @click="goToPelaksanaan">Pelaksanaan</span>
      </div>
    </div>

    <div class="container">
      <h2>Data Jadwal Uji Kompetensi</h2>

      <!-- TOP CONTROL -->
      <div class="table-control">
        <div>
          Show
          <select v-model="perPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          entries
        </div>

        <div>
          Search:
          <input type="text" v-model="search" placeholder="cari..." />
        </div>
      </div>

      <!-- TABLE -->
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Paket</th>
            <th>Tanggal Sertifikasi</th>
            <th>TUK</th>
            <th>Jumlah Asesi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.id">
            <td>
              {{ index + 1 + (currentPage - 1) * perPage }}
            </td>
            <td>{{ item.namaPaket }}</td>
            <td>{{ item.tanggal }}</td>
            <td>{{ item.tuk }}</td>
            <td>{{ item.jumlahAsesi }}</td>
            <td>
              <button class="btn-blue" @click="goToAsesi(item.id)">
                Daftar Asesi
              </button>

              <button class="btn-orange" @click="goToTest(item.id)">
                Daftar Test
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINATION -->
      <div class="pagination">
        <button @click="changePage(currentPage - 1)">
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>

        <button @click="changePage(currentPage + 1)">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.page-header {
  background: #e5e5e5;
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
  color: #555;
}

.link {
  color: #2d7ef7;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.container {
  padding: 20px;
  background: #f5f5f5;
}

h2 {
  margin-bottom: 20px;
}

.table-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

input {
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
}

select {
  padding: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #ccc;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

thead tr {
  border-bottom: 2px solid #999;
}

th {
  background: #f1f1f1;
  font-weight: 600;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

.btn-blue {
  background: #2d7ef7;
  color: white;
  border: none;
  padding: 6px 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-orange {
  background: #f7a12d;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination {
  margin-top: 15px;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
}

.pagination .active {
  background: #2d7ef7;
  color: white;
  border-color: #2d7ef7;
}

</style>