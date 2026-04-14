<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const skemaId = Number(route.params.id);

// DATA
const units = ref([
  { id: 1, skema_id: 1, kode_unit: "U-001", judul_unit: "Mengoperasikan Komputer", jenis_standar: "SKKNI", jumlah_elemen: 3 },
  { id: 2, skema_id: 1, kode_unit: "U-002", judul_unit: "Mengelola Database", jenis_standar: "SKKNI", jumlah_elemen: 5 },
  { id: 3, skema_id: 2, kode_unit: "U-003", judul_unit: "Membuat Aplikasi Web", jenis_standar: "Okupasi", jumlah_elemen: 4 },
  { id: 4, skema_id: 2, kode_unit: "U-004", judul_unit: "Desain UI/UX", jenis_standar: "Okupasi", jumlah_elemen: 2 },
  { id: 5, skema_id: 3, kode_unit: "U-005", judul_unit: "Digital Marketing Campaign", jenis_standar: "Klaster", jumlah_elemen: 6 },
]);

// FILTER
const filteredUnits = computed(() =>
  units.value.filter((unit) => unit.skema_id === skemaId)
);

// SEARCH
const search = ref("");
const perPage = ref(5);
const currentPage = ref(1);

const filteredData = computed(() =>
  filteredUnits.value.filter((item) =>
    (item?.judul_unit || "").toLowerCase().includes(search.value.toLowerCase())
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
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/referensi/skema");
  }
};
</script>

<template>
  <div>

    <!-- TITLE -->
    <h1 class="text-2xl font-semibold mb-1">
      Unit
    </h1>
     <!-- ✅ BREADCRUMB PINDAH KE BAWAH -->
      <div class="mt-6">
        <nav class="text-sm text-gray-500 mb-4">
          <ol class="flex items-center gap-2 flex-wrap">

            <li>
              <NuxtLink to="/dashboard" class="hover:text-blue-600">
                Dashboard
              </NuxtLink>
            </li>

            <li>/</li>

            <li>
              <NuxtLink to="/referensi/skema" class="hover:text-blue-600">
                Referensi
              </NuxtLink>
            </li>

            <li>/</li>

            <li>
              <NuxtLink to="/referensi/skema" class="hover:text-blue-600">
                Data Skema
              </NuxtLink>
            </li>

            <li>/</li>

            <li class="text-blue-600 font-semibold">
              Data-Skema-Unit
            </li>

          </ol>
        </nav>
      </div>

    <div class="bg-white rounded shadow p-4">
      <!-- HEADER -->
      <h2 class="font-semibold mb-4">Data Unit</h2>

      


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
          Tambah Unit
        </button>
        <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Salin Unit
        </button>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full border text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 border text-left">No</th>
              <th class="p-2 border text-left">Kode Unit</th>
              <th class="p-2 border text-left">Judul Unit</th>
              <th class="p-2 border text-left">Jenis Standar</th>
              <th class="p-2 border text-center">Jumlah Elemen</th>
              <th class="p-2 border text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(unit, index) in paginatedData" :key="unit.id" class="hover:bg-gray-50">
              <td class="p-2 border">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="p-2 border">{{ unit.kode_unit }}</td>
              <td class="p-2 border">{{ unit.judul_unit }}</td>
              <td class="p-2 border">{{ unit.jenis_standar }}</td>

              <td class="p-2 border text-center">
                <button class="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  {{ unit.jumlah_elemen }} Elemen
                </button>
              </td>

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
              <td colspan="6" class="p-2 border text-center">
                Belum ada unit
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- FOOTER PAGINATION -->
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