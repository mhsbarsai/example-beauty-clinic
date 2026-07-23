import React from 'react';
import { CLINIC_BRANCHES } from '../data/clinicData';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="lokasi" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#cbb3a5] text-[10px] font-bold uppercase tracking-[0.2em]">
            <MapPin className="w-3.5 h-3.5 text-[#cbb3a5]" />
            <span>Jaringan Klinik Terdekat</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#3d3333] tracking-tight">
            Lokasi Cabang & <span className="italic font-normal text-[#cbb3a5]">Jam Operasional</span>
          </h2>
          <p className="text-[#4a3e3e]/70 font-sans text-sm sm:text-base leading-relaxed">
            Kunjungi cabang Lumina Aesthetic Clinic terdekat di kota Anda. Nikmati ruangan periksa yang higienis, privat, dan fasilitas modern yang nyaman.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CLINIC_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="backdrop-blur-2xl bg-white/45 rounded-[32px] border border-white/70 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-stone-200 overflow-hidden">
                <img
                  src={branch.imageUrl}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#3d3333]/85 backdrop-blur-md text-[#e8d3c8] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-white/30">
                  {branch.city}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#3d3333]">
                    {branch.name}
                  </h3>
                  <p className="text-[#4a3e3e]/70 text-xs mt-2 leading-relaxed">
                    {branch.address}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#4a3e3e]/80 pt-2 border-t border-white/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#cbb3a5] shrink-0" />
                    <span>{branch.openingHours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#cbb3a5] shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsappNumber}?text=Halo%20Lumina%20Clinic%20${encodeURIComponent(
                      branch.name
                    )},%20saya%20ingin%20reservasi.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-2.5 rounded-full transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#cbb3a5]" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 text-[#4a3e3e] hover:bg-white/60 rounded-full transition border border-white/80"
                    title="Buka Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
