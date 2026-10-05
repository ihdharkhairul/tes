import React from 'react';
import { ArrowLeft, ChevronRight, ListOrdered, Info, ShieldCheck } from 'lucide-react';

interface IntroStepProps {
  onBack: () => void;
  onStart: () => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onBack, onStart }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Buat Laporan Baru</h3>
            <p className="text-[11px] text-slate-500">Layanan Pelaporan Infrastruktur Publik</p>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Step Indicator Overview */}
          <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs font-bold text-blue-900 mb-3.5 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              4 Langkah Mudah Pelaporan:
            </p>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                  1
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Ambil / Upload Foto</p>
                  <p className="text-[11px] text-slate-500">Potret kerusakan jalan dengan jelas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Deteksi Lokasi GPS</p>
                  <p className="text-[11px] text-slate-500">Koordinat akurat (bisa offline via GPS HP).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Isi Detail Kerusakan</p>
                  <p className="text-[11px] text-slate-500">Pilih jenis lubang/retak &amp; catatan singkat.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Review &amp; Validasi AI</p>
                  <p className="text-[11px] text-slate-500">Sistem AI memvalidasi sebelum dikirim ke dinas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety & Quality Tips */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              Tips Mengambil Foto:
            </p>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              Pastikan cahaya cukup terang, tidak memotret saat sedang mengemudi, dan selalu jaga keselamatan Anda di jalan raya.
            </p>
          </div>

          {/* Trust badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Terhubung langsung dengan dasbor pemantauan Dinas Pekerjaan Umum dan Bina Marga.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Start CTA */}
      <div className="p-5 pt-2">
        <button
          onClick={onStart}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Mulai Laporan Sekarang</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Dukungan partisipasi warga untuk infrastruktur yang aman
        </p>
      </div>
    </div>
  );
};
