<template>
  <div class="container">
    <h2>Daftar Test Uji Kompetensi</h2>

    <!-- Info Paket (TABEL) -->
    <table class="info-table">
      <tr>
        <td>Nama Paket</td>
        <td>:</td>
        <td>{{ paket.nama }}</td>
      </tr>
      <tr>
        <td>Judul Skema</td>
        <td>:</td>
        <td>{{ paket.judul }}</td>
      </tr>
      <tr>
        <td>Jadwal Ujikom</td>
        <td>:</td>
        <td>{{ paket.tanggal }}</td>
      </tr>
      <tr>
        <td>TUK</td>
        <td>:</td>
        <td>{{ paket.tuk }}</td>
      </tr>
    </table>

    <!-- Tombol -->
    <div class="actions">
      <button class="btn back" @click="goBack">← Kembali</button>
      <button class="btn primary">Jadwalkan Test</button>
    </div>

    <!-- Table Data -->
    <div class="table-wrapper">
      <div class="table-header">
        <div>
          Show
          <select v-model="limit">
            <option value="10">10</option>
            <option value="25">25</option>
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

      <table class="main-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Test</th>
            <th>Durasi</th>
            <th>Waktu Mulai</th>
            <th>Waktu Akhir</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in filteredData" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.jenis }}</td>
            <td>{{ item.durasi }}</td>
            <td>{{ item.mulai }}</td>
            <td>{{ item.akhir }}</td>
            <td>
              <button class="btn success">📋</button>
              <button class="btn warning">✏️</button>
              <button class="btn danger">🗑️</button>
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
    jenis: "Praktik Demonstrasi",
    durasi: "04:00:00",
    mulai: "2023-03-27 12:30:00",
    akhir: "2023-03-31 23:59:00",
  },
  {
    jenis: "Soal Pilihan Ganda",
    durasi: "02:00:00",
    mulai: "2023-03-29 09:00:00",
    akhir: "2023-04-14 23:59:00",
  },
  {
    jenis: "Praktik Demonstrasi",
    durasi: "12:00:00",
    mulai: "2023-03-29 15:42:00",
    akhir: "2023-04-14 23:59:00",
  },
]);

const filteredData = computed(() => {
  return data.value.filter((item) =>
    item.jenis.toLowerCase().includes(search.value.toLowerCase())
  );
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}

/* ===== INFO TABLE ===== */
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.info-table td {
  border: 1px solid #ccc;
  padding: 10px;
}

.info-table tr td:first-child {
  width: 200px;
  font-weight: bold;
  background: #f5f5f5;
}

.info-table tr td:nth-child(2) {
  width: 20px;
  text-align: center;
}

/* ===== BUTTON ===== */
.actions {
  margin-bottom: 15px;
}

.btn {
  padding: 8px 12px;
  border: none;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.back {
  background: orange;
  color: white;
}

.primary {
  background: #5bc0de;
  color: white;
}

.success {
  background: #5cb85c;
  color: white;
}

.warning {
  background: #f0ad4e;
  color: white;
}

.danger {
  background: #d9534f;
  color: white;
}

/* ===== TABLE ===== */
.table-wrapper {
  background: #fff;
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.search {
  padding: 5px;
}

.main-table {
  width: 100%;
  border-collapse: collapse;
}

.main-table th,
.main-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.main-table th {
  background: #f5f5f5;
}
</style>