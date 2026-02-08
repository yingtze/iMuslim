# iMuslim Copilot Instructions

## Project Overview

**iMuslim** is a Nuxt 3 web app providing Islamic daily duas and prayer schedules (Imsakiyah). The app features premium glassmorphic UI with dark mode and consumes two external APIs:
- **Equran.id API** (`https://equran.id/api`) - doa/duas data with Arabic, Latin, and Indonesian translations
- **Imsakiyah API** - prayer times and fasting schedules for Indonesian regions

## Architecture Overview

### Core Stack
- **Framework**: Nuxt 3.14.0 with Vue 3.5
- **State Management**: Pinia (stores/)
- **Styling**: Tailwind CSS + custom glassmorphic CSS (assets/css/main.css)
- **Data Fetching**: Nuxt `useFetch` composable with caching

### Key Data Flows

**Duas Flow**:
1. `useDoa()` composable fetches from Equran.id API with optional `grup` and `tag` filters
2. `useDoaStore()` (Pinia) caches list and manages filter state (`DoaFilter`)
3. Components consume data via `computed` properties for reactivity
4. Routing: `/doa` → list view, `/doa/[id]` → detail view

**Imsakiyah Flow** (refactored with Pinia store):
1. `useImsakiyah()` composable wraps POST API calls for provinces, cities, and schedules
2. `useImsakiyahStore()` (Pinia) manages full data lifecycle: `selectedProvinsi`, `selectedKota`, `scheduleData`
3. Store computes `jadwalImsakiyah` and `todaySchedule` for reactive UI binding
4. Watchers in pages trigger `store.fetchCities()` and `store.fetchSchedule()` on selection changes
5. Dynamic routing: `/imsakiyah/[provinsi]/[kota]` calls `store.fetchSchedule()` on mount
6. Components: `ImsakiyahLocationSelector`, `ImsakiyahHighlights`, `ImsakiyahScheduleCard` consume store reactively

### Component Hierarchy

- **Pages**: [index.vue](pages/index.vue) (redirect to /doa), [pages/doa/index.vue](pages/doa/index.vue), [pages/imsakiyah/index.vue](pages/imsakiyah/index.vue), [pages/imsakiyah/[provinsi]/[kota].vue](pages/imsakiyah/[provinsi]/[kota].vue)
- **Components**: 
  - **Doa Components**: [DoaList.vue](components/DoaList.vue), [DoaCard.vue](components/DoaCard.vue), [DoaDetail.vue](components/DoaDetail.vue), [FilterBar.vue](components/FilterBar.vue)
  - **Imsakiyah Components**: [ImsakiyahLocationSelector.vue](components/ImsakiyahLocationSelector.vue) (province/city dropdowns with watchers), [ImsakiyahHighlights.vue](components/ImsakiyahHighlights.vue) (key prayer times grid), [ImsakiyahScheduleCard.vue](components/ImsakiyahScheduleCard.vue) (30-day schedule table)

### Data Models

- [DoaItem](types/doa.ts#L1-L9): Basic doa (id, grup, nama, ar, tr, idn, tentang, tag[])
- [DoaFilter](types/doa.ts#L16-L19): Filter params {grup?: string, tag?: string}
- [ImsakiyahSchedule](types/imsakiyah.ts): Prayer times {tanggal, imsak, subuh, ... isya}

## Developer Workflows

### Getting Started
```bash
npm install         # Install deps (Nuxt, Pinia, Tailwind)
npm run dev         # Dev server at http://localhost:3000
npm run build       # Production build
npm run generate    # SSG output
```

### Key Patterns

**Composables** (reusable logic in [composables/](composables/)):
- Always use `useFetch` with `key` parameter for cache invalidation
- Dois use `staleMaxAge: 3600` (1h), Imsakiyah uses 86400 (24h)
- Return computed properties for reactivity: `computed(() => data.value?.data || [])`

**Pinia Stores** ([stores/](stores/)):
- [doaStore.ts](stores/doaStore.ts): Caches `doaList`, manages `filters` (grup, tag), computes derived `categories` and `tags`
- [imsakiyahStore.ts](stores/imsakiyahStore.ts): Manages `selectedProvinsi`, `selectedKota`, `scheduleData`, loading/error states; provides async actions `fetchProvinces()`, `fetchCities()`, `fetchSchedule()`; computes `jadwalImsakiyah`, `todaySchedule`, `highlightTimes`

**Vue Components** (use `<script setup lang="ts">`):
- Props: `defineProps<{ doa: DoaItem }>()` (typed destructuring)
- Server-side data loading in pages via composables, not components
- Share button: Uses Web Share API with clipboard fallback ([DoaCard.vue](components/DoaCard.vue#L7))

**Styling**:
- Glassmorphism base: `backdrop-blur-xl bg-[slate]/30 border border-white/5 shadow-[...]`
- Hover effects: Use Tailwind group-hover classes with gradient transitions
- Custom animations in CSS: shine effect on cards

## Integration Points

**External APIs**:
- Equran.id: `/api/doa` (list), `/api/doa/{id}` (detail) - query params: grup, tag
- Imsakiyah API: Provinces, Cities, Schedules endpoints (used in [useImsakiyah.ts](composables/useImsakiyah.ts))

**Routing**:
- File-based auto-routing (Nuxt convention)
- Dynamic segments: `/doa/[id]`, `/imsakiyah/[provinsi]/[kota]`
- Query filtering: `/doa?grup=...&tag=...` (handled by composable)

## Important Conventions

1. **API Response Wrapping**: Equran.id wraps data: `{ status, data: [...], total }`  - extract via `response.data`
2. **Tag Format**: Tags are arrays on DoaItem; FilterBar must flatten and deduplicate
3. **Cache Keys**: Always use `key` in useFetch to force reactivity on param changes
4. **Computed Fields**: Store computes categories/tags on every doaList change - keep doaList immutable
5. **Error Handling**: Check `.error` and `.pending` from useFetch; no global error boundary yet

## Common Tasks

- **Add filter**: Update [FilterBar.vue](components/FilterBar.vue) and [doaStore.ts](stores/doaStore.ts) filter state
- **New API field**: Update [doa.ts](types/doa.ts) DoaItem interface, then update components
- **Styling**: Edit [main.css](assets/css/main.css) for globals; components use Tailwind classes
- **New page**: Create in [pages/](pages/) - auto-routed by Nuxt
- **Imsakiyah location selection**: Modify [ImsakiyahLocationSelector.vue](components/ImsakiyahLocationSelector.vue) or update watchers in store
- **Add prayer time highlight**: Update [ImsakiyahHighlights.vue](components/ImsakiyahHighlights.vue) keyTimes array
- **Customize schedule table**: Modify columns in [ImsakiyahScheduleCard.vue](components/ImsakiyahScheduleCard.vue)
