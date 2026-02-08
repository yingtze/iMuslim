# Changelog

Semua perubahan penting pada proyek iMuslim akan didokumentasikan di file ini.

## [1.1.1] - 2026-02-08

### 🐛 Perbaikan Bug
- **Fix Waktu Penting 1 Ramadhan**: Memperbaiki logika pengambilan data pada bagian "Waktu Penting Hari Ini (1 Ramadhan)" di halaman detail Imsakiyah.
  - Sebelumnya: Mengambil data berdasarkan tanggal hari ini (bisa tidak sesuai dengan 1 Ramadhan).
  - Sekarang: Selalu mengambil data dari tanggal 1 Ramadhan (hari pertama) untuk konsistensi.
- **Penambahan `firstDaySchedule`**: Menambahkan computed property baru di `imsakiyahStore` yang secara eksplisit mengambil jadwal tanggal 1 Ramadhan.

### 🔧 Perubahan Teknis
- Memisahkan logika `todaySchedule` dan `firstDaySchedule` untuk fleksibilitas penggunaan data di masa depan.
- Memperbaiki type handling di store untuk menghindari TypeScript errors.

## [1.1.0] - 2026-01-29

### ✨ Fitur Baru
- **Fitur Imsakiyah Lengkap**: Menambahkan modul Jadwal Imsakiyah Ramadhan 1447 H / 2026 M.
- **Seleksi Provinsi & Kota**: Implementasi pemilihan wilayah menggunakan API dinamis untuk daftar provinsi dan kabupaten/kota seluruh Indonesia.
- **Halaman Khusus Imsakiyah**: View detail untuk satu kota tertentu dengan ringkasan "Waktu Penting Hari Ini" dan tabel lengkap 30 hari.

### 🎨 Tampilan (UI/UX)
- **Unified Teal Theme**: Memastikan seluruh halaman menggunakan aksen warna Teal/Emerald yang konsisten.
- **iOS Sticky Back Button**: Mengimplementasikan tombol kembali model melayang yang menetap (*sticky*) saat di-scroll untuk navigasi yang lebih cepat.
- **Compact Layout**: Optimalisasi ukuran kartu "Waktu Penting" agar lebih proporsional.

### 🐛 Perbaikan Bug
- Memperbaiki isu pengambilan data provinsi pada interaksi klien (`onMounted`) dengan mengganti `useFetch` menjadi `$fetch`.
- Menyesuaikan *sticky offset* tombol kembali agar tidak tertutup atau menempel terlalu dekat dengan header utama.

## [1.0.0] - 2026-01-28

### ✨ Fitur Baru
- **Integrasi API Penuh**: Menghubungkan aplikasi dengan endpoint `equran.id/api` untuk data doa, detail, dan filtering.
- **Filter Server-side**: Implementasi filter Kategori dan Tag yang langsung mengambil data terfilter dari API.
- **Rekomendasi Doa**: Menambahkan seksi "Doa Lainnya dalam Kategori X" di halaman detail doa.
- **Copy & Share**: Fitur salin teks doa lengkap (Arab, Latin, Arti, Dalil) dengan format yang rapi.

### 🎨 Tampilan (UI/UX)
- **Glassmorphism Redesign**: Merombak total tampilan menjadi gaya *Liquid Glass* / *Frosted Glass* yang premium.
- **iOS Style Components**:
  - Header navigasi model *Floating Dock*.
  - Stats pills dengan desain kaca.
  - Search bar interaktif yang melebar (expandable) saat fokus.
  - Tombol kembali (Back Button) model sticky pill di halaman detail.
- **Card Design**:
  - Kartu doa dengan efek *shine* animasi hover.
  - Tombol "BACA DOA" dengan gradient solid (Emerald-Teal).
  - Penanganan teks panjang dengan `line-clamp` yang responsif.
- **Detail Page**:
  - Header detail yang diperjelas informasinya (tanpa label redundan).
  - Teks Arab besar dengan efek *glow* subtle.

### 🐛 Perbaikan Bug
- Memperbaiki layout judul doa yang terpotong pada kartu (sekarang mendukung 2 baris).
- Memastikan `z-index` yang benar untuk elemen sticky header dan tombol kembali.
- Menghapus karakter `#` pada tampilan tag agar lebih bersih.
- Menyeragamkan posisi panah navigasi pada kartu rekomendasi agar sejajar kanan.

---
*Versi ini merupakan rilis mayor pertama dengan tampilan antarmuka yang stabil dan fitur yang lengkap.*
