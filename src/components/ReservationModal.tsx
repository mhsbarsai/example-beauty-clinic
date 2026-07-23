import React, { useState, useEffect } from 'react';
import { TREATMENTS, DOCTORS, CLINIC_BRANCHES } from '../data/clinicData';
import { ReservationRequest, ReservationResult } from '../types';
import { Calendar, Clock, MapPin, User, Phone, Mail, Sparkles, CheckCircle, Search, QrCode, Copy, Check, ShieldCheck, FileText, X } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: string;
  initialTab?: 'new' | 'check';
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedTreatment = '',
  initialTab = 'new',
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'check'>(initialTab);
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedBranch, setSelectedBranch] = useState<string>(CLINIC_BRANCHES[0].name);
  const [selectedTreatment, setSelectedTreatment] = useState<string>(
    preselectedTreatment || TREATMENTS[0].name
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string>(DOCTORS[0].name);
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('14:00');
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bookingResult, setBookingResult] = useState<ReservationResult | null>(null);

  // Check Booking State
  const [searchCode, setSearchCode] = useState<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [foundReservation, setFoundReservation] = useState<ReservationResult | null>(null);
  const [searchError, setSearchError] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedTreatment) {
      setSelectedTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  if (!isOpen) return null;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      setErrorMessage('Mohon lengkapi Nama Lengkap dan Nomor WhatsApp Anda.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const payload: ReservationRequest = {
        patientName,
        phone,
        email,
        treatmentName: selectedTreatment,
        doctorName: selectedDoctor,
        branchName: selectedBranch,
        date: bookingDate,
        timeSlot: bookingTimeSlot,
        notes,
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.reservation) {
        setBookingResult(data.reservation);
        setStep(5); // Confirmation Step
      } else {
        setErrorMessage(data.message || 'Gagal membuat reservasi.');
      }
    } catch (err: any) {
      setErrorMessage('Terjadi gangguan jaringan. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setSearchLoading(true);
    setSearchError('');
    setFoundReservation(null);

    try {
      const res = await fetch(`/api/reservations?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();

      if (data.success && data.reservation) {
        setFoundReservation(data.reservation);
      } else {
        setSearchError(data.message || 'Kode reservasi tidak ditemukan.');
      }
    } catch (err) {
      setSearchError('Gagal mengambil data reservasi.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#4a3e3e]/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="backdrop-blur-3xl bg-white/90 rounded-[36px] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-white overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#4a3e3e] hover:text-[#3d3333] p-2 rounded-full cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Tabs */}
        <div className="flex items-center gap-2 border-b border-white/80 pb-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('new');
              if (step === 5) setStep(1);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'new'
                ? 'bg-[#4a3e3e] text-white shadow-md'
                : 'text-[#4a3e3e]/70 hover:bg-white/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#cbb3a5]" />
            <span>Reservasi Baru</span>
          </button>

          <button
            onClick={() => setActiveTab('check')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'check'
                ? 'bg-[#4a3e3e] text-white shadow-md'
                : 'text-[#4a3e3e]/70 hover:bg-white/60'
            }`}
          >
            <Search className="w-4 h-4 text-[#cbb3a5]" />
            <span>Cek Status</span>
          </button>
        </div>

        {/* TAB 1: NEW RESERVATION WIZARD */}
        {activeTab === 'new' && (
          <div>
            {step < 5 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-[#4a3e3e]/70 mb-2">
                  <span>Langkah {step} dari 4</span>
                  <span>
                    {step === 1 && 'Pilih Perawatan & Cabang'}
                    {step === 2 && 'Pilih Dokter Spesialis'}
                    {step === 3 && 'Jadwal & Waktu Kedatangan'}
                    {step === 4 && 'Data Diri Pasien'}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden border border-white/80">
                  <div
                    className="h-full bg-[#cbb3a5] transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-md border border-red-200 text-red-700 text-xs rounded-2xl">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: Branch & Treatment */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#3d3333] uppercase tracking-wider mb-2">
                    Pilih Cabang Klinik:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CLINIC_BRANCHES.map((branch) => (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch.name)}
                        className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition flex items-start gap-2.5 ${
                          selectedBranch === branch.name
                            ? 'border-[#cbb3a5] bg-[#f5e1da]/70 shadow-xs'
                            : 'border-white/80 bg-white/50 hover:bg-white/80'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-[#cbb3a5] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[#3d3333]">{branch.name}</p>
                          <p className="text-[11px] text-[#4a3e3e]/70 mt-0.5">{branch.openingHours}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d3333] uppercase tracking-wider mb-2">
                    Pilih Perawatan Medis:
                  </label>
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-white/80 text-xs font-semibold text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                  >
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} - {t.priceFormatted} ({t.durationMinutes} mnt)
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-4 rounded-full transition cursor-pointer shadow-md"
                >
                  Lanjut: Pilih Dokter &rarr;
                </button>
              </div>
            )}

            {/* STEP 2: Doctor Selection */}
            {step === 2 && (
              <div className="space-y-5">
                <label className="block text-xs font-bold text-[#3d3333] uppercase tracking-wider">
                  Pilih Dokter Spesialis:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {DOCTORS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc.name)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                        selectedDoctor === doc.name
                          ? 'border-[#cbb3a5] bg-[#f5e1da]/70 shadow-xs'
                          : 'border-white/80 bg-white/50 hover:bg-white/80'
                      }`}
                    >
                      <img
                        src={doc.imageUrl}
                        alt={doc.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#cbb3a5]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-[#3d3333]">{doc.name}</p>
                        <p className="text-[11px] text-[#cbb3a5] font-semibold">{doc.title}</p>
                        <p className="text-[10px] text-[#4a3e3e]/60 mt-0.5">{doc.scheduleDays}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 text-xs font-semibold text-[#4a3e3e] bg-white/60 hover:bg-white py-3.5 rounded-full border border-white/80 cursor-pointer"
                  >
                    &larr; Kembali
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="w-2/3 text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full shadow-md cursor-pointer"
                  >
                    Lanjut: Tanggal & Jam &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Date & Slot */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#3d3333] uppercase tracking-wider mb-2">
                    Pilih Tanggal Kedatangan:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-white/80 text-xs font-semibold text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d3333] uppercase tracking-wider mb-2">
                    Pilih Slot Jam Kedatangan:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {['09:30', '10:30', '11:30', '14:00', '15:30', '16:30', '18:00'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingTimeSlot(slot)}
                        className={`py-2.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                          bookingTimeSlot === slot
                            ? 'bg-[#cbb3a5] border-white text-white font-bold shadow-xs'
                            : 'bg-white/50 border-white/80 text-[#4a3e3e] hover:bg-white/80'
                        }`}
                      >
                        {slot} WIB
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/3 text-xs font-semibold text-[#4a3e3e] bg-white/60 hover:bg-white py-3.5 rounded-full border border-white/80 cursor-pointer"
                  >
                    &larr; Kembali
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="w-2/3 text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full shadow-md cursor-pointer"
                  >
                    Lanjut: Data Pasien &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Patient Info Form */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3d3333] mb-1">
                      Nama Lengkap Pasien *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Siti Rahmawati"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-white/80 text-xs text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3d3333] mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-white/80 text-xs text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d3333] mb-1">
                    Email (Opsional untuk konfirmasi e-Ticket)
                  </label>
                  <input
                    type="email"
                    placeholder="nama@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-white/80 text-xs text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3d3333] mb-1">
                    Catatan / Keluhan Kulit (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Sebutkan kendala kulit atau permintaan khusus untuk dokter..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-white/80 text-xs text-[#3d3333] bg-white/70 backdrop-blur-md focus:outline-none"
                  />
                </div>

                {/* Summary Box */}
                <div className="p-3.5 bg-[#f5e1da]/80 backdrop-blur-md rounded-2xl border border-white/80 text-xs space-y-1 text-[#4a3e3e]">
                  <p><strong>Ringkasan:</strong> {selectedTreatment} di {selectedBranch}</p>
                  <p><strong>Dokter & Waktu:</strong> {selectedDoctor} | {bookingDate} jam {bookingTimeSlot} WIB</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-1/3 text-xs font-semibold text-[#4a3e3e] bg-white/60 hover:bg-white py-3.5 rounded-full border border-white/80 cursor-pointer"
                  >
                    &larr; Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Memproses...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-[#cbb3a5]" />
                        <span>Konfirmasi & Buat Tiket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: CONFIRMED RESERVATION TICKET */}
            {step === 5 && bookingResult && (
              <div className="space-y-6 text-center">
                <div className="w-14 h-14 bg-[#f5e1da] rounded-full flex items-center justify-center text-[#4a3e3e] mx-auto shadow-md border border-white">
                  <CheckCircle className="w-8 h-8 text-[#cbb3a5]" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a3e3e] bg-[#f5e1da] px-3.5 py-1 rounded-full border border-white">
                    Reservasi Berhasil Terkonfirmasi
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#3d3333] mt-2">
                    Tiket Janji Temu <span className="italic font-normal text-[#cbb3a5]">Digital</span>
                  </h3>
                  <p className="text-xs text-[#4a3e3e]/70">
                    Simpan kode booking Anda untuk ditunjukkan saat tiba di resepsionis klinik.
                  </p>
                </div>

                {/* Ticket Card View */}
                <div className="bg-[#3d3333] text-white rounded-[28px] p-6 text-left relative overflow-hidden border border-white/20 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <p className="text-[10px] text-[#cbb3a5] uppercase tracking-widest font-bold">Lumina Aesthetic Clinic</p>
                      <p className="text-xs text-[#e8d3c8]">{bookingResult.branchName}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-[#e8d3c8]/60">Kode Booking</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-lg font-extrabold text-[#f5e1da]">
                          {bookingResult.bookingCode}
                        </span>
                        <button
                          onClick={() => handleCopyCode(bookingResult.bookingCode)}
                          className="p-1 rounded text-[#e8d3c8]/60 hover:text-white cursor-pointer"
                          title="Salin Kode"
                        >
                          {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">Pasien</span>
                      <strong className="text-white">{bookingResult.patientName}</strong>
                    </div>

                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">WhatsApp</span>
                      <strong className="text-white">{bookingResult.phone}</strong>
                    </div>

                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">Perawatan</span>
                      <strong className="text-[#f5e1da]">{bookingResult.treatmentName}</strong>
                    </div>

                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">Dokter Spesialis</span>
                      <strong className="text-white">{bookingResult.doctorName}</strong>
                    </div>

                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">Tanggal</span>
                      <strong className="text-white">{bookingResult.date}</strong>
                    </div>

                    <div>
                      <span className="text-[#e8d3c8]/60 block text-[10px] uppercase tracking-wider">Jam Slot</span>
                      <strong className="text-[#f5e1da]">{bookingResult.timeSlot} WIB</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#e8d3c8]/70">
                    <span>Status: <strong className="text-emerald-400">Terkonfirmasi</strong></span>
                    <span>Tiba 15 menit sebelum jam jadwal</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSearchCode(bookingResult.bookingCode);
                      setActiveTab('check');
                    }}
                    className="w-full text-xs font-semibold text-[#4a3e3e] bg-white/60 hover:bg-white py-3.5 rounded-full border border-white/80 cursor-pointer"
                  >
                    Cek Detail Tiket
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full text-xs font-bold uppercase tracking-widest text-white bg-[#4a3e3e] hover:bg-[#3d3333] py-3.5 rounded-full cursor-pointer shadow-md"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CHECK EXISTING BOOKING STATUS */}
        {activeTab === 'check' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold text-[#3d3333]">
                Pencarian Status Reservasi
              </h3>
              <p className="text-xs text-[#4a3e3e]/70 mt-1">
                Masukkan Kode Booking (contoh: LMN-8921) untuk memeriksa jadwal janji temu Anda.
              </p>
            </div>

            <form onSubmit={handleSearchBooking} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Kode Booking (e.g. LMN-8921)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                className="flex-1 p-3.5 rounded-2xl border border-white/80 font-mono text-sm text-[#3d3333] uppercase bg-white/70 backdrop-blur-md focus:outline-none"
              />
              <button
                type="submit"
                disabled={searchLoading}
                className="text-xs font-bold uppercase tracking-wider text-white bg-[#4a3e3e] hover:bg-[#3d3333] px-6 py-3.5 rounded-2xl transition cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <Search className="w-4 h-4 text-[#cbb3a5]" />
                <span>Cari</span>
              </button>
            </form>

            {searchError && (
              <div className="p-3 bg-red-50/80 backdrop-blur-md border border-red-200 text-red-700 text-xs rounded-2xl text-center">
                {searchError}
              </div>
            )}

            {foundReservation && (
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 text-xs space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-white/80 pb-2">
                  <span className="font-mono font-bold text-[#3d3333] text-sm">{foundReservation.bookingCode}</span>
                  <span className="bg-[#f5e1da] text-[#4a3e3e] font-bold px-3 py-1 rounded-full text-[10px] border border-white">
                    {foundReservation.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[#4a3e3e]">
                  <p><strong>Pasien:</strong> {foundReservation.patientName}</p>
                  <p><strong>WhatsApp:</strong> {foundReservation.phone}</p>
                  <p><strong>Perawatan:</strong> {foundReservation.treatmentName}</p>
                  <p><strong>Dokter:</strong> {foundReservation.doctorName}</p>
                  <p><strong>Cabang:</strong> {foundReservation.branchName}</p>
                  <p><strong>Jadwal:</strong> {foundReservation.date} ({foundReservation.timeSlot} WIB)</p>
                </div>

                {foundReservation.notes && (
                  <p className="text-[#4a3e3e]/70 italic bg-white/80 p-2.5 rounded-xl border border-white/80">
                    "Catatan: {foundReservation.notes}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
