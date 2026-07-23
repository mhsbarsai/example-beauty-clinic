import React, { useState } from 'react';
import { MessageCircle, X, ShieldCheck, Phone, MapPin, Send, ExternalLink, Sparkles, CheckCircle2, User, Stethoscope } from 'lucide-react';
import { CLINIC_BRANCHES as branches, DOCTORS as doctors } from '../data/clinicData';

interface ChatConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (treatmentName?: string) => void;
}

export const ChatConsultation: React.FC<ChatConsultationProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [patientName, setPatientName] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Konsultasi Perawatan Kulit');
  const [customMessage, setCustomMessage] = useState('');

  if (!isOpen) return null;

  const topics = [
    'Konsultasi Perawatan Kulit',
    'Penanganan Jerawat & Bekas Jerawat',
    'Laser Flek & Hiperpigmentasi',
    'Injeksi DNA Salmon & Skin Booster',
    'Tanya Promo & Paket Harga Hari Ini',
    'Jadwal Praktik Dokter Spesialis',
  ];

  const handleOpenWhatsApp = (overrideTopic?: string) => {
    const topicToUse = overrideTopic || selectedTopic;
    
    // Construct prefilled WhatsApp message
    let messageText = `Halo Lumina Aesthetic Clinic, saya ingin berkonsultasi via WhatsApp.`;
    
    if (patientName.trim()) {
      messageText += `\n\n• Nama: ${patientName.trim()}`;
    }
    
    messageText += `\n• Cabang Pilihan: ${selectedBranch}`;
    
    if (selectedDoctor) {
      messageText += `\n• Dokter Pilihan: ${selectedDoctor}`;
    }
    
    messageText += `\n• Topik / Keluhan: ${topicToUse}`;
    
    if (customMessage.trim()) {
      messageText += `\n• Catatan Khusus: ${customMessage.trim()}`;
    }
    
    messageText += `\n\nMohon info ketersediaan jadwal & estimasi biaya perawatan. Terima kasih!`;

    const encodedMsg = encodeURIComponent(messageText);
    const waNumber = '6281234567890'; // Main WhatsApp Hotline
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#4a3e3e]/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="backdrop-blur-3xl bg-white/95 rounded-[36px] max-w-3xl w-full max-h-[90vh] flex flex-col relative shadow-2xl border border-white overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#3d3333] text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold shadow-md">
              <MessageCircle className="w-6 h-6 text-emerald-400 fill-emerald-500/30" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-light tracking-wide text-white">
                  Konsultasi <span className="italic font-normal text-emerald-300">WhatsApp CS</span>
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online Active
                </span>
              </div>
              <p className="text-[11px] text-[#e8d3c8]/80 mt-0.5">
                Terhubung Langsung dengan Front Office & Tim Medis Lumina Clinic
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#e8d3c8]/60 hover:text-white p-2 rounded-full cursor-pointer transition hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#fdfaf8]/80 backdrop-blur-md">
          
          {/* Direct WhatsApp Action Banner */}
          <div className="bg-gradient-to-r from-emerald-900/90 to-[#3d3333] p-5 rounded-3xl text-white shadow-lg border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-300 bg-emerald-500/20 px-3 py-0.5 rounded-full border border-emerald-400/30 inline-block">
                Respon Instan 1-3 Menit
              </span>
              <h4 className="text-base font-serif font-light text-white">
                Chat Langsung via Official WhatsApp
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed max-w-md">
                Layanan informasi promo, harga treatment, konsultasi foto kulit, dan reservasi langsung bersama Customer Service kami.
              </p>
            </div>

            <button
              onClick={() => handleOpenWhatsApp()}
              className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-950 bg-emerald-400 hover:bg-emerald-300 px-6 py-3.5 rounded-full shadow-md transition transform hover:scale-105 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>Chat CS Sekarang</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

          {/* Form Filter Konsultasi WhatsApp */}
          <div className="bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-200/80 pb-3">
              <Sparkles className="w-4 h-4 text-[#cbb3a5]" />
              <h4 className="text-sm font-bold text-[#3d3333] uppercase tracking-wider">
                Formulir Konsultasi Terintegrasi WhatsApp
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Nama Pasien */}
              <div>
                <label className="block font-semibold text-[#3d3333] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#cbb3a5]" />
                  <span>Nama Lengkap Anda (Opsional):</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Anisa Putri"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 bg-white/90 text-[#3d3333] text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Cabang Klinik */}
              <div>
                <label className="block font-semibold text-[#3d3333] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#cbb3a5]" />
                  <span>Pilih Cabang Klinik Tujuan:</span>
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 bg-white/90 text-[#3d3333] text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dokter Pilihan */}
              <div>
                <label className="block font-semibold text-[#3d3333] mb-1.5 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#cbb3a5]" />
                  <span>Dokter Pilihan (Opsional):</span>
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 bg-white/90 text-[#3d3333] text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Bebas / Konsultasi CS Utama --</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} ({doc.specialization.split(',')[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Topik Konsultasi */}
              <div>
                <label className="block font-semibold text-[#3d3333] mb-1.5">
                  Pilih Topik Konsultasi:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-stone-200 bg-white/90 text-[#3d3333] text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {topics.map((top, idx) => (
                    <option key={idx} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="text-xs">
              <label className="block font-semibold text-[#3d3333] mb-1.5">
                Keluhan / Pertanyaan Tambahan:
              </label>
              <textarea
                rows={2}
                placeholder="Tuliskan keluhan seperti jenis jerawat, flek, atau pertanyaan harga paket..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 rounded-2xl border border-stone-200 bg-white/90 text-[#3d3333] text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button to WhatsApp */}
            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest shadow-md transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim & Mulai Chat di WhatsApp</span>
            </button>
          </div>

          {/* Quick Topics Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#3d3333] uppercase tracking-wider">
              Topik Favorit Konsultasi Cepat:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                '🔥 Tanya Promo Perawatan Bulan Ini',
                '✨ Konsultasi Flek Hitam & Pico Laser',
                '🌿 Penanganan Jerawat & Acne Subcision',
                '💉 Tanya Biaya DNA Salmon & Skin Booster',
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(item.replace(/^[^a-zA-Z0-9]+/, ''))}
                  className="p-3 rounded-2xl bg-white/90 hover:bg-emerald-50 border border-white hover:border-emerald-300 text-xs font-medium text-[#3d3333] text-left transition flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <span>{item}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Direct Hotline Per Cabang */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#3d3333] uppercase tracking-wider">
              Kontak WhatsApp Direct Per Cabang:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {branches.map((b) => (
                <a
                  key={b.id}
                  href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${b.name}, saya ingin tanya jadwal dan reservasi perawatan.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-white/80 hover:bg-emerald-50/80 border border-white hover:border-emerald-200 transition flex items-center justify-between group shadow-2xs"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#3d3333]">{b.name}</p>
                    <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {b.phone}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition">
                    Chat WA
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-[#3d3333]/90 text-[#e8d3c8] px-6 py-3 text-[11px] flex items-center justify-between border-t border-white/10 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Kerahasiaan data & konsultasi medis terjamin 100%</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="font-bold underline hover:text-white cursor-pointer"
          >
            Reservasi Dokter Langsung &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
