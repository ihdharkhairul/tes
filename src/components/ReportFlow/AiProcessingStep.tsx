import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle, Circle, Loader2, Sparkles } from 'lucide-react';

interface AiProcessingStepProps {
  onComplete: () => void;
}

export const AiProcessingStep: React.FC<AiProcessingStepProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(2);

  useEffect(() => {
    // Step progression timer
    const t1 = setTimeout(() => {
      setCurrentStep(3);
    }, 1100);

    const t2 = setTimeout(() => {
      setCurrentStep(4);
    }, 2200);

    const t3 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-slate-950 text-white p-6 relative overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none -bottom-10 -right-10" />

      <div className="w-full max-w-sm flex flex-col items-center text-center relative z-10">
        {/* Animated Scanner Radar Icon */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border border-blue-500/40 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-indigo-400/20 animate-pulse" />
          <div className="w-24 h-24 rounded-full bg-blue-600/20 border-2 border-blue-400 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Cpu className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>

          {/* Model Badge */}
          <div className="absolute -bottom-2 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-amber-300">
            <Sparkles className="w-3 h-3" />
            <span>SCANNING MODEL v2.4</span>
          </div>
        </div>

        <h3 className="text-xl font-black tracking-tight text-white mb-1.5">
          Memproses Laporan...
        </h3>
        <p className="text-xs text-slate-300 mb-6 max-w-xs leading-relaxed font-normal">
          Model Deep Learning sedang memindai tekstur aspal, mendeteksi kedalaman, dan menghitung confidence score.
        </p>

        {/* Stepper checklist */}
        <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 space-y-3.5 text-left mb-6 shadow-xl">
          {/* Step 1 */}
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Foto &amp; metadata GPS diterima</span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Normalisasi citra &amp; segmentasi kontur jalan</span>
          </div>

          {/* Step 3 */}
          <div
            className={`flex items-center gap-3 text-xs transition-colors ${
              currentStep >= 3 ? 'text-slate-200' : 'text-amber-300 font-medium'
            }`}
          >
            {currentStep >= 3 ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            )}
            <span>Menganalisis jenis &amp; keparahan kerusakan</span>
          </div>

          {/* Step 4 */}
          <div
            className={`flex items-center gap-3 text-xs transition-colors ${
              currentStep >= 4
                ? 'text-emerald-300 font-medium'
                : currentStep === 3
                ? 'text-amber-300 font-medium'
                : 'text-slate-500'
            }`}
          >
            {currentStep >= 4 ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : currentStep === 3 ? (
              <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-slate-600 shrink-0" />
            )}
            <span>Menghitung akurasi confidence score</span>
          </div>
        </div>

        {/* Transparency note */}
        <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-slate-400 text-left leading-relaxed">
          <p>
            <span className="text-blue-300 font-bold">Catatan Transparansi:</span> AI membantu
            menganalisis foto kerusakan jalan secara objektif. Keputusan penanganan tetap diverifikasi
            oleh petugas berwenang.
          </p>
        </div>
      </div>
    </div>
  );
};
