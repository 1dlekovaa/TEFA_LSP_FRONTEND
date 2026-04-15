<template>
  <div>
    <h2>Data MUK KKNI Level III Sistem Informatika, Jaringan dan Aplikasi</h2>

   <NuxtLink to="/referensi" class="btn-back">
  ← Kembali
</NuxtLink>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Dokumen</th>
            <th>Nama Dokumen</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr class="section">
            <td colspan="5">A. PELAKSANAAN ASESMEN</td>
          </tr>

          <tr v-for="(item, i) in data" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.kode }}</td>
            <td>{{ item.nama }}</td>

            <td>
              <span class="badge">Blangko</span>
            </td>

            <td>
              <!-- HIJAU (PINDAH HALAMAN) -->
              <button class="btn green" @click="goDetail(item)">
                📄
              </button>

              <!-- ORANGE (DOWNLOAD) -->
              <button class="btn orange" @click="download(item)">
                ⬇
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from '#app'
definePageMeta({
  layout: "dashboard"
})
const data = [
  { kode: 'FR.APL.01', nama: 'Permohonan Sertifikasi Kompetensi' },
  { kode: 'FR.APL.02', nama: 'Asesmen Mandiri' },
  { kode: 'FR.MAPA.01', nama: 'Merencanakan Aktivitas dan Proses Asesmen' }
]

// tombol hijau
const goDetail = (item) => {
  navigateTo(`/muk-skema/${item.kode}`)
}

// tombol orange
const download = (item) => {
  alert(`Download ${item.kode}`)
}
</script>

<style scoped>
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f1f2f6;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
}

.section td {
  background: #dfe4ea;
  font-weight: bold;
}

.badge {
  background: #f39c12;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.btn {
  border: none;
  padding: 6px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.green {
  background: #27ae60;
  color: white;
}

.orange {
  background: #f39c12;
  color: white;
}

.btn-back {
  background: #f39c12;
  color: white;
  padding: 8px 12px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
}
</style>