<script setup lang="ts">
import { useJadwalShalatStore } from '~/stores/jadwalShalatStore';
import { watch, onMounted } from 'vue';

const store = useJadwalShalatStore();

// Watch for provinsi changes
watch(
  () => store.selectedProvinsi,
  async (newVal) => {
    console.log('👁️ Provinsi changed:', newVal);
    if (newVal) {
      await store.fetchCities(newVal);
    }
  }
);

// Watch for kabkota changes
watch(
  () => store.selectedKabKota,
  async (newVal) => {
    console.log('👁️ Kabkota changed:', newVal);
    if (newVal && store.selectedProvinsi) {
      await store.fetchSchedule(store.selectedProvinsi, newVal, store.selectedBulan, store.selectedTahun);
    }
  }
);

// Watch for bulan/tahun changes
watch(
  () => ({ b: store.selectedBulan, t: store.selectedTahun }),
  async (val) => {
    console.log('👁️ Bulan/Tahun changed');
    if (store.selectedProvinsi && store.selectedKabKota) {
      await store.fetchSchedule(store.selectedProvinsi, store.selectedKabKota, val.b, val.t);
    }
  },
  { deep: true }
);

// Initial Fetch
onMounted(async () => {
  await store.fetchProvinces();
});

useHead({
  title: 'Jadwal Shalat Harian 2026 - iMuslim',
  meta: [
    { name: 'description', content: 'Cek jadwal waktu sholat harian untuk seluruh wilayah Indonesia. Pilih provinsi dan kabupaten/kota untuk melihat jadwal lengkap.' }
  ]
});
</script>

<template>
  <div class="min-h-[85vh] flex flex-col items-center justify-start pb-24 px-4 sm:px-6">
    
    <!-- Hero Section -->
    <div class="text-center max-w-3xl mx-auto py-6 md:py-10 mb-8 relative z-10 w-full">
      <div class="flex items-center justify-center gap-3 sm:gap-4 mb-4">
        <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg transform rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-sm">
          Jadwal Shalat Hari Ini
        </h1>
      </div>

      <!-- Stats Badges -->
      <div class="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        <span class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs sm:text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
          517 Kab/Kota
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-200 text-xs sm:text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-teal-400"></span>
          34 Provinsi
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs sm:text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-blue-400"></span>
          2026
        </span>
      </div>

      <p class="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto px-4">
        Lihat jadwal shalat harian untuk wilayah Anda. Pilih provinsi, kabupaten/kota, dan bulan untuk melihat jadwal lengkap.
      </p>
    </div>

    <!-- Dual Card Layout Container (Selector) -->
    <div class="w-full max-w-5xl relative z-20 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

      <!-- Card: Pilih Provinsi -->
      <div class="glass-btn group relative rounded-[2rem] border border-cyan-500/20 bg-[#1e293b]/40 backdrop-blur-xl p-6 sm:p-8 hover:bg-[#1e293b]/60 hover:border-cyan-500/50 transition-all duration-300 shadow-xl shadow-cyan-900/5 overflow-hidden">
        <!-- Subtle Gradient Shine on Hover -->
        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <!-- Header Card -->
        <div class="flex items-start gap-4 mb-6 relative z-10">
          <div class="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-cyan-50 transition-colors">Pilih Provinsi</h3>
            <p class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Pilih provinsi tempat tinggal Anda</p>
          </div>
        </div>

        <!-- Input Selection -->
        <div class="relative z-10">
          <select v-model="store.selectedProvinsi" class="w-full h-14 bg-black/20 border border-white/10 text-gray-200 text-sm font-medium rounded-2xl px-5 outline-none appearance-none 
                           focus:bg-black/30 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30
                           hover:bg-black/30 hover:border-white/20 transition-all cursor-pointer shadow-inner disabled:opacity-50" :disabled="store.loading">
            <option value="" disabled selected>-- Pilih Provinsi --</option>
            <option v-for="prov in store.provinsiList" :key="prov" :value="prov">{{ prov }}</option>
          </select>
          <!-- Chevron -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <svg v-if="store.loading" class="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card: Pilih Kabupaten/Kota -->
      <div class="glass-btn group relative rounded-[2rem] border border-teal-500/20 bg-[#1e293b]/40 backdrop-blur-xl p-6 sm:p-8 hover:bg-[#1e293b]/60 hover:border-teal-500/50 transition-all duration-300 shadow-xl shadow-teal-900/5 overflow-hidden">
        <!-- Subtle Gradient Shine on Hover -->
        <div class="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <!-- Header Card -->
        <div class="flex items-start gap-4 mb-6 relative z-10">
          <div class="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/10 group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-teal-50 transition-colors">Pilih Kabupaten/Kota</h3>
            <p class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Pilih kabupaten atau kota</p>
          </div>
        </div>

        <!-- Input Selection -->
        <div class="relative z-10">
          <select v-model="store.selectedKabKota" class="w-full h-14 bg-black/20 border border-white/10 text-gray-200 text-sm font-medium rounded-2xl px-5 outline-none appearance-none 
                           focus:bg-black/30 focus:border-teal-500/30 focus:ring-1 focus:ring-teal-500/30
                           hover:bg-black/30 hover:border-white/20 transition-all cursor-pointer shadow-inner disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!store.selectedProvinsi || store.loading">
            <option value="" disabled selected>-- Pilih Kabupaten/Kota --</option>
            <option v-for="kota in store.kabkotaList" :key="kota" :value="kota">{{ kota }}</option>
          </select>
          <!-- Chevron -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <svg v-if="store.loading" class="animate-spin h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Card: Pilih Bulan -->
      <div class="glass-btn group relative rounded-[2rem] border border-blue-500/20 bg-[#1e293b]/40 backdrop-blur-xl p-6 sm:p-8 hover:bg-[#1e293b]/60 hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-blue-900/5 overflow-hidden">
        <!-- Subtle Gradient Shine on Hover -->
        <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <!-- Header Card -->
        <div class="flex items-start gap-4 mb-6 relative z-10">
          <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-blue-50 transition-colors">Pilih Bulan</h3>
            <p class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Pilih bulan yang ingin dilihat</p>
          </div>
        </div>

        <!-- Input Selection -->
        <div class="relative z-10">
          <select v-model.number="store.selectedBulan" class="w-full h-14 bg-black/20 border border-white/10 text-gray-200 text-sm font-medium rounded-2xl px-5 outline-none appearance-none 
                           focus:bg-black/30 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30
                           hover:bg-black/30 hover:border-white/20 transition-all cursor-pointer shadow-inner">
            <option v-for="(bulan, index) in ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']" :key="index" :value="index + 1">
              {{ bulan }}
            </option>
          </select>
          <!-- Chevron -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

    </div>

    <!-- START: Result Table Section -->
    <div v-if="store.selectedKabKota" class="w-full max-w-5xl relative z-10 mx-auto animate-[fadeIn_0.5s_ease-out]">
      
      <!-- Header Info Card (Unified Glass Panel) -->
      <div class="glass-noise rounded-[2rem] p-6 sm:p-8 mb-8 bg-[#1e293b]/40 border border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-2xl shadow-xl shadow-cyan-900/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group transition-all duration-300">
        
        <!-- Ambient Glow -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative z-10">
          <div class="flex items-center gap-2.5 text-cyan-400/90 mb-3">
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/10 shadow-[0_0_10px_rgba(34,211,238,0.15)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </span>
            <span class="text-xs font-bold tracking-[0.15em] uppercase opacity-90 text-cyan-200">Jadwal Shalat</span>
          </div>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-sm">{{ store.scheduleData?.kabkota || 'Pilih Lokasi' }}</h2>
          <div class="flex items-center gap-3 text-sm font-medium text-gray-400">
            <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              {{ store.scheduleData?.provinsi || 'Provinsi' }}
            </span>
            <span class="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>{{ store.scheduleData?.bulan_nama || 'Bulan' }} {{ store.scheduleData?.tahun || '2026' }}</span>
          </div>
        </div>
      </div>
    
      <!-- Glass Table Container (iOS Style) -->
      <div class="glass-noise rounded-[2.5rem] overflow-hidden bg-[#1e293b]/40 border border-white/5 backdrop-blur-3xl shadow-2xl relative ring-1 ring-white/5">
        
        <!-- Table Wrapper for Scroll -->
        <div class="overflow-x-auto">
          <table class="w-full text-center border-collapse">
            
            <!-- Sticky Header with Blur -->
            <thead>
              <tr class="bg-[#0f172a]/80 backdrop-blur-md text-gray-400 text-xs sm:text-xs uppercase tracking-widest font-bold border-b border-white/5 sticky top-0 z-10">
                <th class="p-6 text-left pl-8 first:rounded-tl-[2rem]">Tanggal</th>
                <th class="p-6 text-cyan-400">Imsak</th>
                <th class="p-6">Subuh</th>
                <th class="p-6">Terbit</th>
                <th class="p-6">Dhuha</th>
                <th class="p-6">Dzuhur</th>
                <th class="p-6">Ashar</th>
                <th class="p-6 text-cyan-400">Maghrib</th>
                <th class="p-6 last:rounded-tr-[2rem]">Isya</th>
              </tr>
            </thead>
            
            <!-- Body with Row Hover Glow -->
            <tbody class="text-gray-300 text-sm divide-y divide-white/[0.03]">
              <tr v-for="(day, index) in store.jadwalShalat" :key="index" class="group hover:bg-cyan-500/[0.02] transition-all duration-300">
                <!-- Tanggal Column -->
                <td class="p-5 text-left pl-8 font-semibold text-white group-hover:text-cyan-100 transition-colors">
                  <span class="bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">{{ day.tanggal }}</span>
                </td>
                
                <!-- Highlighted Time Columns -->
                <td class="p-5">
                  <span class="block px-3 py-1.5 rounded-lg font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all">
                    {{ day.imsak }}
                  </span>
                </td>
                
                <!-- Standard Time Columns -->
                <td class="p-5 font-medium">{{ day.subuh }}</td>
                <td class="p-5 text-gray-500">{{ day.terbit }}</td>
                <td class="p-5 text-gray-500">{{ day.dhuha }}</td>
                <td class="p-5 font-medium">{{ day.dzuhur }}</td>
                <td class="p-5 font-medium">{{ day.ashar }}</td>
                
                <!-- Maghrib Column (Highlight) -->
                <td class="p-5">
                  <span class="block px-3 py-1.5 rounded-lg font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all">
                    {{ day.maghrib }}
                  </span>
                </td>
                
                <td class="p-5 font-medium">{{ day.isya }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Info -->
        <div class="p-6 bg-slate-900/40 border-t border-white/5 text-center text-xs text-gray-500 backdrop-blur-sm">
          Sumber data: <a href="https://equran.id/" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors font-medium">Equran.id API</a>
        </div>
      </div>
    </div>
    <!-- END: Result Table Section -->

    <!-- Empty State Placeholder (Default View) -->
    <div v-else class="w-full max-w-5xl relative z-10 mx-auto px-4 mt-8">
      <div class="rounded-[2.5rem] py-20 px-6 flex flex-col items-center justify-center text-center border border-dashed border-white/5 bg-white/[0.01]">
        <div class="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 animate-pulse shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </div>
        <h3 class="text-white font-semibold text-lg mb-2">Pilih Lokasi Anda</h3>
        <p class="text-gray-500 text-sm font-medium max-w-sm">
          Silakan pilih provinsi dan kabupaten/kota terlebih dahulu untuk menampilkan jadwal shalat harian.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Ensure dropdowns look good on all platforms */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select option {
  background-color: #0f172a;
  color: white;
  padding: 12px;
}

/* Optional: Add custom fade in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
