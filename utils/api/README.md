# 🚨 API Error Handlers - Consistent Error Management

Helper functions untuk handle API errors dengan pattern yang konsisten dan user-friendly messages.

## 📂 File

- [errorHandler.ts](./errorHandler.ts) - Semua error handler functions

## 🎯 Mengapa Error Handling Penting?

Handling error dengan baik:
- ✅ **Consistent behavior** - Semua error di-handle dengan cara yang sama
- ✅ **User-friendly** - User tahu apa yang salah & bagaimana cara memperbaikinya
- ✅ **Debugging** - Developer bisa lihat error yang sebenarnya untuk fix
- ✅ **Graceful degradation** - App tidak crash, tetap bisa digunakan

## 🔧 Fungsi-Fungsi

### 1. `ApiError` (Custom Error Class)

Class untuk custom API error dengan structured information.

```typescript
import { ApiError } from '~/utils'

// Throw custom error
throw new ApiError(
  'Gagal fetch doa',
  'DOA_FETCH_ERROR',
  500,
  originalError
)

// Access error properties
catch (error) {
  if (error instanceof ApiError) {
    console.log(error.message)      // 'Gagal fetch doa'
    console.log(error.code)         // 'DOA_FETCH_ERROR'
    console.log(error.statusCode)   // 500
    console.log(error.originalError) // original error object
  }
}
```

**Kapan digunakan:**
- Throw error di composables saat API call gagal
- Pass additional context untuk debugging
- Distinguish dari generic Error

**Properties:**
- `message` - User-friendly error message
- `code` - Error code untuk identify jenis error
- `statusCode` - HTTP status code (optional)
- `originalError` - Original error dari API/network (optional)

---

### 2. `getErrorMessage(error: any, fallbackMessage?: string): string`

Parse error object dan extract user-friendly message.

```typescript
import { getErrorMessage } from '~/utils'

// Dari error.message
const error1 = new Error('Connection failed')
getErrorMessage(error1)  // 'Connection failed'

// Dari error.data.message (API response)
const error2 = { data: { message: 'Invalid ID' } }
getErrorMessage(error2)  // 'Invalid ID'

// String error
getErrorMessage('Something went wrong')  // 'Something went wrong'

// Fallback jika tidak ada message
getErrorMessage(null, 'Terjadi kesalahan')  // 'Terjadi kesalahan'
```

**Kapan digunakan:**
- Extract message dari berbagai error format
- Normalize error message untuk display
- Fallback message jika tidak ada error detail

**Cek urutan:**
1. `error.message`
2. `error.data.message`
3. String jika error adalah string
4. `error.response.data.message`
5. Fallback message

---

### 3. `isAbortError(error: any): boolean`

Cek apakah error adalah AbortError (user cancel request).

```typescript
import { isAbortError } from '~/utils'

try {
  const data = await fetchData()
} catch (error) {
  if (isAbortError(error)) {
    // User cancel, tidak perlu alert
    console.log('User cancelled request')
  } else {
    // Error sebenarnya, tampilkan ke user
    showError(error)
  }
}
```

**Kapan digunakan:**
- Distinguish user cancel vs actual error
- Avoid showing error message untuk cancel
- Log atau skip handling untuk abort

**Karakteristik:**
- `error.name === 'AbortError'`
- `error.code === 'ABORT_ERR'`

---

### 4. `isNetworkError(error: any): boolean`

Cek apakah error adalah network/connectivity error.

```typescript
import { isNetworkError } from '~/utils'

catch (error) {
  if (isNetworkError(error)) {
    showMessage('Periksa koneksi internet Anda')
  } else if (isValidationError(error)) {
    showMessage('Data tidak valid')
  } else {
    showMessage('Error server')
  }
}
```

**Kapan digunakan:**
- Detect connectivity issues
- Show appropriate message ke user
- Suggest user untuk check internet

**Karakteristik:**
- Message include 'network' atau 'fetch'
- Error code: `ECONNREFUSED`, `ENOTFOUND`

---

### 5. `isTimeoutError(error: any): boolean`

Cek apakah error adalah timeout.

```typescript
import { isTimeoutError } from '~/utils'

catch (error) {
  if (isTimeoutError(error)) {
    showMessage('Request timeout, coba lagi')
  } else if (isNetworkError(error)) {
    showMessage('Koneksi internet error')
  }
}
```

**Kapan digunakan:**
- Detect timeout errors
- Suggest retry action ke user
- Different handling dari network error

**Karakteristik:**
- Message include 'timeout'
- Error code: `ECONNABORTED`, `ETIMEDOUT`

---

### 6. `isValidationError(error: any): boolean`

Cek apakah error adalah validation error (400 Bad Request).

```typescript
import { isValidationError } from '~/utils'

catch (error) {
  if (isValidationError(error)) {
    // Tampilkan validation error detail
    showFormError(error.details)
  }
}
```

**Kapan digunakan:**
- Detect form validation errors
- Show detailed validation messages
- Highlight invalid fields

**Karakteristik:**
- `statusCode === 400`
- `code === 'VALIDATION_ERROR'`

---

### 7. `isNotFoundError(error: any): boolean`

Cek apakah error adalah 404 Not Found.

```typescript
import { isNotFoundError } from '~/utils'

catch (error) {
  if (isNotFoundError(error)) {
    showMessage('Data tidak ditemukan')
    navigateTo('/404')
  }
}
```

**Kapan digunakan:**
- Detect 404 errors
- Show "not found" message
- Redirect ke 404 page

**Karakteristik:**
- `statusCode === 404`
- `error.code === 'NOT_FOUND'`

---

### 8. `isUnauthorizedError(error: any): boolean`

Cek apakah error adalah 401 Unauthorized.

```typescript
import { isUnauthorizedError } from '~/utils'

catch (error) {
  if (isUnauthorizedError(error)) {
    clearAuth()
    navigateTo('/login')
  }
}
```

**Kapan digunakan:**
- Detect unauthorized (auth expired/invalid)
- Clear auth state
- Redirect ke login

**Karakteristik:**
- `statusCode === 401`
- `error.code === 'UNAUTHORIZED'`

---

### 9. `standardizeError(error: any): ApiError`

Convert error ke standardized ApiError format.

```typescript
import { standardizeError } from '~/utils'

try {
  const data = await fetch('/api/data')
} catch (error) {
  const standardized = standardizeError(error)
  console.log(standardized.code)       // Error code
  console.log(standardized.message)    // User message
  console.log(standardized.statusCode) // HTTP status
}
```

**Kapan digunakan:**
- Normalize berbagai error format ke ApiError
- Ensure consistent error structure
- Easier debugging dengan standardized format

---

### 10. `logError(error: any, context?: string): void`

Log error dengan structured format untuk debugging.

```typescript
import { logError } from '~/utils'

try {
  const data = await fetchSchedule()
} catch (error) {
  logError(error, 'fetchSchedule')
  // Logs: [ERROR] fetchSchedule: Network connection failed
}
```

**Kapan digunakan:**
- Structured logging untuk debugging
- Track error context untuk di-analyze
- Better than `console.error()`

**Include:**
- Timestamp
- Context (function/page name)
- Error message
- Stack trace

---

### 11. `getUserFriendlyMessage(error: any): string`

Convert error ke user-friendly message dalam bahasa Indonesia.

```typescript
import { getUserFriendlyMessage } from '~/utils'

catch (error) {
  const message = getUserFriendlyMessage(error)
  toast.error(message)
}
```

**Kapan digunakan:**
- Display error message ke user
- Auto-translate technical error ke user language
- Consistent messaging

**Contoh output:**
- Network error → "Periksa koneksi internet Anda"
- Timeout → "Permintaan timeout, silakan coba lagi"
- 404 → "Data tidak ditemukan"
- Validation error → "Data yang dikirim tidak valid"

---

### 12. `createErrorResponse(statusCode: number, message: string, code?: string): any`

Create standardized error response object.

```typescript
import { createErrorResponse } from '~/utils'

return createErrorResponse(
  500,
  'Internal Server Error',
  'INTERNAL_ERROR'
)
// Returns: { statusCode: 500, message: '...', code: 'INTERNAL_ERROR', success: false }
```

**Kapan digunakan:**
- Create consistent error response
- Return dari API route handler
- Standardize response format

---

### 13. `handleApiError(error: any, context?: string): never`

Handle error dan throw dengan structured format.

```typescript
import { handleApiError } from '~/utils'

try {
  const data = await fetchData()
} catch (error) {
  handleApiError(error, 'useDoa')
  // Throws standardized error
}
```

**Kapan digunakan:**
- Centralized error handling
- Wrap error dengan context
- Standardize throw format

---

## 💡 Pattern untuk Pemula

### Pattern: Try-Catch di Composable

```typescript
import { handleApiError, getErrorMessage } from '~/utils'

export function useFetchData() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/data')
      data.value = response
    } catch (err) {
      error.value = getErrorMessage(err, 'Gagal fetch data')
      logError(err, 'useFetchData')
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetch }
}
```

### Pattern: Check Error Type untuk Action Berbeda

```typescript
import {
  isNetworkError,
  isTimeoutError,
  isUnauthorizedError,
  getErrorMessage
} from '~/utils'

try {
  await fetchSchedule()
} catch (error) {
  if (isNetworkError(error)) {
    showMessage('Check internet connection')
  } else if (isTimeoutError(error)) {
    showMessage('Request timeout, retry?')
  } else if (isUnauthorizedError(error)) {
    logout()
    navigateTo('/login')
  } else {
    showError(getErrorMessage(error))
  }
}
```

### Pattern: Re-throw dengan Context

```typescript
import { handleApiError } from '~/utils'

export async function fetchUserData(userId: string) {
  try {
    return await $fetch(`/api/users/${userId}`)
  } catch (error) {
    // Add context ke error
    handleApiError(error, `fetchUserData(${userId})`)
  }
}
```

---

## 🔗 Lihat Juga

- [../formatters](../formatters) - Format tanggal & waktu
- [../validators](../validators) - Validasi data
- [../cache](../cache) - Generate cache keys
- [../../CONTRIBUTING_GUIDE.md](../../CONTRIBUTING_GUIDE.md) - Panduan menambah error handler baru
