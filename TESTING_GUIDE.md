# 🧪 Testing Guide - Admin Panel LSP

Panduan lengkap untuk testing aplikasi admin panel dengan dummy accounts.

---

## 🚀 Setup Awal

### Prerequisite
- Backend Laravel sudah running di `http://localhost:8000`
- Frontend Nuxt sudah running di `http://localhost:3000`
- Database sudah ter-setup

### 1. Jalankan Seeder Backend

```bash
# Di folder backend Laravel
cd backend-folder

# Jalankan seeder
php artisan db:seed --class=DummyAccountSeeder

# Atau jika ingin reset database + seed
php artisan migrate:fresh --seed
```

Output yang diharapkan:
```
✅ Dummy accounts berhasil dibuat!
📝 Akun Testing:
   Admin: admin / admin123
   Asesor: asesor1 / asesor123
   Asesi: asesi1 / asesi123
   Validator: validator1 / validator123
```

---

## 📱 Testing di Frontend

### 1. Login dengan Admin

1. Kunjungi: `http://localhost:3000/login`
2. Username: `admin`
3. Password: `admin123`
4. Klik "Masuk"
5. Expected: Redirect ke `/dashboard`

### 2. Test Dashboard

**URL:** `http://localhost:3000/dashboard`

Checklist:
- [ ] 4 card statistik ter-load (Asesi, Asesor, User, Skema)
- [ ] Angka sesuai dengan data di database
- [ ] Responsive di mobile/tablet
- [ ] Loading spinner muncul saat fetch data

---

## 📊 Testing CRUD Asesor

**URL:** `http://localhost:3000/referensi/asesor`

### Test List View
- [ ] Tabel tampil dengan 5 data asesor
- [ ] Breadcrumb muncul: "Dashboard / Referensi / Data Asesor"
- [ ] Search bar berfungsi - cari "Asesor 1"
- [ ] Pagination tampil - pilih 25 per page
- [ ] Status badge muncul dengan warna (hijau=aktif, merah=nonaktif)

### Test Create
1. Klik "+ Tambah Asesor"
2. Isi form:
   - Nama: "Test Asesor Baru"
   - No MET: "MET9999"
   - Username: "test_asesor"
   - Password: "test123456"
   - Status: "Aktif"
3. Klik "Simpan"
4. Expected: Toast success, data muncul di list

### Test Edit
1. Klik tombol "Edit" di salah satu row
2. Modal muncul dengan data ter-isi
3. Ubah "Nama" menjadi "Asesor Edited"
4. Klik "Simpan"
5. Expected: Data ter-update di list

### Test Detail View
1. Klik "Lihat" di salah satu row
2. Expected: Redirect ke `/referensi/asesor/[id]`
3. Detail tampil dengan:
   - [ ] Foto (avatar jika tidak ada)
   - [ ] Nama lengkap
   - [ ] No MET
   - [ ] Username
   - [ ] Status badge
   - [ ] Tombol "Edit" dan "Hapus"

### Test Delete
1. Dari detail page, klik "Hapus"
2. Dialog konfirmasi muncul
3. Klik "Hapus"
4. Expected: Data terhapus, redirect ke list

---

## 👨‍🎓 Testing CRUD Asesi

**URL:** `http://localhost:3000/referensi/asesi`

### Test List View
- [ ] Tabel tampil dengan 10 data asesi
- [ ] Kolom: Foto, No Peserta, Nama, Kelas, Username, Status
- [ ] Search berfungsi
- [ ] Pagination bekerja

### Test Create
1. Klik "+ Tambah Asesi"
2. Isi form:
   - No Peserta: "PST9999"
   - Nama: "Test Asesi Baru"
   - Kelas: "12 A"
   - Tahun Aktif: (pilih dari dropdown)
   - Username: "test_asesi"
   - Password: "test123456"
   - Status: "Aktif"
3. Klik "Simpan"
4. Expected: Data ter-create

### Test Edit & Delete
- [ ] Berfungsi seperti Asesor
- [ ] Password field kosong saat edit (hanya diisi jika ingin ubah)

---

## 👤 Testing Data Akun

**URL:** `http://localhost:3000/referensi/akun`

### Test List View
- [ ] Tabel tampil dengan 4 akun test
- [ ] Kolom: Nama, Username, Level, Status
- [ ] Search dan Filter Level bekerja
- [ ] Level badge muncul dengan warna:
  - Administrator = Merah
  - Asesor = Biru
  - Asesi = Hijau
  - Validator = Kuning

### Test Filter by Level
1. Klik dropdown "Semua Level"
2. Pilih "Asesor"
3. Expected: List hanya tampil akun dengan level Asesor

### Test Reset Password
1. Klik "Reset PW" di salah satu row
2. Modal muncul
3. Isi password baru: "newpass123"
4. Klik "Simpan"
5. Expected: Toast success
6. Login ulang dengan password baru

### Test Create User
1. Klik "+ Tambah Akun"
2. Isi form:
   - Nama: "Test User"
   - Username: "test_user"
   - Level: "Asesor"
   - Password: "test123456"
   - Status: "Aktif"
3. Klik "Simpan"
4. Expected: User ter-create

### Test Edit & Delete
- [ ] Berfungsi seperti CRUD lainnya

---

## 🏢 Testing Data TUK

**URL:** `http://localhost:3000/referensi/tuk`

### Test List View
- [ ] Tabel tampil dengan 3 data TUK
- [ ] Kolom: Foto, Nama TUK, Jenis TUK, Deskripsi
- [ ] Search dan Pagination bekerja
- [ ] Jenis TUK badge muncul dengan warna:
  - Sewaktu = Biru
  - Mandiri = Ungu
  - Tempat Kerja = Indigo

### Test Create
1. Klik "+ Tambah TUK"
2. Isi form:
   - Nama TUK: "TUK Test Baru"
   - Jenis TUK: "Sewaktu"
   - Deskripsi: "TUK untuk testing"
3. Klik "Simpan"
4. Expected: Data ter-create

### Test Edit & Delete
- [ ] Berfungsi seperti CRUD lainnya

---

## 🔐 Testing Password Rules

### Rule yang harus ditest:
- [ ] Password **TIDAK** tampil di table
- [ ] Password **TIDAK** tampil di detail view
- [ ] Password **HANYA** tampil di:
  - Create form
  - Edit form
  - Reset Password modal (untuk User)

---

## 🎨 Testing UI/UX

### Responsive Design
- [ ] Desktop (1920px) - 4 kolom table
- [ ] Tablet (768px) - 2 kolom
- [ ] Mobile (375px) - 1 kolom

### Loading States
- [ ] Spinner muncul saat fetch data
- [ ] "Loading..." text tampil

### Error Handling
- [ ] Error message tampil jika API failed
- [ ] Try refresh/retry

### Toast Notifications
- [ ] Success toast muncul setelah create/edit/delete
- [ ] Error toast muncul jika ada error
- [ ] Toast auto-dismiss setelah 3 detik

### Modal Behavior
- [ ] Modal bisa di-close dengan tombol "Batal"
- [ ] Modal bisa di-close dengan click outside (optional)
- [ ] Form reset setelah submit

### Navigation
- [ ] Breadcrumb clickable dan mengarah ke halaman yang tepat
- [ ] Tombol back bekerja
- [ ] Sidebar navigation bekerja

---

## 🐛 Automated Testing (Optional)

Jika ingin membuat automated tests, gunakan:

### Unit Testing
```bash
npm run test:unit
```

### E2E Testing dengan Playwright/Cypress
```bash
npm run test:e2e
```

---

## 📋 Test Report Template

```markdown
# Test Report - [DATE]

## Environment
- Browser: Chrome 
- OS: Windows 11
- Backend URL: http://localhost:8000
- Frontend URL: http://localhost:3000

## Test Results

### Dashboard
- [ ] PASS / [ ] FAIL - Card statistik ter-load
- [ ] PASS / [ ] FAIL - Data sesuai

### Asesor CRUD
- [ ] PASS / [ ] FAIL - List view
- [ ] PASS / [ ] FAIL - Create
- [ ] PASS / [ ] FAIL - Edit
- [ ] PASS / [ ] FAIL - Delete
- [ ] PASS / [ ] FAIL - Search
- [ ] PASS / [ ] FAIL - Pagination

### Asesi CRUD
- [ ] PASS / [ ] FAIL - List view
- [ ] PASS / [ ] FAIL - Create with tahun aktif
- [ ] PASS / [ ] FAIL - Edit
- [ ] PASS / [ ] FAIL - Delete

### Data Akun
- [ ] PASS / [ ] FAIL - List with filter
- [ ] PASS / [ ] FAIL - Create
- [ ] PASS / [ ] FAIL - Reset password
- [ ] PASS / [ ] FAIL - Edit
- [ ] PASS / [ ] FAIL - Delete

### Data TUK
- [ ] PASS / [ ] FAIL - List view
- [ ] PASS / [ ] FAIL - Create
- [ ] PASS / [ ] FAIL - Edit
- [ ] PASS / [ ] FAIL - Delete

## Issues Found
1. [Issue 1]
2. [Issue 2]

## Notes
...
```

---

## 💡 Tips Testing

1. **Clear Browser Cache** jika ada issue
   - Ctrl + Shift + Delete → Clear browsing data

2. **Check Browser Console** untuk error
   - F12 → Console tab

3. **Check Network Tab** untuk API calls
   - F12 → Network tab

4. **Use API Testing Tool** untuk test backend separately
   - Postman, Insomnia, atau Thunder Client

5. **Check Database** untuk verify data
   ```bash
   # Di Laravel
   php artisan tinker
   >> App\Models\User::all()
   ```

---

## 🎯 Success Criteria

✅ Semua CRUD operations (Create, Read, Update, Delete) berfungsi
✅ Search dan filter bekerja dengan baik
✅ Pagination menampilkan data dengan benar
✅ Toast notifications tampil
✅ No JavaScript errors di console
✅ Responsive di berbagai ukuran layar
✅ Password tidak tampil di public views
✅ Status badges menampilkan warna yang benar

Jika semua criteria terpenuhi, aplikasi siap untuk production! 🚀
