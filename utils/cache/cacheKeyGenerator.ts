/**
 * Cache Key Generator Utilities
 * Helper functions untuk generate efficient cache keys
 */

import type { DoaFilter } from '~/types/doa'

/**
 * Generate efficient cache key dari DoaFilter parameters
 * Lebih efisien daripada JSON.stringify
 * @param params - Filter parameters
 * @returns Cache key string
 * @example
 * generateDoaCacheKey({ grup: 'Pagi' })
 * // Returns: 'doa-list-grup:Pagi'
 * 
 * generateDoaCacheKey({ grup: 'Pagi', tag: 'puasa' })
 * // Returns: 'doa-list-grup:Pagi-tag:puasa'
 */
export function generateDoaCacheKey(params?: DoaFilter): string {
  const parts = ['doa-list']
  
  if (params?.grup) {
    parts.push(`grup:${params.grup}`)
  }
  if (params?.tag) {
    parts.push(`tag:${params.tag}`)
  }
  
  return parts.join('-')
}

/**
 * Generate cache key untuk doa detail
 * @param id - Doa ID
 * @returns Cache key string
 * @example
 * generateDoaDetailCacheKey(1) // 'doa-detail-1'
 */
export function generateDoaDetailCacheKey(id: string | number): string {
  return `doa-detail-${id}`
}

/**
 * Generate cache key untuk jadwal shalat
 * @param provinsi - Province name
 * @param kabkota - City name
 * @param bulan - Month number (1-12)
 * @param tahun - Year
 * @returns Cache key string
 * @example
 * generateJadwalShalatCacheKey('Jawa Barat', 'Bogor', 1, 2026)
 * // Returns: 'jadwal-shalat-jawa-barat-bogor-1-2026'
 */
export function generateJadwalShalatCacheKey(
  provinsi: string,
  kabkota: string,
  bulan: number,
  tahun: number
): string {
  return [
    'jadwal-shalat',
    provinsi.toLowerCase().replace(/\s+/g, '-'),
    kabkota.toLowerCase().replace(/\s+/g, '-'),
    bulan,
    tahun
  ].join('-')
}

/**
 * Generate cache key untuk imsakiyah
 * @param provinsi - Province name
 * @param kabkota - City name
 * @returns Cache key string
 * @example
 * generateImsakiyahCacheKey('Jawa Barat', 'Bogor')
 * // Returns: 'imsakiyah-jawa-barat-bogor'
 */
export function generateImsakiyahCacheKey(provinsi: string, kabkota: string): string {
  return [
    'imsakiyah',
    provinsi.toLowerCase().replace(/\s+/g, '-'),
    kabkota.toLowerCase().replace(/\s+/g, '-')
  ].join('-')
}

/**
 * Generate cache key untuk provinsi list
 * @returns Cache key string
 */
export function generateProvinceCacheKey(): string {
  return 'provinces-list'
}

/**
 * Generate cache key untuk cities list
 * @param provinsi - Province name
 * @returns Cache key string
 * @example
 * generateCitiesCacheKey('Jawa Barat')
 * // Returns: 'cities-list-jawa-barat'
 */
export function generateCitiesCacheKey(provinsi: string): string {
  return `cities-list-${provinsi.toLowerCase().replace(/\s+/g, '-')}`
}

/**
 * Normalize string untuk cache key (lowercase, replace spaces)
 * @param str - String to normalize
 * @returns Normalized string
 * @example
 * normalizeForCache('Jawa Barat')
 * // Returns: 'jawa-barat'
 */
export function normalizeForCache(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

/**
 * Create composite cache key dari multiple parameters
 * @param prefix - Cache key prefix (e.g., 'doa-filter')
 * @param params - Object dengan parameter
 * @returns Cache key string
 * @example
 * createCompositeCacheKey('doa-filter', { grup: 'Pagi', tag: 'puasa', limit: 10 })
 * // Returns: 'doa-filter-grup:Pagi-tag:puasa-limit:10'
 */
export function createCompositeCacheKey(prefix: string, params: Record<string, any>): string {
  const parts = [prefix]
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      parts.push(`${key}:${value}`)
    }
  })
  
  return parts.join('-')
}
