<script setup lang="ts">
import { useImsakiyahStore } from '~/stores/imsakiyahStore'

const store = useImsakiyahStore()

// Watch for provinsi changes
watch(() => store.selectedProvinsi, (newVal) => {
    if (newVal) {
        store.fetchCities(newVal)
    }
})

// Watch for kota changes
watch(() => store.selectedKota, (newVal) => {
    if (newVal && store.selectedProvinsi) {
        store.fetchSchedule(store.selectedProvinsi, newVal)
    }
})

// Initial Fetch
onMounted(() => {
    store.fetchProvinces()
})

useHead({
  title: 'Jadwal Imsakiyah Ramadhan 1447 H - iMuslim',
  meta: [
    { name: 'description', content: 'Cek jadwal imsakiyah dan waktu sholat Ramadhan 1447 H / 2026 M seluruh Indonesia.' }
  ]
})
</script>

<template>
  <div class="min-h-[85vh] flex flex-col items-center justify-start pb-24 px-4 sm:px-6">
    
    <!-- Hero Section -->
    <div class="text-center max-w-3xl mx-auto py-6 md:py-10 mb-8 relative z-10 w-full">
      <div class="flex items-center justify-center gap-3 sm:gap-4 mb-4">
         <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 backdrop-blur-sm border border-teal-500/30 flex items-center justify-center shadow-lg shadow-teal-500/10 transform rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
         </div>
         <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-teal-100 to-emerald-100 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
            Jadwal Imsakiyah
         </h1>
      </div>

      <div class="flex items-center justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
        <span class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 text-amber-200 text-xs sm:text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Ramadhan 1447 H
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/10 to-teal-500/5 border border-teal-500/20 text-teal-200 text-xs sm:text-sm font-semibold">
          <span class="w-2 h-2 rounded-full bg-teal-400"></span>
          2026 M
        </span>
      </div>
      
      <p class="text-teal-100/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto px-4">
        Dapatkan jadwal imsakiyah dan waktu sholat yang akurat untuk seluruh wilayah Indonesia secara otomatis.
      </p>
    </div>

    <!-- Dual Card Layout Container (Selector) -->
    <!-- Added margin-bottom to separate from results -->
    <div class="w-full max-w-5xl relative z-20 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

        <!-- Card: Pilih Provinsi -->
        <div class="glass-btn group relative rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 hover:bg-[#1e293b]/70 hover:border-emerald-500/40 transition-all duration-300 shadow-xl shadow-emerald-900/10 overflow-hidden">
            <!-- Subtle Gradient Shine on Hover -->
            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <!-- Header Card -->
            <div class="flex items-start gap-3 mb-4 relative z-10">
                <div class="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-emerald-100 transition-colors">Pilih Provinsi</h3>
                    <p class="text-gray-400 text-sm group-hover:text-emerald-200/60 transition-colors">Tentukan provinsi domisili</p>
                </div>
            </div>

            <!-- Input Selection -->
            <div class="relative z-10">
                 <select v-model="store.selectedProvinsi" class="w-full h-11 bg-black/30 border border-emerald-500/10 text-gray-200 text-sm font-medium rounded-xl px-4 outline-none appearance-none 
                                  focus:bg-black/40 focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/30
                                  hover:bg-black/40 hover:border-emerald-500/20 transition-all cursor-pointer shadow-inner disabled:opacity-50" :disabled="store.loadingProvinces">
                        <option value="" disabled selected>-- Pilih Provinsi --</option>
                        <option v-for="prov in store.provinces" :key="prov" :value="prov">{{ prov }}</option>
                </select>
                <!-- Chevron -->
                <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                     <svg v-if="store.loadingProvinces" class="animate-spin h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     <svg v-else class="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Card: Pilih Kota -->
        <div class="glass-btn group relative rounded-2xl border border-teal-500/20 bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 hover:bg-[#1e293b]/70 hover:border-teal-500/40 transition-all duration-300 shadow-xl shadow-teal-900/10 overflow-hidden">
             <!-- Subtle Gradient Shine on Hover -->
             <div class="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <!-- Header Card -->
            <div class="flex items-start gap-3 mb-4 relative z-10">
                 <div class="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 text-teal-400 border border-teal-500/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                        <circle cx="12" cy="12" r="2.5" />
                    </svg>
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-teal-100 transition-colors">Pilih Kabupaten/Kota</h3>
                    <p class="text-gray-400 text-sm group-hover:text-teal-200/60 transition-colors">Tentukan kota/kabupaten</p>
                </div>
            </div>

            <!-- Input Selection -->
            <div class="relative z-10">
                 <select v-model="store.selectedKota" class="w-full h-11 bg-black/30 border border-teal-500/10 text-gray-200 text-sm font-medium rounded-xl px-4 outline-none appearance-none 
                                  focus:bg-black/40 focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/30
                                  hover:bg-black/40 hover:border-teal-500/20 transition-all cursor-pointer shadow-inner disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!store.selectedProvinsi || store.loadingCities">
                        <option value="" disabled selected>-- Pilih Kabupaten/Kota --</option>
                        <option v-for="kota in store.cities" :key="kota" :value="kota">{{ kota }}</option>
                </select>
                <!-- Chevron -->
                <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                     <svg v-if="store.loadingCities" class="animate-spin h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     <svg v-else class="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>

    </div>

    <!-- START: Result Table Section -->
    <div v-if="store.selectedKota" class="w-full max-w-5xl relative z-10 mx-auto animate-[fadeIn_0.5s_ease-out]">
        
        <!-- Header Info Card (Unified Glass Panel) -->
        <div class="glass-noise rounded-2xl p-4 sm:p-5 mb-5 bg-gradient-to-br from-[#1e293b]/60 via-emerald-950/20 to-[#0f172a]/40 border border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-2xl shadow-xl shadow-emerald-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden group transition-all duration-300">
            
            <!-- Ambient Glow -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
            
           <div class="relative z-10">
               <div class="flex items-center gap-2 text-emerald-400/90 mb-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                  </span>
                  <span class="text-xs font-bold tracking-[0.15em] uppercase opacity-90 text-emerald-200">Jadwal Imsakiyah</span>
               </div>
               <h2 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent tracking-tight mb-2 drop-shadow-sm">{{ store.scheduleData?.kabkota || 'Pilih Lokasi' }}</h2>
               <div class="flex items-center gap-3 text-sm font-medium text-gray-400">
                   <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-200/80">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                        </svg>
                        {{ store.scheduleData?.provinsi || 'Provinsi' }}
                   </span>
                   <span class="w-1 h-1 rounded-full bg-emerald-500/30"></span>
                   <span>Ramadhan {{ store.scheduleData?.hijriah || '1447' }}H / {{ store.scheduleData?.masehi || '2026' }}M</span>
               </div>
            </div>

            <NuxtLink 
                :to="`/imsakiyah/${encodeURIComponent(store.selectedProvinsi)}/${encodeURIComponent(store.selectedKota)}`"
                class="relative z-10 px-4 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 hover:from-emerald-500/25 hover:to-teal-500/20 text-emerald-200 text-sm font-semibold border border-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-500/10 group flex items-center gap-2 shrink-0"
            >
                <span class="group-hover:text-emerald-100 transition-colors">Lihat Halaman Khusus</span>
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                     </svg>
                </span>
            </NuxtLink>
        </div>
    
        <!-- Glass Table Container (iOS Style) -->
        <div class="glass-noise rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e293b]/50 to-[#0f172a]/60 border border-emerald-500/10 backdrop-blur-3xl shadow-2xl shadow-emerald-900/10 relative ring-1 ring-emerald-500/5">
            
            <!-- Ambient Glow for Table -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 blur-[60px] rounded-full pointer-events-none"></div>
            
            <!-- Table Wrapper for Scroll -->
            <div class="overflow-x-auto">
                <table class="w-full text-center border-collapse">
                    
                    <!-- Sticky Header with Blur -->
                    <thead>
                        <tr class="bg-gradient-to-r from-slate-900/95 via-emerald-950/60 to-slate-900/95 backdrop-blur-md text-xs uppercase tracking-wider font-bold border-b border-emerald-500/20 sticky top-0 z-10">
                            <th class="py-3 px-4 text-left pl-5 first:rounded-tl-xl text-emerald-200/80">Tanggal</th>
                            <th class="py-3 px-3 text-amber-400 bg-amber-500/5">Imsak</th>
                            <th class="py-3 px-3 text-blue-300">Subuh</th>
                            <th class="py-3 px-3 text-gray-500">Terbit</th>
                            <th class="py-3 px-3 text-gray-500">Dhuha</th>
                            <th class="py-3 px-3 text-cyan-300">Dzuhur</th>
                            <th class="py-3 px-3 text-teal-300">Ashar</th>
                            <th class="py-3 px-3 text-orange-400 bg-orange-500/5">Maghrib</th>
                            <th class="py-3 px-3 last:rounded-tr-xl text-indigo-300">Isya</th>
                        </tr>
                    </thead>
                    
                    <!-- Body with Row Hover Glow -->
                    <tbody class="text-gray-300 text-sm">
                        <tr 
                            v-for="(day, index) in store.jadwalImsakiyah" 
                            :key="index" 
                            :class="[
                                'group transition-all duration-300 border-b border-white/[0.03]',
                                index % 2 === 0 ? 'bg-slate-800/20 hover:bg-teal-500/[0.05]' : 'bg-transparent hover:bg-teal-500/[0.05]'
                            ]"
                        >
                            <!-- Tanggal Column -->
                            <td class="py-3 px-4 text-left pl-5 font-semibold text-white group-hover:text-teal-100 transition-colors">
                                <span class="bg-white/5 border border-white/5 rounded-md px-2 py-1 text-sm group-hover:bg-white/10 group-hover:border-white/10 transition-all">{{ day.tanggal }}</span>
                            </td>
                            
                            <!-- Imsak Column (Highlighted) -->
                            <td class="py-3 px-3 bg-amber-500/[0.03]">
                                <span class="block px-2 py-1 rounded-md text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all">
                                    {{ day.imsak }}
                                </span>
                            </td>
                            
                            <!-- Standard Time Columns -->
                            <td class="py-3 px-3 text-sm font-medium text-blue-300/80 group-hover:text-blue-200">{{ day.subuh }}</td>
                            <td class="py-3 px-3 text-sm text-gray-500">{{ day.terbit }}</td>
                            <td class="py-3 px-3 text-sm text-gray-500">{{ day.dhuha }}</td>
                            <td class="py-3 px-3 text-sm font-medium text-cyan-300/80 group-hover:text-cyan-200">{{ day.dzuhur }}</td>
                            <td class="py-3 px-3 text-sm font-medium text-teal-300/80 group-hover:text-teal-200">{{ day.ashar }}</td>
                            
                            <!-- Maghrib Column (Highlight) -->
                            <td class="py-3 px-3 bg-orange-500/[0.03]">
                                <span class="block px-2 py-1 rounded-md text-sm font-bold text-orange-300 bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 group-hover:shadow-[0_0_15px_rgba(251,146,60,0.2)] transition-all">
                                    {{ day.maghrib }}
                                </span>
                            </td>
                            
                            <td class="py-3 px-3 text-sm font-medium text-indigo-300/80 group-hover:text-indigo-200">{{ day.isya }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Info -->
            <div class="py-3 px-4 bg-gradient-to-r from-slate-900/60 via-emerald-950/30 to-slate-900/60 border-t border-emerald-500/10 text-center text-xs text-emerald-200/50 backdrop-blur-sm">
                Sumber data: <a href="https://bimasislam.kemenag.go.id/" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors font-medium text-emerald-300/70">Bimas Islam Kementerian Agama RI</a>
            </div>
        </div>
    </div>
    <!-- END: Result Table Section -->

    <!-- Empty State Placeholder (Default View) -->
    <div v-else class="w-full max-w-5xl relative z-10 mx-auto px-4 mt-8">
        <div class="rounded-[2.5rem] py-20 px-6 flex flex-col items-center justify-center text-center border border-dashed border-white/5 bg-white/[0.01]">
            <div class="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 animate-pulse shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
               </svg>
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">Belum ada lokasi dipilih</h3>
            <p class="text-gray-500 text-sm font-medium max-w-sm">
               Silakan pilih provinsi dan kabupaten/kota terlebih dahulu untuk menampilkan jadwal imsakiyah.
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
