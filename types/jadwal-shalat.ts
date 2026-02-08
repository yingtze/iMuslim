export interface JadwalShalatItem {
  tanggal: number;
  tanggal_lengkap: string;
  hari: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface JadwalShalatResponse {
  provinsi: string;
  kabkota: string;
  bulan: number;
  tahun: number;
  bulan_nama: string;
  jadwal: JadwalShalatItem[];
}

export interface JadwalShalatFilter {
  provinsi?: string;
  kabkota?: string;
  bulan?: number;
  tahun?: number;
}
