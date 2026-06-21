<script setup>
import { ref, reactive, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();
const router = useRouter();

const asesorOptions = ref([]);
const skemaOptions = ref([]);

async function fetchOptions() {
  const [asesorRes, skemaRes] = await Promise.all([api("/asesor"), api("/skema")]);
  asesorOptions.value = asesorRes.data;
  skemaOptions.value = skemaRes.data;
}

onMounted(fetchOptions);

const form = reactive({ asesor_id: "", skema_id: "" });
const formError = ref("");
const saving = ref(false);

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    await api("/asesor-skema/assign", { method: "POST", body: form });
    router.push("/pengaturan/asesor-skema");
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan tugas asesor";
  } finally {
    saving.value = false;
  }
}

function goBack() {
  router.push("/pengaturan/asesor-skema");
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Asesor Skema</h1>
    <p class="text-sm text-gray-500 mb-4">LSP P1 SMK NEGERI 1 GARUT</p>

    <div class="text-sm text-gray-500 mb-4">
      <NuxtLink to="/dashboard" class="hover:underline">Home</NuxtLink>
      <span class="mx-1">/</span>
      <NuxtLink to="/pengaturan/asesor-skema" class="hover:underline">Asesor Skema</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Tambah Tugas</span>
    </div>

    <div class="bg-white rounded shadow border border-gray-100 p-6 max-w-xl">
      <h2 class="font-semibold mb-4">Tambah Tugas Asesor</h2>
      <p class="text-sm text-gray-500 italic mb-6">( * ) Wajib di Isi</p>

      <form @submit.prevent="submitForm" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Asesor Skema*</label>
          <select v-model="form.asesor_id" required class="w-full border rounded px-3 py-2">
            <option value="" disabled>-- Pilih Asesor --</option>
            <option v-for="a in asesorOptions" :key="a.id" :value="a.id">
              {{ a.nama_lengkap }}
            </option>
          </select>
          <p class="text-xs text-gray-400 italic mt-1">Pilih Nama Asesor</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Skema*</label>
          <select v-model="form.skema_id" required class="w-full border rounded px-3 py-2">
            <option value="" disabled>-- Pilih Skema --</option>
            <option v-for="s in skemaOptions" :key="s.id" :value="s.id">
              {{ s.nama_skema }}
            </option>
          </select>
          <p class="text-xs text-gray-400 italic mt-1">Pilih Judul Skema</p>
        </div>

        <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

        <div class="flex gap-2 pt-2">
          <button type="button" @click="goBack" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
            ← Kembali
          </button>
          <button type="submit" :disabled="saving" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
            Simpan Data Tugas
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
