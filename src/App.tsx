import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TreatmentGallery } from './components/TreatmentGallery';
import { DoctorsSection } from './components/DoctorsSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { ChatConsultation } from './components/ChatConsultation';
import { SkinQuizModal } from './components/SkinQuizModal';
import { MessageCircle, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  
  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPreselectedTreatment, setBookingPreselectedTreatment] = useState('');
  const [bookingInitialTab, setBookingInitialTab] = useState<'new' | 'check'>('new');
  
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [skinQuizOpen, setSkinQuizOpen] = useState(false);

  const handleOpenBooking = (treatmentName?: string) => {
    setBookingPreselectedTreatment(treatmentName || '');
    setBookingInitialTab('new');
    setBookingModalOpen(true);
  };

  const handleOpenCheckBooking = () => {
    setBookingInitialTab('check');
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf8] text-[#4a3e3e] font-sans relative overflow-x-hidden selection:bg-[#cbb3a5]/30 selection:text-[#3d3333]">
      {/* Animated / Ambient Mesh Background Blobs for Frosted Glass Effect */}
      <div className="fixed top-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#f5e1da] rounded-full blur-[120px] opacity-70 pointer-events-none -z-10" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[700px] h-[700px] bg-[#e8d3c8] rounded-full blur-[140px] opacity-60 pointer-events-none -z-10" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-50 pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 left-10 w-[450px] h-[450px] bg-[#f5e1da]/60 rounded-full blur-[110px] opacity-40 pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenChat={() => setChatModalOpen(true)}
        onOpenCheckBooking={handleOpenCheckBooking}
        onOpenSkinQuiz={() => setSkinQuizOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenChat={() => setChatModalOpen(true)}
          onOpenSkinQuiz={() => setSkinQuizOpen(true)}
        />

        {/* Treatment Gallery & Before/After Showcase */}
        <TreatmentGallery
          onSelectTreatmentForBooking={(tName) => handleOpenBooking(tName)}
        />

        {/* Doctors Section */}
        <DoctorsSection
          onOpenBookingWithDoctor={(docName) => {
            handleOpenBooking();
          }}
        />

        {/* Patient Testimonials */}
        <ReviewsSection />

        {/* Location & Branches Section */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenChat={() => setChatModalOpen(true)}
      />

      {/* Floating Action Buttons (Bottom Right Sticky Widget) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Floating Skin Quiz Trigger */}
        <button
          onClick={() => setSkinQuizOpen(true)}
          className="pointer-events-auto shadow-xl bg-white/70 backdrop-blur-xl text-[#4a3e3e] border border-white/90 hover:bg-white/90 px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition cursor-pointer transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-[#cbb3a5]" />
          <span className="hidden sm:inline">Tes Tipe Kulit Gratis</span>
        </button>

        {/* Floating WhatsApp Consultation Trigger */}
        <button
          onClick={() => setChatModalOpen(true)}
          className="pointer-events-auto shadow-2xl bg-emerald-700 hover:bg-emerald-800 text-white backdrop-blur-md px-5.5 py-3.5 rounded-full font-bold text-xs flex items-center gap-2.5 transition cursor-pointer transform hover:scale-105 group border border-white/40"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
          </span>
          <MessageCircle className="w-4 h-4 text-emerald-200 fill-emerald-400/30 group-hover:rotate-12 transition-transform" />
          <span>Konsultasi WhatsApp</span>
        </button>
      </div>

      {/* MODALS */}
      <ReservationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedTreatment={bookingPreselectedTreatment}
        initialTab={bookingInitialTab}
      />

      <ChatConsultation
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        onOpenBooking={(tName) => handleOpenBooking(tName)}
      />

      <SkinQuizModal
        isOpen={skinQuizOpen}
        onClose={() => setSkinQuizOpen(false)}
        onOpenBooking={(tName) => handleOpenBooking(tName)}
      />

    </div>
  );
}
