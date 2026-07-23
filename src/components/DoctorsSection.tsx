import React from 'react';
import { DOCTORS } from '../data/clinicData';
import { Calendar, Star, Award, ShieldCheck, MapPin } from 'lucide-react';

interface DoctorsSectionProps {
  onOpenBookingWithDoctor: (docName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onOpenBookingWithDoctor }) => {
  return (
    <section id="dokter" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#cbb3a5] text-[10px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#cbb3a5]" />
            <span>Spesialis Berdedikasi Tinggi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#3d3333] tracking-tight">
            Tim Dokter Dermatologi & <span className="italic font-normal text-[#cbb3a5]">Aesthetic Expert</span>
          </h2>
          <p className="text-[#4a3e3e]/70 font-sans text-sm sm:text-base leading-relaxed">
            Setiap perawatan ditangani secara langsung oleh Dokter Spesialis Kulit & Kelamin (Sp.D.V.E.) dan Dokter Estetik bersertifikat nasional & internasional.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="backdrop-blur-2xl bg-white/45 rounded-[32px] border border-white/70 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Image & Rating */}
              <div className="relative aspect-[4/5] bg-stone-200 overflow-hidden">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                <div className="absolute top-3 right-3 bg-[#3d3333]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/30">
                  <Star className="w-3 h-3 fill-[#cbb3a5] text-[#cbb3a5]" />
                  <span>{doc.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-[#3d3333] text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/80">
                  <Award className="w-3.5 h-3.5 text-[#cbb3a5]" />
                  <span>{doc.experienceYears}+ Thn Pengalaman</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#3d3333] group-hover:text-[#cbb3a5] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#cbb3a5] uppercase tracking-wider mt-0.5">{doc.title}</p>
                  <p className="text-[#4a3e3e]/70 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/60 space-y-1.5 text-xs text-[#4a3e3e]">
                  <p className="flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#cbb3a5] shrink-0" />
                    <span className="font-semibold text-[#3d3333]">{doc.branch}</span>
                  </p>
                  <p className="text-[11px] text-[#4a3e3e]/60 font-sans">
                    📅 {doc.scheduleDays}
                  </p>
                </div>

                <button
                  onClick={() => onOpenBookingWithDoctor(doc.name)}
                  className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3 rounded-full transition cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#cbb3a5]" />
                  <span>Konsultasi</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
