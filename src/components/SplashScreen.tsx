import React from 'react';
import { ShieldAlert, Sparkles, Cpu, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="h-full w-full flex flex-col justify-between items-center bg-gradient-to-b from-[#1e50db] via-[#1d4ed8] to-[#1e3a8a] text-white p-7 relative overflow-hidden select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tag Pill */}
      <div className="w-full flex justify-end pt-1 z-10">
        <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-blue-100 font-medium tracking-wide shadow-sm border border-white/20">
          V1.2 AI Ready
        </span>
      </div>

      {/* Center Branding Hero */}
      <div className="flex flex-col items-center text-center z-10 my-auto py-6">
        {/* App Logo Icon with Sparkle Badge */}
        <div className="relative mb-6">
          <div className="w-28 h-28 bg-white rounded-[28px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] flex items-center justify-center p-3 transition-transform hover:scale-105 duration-300">
            {/* Inner Blue Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[22px] flex items-center justify-center text-white shadow-inner">
              <ShieldAlert className="w-12 h-12 text-white stroke-[2.2]" />
            </div>
          </div>

          {/* Golden AI Sparkle badge */}
          <div className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-amber-400 border-[2.5px] border-white rounded-full flex items-center justify-center shadow-lg ring-1 ring-black/5">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 drop-shadow-sm font-sans">
          LAPORIN
        </h1>

        {/* Tagline */}
        <p className="text-blue-100/90 text-sm max-w-[270px] font-medium leading-relaxed mb-4">
          &ldquo;Laporkan Kerusakan Jalan, Bantu Perbaikan Bersama AI&rdquo;
        </p>

        {/* AI Capability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-900/60 backdrop-blur-md rounded-full text-xs text-blue-200 border border-blue-400/30 shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-blue-300" />
          <span className="font-medium tracking-wide">Deep Learning Road Detection</span>
        </div>
      </div>

      {/* Bottom CTA Area */}
      <div className="w-full flex flex-col items-center gap-3 pb-4 z-10">
        <button
          onClick={onEnter}
          className="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer group"
        >
          <span className="font-extrabold tracking-wide">Masuk ke Beranda</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-blue-200/80 font-medium">
          Inisiatif Pelayanan Publik &amp; Warga
        </p>
      </div>
    </div>
  );
};
