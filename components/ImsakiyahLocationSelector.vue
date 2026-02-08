<script setup lang="ts">
import { useImsakiyahStore } from '~/stores/imsakiyahStore'

const store = useImsakiyahStore()

// Watch for provinsi changes to fetch cities
watch(() => store.selectedProvinsi, (newVal) => {
    if (newVal) {
        store.fetchCities(newVal)
    }
})

// Watch for kota changes to fetch schedule
watch(() => store.selectedKota, (newVal) => {
    if (newVal && store.selectedProvinsi) {
        store.fetchSchedule(store.selectedProvinsi, newVal)
    }
})

// Load provinces on mount
onMounted(() => {
    if (store.provinces.length === 0) {
        store.fetchProvinces()
    }
})
</script>

<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <!-- Provinsi Selector -->
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-white/80">Pilih Provinsi</label>
      <select
        v-model="store.selectedProvinsi"
        :disabled="store.loadingProvinces"
        class="w-full px-4 py-3 rounded-xl bg-[#1e293b]/60 border border-white/10 text-white/90
               backdrop-blur-xl transition-all duration-300
               hover:border-white/20 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20
               disabled:opacity-50 disabled:cursor-not-allowed
               placeholder:text-gray-500"
      >
        <option value="">{{ store.loadingProvinces ? 'Memuat...' : 'Pilih Provinsi' }}</option>
        <option v-for="prov in store.provinces" :key="prov" :value="prov">
          {{ prov }}
        </option>
      </select>
      <p v-if="store.errorProvinses" class="text-xs text-red-400 mt-1">{{ store.errorProvinses }}</p>
    </div>

    <!-- Kota Selector -->
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-white/80">Pilih Kabupaten/Kota</label>
      <select
        v-model="store.selectedKota"
        :disabled="!store.selectedProvinsi || store.loadingCities"
        class="w-full px-4 py-3 rounded-xl bg-[#1e293b]/60 border border-white/10 text-white/90
               backdrop-blur-xl transition-all duration-300
               hover:border-white/20 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20
               disabled:opacity-50 disabled:cursor-not-allowed
               placeholder:text-gray-500"
      >
        <option value="">{{ store.loadingCities ? 'Memuat...' : 'Pilih Kota' }}</option>
        <option v-for="city in store.cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <p v-if="store.errorCities" class="text-xs text-red-400 mt-1">{{ store.errorCities }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="store.loadingSchedule" class="flex flex-col items-center justify-center py-12 space-y-3">
      <div class="w-10 h-10 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
      <p class="text-gray-400 animate-pulse">Memuat jadwal imsakiyah...</p>
    </div>

    <!-- Error State -->
    <div v-if="store.errorSchedule && !store.loadingSchedule" class="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
      <p class="text-red-300 text-sm">{{ store.errorSchedule }}</p>
    </div>
  </div>
</template>
