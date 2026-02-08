# ✓ Validators - Data Validation Utilities

Helper functions untuk memvalidasi data sebelum digunakan. Ini memastikan data yang diterima dari API atau user input sudah valid dan aman.

## 📂 File

- [dataValidator.ts](./dataValidator.ts) - Semua validator functions

## 🎯 Fungsi-Fungsi

### Type Guards (Membedakan Tipe Data)

Fungsi-fungsi ini menggunakan TypeScript type guard pattern untuk memastikan tipe data dengan aman.

#### 1. `isValidDoaItem(doa: any): doa is DoaItem`

Validasi apakah object adalah DoaItem yang valid (item minimal dari list).

```typescript
import { isValidDoaItem } from '~/utils'

const item = { id: 1, nama: 'Doa Pagi', idn: 'Isi doa...' }

if (isValidDoaItem(item)) {
  // Item sudah dipastikan tipe DoaItem
  console.log(item.nama)
}
```

**Kapan digunakan:**
- Validasi sebelum render DoaCard
- Guard di function yang expect DoaItem
- Parse API response dengan tipe yang tidak jelas

**Requirement:**
- Harus memiliki: `id`, `nama`
- Dan salah satu dari: `idn` atau `ar`

---

#### 2. `isValidDoaDetail(doa: any): doa is DoaDetail`

Validasi untuk doa detail (item lengkap dengan semua terjemahan).

```typescript
import { isValidDoaDetail } from '~/utils'

const detail = { 
  id: 1, 
  nama: 'Doa Pagi', 
  ar: 'النص العربي', 
  tr: 'Transliterasi', 
  idn: 'Isi doa...' 
}

if (isValidDoaDetail(detail)) {
  // Detail sudah dipastikan valid dengan semua field
  displayDetail(detail)
}
```

**Kapan digunakan:**
- Validasi response dari `/api/doa/{id}`
- Guard di DoaDetail component
- Sebelum render full doa content

**Requirement:**
- Harus memiliki semua: `id`, `nama`, `ar`, `tr`, `idn`

---

#### 3. `isValidJadwalShalatItem(jadwal: any): jadwal is JadwalShalatItem`

Validasi apakah object adalah jadwal shalat yang valid.

```typescript
import { isValidJadwalShalatItem } from '~/utils'

const jadwal = {
  tanggal: '2026-01-29',
  subuh: '04:50',
  dzuhur: '12:20',
  ashar: '15:30',
  maghrib: '17:50',
  isya: '19:15'
}

if (isValidJadwalShalatItem(jadwal)) {
  // Jadwal sudah valid
  updateScheduleCard(jadwal)
}
```

**Kapan digunakan:**
- Validasi item dalam array jadwal
- Guard sebelum menampilkan waktu shalat
- Filter data jadwal yang corrupt

**Requirement:**
- Harus memiliki: `tanggal`, `subuh`, `dzuhur`, `ashar`, `maghrib`, `isya`

---

### Operasional Validators (Cek Kondisi Spesifik)

#### 4. `isValidForShare(doa: any): boolean`

Validasi apakah doa memiliki data yang cukup untuk share.

```typescript
import { isValidForShare } from '~/utils'

if (isValidForShare(doa)) {
  // Data memiliki nama dan isi yang valid
  shareToWhatsApp(doa)
}
```

**Kapan digunakan:**
- Guard tombol "Share"
- Validasi sebelum buka share dialog
- Ensure data yang di-share ada

**Requirement:**
- Memiliki: `id`, `nama` (string, tidak kosong), `idn` (string, tidak kosong)

---

#### 5. `isNotEmpty(str: any): boolean`

Cek apakah string tidak kosong (setelah trim).

```typescript
import { isNotEmpty } from '~/utils'

const input = '  Halo  '
isNotEmpty(input)     // true

const emptyInput = '   '
isNotEmpty(emptyInput) // false
```

**Kapan digunakan:**
- Validasi input user dari form
- Cek string dari API response
- Guard rendering text yang kosong

---

#### 6. `isArrayNotEmpty(arr: any): arr is Array<any>`

Cek apakah value adalah array dan tidak kosong.

```typescript
import { isArrayNotEmpty } from '~/utils'

const items = [1, 2, 3]
if (isArrayNotEmpty(items)) {
  items.forEach(item => console.log(item))
}

const notArray = 'bukan array'
isArrayNotEmpty(notArray)  // false
```

**Kapan digunakan:**
- Guard sebelum `.map()` atau `.forEach()`
- Cek apakah list doa ada
- Validasi bahwa API response adalah array

---

### Format Validators (Cek Format Spesifik)

#### 7. `isValidWaktuFormat(waktu: any): boolean`

Validasi format waktu `HH:MM`.

```typescript
import { isValidWaktuFormat } from '~/utils'

isValidWaktuFormat('04:30')   // true
isValidWaktuFormat('24:00')   // false (jam invalid)
isValidWaktuFormat('4:30')    // false (harus leading zero)
isValidWaktuFormat('invalid') // false
```

**Kapan digunakan:**
- Validasi waktu dari API sebelum simpan
- Validasi user input jam shalat
- Normalisasi format waktu

---

#### 8. `isValidTanggal(tanggal: any): boolean`

Validasi tanggal 1-31.

```typescript
import { isValidTanggal } from '~/utils'

isValidTanggal(15)    // true
isValidTanggal(1)     // true
isValidTanggal(31)    // true
isValidTanggal(32)    // false
isValidTanggal(0)     // false
```

**Kapan digunakan:**
- Validasi input tanggal dari filter
- Cek tanggal dari API response
- Guard query param tanggal

---

#### 9. `isValidBulan(bulan: any): boolean`

Validasi bulan 1-12.

```typescript
import { isValidBulan } from '~/utils'

isValidBulan(1)       // true (Januari)
isValidBulan(12)      // true (Desember)
isValidBulan(13)      // false
isValidBulan(0)       // false
```

**Kapan digunakan:**
- Validasi query param bulan
- Cek bulan dari filter user
- Normalize bulan dari berbagai source

---

#### 10. `isValidTahun(tahun: any): boolean`

Validasi tahun yang reasonable (2000-2100).

```typescript
import { isValidTahun } from '~/utils'

isValidTahun(2026)    // true
isValidTahun(1999)    // false
isValidTahun(2100)    // true
```

**Kapan digunakan:**
- Validasi tahun dari filter
- Guard query param tahun
- Cek tahun dari API response

---

#### 11. `isValidProvinsi(provinsi: any): boolean`

Validasi provinsi (harus string tidak kosong).

```typescript
import { isValidProvinsi } from '~/utils'

isValidProvinsi('Jawa Barat')    // true
isValidProvinsi('  ')             // false
isValidProvinsi(null)             // false
```

**Kapan digunakan:**
- Validasi pemilihan provinsi di form
- Guard sebelum fetch cities
- Cek provinsi dari URL param

---

#### 12. `isValidKabKota(kabkota: any): boolean`

Validasi kabupaten/kota (harus string tidak kosong).

```typescript
import { isValidKabKota } from '~/utils'

isValidKabKota('Bogor')    // true
isValidKabKota('  ')       // false
```

**Kapan digunakan:**
- Validasi pemilihan kota di form
- Guard sebelum fetch schedule
- Cek kota dari URL param

---

#### 13. `isValidLocation(provinsi: any, kabkota: any): boolean`

Validasi location lengkap (kedua provinsi dan kota harus valid).

```typescript
import { isValidLocation } from '~/utils'

isValidLocation('Jawa Barat', 'Bogor')    // true
isValidLocation('Jawa Barat', '')        // false
isValidLocation('', 'Bogor')              // false
```

**Kapan digunakan:**
- Guard sebelum fetch jadwal shalat
- Validasi form pemilihan lokasi
- Cek route param di halaman jadwal

---

## 💡 Tips untuk Pemula

### Pattern: Type Guards untuk Safe Access

```typescript
import { isValidDoaItem, isValidDoaDetail } from '~/utils'

function displayDoa(data: unknown) {
  if (isValidDoaItem(data)) {
    // TypeScript tau data adalah DoaItem di sini
    console.log(data.nama, data.idn)
  } else if (isValidDoaDetail(data)) {
    // TypeScript tau data adalah DoaDetail di sini
    console.log(data.ar, data.tr)
  }
}
```

### Pattern: Guard List Sebelum Render

```typescript
import { isArrayNotEmpty, isValidDoaItem } from '~/utils'

function renderList(items: unknown) {
  if (!isArrayNotEmpty(items)) {
    return <p>Tidak ada data</p>
  }

  return items.map(item => {
    if (!isValidDoaItem(item)) return null
    return <DoaCard key={item.id} doa={item} />
  })
}
```

### Pattern: Kombinasi Validators

```typescript
import { isValidLocation, isValidTahun, isValidBulan } from '~/utils'

const query = router.query
if (isValidLocation(query.provinsi, query.kota) && 
    isValidTahun(query.tahun) && 
    isValidBulan(query.bulan)) {
  fetchSchedule(query)
} else {
  showError('Parameter tidak valid')
}
```

---

## 🔗 Lihat Juga

- [../formatters](../formatters) - Format tanggal & waktu
- [../cache](../cache) - Generate cache keys
- [../api](../api) - Handle API errors
- [../../CONTRIBUTING_GUIDE.md](../../CONTRIBUTING_GUIDE.md) - Panduan menambah validator baru
