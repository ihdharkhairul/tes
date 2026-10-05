export type ScreenType = 
  | 'splash'
  | 'beranda'
  | 'buat-laporan'
  | 'step-foto'
  | 'step-lokasi'
  | 'step-detail'
  | 'step-review'
  | 'proses-ai'
  | 'hasil-ai'
  | 'sukses'
  | 'tracking'
  | 'riwayat'
  | 'draft-offline'
  | 'profil';

export type DamageCategory = 
  | 'Jalan Berlubang'
  | 'Jalan Retak (Buaya)'
  | 'Jalan Rusak Berat / Amblas'
  | 'Kerusakan Permukaan / Mengelupas';

export type SeverityLevel = 'Ringan' | 'Sedang' | 'Berat';

export type ReportStatus = 'diproses' | 'ditindak' | 'selesai';

export interface ReportItem {
  id: string;
  ticketNumber: string;
  title: string;
  category: DamageCategory;
  severity: SeverityLevel;
  condition: string;
  address: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  date: string;
  timestamp: string;
  status: ReportStatus;
  statusLabel: string;
  confidenceScore: number;
  depthEstimate: string;
  priorityText: string;
  notes?: string;
  currentStepIndex: number;
}

export interface OfflineDraft {
  id: string;
  title: string;
  category: DamageCategory;
  severity: SeverityLevel;
  condition: string;
  address: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  savedAt: string;
  fileSize: string;
  notes?: string;
}

export interface SampleRoadImage {
  name: string;
  url: string;
  category: DamageCategory;
  severity: SeverityLevel;
  estimatedDepth: string;
  confidence: number;
}
