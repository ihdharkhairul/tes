import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CircleDot, 
  Activity, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';
import { DamageCategory, SeverityLevel } from '../../types';

interface DetailStepProps {
  category: DamageCategory;
  severity: SeverityLevel;
  condition: string;
  notes: string;
  onCategoryChange: (category: DamageCategory) => void;
  onSeverityChange: (severity: SeverityLevel) => void;
  onConditionChange: (condition: string) => void;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const DetailStep: React.FC<DetailStepProps> = ({
  category,
  severity,
  condition,
  notes,
  onCategoryChange,
  onSeverityChange,
  onConditionChange,
  onNotesChange,
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
              <h3 className="font-bold text-slate-900 text-sm">Langkah 3 dari 4</h3>
              <p className="text-[11px] text-slate-500">Detail Kerusakan</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            03 / Detail
          </span>
        </div>

        {/* Progress Bar (75%) */}
        <div className="w-full bg-slate-100 h-1">
          <div className="bg-blue-600 h-1 w-3/4 rounded-r transition-all duration-300" />
        </div>

        <div className="p-5 space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Isi Kondisi Kerusakan</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Informasi ini membantu petugas menentukan alat berat dan material perbaikan yang dibutuhkan.
            </p>
          </div>

          {/* Jenis Kerusakan Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Jenis Kerusakan Jalan *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Pilihan 1: Berlubang */}
              <button
                type="button"
                onClick={() => onCategoryChange('Jalan Berlubang')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  category === 'Jalan Berlubang'
                    ? 'border-2 border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    category === 'Jalan Berlubang'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <CircleDot className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-800">Jalan Berlubang</span>
              </button>

              {/* Pilihan 2: Retak */}
              <button
                type="button"
                onClick={() => onCategoryChange('Jalan Retak (Buaya)')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  category === 'Jalan Retak (Buaya)'
                    ? 'border-2 border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    category === 'Jalan Retak (Buaya)'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-800">Jalan Retak</span>
              </button>

              {/* Pilihan 3: Rusak Berat */}
              <button
                type="button"
                onClick={() => onCategoryChange('Jalan Rusak Berat / Amblas')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  category === 'Jalan Rusak Berat / Amblas'
                    ? 'border-2 border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    category === 'Jalan Rusak Berat / Amblas'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-800">Rusak Berat / Amblas</span>
              </button>

              {/* Pilihan 4: Permukaan Lepas */}
              <button
                type="button"
                onClick={() => onCategoryChange('Kerusakan Permukaan / Mengelupas')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  category === 'Kerusakan Permukaan / Mengelupas'
                    ? 'border-2 border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    category === 'Kerusakan Permukaan / Mengelupas'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-slate-800">Permukaan Lepas</span>
              </button>
            </div>
          </div>

          {/* Tingkat Kerusakan Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Perkiraan Tingkat Keparahan *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSeverityChange('Ringan')}
                className={`p-2.5 rounded-xl text-center font-bold text-xs transition-all cursor-pointer ${
                  severity === 'Ringan'
                    ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                Ringan
              </button>
              <button
                type="button"
                onClick={() => onSeverityChange('Sedang')}
                className={`p-2.5 rounded-xl text-center font-bold text-xs transition-all cursor-pointer ${
                  severity === 'Sedang'
                    ? 'border-2 border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:border-amber-300'
                }`}
              >
                Sedang
              </button>
              <button
                type="button"
                onClick={() => onSeverityChange('Berat')}
                className={`p-2.5 rounded-xl text-center font-bold text-xs transition-all cursor-pointer ${
                  severity === 'Berat'
                    ? 'border-2 border-red-500 bg-red-50 text-red-900 shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:border-red-300'
                }`}
              >
                Berat
              </button>
            </div>
          </div>

          {/* Kondisi Kejadian */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Kondisi Kerusakan Saat Ini *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onConditionChange('Masih Terjadi')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  condition === 'Masih Terjadi'
                    ? 'border-2 border-red-500 bg-red-50/80 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-900">Masih Terjadi</p>
                  <p className="text-[10px] text-red-700">Membahayakan lalu lintas</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onConditionChange('Sudah Ditambal')}
                className={`p-3 rounded-2xl text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  condition === 'Sudah Ditambal'
                    ? 'border-2 border-blue-600 bg-blue-50/80 shadow-xs'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Sudah Ditambal</p>
                  <p className="text-[10px] text-slate-500">Namun belum rata</p>
                </div>
              </button>
            </div>
          </div>

          {/* Deskripsi Catatan */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Contoh: Lubang cukup dalam sekitar 15 cm di lajur kiri dekat lampu merah, rawan bagi pengendara motor saat hujan tertutup genangan air."
              className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 bg-slate-50 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-5 pt-3">
        <button
          onClick={onNext}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Lanjut ke Review Data</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
