import React, { useState } from 'react';
import { Sparkles, Calendar, MessageCircle, Phone, Search, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (treatmentName?: string) => void;
  onOpenChat: () => void;
  onOpenCheckBooking: () => void;
  onOpenSkinQuiz: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenChat,
  onOpenCheckBooking,
  onOpenSkinQuiz,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'perawatan', label: 'Galeri Perawatan' },
    { id: 'sebelum-sesudah', label: 'Sebelum & Sesudah' },
    { id: 'dokter', label: 'Dokter Spesialis' },
    { id: 'lokasi', label: 'Cabang & Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/40 border-b border-white/60 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#4a3e3e]/90 backdrop-blur-md text-[#fdfaf8] text-xs py-2 px-4 text-center flex items-center justify-center gap-2 font-medium">
        <span className="inline-flex items-center gap-1 bg-[#cbb3a5]/30 text-[#e8d3c8] px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
          <ShieldCheck className="w-3 h-3 text-[#cbb3a5]" /> Promo Spesial
        </span>
        <span className="text-stone-200">Diskon 25% Perawatan Pertama + Gratis Skin Test & Konsultasi Dokter Spesialis!</span>
        <button
          onClick={() => onOpenBooking()}
          className="underline hover:text-[#cbb3a5] ml-2 font-semibold cursor-pointer hidden sm:inline"
        >
          Klaim Promo &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#cbb3a5] bg-white/50 backdrop-blur-md flex items-center justify-center text-[#cbb3a5] shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xl font-serif italic font-bold text-[#cbb3a5]">L</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-light tracking-[0.15em] uppercase text-[#3d3333]">
                  Lumina
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#4a3e3e] font-bold bg-[#cbb3a5]/20 border border-[#cbb3a5]/40 px-2 py-0.5 rounded-full">
                  Aesthetic
                </span>
              </div>
              <p className="text-[9px] text-[#4a3e3e]/60 tracking-[0.2em] font-medium uppercase">
                Beauty & Skin Specialist Clinic
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#4a3e3e]/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-all cursor-pointer relative py-1 hover:opacity-100 ${
                  activeSection === link.id
                    ? 'text-[#3d3333] font-bold border-b border-[#cbb3a5] pb-0.5'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCheckBooking}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4a3e3e] bg-white/40 hover:bg-white/70 backdrop-blur-md border border-white/70 px-3.5 py-2.5 rounded-full transition cursor-pointer shadow-xs"
              title="Cek Status Reservasi Saya"
            >
              <Search className="w-3.5 h-3.5 text-[#cbb3a5]" />
              <span>Cek Booking</span>
            </button>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#3d3333] bg-emerald-100/80 hover:bg-emerald-200/90 backdrop-blur-md border border-emerald-300/60 px-4 py-2.5 rounded-full transition cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-600/20" />
              <span>Konsultasi WhatsApp</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-white bg-[#4a3e3e] hover:bg-[#3d3333] px-5 py-2.5 rounded-full shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#cbb3a5]" />
              <span>Reservasi</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 rounded-full bg-[#f5e1da] text-[#4a3e3e] cursor-pointer border border-white/60"
              title="Chat Konsultasi"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#4a3e3e] hover:bg-white/50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-white/80 border-b border-white/80 px-6 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-xs uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-4 rounded-2xl ${
                  activeSection === link.id
                    ? 'bg-[#cbb3a5]/20 text-[#3d3333] font-bold border border-[#cbb3a5]/30'
                    : 'text-[#4a3e3e]/80 hover:bg-white/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#cbb3a5]/20 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSkinQuiz();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#4a3e3e] bg-white/60 backdrop-blur-md border border-white/80 py-3 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#cbb3a5]" />
              <span>Tes Tipe Kulit Gratis</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckBooking();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#4a3e3e] bg-white/60 backdrop-blur-md border border-white/80 py-3 rounded-full"
            >
              <Search className="w-4 h-4 text-[#cbb3a5]" />
              <span>Cek Status Reservasi</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-[#4a3e3e] py-3.5 rounded-full shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#cbb3a5]" />
              <span>Reservasi Online Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
