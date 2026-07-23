import React from 'react';
import { TESTIMONIALS } from '../data/clinicData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center text-[#cbb3a5] gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#cbb3a5] text-[#cbb3a5]" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#3d3333]">
            Kisah Transformasi <span className="italic font-normal text-[#cbb3a5]">Pasien Kami</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#4a3e3e]/70">
            Dengarkan langsung ulasan pengalaman dari para pasien yang telah membuktikan hasil nyata perawatan di Lumina Clinic.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="backdrop-blur-2xl bg-white/45 rounded-[32px] p-7 border border-white/70 shadow-xl flex flex-col justify-between space-y-4 relative hover:-translate-y-1 transition-all"
            >
              <Quote className="w-8 h-8 text-[#cbb3a5]/30 absolute top-6 right-6" />

              <div className="space-y-3 relative z-10">
                <div className="flex text-[#cbb3a5] text-xs">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#cbb3a5] text-[#cbb3a5]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#4a3e3e] leading-relaxed font-sans italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#cbb3a5]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#3d3333]">{t.name}</p>
                    <p className="text-[11px] text-[#4a3e3e]/60">{t.role}</p>
                  </div>
                </div>

                <span className="text-[9px] font-bold uppercase tracking-wider text-[#4a3e3e] bg-white/60 px-2.5 py-1 rounded-full border border-white/80 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#cbb3a5]" /> Terverifikasi
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
