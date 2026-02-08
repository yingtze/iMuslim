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

// Key prayer times to highlight
const keyTimes = [
  { label: 'Imsak', key: 'imsak', color: 'purple' },
  { label: 'Subuh', key: 'subuh', color: 'indigo' },
  { label: 'Maghrib', key: 'maghrib', color: 'orange' },
  { label: 'Isya', key: 'isya', color: 'blue' }
] as const
</script>

<template>
  <div v-if="schedule" class="space-y-4">
    <!-- Title -->
    <div v-if="title" class="flex items-center gap-2 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium text-white">{{ title }}</h3>
    </div>

    <!-- Highlights Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(time, idx) in keyTimes"
        :key="time.key"
        class="glass-noise group rounded-2xl p-5 backdrop-blur-xl
               bg-[#1e293b]/40 border border-white/5
               hover:border-teal-500/20 hover:bg-[#1e293b]/60
               transition-all duration-300
               flex flex-col items-center justify-center text-center"
      >
        <!-- Time Icon Indicator -->
        <div :class="{
          'w-3 h-3 rounded-full mb-3': true,
          'bg-purple-400': time.color === 'purple',
          'bg-indigo-400': time.color === 'indigo',
          'bg-orange-400': time.color === 'orange',
          'bg-blue-400': time.color === 'blue'
        }"></div>

        <!-- Label -->
        <span v-if="showLabel" class="text-gray-400 text-sm font-medium mb-2 group-hover:text-teal-200/80 transition-colors">
          {{ time.label }}
        </span>

        <!-- Time Value -->
        <span class="text-3xl font-bold text-white group-hover:text-teal-50 transition-colors">
          {{ (schedule as any)[time.key] }}
        </span>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
    <p class="text-gray-400">Pilih lokasi terlebih dahulu untuk melihat jadwal waktu sholat</p>
  </div>
</template>
