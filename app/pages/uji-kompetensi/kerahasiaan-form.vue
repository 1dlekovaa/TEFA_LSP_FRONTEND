<template>
  <div class="p-6 bg-[#f5f5f5] min-h-screen font-sans text-sm text-gray-800">
    <div class="bg-white rounded shadow-sm p-6 max-w-6xl mx-auto border border-gray-200">
      
      <h2 class="text-2xl font-light text-gray-700 uppercase tracking-wide mb-1">
        FR.AK.01. PERSETUJUAN ASESMEN DAN KERAHASIAAN
      </h2>
      <p class="text-xs text-gray-400 tracking-wider mb-6">LSP P1 - SMK NEGERI 1 GARUT</p>

      <div class="border border-gray-300 text-[13px]">
        
        <div class="p-3 bg-white border-b border-gray-300 font-medium italic text-gray-700">
          Persetujuan Asesmen ini untuk menjamin bahwa Asesi telah diberi arahan secara rinci tentang perencanaan dan proses asesmen
        </div>

        <div class="flex border-b border-gray-300">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300 flex items-center">
            Skema Sertifikasi ( KKNI )
          </div>
          <div class="w-3/4 flex flex-col">
            <div class="flex border-b border-gray-300 p-2 items-center">
              <div class="w-20 font-medium">Judul</div>
              <div class="mx-2">:</div>
              <div class="flex-1 font-semibold text-gray-700">Skema Sertifikasi KKNI Level III Pada Kompetensi Keahlian Sistem Informatika, Jaringan Dan Aplikasi</div>
            </div>
            <div class="flex p-2 items-center">
              <div class="w-20 font-medium">Nomor</div>
              <div class="mx-2">:</div>
              <div class="flex-1 font-mono text-gray-600">SKM/BNSP/00010/1/2020/51</div>
            </div>
          </div>
        </div>

        <div class="flex border-b border-gray-300 items-center">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300">TUK</div>
          <div class="mx-2">:</div>
          <div class="p-3 flex-1">Sewaktu</div>
        </div>

        <div class="flex border-b border-gray-300 items-center">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300">Nama Asesor</div>
          <div class="mx-2">:</div>
          <div class="p-3 flex-1 font-medium">Revy Cahya Alamsyah, S.Kom.</div>
        </div>

        <div class="flex border-b border-gray-300 items-center">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300">Nama Asesi</div>
          <div class="mx-2">:</div>
          <div class="p-3 flex-1 font-medium">Revy Cahya Alamsyah, S.Kom.</div>
        </div>

        <div class="flex border-b border-gray-300">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300 flex items-center">
            Bukti yang akan dikumpulkan
          </div>
          <div class="mx-2 self-center">:</div>
          <div class="p-3 flex-1 grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="flex items-center gap-2 text-gray-500">
                <input type="checkbox" class="rounded text-blue-600"> TL : Verifikasi Portofolio
              </label>
              <label class="flex items-center gap-2 text-gray-600">
                <input type="checkbox" class="rounded text-blue-600"> T : Hasil Tes Tulis
              </label>
              <label class="flex items-center gap-2 text-gray-600">
                <input type="checkbox" class="rounded text-blue-600"> T : Hasil Tes Lisan
              </label>
              <label class="flex items-center gap-2 text-gray-600">
                <input type="checkbox" class="rounded text-blue-600"> T : Hasil Tes Wawancara
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-500 ">
                <input type="checkbox" class="rounded text-blue-600"> L : Observasi Langsung
              </label>
            </div>
          </div>
        </div>

        <div class="flex border-b border-gray-300">
          <div class="w-1/4 p-3 font-semibold bg-gray-50 border-r border-gray-300 flex items-center">
            Pelaksanaan asesmen disepakati pada :
          </div>
          <div class="mx-2 self-center">:</div>
          <div class="flex-1 flex flex-col text-sm">
            <div class="flex border-b border-gray-300 p-2.5">
              <div class="w-32 font-medium text-gray-600">Hari/Tanggal</div>
              <div class="flex-1 border-l border-gray-300 pl-4 font-medium text-gray-800">Selasa, 28 Maret 2023</div>
            </div>
            <div class="flex border-b border-gray-300 p-2.5">
              <div class="w-32 font-medium text-gray-600">Waktu</div>
              <div class="flex-1 border-l border-gray-300 pl-4"></div>
            </div>
            <div class="flex p-2.5">
              <div class="w-32 font-medium text-gray-600">TUK</div>
              <div class="flex-1 border-l border-gray-300 pl-4 font-medium text-gray-800">TUK Sistem Informatika, Jaringan dan Aplikasi</div>
            </div>
          </div>
        </div>

        <div class="p-4 border-b border-gray-300 bg-gray-50/50">
          <label class="flex items-start gap-2 font-semibold text-gray-700 mb-2 cursor-pointer">
            <input type="checkbox" class="mt-1 rounded text-blue-600"> 
            <span>Asesor:</span>
          </label>
          <p class="text-gray-600 leading-relaxed pl-6">
            Menyatakan tidak akan membuka hasil pekerjaan yang saya peroleh karena penugasan saya sebagai Asesor dalam pekerjaan Asesmen kepada siapapun atau organisasi apapun selain kepada pihak yang berwenang sehubungan dengan kewajiban saya sebagai Asesor yang ditugaskan oleh LSP.
          </p>
        </div>

        <div class="p-4 border-b border-gray-300">
          <label class="flex items-start gap-2 font-semibold text-gray-700 mb-2 cursor-pointer">
            <input type="checkbox" checked class="mt-1 rounded text-blue-600"> 
            <span>Asesi:</span>
          </label>
          <p class="text-gray-600 leading-relaxed pl-6">
            Saya setuju mengikuti asesmen dengan pemahaman bahwa informasi yang dikumpulkan hanya digunakan untuk pengembangan profesional dan hanya dapat diakses oleh orang tertentu saja.
          </p>
        </div>

        <span class="block font-semibold text-gray-700 mb-2">
            Tanda Tangan
        </span>

        <!-- CANVAS -->
        <div class="border border-gray-300 rounded bg-white h-64 relative shadow-inner overflow-hidden">
            
            <canvas
            ref="signatureCanvas"
            width="1000"
            height="250"
            class="w-full h-full"
            ></canvas>

            <span class="absolute bottom-2 right-3 text-xs text-gray-400 select-none pointer-events-none">
            Area Tanda Tangan
            </span>

        </div>

        <!-- BUTTON -->
        <div class="flex justify-between items-center mt-3">

            <!-- SET TTD -->
            <button
            @click="setSignature"
            type="button"
            class="px-4 py-2 bg-[#2d74b5] text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
            >
            Set Tanda Tangan
            </button>

            <div class="flex gap-2">

            <!-- GANTI WARNA -->
            <button
                @click="changeColor"
                type="button"
                class="px-4 py-2 bg-[#5cb85c] text-white text-xs font-semibold rounded hover:bg-green-700 transition"
            >
                Ganti Warna
            </button>

            <!-- BATAL -->
            <button
                @click="undoSignature"
                type="button"
                class="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-xs font-semibold rounded hover:bg-gray-50 transition"
            >
                ↺ Batal
            </button>

            <!-- HAPUS -->
            <button
                @click="clearSignature"
                type="button"
                class="px-4 py-2 bg-[#d9534f] text-white text-xs font-semibold rounded hover:bg-red-700 transition"
            >
                ✏️ Hapus
            </button>

            </div>
        </div>

      </div>

      <div class="flex gap-2 mt-6">
        <button
        @click="kembali"
        type="button"
        class="px-4 py-2 bg-[#337ab7] text-white text-sm font-medium rounded hover:bg-blue-700 transition flex items-center gap-1"
        >
        ⬅ Kembali
        </button>
        <button @click="simpanData" type="button" class="px-4 py-2 bg-[#f0ad4e] text-white text-sm font-medium rounded hover:bg-amber-600 transition">
          💾 Simpan Data AK01
        </button>
      </div>

    </div>
  </div>
</template>

```vue
<script setup>
import { useRouter } from 'vue-router'
import SignaturePad from 'signature_pad'
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: "dashboard"
})

const router = useRouter()

const signatureCanvas = ref(null)
let signaturePad = null

const colors = [
  '#000000',
  '#2563eb',
  '#dc2626',
  '#16a34a'
]

let currentColor = 0

onMounted(() => {
  signaturePad = new SignaturePad(signatureCanvas.value, {
    penColor: colors[currentColor],
    minWidth: 1,
    maxWidth: 2.5
  })
})

const setSignature = () => {
  alert('Silakan tanda tangan pada area yang tersedia')
}
 
const clearSignature = () => {
  signaturePad.clear()
}

const undoSignature = () => {
  const data = signaturePad.toData()

  if (data) {
    data.pop()
    signaturePad.fromData(data)
  }
}

const changeColor = () => {
  currentColor++

  if (currentColor >= colors.length) {
    currentColor = 0
  }

  signaturePad.penColor = colors[currentColor]
}

const kembali = () => {
  router.push('/uji-kompetensi/kerahasiaan')
}


const simpanData = () => {
  if (signaturePad.isEmpty()) {
    alert('Tanda tangan masih kosong!')
    return
  }

  const signature = signaturePad.toDataURL()

  console.log(signature)

  alert('Data AK01 Berhasil Disimpan!')
}
</script>
```
