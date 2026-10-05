import React, { useState } from 'react';
import { 
  BadgeCheck, 
  Award, 
  FileText, 
  Archive, 
  HelpCircle, 
  Shield, 
  LogOut, 
  ChevronRight, 
  X 
} from 'lucide-react';

interface ProfileScreenProps {
  draftCount: number;
  onViewHistory: () => void;
  onViewDrafts: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  draftCount,
  onViewHistory,
  onViewDrafts,
  onLogout
}) => {
  const [modalType, setModalType] = useState<'faq' | 'privacy' | null>(null);

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-blue-700 via-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 p-1 border-2 border-white/60 relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Budi Pratama"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full ring-1 ring-black/10" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-white leading-snug">Budi Pratama</h3>
              <BadgeCheck className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-xs text-blue-100 font-medium">Warga Aktif Tanggap Jalan</p>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] text-white backdrop-blur-xs border border-white/20">
              <Award className="w-3 h-3 text-amber-300" />
              <span>Level 2: 3 Laporan Diverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Contact Info Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Informasi Kontak
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Email:</span>
            <span className="font-semibold text-slate-800">budi.pratama@email.com</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Nomor Ponsel:</span>
            <span className="font-semibold text-slate-800">+62 812-3456-7890</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Kecamatan Domisili:</span>
            <span className="font-semibold text-slate-800">Depok, Sleman, D.I. Yogyakarta</span>
          </div>
        </div>

        {/* Menu Options */}
        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white shadow-xs">
          <button
            onClick={onViewHistory}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">Riwayat Laporan Saya</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onViewDrafts}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Archive className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">Draft Laporan Offline</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
              {draftCount} Tersimpan
            </span>
          </button>

          <button
            onClick={() => setModalType('faq')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">Bantuan &amp; FAQ Pengguna</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setModalType('privacy')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800">Kebijakan Privasi &amp; Ketentuan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 active:scale-[0.99] text-red-600 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-red-200 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Akun (Logout)</span>
        </button>
      </div>

      {/* Info Dialog Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                {modalType === 'faq' ? 'Bantuan & FAQ LAPORIN' : 'Kebijakan Privasi'}
              </h4>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto no-scrollbar">
              {modalType === 'faq' ? (
                <>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">1. Bagaimana cara melaporkan jalan rusak?</p>
                    <p>Tekan tombol <strong>+ Lapor</strong> di menu bawah, ambil foto kerusakan jalan, pastikan GPS aktif, lengkapi jenis kerusakan, dan kirimkan untuk divalidasi AI.</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">2. Apakah bisa melapor saat tidak ada sinyal?</p>
                    <p>Bisa! Aplikasi dilengkapi fitur <strong>Draft Offline</strong>. Foto dan titik GPS tersimpan di memori perangkat dan dapat disinkronkan saat ada internet.</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-800 mb-1">3. Apa peran AI dalam laporan ini?</p>
                    <p>AI memindai foto kerusakan untuk mengenali kedalaman, jenis retakan/lubang, dan memberikan skor validitas guna mempercepat respons regu darurat.</p>
                  </div>
                </>
              ) : (
                <>
                  <p>Aplikasi <strong>LAPORIN</strong> dirancang untuk mendukung pelayanan publik dan infrastruktur jalan yang aman.</p>
                  <p>Data lokasi GPS dan foto yang Anda unggah hanya digunakan untuk keperluan perbaikan jalan oleh Dinas Pekerjaan Umum dan Bina Marga terkait.</p>
                  <p>Identitas pribadi Anda terlindungi dan tidak akan dipublikasikan secara komersial.</p>
                </>
              )}
            </div>

            <button
              onClick={() => setModalType(null)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl text-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
