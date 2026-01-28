# iMuslim - Aplikasi Doa Harian Modern

iMuslim adalah aplikasi web modern untuk kumpulan doa harian, dibangun dengan tampilan antarmuka **Premium Glassmorphism** (Liquid Glass) yang elegan dan responsif. Aplikasi ini memudahkan pengguna mencari, membaca, dan membagikan doa-doa harian dari sumber terpercaya.

## 🚀 Fitur Utama

- **Kumpulan Doa Lengkap**: Akses ratusan doa harian dengan teks Arab, Latin, dan Terjemahan Indonesia.
- **Desain Premium**: Antarmuka Dark Mode dengan gaya *Frosted/Liquid Glass* ala iOS/macOS.
- **Pencarian Cerdas**: Cari doa berdasarkan judul, isi, atau kategori secara instan.
- **Filter Canggih**: Filter doa berdasarkan Kategori (Grup) dan Tag kontekstual.
- **Detail Informatif**: Setiap doa dilengkapi dengan keterangan riwayat/hadits (Dalil).
- **Fitur Berbagi**: Salin doa lengkap (Arab, Latin, Arti) ke clipboard atau bagikan link langsung.
- **Rekomendasi Cerdas**: Fitur "Doa Lainnya" yang menampilkan doa terkait dalam satu kategori.

## 🛠 Teknologi

Project ini dibangun menggunakan:
- [Nuxt 3](https://nuxt.com) - The Vue Framework for Web Hybrid Apps
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Pinia](https://pinia.vuejs.org) - State Management
- [Equran.id API](https://equran.id/apil) - Sumber data doa
- **Custom CSS Components** - Untuk efek Glassmorphism & Liquid Animations

## 📦 Cara Menjalankan

Pastikan Anda sudah menginstall Node.js (v16+).

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Akses aplikasi di `http://localhost:3000`.

3. **Build untuk Production**
   ```bash
   npm run build
   ```

## 📂 Struktur Project

- `pages/`: Halaman aplikasi (Routing otomatis).
- `components/`: Komponen UI reusable (DoaCard, FilterBar, dll).
- `stores/`: State management (Pinia) untuk data doa.
- `composables/`: Logic untuk fetch API (`useDoa`).
- `assets/`: File CSS global dan assets lainnya.

---
Dibuat dengan ❤️ untuk umat Muslim.
