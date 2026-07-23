export type TreatmentCategory =
  | 'all'
  | 'facial'
  | 'acne'
  | 'anti-aging'
  | 'booster'
  | 'body'
  | 'laser';

export interface Treatment {
  id: string;
  name: string;
  category: TreatmentCategory;
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  priceFormatted: string;
  durationMinutes: number;
  downtime: string;
  painLevel: 'Tanpa Rasa Sakit' | 'Sangat Minim' | 'Ringan / Nyaman' | 'Sedang';
  benefits: string[];
  recommendedFrequency: string;
  imageUrl: string;
  popular?: boolean;
  procedureSteps: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  imageUrl: string;
  scheduleDays: string;
  branch: string;
  rating: number;
  bio: string;
  availableTimeSlots: string[];
}

export interface BeforeAfterGalleryItem {
  id: string;
  title: string;
  category: TreatmentCategory;
  treatmentName: string;
  doctorName: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  sessionsCount: number;
  patientAgeGroup: string;
  patientConcern: string;
  resultDescription: string;
}

export interface ClinicBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  openingHours: string;
  googleMapsUrl: string;
  imageUrl: string;
}

export interface ReservationRequest {
  patientName: string;
  phone: string;
  email?: string;
  treatmentName: string;
  doctorName: string;
  branchName: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface ReservationResult extends ReservationRequest {
  id: string;
  bookingCode: string;
  status: "Terkonfirmasi" | "Selesai" | "Dibatalkan";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'doctor';
  content: string;
  timestamp: string;
  suggestedTreatments?: string[];
  isError?: boolean;
}

export interface SkinProfile {
  skinType?: 'Oily / Berminyak' | 'Dry / Kering' | 'Combination / Kombinasi' | 'Sensitive / Sensitif' | 'Normal';
  concerns?: string[];
  ageGroup?: '18-24' | '25-34' | '35-44' | '45+';
  budgetRange?: 'Ekonomis (< 1 Juta)' | 'Standar (1-2.5 Juta)' | 'Premium (2.5+ Juta)';
}
