import React, { useState } from 'react';
import { TREATMENTS, BEFORE_AFTER_ITEMS } from '../data/clinicData';
import { Treatment, BeforeAfterGalleryItem, TreatmentCategory } from '../types';
import { Sparkles, Clock, ShieldAlert, CheckCircle2, ChevronRight, Info, Eye, ArrowRight, Layers, Sliders, Calendar } from 'lucide-react';

interface TreatmentGalleryProps {
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const TreatmentGallery: React.FC<TreatmentGalleryProps> = ({ onSelectTreatmentForBooking }) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'before-after'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory>('all');
  const [selectedTreatmentModal, setSelectedTreatmentModal] = useState<Treatment | null>(null);

  // Before & After Interactive Slider state (mapping ID to slider percentage)
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({});

  const categories = [
    { id: 'all', label: 'Semua Perawatan' },
    { id: 'laser', label: 'Pico Laser & Glow' },
    { id: 'facial', label: 'Facial Medis' },
    { id: 'acne', label: 'Acne & Scar' },
    { id: 'booster', label: 'Skin Booster DNA' },
    { id: 'anti-aging', label: 'Anti-Aging & Contour' },
    { id: 'body', label: 'Body & V-Shape' },
  ];

  const filteredTreatments = TREATMENTS.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const filteredBeforeAfter = BEFORE_AFTER_ITEMS.filter(
    (ba) => selectedCategory === 'all' || ba.category === selectedCategory
  );

  const handleSliderChange = (id: string, val: number) => {
    setSliderPositions((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section id="perawatan" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#cbb3a5] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#cbb3a5]" />
            <span>Inovasi Estetika Terdepan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#3d3333] tracking-tight">
            Galeri Perawatan & <span className="italic font-normal text-[#cbb3a5]">Transformasi Kulit</span>
          </h2>
          <p className="text-[#4a3e3e]/70 font-sans text-sm sm:text-base leading-relaxed">
            Eksplorasi pilihan treatment estetik berstandar medis tinggi dengan teknologi teruji secara klinis dan hasil transformasi nyata dari para pasien kami.
          </p>
        </div>

        {/* View Switcher: Catalog vs Before-After */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 backdrop-blur-xl bg-white/50 rounded-full border border-white/80 shadow-xs">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#4a3e3e] text-white shadow-md'
                  : 'text-[#4a3e3e]/80 hover:text-[#3d3333]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#cbb3a5]" />
              <span>Katalog & Harga</span>
            </button>

            <button
              id="sebelum-sesudah"
              onClick={() => setActiveTab('before-after')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'before-after'
                  ? 'bg-[#4a3e3e] text-white shadow-md'
                  : 'text-[#4a3e3e]/80 hover:text-[#3d3333]'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#cbb3a5]" />
              <span>Sebelum & Sesudah</span>
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as TreatmentCategory)}
              className={`text-xs font-medium px-4 py-2 rounded-full transition cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#cbb3a5] border-white/80 text-white shadow-xs font-bold'
                  : 'bg-white/40 backdrop-blur-md border-white/70 text-[#4a3e3e] hover:bg-white/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* TAB 1: CATALOG OF TREATMENTS */}
        {activeTab === 'catalog' && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="backdrop-blur-2xl bg-white/45 border border-white/70 rounded-[32px] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
              >
                {/* Card Thumbnail Image */}
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-[#4a3e3e]/85 backdrop-blur-md text-[#e8d3c8] text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border border-white/30">
                    {treatment.categoryLabel}
                  </span>

                  {treatment.popular && (
                    <span className="absolute top-3 right-3 bg-[#cbb3a5] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1 border border-white/40">
                      <Sparkles className="w-3 h-3" /> Favorit
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#3d3333] group-hover:text-[#cbb3a5] transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-[#4a3e3e]/70 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {treatment.shortDesc}
                    </p>
                  </div>

                  {/* Attributes Summary */}
                  <div className="space-y-2 text-xs border-y border-white/60 py-3 text-[#4a3e3e]/80">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#4a3e3e]/60">
                        <Clock className="w-3.5 h-3.5 text-[#cbb3a5]" /> Durasi:
                      </span>
                      <span className="font-semibold text-[#3d3333]">{treatment.durationMinutes} Menit</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#4a3e3e]/60">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#cbb3a5]" /> Rasa Sakit:
                      </span>
                      <span className="font-semibold text-[#3d3333]">{treatment.painLevel}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#4a3e3e]/50 font-bold block">Biaya Per Sesi</span>
                      <span className="text-lg font-bold text-[#3d3333]">{treatment.priceFormatted}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTreatmentModal(treatment)}
                        className="p-2.5 rounded-full text-[#4a3e3e] hover:bg-white/60 transition cursor-pointer border border-white/80"
                        title="Detail Lengkap Prosedur"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectTreatmentForBooking(treatment.name)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#4a3e3e] hover:bg-[#3d3333] text-white px-4 py-2.5 rounded-full transition shadow-md cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#cbb3a5]" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: BEFORE & AFTER GALLERY WITH SLIDER */}
        {activeTab === 'before-after' && (
          <div className="mt-12 space-y-12">
            <div className="backdrop-blur-xl bg-white/50 border border-white/80 p-4 rounded-2xl text-center max-w-2xl mx-auto text-xs text-[#4a3e3e] font-medium shadow-xs">
              💡 <strong>Petunjuk:</strong> Geser slider ke kiri atau kanan pada gambar untuk membandingkan kondisi kulit sebelum & sesudah perawatan.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredBeforeAfter.map((item) => {
                const pos = sliderPositions[item.id] ?? 50;

                return (
                  <div key={item.id} className="backdrop-blur-2xl bg-white/45 rounded-[32px] border border-white/70 shadow-xl p-6 space-y-5">
                    {/* Item Header */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-[#cbb3a5] px-3 py-1 rounded-full">
                          {item.treatmentName}
                        </span>
                        <span className="text-xs text-[#4a3e3e]/70 font-medium">{item.sessionsCount} Sesi Perawatan</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#3d3333] mt-2">{item.title}</h3>
                      <p className="text-xs text-[#4a3e3e]/60 mt-0.5">Oleh: <strong className="text-[#3d3333]">{item.doctorName}</strong> ({item.patientAgeGroup})</p>
                    </div>

                    {/* Interactive Before/After Image Comparison Container */}
                    <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden select-none bg-stone-800 border border-white/80 shadow-inner group">
                      {/* After Image (Background) */}
                      <img
                        src={item.afterImageUrl}
                        alt="Sesudah Treatment"
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 right-3 bg-[#4a3e3e]/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs z-10 border border-white/30">
                        SESUDAH
                      </span>

                      {/* Before Image (Clipped Foreground) */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${pos}%` }}
                      >
                        <img
                          src={item.beforeImageUrl}
                          alt="Sebelum Treatment"
                          className="w-full h-full object-cover max-w-none"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-[#cbb3a5]/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs z-10 border border-white/30">
                          SEBELUM
                        </span>
                      </div>

                      {/* Vertical Divider Handle Line */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-md z-20 pointer-events-none"
                        style={{ left: `${pos}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#4a3e3e] flex items-center justify-center font-bold text-xs shadow-lg border border-white/80">
                          ↔
                        </div>
                      </div>

                      {/* Range Input Overlay for Dragging */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={pos}
                        onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                        title="Geser untuk membandingkan"
                      />
                    </div>

                    {/* Patient Story & Result */}
                    <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 text-xs space-y-1.5">
                      <p className="text-[#4a3e3e]">
                        <strong className="text-[#3d3333]">Keluhan Awal:</strong> {item.patientConcern}
                      </p>
                      <p className="text-[#4a3e3e]">
                        <strong className="text-[#3d3333]">Hasil Dokter:</strong> {item.resultDescription}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectTreatmentForBooking(item.treatmentName)}
                      className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full transition cursor-pointer shadow-md"
                    >
                      <Calendar className="w-4 h-4 text-[#cbb3a5]" />
                      <span>Pesan Perawatan Ini</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TREATMENT DETAIL MODAL */}
        {selectedTreatmentModal && (
          <div className="fixed inset-0 z-50 bg-[#4a3e3e]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="backdrop-blur-3xl bg-white/90 rounded-[36px] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white">
              
              <button
                onClick={() => setSelectedTreatmentModal(null)}
                className="absolute top-5 right-5 text-[#4a3e3e] hover:text-[#3d3333] font-bold p-2 text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-[#cbb3a5] px-3 py-1 rounded-full">
                  {selectedTreatmentModal.categoryLabel}
                </span>
                <span className="text-xs text-[#4a3e3e]/70">{selectedTreatmentModal.durationMinutes} Menit</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3d3333]">
                {selectedTreatmentModal.name}
              </h3>

              <p className="text-[#4a3e3e]/80 text-sm leading-relaxed">
                {selectedTreatmentModal.fullDesc}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/60 p-4 rounded-2xl border border-white/80 text-xs">
                <div>
                  <span className="text-[#4a3e3e]/50 block font-medium">Estimasi Biaya</span>
                  <strong className="text-[#3d3333] text-sm font-bold">{selectedTreatmentModal.priceFormatted}</strong>
                </div>
                <div>
                  <span className="text-[#4a3e3e]/50 block font-medium">Downtime</span>
                  <strong className="text-[#3d3333]">{selectedTreatmentModal.downtime}</strong>
                </div>
                <div>
                  <span className="text-[#4a3e3e]/50 block font-medium">Tingkat Sakit</span>
                  <strong className="text-[#3d3333]">{selectedTreatmentModal.painLevel}</strong>
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#3d3333] mb-2.5">Manfaat Utama Perawatan:</h4>
                <ul className="space-y-2 text-xs text-[#4a3e3e]">
                  {selectedTreatmentModal.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#cbb3a5] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step Procedure */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#3d3333] mb-2.5">Tahapan Prosedur Medis:</h4>
                <ol className="space-y-2 text-xs text-[#4a3e3e] list-decimal list-inside">
                  {selectedTreatmentModal.procedureSteps.map((step, idx) => (
                    <li key={idx} className="pl-1 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#4a3e3e]/60 block">Frekuensi Anjuran Dokter:</span>
                  <span className="text-xs font-semibold text-[#3d3333]">{selectedTreatmentModal.recommendedFrequency}</span>
                </div>

                <button
                  onClick={() => {
                    const tName = selectedTreatmentModal.name;
                    setSelectedTreatmentModal(null);
                    onSelectTreatmentForBooking(tName);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-white bg-[#4a3e3e] hover:bg-[#3d3333] px-7 py-3.5 rounded-full transition shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#cbb3a5]" />
                  <span>Pesan Perawatan Ini</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
