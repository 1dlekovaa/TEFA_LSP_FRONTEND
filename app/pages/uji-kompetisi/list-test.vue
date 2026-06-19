<template>
  <div class="page">

    <!-- HEADER -->
    <div class="page-header">
      <h1>Daftar Test Kompetensi Peserta Didik</h1>
      <p>LSP P1 - SMK NEGERI 1 GARUT</p>
    </div>

    <!-- INFO CARD -->
    <div class="card">
      <h2>Daftar Test Uji Kompetensi</h2>

      <table class="info-table">
        <tbody>
          <tr>
            <td>Nama Paket</td>
            <td>:</td>
            <td>PAKET 2 SIJ SMKN 1 GARUT</td>
          </tr>

          <tr>
            <td>Judul Skema</td>
            <td>:</td>
            <td>
              Skema Sertifikasi KKNI Level III Pada Kompetensi
              Keahlian Sistem Informatika, Jaringan Dan Aplikasi
            </td>
          </tr>

          <tr>
            <td>Jadwal Ujikom</td>
            <td>:</td>
            <td>27 Maret 2023</td>
          </tr>

          <tr>
            <td>TUK</td>
            <td>:</td>
            <td>TUK Sistem Informatika, Jaringan dan Aplikasi</td>
          </tr>

          <tr>
            <td>Jenis Test</td>
            <td>:</td>
            <td>Praktik Demonstrasi</td>
          </tr>
        </tbody>
      </table>

      <!-- ACTION BUTTON -->
      <div class="top-action">

        <NuxtLink
          to="/uji-kompetisi/daftar-test"
          class="btn back"
        >
          ← Kembali
        </NuxtLink>

        <button class="btn edit-btn">
          ✏ Ubah
        </button>

      </div>

      <!-- TABLE CONTROL -->
      <div class="table-control">

        <div>
          Show
          <select v-model="perPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
          </select>
          entries
        </div>

        <div>
          Search:
          <input
            v-model="search"
            type="text"
            class="search-input"
          />
        </div>

      </div>

      <!-- TABLE -->
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomor Peserta</th>
            <th>Nama Peserta</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="(item, index) in paginatedData"
            :key="item.id"
          >
            <td>
              {{ index + 1 + (currentPage - 1) * perPage }}
            </td>

            <td>{{ item.nomor }}</td>

            <td>{{ item.nama }}</td>

            <td>{{ item.kelas }}</td>

            <td>
              <span
                class="status"
                :class="item.status === 'Selesai'
                  ? 'done'
                  : 'progress'"
              >
                {{ item.status }}
              </span>
            </td>

            <td>{{ item.nilai }}</td>

            <td class="aksi">

              <button class="btn-small refresh">
                ↻
              </button>

              <button class="btn-small delete">
                🗑
              </button>

              <button class="btn-small success">
                ✓
              </button>

            </td>
          </tr>

          <tr v-if="paginatedData.length === 0">
            <td colspan="7">
              Data tidak ditemukan
            </td>
          </tr>

        </tbody>
      </table>

      <!-- PAGINATION -->
      <div class="pagination">

        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

definePageMeta({
  layout: "dashboard",
});

const search = ref("");
const perPage = ref(10);
const currentPage = ref(1);

/* DATA */
const data = ref([
  {
    id: 1,
    nomor: "23021701010834",
    nama: "ILHAM MULAHMAN",
    kelas: "XIII SIJ 2",
    status: "Sedang Mengerjakan",
    nilai: "0.00",
  },

  {
    id: 2,
    nomor: "23021701010833",
    nama: "ILHAM KURNIAWAN",
    kelas: "XIII SIJ 2",
    status: "Sedang Mengerjakan",
    nilai: "0.00",
  },

  {
    id: 3,
    nomor: "23021701010832",
    nama: "HARIS RAMDAN PUTRA",
    kelas: "XIII SIJ 2",
    status: "Selesai",
    nilai: "85.00",
  },
]);

/* FILTER */
const filteredData = computed(() => {
  return data.value.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

/* PAGINATION */
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;

  return filteredData.value.slice(
    start,
    start + perPage.value
  );
});

/* RESET PAGE */
watch([search, perPage], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.page {
  padding: 20px;
  background: #f5f6fa;
  min-height: 100vh;
}

.page-header h1 {
  margin-bottom: 5px;
  font-size: 30px;
}

.page-header p {
  color: gray;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.info-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.top-action {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.btn {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.back {
  background: orange;
}

.edit-btn {
  background: #38bdf8;
}

.table-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.search-input {
  padding: 5px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: #f1f5f9;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.status {
  padding: 6px 10px;
  border-radius: 5px;
  color: white;
  font-size: 13px;
}

.progress {
  background: orange;
}

.done {
  background: green;
}

.aksi {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.btn-small {
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.refresh {
  background: orange;
}

.delete {
  background: red;
}

.success {
  background: green;
}

/* PAGINATION */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.pagination button {
  border: 1px solid #ddd;
  background: white;
  padding: 8px 12px;
  cursor: pointer;
}

.pagination button.active {
  background: #0ea5e9;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>