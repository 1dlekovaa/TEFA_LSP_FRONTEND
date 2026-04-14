<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Asesor;
use App\Models\Asesi;
use App\Models\Tuk;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DummyAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'nama_lengkap' => 'Administrator',
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'level' => 'Administrator',
            'status' => 'aktif',
        ]);

        // Create Asesor User
        User::create([
            'nama_lengkap' => 'Guru Asesor',
            'username' => 'asesor1',
            'password' => Hash::make('asesor123'),
            'level' => 'Asesor',
            'status' => 'aktif',
        ]);

        // Create Asesi User
        User::create([
            'nama_lengkap' => 'Siswa Asesi',
            'username' => 'asesi1',
            'password' => Hash::make('asesi123'),
            'level' => 'Asesi',
            'status' => 'aktif',
        ]);

        // Create Validator User
        User::create([
            'nama_lengkap' => 'Validator',
            'username' => 'validator1',
            'password' => Hash::make('validator123'),
            'level' => 'Validator',
            'status' => 'aktif',
        ]);

        // Create Asesor Data
        for ($i = 1; $i <= 5; $i++) {
            Asesor::create([
                'nama_lengkap' => "Asesor $i",
                'no_met' => 'MET' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'username' => "asesor_data_$i",
                'password' => Hash::make('password123'),
                'status' => $i % 2 == 0 ? 'nonaktif' : 'aktif',
            ]);
        }

        // Create Asesi Data
        $classes = ['10 A', '10 B', '10 C', '11 A', '11 B'];
        for ($i = 1; $i <= 10; $i++) {
            Asesi::create([
                'no_peserta' => 'PST' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'nama_lengkap' => "Asesi Peserta $i",
                'kelas' => $classes[$i % count($classes)],
                'tahun_aktif_id' => 1,
                'username' => "asesi_data_$i",
                'password' => Hash::make('password123'),
                'status' => $i % 3 == 0 ? 'nonaktif' : 'aktif',
            ]);
        }

        // Create TUK Data
        Tuk::create([
            'nama_tuk' => 'TUK Sekolah Pusat',
            'jenis_tuk' => 'Sewaktu',
            'deskripsi' => 'Tempat Uji Kompetensi di sekolah utama',
        ]);

        Tuk::create([
            'nama_tuk' => 'TUK Industri Partner',
            'jenis_tuk' => 'Tempat Kerja',
            'deskripsi' => 'Tempat Uji Kompetensi di industri partner',
        ]);

        Tuk::create([
            'nama_tuk' => 'TUK Mandiri Cabang',
            'jenis_tuk' => 'Mandiri',
            'deskripsi' => 'Tempat Uji Kompetensi mandiri di cabang',
        ]);

        echo "✅ Dummy accounts berhasil dibuat!\n";
        echo "📝 Akun Testing:\n";
        echo "   Admin: admin / admin123\n";
        echo "   Asesor: asesor1 / asesor123\n";
        echo "   Asesi: asesi1 / asesi123\n";
        echo "   Validator: validator1 / validator123\n";
    }
}
