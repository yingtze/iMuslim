/**
 * API Error Handler Utilities
 * Helper functions untuk handle API errors dengan consistent pattern
 */

/**
 * Custom error class untuk API errors
 */
export class ApiErrorClass extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Alias untuk ApiErrorClass untuk backward compatibility
 */
export const ApiError = ApiErrorClass

/**
 * Parse API error dan return user-friendly message
 * @param error - Error object
 * @param fallbackMessage - Message jika tidak bisa parse
 * @returns User-friendly error message
 */
export function getErrorMessage(error: any, fallbackMessage = 'Terjadi kesalahan'): string {
  // Check jika error.message
  if (typeof error?.message === 'string') {
    return error.message
  }
  
  // Check jika error.data.message
  if (typeof error?.data?.message === 'string') {
    return error.data.message
  }
  
  // Check jika string
  if (typeof error === 'string') {
    return error
  }
  
  // Check jika API response error
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  
  return fallbackMessage
}

/**
 * Check jika error adalah AbortError (user cancelled)
 * @param error - Error object
 * @returns true jika AbortError
 */
export function isAbortError(error: any): boolean {
  return error?.name === 'AbortError' || error?.code === 'ABORT_ERR'
}

/**
 * Check jika error adalah network error
 * @param error - Error object
 * @returns true jika network error
 */
export function isNetworkError(error: any): boolean {
  return (
    error?.message?.includes('network') ||
    error?.message?.includes('fetch') ||
    error?.code === 'ECONNREFUSED' ||
    error?.code === 'ENOTFOUND'
  )
}

/**
 * Check jika error adalah timeout
 * @param error - Error object
 * @returns true jika timeout
 */
export function isTimeoutError(error: any): boolean {
  return (
    error?.message?.includes('timeout') ||
    error?.code === 'ECONNABORTED' ||
    error?.code === 'ETIMEDOUT'
  )
}

/**
 * Check jika error adalah validation error
 * @param error - Error object
 * @returns true jika validation error
 */
export function isValidationError(error: any): boolean {
  return error?.statusCode === 400 || error?.code === 'VALIDATION_ERROR'
}

/**
 * Check jika error adalah not found
 * @param error - Error object
 * @returns true jika not found
 */
export function isNotFoundError(error: any): boolean {
  return error?.statusCode === 404 || error?.code === 'NOT_FOUND'
}

/**
 * Check jika error adalah unauthorized
 * @param error - Error object
 * @returns true jika unauthorized
 */
export function isUnauthorizedError(error: any): boolean {
  return error?.statusCode === 401 || error?.code === 'UNAUTHORIZED'
}

/**
 * Standardize error untuk logging
 * @param error - Error object
 * @param context - Additional context
 * @returns Standardized error info
 */
export function standardizeError(error: any, context: string = '') {
  return {
    message: getErrorMessage(error),
    code: error?.code,
    statusCode: error?.statusCode,
    isAbort: isAbortError(error),
    isNetwork: isNetworkError(error),
    isTimeout: isTimeoutError(error),
    context,
    timestamp: new Date().toISOString()
  }
}

/**
 * Log error dengan context
 * @param error - Error object
 * @param context - Error context
 */
export function logError(error: any, context: string = ''): void {
  const standardized = standardizeError(error, context)
  console.error(`[${context}]`, standardized)
}

/**
 * Get user-friendly error message berdasarkan error type
 * @param error - Error object
 * @returns User-friendly message
 */
export function getUserFriendlyMessage(error: any): string {
  if (isAbortError(error)) {
    return 'Permintaan dibatalkan'
  }
  
  if (isNetworkError(error)) {
    return 'Gagal terhubung ke jaringan. Periksa koneksi internet Anda.'
  }
  
  if (isTimeoutError(error)) {
    return 'Permintaan timeout. Silakan coba lagi.'
  }
  
  if (isNotFoundError(error)) {
    return 'Data tidak ditemukan.'
  }
  
  if (isUnauthorizedError(error)) {
    return 'Anda tidak memiliki akses untuk resource ini.'
  }
  
  return getErrorMessage(error, 'Terjadi kesalahan. Silakan coba lagi.')
}

/**
 * Create structured error response
 * @param message - Error message
 * @param code - Error code
 * @param details - Additional details
 * @returns Error object
 */
export function createErrorResponse(message: string, code?: string, details?: any) {
  return {
    error: true,
    message,
    code: code || 'UNKNOWN_ERROR',
    details,
    timestamp: new Date().toISOString()
  }
}

/**
 * Handle API error dan throw formatted error
 * @param error - Original error
 * @param context - Error context
 * @throws ApiError dengan formatted message
 */
export function handleApiError(error: any, context: string = ''): never {
  logError(error, context)
  
  throw new ApiErrorClass(
    getUserFriendlyMessage(error),
    error?.code,
    error?.statusCode,
    error
  )
}
