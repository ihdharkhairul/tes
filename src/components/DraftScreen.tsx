import React from 'react';
import { 
  ArrowLeft, 
  CloudOff, 
  Trash2, 
  UploadCloud, 
  Database, 
  CheckCircle 
} from 'lucide-react';
import { OfflineDraft } from '../types';

interface DraftScreenProps {
  drafts: OfflineDraft[];
  onBack: () => void;
  onSyncDraft: (draft: OfflineDraft) => void;
  onDeleteDraft: (id: string) => void;
}

export const DraftScreen: React.FC<DraftScreenProps> = ({
  drafts,
  onBack,
  onSyncDraft,
  onDeleteDraft
}) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Draft Offline</h3>
            <p className="text-[11px] text-slate-500">Laporan tersimpan di memori HP</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Offline Storage
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Info Banner */}
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
          <CloudOff className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Penyimpanan Otomatis Tanpa Kuota</p>
            <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
              Saat Anda di daerah pelosok tanpa sinyal, foto dan titik GPS tetap aman tersimpan di
              sini. Kirim sekali klik saat jaringan pulih.
            </p>
          </div>
        </div>

        {/* Draft List */}
        <div className="space-y-3">
          {drafts.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">Semua Draft Sudah Terkirim</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[220px] mx-auto">
                Tidak ada laporan offline yang tertunda di perangkat Anda saat ini.
              </p>
            </div>
          ) : (
            drafts.map((draft) => (
              <div
                key={draft.id}
                className="p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 relative shadow-xs"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-xl bg-slate-300 overflow-hidden relative shrink-0">
                    <img
                      src={draft.imageUrl}
                      alt={draft.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/75 text-[9px] text-white px-1.5 py-0.5 rounded font-mono font-medium">
                      Draft
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Menunggu Koneksi
                      </span>
                      <button
                        onClick={() => onDeleteDraft(draft.id)}
                        title="Hapus draft"
                        className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">{draft.title}</h4>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{draft.address}</p>

                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Disimpan: {draft.savedAt}
                    </p>
                  </div>
                </div>

                {/* Button Sync Now */}
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Database className="w-3.5 h-3.5 text-slate-400" /> Ukuran: {draft.fileSize}
                  </span>

                  <button
                    onClick={() => onSyncDraft(draft)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Kirim Sekarang</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
