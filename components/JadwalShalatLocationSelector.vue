<template>
  <div class="space-y-6">
    <!-- Location Selector -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Provinsi Dropdown -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-white/80">Provinsi</label>
        <select
          v-model="store.selectedProvinsi"
          @change="handleProvinsiChange"
          class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
          :disabled="store.loading.value"
        >
          <option value="" disabled>Pilih Provinsi</option>
          <option v-for="prov in store.provinsiList" :key="prov" :value="prov">
            {{ prov }}
          </option>
        </select>
      </div>

      <!-- Kabupaten/Kota Dropdown -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-white/80">Kabupaten/Kota</label>
        <select
          v-model="store.selectedKabKota"
          @change="handleKabKotaChange"
          :disabled="!store.selectedProvinsi || store.loading.value"
          class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>Pilih Kabupaten/Kota</option>
          <option v-for="kota in store.kabkotaList" :key="kota" :value="kota">
            {{ kota }}
          </option>
        </select>
      </div>
    </div>

    <!-- Bulan & Tahun Selector -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Bulan -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-white/80">Bulan</label>
        <select
          v-model.number="store.selectedBulan"
          @change="handleBulanChange"
          class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
        >
          <option v-for="(bulan, index) in bulanList" :key="index" :value="index + 1">
            {{ bulan }}
          </option>
        </select>
      </div>

      <!-- Tahun -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-white/80">Tahun</label>
        <select
          v-model.number="store.selectedTahun"
          @change="handleTahunChange"
          class="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
        >
          <option v-for="tahun in tahunList" :key="tahun" :value="tahun">
            {{ tahun }}
          </option>
        </select>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="store.error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
      {{ store.error }}
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200">
      Loading data...
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useJadwalShalatStore } from '~/stores/jadwalShalatStore';

const store = useJadwalShalatStore();

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const tahunList = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear + i - 2);
});

const handleProvinsiChange = async () => {
  store.setSelectedKabKota('');
  await store.fetchCities();
};

const handleKabKotaChange = async () => {
  await store.fetchSchedule();
};

const handleBulanChange = async () => {
  if (store.selectedProvinsi && store.selectedKabKota) {
    await store.fetchSchedule();
  }
};

const handleTahunChange = async () => {
  if (store.selectedProvinsi && store.selectedKabKota) {
    await store.fetchSchedule();
  }
};

onMounted(async () => {
  await store.fetchProvinces();
});
</script>
