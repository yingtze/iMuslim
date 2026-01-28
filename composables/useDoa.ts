import type { DoaItem, DoaDetail, DoaFilter, DoaApiResponse, DoaDetailApiResponse } from '~/types/doa'

export const useDoa = () => {
    const API_BASE = 'https://equran.id/api'

    // Fetch doa list with optional filters
    const getDoaList = async (params?: DoaFilter) => {
        // Construct query parameters
        const query: Record<string, string> = {}
        if (params?.grup) query.grup = params.grup
        if (params?.tag) query.tag = params.tag

        // Create a key that changes when params change to force reactivity/refetch
        const key = `doa-list-${JSON.stringify(query)}`

        const { data, error, pending, refresh, status } = await useFetch<DoaApiResponse>(`${API_BASE}/doa`, {
            key,
            query,
            // Cache effectively
            staleMaxAge: 3600, // 1 hour stale
            transform: (response) => {
                // Transform to extract the data array from the response
                return response
            }
        })

        // Return the data array from the response
        const doaList = computed(() => data.value?.data || [])
        const total = computed(() => data.value?.total || 0)

        return { data: doaList, total, error, pending, refresh, status }
    }

    // Fetch single doa
    const getDoaDetail = async (id: string | number) => {
        const { data, error, pending, status } = await useFetch<DoaDetailApiResponse>(`${API_BASE}/doa/${id}`, {
            key: `doa-detail-${id}`,
            staleMaxAge: 86400 // 24 hours
        })

        // Extract the data object from the response
        const doaDetail = computed(() => data.value?.data || null)

        return { data: doaDetail, error, pending, status }
    }

    return {
        getDoaList,
        getDoaDetail
    }
}
