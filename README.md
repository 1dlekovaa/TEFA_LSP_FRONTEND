# 🧩 ADMIN PANEL FRONTEND SPECIFICATION
Frontend menggunakan:

Vue 3 (Composition API)
Vue Router
Tailwind CSS
## 🧠 Role System

Sistem memiliki 3 role:

* **Admin** → akses semua fitur
* **Guru/Asesor** → akses terbatas
* **Siswa/Asesi** → akses personal

---

## 🧭 Sidebar Navigation Structure

### MENU UTAMA

* Dashboard

### REFERENSI

* Data Asesor
* Data Asesi
* Data TUK
* Data Pengguna
* Data Anggota
* Data Skema

### UJI KOMPETENSI

* Jadwal Ujikom
* Permohonan (APL-01)

### PENGATURAN

* Tahun Aktif
* Kop Surat
* Asesor Skema
* Profile

---

## 📊 Dashboard Page

### 🎯 Tujuan

Menampilkan ringkasan data utama dalam bentuk statistik.

### 📦 Komponen Utama

Dashboard terdiri dari **4 card (kotak statistik)**:

1. Jumlah Asesi
2. Jumlah Asesor
3. Jumlah Pengguna
4. Jumlah Skema

---

### 🧱 Struktur UI

Gunakan grid 4 kolom:

* Desktop: 4 kolom
* Tablet: 2 kolom
* Mobile: 1 kolom

---

### 💻 Contoh Data API

Endpoint:
GET /api/dashboard

Response:

```json
{
  "asesi": 120,
  "asesor": 25,
  "user": 50,
  "skema": 10
}
```

---

### 🧩 Struktur Component

#### Dashboard.vue

* Fetch data dari API `/api/dashboard`
* Simpan ke state:

```js
const stats = {
  asesi: 0,
  asesor: 0,
  user: 0,
  skema: 0
}
```

---

### 🎨 UI Card Design

Setiap card memiliki:

* Icon
* Title
* Total number
* Background soft color
* Hover effect

---

### 🧱 Contoh Layout (Pseudo)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card title="Jumlah Asesi" :value="stats.asesi" />
  <Card title="Jumlah Asesor" :value="stats.asesor" />
  <Card title="Jumlah Pengguna" :value="stats.user" />
  <Card title="Jumlah Skema" :value="stats.skema" />
</div>
```

---

## 🔌 API Integration

Semua data diambil dari Laravel API:

| Data      | Endpoint       |
| --------- | -------------- |
| Asesi     | /api/asesi     |
| Asesor    | /api/asesor    |
| User      | /api/users     |
| Skema     | /api/skema     |
| Dashboard | /api/dashboard |

---

## 🔐 Authentication Flow

1. User login via `/api/login`
2. Backend mengembalikan:

```json
{
  "user": {
    "name": "Admin",
    "role": "admin"
  }
}
```

3. Frontend redirect berdasarkan role:

* admin → /dashboard
* guru → /asesor
* siswa → /profile

---

## 🎯 Best Practice

* Gunakan reusable component untuk Card
* Pisahkan logic API di service file
* Gunakan state management (Pinia/Vuex opsional)
* Gunakan middleware untuk proteksi route

---

## 🚀 Future Improvement

* Grafik statistik (chart)
* Notifikasi real-time
* Filter data dashboard
* Export data (PDF/Excel)

---
# 👨‍🏫 ASESOR PAGE SPECIFICATION (ADMIN PANEL)

## 📌 Overview

Halaman **Asesor** digunakan untuk mengelola data asesor (penguji) dalam sistem ujikom.

Fitur utama:

* Menampilkan daftar asesor
* CRUD (Create, Read, Update, Delete)
* Import & Export data
* Status akun

---

## 🧾 Data Structure (Asesor)

Field yang digunakan:

* Foto (optional)
* Nama Lengkap
* No MET
* Nama Pengguna (username)
* Password (hidden di table)
* Status Akun (aktif / nonaktif)

---

## 📊 Table View (Index Page)

### 🎯 Tujuan

Menampilkan daftar seluruh asesor dalam bentuk tabel.

---

### 🧱 Kolom Tabel

| Kolom        | Keterangan           |
| ------------ | -------------------- |
| Foto         | Thumbnail (optional) |
| Nama Lengkap | Nama asesor          |
| No MET       | Nomor registrasi     |
| Username     | Login username       |
| Status       | Aktif / Nonaktif     |
| Aksi         | Show, Edit, Delete   |

---

### ⚠️ Catatan Penting

* ❌ Password **TIDAK boleh ditampilkan di tabel**
* ❌ Password juga **TIDAK ditampilkan di halaman Show**
* ✅ Password hanya muncul saat:

  * Create
  * Edit

---

## 🎛️ Top Action Bar

Di bagian atas tabel (sejajar dengan tombol tambah):

### 🔘 Tombol:

* ➕ Tambah Asesor
* ⬇️ Dropdown:

  * Import Data
  * Export Data

---

### 💻 Contoh Layout

```html id="k2xv9c"
<div class="flex justify-between items-center mb-4">
  <button class="btn-primary">+ Tambah Asesor</button>

  <div class="dropdown">
    <button class="btn-secondary">Opsi</button>
    <div class="dropdown-menu">
      <button>Import</button>
      <button>Export</button>
    </div>
  </div>
</div>
```

---

## 🧾 Form Create & Edit

### Field Input:

* Foto (upload file)
* Nama Lengkap (text)
* No MET (text/number)
* Username (text)
* Password (password input)
* Status (dropdown: aktif / nonaktif)

---

### ⚠️ Validasi:

* Nama wajib
* Username unik
* Password minimal 6 karakter (saat create)

---

## 🔍 Show Page (Detail)

### Data yang ditampilkan:

* Foto
* Nama
* No MET
* Username
* Status

---

### ❌ Tidak ditampilkan:

* Password

---

## 🔌 API Integration

| Method | Endpoint         | Keterangan       |
| ------ | ---------------- | ---------------- |
| GET    | /api/asesor      | Ambil semua data |
| POST   | /api/asesor      | Tambah data      |
| PUT    | /api/asesor/{id} | Update data      |
| DELETE | /api/asesor/{id} | Hapus data       |

---

## 📥 Import & Export

### Import:

* Format: Excel / CSV
* Endpoint:

```
POST /api/asesor/import
```

---

### Export:

* Format: Excel / CSV
* Endpoint:

```
GET /api/asesor/export
```

---

## 🎨 UI/UX Guidelines

* Gunakan table responsive
* Gunakan badge untuk status:

  * Hijau = Aktif
  * Merah = Nonaktif
* Gunakan modal untuk:

  * Create
  * Edit
* Gunakan confirm dialog untuk delete

---

## 🧠 Best Practice

* Pisahkan component:

  * AsesorTable.vue
  * AsesorForm.vue
* Gunakan reusable modal
* Gunakan loading state saat fetch API
* Gunakan toast notification (success/error)

---

## 🚀 Future Enhancement

* Search & filter asesor
* Pagination
* Upload foto preview
* Bulk delete

---
# 🧩 GLOBAL ADMIN PANEL ENHANCEMENT

## 📌 Fitur WAJIB di SEMUA HALAMAN CRUD

### 🧭 Breadcrumb

Digunakan untuk navigasi:

Contoh:

```text
Dashboard / Referensi / Asesor
Dashboard / Referensi / Asesi
```

---

### 🔍 Search

* Input search di atas tabel
* Bisa search:

  * nama
  * username
  * dll

---

### 📄 Pagination

Harus ada:

* "Showing X to Y of Z data"
* Pilihan jumlah data:

  * 10 / 25 / 50 / 100
* Next / Previous button

---

### 🎛️ Top Action Bar (Standar)

```html
<div class="flex justify-between items-center mb-4">
  <input placeholder="Search..." />

  <div class="flex gap-2">
    <button>+ Tambah</button>

    <div class="dropdown">
      <button>Opsi</button>
      <div>
        <button>Import</button>
        <button>Export</button>
      </div>
    </div>
  </div>
</div>
```

---

# 👨‍🏫 ASESOR PAGE (UPDATED)

## 📊 Table Columns

| Kolom    | Keterangan         |
| -------- | ------------------ |
| Foto     | Optional           |
| Nama     | Nama lengkap       |
| No MET   | Nomor              |
| Username | Login              |
| Status   | Aktif / Nonaktif   |
| Aksi     | Show, Edit, Delete |

---

## ⚠️ RULE PASSWORD

* ❌ Tidak tampil di tabel
* ❌ Tidak tampil di show
* ✅ Hanya di create & edit

---

## 🔧 Form Field

* Foto (optional)
* Nama Lengkap
* No MET
* Username
* Password
* Status

---

# 👨‍🎓 ASESI PAGE SPECIFICATION

## 📌 Overview

Halaman untuk mengelola data peserta ujikom.

---

## 🧾 Data Structure

Field:

* Foto (optional)
* No Peserta
* Nama Lengkap
* Kelas
* Tahun Aktif (relasi dari data ujikom)
* Username
* Password
* Status Akun

---

## 📊 Table Columns

| Kolom       | Keterangan         |
| ----------- | ------------------ |
| Foto        | Optional           |
| No Peserta  | ID peserta         |
| Nama        | Nama lengkap       |
| Kelas       | Kelas siswa        |
| Tahun Aktif | Dari relasi        |
| Username    | Login              |
| Status      | Aktif / Nonaktif   |
| Aksi        | Show, Edit, Delete |

---

## ⚠️ RULE PASSWORD

* ❌ Tidak tampil di tabel
* ❌ Tidak tampil di show
* ✅ Hanya di create & edit

---

## 🔧 Form Create & Edit

Field:

* Foto
* No Peserta
* Nama Lengkap
* Kelas
* Tahun Aktif (dropdown dari API)
* Username
* Password
* Status

---

## 🔗 Relasi Tahun Aktif

API:

```text
GET /api/tahun-aktif
```

Dropdown:

```js
<select>
  <option v-for="item in tahunAktif">
    {{ item.tahun }}
  </option>
</select>
```

---

## 🔍 Show Page

Tampilkan:

* Foto
* No Peserta
* Nama
* Kelas
* Tahun Aktif
* Username
* Status

---

## ❌ Tidak tampil:

* Password

---

# 🔌 API ENDPOINT

## Asesor

* GET /api/asesor
* POST /api/asesor
* PUT /api/asesor/{id}
* DELETE /api/asesor/{id}

---

## Asesi

* GET /api/asesi
* POST /api/asesi
* PUT /api/asesi/{id}
* DELETE /api/asesi/{id}

---

## Tahun Aktif

* GET /api/tahun-aktif

---

# 🎨 UI/UX BEST PRACTICE

* Gunakan:

  * badge untuk status
  * modal untuk form
  * confirm dialog untuk delete
* Tampilkan loading state
* Gunakan toast notification

---

# 🚀 FUTURE IMPROVEMENT

* Filter by status
* Upload preview image
* Bulk import/export
* Sorting kolom tabel

---
# 👤 DATA AKUN PAGE SPECIFICATION

## 📌 Overview

Halaman **Data Akun** digunakan untuk mengelola akun pengguna dalam sistem ujikom.

Role yang tersedia:

* Administrator
* Asesor
* Asesi
* Validator

---

## 🧭 Breadcrumb

```text
Dashboard / Referensi / Data Akun
```

---

## 🧾 Data Structure

Field:

* Nama Lengkap
* Username
* Level Pengguna:

  * Administrator
  * Asesor
  * Asesi
  * Validator
* Kata Sandi (password)
* Status Akun (aktif / nonaktif)

---

## 📊 Table View (Index Page)

### 🧱 Kolom Tabel

| Kolom        | Keterangan                   |
| ------------ | ---------------------------- |
| Nama Lengkap | Nama user                    |
| Username     | Login                        |
| Level        | Role user                    |
| Status       | Aktif / Nonaktif             |
| Aksi         | Reset Password, Edit, Delete |

---

## ⚠️ RULE PASSWORD

* ❌ Tidak ditampilkan di tabel
* ❌ Tidak ditampilkan di halaman show
* ✅ Hanya muncul di:

  * Create
  * Edit
  * Reset Password

---

## 🎛️ Top Action Bar

```html
<div class="flex justify-between items-center mb-4">
  
  <div class="flex gap-2">
    <input placeholder="Search..." />

    <select>
      <option>Semua Level</option>
      <option>Administrator</option>
      <option>Asesor</option>
      <option>Asesi</option>
      <option>Validator</option>
    </select>
  </div>

  <button>+ Tambah Akun</button>

</div>
```

---

## 🔍 Search

Bisa mencari berdasarkan:

* Nama Lengkap
* Username

---

## 🔽 Filter (WAJIB)

Filter berdasarkan **Level Pengguna**:

Contoh:

```js
const levelOptions = [
  "Administrator",
  "Asesor",
  "Asesi",
  "Validator"
]
```

---

## 📄 Pagination

Harus ada:

* Showing X to Y of Z entries
* Pilihan:

  * 10 / 25 / 50 / 100
* Next / Previous

---

## 🔧 Form Create & Edit

### Field:

* Nama Lengkap (text)
* Username (text)
* Level Pengguna (dropdown)
* Password (password input)
* Status (aktif / nonaktif)

---

### ⚠️ Validasi:

* Nama wajib
* Username unik
* Password minimal 6 karakter

---

## 🔁 Reset Password

### 📌 Fitur khusus:

Aksi:

* Tombol "Reset Password"

---

### 💻 Behavior:

* Klik reset → buka modal
* Input password baru
* Submit ke API

---

### 🔌 Endpoint:

```text
PUT /api/users/{id}/reset-password
```

---

## 🔌 API Integration

| Method | Endpoint                       | Keterangan     |
| ------ | ------------------------------ | -------------- |
| GET    | /api/users                     | Ambil data     |
| POST   | /api/users                     | Tambah         |
| PUT    | /api/users/{id}                | Update         |
| DELETE | /api/users/{id}                | Hapus          |
| PUT    | /api/users/{id}/reset-password | Reset password |

---

## 🎨 UI/UX Guidelines

* Gunakan badge untuk level:

  * Admin → merah
  * Asesor → biru
  * Asesi → hijau
  * Validator → kuning

* Gunakan modal untuk:

  * create
  * edit
  * reset password

* Gunakan confirm dialog untuk delete

---

## 🧠 Best Practice

* Component:

  * UserTable.vue
  * UserForm.vue
  * ResetPasswordModal.vue

* Gunakan:

  * loading state
  * toast notification

---

## 🚀 Future Improvement

* Filter berdasarkan status
* Bulk reset password
* Activity log user
* Role permission system (lebih detail)

---
# 🏢 DATA TUK PAGE SPECIFICATION (UPDATED)

## 📌 Overview

Halaman **Data TUK (Tempat Uji Kompetensi)** digunakan untuk mengelola lokasi ujikom.

---

## ⚠️ PERUBAHAN PENTING

* ❌ Tidak ada fitur Import
* ❌ Tidak ada fitur Export

---

## 🧭 Breadcrumb

```text
Dashboard / Referensi / Data TUK
```

---

## 🎛️ Top Action Bar

```html
<div class="flex justify-between items-center mb-4">
  <input placeholder="Search..." />
  <button>+ Tambah TUK</button>
</div>
```

---

## 📊 Kolom Tabel

| Kolom     | Keterangan                       |
| --------- | -------------------------------- |
| Foto      | Optional                         |
| Nama TUK  | Nama tempat                      |
| Jenis TUK | Sewaktu / Mandiri / Tempat Kerja |
| Deskripsi | Optional                         |
| Aksi      | Edit, Delete                     |

---

## 🔍 Search

* Nama TUK
* Jenis TUK

---

## 📄 Pagination

* Showing X to Y of Z entries
* 10 / 25 / 50 / 100
* Next / Previous

---

## 🔧 Form

* Foto (optional)
* Nama TUK (wajib)
* Jenis TUK (dropdown)
* Deskripsi (optional)

# 🧠 GLOBAL UI CONSISTENCY (FINAL)

Semua halaman harus memiliki:

✅ Breadcrumb
✅ Search
✅ Pagination
✅ Action Button
✅ Modal Form
✅ Confirm Delete
