<script setup>
import { reactive, ref, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const form = reactive({
  nama_lembaga: "",
  alamat: "",
  no_telepon: "",
  email: "",
  website: "",
});
const currentLogo = ref(null);
const logoFile = ref(null);
const loading = ref(false);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function fetchKopSurat() {
  loading.value = true;
  try {
    const response = await api("/kop-surat");
    if (response.data) {
      Object.assign(form, response.data);
      currentLogo.value = response.data.logo;
    }
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data kop surat";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchKopSurat);

function onLogoChange(e) {
  logoFile.value = e.target.files[0] || null;
}

async function submitForm() {
  saving.value = true;
  errorMessage.value = "";
  successMessage.value = "";
  try {
    const body = logoFile.value
      ? toFormData({ ...form, logo: logoFile.value })
      : form;
    const response = await api("/kop-surat", { method: "POST", body });
    Object.assign(form, response.data);
    currentLogo.value = response.data.logo;
    logoFile.value = null;
    successMessage.value = "Kop surat berhasil disimpan";
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal menyimpan kop surat";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Kop Surat</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Kop Surat</span>
    </div>

    <div class="bg-white rounded shadow p-6 max-w-lg">
      <p v-if="loading" class="text-sm text-gray-500">Memuat data...</p>

      <form v-else @submit.prevent="submitForm" class="space-y-3">
        <div>
          <img
            v-if="currentLogo"
            :src="useStorageUrl(currentLogo)"
            class="w-20 h-20 object-contain mb-2"
          />
          <label class="text-sm text-gray-700">Logo (opsional)</label>
          <input type="file" accept="image/*" @change="onLogoChange" class="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Nama Lembaga</label>
          <input v-model="form.nama_lembaga" required class="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Alamat</label>
          <textarea v-model="form.alamat" required class="w-full border rounded px-3 py-2 mt-1"></textarea>
        </div>
        <div>
          <label class="text-sm text-gray-700">No Telepon</label>
          <input v-model="form.no_telepon" required class="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Email</label>
          <input v-model="form.email" type="email" required class="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label class="text-sm text-gray-700">Website (opsional)</label>
          <input v-model="form.website" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</p>

        <button type="submit" :disabled="saving" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          Simpan
        </button>
      </form>
    </div>
  </div>
</template>
