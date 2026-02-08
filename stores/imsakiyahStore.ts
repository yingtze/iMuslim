import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ImsakiyahData, ImsakiyahSchedule } from '~/types/imsakiyah'
import { getTanggalHariIni } from '~/utils'

export const useImsakiyahStore = defineStore('imsakiyah', () => {
    // State
    const provinces = ref<string[]>([])
    const cities = ref<string[]>([])
    const selectedProvinsi = ref<string>('')
    const selectedKota = ref<string>('')
    const scheduleData = ref<ImsakiyahData | null>(null)

    // Loading states
    const loadingProvinces = ref(false)
    const loadingCities = ref(false)
    const loadingSchedule = ref(false)

    // Error states
    const errorProvinces = ref<string | null>(null)
    const errorCities = ref<string | null>(null)
    const errorSchedule = ref<string | null>(null)

    // Computed: Get full schedule
    const jadwalImsakiyah = computed(() => scheduleData.value?.imsakiyah || [])

    // Computed: Get first day schedule (1 Ramadhan) - untuk waktu penting hari pertama
    const firstDaySchedule = computed((): ImsakiyahSchedule | null => {
        if (!jadwalImsakiyah.value.length) return null
        // Selalu ambil jadwal tanggal 1 (hari pertama Ramadhan)
        const found = jadwalImsakiyah.value.find(s => s.tanggal === 1)
        return found ? found : (jadwalImsakiyah.value[0] || null)
    })

    // Computed: Get today's schedule (default to first day if not found)
    const todaySchedule = computed((): ImsakiyahSchedule | null => {
        if (!jadwalImsakiyah.value.length) return null
        const currentDate = getTanggalHariIni()

        // Try to find schedule for current date
        const found = jadwalImsakiyah.value.find(s => s.tanggal === currentDate)
        return found ? found : (jadwalImsakiyah.value[0] || null) // Fallback to first day
    })

    // Computed: Get highlight times for display
    const highlightTimes = computed(() => {
        if (!todaySchedule.value) return null
        return {
            imsak: todaySchedule.value.imsak,
            subuh: todaySchedule.value.subuh,
            maghrib: todaySchedule.value.maghrib,
            isya: todaySchedule.value.isya
        }
    })

    // Actions
    /**
     * Set provinces list - synchronous operation
     */
    function setProvinces(data: string[]) {
        provinces.value = data
    }

    /**
     * Set cities list - synchronous operation
     */
    function setCities(data: string[]) {
        cities.value = data
    }

    function setSelectedProvinsi(provinsi: string) {
        selectedProvinsi.value = provinsi
        // Reset cities and kota when provinsi changes
        cities.value = []
        selectedKota.value = ''
        scheduleData.value = null
    }

    function setSelectedKota(kota: string) {
        selectedKota.value = kota
    }

    function setScheduleData(data: ImsakiyahData | null) {
        scheduleData.value = data
    }

    // Fetch functions
    async function fetchProvinces() {
        const { getProvinces } = useImsakiyah()
        loadingProvinces.value = true
        errorProvinces.value = null
        try {
            const response = await getProvinces()
            if (response && response.code === 200) {
                setProvinces(response.data)
            } else {
                errorProvinces.value = 'Gagal memuat daftar provinsi'
            }
        } catch (err) {
            errorProvinces.value = 'Terjadi kesalahan saat memuat provinsi'
            console.error('Error fetching provinces:', err)
        } finally {
            loadingProvinces.value = false
        }
    }

    async function fetchCities(provinsi: string) {
        if (!provinsi) return

        const { getCities } = useImsakiyah()
        loadingCities.value = true
        errorCities.value = null
        try {
            const response = await getCities(provinsi)
            if (response && response.code === 200) {
                setCities(response.data)
            } else {
                errorCities.value = 'Gagal memuat daftar kota'
            }
        } catch (err) {
            errorCities.value = 'Terjadi kesalahan saat memuat kota'
            console.error('Error fetching cities:', err)
        } finally {
            loadingCities.value = false
        }
    }

    async function fetchSchedule(provinsi: string, kota: string) {
        if (!provinsi || !kota) return

        const { getImsakiyah } = useImsakiyah()
        loadingSchedule.value = true
        errorSchedule.value = null
        try {
            const response = await getImsakiyah(provinsi, kota)
            if (response && response.code === 200) {
                setScheduleData(response.data)
            } else {
                errorSchedule.value = 'Jadwal tidak ditemukan'
            }
        } catch (err) {
            errorSchedule.value = 'Terjadi kesalahan saat memuat jadwal'
            console.error('Error fetching schedule:', err)
        } finally {
            loadingSchedule.value = false
        }
    }

    function resetAll() {
        provinces.value = []
        cities.value = []
        selectedProvinsi.value = ''
        selectedKota.value = ''
        scheduleData.value = null
        errorProvinces.value = null
        errorCities.value = null
        errorSchedule.value = null
    }

    return {
        // State
        provinces,
        cities,
        selectedProvinsi,
        selectedKota,
        scheduleData,
        loadingProvinces,
        loadingCities,
        loadingSchedule,
        errorProvinces,
        errorCities,
        errorSchedule,
        // Computed
        jadwalImsakiyah,
        firstDaySchedule,
        todaySchedule,
        highlightTimes,
        // Actions
        setProvinces,
        setCities,
        setSelectedProvinsi,
        setSelectedKota,
        setScheduleData,
        fetchProvinces,
        fetchCities,
        fetchSchedule,
        resetAll
    }
})
