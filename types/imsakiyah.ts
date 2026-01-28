export interface ImsakiyahSchedule {
    tanggal: number
    imsak: string
    subuh: string
    terbit: string
    dhuha: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
}

export interface ImsakiyahData {
    provinsi: string
    kabkota: string
    hijriah: string
    masehi: string
    imsakiyah: ImsakiyahSchedule[]
}

export interface ImsakiyahResponse {
    code: number
    message: string
    data: ImsakiyahData
}

export interface ProvinceResponse {
    code: number
    message: string
    data: string[]
}

export interface CityResponse {
    code: number
    message: string
    data: string[]
}
