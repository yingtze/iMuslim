import { defineStore } from 'pinia';
import { ref, computed, isRef, type Ref } from 'vue';
import type { JadwalShalatResponse, JadwalShalatItem } from '~/types/jadwal-shalat';
import { getNamaHari, getTanggalHariIni } from '~/utils';

export const useJadwalShalatStore = defineStore('jadwalShalat', () => {
  const provinsiList = ref<string[]>([]);
  const kabkotaList = ref<string[]>([]);
  const scheduleData = ref<JadwalShalatResponse | null>(null);

  const selectedProvinsi = ref<string>('');
  const selectedKabKota = ref<string>('');
  const selectedBulan = ref<number>(new Date().getMonth() + 1);
  const selectedTahun = ref<number>(new Date().getFullYear());

  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch daftar provinsi
  const fetchProvinces = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://equran.id/api/v2/shalat/provinsi');
      const data = await response.json();
      if (data.code === 200) {
        provinsiList.value = data.data || [];
      } else {
        throw new Error(data.message || 'Gagal mengambil provinsi');
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil daftar provinsi';
    } finally {
      loading.value = false;
    }
  };

  // Fetch daftar kabupaten/kota
  const fetchCities = async (provinsi?: string | Ref<string>) => {
    const prov = isRef(provinsi) ? provinsi.value : (provinsi || selectedProvinsi.value);
    if (!prov) {
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://equran.id/api/v2/shalat/kabkota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provinsi: prov }),
      });
      const data = await response.json();
      if (data.code === 200) {
        kabkotaList.value = data.data || [];
      } else {
        throw new Error(data.message || 'Gagal mengambil kabupaten/kota');
      }
      selectedKabKota.value = ''; // Reset kota saat provinsi berubah
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil daftar kabupaten/kota';
    } finally {
      loading.value = false;
    }
  };

  // Fetch jadwal shalat bulanan
  const fetchSchedule = async (
    provinsi?: string,
    kabkota?: string,
    bulan?: number,
    tahun?: number
  ) => {
    const prov = provinsi || selectedProvinsi.value;
    const kota = kabkota || selectedKabKota.value;

    if (!prov || !kota) return;

    loading.value = true;
    error.value = null;
    try {
      const body = {
        provinsi: prov,
        kabkota: kota,
        bulan: bulan ?? selectedBulan.value,
        tahun: tahun ?? selectedTahun.value,
      };

      const response = await fetch('https://equran.id/api/v2/shalat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.code === 200) {
        scheduleData.value = data.data || null;
      } else {
        throw new Error(data.message || 'Gagal mengambil jadwal shalat');
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil jadwal shalat';
    } finally {
      loading.value = false;
    }
  };

  // Computed properties
  const jadwalShalat = computed(() => scheduleData.value?.jadwal || []);

  const todaySchedule = computed(() => {
    const today = getTanggalHariIni();
    return jadwalShalat.value.find((item) => item.tanggal === today) || null;
  });

  const highlightTimes = computed(() => {
    if (!todaySchedule.value) return {};
    return {
      subuh: todaySchedule.value.subuh,
      dzuhur: todaySchedule.value.dzuhur,
      ashar: todaySchedule.value.ashar,
      maghrib: todaySchedule.value.maghrib,
      isya: todaySchedule.value.isya,
    };
  });

  // Helper untuk mendapatkan nama hari
  const getNamaHariHelper = (hari: string): string => {
    return getNamaHari(hari);
  };

  return {
    // State - return refs directly for watchers
    provinsiList,
    kabkotaList,
    scheduleData,
    selectedProvinsi,
    selectedKabKota,
    selectedBulan,
    selectedTahun,
    loading,
    error,

    // Computed
    jadwalShalat,
    todaySchedule,
    highlightTimes,

    // Methods
    setSelectedProvinsi: (value: string) => {
      selectedProvinsi.value = value;
    },
    setSelectedKabKota: (value: string) => {
      selectedKabKota.value = value;
    },
    setSelectedBulan: (value: number) => {
      selectedBulan.value = value;
    },
    setSelectedTahun: (value: number) => {
      selectedTahun.value = value;
    },
    fetchProvinces,
    fetchCities,
    fetchSchedule,
    getNamaHari: getNamaHariHelper,
  };
});