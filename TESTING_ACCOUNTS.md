# 🧪 Testing Accounts

Dummy accounts untuk testing aplikasi admin panel.

## 📋 List Akun Testing

### Administrator
- **Username:** admin
- **Password:** admin123
- **Email:** admin@lsp.com
- **Level:** Administrator

### Guru/Asesor
- **Username:** asesor1
- **Password:** asesor123
- **Email:** asesor1@lsp.com
- **Level:** Asesor

### Siswa/Asesi
- **Username:** asesi1
- **Password:** asesi123
- **Email:** asesi1@lsp.com
- **Level:** Asesi

### Validator
- **Username:** validator1
- **Password:** validator123
- **Email:** validator1@lsp.com
- **Level:** Validator

---

## 🚀 Cara Menggunakan

### 1. Login Melalui Frontend
```
URL: http://localhost:3000/login
Username: admin
Password: admin123
```

### 2. Jalankan Seeder Backend (Laravel)

Jika menggunakan Laravel, jalankan seeder:

```bash
# Di folder Laravel backend
php artisan db:seed --class=DummyAccountSeeder
```

Atau tambahkan ke `DatabaseSeeder.php`:

```php
$this->call([
    DummyAccountSeeder::class,
]);
```

---

## 📊 Test Data yang Dibuat

### Asesor (5 data)
- Asesor 1 - No MET: MET001
- Asesor 2 - No MET: MET002
- dst...

### Asesi (10 data)
- Asesi 1 - No Peserta: PST001 - Kelas 10 A
- Asesi 2 - No Peserta: PST002 - Kelas 10 B
- dst...

### Akun (4 data)
- Administrator
- Asesor
- Asesi
- Validator

### TUK (3 data)
- TUK Sekolah - Jenis: Sewaktu
- TUK Industri - Jenis: Tempat Kerja
- TUK Mandiri - Jenis: Mandiri

---

## 🔄 CRUD Testing Checklist

### Dashboard ✅
- [ ] Load dashboard
- [ ] Cek card statistik
- [ ] Verify data fetch dari API

### Asesor ✅
- [ ] List data dengan pagination
- [ ] Search by nama/no MET/username
- [ ] Create asesor baru
- [ ] Edit asesor
- [ ] View detail
- [ ] Delete asesor
- [ ] Import data (optional)
- [ ] Export data (optional)

### Asesi ✅
- [ ] List data dengan pagination
- [ ] Search by nama/no peserta/username
- [ ] Test tahun aktif dropdown
- [ ] Create asesi baru
- [ ] Edit asesi
- [ ] View detail
- [ ] Delete asesi
- [ ] Import data (optional)
- [ ] Export data (optional)

### Data Akun ✅
- [ ] List data dengan filter level
- [ ] Search by nama/username
- [ ] Create akun baru
- [ ] Edit akun
- [ ] Reset password
- [ ] Delete akun
- [ ] Cek level badge colors

### Data TUK ✅
- [ ] List data dengan pagination
- [ ] Search by nama/jenis
- [ ] Create TUK baru
- [ ] Edit TUK
- [ ] Delete TUK
- [ ] Cek jenis badge colors

---

## 🌐 API Testing dengan cURL

### Create Asesor
```bash
curl -X POST http://localhost:8000/api/asesor \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Asesor Test",
    "no_met": "MET999",
    "username": "asesor_test",
    "password": "test123456",
    "status": "aktif"
  }'
```

### Get All Asesor
```bash
curl http://localhost:8000/api/asesor?page=1&per_page=10
```

### Create Asesi
```bash
curl -X POST http://localhost:8000/api/asesi \
  -H "Content-Type: application/json" \
  -d '{
    "no_peserta": "PST999",
    "nama_lengkap": "Asesi Test",
    "kelas": "10 A",
    "tahun_aktif_id": 1,
    "username": "asesi_test",
    "password": "test123456",
    "status": "aktif"
  }'
```

### Create User/Akun
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "User Test",
    "username": "user_test",
    "level": "Asesor",
    "password": "test123456",
    "status": "aktif"
  }'
```

### Create TUK
```bash
curl -X POST http://localhost:8000/api/tuk \
  -H "Content-Type: application/json" \
  -d '{
    "nama_tuk": "TUK Test",
    "jenis_tuk": "Sewaktu",
    "deskripsi": "TUK untuk testing"
  }'
```

### Reset Password User
```bash
curl -X PUT http://localhost:8000/api/users/1/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "password": "newpassword123"
  }'
```

---

## 📝 Notes

- Semua password di atas hanya untuk **testing**, jangan gunakan di production
- Pastikan API server sudah berjalan di `http://localhost:8000`
- Frontend berjalan di `http://localhost:3000`
- Gunakan akun admin untuk mengakses semua fitur CRUD
