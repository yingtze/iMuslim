<template>
  <div v-if="store.scheduleData" class="space-y-4">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-white">
        {{ store.scheduleData?.bulan_nama }} {{ store.scheduleData?.tahun }}
      </h2>
      <p class="text-white/60 mt-2">
        {{ store.scheduleData?.kabkota }}, {{ store.scheduleData?.provinsi }}
      </p>
    </div>

    <!-- Today Highlight -->
    <div
      v-if="store.todaySchedule"
      class="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 rounded-xl p-6 shadow-lg"
    >
      <h3 class="text-lg font-semibold text-white mb-4">Jadwal Hari Ini</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="text-center">
          <p class="text-white/60 text-sm">Imsak</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.imsak }}</p>
        </div>
        <div class="text-center">
          <p class="text-white/60 text-sm">Subuh</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.subuh }}</p>
        </div>
        <div class="text-center">
          <p class="text-white/60 text-sm">Dzuhur</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.dzuhur }}</p>
        </div>
        <div class="text-center">
          <p class="text-white/60 text-sm">Ashar</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.ashar }}</p>
        </div>
        <div class="text-center">
          <p class="text-white/60 text-sm">Maghrib</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.maghrib }}</p>
        </div>
        <div class="text-center">
          <p class="text-white/60 text-sm">Isya</p>
          <p class="text-xl font-bold text-white">{{ store.todaySchedule.isya }}</p>
        </div>
      </div>
    </div>

    <!-- Full Month Schedule Table -->
    <div class="backdrop-blur-xl bg-slate-900/30 border border-white/10 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/10">
              <th class="px-4 py-3 text-left text-sm font-semibold text-white/80">Tanggal</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-white/80">Hari</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Imsak</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Subuh</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Terbit</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Dhuha</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Dzuhur</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Ashar</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Maghrib</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-white/80">Isya</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in store.jadwalShalat"
              :key="index"
              class="border-b border-white/5 hover:bg-white/5 transition"
              :class="{ 'bg-blue-500/10': item.tanggal === new Date().getDate() }"
            >
              <td class="px-4 py-3 text-sm text-white">{{ item.tanggal }}</td>
              <td class="px-4 py-3 text-sm text-white/80">{{ item.hari }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.imsak }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.subuh }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.terbit }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.dhuha }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.dzuhur }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.ashar }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.maghrib }}</td>
              <td class="px-4 py-3 text-sm text-center text-white/70">{{ item.isya }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <p class="text-white/60">Pilih lokasi dan bulan untuk melihat jadwal shalat</p>
  </div>
</template>

<script setup lang="ts">
import { useJadwalShalatStore } from '~/stores/jadwalShalatStore';

const store = useJadwalShalatStore();
</script>
