import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { DamageCategory, SeverityLevel } from '../../types';

interface AiResultStepProps {
  photoUrl: string;
  category: DamageCategory;
  severity: SeverityLevel;
  confidenceScore: number;
  depthEstimate: string;
  priorityText: string;
  onRetakePhoto: () => void;
  onFinish: () => void;
}

export const AiResultStep: React.FC<AiResultStepProps> = ({
  photoUrl,
  category,
  confidenceScore,
  depthEstimate,
  priorityText,
  onRetakePhoto,
  onFinish
}) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white flex flex-col justify-between">
      <div>
        {/* Top Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Hasil Validasi AI</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Terverifikasi AI</span>
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* Analisis AI Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden border border-slate-700/60">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Hasil Pemindaian AI
                </span>
              </div>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                Status: Sukses
              </span>
            </div>

            {/* Visual Bounding Box Overlay */}
            <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-700/80 bg-black">
              <img
                src={photoUrl}
                alt="Kerusakan terdeteksi"
                className="w-full h-44 object-cover opacity-90"
              />

              {/* Animated Scan Laser line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-laser shadow-[0_0_8px_#38bdf8] pointer-events-none" />

              {/* Bounding box visual on pothole */}
              <div className="absolute inset-x-8 inset-y-6 border-2 border-dashed border-amber-400 rounded-lg pointer-events-none flex items-start justify-end p-1 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <span>Pothole Area #1</span>
                  <span className="font-mono">({confidenceScore}%)</span>
                </span>
              </div>
            </div>

            {/* Stats Matrix 2x2 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block mb-0.5">Deteksi Kerusakan:</span>
                <span className="font-extrabold text-white text-xs sm:text-sm truncate block">
                  {category}
                </span>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block mb-0.5">Confidence Score:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-emerald-400 text-sm">
                    {confidenceScore}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">(Tinggi)</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block mb-0.5">Estimasi Kedalaman:</span>
                <span className="font-bold text-white text-xs">{depthEstimate}</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <span className="text-[10px] text-slate-400 block mb-0.5">Prioritas Penanganan:</span>
                <span className="font-bold text-amber-400 text-xs">{priorityText}</span>
              </div>
            </div>
          </div>

          {/* Keterangan Transparansi Petugas */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Pemberitahuan Warga:</strong> Skor AI merupakan rekomendasi pendukung. Tim
              teknis Dinas Pekerjaan Umum akan memvalidasi kembali sebelum mengirimkan regu
              penambal jalan ke lokasi.
            </p>
          </div>

          {/* Fallback option */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
              <span>Hasil tidak sesuai dengan kenyataan?</span>
              <button
                onClick={onRetakePhoto}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Perbaiki Foto</span>
              </button>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Jika foto kurang fokus atau AI salah mendeteksi jenis kerusakan, Anda dapat mengambil
              ulang foto kapan saja.
            </p>
          </div>
        </div>
      </div>

      {/* Finish CTA */}
      <div className="p-5 pt-3">
        <button
          onClick={onFinish}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Simpan &amp; Selesaikan Laporan</span>
          <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
