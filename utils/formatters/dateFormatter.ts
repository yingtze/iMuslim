/**
 * Date & Time Formatter Utilities
 * Helper functions untuk format tanggal dan waktu
 */

/**
 * Peta nama hari dalam bahasa Indonesia
 */
const HARI_MAP: Record<string, string> = {
  'Senin': 'Senin',
  'Selasa': 'Selasa',
  'Rabu': 'Rabu',
  'Kamis': 'Kamis',
  'Jumat': 'Jumat',
  'Sabtu': 'Sabtu',
  'Minggu': 'Minggu',
}

/**
 * Get nama hari dalam bahasa Indonesia
 * @param hari - Nama hari (dalam bahasa Indonesia atau Inggris)
 * @returns Nama hari dalam bahasa Indonesia
 * @example
 * getNamaHari('Senin') // 'Senin'
 * getNamaHari('Monday') // 'Monday' (fallback)
 */
export function getNamaHari(hari: string): string {
  return HARI_MAP[hari] || hari
}

/**
 * Format tanggal ke format yang readable
 * @param tanggal - Nomor tanggal (1-31)
 * @returns Tanggal formatted (e.g., "01 Jan")
 * @example
 * formatTanggal(5) // '05 Jan'
 */
export function formatTanggal(tanggal: number): string {
  const bulanIndo = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
  ]
  const now = new Date()
  const bulan = bulanIndo[now.getMonth()]
  return `${String(tanggal).padStart(2, '0')} ${bulan}`
}

/**
 * Format waktu shalat (HH:MM)
 * @param waktu - String waktu (e.g., "04:30")
 * @returns Waktu formatted
 * @example
 * formatWaktuShalat('4:30') // '04:30'
 */
export function formatWaktuShalat(waktu: string): string {
  const [jam, menit] = waktu.split(':')
  return `${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')}`
}

/**
 * Get bulan sekarang dalam angka
 * @returns Nomor bulan (1-12)
 * @example
 * getBulanSekarang() // 1 (Januari)
 */
export function getBulanSekarang(): number {
  return new Date().getMonth() + 1
}

/**
 * Get tahun sekarang
 * @returns Tahun (e.g., 2026)
 */
export function getTahunSekarang(): number {
  return new Date().getFullYear()
}

/**
 * Get tanggal hari ini
 * @returns Nomor tanggal hari ini (1-31)
 */
export function getTanggalHariIni(): number {
  return new Date().getDate()
}

/**
 * Format selisih waktu ke format readable
 * @param jamMulai - Waktu mulai (HH:MM)
 * @param jamSelesai - Waktu selesai (HH:MM)
 * @returns Durasi (e.g., "4 jam 30 menit")
 * @example
 * formatDurasi('04:00', '08:30') // '4 jam 30 menit'
 */
export function formatDurasi(jamMulai: string, jamSelesai: string): string {
  const [jamM, menitM] = jamMulai.split(':').map(Number)
  const [jamS, menitS] = jamSelesai.split(':').map(Number)
  
  const totalMenitMulai = jamM * 60 + menitM
  const totalMenitSelesai = jamS * 60 + menitS
  const durasi = totalMenitSelesai - totalMenitMulai
  
  const jam = Math.floor(durasi / 60)
  const menit = durasi % 60
  
  const parts = []
  if (jam > 0) parts.push(`${jam} jam`)
  if (menit > 0) parts.push(`${menit} menit`)
  
  return parts.join(' ')
}
