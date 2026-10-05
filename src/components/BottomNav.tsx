import React from 'react';
import { Home, Plus, ClipboardList, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // Check which tab is active
  const isBerandaActive = currentScreen === 'beranda';
  const isLaporActive = 
    currentScreen === 'buat-laporan' ||
    currentScreen === 'step-foto' ||
    currentScreen === 'step-lokasi' ||
    currentScreen === 'step-detail' ||
    currentScreen === 'step-review' ||
    currentScreen === 'proses-ai' ||
    currentScreen === 'hasil-ai' ||
    currentScreen === 'sukses';
  const isRiwayatActive = currentScreen === 'riwayat' || currentScreen === 'tracking' || currentScreen === 'draft-offline';
  const isProfilActive = currentScreen === 'profil';

  return (
    <nav className="h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shrink-0 px-4 flex items-center justify-between z-40 relative select-none">
      {/* 1. Beranda */}
      <button
        onClick={() => onNavigate('beranda')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
          isBerandaActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className={`w-5 h-5 ${isBerandaActive ? 'stroke-[2.4]' : 'stroke-2'}`} />
        <span className="text-[10px] font-bold tracking-tight">Beranda</span>
      </button>

      {/* 2. Lapor (Center Floating Accent) */}
      <button
        onClick={() => onNavigate('buat-laporan')}
        className="flex-1 flex flex-col items-center justify-center relative -top-3 cursor-pointer group"
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-50 transition-all ${
            isLaporActive
              ? 'bg-gradient-to-tr from-blue-700 to-blue-500 shadow-blue-500/50 scale-105'
              : 'bg-gradient-to-tr from-blue-600 to-blue-500 shadow-blue-500/35 group-hover:scale-105'
          } text-white`}
        >
          <Plus className="w-6 h-6 stroke-[2.6]" />
        </div>
        <span
          className={`text-[10px] font-extrabold mt-0.5 ${
            isLaporActive ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          Lapor
        </span>
      </button>

      {/* 3. Riwayat */}
      <button
        onClick={() => onNavigate('riwayat')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
          isRiwayatActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <ClipboardList className={`w-5 h-5 ${isRiwayatActive ? 'stroke-[2.4]' : 'stroke-2'}`} />
        <span className="text-[10px] font-bold tracking-tight">Riwayat</span>
      </button>

      {/* 4. Profil */}
      <button
        onClick={() => onNavigate('profil')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
          isProfilActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <User className={`w-5 h-5 ${isProfilActive ? 'stroke-[2.4]' : 'stroke-2'}`} />
        <span className="text-[10px] font-bold tracking-tight">Profil</span>
      </button>
    </nav>
  );
};
