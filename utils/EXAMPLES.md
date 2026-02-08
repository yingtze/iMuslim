# 🎓 Examples - Praktik Penggunaan Helper Functions

Contoh-contoh praktis penggunaan helper functions untuk berbagai kasus use case di aplikasi iMuslim.

## 📚 Daftar Contoh

### [1. Format Tanggal & Waktu](#1-format-tanggal--waktu)
### [2. Validasi Data Sebelum Render](#2-validasi-data-sebelum-render)
### [3. Cache Keys di Composables](#3-cache-keys-di-composables)
### [4. Error Handling di API Call](#4-error-handling-di-api-call)
### [5. Kombinasi Multiple Validators](#5-kombinasi-multiple-validators)
### [6. Share dengan Validasi](#6-share-dengan-validasi)
### [7. Build Jadwal Shalat UI](#7-build-jadwal-shalat-ui)

---

## 1. Format Tanggal & Waktu

### Kasus: Menampilkan Header dengan Tanggal Hari Ini

```typescript
// composables/useScheduleHeader.ts
import { formatTanggal, getNamaHari, getTanggalHariIni } from '~/utils'

export function useScheduleHeader() {
  const today = getTanggalHariIni()
  const formattedDate = formatTanggal(today)
  
  return {
    today,
    formattedDate  // e.g., '29 Jan'
  }
}
```

```vue
<!-- components/ScheduleHeader.vue -->
<script setup lang="ts">
import { useScheduleHeader } from '~/composables/useScheduleHeader'

const { formattedDate } = useScheduleHeader()
</script>

<template>
  <div class="header">
    <h1>Jadwal Shalat Hari Ini</h1>
    <p class="date">{{ formattedDate }}</p>
  </div>
</template>
```

---

### Kasus: Format Waktu Shalat dari API

```typescript
// composables/useJadwalShalat.ts
import { formatWaktuShalat } from '~/utils'

export function useJadwalShalat() {
  const data = ref(null)
  
  const formattedData = computed(() => {
    if (!data.value) return null
    
    // API return format: { subuh: '4:50', dzuhur: '12:20', ... }
    return {
      subuh: formatWaktuShalat(data.value.subuh),      // '04:50'
      dzuhur: formatWaktuShalat(data.value.dzuhur),    // '12:20'
      ashar: formatWaktuShalat(data.value.ashar),      // '15:30'
      maghrib: formatWaktuShalat(data.value.maghrib),  // '17:50'
      isya: formatWaktuShalat(data.value.isya)         // '19:15'
    }
  })
  
  return { data, formattedData }
}
```

---

### Kasus: Hitung Durasi Sahur

```typescript
// components/SahurInfo.vue
<script setup lang="ts">
import { formatDurasi, formatWaktuShalat } from '~/utils'

const props = defineProps<{
  imsak: string
  subuh: string
}>()

// Hitung durasi sahur
const durasi = computed(() => {
  const waktuImsakFormatted = formatWaktuShalat(props.imsak)
  const waktuSubuhFormatted = formatWaktuShalat(props.subuh)
  
  return formatDurasi(waktuImsakFormatted, waktuSubuhFormatted)
  // e.g., '4 jam 30 menit'
})
</script>

<template>
  <div class="sahur-info">
    <p>Sahur sampai: {{ formatWaktuShalat(imsak) }}</p>
    <p>Durasi sahur: {{ durasi }}</p>
  </div>
</template>
```

---

## 2. Validasi Data Sebelum Render

### Kasus: Validasi DoaItem Sebelum Render

```typescript
// components/DoaCard.vue
<script setup lang="ts">
import { isValidDoaItem } from '~/utils'
import type { DoaItem } from '~/types/doa'

const props = defineProps<{
  doa: unknown  // Bisa dari props atau API
}>()

// Guard dengan type guard validator
const isValidDoa = computed(() => isValidDoaItem(props.doa))
</script>

<template>
  <!-- Jika tidak valid, tampilkan error -->
  <div v-if="!isValidDoa" class="error">
    Data doa tidak valid
  </div>

  <!-- Jika valid, render dengan type-safe -->
  <div v-else class="doa-card">
    <h2>{{ doa.nama }}</h2>
    <p class="arabic">{{ doa.ar }}</p>
    <p class="transliteration">{{ doa.tr }}</p>
    <p class="meaning">{{ doa.idn }}</p>
  </div>
</template>
```

---

### Kasus: Validasi Array Sebelum Map

```typescript
// components/DoaList.vue
<script setup lang="ts">
import { isArrayNotEmpty, isValidDoaItem } from '~/utils'

const props = defineProps<{
  doas: unknown
}>()

const validDoas = computed(() => {
  if (!isArrayNotEmpty(props.doas)) return []
  
  // Filter hanya yang valid
  return props.doas.filter(isValidDoaItem)
})
</script>

<template>
  <!-- Tampilkan message jika kosong -->
  <p v-if="validDoas.length === 0" class="empty">
    Tidak ada doa tersedia
  </p>

  <!-- Render doa yang valid -->
  <div v-else class="doa-list">
    <DoaCard 
      v-for="doa in validDoas" 
      :key="doa.id" 
      :doa="doa" 
    />
  </div>
</template>
```

---

### Kasus: Validasi Location Sebelum Fetch

```typescript
// stores/jadwalShalatStore.ts
import { isValidLocation } from '~/utils'

export const useJadwalShalatStore = defineStore('jadwalShalat', () => {
  const selectedProvinsi = ref('')
  const selectedKota = ref('')
  
  const canFetchSchedule = computed(() => {
    return isValidLocation(selectedProvinsi.value, selectedKota.value)
  })
  
  async function fetchSchedule() {
    if (!canFetchSchedule.value) {
      error.value = 'Pilih provinsi dan kota terlebih dahulu'
      return
    }
    
    // Proceed dengan fetch
    await loadSchedule()
  }
  
  return {
    selectedProvinsi,
    selectedKota,
    canFetchSchedule,
    fetchSchedule
  }
})
```

---

## 3. Cache Keys di Composables

### Kasus: Cache Doa List dengan Filter

```typescript
// composables/useDoa.ts
import { generateDoaCacheKey } from '~/utils'
import type { DoaFilter } from '~/types/doa'

export function useDoa(filter?: DoaFilter) {
  // Generate cache key yang akan berubah saat filter berubah
  const cacheKey = computed(() => generateDoaCacheKey(filter))
  
  const { data: doaList, pending, error } = useFetch(
    '/api/doa',
    {
      key: cacheKey,  // Cache key yang unique per filter combination
      query: filter,
      staleMaxAge: 3600  // Cache 1 jam
    }
  )
  
  return { doaList, pending, error }
}
```

**Usage di component:**

```vue
<!-- pages/doa/index.vue -->
<script setup lang="ts">
import { useDoa } from '~/composables/useDoa'

const selectedGrup = ref('Pagi')
const selectedTag = ref('puasa')

// Cache akan berbeda untuk setiap kombinasi filter
const { doaList } = useDoa(computed(() => ({
  grup: selectedGrup.value,
  tag: selectedTag.value
})))

// Saat user ubah filter, cache key berubah
// → Request baru ke API dengan parameter baru
</script>
```

---

### Kasus: Cache Doa Detail

```typescript
// composables/useSingleDoa.ts
import { generateDoaDetailCacheKey } from '~/utils'

export function useSingleDoa(id: string | number) {
  const cacheKey = generateDoaDetailCacheKey(id)
  
  const { data: doa } = useFetch(
    `/api/doa/${id}`,
    {
      key: cacheKey,
      staleMaxAge: 86400  // Cache 24 jam
    }
  )
  
  return { doa }
}
```

---

### Kasus: Cache Jadwal Shalat per Location & Month

```typescript
// composables/useJadwalShalat.ts
import { generateJadwalShalatCacheKey, getBulanSekarang, getTahunSekarang } from '~/utils'

export function useJadwalShalat(provinsi: string, kabkota: string) {
  const bulan = getBulanSekarang()
  const tahun = getTahunSekarang()
  
  // Cache key yang unique untuk setiap kombinasi location + month
  const cacheKey = generateJadwalShalatCacheKey(provinsi, kabkota, bulan, tahun)
  
  const { data: schedules } = useFetch(
    '/api/jadwal-shalat',
    {
      key: cacheKey,
      query: { provinsi, kabkota, bulan, tahun },
      staleMaxAge: 86400  // Cache 1 hari
    }
  )
  
  return { schedules }
}
```

---

## 4. Error Handling di API Call

### Kasus: Composable dengan Error Handling

```typescript
// composables/useProvinces.ts
import { 
  getErrorMessage, 
  isNetworkError, 
  isTimeoutError,
  logError 
} from '~/utils'

export function useProvinces() {
  const provinces = ref([])
  const error = ref<string | null>(null)
  const loading = ref(false)
  
  async function fetchProvinces() {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/provinces')
      provinces.value = response.data
    } catch (err) {
      // Determine error type untuk appropriate messaging
      if (isNetworkError(err)) {
        error.value = 'Periksa koneksi internet Anda'
      } else if (isTimeoutError(err)) {
        error.value = 'Request timeout, silakan coba lagi'
      } else {
        error.value = getErrorMessage(err, 'Gagal fetch provinsi')
      }
      
      // Log error untuk debugging
      logError(err, 'useProvinces.fetchProvinces')
    } finally {
      loading.value = false
    }
  }
  
  return { provinces, error, loading, fetchProvinces }
}
```

**Usage di component:**

```vue
<!-- components/ProvinceSelector.vue -->
<script setup lang="ts">
import { useProvinces } from '~/composables/useProvinces'

const { provinces, error, loading, fetchProvinces } = useProvinces()

onMounted(() => {
  fetchProvinces()
})
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="spinner">Loading...</div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="fetchProvinces">Coba Lagi</button>
    </div>
    
    <!-- Success state -->
    <select v-else>
      <option v-for="p in provinces" :key="p.id" :value="p.id">
        {{ p.name }}
      </option>
    </select>
  </div>
</template>
```

---

## 5. Kombinasi Multiple Validators

### Kasus: Validasi Complex di Store

```typescript
// stores/doaStore.ts
import { 
  isNotEmpty, 
  isValidTahun, 
  isValidBulan,
  isValidProvinsi,
  isValidKabKota
} from '~/utils'

export const useFilterStore = defineStore('filter', () => {
  const searchText = ref('')
  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const selectedProvinsi = ref('')
  const selectedKota = ref('')
  
  // Computed property untuk check apakah semua filter valid
  const isFilterValid = computed(() => {
    return (
      (!searchText.value || isNotEmpty(searchText.value)) &&
      isValidTahun(selectedYear.value) &&
      isValidBulan(selectedMonth.value) &&
      isValidProvinsi(selectedProvinsi.value) &&
      isValidKabKota(selectedKota.value)
    )
  })
  
  // Hanya allow fetch jika filter valid
  const canFetch = computed(() => isFilterValid.value)
  
  return {
    searchText,
    selectedYear,
    selectedMonth,
    selectedProvinsi,
    selectedKota,
    isFilterValid,
    canFetch
  }
})
```

---

## 6. Share dengan Validasi

### Kasus: Share Doa dengan Validation & Error Handling

```typescript
// composables/useShareDoa.ts
import { isValidForShare, getUserFriendlyMessage } from '~/utils'

export function useShareDoa() {
  const shareMessage = ref('')
  const shareError = ref('')
  
  async function shareDoa(doa: unknown) {
    shareError.value = ''
    shareMessage.value = ''
    
    // Validasi doa punya data yang cukup untuk share
    if (!isValidForShare(doa)) {
      shareError.value = 'Data doa tidak lengkap untuk dibagikan'
      return
    }
    
    try {
      if (navigator.share) {
        // Use native share
        await navigator.share({
          title: doa.nama,
          text: `${doa.nama}\n\n${doa.idn}`,
          url: window.location.href
        })
        shareMessage.value = 'Doa berhasil dibagikan'
      } else {
        // Fallback: copy ke clipboard
        await navigator.clipboard.writeText(`${doa.nama}\n\n${doa.idn}`)
        shareMessage.value = 'Doa disalin ke clipboard'
      }
    } catch (error) {
      // Handle share error dengan user-friendly message
      shareError.value = getUserFriendlyMessage(error)
    }
  }
  
  return { shareDoa, shareMessage, shareError }
}
```

---

## 7. Build Jadwal Shalat UI

### Kasus: Menampilkan Jadwal Shalat Lengkap

```typescript
// components/JadwalShalatDisplay.vue
<script setup lang="ts">
import { 
  isValidJadwalShalatItem,
  formatWaktuShalat,
  formatTanggal,
  isArrayNotEmpty
} from '~/utils'
import type { JadwalShalatItem } from '~/types/jadwal-shalat'

const props = defineProps<{
  schedules: unknown
}>()

// Validasi dan format jadwal
const formattedSchedules = computed(() => {
  if (!isArrayNotEmpty(props.schedules)) return []
  
  return props.schedules
    .filter(isValidJadwalShalatItem)
    .map(jadwal => ({
      tanggal: formatTanggal(jadwal.tanggal),
      subuh: formatWaktuShalat(jadwal.subuh),
      dzuhur: formatWaktuShalat(jadwal.dzuhur),
      ashar: formatWaktuShalat(jadwal.ashar),
      maghrib: formatWaktuShalat(jadwal.maghrib),
      isya: formatWaktuShalat(jadwal.isya),
      original: jadwal
    }))
})
</script>

<template>
  <div v-if="formattedSchedules.length === 0" class="empty">
    Tidak ada jadwal tersedia
  </div>

  <table v-else class="schedule-table">
    <thead>
      <tr>
        <th>Tanggal</th>
        <th>Subuh</th>
        <th>Dzuhur</th>
        <th>Ashar</th>
        <th>Maghrib</th>
        <th>Isya</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in formattedSchedules" :key="idx">
        <td>{{ item.tanggal }}</td>
        <td>{{ item.subuh }}</td>
        <td>{{ item.dzuhur }}</td>
        <td>{{ item.ashar }}</td>
        <td>{{ item.maghrib }}</td>
        <td>{{ item.isya }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

---

## 💡 Kesimpulan

Gunakan helper functions untuk:
- ✅ **Format data** sebelum tampilkan ke UI
- ✅ **Validasi data** sebelum process/render
- ✅ **Generate cache keys** yang konsisten
- ✅ **Handle errors** dengan pattern yang sama

Ini membuat kode:
- 📖 Lebih mudah dibaca
- 🔄 Lebih reusable
- 🐛 Lebih mudah di-debug
- 🤝 Lebih mudah untuk kolaborasi

---

## 🔗 Lihat Juga

- [utils/formatters/README.md](./utils/formatters/README.md)
- [utils/validators/README.md](./utils/validators/README.md)
- [utils/cache/README.md](./utils/cache/README.md)
- [utils/api/README.md](./utils/api/README.md)
- [CONTRIBUTING_GUIDE.md](./CONTRIBUTING_GUIDE.md)
