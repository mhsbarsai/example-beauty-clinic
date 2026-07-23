import React, { useState } from 'react';
import { TREATMENTS } from '../data/clinicData';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, Calendar, X } from 'lucide-react';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (treatmentName?: string) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('');
  const [mainConcern, setMainConcern] = useState<string>('');
  const [goal, setGoal] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSkinType('');
    setMainConcern('');
    setGoal('');
  };

  // Treatment recommendation logic based on user answers
  const getRecommendation = () => {
    if (mainConcern.includes('Flek') || mainConcern.includes('Kusam')) {
      return TREATMENTS.find((t) => t.id === 'pico-laser') || TREATMENTS[0];
    }
    if (mainConcern.includes('Jerawat')) {
      return TREATMENTS.find((t) => t.id === 'acne-clearance') || TREATMENTS[3];
    }
    if (mainConcern.includes('Garis') || mainConcern.includes('Kendur')) {
      return TREATMENTS.find((t) => t.id === 'botox-youth') || TREATMENTS[4];
    }
    return TREATMENTS.find((t) => t.id === 'salmon-dna') || TREATMENTS[2];
  };

  const recTreatment = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 bg-[#4a3e3e]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="backdrop-blur-3xl bg-white/90 rounded-[36px] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-white overflow-hidden my-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#4a3e3e] hover:text-[#3d3333] p-2 rounded-full cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#cbb3a5] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#cbb3a5]" />
            <span>Tes Diagnosis Kulit Mandiri</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#3d3333]">
            Analisis Kulit <span className="italic font-normal text-[#cbb3a5]">1-Menit</span>
          </h3>
          <p className="text-xs text-[#4a3e3e]/70">
            Jawab 3 pertanyaan singkat untuk menemukan perawatan medis yang paling tepat untuk Anda.
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3d3333] uppercase tracking-wider">
              Pertanyaan 1/3: Bagaimana kondisi permukaan kulit Anda sehari-hari?
            </p>

            <div className="space-y-2">
              {[
                'Oily / Berminyak & mengkilap di T-zone',
                'Dry / Kering, bersisik, & terasa kaku',
                'Combination / Berminyak di dahi-hidung, kering di pipi',
                'Sensitive / Mudah memerah & gatal iritasi',
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSkinType(opt);
                    setStep(2);
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-white/80 bg-white/50 hover:bg-[#f5e1da]/80 text-xs font-semibold text-[#3d3333] transition cursor-pointer flex items-center justify-between shadow-2xs"
                >
                  <span>{opt}</span>
                  <ArrowRight className="w-4 h-4 text-[#cbb3a5]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3d3333] uppercase tracking-wider">
              Pertanyaan 2/3: Masalah kulit apa yang paling ingin Anda atasi?
            </p>

            <div className="space-y-2">
              {[
                'Jerawat aktif, komedo parah, atau bopeng bekas jerawat',
                'Flek hitam, melasma, & bekas jerawat kehitaman (PIH)',
                'Kulit kusam, pori-pori besar, & tidak bercahaya',
                'Kerutan halus dahi/mata, pipi melorot, & double chin',
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setMainConcern(opt);
                    setStep(3);
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-white/80 bg-white/50 hover:bg-[#f5e1da]/80 text-xs font-semibold text-[#3d3333] transition cursor-pointer flex items-center justify-between shadow-2xs"
                >
                  <span>{opt}</span>
                  <ArrowRight className="w-4 h-4 text-[#cbb3a5]" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs font-medium text-[#4a3e3e]/70 hover:text-[#3d3333] cursor-pointer pt-2"
            >
              &larr; Kembali ke Pertanyaan 1
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#3d3333] uppercase tracking-wider">
              Pertanyaan 3/3: Apa target utama kulit sehat Anda?
            </p>

            <div className="space-y-2">
              {[
                'Hasil Mencerahkan Instan & Glowing Glass Skin',
                'Kulit Bersih Bebas Jerawat & Mulus',
                'Peremajaan Awet Muda & Kontur Wajah Tirus V-Shape',
                'Skin Barrier Kuat & Pori-Pori Ringkas Halus',
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setGoal(opt);
                    setStep(4); // Result
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-white/80 bg-white/50 hover:bg-[#f5e1da]/80 text-xs font-semibold text-[#3d3333] transition cursor-pointer flex items-center justify-between shadow-2xs"
                >
                  <span>{opt}</span>
                  <ArrowRight className="w-4 h-4 text-[#cbb3a5]" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs font-medium text-[#4a3e3e]/70 hover:text-[#3d3333] cursor-pointer pt-2"
            >
              &larr; Kembali ke Pertanyaan 2
            </button>
          </div>
        )}

        {/* STEP 4: QUIZ RESULT */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#f5e1da] text-[#3d3333] flex items-center justify-center mx-auto text-xl font-bold shadow-md border border-white">
              ✨
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a3e3e] bg-[#f5e1da] px-3.5 py-1 rounded-full border border-white">
                Rekomendasi Perawatan Utama
              </span>
              <h4 className="text-2xl font-serif font-light text-[#3d3333] mt-2">
                {recTreatment.name}
              </h4>
              <p className="text-xs text-[#4a3e3e]/70 mt-1 max-w-md mx-auto">
                {recTreatment.shortDesc}
              </p>
            </div>

            {/* Treatment Summary */}
            <div className="bg-[#f5e1da]/80 backdrop-blur-md p-4 rounded-2xl border border-white/80 text-xs text-left space-y-2 text-[#4a3e3e]">
              <p>
                <strong>Profil Diagnosis:</strong> {skinType}
              </p>
              <p>
                <strong>Estimasi Harga:</strong> {recTreatment.priceFormatted} ({recTreatment.durationMinutes} menit)
              </p>
              <p>
                <strong>Downtime:</strong> {recTreatment.downtime}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-1/3 text-xs font-semibold text-[#4a3e3e] bg-white/60 hover:bg-white py-3.5 rounded-full border border-white/80 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Tes</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(recTreatment.name);
                }}
                className="w-full sm:w-2/3 text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#cbb3a5]" />
                <span>Pesan Treatment Ini</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
