import React, { useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Image as ImageIcon, 
  CheckCircle, 
  Trash2, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { SAMPLE_ROAD_IMAGES } from '../../data/mockData';
import { SampleRoadImage } from '../../types';

interface PhotoStepProps {
  photoUrl: string | null;
  onPhotoSelected: (url: string, preset?: SampleRoadImage) => void;
  onPhotoRemoved: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({
  photoUrl,
  onPhotoSelected,
  onPhotoRemoved,
  onBack,
  onNext
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (sample: SampleRoadImage) => {
    onPhotoSelected(sample.url, sample);
  };

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
              <h3 className="font-bold text-slate-900 text-sm">Langkah 1 dari 4</h3>
              <p className="text-[11px] text-slate-500">Foto Kerusakan Jalan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            01 / Foto
          </span>
        </div>

        {/* Progress Bar (25%) */}
        <div className="w-full bg-slate-100 h-1">
          <div className="bg-blue-600 h-1 w-1/4 rounded-r transition-all duration-300" />
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Ambil Foto Kerusakan</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Ambil foto yang jelas agar AI dan dinas terkait dapat menganalisis dimensi dan tingkat keparahan.
            </p>
          </div>

          {/* Hidden real file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Box Empty State */}
          {!photoUrl ? (
            <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/70 hover:bg-slate-100/60 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 shadow-inner">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold text-slate-700">Belum ada foto yang dipilih</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
                Pilih foto langsung dari kamera HP atau galeri perangkat Anda.
              </p>

              {/* Action buttons */}
              <div className="mt-4 flex gap-2 w-full max-w-[270px]">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4" /> Kamera
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-slate-500" /> Galeri
                </button>
              </div>

              {/* Quick Preset Samples */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 w-full text-left">
                <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Atau pilih contoh foto jalan rusak untuk uji coba:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_ROAD_IMAGES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetSelect(sample)}
                      className="p-2 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex items-center gap-2 text-left transition-all group cursor-pointer shadow-xs"
                    >
                      <img
                        src={sample.url}
                        alt={sample.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-slate-800 truncate">{sample.name}</p>
                        <p className="text-[9px] text-blue-600 font-semibold truncate">{sample.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Preview Box */
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 relative shadow-md">
              <img
                src={photoUrl}
                alt="Preview Foto Jalan"
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Foto Siap Dianalisis</span>
              </div>

              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-bold rounded-xl backdrop-blur-md flex items-center gap-1 shadow cursor-pointer border border-white/20"
                >
                  <Camera className="w-3.5 h-3.5" /> Ganti
                </button>
                <button
                  type="button"
                  onClick={onPhotoRemoved}
                  className="px-3 py-1.5 bg-red-600/90 hover:bg-red-700 text-white text-xs font-bold rounded-xl backdrop-blur flex items-center gap-1 shadow cursor-pointer transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Foto
                </button>
              </div>
            </div>
          )}

          {/* Panduan Foto Bagus */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <p className="text-xs font-bold text-slate-800 mb-2">Ketentuan Kualitas Foto:</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100 font-medium">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Jelas &amp; Tidak Buram</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100 font-medium">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Terlihat Luas Lubang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="p-5 pt-3">
        <button
          onClick={onNext}
          disabled={!photoUrl}
          className={`w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            photoUrl
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-lg shadow-blue-500/25'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Lanjutkan ke Lokasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {!photoUrl && (
          <p className="text-center text-[11px] text-amber-700 mt-2 font-medium">
            * Silakan ambil atau pilih foto terlebih dahulu
          </p>
        )}
      </div>
    </div>
  );
};
