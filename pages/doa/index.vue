<script setup lang="ts">
import { useDoaStore } from '~/stores/doaStore'

const { getDoaList } = useDoa()
const store = useDoaStore()
const route = useRoute()

// Get initial filters from URL
const currentFilters = computed(() => ({
  grup: route.query.grup as string || '',
  tag: route.query.tag as string || ''
}))

// Fetch Data with filters from URL
const { data, total, pending, error, refresh } = await getDoaList(currentFilters.value)

// Update Store when data changes
watchEffect(() => {
  if (data.value && Array.isArray(data.value)) {
    store.setDoaList(data.value)
  }
})

// Watch for route query changes and refetch
watch(() => route.query, async (newQuery) => {
  const filters = {
    grup: newQuery.grup as string || '',
    tag: newQuery.tag as string || ''
  }
  
  // Update store filters
  store.setFilters(filters)
  
  // Refetch data from API with new filters
  const { data: newData } = await getDoaList(filters)
  if (newData.value && Array.isArray(newData.value)) {
    store.setDoaList(newData.value)
  }
})
</script>

<template>
  <div>
    <!-- Hero Section (More Compact) -->
    <div class="text-center py-6 md:py-10 mb-6 relative">
      <h1 class="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-3 tracking-tight">
        Kumpulan Doa Harian
      </h1>
      <p class="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-6 leading-relaxed font-light">
        Temukan kedamaian dalam setiap lantunan doa. Lengkap dengan teks Arab, latin, dan artinya.
      </p>
      
      <!-- iOS Style Glass Stats Pills -->
      <div class="flex justify-center flex-wrap gap-4">
        <!-- Total Doa -->
        <div class="glass-noise px-5 py-2 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors cursor-default group">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-400 text-xs md:text-sm font-medium">Total Doa</span>
          <span class="text-white font-bold text-base md:text-lg font-mono">{{ total || store.doaList?.length || 0 }}</span>
        </div>
        
        <!-- Kategori Stats -->
        <div class="glass-noise px-5 py-2 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors cursor-default group">
          <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-400 text-xs md:text-sm font-medium">Kategori</span>
          <span class="text-white font-bold text-base md:text-lg font-mono">{{ store.categories?.length || 0 }}</span>
        </div>

        <!-- Tag Stats -->
        <div class="glass-noise px-5 py-2 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 transition-colors cursor-default group">
          <div class="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-400 text-xs md:text-sm font-medium">Tag</span>
          <span class="text-white font-bold text-base md:text-lg font-mono">{{ store.tags?.length || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar (iOS Style) -->
    <div class="mb-8">
      <FilterBar />
    </div>

    <!-- Results Count -->
    <div class="flex items-center justify-between mb-6 px-2">
       <h2 class="text-lg md:text-xl font-semibold text-white/90">Daftar Doa</h2>
       <div class="text-gray-500 text-xs md:text-sm font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
          Menampilkan <span class="text-primary-400 font-bold">{{ store.doaList?.length || 0 }}</span> doa
          <span v-if="currentFilters.grup || currentFilters.tag"> (terfilter)</span>
       </div>
    </div>

    <!-- List -->
    <DoaList 
      :doa-list="store.doaList || []" 
      :loading="pending" 
      :error="error" 
    />
  </div>
</template>
