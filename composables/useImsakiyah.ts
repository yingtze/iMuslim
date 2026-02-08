import type { ProvinceResponse, CityResponse, ImsakiyahResponse, ImsakiyahData } from '~/types/imsakiyah'

/**
 * Composable untuk mengambil data Imsakiyah (jadwal puasa Ramadan)
 * Menyediakan metode untuk fetch provinsi, kabupaten/kota, dan jadwal imsakiyah
 */
export const useImsakiyah = () => {
    const API_BASE = 'https://equran.id/api/v2/imsakiyah'

    /**
     * Get list of provinces di Indonesia
     */
    const getProvinces = async () => {
        try {
            return await $fetch<ProvinceResponse>(`${API_BASE}/provinsi`)
        } catch (err: any) {
            console.error('Error fetching provinces:', err)
            throw new Error(err.message || 'Gagal mengambil daftar provinsi')
        }
    }

    /**
     * Get list of cities for a province
     */
    const getCities = async (province: string) => {
        try {
            return await $fetch<CityResponse>(`${API_BASE}/kabkota`, {
                method: 'POST',
                body: { provinsi: province }
            })
        } catch (err: any) {
            console.error('Error fetching cities:', err)
            throw new Error(err.message || 'Gagal mengambil daftar kota')
        }
    }

    /**
     * Get Imsakiyah schedule untuk provinsi dan kota tertentu
     */
    const getImsakiyah = async (province: string, city: string) => {
        try {
            return await $fetch<ImsakiyahResponse>(`${API_BASE}`, {
                method: 'POST',
                body: { provinsi: province, kabkota: city }
            })
        } catch (err: any) {
            console.error('Error fetching imsakiyah schedule:', err)
            throw new Error(err.message || 'Gagal mengambil jadwal imsakiyah')
        }
    }

    return {
        getProvinces,
        getCities,
        getImsakiyah
    }
}
