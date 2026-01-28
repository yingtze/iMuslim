# Changelog

Semua perubahan penting pada proyek iMuslim akan didokumentasikan di file ini.

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
