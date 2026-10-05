import React, { useState, useEffect } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { BerandaScreen } from './components/BerandaScreen';
import { IntroStep } from './components/ReportFlow/IntroStep';
import { PhotoStep } from './components/ReportFlow/PhotoStep';
import { LocationStep } from './components/ReportFlow/LocationStep';
import { DetailStep } from './components/ReportFlow/DetailStep';
import { ReviewStep } from './components/ReportFlow/ReviewStep';
import { AiProcessingStep } from './components/ReportFlow/AiProcessingStep';
import { AiResultStep } from './components/ReportFlow/AiResultStep';
import { SuccessStep } from './components/ReportFlow/SuccessStep';
import { TrackingScreen } from './components/TrackingScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { DraftScreen } from './components/DraftScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { MapModal } from './components/MapModal';

import { 
  ScreenType, 
  ReportItem, 
  OfflineDraft, 
  DamageCategory, 
  SeverityLevel,
  SampleRoadImage 
} from './types';
import { INITIAL_REPORTS, INITIAL_DRAFTS, SAMPLE_ROAD_IMAGES } from './data/mockData';

export default function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence State
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('laporin_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REPORTS;
      }
    }
    return INITIAL_REPORTS;
  });

  const [drafts, setDrafts] = useState<OfflineDraft[]>(() => {
    const saved = localStorage.getItem('laporin_drafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DRAFTS;
      }
    }
    return INITIAL_DRAFTS;
  });

  useEffect(() => {
    localStorage.setItem('laporin_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('laporin_drafts', JSON.stringify(drafts));
  }, [drafts]);

  // Selected report for tracking view
  const [selectedReport, setSelectedReport] = useState<ReportItem>(reports[0]);

  // Active Report Form State
  const [photoUrl, setPhotoUrl] = useState<string | null>(SAMPLE_ROAD_IMAGES[0].url);
  const [category, setCategory] = useState<DamageCategory>('Jalan Berlubang');
  const [severity, setSeverity] = useState<SeverityLevel>('Sedang');
  const [condition, setCondition] = useState<string>('Masih Terjadi');
  const [notes, setNotes] = useState<string>('Lubang cukup dalam di lajur kiri dekat lampu merah.');
  const [address, setAddress] = useState<string>('Jl. Affandi No. 18, Santren, Caturtunggal, Depok, Sleman');
  const [lat, setLat] = useState<string>('-7.769214');
  const [long, setLong] = useState<string>('110.388432');
  const [confidenceScore, setConfidenceScore] = useState<number>(91);
  const [depthEstimate, setDepthEstimate] = useState<string>('± 12 - 15 cm');
  const [priorityText, setPriorityText] = useState<string>('Sedang - Mendesak');

  // Helper Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handlers for Photo Selection
  const handlePhotoSelected = (url: string, preset?: SampleRoadImage) => {
    setPhotoUrl(url);
    if (preset) {
      setCategory(preset.category);
      setSeverity(preset.severity);
      setDepthEstimate(preset.estimatedDepth);
      setConfidenceScore(preset.confidence);
      setPriorityText(
        preset.severity === 'Berat'
          ? 'Sangat Mendesak'
          : preset.severity === 'Sedang'
          ? 'Sedang - Mendesak'
          : 'Pemeliharaan Rutin'
      );
    } else {
      // Randomize AI detection slightly for real uploaded photo
      const newScore = Math.floor(Math.random() * 8) + 89;
      setConfidenceScore(newScore);
    }
  };

  const handlePhotoRemoved = () => {
    setPhotoUrl(null);
  };

  // GPS Refresh simulation
  const handleRefreshGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latVal = pos.coords.latitude.toFixed(6);
          const longVal = pos.coords.longitude.toFixed(6);
          setLat(latVal);
          setLong(longVal);
          showToast(`Lokasi GPS diperbarui: ${latVal}, ${longVal}`);
        },
        () => {
          // Fallback simulation
          const randomLat = (-7.769214 + (Math.random() - 0.5) * 0.006).toFixed(6);
          const randomLong = (110.388432 + (Math.random() - 0.5) * 0.006).toFixed(6);
          setLat(randomLat);
          setLong(randomLong);
          showToast(`GPS terdeteksi presisi: ${randomLat}, ${randomLong}`);
        }
      );
    } else {
      const randomLat = (-7.769214 + (Math.random() - 0.5) * 0.006).toFixed(6);
      const randomLong = (110.388432 + (Math.random() - 0.5) * 0.006).toFixed(6);
      setLat(randomLat);
      setLong(randomLong);
      showToast(`GPS diperbarui: ${randomLat}, ${randomLong}`);
    }
  };

  // Save Draft Handler
  const handleSaveDraft = () => {
    const newDraft: OfflineDraft = {
      id: `draft-${Date.now()}`,
      title: `${category} (Draft #${drafts.length + 1})`,
      category,
      severity,
      condition,
      address,
      latitude: lat,
      longitude: long,
      imageUrl: photoUrl || SAMPLE_ROAD_IMAGES[0].url,
      savedAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      fileSize: '1.8 MB',
      notes
    };
    setDrafts([newDraft, ...drafts]);
    showToast('Laporan disimpan ke Draft Offline!');
    setCurrentScreen('draft-offline');
  };

  // Sync Draft
  const handleSyncDraft = (draft: OfflineDraft) => {
    setCategory(draft.category);
    setSeverity(draft.severity);
    setCondition(draft.condition);
    setAddress(draft.address);
    setLat(draft.latitude);
    setLong(draft.longitude);
    setPhotoUrl(draft.imageUrl);
    setNotes(draft.notes || '');

    // Remove from drafts
    setDrafts(drafts.filter((d) => d.id !== draft.id));
    setCurrentScreen('proses-ai');
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id));
    showToast('Draf laporan dihapus');
  };

  // Submit to AI
  const handleSubmitReview = () => {
    setCurrentScreen('proses-ai');
  };

  // Complete AI processing -> goes to result
  const handleAiProcessingDone = () => {
    setCurrentScreen('hasil-ai');
  };

  // Finalize Report from AI result
  const handleFinishReport = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedTimestamp =
      now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' +
      now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' WIB';

    const randomSuffix = Math.floor(Math.random() * 900) + 100;
    const ticket = `LAP-${now.getFullYear()}-${randomSuffix}`;

    const newReport: ReportItem = {
      id: `lap-${Date.now()}`,
      ticketNumber: ticket,
      title: `${category} di ${address.split(',')[0]}`,
      category,
      severity,
      condition,
      address,
      latitude: lat,
      longitude: long,
      imageUrl: photoUrl || SAMPLE_ROAD_IMAGES[0].url,
      date: formattedDate,
      timestamp: formattedTimestamp,
      status: 'diproses',
      statusLabel: 'Menunggu Verifikasi Petugas',
      confidenceScore,
      depthEstimate,
      priorityText,
      notes,
      currentStepIndex: 2
    };

    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    setCurrentScreen('sukses');
  };

  // Tracking Action
  const handleTrackReport = (report: ReportItem) => {
    setSelectedReport(report);
    setCurrentScreen('tracking');
  };

  const handleShareReport = (report: ReportItem) => {
    const url = `https://laporin.go.id/track/${report.ticketNumber}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast(`Tautan laporan #${report.ticketNumber} disalin!`);
  };

  // Start new report flow
  const handleStartReport = () => {
    setCurrentScreen('buat-laporan');
  };

  // Should bottom bar be shown?
  const showBottomNav = currentScreen !== 'splash' && currentScreen !== 'proses-ai';

  return (
    <PhoneFrame isSplash={currentScreen === 'splash'}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Views */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* 1. Splash Screen */}
        {currentScreen === 'splash' && (
          <SplashScreen onEnter={() => setCurrentScreen('beranda')} />
        )}

        {/* 2. Beranda */}
        {currentScreen === 'beranda' && (
          <BerandaScreen
            reports={reports}
            isOffline={isOffline}
            onToggleOffline={() => {
              setIsOffline(!isOffline);
              showToast(isOffline ? 'Mode Online aktif' : 'Mode Offline aktif (GPS lokal)');
            }}
            onStartReport={handleStartReport}
            onViewHistory={() => setCurrentScreen('riwayat')}
            onOpenMap={() => setIsMapOpen(true)}
            onSelectReport={(r) => handleTrackReport(r)}
            onOpenProfile={() => setCurrentScreen('profil')}
          />
        )}

        {/* 3. Buat Laporan Overview */}
        {currentScreen === 'buat-laporan' && (
          <IntroStep
            onBack={() => setCurrentScreen('beranda')}
            onStart={() => setCurrentScreen('step-foto')}
          />
        )}

        {/* 4. Step 1: Foto */}
        {currentScreen === 'step-foto' && (
          <PhotoStep
            photoUrl={photoUrl}
            onPhotoSelected={handlePhotoSelected}
            onPhotoRemoved={handlePhotoRemoved}
            onBack={() => setCurrentScreen('buat-laporan')}
            onNext={() => setCurrentScreen('step-lokasi')}
          />
        )}

        {/* 5. Step 2: Lokasi */}
        {currentScreen === 'step-lokasi' && (
          <LocationStep
            address={address}
            lat={lat}
            long={long}
            isOffline={isOffline}
            onRefreshGps={handleRefreshGps}
            onSaveDraft={handleSaveDraft}
            onBack={() => setCurrentScreen('step-foto')}
            onNext={() => setCurrentScreen('step-detail')}
          />
        )}

        {/* 6. Step 3: Detail */}
        {currentScreen === 'step-detail' && (
          <DetailStep
            category={category}
            severity={severity}
            condition={condition}
            notes={notes}
            onCategoryChange={setCategory}
            onSeverityChange={setSeverity}
            onConditionChange={setCondition}
            onNotesChange={setNotes}
            onBack={() => setCurrentScreen('step-lokasi')}
            onNext={() => setCurrentScreen('step-review')}
          />
        )}

        {/* 7. Step 4: Review */}
        {currentScreen === 'step-review' && (
          <ReviewStep
            photoUrl={photoUrl || SAMPLE_ROAD_IMAGES[0].url}
            category={category}
            severity={severity}
            condition={condition}
            address={address}
            lat={lat}
            long={long}
            notes={notes}
            onEditPhoto={() => setCurrentScreen('step-foto')}
            onSubmit={handleSubmitReview}
            onSaveDraft={handleSaveDraft}
            onBack={() => setCurrentScreen('step-detail')}
          />
        )}

        {/* 8. Proses AI Scanner */}
        {currentScreen === 'proses-ai' && (
          <AiProcessingStep onComplete={handleAiProcessingDone} />
        )}

        {/* 9. Hasil AI */}
        {currentScreen === 'hasil-ai' && (
          <AiResultStep
            photoUrl={photoUrl || SAMPLE_ROAD_IMAGES[0].url}
            category={category}
            severity={severity}
            confidenceScore={confidenceScore}
            depthEstimate={depthEstimate}
            priorityText={priorityText}
            onRetakePhoto={() => setCurrentScreen('step-foto')}
            onFinish={handleFinishReport}
          />
        )}

        {/* 10. Sukses */}
        {currentScreen === 'sukses' && (
          <SuccessStep
            report={selectedReport}
            onTrackReport={(r) => handleTrackReport(r)}
            onGoHome={() => setCurrentScreen('beranda')}
          />
        )}

        {/* 11. Tracking Detail */}
        {currentScreen === 'tracking' && (
          <TrackingScreen
            report={selectedReport}
            onBack={() => setCurrentScreen('riwayat')}
            onOpenMap={() => setIsMapOpen(true)}
            onShare={handleShareReport}
          />
        )}

        {/* 12. Riwayat */}
        {currentScreen === 'riwayat' && (
          <HistoryScreen
            reports={reports}
            draftCount={drafts.length}
            onOpenDrafts={() => setCurrentScreen('draft-offline')}
            onSelectReport={(r) => handleTrackReport(r)}
          />
        )}

        {/* 13. Draft Offline */}
        {currentScreen === 'draft-offline' && (
          <DraftScreen
            drafts={drafts}
            onBack={() => setCurrentScreen('beranda')}
            onSyncDraft={handleSyncDraft}
            onDeleteDraft={handleDeleteDraft}
          />
        )}

        {/* 14. Profil */}
        {currentScreen === 'profil' && (
          <ProfileScreen
            draftCount={drafts.length}
            onViewHistory={() => setCurrentScreen('riwayat')}
            onViewDrafts={() => setCurrentScreen('draft-offline')}
            onLogout={() => setCurrentScreen('splash')}
          />
        )}
      </div>

      {/* Persistent Bottom Nav Bar */}
      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Regional Map Modal */}
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </PhoneFrame>
  );
}
