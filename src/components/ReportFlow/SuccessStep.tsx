import React from 'react';
import { CheckCheck, Activity, Home } from 'lucide-react';
import { ReportItem } from '../../types';

interface SuccessStepProps {
  report: ReportItem;
  onTrackReport: (report: ReportItem) => void;
  onGoHome: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  report,
  onTrackReport,
  onGoHome
}) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white flex flex-col justify-between p-6">
      <div className="pt-4 flex flex-col items-center text-center">
        {/* Big Success Badge */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <CheckCheck className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 mb-2">
          Laporan Resmi Diterima
        </span>

        <h2 className="text-2xl font-black text-slate-900 mb-1">Laporan Berhasil Dikirim!</h2>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Terima kasih telah berkontribusi menjaga keselamatan jalan. Laporan Anda telah tercatat
          pada sistem monitoring dinas terpadu.
        </p>

        {/* Ticket Card Info */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-6 text-left space-y-2.5 shadow-xs">
          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500">Nomor Laporan:</span>
            <span className="font-mono font-bold text-blue-600">#{report.ticketNumber}</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500">Tanggal Pengajuan:</span>
            <span className="font-semibold text-slate-800">{report.timestamp}</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
            <span className="text-slate-500">Kategori:</span>
            <span className="font-semibold text-slate-800">
              {report.category} ({report.confidenceScore}% AI)
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Status Awal:</span>
            <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full text-[10px]">
              {report.statusLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5 pb-2">
        <button
          onClick={() => onTrackReport(report)}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Activity className="w-4 h-4" />
          <span>Lihat Status &amp; Tracking Laporan</span>
        </button>

        <button
          onClick={onGoHome}
          className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
