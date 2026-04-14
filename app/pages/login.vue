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
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <!-- Graduation Cap Icon -->
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.197 1.465a2 2 0 011.606 0l6.533 3.267a2 2 0 01-.706 3.817l-.66-.33v4.253a2 2 0 01-1.414 1.897l-4 1.33a2 2 0 01-1.252 0l-4-1.33A2 2 0 011.67 12.72V8.469l-.66.33A2 2 0 11.83 5.16l6.367-3.182zm1.606 7.268L10 7.85l-4.197 2.1a2 2 0 01-.706 1.783v1.974l4 1.333 4-1.333v-1.974a2 2 0 01-.294-1.784z" />
            </svg>
          </div>

          <h1 class="text-2xl font-bold text-gray-900">Admin Panel LSP</h1>
          <p class="text-gray-600 text-sm mt-1">LSP P1 - SMK NEGERI 1 GARUT</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Masukkan username"
              :disabled="isLoading"
              class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Masukkan password"
              :disabled="isLoading"
              @keyup.enter="handleSubmit"
              class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-800 text-sm">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-lg transition"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else>Login</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-8 pt-6 border-t border-gray-300">
          <p class="text-gray-600 text-xs font-semibold text-center mb-4">AKUN DEMO UNTUK TESTING</p>
          
          <div class="space-y-3">
            <!-- Admin Demo -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition"
                 @click="() => { username = 'admin'; password = 'admin123' }">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V8.625" />
                    <path stroke="currentColor" stroke-width="2" d="M10 13h4.5M10 10.5h6" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-semibold text-gray-900">Administrator</p>
                  <p class="text-xs text-gray-600">admin / admin123</p>
                </div>
              </div>
            </div>

            <!-- Guru/Asesor 1 Demo -->
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 cursor-pointer hover:bg-purple-100 transition"
                 @click="() => { username = 'guru1'; password = 'guru123' }">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-200 rounded-full">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 8a3 3 0 110-6 3 3 0 010 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.772-1.484m-7.06-14.243a20.323 20.323 0 019.116 6.513" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-semibold text-gray-900">Guru Asesor 1</p>
                  <p class="text-xs text-gray-600">guru1 / guru123</p>
                </div>
              </div>
            </div>

            <!-- Asesor Demo -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer hover:bg-green-100 transition"
                 @click="() => { username = 'asesor'; password = 'asesor123' }">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-200 rounded-full">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-semibold text-gray-900">Asesor</p>
                  <p class="text-xs text-gray-600">asesor / asesor123</p>
                </div>
              </div>
            </div>

            <!-- Siswa/Asesi Demo -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 cursor-pointer hover:bg-yellow-100 transition"
                 @click="() => { username = 'siswa'; password = 'siswa123' }">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-200 rounded-full">
                  <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0015.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-semibold text-gray-900">Siswa / Asesi</p>
                  <p class="text-xs text-gray-600">siswa / siswa123</p>
                </div>
              </div>
            </div>
          </div>

          <p class="text-gray-500 text-xs text-center mt-4">
            💡 Klik pada akun untuk auto-fill username dan password
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { success, error: toastError } = useToast()

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

// Dummy Accounts
const dummyAccounts = [
  { 
    id: 1,
    username: 'admin', 
    password: 'admin123', 
    level: 'Administrator',
    nama_lengkap: 'Administrator'
  },
  { 
    id: 2,
    username: 'guru1', 
    password: 'guru123', 
    level: 'Asesor',
    nama_lengkap: 'Guru Asesor 1'
  },
  { 
    id: 3,
    username: 'asesor', 
    password: 'asesor123', 
    level: 'Asesor',
    nama_lengkap: 'Guru Asesor'
  },
  { 
    id: 4,
    username: 'siswa', 
    password: 'siswa123', 
    level: 'Asesi',
    nama_lengkap: 'Siswa Asesi'
  },
]

const handleSubmit = async () => {
  error.value = ''
  
  if (!username.value || !password.value) {
    error.value = 'Username dan password harus diisi'
    return
  }
  
  isLoading.value = true
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const user = dummyAccounts.find(
    (u) => u.username === username.value && u.password === password.value
  )

  if (user) {
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isLoggedIn', 'true')
    
    success(`Selamat datang, ${user.nama_lengkap}!`)
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  } else {
    error.value = 'Username atau password salah!'
    toastError(error.value)
  }
  
  isLoading.value = false
}
</script>
