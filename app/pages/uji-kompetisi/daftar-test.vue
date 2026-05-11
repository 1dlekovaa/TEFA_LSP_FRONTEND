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
            <option :value="5">5</option>
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

          <!-- EMPTY -->
          <tr v-if="paginatedData.length === 0">
            <td colspan="6" style="text-align:center; padding:20px;">
              Data tidak ditemukan
            </td>
          </tr>

          <!-- DATA -->
          <tr v-for="(item, i) in paginatedData" :key="i">
            <td>{{ (currentPage - 1) * limit + i + 1 }}</td>
            <td>{{ item.jenis }}</td>
            <td>{{ item.durasi }}</td>
            <td>{{ item.mulai }}</td>
            <td>{{ item.akhir }}</td>

            <!-- ACTION -->
            <td class="aksi">

              <!-- DETAIL -->
              <button class="icon-btn detail" title="Detail">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <!-- EDIT -->
              <button class="icon-btn edit" title="Edit">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

      <!-- FOOTER -->
      <div class="pagination-wrapper">

        <!-- INFO -->
        <div class="showing">
          {{ showingText }}
        </div>

        <!-- PAGINATION -->
        <div class="pagination">

          <!-- FIRST -->
          <button
            @click="goToPage(1)"
            :disabled="currentPage === 1"
            class="page-btn"
          >
            First
          </button>

          <!-- PREV -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="page-btn"
          >
            Prev
          </button>

          <!-- NUMBER -->
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'page-btn',
              currentPage === page ? 'active-page' : ''
            ]"
          >
            {{ page }}
          </button>

          <!-- NEXT -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            Next
          </button>

          <!-- LAST -->
          <button
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            Last
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

definePageMeta({ layout: "dashboard" });

const router = useRouter();

const paket = ref({
  nama: "PAKET 2 SIJ SMKN 1 GARUT",
  judul:
    "Skema Sertifikasi KKNI Level III Pada Kompetensi Keahlian Sistem Informatika, Jaringan Dan Aplikasi",
  tanggal: "27 Maret 2023",
  tuk: "TUK Sistem Informatika, Jaringan dan Aplikasi",
});

const search = ref("");
const limit = ref(5);
const currentPage = ref(1);

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
  {
    jenis: "Wawancara",
    durasi: "01:30:00",
    mulai: "2023-04-01 08:00:00",
    akhir: "2023-04-01 10:00:00",
  },
  {
    jenis: "Essay",
    durasi: "03:00:00",
    mulai: "2023-04-02 09:00:00",
    akhir: "2023-04-02 12:00:00",
  },
  {
    jenis: "Presentasi",
    durasi: "02:30:00",
    mulai: "2023-04-03 13:00:00",
    akhir: "2023-04-03 15:30:00",
  },
]);

// FILTER
const filteredData = computed(() => {
  return data.value.filter((item) =>
    item.jenis.toLowerCase().includes(search.value.toLowerCase())
  );
});

// TOTAL PAGE
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / limit.value);
});

// PAGINATED DATA
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * limit.value;
  const end = start + limit.value;

  return filteredData.value.slice(start, end);
});

// SHOWING TEXT
const showingText = computed(() => {
  const total = filteredData.value.length;

  if (total === 0) {
    return "Showing 0 to 0 of 0 entries";
  }

  const start = (currentPage.value - 1) * limit.value + 1;
  const end = Math.min(currentPage.value * limit.value, total);

  return `Showing ${start} to ${end} of ${total} entries`;
});

// PAGINATION FUNCTION
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// RESET PAGE
watch([search, limit], () => {
  currentPage.value = 1;
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.container {
  background: #f6f8fb;
  padding: 20px;
}

/* TITLE */
.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
}

/* INFO */
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

/* ACTION */
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

/* CARD */
.card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* HEADER */
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

/* TABLE */
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

/* ACTION ICON */
.aksi {
  display: flex;
  gap: 6px;
  justify-content: center;
}

/* BUTTON BASE */
.icon-btn {
  border: none;
  padding: 7px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

/* ICON */
.icon {
  width: 16px;
  height: 16px;
  color: white;
}

/* COLORS */
.detail {
  background: #f59e0b;
}

.edit {
  background: #22c55e;
}

.delete {
  background: #ef4444;
}

/* PAGINATION */
.pagination-wrapper {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.showing {
  font-size: 13px;
  color: #666;
}

.pagination {
  display: flex;
  gap: 5px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.page-btn:hover {
  background: #f3f4f6;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.active-page {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}
</style>