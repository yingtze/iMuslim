<script setup lang="ts">
import type { DoaItem } from '~/types/doa'

const props = defineProps<{
  doa: DoaItem
}>()

const shareDoa = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.doa.nama,
        text: props.doa.idn,
        url: window.location.origin + `/doa/${props.doa.id}`
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  } else {
    // Fallback: Copy link to clipboard
    const url = window.location.origin + `/doa/${props.doa.id}`
    navigator.clipboard.writeText(url)
    alert('Link doa berhasil disalin!')
  }
}
</script>

<template>
  <div class="relative group h-full perspective-1000">
    <!-- Liquid Glass Card Base -->
    <div class="glass-noise h-full rounded-2xl p-5 transition-all duration-500 flex flex-col relative overflow-hidden
                backdrop-blur-xl bg-[#1e293b]/30 border border-white/5 
                shadow-[0_4px_20px_rgb(0,0,0,0.1)]
                group-hover:bg-[#1e293b]/50 group-hover:border-primary-500/30 
                group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]
                group-hover:-translate-y-1">
      
      <!-- Liquid Shine Animation -->
      <div class="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0"></div>

      <!-- Top Highlight (Glass Edge) -->
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <!-- Title section -->
      <div class="mb-4 relative z-10 flex flex-col items-start gap-2">
        <!-- Title: Allow up to 2 lines, min-height for consistency -->
        <h3 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-primary-300 transition-all duration-300 leading-tight min-h-[3rem] line-clamp-2 flex items-center">
          {{ doa.nama }}
        </h3>
        
        <!-- Frosted Pill -->
        <span class="inline-block px-3 py-1 rounded-lg text-[11px] font-semibold tracking-wide text-primary-300 
                     bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-sm
                     group-hover:text-primary-200 group-hover:border-primary-500/20 transition-colors truncate max-w-full">
          {{ doa.grup }}
        </span>
      </div>

      <!-- Divider -->
      <div class="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-4"></div>

      <!-- Content Preview -->
      <div class="mb-6 flex-grow relative z-10">
        <p class="text-gray-400 text-xs leading-relaxed line-clamp-3 font-light tracking-wide group-hover:text-gray-300 transition-colors">
          {{ doa.tentang || doa.idn }}
        </p>
      </div>

      <!-- Footer -->
      <div class="flex flex-col gap-4 relative z-10 mt-auto">
        <!-- Glass Tags -->
        <div class="flex flex-wrap gap-2 min-h-[24px]">
          <span 
            v-for="tag in doa.tag?.slice(0, 3)" 
            :key="tag"
            class="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold text-gray-500 border border-transparent bg-black/20 
                   group-hover:text-primary-400 group-hover:border-primary-500/20 transition-all"
          >
            {{ tag }}
          </span>
          <span v-if="doa.tag?.length > 3" class="text-[10px] text-gray-600 flex items-center">+{{ doa.tag.length - 3 }}</span>
        </div>

        <!-- Action Buttons - IMPROVED BUTTON BACA -->
        <div class="flex items-center gap-3">
          <!-- Button Baca: Liquid Gradient Full Fill -->
          <NuxtLink 
            :to="`/doa/${doa.id}`" 
            class="flex-1 relative overflow-hidden rounded-xl border border-white/5 group/btn transition-all active:scale-95 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20"
          >
            <!-- Background Layer -->
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 opacity-90 group-hover/btn:opacity-100 group-hover/btn:scale-110"></div>
            
            <!-- Shine Layer -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:animate-[shine_1s_ease-in-out]"></div>

            <!-- Content -->
            <div class="relative flex items-center justify-center gap-2 py-2.5 px-4 text-white">
                <span class="font-bold text-xs tracking-wide uppercase drop-shadow-sm">Baca Doa</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 drop-shadow-sm transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
          </NuxtLink>
          
          <button 
            @click="shareDoa"
            class="p-2.5 rounded-xl text-gray-400 hover:text-white transition-all
                   bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20
                   hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 group/share"
            title="Bagikan Doa"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover/share:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
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
