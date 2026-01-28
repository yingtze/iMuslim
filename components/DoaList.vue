<script setup lang="ts">
import type { DoaItem } from '~/types/doa'

defineProps<{
  doaList: DoaItem[]
  loading: boolean
  error: any
}>()
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-gray-200 dark:bg-gray-700 h-40 rounded-xl animate-pulse"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-xl">
      <div class="text-red-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-red-800 dark:text-red-300">Terjadi Kesalahan</h3>
      <p class="text-red-600 dark:text-red-400">{{ error.message || 'Gagal memuat data doa.' }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="doaList.length === 0" class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <p class="text-gray-500 dark:text-gray-400">Tidak ada doa ditemukan.</p>
    </div>

    <!-- List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DoaCard v-for="doa in doaList" :key="doa.id" :doa="doa" />
    </div>
  </div>
</template>
