<script setup>
import { ref, reactive, computed, onMounted } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: "admin",
});

const api = useApi();

const levelOptions = ["administrator", "asesor", "asesi", "validator"];
const levelLabel = {
  administrator: "Administrator",
  asesor: "Asesor",
  asesi: "Asesi",
  validator: "Validator",
};

// DATA
const users = ref([]);
const loading = ref(false);
const errorMessage = ref("");

// SEARCH & FILTER & PAGINATION
const search = ref("");
const roleFilter = ref("");
const perPage = ref(10);
const currentPage = ref(1);
const totalEntries = ref(0);

async function fetchUsers() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api("/users", {
      query: {
        level: roleFilter.value || undefined,
        per_page: perPage.value,
        page: currentPage.value,
      },
    });
    users.value = response.data.data;
    totalEntries.value = response.data.total;
  } catch (e) {
    errorMessage.value = e?.data?.message || "Gagal mengambil data pengguna";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);
watch([roleFilter, perPage], () => {
  currentPage.value = 1;
  fetchUsers();
});
watch(currentPage, fetchUsers);

const filteredData = computed(() => {
  if (!search.value) return users.value;
  const q = search.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.nama_lengkap.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalEntries.value / perPage.value))
);

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// MODAL CREATE / EDIT
const showFormModal = ref(false);
const editingUser = ref(null);
const form = reactive({
  nama_lengkap: "",
  username: "",
  level: "asesi",
  status: "aktif",
  password: "",
});
const formError = ref("");
const saving = ref(false);

function openCreateModal() {
  editingUser.value = null;
  form.nama_lengkap = "";
  form.username = "";
  form.level = "asesi";
  form.status = "aktif";
  form.password = "";
  formError.value = "";
  showFormModal.value = true;
}

function openEditModal(user) {
  editingUser.value = user;
  form.nama_lengkap = user.nama_lengkap;
  form.username = user.username;
  form.level = user.level;
  form.status = user.status;
  form.password = "";
  formError.value = "";
  showFormModal.value = true;
}

async function submitForm() {
  saving.value = true;
  formError.value = "";
  try {
    const payload = { ...form };
    if (!payload.password) delete payload.password;

    if (editingUser.value) {
      await api(`/users/${editingUser.value.id}`, {
        method: "PUT",
        body: payload,
      });
    } else {
      await api("/users", { method: "POST", body: payload });
    }

    showFormModal.value = false;
    await fetchUsers();
  } catch (e) {
    formError.value = e?.data?.message || "Gagal menyimpan data pengguna";
  } finally {
    saving.value = false;
  }
}

// DELETE
async function deleteUser(user) {
  if (!confirm(`Hapus pengguna "${user.nama_lengkap}"?`)) return;
  try {
    await api(`/users/${user.id}`, { method: "DELETE" });
    await fetchUsers();
  } catch (e) {
    alert(e?.data?.message || "Gagal menghapus pengguna");
  }
}

// RESET PASSWORD
const showResetModal = ref(false);
const resetTarget = ref(null);
const resetForm = reactive({ password: "", password_confirmation: "" });
const resetError = ref("");
const resetting = ref(false);

function openResetModal(user) {
  resetTarget.value = user;
  resetForm.password = "";
  resetForm.password_confirmation = "";
  resetError.value = "";
  showResetModal.value = true;
}

async function submitReset() {
  resetting.value = true;
  resetError.value = "";
  try {
    await api(`/users/${resetTarget.value.id}/reset-password`, {
      method: "POST",
      body: { ...resetForm },
    });
    showResetModal.value = false;
  } catch (e) {
    resetError.value = e?.data?.message || "Gagal reset password";
  } finally {
    resetting.value = false;
  }
}
</script>

<template>
  <div class="p-6">
    <!-- TITLE -->
    <h1 class="text-2xl font-semibold">Data Pengguna</h1>

    <!-- BREADCRUMB -->
    <div class="text-sm text-gray-500 mb-4 mt-1">
      <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
      <span class="mx-1">/</span>
      <NuxtLink to="/referensi" class="hover:underline">Referensi</NuxtLink>
      <span class="mx-1">/</span>
      <span class="text-gray-700 font-medium">Data Pengguna</span>
    </div>

    <!-- TOP ACTION BAR -->
    <div class="flex justify-between items-center mb-4 text-sm gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <div>
          Show
          <select v-model="perPage" class="border px-2 py-1 rounded mx-1">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          entries
        </div>

        <select v-model="roleFilter" class="border px-2 py-1 rounded">
          <option value="">Semua Level</option>
          <option v-for="r in levelOptions" :key="r" :value="r">
            {{ levelLabel[r] }}
          </option>
        </select>

        <input
          v-model="search"
          placeholder="Search nama / username..."
          class="border px-2 py-1 rounded"
        />
      </div>

      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
      >
        + Tambah Akun
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <!-- TABLE -->
    <div class="bg-white rounded shadow p-4 overflow-x-auto">
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border text-left">No</th>
            <th class="p-2 border text-left">Nama Lengkap</th>
            <th class="p-2 border text-left">Username</th>
            <th class="p-2 border text-left">Level</th>
            <th class="p-2 border text-center">Status</th>
            <th class="p-2 border text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td class="p-2 border text-center" colspan="6">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredData.length === 0">
            <td class="p-2 border text-center" colspan="6">Tidak ada data</td>
          </tr>
          <tr v-for="(item, index) in filteredData" :key="item.id" v-else>
            <td class="p-2 border">
              {{ (currentPage - 1) * perPage + index + 1 }}
            </td>
            <td class="p-2 border">{{ item.nama_lengkap }}</td>
            <td class="p-2 border">{{ item.username }}</td>
            <td class="p-2 border">{{ levelLabel[item.level] || item.level }}</td>
            <td class="p-2 border text-center">
              <span
                class="px-2 py-0.5 rounded text-xs"
                :class="item.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="p-2 border text-center space-x-1 whitespace-nowrap">
              <button
                @click="openEditModal(item)"
                class="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
              >
                Edit
              </button>
              <button
                @click="openResetModal(item)"
                class="bg-indigo-500 text-white px-2 py-1 rounded text-xs"
              >
                Reset Password
              </button>
              <button
                @click="deleteUser(item)"
                class="bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- INFO + PAGINATION -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <p>
        Showing {{ (currentPage - 1) * perPage + 1 }} to
        {{ Math.min(currentPage * perPage, totalEntries) }} of
        {{ totalEntries }} entries
      </p>

      <div class="flex gap-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded"
        >
          Prev
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
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>

    <!-- MODAL CREATE / EDIT -->
    <div
      v-if="showFormModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4">
          {{ editingUser ? "Edit Pengguna" : "Tambah Pengguna" }}
        </h2>

        <form @submit.prevent="submitForm" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Nama Lengkap</label>
            <input v-model="form.nama_lengkap" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Username</label>
            <input v-model="form.username" required class="w-full border rounded px-3 py-2 mt-1" />
          </div>
          <div>
            <label class="text-sm text-gray-700">Level Pengguna</label>
            <select v-model="form.level" required class="w-full border rounded px-3 py-2 mt-1">
              <option v-for="r in levelOptions" :key="r" :value="r">
                {{ levelLabel[r] }}
              </option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-700">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2 mt-1">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-700">
              Password {{ editingUser ? "(kosongkan jika tidak diubah)" : "" }}
            </label>
            <input
              v-model="form.password"
              type="password"
              :required="!editingUser"
              minlength="6"
              class="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="showFormModal = false"
              class="px-4 py-2 rounded border"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL RESET PASSWORD -->
    <div
      v-if="showResetModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 class="text-lg font-semibold mb-4">
          Reset Password - {{ resetTarget?.nama_lengkap }}
        </h2>

        <form @submit.prevent="submitReset" class="space-y-3">
          <div>
            <label class="text-sm text-gray-700">Password Baru</label>
            <input
              v-model="resetForm.password"
              type="password"
              required
              minlength="8"
              class="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label class="text-sm text-gray-700">Konfirmasi Password</label>
            <input
              v-model="resetForm.password_confirmation"
              type="password"
              required
              minlength="8"
              class="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <p v-if="resetError" class="text-red-500 text-sm">{{ resetError }}</p>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="showResetModal = false"
              class="px-4 py-2 rounded border"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="resetting"
              class="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
