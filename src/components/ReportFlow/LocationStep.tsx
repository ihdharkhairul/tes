import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  LocateFixed, 
  WifiOff, 
  Archive, 
  Save 
} from 'lucide-react';

interface LocationStepProps {
  address: string;
  lat: string;
  long: string;
  isOffline: boolean;
  onRefreshGps: () => void;
  onSaveDraft: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  address,
  lat,
  long,
  isOffline,
  onRefreshGps,
  onSaveDraft,
  onBack,
  onNext
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
              <h3 className="font-bold text-slate-900 text-sm">Langkah 2 dari 4</h3>
              <p className="text-[11px] text-slate-500">Lokasi Kerusakan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            02 / Lokasi
          </span>
        </div>

        {/* Progress Bar (50%) */}
        <div className="w-full bg-slate-100 h-1">
          <div className="bg-blue-600 h-1 w-2/4 rounded-r transition-all duration-300" />
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Tentukan Titik Lokasi</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              GPS di smartphone Anda dapat merekam koordinat akurat meskipun sinyal internet minim.
            </p>
          </div>

          {/* Mini Map Card */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm">
            <div className="h-44 bg-slate-100 relative flex items-center justify-center overflow-hidden">
              {/* Map grid background pattern */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

              {/* Road lines SVG */}
              <svg className="absolute inset-0 w-full h-full stroke-slate-300 pointer-events-none" fill="none">
                <path d="M-20,40 Q150,90 420,30" stroke="#cbd5e1" strokeWidth="12" />
                <path d="M-20,40 Q150,90 420,30" stroke="#f1f5f9" strokeWidth="8" strokeDasharray="6 6" />
                <path d="M60,-20 Q120,120 200,220" stroke="#cbd5e1" strokeWidth="14" />
                <path d="M60,-20 Q120,120 200,220" stroke="#ffffff" strokeWidth="10" />
                <path d="M0,140 L420,110" stroke="#cbd5e1" strokeWidth="8" />
              </svg>

              {/* Animated Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-11 h-11 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl border-[2.5px] border-white pulsing-ring">
                  <MapPin className="w-5 h-5 fill-white stroke-red-600" />
                </div>
                <span className="bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-full mt-1.5 shadow-md">
                  Titik Presisi
                </span>
              </div>
            </div>

            {/* Address & Lat/Long Info */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Alamat Terdeteksi
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {address}
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold shrink-0">
                  GPS Akurat
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">Lat:</span> <strong>{lat}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Long:</span> <strong>{long}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Refresh GPS Button */}
          <button
            onClick={onRefreshGps}
            className="w-full py-3 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98] font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <LocateFixed className="w-4 h-4" />
            <span>Refresh Lokasi GPS Saya</span>
          </button>

          {/* Offline Banner Alert */}
          {isOffline && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
                <p className="text-xs font-bold">Koneksi Internet Tidak Tersedia</p>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Jangan khawatir! Koordinat GPS tetap tersimpan. Anda dapat menyimpan laporan ini sebagai{' '}
                <strong>Draft Offline</strong> dan dikirim otomatis begitu ada jaringan.
              </p>
              <button
                onClick={onSaveDraft}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Simpan ke Draft Offline
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-3 flex gap-2">
        <button
          onClick={onSaveDraft}
          className="px-4 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Archive className="w-4 h-4" />
          <span>Draft</span>
        </button>

        <button
          onClick={onNext}
          className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Lanjut ke Detail</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
