import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryCharging, Smartphone, Maximize2, ExternalLink } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isSplash?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, isSplash = false }) => {
  const [time, setTime] = useState<string>('10:31');
  const [isFullView, setIsFullView] = useState<boolean>(false);

  useEffect(() => {
    // Keep time synchronized or show 10:31 initially
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-6 overflow-hidden select-none">
      {/* Desktop Helper Bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[440px] mb-3 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          <span>LAPORIN Mobile App Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullView(!isFullView)}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Ubah tampilan frame"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isFullView ? 'Mode Frame' : 'Layar Penuh'}</span>
          </button>
        </div>
      </div>

      {/* Smartphone Device Mockup Container */}
      <div
        className={`w-full bg-white relative flex flex-col overflow-hidden transition-all duration-300 ${
          isFullView
            ? 'max-w-md h-[95vh] rounded-2xl shadow-2xl'
            : 'max-w-[412px] h-[100dvh] sm:h-[870px] sm:max-h-[890px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_12px_#1e293b,0_0_0_14px_#334155]'
        }`}
      >
        {/* Dynamic Island / Speaker Slit on Desktop Frame */}
        <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-50 pointer-events-none opacity-90 shadow-sm" />

        {/* Native Status Bar */}
        <div
          className={`h-11 shrink-0 flex items-center justify-between px-6 text-xs font-semibold z-40 transition-colors ${
            isSplash
              ? 'bg-transparent text-white'
              : 'bg-white/90 backdrop-blur-md text-slate-800 border-b border-slate-100'
          }`}
        >
          <span className="font-mono text-[13px] tracking-tight pl-1">{time}</span>

          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5" />
            <Signal className="w-3.5 h-3.5" />
            <BatteryCharging
              className={`w-4 h-4 ${isSplash ? 'text-emerald-300' : 'text-emerald-600'}`}
            />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-white">
          {children}
        </div>

        {/* Bottom Home Indicator Line (iOS style) */}
        <div
          className={`h-3 w-full shrink-0 flex justify-center items-center z-50 pointer-events-none ${
            isSplash ? 'bg-transparent' : 'bg-white'
          }`}
        >
          <div
            className={`w-32 h-1 rounded-full ${
              isSplash ? 'bg-white/40' : 'bg-slate-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
