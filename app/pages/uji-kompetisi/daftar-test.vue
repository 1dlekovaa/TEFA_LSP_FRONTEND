<template>
  <div class="container">

    <!-- TITLE -->
    <h2 class="title">Daftar Test Uji Kompetensi</h2>

    <!-- INFO -->
    <table class="info-table">
      <tr><td>Nama Paket</td><td>:</td><td>{{ paket.nama }}</td></tr>
      <tr><td>Judul Skema</td><td>:</td><td>{{ paket.judul }}</td></tr>
      <tr><td>Jadwal Ujikom</td><td>:</td><td>{{ paket.tanggal }}</td></tr>
      <tr><td>TUK</td><td>:</td><td>{{ paket.tuk }}</td></tr>
    </table>

    <!-- ACTION -->
    <div class="actions">
      <button class="btn back" @click="goBack">← Kembali</button>
      <button class="btn primary">Jadwalkan Test</button>
    </div>

    <!-- CARD -->
    <div class="card">

      <!-- HEADER -->
      <div class="table-header">
        <div>
          Show
          <select v-model="limit">
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
          entries
        </div>

        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="search"
        />
      </div>

      <!-- TABLE -->
      <table class="main-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Test</th>
            <th>Durasi</th>
            <th>Mulai</th>
            <th>Akhir</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in filteredData" :key="item.id">
            <td>{{ i + 1 }}</td>
            <td>{{ item.jenis }}</td>
            <td>{{ item.durasi }}</td>
            <td>{{ item.mulai }}</td>
            <td>{{ item.akhir }}</td>

            <!-- ACTION -->
            <td class="aksi">

              <NuxtLink
  :to="{
    path: '/uji-kompetisi/list-test',
    query: { id: item.id }
  }"
  class="icon-btn detail"
>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</NuxtLink>

              <!-- EDIT -->
              <button class="icon-btn edit" title="Edit">
                <svg
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 4h6l3 3-9 9H5v-6l6-6z"
                  />
                </svg>
              </button>

              <!-- DELETE -->
              <button class="icon-btn delete" title="Hapus">
                <svg
                  class="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6h18M8 6V4h8v2M10 11v6M14 11v6M5 6l1 14h12l1-14"
                  />
                </svg>
              </button>

            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "dashboard",
});

const router = useRouter();

/* =========================
   DATA
========================= */
const paket = ref({
  nama: "PAKET 2 SIJ SMKN 1 GARUT",
  judul:
    "Skema Sertifikasi KKNI Level III Pada Kompetensi Keahlian Sistem Informatika, Jaringan Dan Aplikasi",
  tanggal: "27 Maret 2023",
  tuk: "TUK Sistem Informatika, Jaringan dan Aplikasi",
});

const search = ref("");
const limit = ref(10);

const data = ref([
  {
    id: 1,
    jenis: "Praktik Demonstrasi",
    durasi: "04:00:00",
    mulai: "2023-03-27 12:30:00",
    akhir: "2023-03-31 23:59:00",
  },
  {
    id: 2,
    jenis: "Soal Pilihan Ganda",
    durasi: "02:00:00",
    mulai: "2023-03-29 09:00:00",
    akhir: "2023-04-14 23:59:00",
  },
  {
    id: 3,
    jenis: "Praktik Demonstrasi",
    durasi: "12:00:00",
    mulai: "2023-03-29 15:42:00",
    akhir: "2023-04-14 23:59:00",
  },
]);

/* =========================
   FILTER
========================= */
const filteredData = computed(() => {
  return data.value
    .filter((item) =>
      item.jenis.toLowerCase().includes(search.value.toLowerCase())
    )
    .slice(0, limit.value);
});

/* =========================
   NAVIGATION
========================= */
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.container {
  background: #f6f8fb;
  padding: 20px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
} 

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background: #fff;
}

.info-table td {
  border: 1px solid #eee;
  padding: 10px;
}

.info-table tr td:first-child {
  width: 180px;
  font-weight: 600;
  background: #f9fafb;
}

.actions {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.back {
  background: #f59e0b;
  color: white;
}

.primary {
  background: #0ea5e9;
  color: white;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
}

.search {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.main-table {
  width: 100%;
  border-collapse: collapse;
}

.main-table th,
.main-table td {
  border: 1px solid #eee;
  padding: 10px;
  font-size: 13px;
}

.main-table th {
  background: #f3f4f6;
}

.aksi {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.icon-btn {
  border: none;
  padding: 7px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.icon {
  width: 16px;
  height: 16px;
  color: white;
}

.detail {
  background: #f59e0b;
}

.edit {
  background: #22c55e;
}

.delete {
  background: #ef4444;
}

.icon-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}
</style>