/**
 * Composable untuk menentukan waktu shalat yang sedang aktif
 * berdasarkan waktu real-time
 */

import { computed, type Ref } from 'vue'

export type PrayerTimeName = 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya' | null

interface TodaySchedule {
    subuh: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
    [key: string]: string
}

/**
 * Convert time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return (hours || 0) * 60 + (minutes || 0)
}

/**
 * Get current time in minutes since midnight
 */
function getCurrentTimeInMinutes(): number {
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes()
}

/**
 * Determine which prayer time is currently active
 */
export function useCurrentPrayerTime(schedule: Ref<TodaySchedule | null>) {
    const currentPrayerTime = computed<PrayerTimeName>(() => {
        if (!schedule.value) return null

        const currentMinutes = getCurrentTimeInMinutes()

        const subuhMinutes = timeToMinutes(schedule.value.subuh)
        const dzuhurMinutes = timeToMinutes(schedule.value.dzuhur)
        const asharMinutes = timeToMinutes(schedule.value.ashar)
        const maghribMinutes = timeToMinutes(schedule.value.maghrib)
        const isyaMinutes = timeToMinutes(schedule.value.isya)

        // Determine current prayer time based on time ranges
        if (currentMinutes < subuhMinutes) {
            return null // Before Subuh
        } else if (currentMinutes >= subuhMinutes && currentMinutes < dzuhurMinutes) {
            return 'subuh'
        } else if (currentMinutes >= dzuhurMinutes && currentMinutes < asharMinutes) {
            return 'dzuhur'
        } else if (currentMinutes >= asharMinutes && currentMinutes < maghribMinutes) {
            return 'ashar'
        } else if (currentMinutes >= maghribMinutes && currentMinutes < isyaMinutes) {
            return 'maghrib'
        } else {
            return 'isya' // After Isya
        }
    })

    return {
        currentPrayerTime
    }
}
