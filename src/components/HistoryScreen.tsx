import React, { useState } from 'react';
import { 
  Archive, 
  MapPin, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { ReportItem } from '../types';

interface HistoryScreenProps {
  reports: ReportItem[];
  draftCount: number;
  onOpenDrafts: () => void;
  onSelectReport: (report: ReportItem) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  reports,
  draftCount,
  onOpenDrafts,
  onSelectReport
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('semua');

  const filteredReports = reports.filter((report) => {
    if (activeFilter === 'semua') return true;
    return report.status === activeFilter;
  });

  const diprosesCount = reports.filter((r) => r.status === 'diproses').length;
  const ditindakCount = reports.filter((r) => r.status === 'ditindak').length;
  const selesaiCount = reports.filter((r) => r.status === 'selesai').length;

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Riwayat Laporan</h3>
          <p className="text-[11px] text-slate-500">
            Daftar laporan kerusakan yang telah Anda ajukan
          </p>
        </div>

        <button
          onClick={onOpenDrafts}
          className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-200 transition-colors cursor-pointer border border-amber-200"
        >
          <Archive className="w-3.5 h-3.5" />
          <span>Draft ({draftCount})</span>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveFilter('semua')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'semua'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({reports.length})
          </button>
          <button
            onClick={() => setActiveFilter('diproses')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'diproses'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Diproses ({diprosesCount})
          </button>
          <button
            onClick={() => setActiveFilter('ditindak')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'ditindak'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ditindaklanjuti ({ditindakCount})
          </button>
          <button
            onClick={() => setActiveFilter('selesai')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'selesai'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Selesai ({selesaiCount})
          </button>
        </div>

        {/* List Laporan Cards */}
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
              <p className="text-xs font-bold text-slate-600">Tidak ada laporan dengan status ini</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Ubah filter tab untuk melihat laporan lainnya.
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md shadow-xs cursor-pointer transition-all group"
              >
                <div className="flex gap-3">
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-mono px-1 rounded">
                      {report.confidenceScore}%
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono text-slate-400">
                        #{report.ticketNumber}
                      </span>
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
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {report.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{report.address}</span>
                    </p>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400">{report.date}</span>
                      <span className="text-blue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Lihat Tracking</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
