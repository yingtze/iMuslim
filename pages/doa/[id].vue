<script setup lang="ts">
const route = useRoute()
const { getDoaDetail, getDoaList } = useDoa()

const id = route.params.id as string

const { data: doa, pending, error } = await getDoaDetail(id)

// Fetch Related Doas (Same Category)
const relatedDoas = ref([])
const relatedPending = ref(false)

watch(() => doa.value, async (newDoa) => {
  if (newDoa && newDoa.grup) {
    relatedPending.value = true
    // Fetch filter by group
    const { data: list } = await getDoaList({ grup: newDoa.grup })
    
    if (list.value) {
      // Filter remove current doa AND take only top 3
      relatedDoas.value = list.value.filter(d => d.id !== newDoa.id).slice(0, 3)
    }
    relatedPending.value = false
  }
}, { immediate: true })

// SEO Metadata
useHead({
  title: computed(() => doa.value ? `${doa.value.nama} - iMuslim` : 'Detail Doa'),
  meta: [
    { name: 'description', content: computed(() => doa.value ? `Bacaan doa ${doa.value.nama} lengkap dengan arti dan latinnya.` : '') }
  ]
})
</script>

<template>
  <div class="relative min-h-[80vh]">
    <!-- iOS Style Back Button - Sticky & Adaptive -->
    <div class="sticky top-28 z-40 mb-6 group inline-block">
      <NuxtLink 
        to="/doa" 
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
        <span class="text-sm font-medium tracking-wide">Kembali ke Daftar Doa</span>
      </NuxtLink>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="pending" class="glass-noise h-96 rounded-3xl animate-pulse bg-slate-800/30"></div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 glass-noise bg-red-900/10 rounded-3xl border border-red-500/20">
      <div class="text-red-400 mb-3 opacity-80">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-red-200">Gagal memuat detail doa</h3>
      <p class="text-red-300/70 mb-6 text-sm">{{ error.message }}</p>
      <NuxtLink to="/doa" class="px-6 py-2 rounded-full bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-colors text-sm font-medium border border-red-500/30">
        Kembali
      </NuxtLink>
    </div>

    <div v-else-if="doa">
      <!-- Main Detail Component -->
      <DoaDetail :doa="doa" />

      <!-- Related Doas Section -->
      <div v-if="relatedDoas.length > 0" class="mt-16 max-w-4xl mx-auto border-t border-white/5 pt-10">
        <h3 class="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>Doa Lainnya dalam Kategori</span>
          <span class="text-primary-400">"{{ doa.grup }}"</span>
        </h3>

        <div class="grid gap-3"> <!-- Gap reduced -->
           <NuxtLink 
              v-for="item in relatedDoas" 
              :key="item.id"
              :to="`/doa/${item.id}`"
              class="group relative overflow-hidden glass-noise p-3 md:p-4 rounded-xl bg-[#1e293b]/30 border border-white/5 
                     hover:bg-[#1e293b]/50 hover:border-emerald-500/30 transition-all duration-300"
           >
              <!-- Hover Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></div>
              
              <div class="flex items-center gap-4 relative z-10 w-full">
                 <!-- Icon Box (Smaller) -->
                 <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                 </div>
                 
                 <div class="flex-grow min-w-0 pr-2">
                    <h4 class="text-white font-semibold text-base truncate mb-0.5 group-hover:text-emerald-300 transition-colors">
                      {{ item.nama }}
                    </h4>
                    <p class="text-gray-400 text-xs truncate opacity-80 font-light group-hover:text-gray-300 transition-colors">
                      {{ item.idn }}
                    </p>
                 </div>
                 
                 <!-- Arrow Chevron (Aligned Right) -->
                 <div class="ml-auto w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>
           </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shine {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}
</style>
