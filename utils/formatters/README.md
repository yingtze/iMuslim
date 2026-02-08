# 📅 Formatters - Date & Time Utilities

Helper functions untuk memformat tanggal dan waktu dalam format yang readable dan sesuai kebutuhan aplikasi.

## 📂 File

- [dateFormatter.ts](./dateFormatter.ts) - Semua formatter functions

## 🎯 Fungsi-Fungsi

### 1. `getNamaHari(hari: string): string`

Mengkonversi nama hari ke bahasa Indonesia.

```typescript
import { getNamaHari } from '~/utils'

getNamaHari('Senin')      // 'Senin'
getNamaHari('Monday')     // 'Monday' (fallback jika tidak dikenali)
```

**Kapan digunakan:**
- Menampilkan nama hari pada halaman jadwal shalat
- Menampilkan hari dalam card doa

---

### 2. `formatTanggal(tanggal: number): string`

Format tanggal ke format readable dengan bulan singkat.

```typescript
import { formatTanggal } from '~/utils'

formatTanggal(5)          // '05 Jan'
formatTanggal(23)         // '23 Jan'
formatTanggal(1)          // '01 Jan'
```

**Kapan digunakan:**
- Menampilkan tanggal dalam daftar jadwal
- Header card dengan tanggal

**Output Format:** `DD MMM` (misal: 05 Jan, 23 Des)

---

### 3. `formatWaktuShalat(waktu: string): string`

Memastikan waktu dalam format `HH:MM` dengan leading zero.

```typescript
import { formatWaktuShalat } from '~/utils'

formatWaktuShalat('4:30')     // '04:30'
formatWaktuShalat('14:45')    // '14:45'
formatWaktuShalat('5:00')     // '05:00'
```

**Kapan digunakan:**
- Menampilkan waktu adzan/iqamah
- Menampilkan jam imsak dan sahur
- Normalisasi input waktu dari API

**Output Format:** `HH:MM`

---

### 4. `getBulanSekarang(): number`

Mendapatkan nomor bulan saat ini (1-12).

```typescript
import { getBulanSekarang } from '~/utils'

// Jika sekarang Januari:
getBulanSekarang()        // 1

// Jika sekarang Desember:
getBulanSekarang()        // 12
```

**Kapan digunakan:**
- Menentukan bulan untuk fetch jadwal shalat
- Filter data berdasarkan bulan sekarang
- Set default value di form pemilihan bulan

---

### 5. `getTahunSekarang(): number`

Mendapatkan tahun saat ini (4 digit).

```typescript
import { getTahunSekarang } from '~/utils'

getTahunSekarang()        // 2026
```

**Kapan digunakan:**
- Menentukan tahun untuk fetch jadwal shalat
- Set default value tahun di filter
- Header halaman jadwal shalat

---

### 6. `getTanggalHariIni(): number`

Mendapatkan tanggal hari ini (1-31).

```typescript
import { getTanggalHariIni } from '~/utils'

getTanggalHariIni()       // 29 (jika hari ini tanggal 29)
```

**Kapan digunakan:**
- Highlight jadwal shalat hari ini
- Set default value filter
- Tentukan `todaySchedule` di store

---

### 7. `formatDurasi(jamMulai: string, jamSelesai: string): string`

Menghitung selisih waktu dan format dalam bahasa readable.

```typescript
import { formatDurasi } from '~/utils'

formatDurasi('04:00', '08:30')    // '4 jam 30 menit'
formatDurasi('12:00', '12:30')    // '30 menit'
formatDurasi('05:00', '17:00')    // '12 jam'
```

**Kapan digunakan:**
- Menampilkan durasi sahur (dari imsak hingga subuh)
- Durasi antara adzan dan iqamah
- Durasi waktu buka puasa hingga berbuka

**Output Format:** `X jam Y menit`

---

## 💡 Tips untuk Pemula

### Import Semua di Sekali

```typescript
import {
  getNamaHari,
  formatTanggal,
  formatWaktuShalat,
  getBulanSekarang,
  getTahunSekarang,
  getTanggalHariIni,
  formatDurasi
} from '~/utils'
```

### Atau Import Spesifik

```typescript
import { formatTanggal, formatWaktuShalat } from '~/utils'
```

### Atau Import dari File Langsung

```typescript
import { formatTanggal } from '~/utils/formatters/dateFormatter'
```

---

## 🔗 Lihat Juga

- [../validators](../validators) - Validasi data
- [../cache](../cache) - Generate cache keys
- [../api](../api) - Handle API errors
- [../../CONTRIBUTING_GUIDE.md](../../CONTRIBUTING_GUIDE.md) - Panduan menambah helper baru
