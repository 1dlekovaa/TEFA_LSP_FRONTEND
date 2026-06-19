<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden"
  >
    <!-- Background -->
    <img
      src="https://images.unsplash.com/photo-1723056659318-382badc82fff"
      class="absolute inset-0 w-full h-full object-cover opacity-40"
    />

    <!-- Blob -->
    <div
      class="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
    ></div>

    <div
      class="absolute top-40 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
    ></div>

    <div
      class="absolute -bottom-8 left-1/2 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
    ></div>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-md px-6">
      <div class="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4"
          >
            <GraduationCap class="w-8 h-8 text-white" />
          </div>

          <h1 class="text-xl font-semibold text-gray-900">Halaman Login</h1>

          <p class="text-gray-600 text-sm"> 
            LSP P1 - SMK NEGERI 1 GARUT
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="text-gray-700 text-sm">username</label>
            <input
              v-model="username"
              type="text"
              placeholder="username"
              class="w-full h-11 mt-1 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label class="text-gray-700 text-sm">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="password"
              class="w-full h-11 mt-1 pl-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </p>

          <button
            class="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
          >
            Login
          </button>
        </form>

        <!-- Demo -->
        <div
          class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-xs"
        >
          <p class="font-semibold mb-2">Demo Accounts:</p>
          <p>Guru: {{ credentials[0].username }} / {{ credentials[0].password }}</p>
          <p>Siswa: {{ credentials[1].username }} / {{ credentials[1].password }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GraduationCap } from "lucide-vue-next";
import { ref } from "vue";
const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref("");

const credentials = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "siswa", password: "siswa123", role: "siswa" },
];

const handleSubmit = () => {
  const user = credentials.find(
    (u) => u.username === username.value && u.password === password.value,
  );

  if (user) {
    router.push(`/dashboard`);
  } else {
    error.value = "Username atau password salah!";
  }
};
</script>
