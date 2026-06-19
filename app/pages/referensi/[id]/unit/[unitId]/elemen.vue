<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const unitId = Number(route.params.unitId);

// DATA
const units = ref([
  { id: 1, skema_id: 1, kode_unit: "U-001", judul_unit: "Mengoperasikan Komputer", jenis_standar: "SKKNI", jumlah_elemen: 3 },
  { id: 2, skema_id: 1, kode_unit: "U-002", judul_unit: "Mengelola Database", jenis_standar: "SKKNI", jumlah_elemen: 5 },
  { id: 3, skema_id: 2, kode_unit: "U-003", judul_unit: "Membuat Aplikasi Web", jenis_standar: "Okupasi", jumlah_elemen: 4 },
  { id: 4, skema_id: 2, kode_unit: "U-004", judul_unit: "Desain UI/UX", jenis_standar: "Okupasi", jumlah_elemen: 2 },
  { id: 5, skema_id: 3, kode_unit: "U-005", judul_unit: "Digital Marketing Campaign", jenis_standar: "Klaster", jumlah_elemen: 6 },
]);

const currentUnit = computed(() => units.value.find(u => u.id === unitId));
const skemaId = computed(() => currentUnit.value?.skema_id);

// DATA
const elements = ref([
  // Unit 1: Mengoperasikan Komputer - 3 elemen
  { id: 1, unit_id: 1, kode_elemen: "E-001", judul_elemen: "Menyalakan Komputer", kriteria_unjuk_kerja: "Komputer menyala dengan benar" },
  { id: 2, unit_id: 1, kode_elemen: "E-002", judul_elemen: "Menggunakan Mouse dan Keyboard", kriteria_unjuk_kerja: "Input data dengan akurat" },
  { id: 3, unit_id: 1, kode_elemen: "E-003", judul_elemen: "Menyimpan File", kriteria_unjuk_kerja: "File tersimpan di lokasi yang tepat" },
  // Unit 2: Mengelola Database - 5 elemen
  { id: 4, unit_id: 2, kode_elemen: "E-004", judul_elemen: "Membuat Database", kriteria_unjuk_kerja: "Database terbuat sesuai spesifikasi" },
  { id: 5, unit_id: 2, kode_elemen: "E-005", judul_elemen: "Menambahkan Data", kriteria_unjuk_kerja: "Data berhasil dimasukkan" },
  { id: 6, unit_id: 2, kode_elemen: "E-006", judul_elemen: "Mengedit Data", kriteria_unjuk_kerja: "Data terupdate dengan benar" },
  { id: 7, unit_id: 2, kode_elemen: "E-007", judul_elemen: "Menghapus Data", kriteria_unjuk_kerja: "Data terhapus tanpa error" },
  { id: 8, unit_id: 2, kode_elemen: "E-008", judul_elemen: "Membuat Backup", kriteria_unjuk_kerja: "Backup berhasil dibuat" },
  // Unit 3: Membuat Aplikasi Web - 4 elemen
  { id: 9, unit_id: 3, kode_elemen: "E-009", judul_elemen: "Perencanaan Aplikasi", kriteria_unjuk_kerja: "Rencana aplikasi lengkap" },
  { id: 10, unit_id: 3, kode_elemen: "E-010", judul_elemen: "Pengembangan Frontend", kriteria_unjuk_kerja: "Interface user-friendly" },
  { id: 11, unit_id: 3, kode_elemen: "E-011", judul_elemen: "Pengembangan Backend", kriteria_unjuk_kerja: "Logika bisnis berfungsi" },
  { id: 12, unit_id: 3, kode_elemen: "E-012", judul_elemen: "Testing Aplikasi", kriteria_unjuk_kerja: "Aplikasi bebas bug" },
  // Unit 4: Desain UI/UX - 2 elemen
  { id: 13, unit_id: 4, kode_elemen: "E-013", judul_elemen: "Wireframing", kriteria_unjuk_kerja: "Wireframe sesuai kebutuhan" },
  { id: 14, unit_id: 4, kode_elemen: "E-014", judul_elemen: "Prototyping", kriteria_unjuk_kerja: "Prototype interaktif" },
  // Unit 5: Digital Marketing Campaign - 6 elemen
  { id: 15, unit_id: 5, kode_elemen: "E-015", judul_elemen: "Analisis Target Audience", kriteria_unjuk_kerja: "Audience teridentifikasi" },
  { id: 16, unit_id: 5, kode_elemen: "E-016", judul_elemen: "Perencanaan Konten", kriteria_unjuk_kerja: "Konten strategis" },
  { id: 17, unit_id: 5, kode_elemen: "E-017", judul_elemen: "Pembuatan Konten", kriteria_unjuk_kerja: "Konten berkualitas" },
  { id: 18, unit_id: 5, kode_elemen: "E-018", judul_elemen: "Distribusi Konten", kriteria_unjuk_kerja: "Konten tersebar luas" },
  { id: 19, unit_id: 5, kode_elemen: "E-019", judul_elemen: "Monitoring Kinerja", kriteria_unjuk_kerja: "Metrik terukur" },
  { id: 20, unit_id: 5, kode_elemen: "E-020", judul_elemen: "Optimasi Campaign", kriteria_unjuk_kerja: "Campaign lebih efektif" },
]);

// FILTER
const filteredElements = computed(() =>
  elements.value.filter((element) => element.unit_id === unitId)
);

// SEARCH
const search = ref("");
const perPage = ref(5);
const currentPage = ref(1);

const filteredData = computed(() =>
  filteredElements.value.filter((item) =>
    (item?.judul_elemen || "").toLowerCase().includes(search.value.toLowerCase())
  )
);

// PAGINATION
const totalPages = computed(() => {
  if (!filteredData.value.length) return 1;
  return Math.ceil(filteredData.value.length / perPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredData.value.slice(start, start + perPage.value);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// ACTION
const goBack = () => {
  router.push(`/referensi/${skemaId.value}/unit`);
};
</script>

<template>
  <div>
    <!-- TITLE -->
    <h1 class="text-2xl font-semibold mb-1">
      Elemen Unit
    </h1>

    <!-- BREADCRUMB -->
    <div class="mt-6">
      <nav class="text-sm text-gray-500 mb-4">
        <ol class="flex items-center gap-2 flex-wrap">
          <li>
            <NuxtLink to="/dashboard" class="hover:text-blue-600">
              Dashboard
            </NuxtLink>
          </li>
          <li>/</li>
          <li>Referensi</li>
          <li>/</li>
          <li>
            <NuxtLink to="/referensi/skema" class="hover:text-blue-600">
              Data Skema
            </NuxtLink>
          </li>
          <li>/</li>
          <li>
            <NuxtLink :to="`/referensi/${skemaId}/unit`" class="hover:text-blue-600">
              Data Unit
            </NuxtLink>
          </li>
          <li>/</li>
          <li class="text-blue-600 font-semibold">
            Elemen Unit
          </li>
        </ol>
      </nav>
    </div>

    <div class="bg-white rounded shadow p-4">
      <h2 class="font-semibold mb-4">Data Elemen</h2>

      <!-- CONTROL -->
      <div class="flex justify-between items-center mb-4 text-sm">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          entries
        </div>

        <div class="flex items-center gap-2">
          <span>Search:</span>
          <input v-model="search" class="border px-2 py-1 rounded" />
        </div>
      </div>

      <!-- BUTTON -->
      <div class="flex items-center gap-2 mb-4">
        <button @click="goBack" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
          Kembali
        </button>
        <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Tambah Elemen
        </button>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 border text-left">No</th>
              <th class="p-2 border text-left">Kode Elemen</th>
              <th class="p-2 border text-left">Judul Elemen</th>
              <th class="p-2 border text-left">Kriteria Unjuk Kerja</th>
              <th class="p-2 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(element, index) in paginatedData" :key="element.id" class="hover:bg-gray-50">
              <td class="p-2 border">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="p-2 border">{{ element.kode_elemen }}</td>
              <td class="p-2 border">{{ element.judul_elemen }}</td>
              <td class="p-2 border">{{ element.kriteria_unjuk_kerja }}</td>
              <td class="p-2 border text-center">
                <button class="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  Edit
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded text-xs ml-1">
                  Hapus
                </button>
              </td>
            </tr>

            <tr v-if="filteredData.length === 0">
              <td colspan="5" class="p-2 border text-center">
                Belum ada elemen
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing {{ (currentPage - 1) * perPage + 1 }}
          to {{ Math.min(currentPage * perPage, filteredData.length) }}
          of {{ filteredData.length }} entries
        </div>

        <div class="flex justify-center gap-1">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 border rounded">
            Previous
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="px-3 py-1 border rounded"
            :class="currentPage === page ? 'bg-blue-500 text-white' : ''"
          >
            {{ page }}
          </button>

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 