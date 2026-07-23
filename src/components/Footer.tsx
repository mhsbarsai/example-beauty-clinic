import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenChat }) => {
  return (
    <footer className="bg-[#3d3333] text-[#e8d3c8] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#cbb3a5]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#f5e1da] flex items-center justify-center text-[#3d3333] font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-[#4a3e3e]" />
              </div>
              <span className="font-serif text-2xl font-light tracking-wide text-white">
                Lumina <span className="italic text-[#cbb3a5]">Clinic</span>
              </span>
            </div>

            <p className="text-xs text-[#e8d3c8]/70 leading-relaxed max-w-sm">
              Klinik kecantikan estetik medis terdepan dengan teknologi laser picosecond, terapi DNA Salmon, dan penanganan jerawat holistik oleh Dokter Spesialis Dermatologi.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="text-xs uppercase tracking-widest font-bold text-[#3d3333] bg-[#f5e1da] hover:bg-white px-5 py-2.5 rounded-full transition shadow-md cursor-pointer"
              >
                Reservasi Online
              </button>
              <button
                onClick={onOpenChat}
                className="text-xs uppercase tracking-widest font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 backdrop-blur-md px-5 py-2.5 rounded-full transition border border-emerald-500/40 cursor-pointer flex items-center gap-1.5"
              >
                <span>Konsultasi WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <p className="font-bold text-white uppercase tracking-widest text-[11px]">Perawatan Populer</p>
            <ul className="space-y-2 text-[#e8d3c8]/70">
              <li>Pico Glow Laser Rejuvenation</li>
              <li>Hydrafacial MD Deep Cleanse</li>
              <li>Salmon DNA Skin Booster</li>
              <li>Acne Clearance & Blue Light</li>
              <li>Anti-Aging Botox & V-Shape</li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div className="space-y-3 text-xs">
            <p className="font-bold text-white uppercase tracking-widest text-[11px]">Jam Operasional Klinik</p>
            <ul className="space-y-1.5 text-[#e8d3c8]/70">
              <li><strong className="text-white">Senin - Sabtu:</strong> 09:00 - 20:00 WIB</li>
              <li><strong className="text-white">Minggu & Libur:</strong> 10:00 - 18:00 WIB</li>
              <li className="pt-2 text-[#f5e1da] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#cbb3a5]" />
                <span>Konsultasi Perjanjian Dokter</span>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3 text-xs">
            <p className="font-bold text-white uppercase tracking-widest text-[11px]">Kontak Hotline</p>
            <ul className="space-y-2 text-[#e8d3c8]/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#cbb3a5]" />
                <span>(021) 7280-9988</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#cbb3a5]" />
                <span>info@luminaclinic.co.id</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cbb3a5]" />
                <span>Jakarta, Surabaya, Bandung</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-[11px] text-[#e8d3c8]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Lumina Aesthetic Clinic. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-[#e8d3c8]/60">
            <span>Privasi Pasien</span>
            <span>Syarat & Ketentuan Medis</span>
            <span>Akreditasi Kemenkes</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
