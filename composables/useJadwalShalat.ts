import { ref, computed } from 'vue';

/**
 * Composable untuk mengambil data Jadwal Shalat dari API Equran.id
 * Menyediakan metode untuk fetch provinsi, kabupaten/kota, dan jadwal shalat bulanan
 */
export const useJadwalShalat = () => {
  const provinsi = ref<string[]>([]);
  const kabkota = ref<string[]>([]);
  const jadwal = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetch daftar semua provinsi di Indonesia
   */
  const fetchProvinsi = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://equran.id/api/v2/shalat/provinsi');
      const data = await response.json();
      if (data.code === 200) {
        provinsi.value = data.data || [];
      } else {
        throw new Error(data.message || 'Gagal mengambil provinsi');
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil data provinsi';
      console.error('Error fetching provinces:', error.value);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch daftar kabupaten/kota berdasarkan provinsi yang dipilih
   */
  const fetchKabKota = async (selectedProvinsi: string) => {
    if (!selectedProvinsi) return;
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://equran.id/api/v2/shalat/kabkota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provinsi: selectedProvinsi }),
      });
      const data = await response.json();
      if (data.code === 200) {
        kabkota.value = data.data || [];
      } else {
        throw new Error(data.message || 'Gagal mengambil kabupaten/kota');
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil data kabupaten/kota';
      console.error('Error fetching cities:', error.value);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetch jadwal shalat bulanan untuk kabupaten/kota tertentu
   */
  const fetchJadwalShalat = async (
    selectedProvinsi: string,
    selectedKabKota: string,
    bulan?: number,
    tahun?: number
  ) => {
    if (!selectedProvinsi || !selectedKabKota) return;
    loading.value = true;
    error.value = null;
    try {
      const now = new Date();
      const body: any = {
        provinsi: selectedProvinsi,
        kabkota: selectedKabKota,
        bulan: bulan ?? now.getMonth() + 1,
        tahun: tahun ?? now.getFullYear(),
      };

      const response = await fetch('https://equran.id/api/v2/shalat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.code === 200) {
        jadwal.value = data.data || null;
      } else {
        throw new Error(data.message || 'Gagal mengambil jadwal shalat');
      }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengambil jadwal shalat';
      console.error('Error fetching schedule:', error.value);
    } finally {
      loading.value = false;
    }
  };

  return {
    provinsi: computed(() => provinsi.value),
    kabkota: computed(() => kabkota.value),
    jadwal: computed(() => jadwal.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchProvinsi,
    fetchKabKota,
    fetchJadwalShalat,
  };
};
