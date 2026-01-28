<script setup lang="ts">
import type { DoaDetail } from '~/types/doa'

const props = defineProps<{
  doa: DoaDetail
}>()

const copyToClipboard = () => {
  const content = `Judul:
${props.doa.nama}

Teks Arab:
${props.doa.ar}

Transliterasi:
${props.doa.tr}

Terjemahan:
Artinya: ${props.doa.idn}

${props.doa.tentang ? `Keterangan & Dalil
${props.doa.tentang}` : ''}

Accessed from (url):
${window.location.href}`

  navigator.clipboard.writeText(content)
  alert('Teks doa berhasil disalin lengkap!')
}

const shareDoa = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.doa.nama,
        text: `Baca Doa ${props.doa.nama} di iMuslim`,
        url: window.location.href
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  } else {
    copyToClipboard()
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Header Section with Glass Effect -->
    <div class="glass-noise rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-[#1e293b]/30 border border-white/5 shadow-2xl relative overflow-hidden">
      <!-- Top Highlight -->
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div class="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 relative z-10">
        <!-- Left: Title & Info -->
        <div class="flex items-start gap-5 w-full">
          <div class="bg-gradient-to-br from-primary-500/10 to-teal-500/10 border border-primary-500/20 p-3.5 rounded-2xl shrink-0 mt-1 shadow-inner hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="w-full">
            <h1 class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
              {{ doa.nama }}
            </h1>
            
            <!-- Metadata: Kategori & Tags (Compact Inline Style - No Labels) -->
            <div class="flex flex-wrap items-center gap-y-3 gap-x-2">
              <!-- Kategori Pill -->
              <span class="px-3 py-1 rounded-lg text-xs font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20 backdrop-blur-sm">
                {{ doa.grup }}
              </span>

              <!-- Tag Pills -->
              <span 
                v-for="tag in doa.tag" 
                :key="tag"
                class="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/5 backdrop-blur-sm uppercase tracking-wider"
              >
                {{ tag }}
              </span>
            </div>
            
          </div>
        </div>

        <!-- Right: Actions Buttons (Glass style) -->
        <div class="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button 
            @click="copyToClipboard"
            class="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-primary-300 transition-all text-sm font-medium backdrop-blur-md shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Salin
          </button>
          <button 
            @click="shareDoa"
            class="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-primary-300 transition-all text-sm font-medium backdrop-blur-md shadow-lg"
          >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Bagikan
          </button>
        </div>
      </div>
    </div>

    <!-- Teks Arab -->
    <div>
      <h2 class="text-center text-primary-400 font-medium mb-4 text-sm tracking-widest uppercase opacity-80">Teks Arab</h2>
      <div class="glass-noise rounded-3xl p-8 md:p-12 border border-white/5 bg-[#111318]/80 backdrop-blur-xl text-center shadow-xl relative overflow-hidden">
        <!-- Glow accents -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full"></div>
        
        <p class="font-arabic text-3xl md:text-5xl leading-[2.2] text-gray-100 relative z-10" dir="rtl">
          {{ doa.ar }}
        </p>
      </div>
    </div>

    <!-- Transliterasi -->
    <div>
      <h2 class="text-primary-400 font-medium mb-3 text-sm tracking-widest uppercase opacity-80">Transliterasi</h2>
      <div class="glass-noise rounded-2xl p-6 border border-white/5 bg-[#1e293b]/20 backdrop-blur-md">
        <p class="italic text-gray-300 leading-relaxed text-base font-serif">
          "{{ doa.tr }}"
        </p>
      </div>
    </div>

    <!-- Terjemahan -->
    <div>
      <h2 class="text-primary-400 font-medium mb-3 text-sm tracking-widest uppercase opacity-80">Terjemahan</h2>
      <div class="glass-noise rounded-2xl p-6 border border-primary-500/20 bg-gradient-to-br from-primary-500/5 to-transparent backdrop-blur-md">
        <p class="text-gray-100 leading-relaxed text-base">
          {{ doa.idn }}
        </p>
      </div>
    </div>

    <!-- Keterangan & Dalil -->
    <div v-if="doa.tentang">
      <h2 class="flex items-center gap-2 text-primary-400 font-medium mb-3 text-sm tracking-widest uppercase opacity-80">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Keterangan & Dalil
      </h2>
      <div class="glass-noise rounded-2xl p-6 border border-white/10 bg-[#1e293b]/30 backdrop-blur-md">
        <p class="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
          {{ doa.tentang }}
        </p>
      </div>
    </div>
  </div>
</template>
