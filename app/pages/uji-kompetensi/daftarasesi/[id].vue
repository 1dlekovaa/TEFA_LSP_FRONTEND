<script setup>
definePageMeta({
  layout: "dashboard",
});

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// DATA
const asesies = ref([
  {
    id: 1,
    nama: "ILHAM MULAHMAN",
    kelas: "XIII SIJ 2",
    rekomendasi: "Kompeten",
  },
  {
    id: 2,
    nama: "Budi",
    kelas: "XII RPL",
    rekomendasi: "Kompeten",
  },
  {
    id: 3,
    nama: "Siti",
    kelas: "XII TKJ",
    rekomendasi: "Belum Kompeten",
  },
]);

const search = ref("");
const perPage = ref(10);
const currentPage = ref(1);

// FILTER
const filteredData = computed(() => {
  return asesies.value.filter((item) =>
    item.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

// PAGINATION
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / perPage.value)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredData.value.slice(start, start + perPage.value);
});

// TEXT SHOWING
const showingText = computed(() => {
  const total = filteredData.value.length;
  if (total === 0) return "Showing 0 to 0 of 0 entries";

  const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(currentPage.value * perPage.value, total);

  return `Showing ${start} to ${end} of ${total} entries`;
});

// NAVIGASI
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// RESET
watch([search, perPage], () => {
  currentPage.value = 1;
});

// BACK
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="p-4">

    <!-- BUTTON -->
    <div class="flex gap-2 mb-4">
      <button @click="goBack" class="bg-orange-400 text-white px-4 py-2 rounded">
        ← Kembali
      </button>

      <button class="bg-green-500 text-white px-4 py-2 rounded">
        ⬇ Download Nilai
      </button>

      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        ☰ Proses Nilai Observasi
      </button>
    </div>

    <!-- FILTER -->
    <div class="flex justify-between mb-2">
      <div>
        Show
        <select v-model="perPage" class="border px-2 py-1 mx-1">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
        </select>
        entries
      </div>

      <div>
        Search:
        <input v-model="search" class="border px-2 py-1 ml-2" />
      </div>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-200 text-center">
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2">Nama Asesi</th>
            <th class="border p-2">Kelas</th>
            <th class="border p-2">APL-01</th>
            <th class="border p-2">APL-02</th>
            <th class="border p-2">AK-01</th>
            <th class="border p-2">FR.IA.01</th>
            <th class="border p-2">FR.IA.03</th>
            <th class="border p-2">FR.IA.05</th>
            <th class="border p-2">FR.IA.06</th>
            <th class="border p-2">FR.IA.07</th>
            <th class="border p-2">Rekomendasi</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="paginatedData.length === 0">
            <td colspan="13" class="text-center p-3">Data tidak ditemukan</td>
          </tr>

          <tr v-for="(item, index) in paginatedData" :key="item.id" class="text-center">
            <td class="border p-2">
              {{ (currentPage - 1) * perPage + index + 1 }}
            </td>

            <td class="border p-2 text-left">{{ item.nama }}</td>
            <td class="border p-2">{{ item.kelas }}</td>

            <!-- BULAT -->
            <td class="border p-2">
              <div class="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center">✖</div>
            </td>
            <td class="border p-2">
              <div class="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center">✖</div>
            </td>
            <td class="border p-2">
              <div class="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center">✖</div>
            </td>

            <!-- FR -->
            <td class="border p-2 text-left">
              <button class="bg-blue-500 text-white px-3 py-1 rounded mb-2">✏ isi FR.IA.01</button>
              <div class="text-xs">0 K<br>0 BK</div>
            </td>

            <td class="border p-2 text-left">
              <button class="bg-blue-500 text-white px-3 py-1 rounded mb-2">✏ isi FR.IA.03</button>
              <div class="text-xs">0 K<br>0 BK</div>
            </td>

            <td class="border p-2 text-left">
              <button class="bg-blue-500 text-white px-3 py-1 rounded mb-2">✏ isi FR.IA.05</button>
              <div class="text-xs">0 K<br>0 BK</div>
            </td>

            <td class="border p-2 text-left">
              <button class="bg-blue-500 text-white px-3 py-1 rounded mb-2">✏ isi FR.IA.06</button>
              <div class="text-xs">0 K<br>0 BK</div>
            </td>

            <td class="border p-2 text-left">
              <button class="bg-blue-500 text-white px-3 py-1 rounded mb-2">✏ isi FR.IA.07</button>
              <div class="text-xs">0 K<br>0 BK</div>
            </td>

            <!-- STATUS -->
            <td class="border p-2">
              <span class="bg-green-500 text-white px-3 py-1 rounded">
                {{ item.rekomendasi }}
              </span>
            </td>

            <!-- AKSI -->
            <td class="border p-2">
              <button class="bg-blue-400 text-white px-3 py-1 rounded">
                Proses
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FOOTER -->
    <div class="flex justify-between items-center mt-3 text-sm">
      <div>{{ showingText }}</div>

      <div class="flex gap-2">
        <button @click="prevPage">Prev</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>

  </div>
</template>