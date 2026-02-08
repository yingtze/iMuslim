/**
 * Data Validator Utilities
 * Helper functions untuk validasi data
 */

import type { DoaItem, DoaDetail } from '~/types/doa'
import type { JadwalShalatItem } from '~/types/jadwal-shalat'

/**
 * Validate doa data before use
 * @param doa - DoaItem to validate
 * @returns true jika valid, false sebaliknya
 * @example
 * if (isValidDoaItem(doa)) {
 *   // Safe to use doa
 * }
 */
export function isValidDoaItem(doa: any): doa is DoaItem {
  return (
    doa &&
    typeof doa === 'object' &&
    'id' in doa &&
    'nama' in doa &&
    ('idn' in doa || 'ar' in doa)
  )
}

/**
 * Validate doa detail data
 * @param doa - DoaDetail to validate
 * @returns true jika valid, false sebaliknya
 */
export function isValidDoaDetail(doa: any): doa is DoaDetail {
  return (
    doa &&
    typeof doa === 'object' &&
    'id' in doa &&
    'nama' in doa &&
    'ar' in doa &&
    'tr' in doa &&
    'idn' in doa
  )
}

/**
 * Validate jadwal shalat item
 * @param jadwal - JadwalShalatItem to validate
 * @returns true jika valid, false sebaliknya
 */
export function isValidJadwalShalatItem(jadwal: any): jadwal is JadwalShalatItem {
  return (
    jadwal &&
    typeof jadwal === 'object' &&
    'tanggal' in jadwal &&
    'subuh' in jadwal &&
    'dzuhur' in jadwal &&
    'ashar' in jadwal &&
    'maghrib' in jadwal &&
    'isya' in jadwal
  )
}

/**
 * Validate doa untuk share operation
 * Memastikan data yang necessary untuk share tersedia
 * @param doa - DoaItem to validate
 * @returns true jika valid untuk share
 */
export function isValidForShare(doa: any): boolean {
  return (
    doa &&
    typeof doa === 'object' &&
    'id' in doa &&
    'nama' in doa &&
    typeof doa.nama === 'string' &&
    doa.nama.trim().length > 0 &&
    'idn' in doa &&
    typeof doa.idn === 'string' &&
    doa.idn.trim().length > 0
  )
}

/**
 * Validate string tidak kosong
 * @param str - String to validate
 * @returns true jika tidak kosong
 */
export function isNotEmpty(str: any): boolean {
  return typeof str === 'string' && str.trim().length > 0
}

/**
 * Validate array tidak kosong
 * @param arr - Array to validate
 * @returns true jika array dan tidak kosong
 */
export function isArrayNotEmpty(arr: any): arr is Array<any> {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * Validate waktu format (HH:MM)
 * @param waktu - Time string
 * @returns true jika format valid
 * @example
 * isValidWaktuFormat('04:30') // true
 * isValidWaktuFormat('4:30') // true
 * isValidWaktuFormat('25:00') // false
 */
export function isValidWaktuFormat(waktu: string): boolean {
  if (typeof waktu !== 'string') return false
  
  const [jam, menit] = waktu.split(':')
  const jamNum = Number(jam)
  const menitNum = Number(menit)
  
  return (
    jamNum >= 0 &&
    jamNum <= 23 &&
    menitNum >= 0 &&
    menitNum <= 59
  )
}

/**
 * Validate tanggal (1-31)
 * @param tanggal - Day number
 * @returns true jika valid
 */
export function isValidTanggal(tanggal: any): boolean {
  const num = Number(tanggal)
  return !isNaN(num) && num >= 1 && num <= 31
}

/**
 * Validate bulan (1-12)
 * @param bulan - Month number
 * @returns true jika valid
 */
export function isValidBulan(bulan: any): boolean {
  const num = Number(bulan)
  return !isNaN(num) && num >= 1 && num <= 12
}

/**
 * Validate tahun (reasonable range)
 * @param tahun - Year number
 * @param minTahun - Minimum year (default: 2020)
 * @param maxTahun - Maximum year (default: 2100)
 * @returns true jika valid
 */
export function isValidTahun(tahun: any, minTahun = 2020, maxTahun = 2100): boolean {
  const num = Number(tahun)
  return !isNaN(num) && num >= minTahun && num <= maxTahun
}

/**
 * Validate provinsi name (tidak kosong)
 * @param provinsi - Province name
 * @returns true jika valid
 */
export function isValidProvinsi(provinsi: any): boolean {
  return typeof provinsi === 'string' && provinsi.trim().length > 0
}

/**
 * Validate kabupaten/kota name (tidak kosong)
 * @param kabkota - City name
 * @returns true jika valid
 */
export function isValidKabKota(kabkota: any): boolean {
  return typeof kabkota === 'string' && kabkota.trim().length > 0
}

/**
 * Validate both provinsi dan kabkota
 * @param provinsi - Province name
 * @param kabkota - City name
 * @returns true jika kedua valid
 */
export function isValidLocation(provinsi: any, kabkota: any): boolean {
  return isValidProvinsi(provinsi) && isValidKabKota(kabkota)
}
