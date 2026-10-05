import { ReportItem, OfflineDraft, SampleRoadImage } from '../types';

export const SAMPLE_ROAD_IMAGES: SampleRoadImage[] = [
  {
    name: 'Jalan Berlubang Dalam (KM 9)',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    category: 'Jalan Berlubang',
    severity: 'Sedang',
    estimatedDepth: '± 12 - 15 cm',
    confidence: 91
  },
  {
    name: 'Retak Buaya Meluas (KM 14)',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    category: 'Jalan Retak (Buaya)',
    severity: 'Sedang',
    estimatedDepth: '± 3 - 5 cm',
    confidence: 88
  },
  {
    name: 'Aspal Amblas Parah',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    category: 'Jalan Rusak Berat / Amblas',
    severity: 'Berat',
    estimatedDepth: '± 20 - 30 cm',
    confidence: 95
  },
  {
    name: 'Permukaan Mengelupas & Kerikil',
    url: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=800&q=80',
    category: 'Kerusakan Permukaan / Mengelupas',
    severity: 'Ringan',
    estimatedDepth: '± 2 - 4 cm',
    confidence: 86
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'lap-104',
    ticketNumber: 'LAP-2025-104',
    title: 'Jalan Berlubang Dalam',
    category: 'Jalan Berlubang',
    severity: 'Sedang',
    condition: 'Masih Terjadi',
    address: 'Jl. Affandi No. 18, Santren, Caturtunggal, Depok, Sleman',
    latitude: '-7.769214',
    longitude: '110.388432',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    date: '01 Mar 2025',
    timestamp: '01 Mar 2025, 09:45 WIB',
    status: 'diproses',
    statusLabel: 'Menunggu Verifikasi Petugas',
    confidenceScore: 91,
    depthEstimate: '± 12 - 15 cm',
    priorityText: 'Sedang - Mendesak',
    notes: 'Lubang cukup dalam sekitar 15 cm di lajur kiri dekat lampu merah, rawan bagi pengendara motor saat hujan tertutup genangan air.',
    currentStepIndex: 2
  },
  {
    id: 'lap-089',
    ticketNumber: 'LAP-2025-089',
    title: 'Jalan Retak & Berlubang KM 9',
    category: 'Jalan Berlubang',
    severity: 'Sedang',
    condition: 'Masih Terjadi',
    address: 'Jl. Kaliurang KM 9, Ngaglik, Sleman',
    latitude: '-7.728910',
    longitude: '110.395120',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    date: '28 Feb 2025',
    timestamp: '28 Feb 2025, 14:15 WIB',
    status: 'ditindak',
    statusLabel: 'Ditindaklanjuti',
    confidenceScore: 94,
    depthEstimate: '± 8 - 12 cm',
    priorityText: 'Tinggi',
    notes: 'Retakan aspal melebar membentuk lubang di tengah lajur utama arah utara.',
    currentStepIndex: 3
  },
  {
    id: 'lap-042',
    ticketNumber: 'LAP-2025-042',
    title: 'Aspal Amblas Dekat Jembatan',
    category: 'Jalan Rusak Berat / Amblas',
    severity: 'Berat',
    condition: 'Sudah Ditambal',
    address: 'Jl. Solo KM 11, Kalasan, Sleman',
    latitude: '-7.781204',
    longitude: '110.453180',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    date: '15 Feb 2025',
    timestamp: '15 Feb 2025, 11:20 WIB',
    status: 'selesai',
    statusLabel: 'Selesai Diperbaiki',
    confidenceScore: 96,
    depthEstimate: '± 25 cm',
    priorityText: 'Sangat Mendesak',
    notes: 'Penambalan hotmix telah diselesaikan oleh Regu Bina Marga Wilayah Timur.',
    currentStepIndex: 4
  }
];

export const INITIAL_DRAFTS: OfflineDraft[] = [
  {
    id: 'draft-01',
    title: 'Jalan Berlubang (Draft #1)',
    category: 'Jalan Berlubang',
    severity: 'Sedang',
    condition: 'Masih Terjadi',
    address: 'Jl. Affandi No. 18, Sleman',
    latitude: '-7.769214',
    longitude: '110.388432',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    savedAt: 'Hari ini, 09:30',
    fileSize: '1.8 MB',
    notes: 'Tersimpan otomatis saat koneksi offline di lapangan.'
  }
];

export const MAP_MARKERS = [
  {
    id: 1,
    title: 'Lubang KM 9',
    category: 'Jalan Berlubang',
    lat: -7.728910,
    lng: 110.395120,
    status: 'ditindak',
    color: 'amber',
    score: '94%'
  },
  {
    id: 2,
    title: 'Lubang Santren Affandi',
    category: 'Jalan Berlubang',
    lat: -7.769214,
    lng: 110.388432,
    status: 'diproses',
    color: 'red',
    score: '91%'
  },
  {
    id: 3,
    title: 'Retak Buaya Seturan',
    category: 'Jalan Retak',
    lat: -7.773100,
    lng: 110.407200,
    status: 'diproses',
    color: 'red',
    score: '88%'
  },
  {
    id: 4,
    title: 'Perbaikan Jembatan Kalasan',
    category: 'Jalan Rusak Berat',
    lat: -7.781204,
    lng: 110.453180,
    status: 'selesai',
    color: 'emerald',
    score: '96%'
  },
  {
    id: 5,
    title: 'Jalan Berlubang Maguwoharjo',
    category: 'Jalan Berlubang',
    lat: -7.761000,
    lng: 110.428000,
    status: 'ditindak',
    color: 'amber',
    score: '92%'
  },
  {
    id: 6,
    title: 'Permukaan Mengelupas Gejayan',
    category: 'Permukaan Lepas',
    lat: -7.778000,
    lng: 110.389000,
    status: 'selesai',
    color: 'emerald',
    score: '89%'
  }
];
