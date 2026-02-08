<script setup lang="ts">
const route = useRoute()

// Decode params from URL
const provinsi = decodeURIComponent(route.params.provinsi as string)
const kota = decodeURIComponent(route.params.kota as string)

useHead({
  title: `Jadwal Shalat ${kota} - ${provinsi} | iMuslim`,
  meta: [
    { name: 'description', content: `Halaman jadwal shalat untuk ${kota}, ${provinsi}.` }
  ]
})
</script>

<template>
  <div class="min-h-screen pb-20 px-4 sm:px-6 pt-6">
    
    <!-- iOS Style Back Button - Sticky & Adaptive -->
    <div class="sticky top-28 z-40 mb-6 group inline-block">
      <NuxtLink 
        to="/jadwal-shalat" 
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full 
               bg-slate-800/90 backdrop-blur-xl border border-white/20 shadow-lg
               text-white hover:bg-slate-700/90 hover:border-white/30 hover:scale-105
               transition-all duration-300 active:scale-95"
      >
        <div class="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-sm font-medium tracking-wide text-white">Kembali ke Pilih Lokasi</span>
      </NuxtLink>
    </div>

    <!-- Lorem Ipsum Content -->
    <div class="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
        <div class="p-6 rounded-2xl bg-[#1e293b]/40 border border-white/5 backdrop-blur-xl shadow-xl">
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Jadwal Shalat {{ kota }}
            </h1>
            <p class="text-emerald-400 mb-6 font-medium">{{ provinsi }}</p>
            
            <div class="prose prose-invert prose-emerald max-w-none text-gray-300 leading-relaxed space-y-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
            </div>
        </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
