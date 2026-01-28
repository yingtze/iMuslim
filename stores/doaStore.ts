import { defineStore } from 'pinia'
import type { DoaItem, DoaDetail, DoaFilter } from '~/types/doa'

export const useDoaStore = defineStore('doa', () => {
    const doaList = ref<DoaItem[]>([])
    const selectedDoa = ref<DoaDetail | null>(null)

    // Filter state
    const filters = ref<DoaFilter>({
        grup: '',
        tag: ''
    })

    // Computed: Get unique categories from current list
    const categories = computed(() => {
        const uniqueGroups = new Set<string>()
        doaList.value.forEach(doa => {
            if (doa.grup) {
                uniqueGroups.add(doa.grup)
            }
        })
        return Array.from(uniqueGroups).sort()
    })

    // Computed: Get unique tags from current list (flatten array and remove duplicates)
    const tags = computed(() => {
        const uniqueTags = new Set<string>()
        doaList.value.forEach(doa => {
            if (doa.tag && Array.isArray(doa.tag)) {
                doa.tag.forEach(t => {
                    if (t) uniqueTags.add(t)
                })
            }
        })
        return Array.from(uniqueTags).sort()
    })

    // Actions
    function setDoaList(list: DoaItem[]) {
        if (Array.isArray(list)) {
            doaList.value = list
        } else {
            doaList.value = []
        }
    }

    function setFilters(newFilters: DoaFilter) {
        if (newFilters.grup !== undefined) filters.value.grup = newFilters.grup
        if (newFilters.tag !== undefined) filters.value.tag = newFilters.tag
    }

    return {
        doaList,
        selectedDoa,
        filters,
        categories,
        tags,
        setDoaList,
        setFilters
    }
})
