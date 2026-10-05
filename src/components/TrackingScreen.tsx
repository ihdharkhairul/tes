import React from 'react';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Check, 
  GitCommit, 
  Map as MapIcon, 
  Clock 
} from 'lucide-react';
import { ReportItem } from '../types';

interface TrackingScreenProps {
  report: ReportItem;
  onBack: () => void;
  onOpenMap: () => void;
  onShare: (report: ReportItem) => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  report,
  onBack,
  onOpenMap,
  onShare
}) => {
  // Determine step milestones based on report status
  const isSelesai = report.status === 'selesai';
  const isDitindak = report.status === 'ditindak' || isSelesai;
  const isVerifikasi = report.status === 'diproses' || isDitindak;

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Tracking Status Laporan</h3>
            <p className="text-[11px] font-mono text-blue-600 font-bold">
              #{report.ticketNumber}
            </p>
          </div>
        </div>

        <button
          onClick={() => onShare(report)}
          title="Bagikan tautan laporan"
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Summary Header Card */}
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex gap-3 shadow-xs">
          <img
            src={report.imageUrl}
            alt={report.title}
            className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-slate-200"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  report.status === 'selesai'
                    ? 'bg-emerald-100 text-emerald-800'
                    : report.status === 'ditindak'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {report.statusLabel}
              </span>

              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                {report.confidenceScore}% AI
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 truncate">{report.title}</h4>

            <p className="text-xs text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{report.address}</span>
            </p>

            <p className="text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Dilaporkan: {report.date}</span>
            </p>
          </div>
        </div>

        {/* TIMELINE STATUS TRACKING REALTIME */}
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm mb-3.5 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-blue-600" />
            <span>Progres Penanganan Kerusakan</span>
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {/* Step 1: Laporan Dikirimkan (Always Done) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Laporan Dikirimkan</p>
                  <span className="text-[10px] text-slate-400">{report.date}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Laporan berhasil terunggah ke database dinas terkait.
                </p>
              </div>
            </div>

            {/* Step 2: Validasi AI Selesai (Always Done) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">Validasi AI Selesai</p>
                  <span className="text-[10px] text-slate-400">Terverifikasi</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Citra diklasifikasikan sebagai {report.category} dengan confidence{' '}
                  {report.confidenceScore}%.
                </p>
              </div>
            </div>

            {/* Step 3: Verifikasi Petugas */}
            <div className="relative">
              {isDitindak ? (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-blue-100 shadow-xs animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl border ${
                  !isDitindak ? 'bg-blue-50/70 border-blue-200' : 'bg-transparent border-transparent p-0'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      !isDitindak ? 'text-blue-900' : 'text-slate-800'
                    }`}
                  >
                    Verifikasi Petugas Lapangan
                  </p>
                  {!isDitindak && (
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-100/70 px-2 py-0.5 rounded-full">
                      Sedang Berjalan
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    !isDitindak ? 'text-blue-800/80' : 'text-slate-500'
                  }`}
                >
                  Petugas pemeriksa wilayah Sleman meninjau validasi dan menjadwalkan inspeksi
                  lapangan.
                </p>
              </div>
            </div>

            {/* Step 4: Diteruskan ke Tim Reaksi Cepat */}
            <div
              className={`relative ${
                report.status === 'ditindak'
                  ? 'opacity-100'
                  : isSelesai
                  ? 'opacity-100'
                  : 'opacity-50'
              }`}
            >
              {isSelesai ? (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : report.status === 'ditindak' ? (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-amber-100 shadow-xs animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
              ) : (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                  4
                </div>
              )}
              <div
                className={`p-3 rounded-2xl border ${
                  report.status === 'ditindak'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-transparent border-transparent p-0'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      report.status === 'ditindak' ? 'text-amber-900' : 'text-slate-700'
                    }`}
                  >
                    Diteruskan ke Tim Reaksi Cepat
                  </p>
                  {report.status === 'ditindak' && (
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                      Pengerjaan Dimulai
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    report.status === 'ditindak' ? 'text-amber-800/80' : 'text-slate-400'
                  }`}
                >
                  Penugasan mandor dan armada pengaspalan hotmix di titik kerusakan.
                </p>
              </div>
            </div>

            {/* Step 5: Pekerjaan Selesai */}
            <div className={`relative ${isSelesai ? 'opacity-100' : 'opacity-50'}`}>
              {isSelesai ? (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-emerald-100 shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                  5
                </div>
              )}
              <div
                className={`p-3 rounded-2xl border ${
                  isSelesai
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-transparent border-transparent p-0'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      isSelesai ? 'text-emerald-900' : 'text-slate-700'
                    }`}
                  >
                    Pekerjaan Selesai
                  </p>
                  {isSelesai && (
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      Tuntas
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-relaxed ${
                    isSelesai ? 'text-emerald-800/80' : 'text-slate-400'
                  }`}
                >
                  Pengaspalan dituntaskan dan jalan kembali aman dilalui pengendara.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details Card */}
        <div>
          <h4 className="font-extrabold text-slate-900 text-sm mb-2">Lokasi Terdaftar</h4>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MapIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Koordinat GPS Aktif</p>
                <p className="text-[10px] font-mono text-slate-500 truncate">
                  {report.latitude}, {report.longitude}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenMap}
              className="px-3 py-1.5 bg-white border border-slate-200 text-blue-600 font-bold rounded-xl text-xs hover:bg-slate-100 active:scale-95 transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Lihat Peta
            </button>
          </div>
        </div>

        {/* Catatan Pelapor */}
        {report.notes && (
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700 mb-1">Catatan Warga Pelapor:</p>
            <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{report.notes}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};
