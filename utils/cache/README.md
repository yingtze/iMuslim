# 🔑 Cache Key Generators - Efficient Cache Management

Helper functions untuk generate cache keys yang efisien dan konsisten. Ini memastikan caching di seluruh aplikasi menggunakan pattern yang sama.

## 📂 File

- [cacheKeyGenerator.ts](./cacheKeyGenerator.ts) - Semua cache key generator functions

## 🎯 Mengapa Cache Keys Penting?

Cache keys digunakan oleh Nuxt `useFetch` untuk:
- ✅ **Avoid duplicate requests** - Request yang sama tidak akan di-fetch ulang
- ✅ **Bust cache** - Ganti cache key untuk force fresh data
- ✅ **Organize data** - Mudah menemukan dan manage cache data

## 🔑 Fungsi-Fungsi

### 1. `generateDoaCacheKey(params?: DoaFilter): string`

Generate cache key untuk doa list dengan optional filters.

```typescript
import { generateDoaCacheKey } from '~/utils'

// Tanpa filter
generateDoaCacheKey()
// Returns: 'doa-list'

// Dengan filter grup
generateDoaCacheKey({ grup: 'Pagi' })
// Returns: 'doa-list-grup:Pagi'

// Dengan multiple filters
generateDoaCacheKey({ grup: 'Pagi', tag: 'puasa' })
// Returns: 'doa-list-grup:Pagi-tag:puasa'
```

**Kapan digunakan:**
- Di `useFetch` untuk fetch `/api/doa` list
- Invalidate cache saat user ubah filter
- Track request dengan parameter berbeda

**Format:** `doa-list[-grup:value][-tag:value]`

---

### 2. `generateDoaDetailCacheKey(id: string | number): string`

Generate cache key untuk single doa detail.

```typescript
import { generateDoaDetailCacheKey } from '~/utils'

generateDoaDetailCacheKey(1)
// Returns: 'doa-detail-1'

generateDoaDetailCacheKey('123')
// Returns: 'doa-detail-123'
```

**Kapan digunakan:**
- Di `useFetch` untuk fetch `/api/doa/{id}`
- Cached detail doa yang sudah di-buka user
- Each doa memiliki unique cache key

**Format:** `doa-detail-{id}`

---

### 3. `generateJadwalShalatCacheKey(provinsi, kabkota, bulan, tahun): string`

Generate cache key untuk jadwal shalat dengan location & time.

```typescript
import { generateJadwalShalatCacheKey } from '~/utils'

generateJadwalShalatCacheKey('Jawa Barat', 'Bogor', 1, 2026)
// Returns: 'jadwal-shalat-jawa-barat-bogor-1-2026'

generateJadwalShalatCacheKey('DKI Jakarta', 'Jakarta Timur', 12, 2026)
// Returns: 'jadwal-shalat-dki-jakarta-jakarta-timur-12-2026'
```

**Kapan digunakan:**
- Di `useJadwalShalat()` composable
- Fetch jadwal shalat untuk location & month tertentu
- Invalidate saat user ubah location atau bulan

**Format:** `jadwal-shalat-{provinsi-slug}-{kota-slug}-{bulan}-{tahun}`

**Catatan:** 
- Spaces di-replace dengan `-`
- Semua converted ke lowercase
- Unique untuk setiap kombinasi location & time

---

### 4. `generateImsakiyahCacheKey(provinsi, kabkota): string`

Generate cache key untuk imsakiyah (jadwal puasa) tanpa time component.

```typescript
import { generateImsakiyahCacheKey } from '~/utils'

generateImsakiyahCacheKey('Jawa Barat', 'Bogor')
// Returns: 'imsakiyah-jawa-barat-bogor'

generateImsakiyahCacheKey('DKI Jakarta', 'Jakarta Pusat')
// Returns: 'imsakiyah-dki-jakarta-jakarta-pusat'
```

**Kapan digunakan:**
- Di `useImsakiyah()` composable untuk fetch schedule
- Static cache (tidak tergantung bulan/tahun)
- Cached per location

**Format:** `imsakiyah-{provinsi-slug}-{kota-slug}`

---

### 5. `generateProvinceCacheKey(): string`

Generate cache key untuk list provinsi (static, tidak ada parameter).

```typescript
import { generateProvinceCacheKey } from '~/utils'

generateProvinceCacheKey()
// Returns: 'provinces-list'
```

**Kapan digunakan:**
- Di `useImsakiyah()` atau `useJadwalShalat()` untuk fetch provinces
- Static key karena data provinsi tidak berubah
- Cache selama session user

**Format:** `provinces-list`

---

### 6. `generateCitiesCacheKey(provinsi: string): string`

Generate cache key untuk list kota dalam provinsi tertentu.

```typescript
import { generateCitiesCacheKey } from '~/utils'

generateCitiesCacheKey('Jawa Barat')
// Returns: 'cities-jawa-barat'

generateCitiesCacheKey('DKI Jakarta')
// Returns: 'cities-dki-jakarta'
```

**Kapan digunakan:**
- Di `useImsakiyah()` atau `useJadwalShalat()` untuk fetch cities
- Unique key per provinsi
- Cache cities list selama user lihat halaman

**Format:** `cities-{provinsi-slug}`

---

### 7. `normalizeForCache(str: string): string`

Normalize string menjadi cache-safe format (lowercase, spaces → dash).

```typescript
import { normalizeForCache } from '~/utils'

normalizeForCache('Jawa Barat')
// Returns: 'jawa-barat'

normalizeForCache('DKI Jakarta')
// Returns: 'dki-jakarta'

normalizeForCache('Sulawesi Utara')
// Returns: 'sulawesi-utara'
```

**Kapan digunakan:**
- Utility untuk di-reuse dalam custom cache keys
- Normalize input sebelum pakai di cache key
- Ensure consistent format

---

### 8. `createCompositeCacheKey(keys: string[]): string`

Combine multiple key parts dengan separator.

```typescript
import { createCompositeCacheKey } from '~/utils'

createCompositeCacheKey(['doa', 'pagi', '2026'])
// Returns: 'doa-pagi-2026'

createCompositeCacheKey(['jadwal', 'bogor', 'januari'])
// Returns: 'jadwal-bogor-januari'
```

**Kapan digunakan:**
- Create custom cache keys dengan multiple components
- Combine dynamic parts secara programmatic
- Flexible key generation

---

## 💡 Cara Menggunakan di Composables

### Pattern: Dasar dengan `useFetch`

```typescript
import { useFetch } from 'nuxt'
import { generateDoaCacheKey } from '~/utils'

export function useDoa(params?: DoaFilter) {
  const cacheKey = generateDoaCacheKey(params)
  
  return useFetch('/api/doa', {
    key: cacheKey,  // Set cache key
    query: params,
    staleMaxAge: 3600  // 1 hour
  })
}
```

### Pattern: Watch + Invalidate Cache

```typescript
import { useFetch } from 'nuxt'
import { generateJadwalShalatCacheKey } from '~/utils'
import { watch } from 'vue'

export function useJadwalShalat(provinsi, kabkota, bulan, tahun) {
  const cacheKey = ref(generateJadwalShalatCacheKey(provinsi, kabkota, bulan, tahun))
  
  // Invalidate cache saat param berubah
  watch([provinsi, kabkota, bulan, tahun], () => {
    cacheKey.value = generateJadwalShalatCacheKey(provinsi, kabkota, bulan, tahun)
  })
  
  return useFetch('/api/jadwal-shalat', {
    key: cacheKey,
    // ...
  })
}
```

---

## 💡 Tips untuk Pemula

### Ingat: Cache Key = Identity

```typescript
// Key yang sama = Data yang di-cache akan di-reuse
const key1 = generateDoaCacheKey({ grup: 'Pagi' })
const key2 = generateDoaCacheKey({ grup: 'Pagi' })
// key1 === key2 → Cache akan di-reuse

// Key berbeda = Request baru
const key3 = generateDoaCacheKey({ grup: 'Sore' })
// key3 !== key1 → Request baru ke API
```

### Perhatikan: Slug Konsistensi

```typescript
// Input yang berbeda whitespace/case tetap generate key yang sama
generateJadwalShalatCacheKey('Jawa Barat', 'Bogor', 1, 2026)
// === generateJadwalShalatCacheKey('jawa barat', 'bogor', 1, 2026)
// Karena keduanya di-normalize → 'jawa-barat'
```

---

## 🔗 Lihat Juga

- [../formatters](../formatters) - Format tanggal & waktu
- [../validators](../validators) - Validasi data
- [../api](../api) - Handle API errors
- [../../CONTRIBUTING_GUIDE.md](../../CONTRIBUTING_GUIDE.md) - Panduan menambah cache generator baru
