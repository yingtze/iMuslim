<script setup lang="ts">
import type { ImsakiyahSchedule } from '~/types/imsakiyah'

interface Props {
  schedules: ImsakiyahSchedule[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Jadwal Lengkap 30 Hari Ramadhan'
})

// Columns to display in the table
const columns = [
  { label: 'Tanggal', key: 'tanggal', highlight: false },
  { label: 'Imsak', key: 'imsak', highlight: 'amber' },
  { label: 'Subuh', key: 'subuh', highlight: 'blue' },
  { label: 'Terbit', key: 'terbit', highlight: false },
  { label: 'Dzuhur', key: 'dzuhur', highlight: 'cyan' },
  { label: 'Ashar', key: 'ashar', highlight: 'teal' },
  { label: 'Maghrib', key: 'maghrib', highlight: 'orange' },
  { label: 'Isya', key: 'isya', highlight: 'indigo' }
] as const
</script>

<template>
  <div class="space-y-3">
    <!-- Header -->
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-base font-semibold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">{{ title }}</h3>
    </div>

    <!-- Glass Table Container (iOS Style) -->
    <div class="glass-noise rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e293b]/50 to-[#0f172a]/60 border border-emerald-500/10 backdrop-blur-3xl shadow-2xl shadow-emerald-900/10 relative ring-1 ring-emerald-500/5">
      
      <!-- Ambient Glow for Table -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 blur-[60px] rounded-full pointer-events-none"></div>

      <!-- Table Wrapper with Horizontal Scroll -->
      <div class="overflow-x-auto">
        <table class="w-full text-center border-collapse">
          
          <!-- Sticky Header with Blur -->
          <thead>
            <tr class="bg-gradient-to-r from-slate-900/95 via-emerald-950/60 to-slate-900/95 backdrop-blur-md text-xs uppercase tracking-wider font-bold border-b border-emerald-500/20 sticky top-0 z-10">
              <th class="py-3 px-4 text-left pl-5 first:rounded-tl-xl text-emerald-200/80">Tanggal</th>
              <th class="py-3 px-3 text-amber-400 bg-amber-500/5">Imsak</th>
              <th class="py-3 px-3 text-blue-300">Subuh</th>
              <th class="py-3 px-3 text-gray-500">Terbit</th>
              <th class="py-3 px-3 text-cyan-300">Dzuhur</th>
              <th class="py-3 px-3 text-teal-300">Ashar</th>
              <th class="py-3 px-3 text-orange-400 bg-orange-500/5">Maghrib</th>
              <th class="py-3 px-3 last:rounded-tr-xl text-indigo-300">Isya</th>
            </tr>
          </thead>

          <!-- Body with Row Hover Glow -->
          <tbody class="text-gray-300 text-sm">
            <tr
              v-for="(schedule, idx) in schedules"
              :key="idx"
              :class="[
                'group transition-all duration-300 border-b border-white/[0.03]',
                idx % 2 === 0 ? 'bg-slate-800/20 hover:bg-emerald-500/[0.05]' : 'bg-transparent hover:bg-emerald-500/[0.05]'
              ]"
            >
              <!-- Date Column -->
              <td class="py-3 px-4 text-left pl-5 text-sm font-medium text-emerald-200/80 whitespace-nowrap">
                {{ schedule.tanggal }}
              </td>

              <!-- Imsak Column (Highlight) -->
              <td class="py-3 px-3 bg-amber-500/[0.03]">
                <span class="block px-2 py-1 rounded-md text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all">
                  {{ schedule.imsak }}
                </span>
              </td>

              <!-- Subuh -->
              <td class="py-3 px-3 text-sm font-medium text-blue-300/80 group-hover:text-blue-200">{{ schedule.subuh }}</td>

              <!-- Terbit -->
              <td class="py-3 px-3 text-sm font-medium text-gray-500 group-hover:text-gray-400">{{ schedule.terbit }}</td>

              <!-- Dzuhur -->
              <td class="py-3 px-3 text-sm font-medium text-cyan-300/80 group-hover:text-cyan-200">{{ schedule.dzuhur }}</td>

              <!-- Ashar -->
              <td class="py-3 px-3 text-sm font-medium text-teal-300/80 group-hover:text-teal-200">{{ schedule.ashar }}</td>

              <!-- Maghrib Column (Highlight) -->
              <td class="py-3 px-3 bg-orange-500/[0.03]">
                <span class="block px-2 py-1 rounded-md text-sm font-bold text-orange-300 bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 group-hover:shadow-[0_0_15px_rgba(251,146,60,0.2)] transition-all">
                  {{ schedule.maghrib }}
                </span>
              </td>

              <!-- Isya -->
              <td class="py-3 px-3 text-sm font-medium text-indigo-300/80 group-hover:text-indigo-200">{{ schedule.isya }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Info -->
      <div class="py-3 px-4 bg-gradient-to-r from-slate-900/60 via-emerald-950/30 to-slate-900/60 border-t border-emerald-500/10 text-center text-xs text-emerald-200/50 backdrop-blur-sm">
        Sumber data: <a href="https://bimasislam.kemenag.go.id/" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors font-medium text-emerald-300/70">Bimas Islam Kementerian Agama RI</a>
      </div>
    </div>

    <!-- Legend -->
    <div class="text-xs text-emerald-200/40 text-center">
      Waktu dalam zona waktu setempat (WIB/WITA/WIT)
    </div>
  </div>
</template>
