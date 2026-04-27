<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
});

const router = useRouter();
const route = useRoute();
const unitId = Number(route.params.unitId);

// ================= DATA =================
const units = ref([
  { id: 1, skema_id: 1, kode_unit: "U-001", judul_unit: "Mengoperasikan Komputer", jenis_standar: "SKKNI", jumlah_elemen: 3 },
  { id: 2, skema_id: 1, kode_unit: "U-002", judul_unit: "Mengelola Database", jenis_standar: "SKKNI", jumlah_elemen: 5 },
  { id: 3, skema_id: 2, kode_unit: "U-003", judul_unit: "Membuat Aplikasi Web", jenis_standar: "Okupasi", jumlah_elemen: 4 },
  { id: 4, skema_id: 2, kode_unit: "U-004", judul_unit: "Desain UI/UX", jenis_standar: "Okupasi", jumlah_elemen: 2 },
  { id: 5, skema_id: 3, kode_unit: "U-005", judul_unit: "Digital Marketing Campaign", jenis_standar: "Klaster", jumlah_elemen: 6 },
]);

const currentUnit = computed(() => units.value.find(u => u.id === unitId));
const skemaId = computed(() => currentUnit.value?.skema_id);

// ================= DATA ELEMENT =================
const elements = ref([
  { id: 1, unit_id: 1, kode_elemen: "E-001", judul_elemen: "Menyalakan Komputer", kriteria_unjuk_kerja: "Komputer menyala dengan benar" },
  { id: 2, unit_id: 1, kode_elemen: "E-002", judul_elemen: "Menggunakan Mouse dan Keyboard", kriteria_unjuk_kerja: "Input data dengan akurat" },
]);

// ================= FILTER =================
const filteredElements = computed(() =>
  elements.value.filter((element) => element.unit_id === unitId)
);

// ================= SEARCH =================
const search = ref("");
const perPage = ref(5);
const currentPage = ref(1);

const filteredData = computed(() =>
  filteredElements.value.filter((item) =>
    (item?.judul_elemen || "").toLowerCase().includes(search.value.toLowerCase())
  )
);

// ================= PAGINATION =================
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

// ================= CRUD =================
const showForm = ref(false);
const isEdit = ref(false);

const form = ref({
  id: null,
  unit_id: unitId,
  kode_elemen: "",
  judul_elemen: "",
  kriteria_unjuk_kerja: "",
});

// TAMBAH
const openAddForm = () => {
  isEdit.value = false;
  form.value = {
    id: null,
    unit_id: unitId,
    kode_elemen: "",
    judul_elemen: "",
    kriteria_unjuk_kerja: "",
  };
  showForm.value = true;
};

// EDIT
const openEditForm = (element) => {
  isEdit.value = true;
  form.value = { ...element };
  showForm.value = true;
};

// SIMPAN
const saveElement = () => {
  if (!form.value.kode_elemen || !form.value.judul_elemen) {
    alert("Data harus diisi!");
    return;
  }

  if (isEdit.value) {
    const index = elements.value.findIndex(e => e.id === form.value.id);
    if (index !== -1) {
      elements.value[index] = { ...form.value };
    }
  } else {
    const newId = elements.value.length
      ? Math.max(...elements.value.map(e => e.id)) + 1
      : 1;

    elements.value.push({
      ...form.value,
      id: newId,
    });
  }

  showForm.value = false;
};

// HAPUS
const deleteElement = (id) => {
  if (confirm("Yakin hapus data?")) {
    elements.value = elements.value.filter(e => e.id !== id);
  }
};

// ================= NAVIGASI =================
const goBack = () => {
  router.push(`/referensi/${skemaId.value}/unit`);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-1">Elemen Unit</h1>

    <div class="bg-white rounded shadow p-4">
      <h2 class="font-semibold mb-4">Data Elemen</h2>

      <!-- CONTROL -->
      <div class="flex justify-between mb-4 text-sm">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          entries
        </div>

        <input v-model="search" placeholder="Search..." class="border px-2 py-1 rounded" />
      </div>

      <!-- BUTTON -->
      <div class="flex gap-2 mb-4">
        <button @click="goBack" class="bg-yellow-500 text-white px-3 py-1 rounded">
          Kembali
        </button>

        <button @click="openAddForm" class="bg-blue-500 text-white px-3 py-1 rounded">
          Tambah Elemen
        </button>
      </div>

      <!-- TABLE -->
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">No</th>
            <th class="p-2 border">Kode</th>
            <th class="p-2 border">Judul</th>
            <th class="p-2 border">Kriteria</th>
            <th class="p-2 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(element, index) in paginatedData" :key="element.id">
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ element.kode_elemen }}</td>
            <td class="p-2 border">{{ element.judul_elemen }}</td>
            <td class="p-2 border">{{ element.kriteria_unjuk_kerja }}</td>
            <td class="p-2 border">
              <button @click="openEditForm(element)" class="bg-blue-500 text-white px-2 py-1 text-xs rounded">Edit</button>
              <button @click="deleteElement(element.id)" class="bg-red-500 text-white px-2 py-1 text-xs rounded ml-1">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-96">
        <h2 class="font-semibold mb-4">
          {{ isEdit ? "Edit" : "Tambah" }} Elemen
        </h2>

        <input v-model="form.kode_elemen" placeholder="Kode" class="border w-full mb-2 px-2 py-1" />
        <input v-model="form.judul_elemen" placeholder="Judul" class="border w-full mb-2 px-2 py-1" />
        <input v-model="form.kriteria_unjuk_kerja" placeholder="Kriteria" class="border w-full mb-2 px-2 py-1" />

        <div class="flex justify-end gap-2">
          <button @click="showForm = false" class="border px-3 py-1 rounded">Batal</button>
          <button @click="saveElement" class="bg-blue-500 text-white px-3 py-1 rounded">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>