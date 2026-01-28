export interface DoaItem {
    id: number
    grup: string
    nama: string
    ar: string
    tr: string
    idn: string
    tentang?: string
    tag: string[]
}

export interface DoaDetail extends DoaItem {
    // DoaDetail sama dengan DoaItem karena API mengembalikan struktur yang sama
}

export interface DoaFilter {
    grup?: string
    tag?: string
}

export interface DoaApiResponse {
    status: string
    total: number
    data: DoaItem[]
}

export interface DoaDetailApiResponse {
    status: string
    data: DoaDetail
}
