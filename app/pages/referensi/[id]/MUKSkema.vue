<template>
  <div class="p-4">

    <!-- TITLE -->
    <h1 class="text-2xl font-semibold">MUK Skema</h1>

    <!-- BREADCRUMB -->
    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <NuxtLink to="/referensi" class="hover:underline">Referensi</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Data Skema</span>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">MUK Skema</span>
    </div>

    <!-- SUB TITLE -->
    <h2 class="text-lg font-medium mb-3">
      Data MUK KKNI Level III Sistem Informatika, Jaringan dan Aplikasi
    </h2>

    <!-- BACK BUTTON -->
    <NuxtLink to="/referensi" class="btn-back">
      ← Kembali
    </NuxtLink>

    <!-- CARD -->
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Dokumen</th>
            <th>Nama Dokumen</th>
            <th>Keterangan</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in data" :key="i">

            <td>{{ i + 1 }}</td>
            <td>{{ item.kode }}</td>
            <td>{{ item.nama }}</td>

            <td>
              <span class="badge">Blangko</span>
            </td>

            <!-- ✅ FIX AKSI SEJAJAR -->
            <td class="text-center align-middle">
              <div class="action-box">

                <!-- MENU -->
                <button class="btn green" @click="goMenu(item)">
                  <AlignJustify class="w-4 h-4" />
                </button>

                <!-- PRINT -->
                <button class="btn orange" @click="printPage">
                  <Printer class="w-4 h-4" />
                </button>

              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { Printer, AlignJustify } from 'lucide-vue-next'

definePageMeta({
  layout: "dashboard"
})

const data = [
  { kode: 'FR.APL.01', nama: 'Permohonan Sertifikasi Kompetensi' },
  { kode: 'FR.APL.02', nama: 'Asesmen Mandiri' },
  { kode: 'FR.MAPA.01', nama: 'Merencanakan Aktivitas dan Proses Asesmen' }
]

// MENU
const goMenu = (item) => {
  console.log("menu klik:", item)
}

// PRINT
const printPage = () => {
  window.print()
}
</script>

<style scoped>

/* CARD */
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  table-layout: fixed;
}

th {
  background: #f5f6fa;
  color: #555;
  font-weight: 600;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
  vertical-align: middle; /* 🔥 ini penting */
}

/* CENTER */
.text-center {
  text-align: center;
}

/* ACTION BOX (INI KUNCI UTAMA BIAR RAPIH) */
.action-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

/* BADGE */
.badge {
  background: #ffeaa7;
  color: #d35400;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* BUTTON */
.btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.green {
  background: #2ecc71;
  color: white;
}

.green:hover {
  background: #27ae60;
}

.orange {
  background: #f39c12;
  color: white;
}

.orange:hover {
  background: #e67e22;
}

/* BACK BUTTON */
.btn-back {
  display: inline-block;
  background: #f39c12;
  color: white;
  padding: 8px 14px;
  margin-bottom: 15px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
}

.btn-back:hover {
  background: #e67e22;
}

</style>