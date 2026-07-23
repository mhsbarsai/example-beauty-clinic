import React from 'react';
import { Calendar, MessageCircle, Sparkles, ShieldCheck, Star, Users, MapPin, ArrowRight, Heart } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
  onOpenSkinQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenChat, onOpenSkinQuiz }) => {
  return (
    <section id="beranda" className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-[#cbb3a5] shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#cbb3a5] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#cbb3a5]" />
              <span>Aesthetic Medical Clinic #1 Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#3d3333] leading-[1.05] tracking-tight">
              Sentuhan Estetika Medis <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#cbb3a5]">Timeless Radiance</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-[#4a3e3e]/70 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Perawatan kulit berteknologi laser picosecond, injeksi DNA Salmon, & acne therapy medis langsung bersama <strong className="text-[#3d3333] font-semibold">Dokter Spesialis Dermatologi (Sp.D.V.E.)</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#4a3e3e] hover:bg-[#3d3333] px-7 py-4 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
              >
                <Calendar className="w-4 h-4 text-[#cbb3a5]" />
                <span>Reservasi Dokter</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
              </button>

              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#3d3333] bg-emerald-50 hover:bg-emerald-100 backdrop-blur-md border border-emerald-300 px-6 py-4 rounded-full transition cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-500/30" />
                <span>Konsultasi WhatsApp</span>
              </button>

              <button
                onClick={onOpenSkinQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#4a3e3e]/80 hover:text-[#3d3333] bg-white/30 hover:bg-white/60 backdrop-blur-xs border border-white/60 px-5 py-4 rounded-full transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#cbb3a5]" />
                <span>Tes Kulit Gratis</span>
              </button>
            </div>

            {/* Guarantees Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/60 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#cbb3a5] shrink-0" />
                <span className="text-[11px] font-medium text-[#4a3e3e]/80 leading-tight">100% Produk Terakreditasi FDA</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#cbb3a5] shrink-0" />
                <span className="text-[11px] font-medium text-[#4a3e3e]/80 leading-tight">Dokter Spesialis Berlisensi</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#cbb3a5] shrink-0" />
                <span className="text-[11px] font-medium text-[#4a3e3e]/80 leading-tight">5 Cabang Modern & Nyaman</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[40px] p-4 shadow-2xl">
              
              {/* Main Image Frame */}
              <div className="relative rounded-[32px] overflow-hidden border border-white/80 shadow-inner bg-stone-200 aspect-[4/3] sm:aspect-[1/1]">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
                  alt="Lumina Aesthetic Clinic Treatment"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge Top Right */}
                <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-xl text-[#3d3333] p-3 rounded-2xl border border-white/90 shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5e1da] flex items-center justify-center text-[#4a3e3e] font-bold text-xs border border-white">
                    4.9★
                  </div>
                  <div>
                    <div className="flex text-[#cbb3a5] text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#cbb3a5]" />
                      ))}
                    </div>
                    <p className="text-[10px] text-[#4a3e3e]/80 font-medium mt-0.5">2,500+ Pasien Puas</p>
                  </div>
                </div>

                {/* Floating Card Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-xl p-3.5 rounded-2xl border border-white/90 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80"
                      alt="dr. Clara Sp.D.V.E."
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#cbb3a5]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#3d3333]">dr. Clara Vernanda Sp.D.V.E.</p>
                      <p className="text-[10px] text-[#4a3e3e]/70">Spesialis Laser & Pigmentasi</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#4a3e3e] bg-[#f5e1da]/80 hover:bg-[#f5e1da] px-3.5 py-2 rounded-full transition cursor-pointer border border-white/80"
                  >
                    Konsultasi
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
