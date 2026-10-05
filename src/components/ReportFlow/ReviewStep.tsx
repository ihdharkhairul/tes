import React from 'react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';
import { DamageCategory, SeverityLevel } from '../../types';

interface ReviewStepProps {
  photoUrl: string;
  category: DamageCategory;
  severity: SeverityLevel;
  condition: string;
  address: string;
  lat: string;
  long: string;
  notes: string;
  onEditPhoto: () => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
  onBack: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  photoUrl,
  category,
  severity,
  condition,
  address,
  lat,
  long,
  notes,
  onEditPhoto,
  onSubmit,
  onSaveDraft,
  onBack
}) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white flex flex-col justify-between">
      <div>
        {/* Step Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Langkah 4 dari 4</h3>
              <p className="text-[11px] text-slate-500">Periksa Ringkasan Laporan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            04 / Review
          </span>
        </div>

        {/* Progress Bar (100%) */}
        <div className="w-full bg-slate-100 h-1">
          <div className="bg-blue-600 h-1 w-full rounded-r transition-all duration-300" />
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Cek Kebenaran Data</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Pastikan semua data sesuai sebelum dikirim ke AI &amp; petugas.
              </p>
            </div>
            <button
              onClick={onEditPhoto}
              className="text-xs text-blue-600 font-bold px-2.5 py-1 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Edit Data
            </button>
          </div>

          {/* Card Summary */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50">
            {/* Foto Thumbnail */}
            <div className="h-44 w-full bg-slate-900 relative">
              <img
                src={photoUrl}
                alt="Foto Kerusakan"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/10 shadow">
                <ImageIcon className="w-3.5 h-3.5 text-blue-300" />
                <span>Foto Kerusakan Jalan</span>
              </div>
            </div>

            {/* Detail List */}
            <div className="p-4 space-y-3 bg-white">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Jenis Kerusakan:</span>
                <span className="text-xs font-bold text-slate-800">{category}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Tingkat Keparahan:</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                    severity === 'Ringan'
                      ? 'bg-emerald-100 text-emerald-800'
                      : severity === 'Sedang'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {severity}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Kondisi Kejadian:</span>
                <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      condition === 'Masih Terjadi' ? 'bg-red-600 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {condition}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-1">Titik Lokasi:</span>
                <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {address}
                </p>
                <div className="flex gap-4 mt-1.5 text-[11px] font-mono text-slate-500 px-1">
                  <span>
                    Lat: <strong className="text-slate-700">{lat}</strong>
                  </span>
                  <span>
                    Long: <strong className="text-slate-700">{long}</strong>
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-xs text-slate-500 block mb-1">Catatan Tambahan:</span>
                <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {notes || 'Tidak ada catatan tambahan.'}
                </p>
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="bg-blue-50 rounded-2xl p-3.5 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Setelah menekan tombol kirim, sistem <strong>AI Deep Learning</strong> akan
              menganalisis foto untuk mengidentifikasi tingkat kerusakan sebelum diteruskan ke Dinas
              Bina Marga.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-2 flex flex-col gap-2">
        <button
          onClick={onSubmit}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Kirim &amp; Validasi AI</span>
        </button>

        <button
          onClick={onSaveDraft}
          className="w-full py-2.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          Simpan Sebagai Draft Dulu
        </button>
      </div>
    </div>
  );
};
