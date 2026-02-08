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
  { label: 'Tanggal', key: 'tanggal' },
  { label: 'Imsak', key: 'imsak' },
  { label: 'Subuh', key: 'subuh' },
  { label: 'Terbit', key: 'terbit' },
  { label: 'Dzuhur', key: 'dzuhur' },
  { label: 'Ashar', key: 'ashar' },
  { label: 'Maghrib', key: 'maghrib' },
  { label: 'Isya', key: 'isya' }
] as const
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-medium text-white">{{ title }}</h3>
    </div>

    <!-- Table Wrapper with Horizontal Scroll -->
    <div class="overflow-x-auto rounded-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/30">
      <table class="w-full">
        <!-- Table Header -->
        <thead class="bg-[#0f172a]/60 border-b border-white/10">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-xs font-semibold text-teal-300 whitespace-nowrap"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="(schedule, idx) in schedules"
            :key="idx"
            class="hover:bg-white/5 transition-colors group"
          >
            <!-- Date Column (sticky to the left for better UX) -->
            <td class="sticky left-0 z-10 px-4 py-3 text-sm font-medium text-white bg-[#1e293b]/40 group-hover:bg-[#1e293b]/60">
              {{ schedule.tanggal }}
            </td>

            <!-- Time Columns -->
            <td
              v-for="col in columns.slice(1)"
              :key="col.key"
              class="px-4 py-3 text-sm text-gray-300 whitespace-nowrap"
            >
              <span class="font-mono">{{ (schedule as any)[col.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div class="text-xs text-gray-500 text-center">
      Waktu dalam zona waktu setempat (WIB/WITA/WIT)
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

thead th {
  background: linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(0, 0, 0, 0));
}

tbody tr:last-child {
  border-bottom: none;
}
</style>
