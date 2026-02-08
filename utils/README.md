# 🛠️ Utils - Helper Functions Directory

Direktori terpusat untuk semua utility functions yang dapat digunakan di seluruh aplikasi iMuslim.

## 📚 Quick Navigation

Pilih kategori yang sesuai kebutuhan Anda:

### 🎨 **[Formatters](./formatters/README.md)** - Format Tanggal & Waktu
Gunakan untuk format tanggal, waktu, dan durasi dengan format yang readable.

```typescript
import { formatTanggal, formatWaktuShalat, formatDurasi } from '~/utils'

formatTanggal(5)          // '05 Jan'
formatWaktuShalat('4:30') // '04:30'
formatDurasi('04:00', '08:30') // '4 jam 30 menit'
```

👉 **[Baca dokumentasi lengkap →](./formatters/README.md)**

---

### ✓ **[Validators](./validators/README.md)** - Validasi Data
Gunakan untuk validasi data sebelum digunakan dengan type-safe guards.

```typescript
import { isValidDoaItem, isValidLocation, isArrayNotEmpty } from '~/utils'

if (isValidDoaItem(doa)) {
  // TypeScript tahu 'doa' sudah DoaItem
  console.log(doa.nama)
}
```

👉 **[Baca dokumentasi lengkap →](./validators/README.md)**

---

### 🔑 **[Cache Keys](./cache/README.md)** - Generate Cache Keys
Gunakan untuk generate cache keys yang efisien dan konsisten untuk data caching.

```typescript
import { generateDoaCacheKey, generateJadwalShalatCacheKey } from '~/utils'

const cacheKey = generateDoaCacheKey({ grup: 'Pagi' })
// 'doa-list-grup:Pagi'

const scheduleKey = generateJadwalShalatCacheKey('Jawa Barat', 'Bogor', 1, 2026)
// 'jadwal-shalat-jawa-barat-bogor-1-2026'
```

👉 **[Baca dokumentasi lengkap →](./cache/README.md)**

---

### 🚨 **[API Error Handlers](./api/README.md)** - Handle API Errors
Gunakan untuk handle API errors dengan pattern konsisten dan user-friendly messages.

```typescript
import { getErrorMessage, isNetworkError, handleApiError } from '~/utils'

catch (error) {
  if (isNetworkError(error)) {
    showMessage('Periksa koneksi internet Anda')
  } else {
    showMessage(getErrorMessage(error))
  }
}
```

👉 **[Baca dokumentasi lengkap →](./api/README.md)**

---

## 📁 Struktur Direktori

```
utils/
├── 📁 formatters/
│   ├── README.md                  # Dokumentasi lengkap
│   └── dateFormatter.ts           # 7 fungsi
│
├── 📁 validators/
│   ├── README.md                  # Dokumentasi lengkap
│   └── dataValidator.ts           # 13 fungsi
│
├── 📁 cache/
│   ├── README.md                  # Dokumentasi lengkap
│   └── cacheKeyGenerator.ts       # 8 fungsi
│
├── 📁 api/
│   ├── README.md                  # Dokumentasi lengkap
│   └── errorHandler.ts            # 13 fungsi
│
├── index.ts                       # Central export (semua functions)
└── README.md                      # File ini
```

---

## 🚀 Memulai - 3 Cara Import

### Cara 1: Import dari Central Index (Recommended)

```typescript
import { 
  formatTanggal,
  isValidDoaItem,
  generateDoaCacheKey,
  getErrorMessage
} from '~/utils'
```

✅ **Keuntungan:**
- Semua helpers di satu tempat
- Autocomplete lebih baik di IDE
- Mudah di-refactor di kemudian hari

---

### Cara 2: Import dari Sub-Category

```typescript
import { formatTanggal } from '~/utils/formatters/dateFormatter'
import { isValidDoaItem } from '~/utils/validators/dataValidator'
```

✅ **Keuntungan:**
- Lebih eksplisit dari mana datangnya
- Lebih kecil bundle size

---

### Cara 3: Import Spesifik Saja

```typescript
import { formatTanggal, formatWaktuShalat } from '~/utils'
```

✅ **Keuntungan:**
- Hanya import yang dibutuhkan
- Tree-shake friendly

---

## 🎯 Memilih Helper yang Tepat

| Kebutuhan | Category | Function |
|-----------|----------|----------|
| Format tanggal jadi "05 Jan" | [Formatters](./formatters/README.md) | `formatTanggal()` |
| Format waktu jadi "04:30" | [Formatters](./formatters/README.md) | `formatWaktuShalat()` |
| Hitung selisih jam | [Formatters](./formatters/README.md) | `formatDurasi()` |
| Cek object adalah DoaItem | [Validators](./validators/README.md) | `isValidDoaItem()` |
| Cek string tidak kosong | [Validators](./validators/README.md) | `isNotEmpty()` |
| Cek array tidak kosong | [Validators](./validators/README.md) | `isArrayNotEmpty()` |
| Validasi location valid | [Validators](./validators/README.md) | `isValidLocation()` |
| Generate cache key untuk list | [Cache](./cache/README.md) | `generateDoaCacheKey()` |
| Generate cache key untuk detail | [Cache](./cache/README.md) | `generateDoaDetailCacheKey()` |
| Generate cache key jadwal shalat | [Cache](./cache/README.md) | `generateJadwalShalatCacheKey()` |
| Parse error jadi message | [API](./api/README.md) | `getErrorMessage()` |
| Cek error adalah network error | [API](./api/README.md) | `isNetworkError()` |
| Cek error adalah timeout | [API](./api/README.md) | `isTimeoutError()` |

---

## ✅ Status: All Functions Ready

Total **43 utility functions** siap digunakan:
- ✅ 7 Formatters - Format tanggal & waktu
- ✅ 13 Validators - Validasi data dengan type-safe
- ✅ 8 Cache Generators - Generate cache keys efisien
- ✅ 13 Error Handlers - Handle API errors konsisten

Semua dengan:
- 📚 Dokumentasi lengkap per-function
- 💡 Contoh penggunaan realistis
- 🎯 Clear use cases
- ⚙️ Type-safe implementation

---

## 🛠️ Menambah Helper Baru?

Panduan lengkap untuk contributor baru:

**👉 [Baca CONTRIBUTING_GUIDE.md](../CONTRIBUTING_GUIDE.md)**

Quick checklist:
- [ ] Tentukan kategori yang tepat
- [ ] Tulis JSDoc lengkap dengan example
- [ ] Tambah export di `utils/index.ts`
- [ ] Update category README.md
- [ ] Test dengan berbagai input
- [ ] Follow naming convention

---

## 💡 Tips untuk Pemula

1. **Baca dokumentasi yang sesuai kebutuhan** - Setiap category README punya contoh lengkap
2. **Gunakan type guards** - Manfaatkan TypeScript untuk type safety
3. **Combine validators** - Sering kali perlu kombinasi beberapa validator
4. **Standardize error handling** - Gunakan error handlers yang disediakan, jangan manual parse
5. **Cache key consistency** - Selalu gunakan generator untuk cache keys, jangan hardcode

---

## ❓ FAQ

**Q: Apa bedanya dengan composables?**
- **Utils** = Pure, reusable logic tanpa side effects
- **Composables** = Vue-specific, bisa punya reactive state

**Q: Kapan pakai utils vs helper manual di component?**
- Jika dipakai 2+ tempat → utils
- Jika hanya 1 component → boleh inline

**Q: Ada test untuk utils?**
- Untuk sekarang documentation + JSDoc example sudah cukup
- Jika perlu, buat `*.test.ts` file

---

## 🔗 Related Documents

- **[CONTRIBUTING_GUIDE.md](../CONTRIBUTING_GUIDE.md)** - Panduan menambah helper baru
- **[.github/copilot-instructions.md](../.github/copilot-instructions.md)** - Project overview

---

## 📞 Pertanyaan?

Buat issue atau diskusi di repository! Happy coding! 🚀

## 🚀 Adding New Utilities

### Steps untuk menambah utility function baru:

1. **Tentukan kategori** - Pilih direktori yang sesuai
2. **Create function dengan JSDoc** - Add proper documentation
3. **Export dari sub-module** - Di file utama kategori tersebut
4. **Export dari index.ts** - Tambahkan ke central export
5. **Add examples di README** - Dokumentasikan usage

### Contoh: Menambah formatter baru

```typescript
// utils/formatters/dateFormatter.ts

/**
 * Format tanggal ke format Indonesia
 * @param tanggal - Date object
 * @returns Format: "29 Januari 2026"
 */
export function formatTanggalIndonesia(tanggal: Date): string {
  const bulanIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  return `${tanggal.getDate()} ${bulanIndo[tanggal.getMonth()]} ${tanggal.getFullYear()}`
}
```

```typescript
// utils/index.ts - Add export
export {
  getNamaHari,
  formatTanggal,
  formatWaktuShalat,
  formatTanggalIndonesia, // ✅ Add here
  getBulanSekarang,
  getTahunSekarang,
  getTanggalHariIni,
  formatDurasi
} from './formatters/dateFormatter'
```

---

## 📦 Dependencies

Utilities menggunakan:
- **Vue 3 Composition API** - Import jika diperlukan untuk reactive utilities
- **Nuxt 3** - `useFetch` di composables
- **TypeScript** - Strong typing

Tidak ada external dependencies!

---

## 🔗 Related Files

- **Code Audit Report**: [CODE_AUDIT_REPORT.md](../CODE_AUDIT_REPORT.md)
- **Composables**: [composables/](../composables/)
- **Stores**: [stores/](../stores/)
- **Types**: [types/](../types/)

---

## ✅ Checklist untuk Using Utils

- [ ] Import utilities dari `~/utils` index
- [ ] Use appropriate helper untuk setiap operasi
- [ ] Validate data sebelum digunakan
- [ ] Handle errors dengan standardized pattern
- [ ] Follow naming conventions
- [ ] Add JSDoc untuk new functions
- [ ] Test functions sebelum merge

---

**Last Updated:** 2024
**Maintained by:** iMuslim Development Team
