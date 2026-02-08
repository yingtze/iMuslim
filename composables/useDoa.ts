import type { DoaItem, DoaDetail, DoaFilter, DoaApiResponse, DoaDetailApiResponse } from '~/types/doa'
import { generateDoaCacheKey, generateDoaDetailCacheKey } from '~/utils'

/**
 * Composable untuk mengambil data Doa dari API Equran.id
 * Menyediakan metode untuk fetch list doa dengan filter dan detail doa
 */
export const useDoa = () => {
    const API_BASE = 'https://equran.id/api'

    /**
     * Fetch doa list dengan optional filters (grup, tag)
     * Menggunakan cache 1 jam untuk performa
     */
    const getDoaList = async (params?: DoaFilter) => {
        // Construct query parameters
        const query: Record<string, string> = {}
        if (params?.grup) query.grup = params.grup
        if (params?.tag) query.tag = params.tag

        const key = generateDoaCacheKey(params)

        try {
            const { data, error, pending, refresh, status } = await useFetch<DoaApiResponse>(`${API_BASE}/doa`, {
                key,
                query,
                staleMaxAge: 3600, // 1 hour stale cache
                transform: (response) => response
            })

            // Return the data array from the response
            const doaList = computed(() => data.value?.data || [])
            const total = computed(() => data.value?.total || 0)

            return { data: doaList, total, error, pending, refresh, status }
        } catch (err: any) {
            console.error('Error fetching doa list:', err)
            throw new Error(err.message || 'Gagal mengambil data doa')
        }
    }

    /**
     * Fetch single doa detail
     * Menggunakan cache 24 jam karena data statis
     */
    const getDoaDetail = async (id: string | number) => {
        try {
            const { data, error, pending, status } = await useFetch<DoaDetailApiResponse>(`${API_BASE}/doa/${id}`, {
                key: generateDoaDetailCacheKey(id),
                staleMaxAge: 86400 // 24 hours
            })

            // Extract the data object from the response
            const doaDetail = computed(() => data.value?.data || null)

            return { data: doaDetail, error, pending, status }
        } catch (err: any) {
            console.error('Error fetching doa detail:', err)
            throw new Error(err.message || 'Gagal mengambil detail doa')
        }
    }

    return {
        getDoaList,
        getDoaDetail
    }
}
