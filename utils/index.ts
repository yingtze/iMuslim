/**
 * Utils Index
 * Central export untuk semua utility functions
 */

// Formatters
export {
  getNamaHari,
  formatTanggal,
  formatWaktuShalat,
  getBulanSekarang,
  getTahunSekarang,
  getTanggalHariIni,
  formatDurasi,
  formatTanggalLengkap
} from './formatters/dateFormatter'

// Cache
export {
  generateDoaCacheKey,
  generateDoaDetailCacheKey,
  generateJadwalShalatCacheKey,
  generateImsakiyahCacheKey,
  generateProvinceCacheKey,
  generateCitiesCacheKey,
  normalizeForCache,
  createCompositeCacheKey
} from './cache/cacheKeyGenerator'

// Validators
export {
  isValidDoaItem,
  isValidDoaDetail,
  isValidJadwalShalatItem,
  isValidForShare,
  isNotEmpty,
  isArrayNotEmpty,
  isValidWaktuFormat,
  isValidTanggal,
  isValidBulan,
  isValidTahun,
  isValidProvinsi,
  isValidKabKota,
  isValidLocation
} from './validators/dataValidator'

// API Error Handler
export {
  ApiError,
  getErrorMessage,
  isAbortError,
  isNetworkError,
  isTimeoutError,
  isValidationError,
  isNotFoundError,
  isUnauthorizedError,
  standardizeError,
  logError,
  getUserFriendlyMessage,
  createErrorResponse,
  handleApiError
} from './api/errorHandler'
