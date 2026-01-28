<script setup lang="ts">
import type { ImsakiyahData } from '~/types/imsakiyah'

const route = useRoute()
const router = useRouter()
const { getImsakiyah } = useImsakiyah()

// Decode params from URL
const provinsi = decodeURIComponent(route.params.provinsi as string)
const kota = decodeURIComponent(route.params.kota as string)

const jadwalData = ref<ImsakiyahData | null>(null)
const loading = ref(true)
const error = ref(null)

// Get "Today's" schedule. 
// Since data is for Ramadhan 2026, "Today" in real life isn't relevant.
// We will show the 1st day of Ramadhan by default, or the current real date if it matches range (unlikely now).
// Let's default to index 0 (1 Ramadan).
const todaySchedule = computed(() => {
    if (!jadwalData.value?.imsakiyah?.length) return null
    return jadwalData.value.imsakiyah[0]
})

const fetchDoa = async () => {
    loading.value = true
    try {
        const response = await getImsakiyah(provinsi, kota)
        if (response && response.code === 200) {
            jadwalData.value = response.data
        } else {
            error.value = 'Data tidak ditemukan'
        }
    } catch (err) {
        console.error('Error fetching data:', err)
        error.value = 'Terjadi kesalahan saat mengambil data'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchDoa()
})

useHead({
  title: `Jadwal Imsakiyah ${kota} - ${provinsi} | Ramadhan 1447H`,
  meta: [
    { name: 'description', content: `Cek jadwal imsakiyah dan waktu sholat lengkap untuk ${kota}, ${provinsi} bulan Ramadhan 1447 H / 2026 M.` }
  ]
})
</script>

<template>
  <div class="min-h-screen pb-20 px-4 sm:px-6 pt-6">
    
    <!-- iOS Style Back Button - Sticky & Adaptive -->
    <div class="sticky top-28 z-40 mb-6 group inline-block">
      <NuxtLink 
        to="/imsakiyah" 
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full 
               bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg
               text-white/90 hover:bg-slate-800/80 hover:text-white hover:border-white/20 hover:scale-105
               transition-all duration-300 active:scale-95"
      >
        <div class="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-sm font-medium tracking-wide">Kembali ke Pilih Lokasi</span>
      </NuxtLink>
    </div>

    <!-- Main Content -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-400 animate-pulse">Memuat jadwal...</p>
    </div>

    <div v-else-if="jadwalData" class="max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <div class="flex items-center gap-3 mb-2">
                     <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                     </div>
                    <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Jadwal Imsakiyah Ramadhan {{ jadwalData.hijriah }} H / {{ jadwalData.masehi }} M
                    </h1>
                </div>
                
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 ml-1">
                    <div class="flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-teal-100 font-medium">{{ jadwalData.kabkota }}</span>
                    </div>
                    <span class="hidden sm:block text-gray-600">•</span>
                    <div class="text-sm">Provinsi {{ jadwalData.provinsi }}</div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                 <span class="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 font-bold text-sm shadow-[0_0_10px_rgba(20,184,166,0.1)]">
                    {{ jadwalData.masehi }} M
                 </span>
                 <span class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm">
                    30 Hari
                 </span>
                 <button class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-gray-300 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Bagikan
                 </button>
            </div>
        </div>

        <!-- Waktu Penting Card -->
        <div class="glass-noise relative overflow-hidden rounded-[2rem] bg-[#1e293b]/40 border border-teal-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-teal-900/5">
             <!-- Ambient Glow -->
             <div class="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 class="relative z-10 flex items-center gap-2 text-lg font-medium text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Waktu Penting Hari Ini
                <span class="text-xs text-teal-200/60 ml-2 font-normal">(1 Ramadhan {{ jadwalData.hijriah }})</span>
            </h3>

            <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <!-- Imsak -->
                <div class="rounded-2xl bg-[#0f172a]/40 border border-white/5 p-5 flex flex-col items-center justify-center text-center hover:border-teal-500/20 transition-colors group">
                     <span class="text-gray-400 text-sm font-medium mb-1 group-hover:text-teal-200/80 transition-colors">Imsak</span>
                     <span class="text-3xl font-bold text-white group-hover:text-teal-50 transition-colors">{{ todaySchedule?.imsak }}</span>
                </div>

                <!-- Subuh -->
                <div class="rounded-2xl bg-[#0f172a]/40 border border-white/5 p-5 flex flex-col items-center justify-center text-center hover:border-teal-500/20 transition-colors group">
                     <span class="text-gray-400 text-sm font-medium mb-1 group-hover:text-teal-200/80 transition-colors">Subuh</span>
                     <span class="text-3xl font-bold text-white group-hover:text-teal-50 transition-colors">{{ todaySchedule?.subuh }}</span>
                </div>

                <!-- Maghrib (Highlighted) -->
                <div class="rounded-2xl bg-teal-500/10 border border-teal-500/30 p-5 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(20,184,166,0.1)] relative overflow-hidden group">
                     <div class="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <span class="text-teal-200 text-sm font-bold mb-1 relative z-10">Maghrib</span>
                     <span class="text-3xl font-bold text-teal-400 relative z-10">{{ todaySchedule?.maghrib }}</span>
                </div>

                 <!-- Isya -->
                <div class="rounded-2xl bg-[#0f172a]/40 border border-white/5 p-5 flex flex-col items-center justify-center text-center hover:border-teal-500/20 transition-colors group">
                     <span class="text-gray-400 text-sm font-medium mb-1 group-hover:text-teal-200/80 transition-colors">Isya</span>
                     <span class="text-3xl font-bold text-white group-hover:text-teal-50 transition-colors">{{ todaySchedule?.isya }}</span>
                </div>

            </div>
        </div>

        <!-- Full Table (Reused Style from Index, but simplified) -->
        <div class="glass-noise rounded-[2.5rem] overflow-hidden bg-[#1e293b]/40 border border-white/5 backdrop-blur-3xl shadow-2xl relative ring-1 ring-white/5 mt-8">
            <div class="overflow-x-auto">
                 <table class="w-full text-center border-collapse">
                    <thead>
                        <tr class="bg-[#0f172a]/80 backdrop-blur-md text-gray-400 text-xs sm:text-xs uppercase tracking-widest font-bold border-b border-white/5 sticky top-0 z-10">
                            <th class="p-6 text-left pl-8">Tanggal</th>
                            <th class="p-6 text-teal-400">Imsak</th>
                            <th class="p-6">Subuh</th>
                            <th class="p-6">Terbit</th>
                            <th class="p-6">Dhuha</th>
                            <th class="p-6">Dzuhur</th>
                            <th class="p-6">Ashar</th>
                            <th class="p-6 text-teal-400">Maghrib</th>
                            <th class="p-6">Isya</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-300 text-sm divide-y divide-white/[0.03]">
                         <tr v-for="(day, index) in jadwalData.imsakiyah" :key="index" class="group hover:bg-teal-500/[0.02]">
                             <td class="p-5 text-left pl-8 font-semibold text-white group-hover:text-teal-100">
                                <span class="bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">{{ day.tanggal }}</span>
                             </td>
                             <td class="p-5 font-bold text-teal-300">{{ day.imsak }}</td>
                             <td class="p-5">{{ day.subuh }}</td>
                             <td class="p-5 text-gray-500">{{ day.terbit }}</td>
                             <td class="p-5 text-gray-500">{{ day.dhuha }}</td>
                             <td class="p-5">{{ day.dzuhur }}</td>
                             <td class="p-5">{{ day.ashar }}</td>
                             <td class="p-5 font-bold text-teal-300">{{ day.maghrib }}</td>
                             <td class="p-5">{{ day.isya }}</td>
                         </tr>
                    </tbody>
                 </table>
            </div>
        </div>

    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20">
         <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4 text-red-400">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
         </div>
         <h3 class="text-xl font-bold text-white mb-2">Gagal Memuat Data</h3>
         <p class="text-gray-400 mb-6">{{ error }}</p>
         <NuxtLink to="/imsakiyah" class="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
             Coba Pilih Lokasi Lain
         </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
