<script setup lang="ts">
import { useDoaStore } from '~/stores/doaStore'

const store = useDoaStore()
const router = useRouter()
const route = useRoute()

const localFilters = ref({
  grup: (route.query.grup as string) || '',
  tag: (route.query.tag as string) || ''
})

const isSearchFocused = ref(false)

const updateFilters = () => {
  store.setFilters(localFilters.value)
  router.push({
    query: { 
      grup: localFilters.value.grup || undefined, 
      tag: localFilters.value.tag || undefined 
    }
  })
}
</script>

<template>
  <div class="mb-8"> <!-- Reduced bottom margin -->
    <!-- Main Glass Container -->
    <div class="glass-noise p-2 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500">
      <div class="flex flex-col md:flex-row gap-2 items-center"> <!-- Added items-center -->
        
        <!-- Search Input (Expandable) -->
        <div 
          class="relative group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="isSearchFocused || localFilters.grup ? 'flex-[2] md:w-full' : 'flex-1 md:w-1/3'"
        >
          <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10 transition-colors text-gray-400 group-focus-within:text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="localFilters.grup"
            type="text"
            placeholder="Cari doa berdasarkan nama, isi, atau kategori..."
            class="w-full h-12 md:h-14 pl-12 pr-6 rounded-[1.5rem] text-sm md:text-base text-white placeholder-gray-500 outline-none transition-all duration-300
                   bg-black/20 border border-transparent truncate
                   focus:bg-black/40 focus:border-primary-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]
                   hover:bg-black/30"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
            @keyup.enter="updateFilters"
          />
        </div>

        <!-- Category Dropdown -->
        <div class="relative group flex-1 w-full transition-all duration-500">
          <select 
            v-model="localFilters.grup"
            class="w-full h-12 md:h-14 appearance-none pl-5 pr-10 rounded-[1.5rem] text-sm font-medium text-gray-200 outline-none cursor-pointer transition-all duration-300
                   bg-black/20 border border-transparent
                   focus:bg-black/40 focus:border-primary-500/30
                   hover:bg-black/30 truncate"
            @change="updateFilters"
          >
            <option value="" class="bg-[#1e293b] text-gray-400">Semua Kategori</option>
            <option v-for="category in store.categories" :key="category" :value="category" class="bg-[#1e293b] text-white py-2">
              {{ category }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none gap-2">
             <div class="h-6 w-[1px] bg-white/10 mr-1"></div>
             <svg class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        <!-- Tag Dropdown -->
        <div class="relative group flex-1 w-full transition-all duration-500">
          <select 
            v-model="localFilters.tag"
            class="w-full h-12 md:h-14 appearance-none pl-5 pr-10 rounded-[1.5rem] text-sm font-medium text-gray-200 outline-none cursor-pointer transition-all duration-300
                   bg-black/20 border border-transparent
                   focus:bg-black/40 focus:border-primary-500/30
                   hover:bg-black/30 truncate"
            @change="updateFilters"
          >
            <option value="" class="bg-[#1e293b] text-gray-400">Semua Tag</option>
            <option v-for="tag in store.tags" :key="tag" :value="tag" class="bg-[#1e293b] text-white py-2">
              {{ tag }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none gap-2">
             <div class="h-6 w-[1px] bg-white/10 mr-1"></div>
             <svg class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Remove default select arrow in IE/Edge */
select::-ms-expand {
  display: none;
}
</style>
