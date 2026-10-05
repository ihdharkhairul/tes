import React from 'react';
import { 
  Bot, 
  Camera, 
  History, 
  MapPin, 
  Bell, 
  ChevronRight, 
  AlertOctagon, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { ReportItem } from '../types';

interface BerandaScreenProps {
  reports: ReportItem[];
  isOffline: boolean;
  onToggleOffline: () => void;
  onStartReport: () => void;
  onViewHistory: () => void;
  onOpenMap: () => void;
  onSelectReport: (report: ReportItem) => void;
  onOpenProfile: () => void;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  reports,
  isOffline,
  onToggleOffline,
  onStartReport,
  onViewHistory,
  onOpenMap,
  onSelectReport,
  onOpenProfile
}) => {
  const latestReport = reports[0];

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-slate-50 text-slate-800">
      {/* Header with Blue Gradient */}
      <div className="bg-gradient-to-b from-[#1d4ed8] to-[#1e40af] text-white p-5 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              onClick={onOpenProfile}
              className="w-11 h-11 rounded-full bg-white/20 p-0.5 border border-white/40 overflow-hidden cursor-pointer hover:ring-2 hover:ring-white/50 transition-all shrink-0"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Budi Pratama Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-blue-100 font-medium">Selamat Datang,</p>
              <h2 className="text-lg font-bold text-white leading-tight">Budi Pratama 👋</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Offline / Online toggle pill */}
            <button
              onClick={onToggleOffline}
              title="Klik untuk simulasi mode online/offline"
              className="px-2.5 py-1 bg-white/15 hover:bg-white/25 active:scale-95 rounded-full text-[11px] text-white flex items-center gap-1.5 transition-all border border-white/10"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOffline ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
              />
              <span className="font-semibold">{isOffline ? 'Offline (GPS)' : 'Online'}</span>
            </button>

            <button 
              onClick={onOpenProfile}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-blue-700" />
            </button>
          </div>
        </div>

        {/* AI Info Card */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-white">Validasi AI Cepat &amp; Akurat</p>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <p className="text-[11px] text-blue-100 mt-0.5 leading-relaxed">
              Foto kerusakan jalan akan dipindai otomatis oleh model AI untuk mendeteksi lubang dan retakan secara instan.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-5">
        {/* Main CTA: Buat Laporan Super Prominent */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 rounded-3xl p-5 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-6 opacity-15 pointer-events-none">
            <AlertOctagon className="w-40 h-40" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3 backdrop-blur-sm border border-white/20">
              <Navigation className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Ketemu Jalan Rusak di Sekitarmu?</span>
            </div>

            <h3 className="text-xl font-black mb-1 tracking-tight">Laporkan Sekarang</h3>
            <p className="text-xs text-blue-100 mb-4 max-w-[250px] leading-relaxed">
              Hanya 4 langkah mudah: Ambil foto, cek lokasi GPS, isi info, dan AI memvalidasi!
            </p>

            <button
              onClick={onStartReport}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Camera className="w-5 h-5 text-slate-950" />
              <span className="text-base tracking-wide">Buat Laporan Baru</span>
            </button>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewHistory}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3 text-left hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Riwayat Laporan</p>
              <p className="text-[11px] text-slate-500">{reports.length} Laporan Saya</p>
            </div>
          </button>

          <button
            onClick={onOpenMap}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3 text-left hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Peta Sebaran</p>
              <p className="text-[11px] text-slate-500">12 Titik di Sekitar</p>
            </div>
          </button>
        </div>

        {/* Status Laporan Terakhir */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Laporan Terakhir Anda</span>
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </h4>
            <button
              onClick={onViewHistory}
              className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          {latestReport && (
            <div
              onClick={() => onSelectReport(latestReport)}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={latestReport.imageUrl}
                    alt={latestReport.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/75 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-medium">
                    {latestReport.confidenceScore}% AI
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      #{latestReport.ticketNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        latestReport.status === 'selesai'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : latestReport.status === 'ditindak'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {latestReport.statusLabel}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-800 truncate">
                    {latestReport.title}
                  </h5>

                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{latestReport.address}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400">{latestReport.date}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panduan Alur Status */}
        <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-2.5">Arti Tahapan Status Laporan:</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-2 text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
              <span>
                <strong>Diproses:</strong> Validasi awal
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span>
                <strong>Diverifikasi:</strong> Oleh petugas
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span>
                <strong>Ditindak:</strong> Masuk perbaikan
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong>Selesai:</strong> Jalan diperbaiki
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
