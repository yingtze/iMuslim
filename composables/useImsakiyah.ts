import type { ProvinceResponse, CityResponse, ImsakiyahResponse, ImsakiyahData } from '~/types/imsakiyah'

export const useImsakiyah = () => {
    const API_BASE = 'https://equran.id/api/v2/imsakiyah'

    // Get list of provinces
    const getProvinces = async () => {
        return $fetch<ProvinceResponse>(`${API_BASE}/provinsi`)
    }

    // Get list of cities for a province
    const getCities = async (province: string) => {
        return $fetch<CityResponse>(`${API_BASE}/kabkota`, {
            method: 'POST',
            body: { provinsi: province }
        })
    }

    // Get Imsakiyah schedule
    const getImsakiyah = async (province: string, city: string) => {
        return $fetch<ImsakiyahResponse>(`${API_BASE}`, {
            method: 'POST',
            body: { provinsi: province, kabkota: city }
        })
    }

    return {
        getProvinces,
        getCities,
        getImsakiyah
    }
}
