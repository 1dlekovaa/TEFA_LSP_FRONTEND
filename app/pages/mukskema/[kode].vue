<script setup>
import TablePersyaratan from "~/components/TablePersyaratan.vue";
import { useRoute, navigateTo } from "#app";

definePageMeta({
  layout: "dashboard",
});

// ambil parameter kode dari URL
const route = useRoute();
const id = route.params.id;
const kode = route.params.kode;

// FUNCTION KEMBALI
const goBack = () => {
  navigateTo(`/referensi/${id}/mukskema`);
};

// DATA
const skema = {
  judul: "KKNI Level III Sistem Informatika, Jaringan dan Aplikasi - Kluster Instalasi Jaringan Komputer",
  nomor: "123",
};
</script>

<template>
  <div class="p-6">
    <!-- TITLE -->
    <h1 class="text-2xl font-semibold">{{ kode }} Permohonan Sertifikasi Kompetensi</h1>
    <p class="text-sm text-gray-500 mb-4">LSP P1 - SMK NEGERI 1 GARUT</p>

    <!-- BREADCRUMB -->
    <nav class="text-sm text-gray-500 mb-4">
      <ol class="flex items-center gap-2 flex-wrap">
        <li>
          <NuxtLink to="/dashboard" class="hover:text-blue-600"> Dashboard </NuxtLink>
        </li>
        <li>/</li>
        <li>Referensi</li>
        <li>/</li>
        <li>
          <NuxtLink to="/muk-skema/${kode}" class="hover:text-blue-600"> FR.APL.01. </NuxtLink>
        </li>
      </ol>
    </nav>

    <!-- CARD -->
    <div class="bg-white rounded-xl shadow p-5">
      <!-- DETAIL -->
      <div class="overflow-x-auto mb-4">
        <table class="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <tbody>
            <tr class="bg-gray-50">
              <td class="p-3 border border-gray-300 font-semibold text-gray-700 w-64 align-top">Skema Sertifikasi (Klaster)</td>

              <td class="p-3 border border-gray-300 text-gray-600 w-40">Judul</td>

              <td class="p-3 border border-gray-300 text-center w-5">:</td>

              <td class="p-3 border border-gray-300 text-gray-800">
                {{ skema.judul }}
              </td>
            </tr>

            <tr>
              <td class="p-3 border border-gray-300"></td>

              <td class="p-3 border border-gray-300 text-gray-600">Nomor</td>

              <td class="p-3 border border-gray-300 text-center">:</td>

              <td class="p-3 border border-gray-300 text-gray-800">
                {{ skema.nomor }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- BUTTON (dipindah ke bawah tabel biar nyatu) -->
      <div class="flex gap-2 mb-4">
        <button @click="goBack" class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded text-sm">⬅ Kembali</button>

        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">+ Tambah Persyaratan</button>
      </div>

      <!-- TABLE -->
      <TablePersyaratan />
    </div>
  </div>
</template>
