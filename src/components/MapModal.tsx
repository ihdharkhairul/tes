import React, { useState } from 'react';
import { Map, X, MapPin, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { MAP_MARKERS } from '../data/mockData';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [selectedMarker, setSelectedMarker] = useState<typeof MAP_MARKERS[0] | null>(
    MAP_MARKERS[0]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex flex-col justify-end animate-fadeIn">
      <div className="bg-white rounded-t-3xl max-h-[88%] flex flex-col overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                Peta Sebaran Laporan Warga
              </h4>
              <p className="text-[10px] text-slate-500">Wilayah Sleman &amp; Sekitarnya</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Visualization Canvas */}
        <div className="relative h-64 bg-slate-100 flex items-center justify-center overflow-hidden select-none border-b border-slate-200">
          {/* Radial grid dots */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

          {/* Road vector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
            <path d="M-10,30 Q120,80 320,40 T500,20" stroke="#cbd5e1" strokeWidth="10" />
            <path d="M-10,30 Q120,80 320,40 T500,20" stroke="#ffffff" strokeWidth="6" strokeDasharray="8 6" />
            <path d="M80,-10 L160,280" stroke="#cbd5e1" strokeWidth="12" />
            <path d="M80,-10 L160,280" stroke="#ffffff" strokeWidth="8" />
            <path d="M260,-10 L220,280" stroke="#cbd5e1" strokeWidth="10" />
            <path d="M260,-10 L220,280" stroke="#ffffff" strokeWidth="6" />
            <path d="M0,180 L420,130" stroke="#cbd5e1" strokeWidth="8" />
          </svg>

          {/* Markers */}
          {/* Marker 1: Lubang KM 9 */}
          <div
            onClick={() => setSelectedMarker(MAP_MARKERS[0])}
            className="absolute top-10 left-20 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
          >
            <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white pulsing-ring">
              <span className="text-[10px] font-black">1</span>
            </div>
            <span className="bg-slate-900/85 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
              Lubang KM 9
            </span>
          </div>

          {/* Marker 2: Lubang Affandi (Center active) */}
          <div
            onClick={() => setSelectedMarker(MAP_MARKERS[1])}
            className="absolute top-28 left-40 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
          >
            <div className="w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white ring-2 ring-red-400">
              <MapPin className="w-5 h-5 fill-white stroke-red-600" />
            </div>
            <span className="bg-red-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap">
              Titik Laporan Anda
            </span>
          </div>

          {/* Marker 3: Retak Buaya Seturan */}
          <div
            onClick={() => setSelectedMarker(MAP_MARKERS[2])}
            className="absolute bottom-12 right-24 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
          >
            <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-[9px] font-bold">3</span>
            </div>
            <span className="bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
              Retak Seturan
            </span>
          </div>

          {/* Marker 4: Jembatan Kalasan (Selesai) */}
          <div
            onClick={() => setSelectedMarker(MAP_MARKERS[3])}
            className="absolute top-16 right-10 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
          >
            <div className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="bg-emerald-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
              Selesai Ditambal
            </span>
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        {selectedMarker && (
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-900">
                  {selectedMarker.title}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    selectedMarker.status === 'selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedMarker.status === 'ditindak'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedMarker.status === 'selesai'
                    ? 'Selesai'
                    : selectedMarker.status === 'ditindak'
                    ? 'Ditindak'
                    : 'Diproses'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {selectedMarker.category} • Akurasi AI: {selectedMarker.score}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-400 text-right">
              <div>Lat: {selectedMarker.lat}</div>
              <div>Lng: {selectedMarker.lng}</div>
            </div>
          </div>
        )}

        {/* Info & Close */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-bold text-slate-800">
            12 Titik Kerusakan Terpantau di Sleman
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Peta diperbarui berkala berdasarkan integrasi verifikasi AI dan laporan masyarakat secara
            langsung.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl text-xs mt-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            Tutup Peta
          </button>
        </div>
      </div>
    </div>
  );
};
