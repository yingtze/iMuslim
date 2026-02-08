<script setup lang="ts">
import type { ImsakiyahSchedule } from '~/types/imsakiyah'

interface Props {
  schedule?: ImsakiyahSchedule | null
  title?: string
  showLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  showLabel: true
})

// Key prayer times to highlight - matching jadwal shalat style colors
const keyTimes = [
  { label: 'Imsak', key: 'imsak', color: 'amber', isHighlight: true },
  { label: 'Subuh', key: 'subuh', color: 'blue', isHighlight: false },
  { label: 'Maghrib', key: 'maghrib', color: 'orange', isHighlight: true },
  { label: 'Isya', key: 'isya', color: 'indigo', isHighlight: false }
] as const
</script>

<template>
  <div v-if="schedule" class="space-y-3">
    <!-- Title -->
    <div v-if="title" class="flex items-center gap-2 mb-3">
      <div class="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-base font-semibold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">{{ title }}</h3>
    </div>

    <!-- Highlights Grid - Following jadwal shalat card style -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      
      <!-- Imsak (Highlighted - Amber) -->
      <div class="group relative rounded-xl p-2.5 sm:p-3 bg-gradient-to-br from-amber-600/30 to-amber-700/20 border border-amber-500/50 hover:border-amber-400/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="relative z-10 text-center">
          <div class="text-[10px] sm:text-xs font-semibold text-amber-300 mb-0.5 uppercase tracking-wider">Imsak</div>
          <div class="text-xl sm:text-2xl font-bold text-white">{{ schedule.imsak }}</div>
        </div>
      </div>

      <!-- Subuh (Blue) -->
      <div class="group relative rounded-xl p-2.5 sm:p-3 bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500/30 hover:border-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="relative z-10 text-center">
          <div class="text-[10px] sm:text-xs font-semibold text-blue-300 mb-0.5 uppercase tracking-wider">Subuh</div>
          <div class="text-xl sm:text-2xl font-bold text-white">{{ schedule.subuh }}</div>
        </div>
      </div>

      <!-- Maghrib (Highlighted - Orange) -->
      <div class="group relative rounded-xl p-2.5 sm:p-3 bg-gradient-to-br from-orange-600/30 to-amber-700/20 border border-orange-500/50 hover:border-orange-400/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="relative z-10 text-center">
          <div class="text-[10px] sm:text-xs font-semibold text-orange-300 mb-0.5 uppercase tracking-wider">Maghrib</div>
          <div class="text-xl sm:text-2xl font-bold text-white">{{ schedule.maghrib }}</div>
        </div>
      </div>

      <!-- Isya (Indigo) -->
      <div class="group relative rounded-xl p-2.5 sm:p-3 bg-gradient-to-br from-indigo-600/20 to-indigo-700/10 border border-indigo-500/30 hover:border-indigo-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <div class="relative z-10 text-center">
          <div class="text-[10px] sm:text-xs font-semibold text-indigo-300 mb-0.5 uppercase tracking-wider">Isya</div>
          <div class="text-xl sm:text-2xl font-bold text-white">{{ schedule.isya }}</div>
        </div>
      </div>

    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="rounded-xl border border-emerald-500/10 bg-gradient-to-br from-[#1e293b]/40 to-[#0f172a]/30 p-6 text-center">
    <p class="text-emerald-200/60">Pilih lokasi terlebih dahulu untuk melihat jadwal waktu sholat</p>
  </div>
</template>
