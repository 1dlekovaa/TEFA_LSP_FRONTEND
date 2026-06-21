<script setup>
import { reactive, ref, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
});

const api = useApi();
const { user } = useAuth();

const form = reactive({ nama_lengkap: "", username: "", email: "" });
const level = ref("");
const loading = ref(false);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function fetchProfile() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/profile");
    form.nama_lengkap = response.data.nama_lengkap;
    form.username = response.data.username;
    form.email = response.data.email;
    level.value = response.data.level;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data profil";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProfile);

async function submitProfile() {
  saving.value = true;
  errorMessage.value = "";
  successMessage.value = "";
  try {
    await api("/profile", { method: "PUT", body: form });
    successMessage.value = "Profile berhasil diperbarui";
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal memperbarui profil";
  } finally {
    saving.value = false;
  }
}

// GANTI PASSWORD
const passwordForm = reactive({ password_lama: "", password_baru: "", password_baru_confirmation: "" });
const passwordError = ref("");
const passwordSuccess = ref("");
const changingPassword = ref(false);

async function submitPassword() {
  changingPassword.value = true;
  passwordError.value = "";
  passwordSuccess.value = "";
  try {
    await api("/profile/password", { method: "PUT", body: passwordForm });
    passwordSuccess.value = "Password berhasil diubah";
    passwordForm.password_lama = "";
    passwordForm.password_baru = "";
    passwordForm.password_baru_confirmation = "";
  } catch (e) {
    passwordError.value = e?.data?.message || "Gagal mengubah password";
  } finally {
    changingPassword.value = false;
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold">Profile</h1>

    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Pengaturan / Profile</span>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Memuat data...</p>

    <div v-else class="grid gap-4 max-w-lg">
      <!-- DATA DIRI -->
      <div class="bg-white rounded shadow p-6">
        <h2 class="font-semibold mb-4">Data Diri</h2>
        <form @submit.prevent="submitProfile" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Nama Lengkap</label>
            <input v-model="form.nama_lengkap" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Username</label>
            <input v-model="form.username" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Email</label>
            <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Level</label>
            <input :value="level" disabled class="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-500 capitalize" />
          </div>

          <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</p>

          <button type="submit" :disabled="saving" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Simpan
          </button>
        </form>
      </div>

      <!-- GANTI PASSWORD -->
      <div class="bg-white rounded shadow p-6">
        <h2 class="font-semibold mb-4">Ganti Password</h2>
        <form @submit.prevent="submitPassword" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Password Lama</label>
            <input v-model="passwordForm.password_lama" type="password" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Password Baru</label>
            <input v-model="passwordForm.password_baru" type="password" required minlength="6" class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Konfirmasi Password Baru</label>
            <input v-model="passwordForm.password_baru_confirmation" type="password" required minlength="6" class="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          <p v-if="passwordSuccess" class="text-green-600 text-sm">{{ passwordSuccess }}</p>

          <button type="submit" :disabled="changingPassword" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Ubah Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
