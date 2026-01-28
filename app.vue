<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap' }
  ],
  bodyAttrs: {
    class: 'bg-[#0f172a] text-white antialiased'
  }
})

const route = useRoute()
const navLinks = [
  { name: 'Beranda', path: '/', icon: 'home' },
  { name: 'Doa', path: '/doa', icon: 'book-open' },
  { name: 'Imsakiyah', path: '/imsakiyah', icon: 'moon' },
  { name: 'Jadwal Shalat', path: '/jadwal-shalat', icon: 'clock' },
  { name: 'Lainnya', path: '/lainnya', icon: 'menu-alt-4' }
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="min-h-screen font-sans selection:bg-primary-500/30 flex flex-col items-center">
    <!-- Ambient Background Blobs (for Glassmorphism) -->
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div class="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
    </div>

    <!-- Liquid Glass Header -->
    <header class="sticky top-6 z-50 transition-all duration-300 w-full px-4 flex justify-center">
      <div class="container mx-auto h-16 md:h-20 flex items-center justify-between rounded-full px-2 md:px-6
                  bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                  hover:bg-slate-900/50 hover:border-white/15 transition-all duration-500">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group px-4">
          <div class="bg-gradient-to-tr from-primary-500/20 to-emerald-400/20 border border-primary-500/30 p-2 rounded-xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight group-hover:to-white transition-all">iMuslim</span>
        </NuxtLink>

        <!-- iOS Dock Style Navigation -->
        <nav class="hidden md:flex items-center gap-1 p-1.5">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden',
              isActive(link.path) 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            ]"
          >
            <!-- Hover Liquid Effect (iOS Dock style) -->
            <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 backdrop-blur-sm"></div>
            
            <!-- Active Liquid Background (Morphing) -->
            <div v-if="isActive(link.path)" class="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-emerald-500/90 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] backdrop-blur-md animate-fade-in"></div>

            <!-- Content -->
            <span class="relative z-10 flex items-center gap-2">
               <!-- Optional Icons can go here -->
               {{ link.name }}
            </span>
          </NuxtLink>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 relative z-10 pt-8 w-full">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>
