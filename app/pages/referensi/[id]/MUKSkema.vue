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
              <!-- HIJAU -->
              <button class="btn green" @click="goDetail(item)">
                📄
              </button>

              <!-- ORANGE -->
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
}

tr:hover {
  background: #fafafa;
}

/* SECTION */
.section td {
  background: #dfe4ea;
  font-weight: bold;
  color: #2f3542;
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
  border: none;
  padding: 6px 10px;
  margin-right: 5px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
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