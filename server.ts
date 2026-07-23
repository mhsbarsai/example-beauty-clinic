import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory reservation storage for demo persistence
interface Reservation {
  id: string;
  bookingCode: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentName: string;
  doctorName: string;
  branchName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: "Terkonfirmasi" | "Selesai" | "Dibatalkan";
  createdAt: string;
}

const reservations: Reservation[] = [
  {
    id: "res-101",
    bookingCode: "LMN-8921",
    patientName: "Siti Rahmawati",
    phone: "081234567890",
    email: "siti.rahma@example.com",
    treatmentName: "Pico Glow Laser Rejuvenation",
    doctorName: "dr. Clara Vernanda Sp.D.V.E.",
    branchName: "Dharmawangsa - Jakarta Selatan",
    date: "2026-07-25",
    timeSlot: "14:00",
    notes: "Ingin fokus mencerahkan bekas jerawat dan meratakan warna kulit",
    status: "Terkonfirmasi",
    createdAt: new Date().toISOString(),
  }
];

// Initialize Gemini API client on the server
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// API Route: AI Consultation Chatbot
app.post("/api/consultation", async (req, res) => {
  try {
    const { messages, skinProfile } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.status(503).json({
        error: "Sistem AI sedang bersiap. Silakan coba sebentar lagi.",
        fallbackResponse:
          "Halo! Selamat datang di Konsultasi Lumina Aesthetic Clinic. Tim dokter dan aesthetician kami siap membantu Anda. Untuk saran cepat, silakan sebutkan tipe kulit dan keluhan utama Anda (seperti jerawat, flek hitam, atau kusam).",
      });
    }

    const systemInstruction = `Anda adalah "AuraAI", konsultan estetik dan kecantikan senior di Lumina Aesthetic Clinic Indonesia.
Tugas Anda adalah memberikan konsultasi medis ringan, ramah, ilmiah namun mudah dipahami mengenai perawatan kulit, rekomendasi treatment klinik, serta urutan skincare rutin harian.

Pedoman Respon:
1. Bersikap ramah, empati, profesional seperti dokter estetik berpengalaman.
2. Jelaskan penyebab masalah kulit (seperti acne/jerawat, hiperpigmentasi/flek, aging, pori besar, atau kulit kusam).
3. Berikan rekomendasi treatment dari Lumina Aesthetic Clinic berikut yang relevan:
   - Pico Glow Laser Rejuvenation (untuk flek, bekas jerawat hitam, hiperpigmentasi, pencerahan) - Rp 1.800.000
   - Hydrafacial MD Deep Cleanse (untuk komedo, pori-pori tersumbat, kulit kusam & hidrasi) - Rp 950.000
   - Acne Clearance & Blue Light Therapy (untuk jerawat aktif, radang, kemerahan) - Rp 850.000
   - Salmon DNA Skin Booster (untuk peremajaan, tekstur halus, glowing instan) - Rp 2.500.000
   - Anti-Aging Botox & Youth Contour (untuk kerutan dahi/crow's feet & pengencangan) - Rp 2.200.000
   - RF Skin Tightening & V-Shape (untuk kencang pipi/double chin) - Rp 1.500.000
4. Berikan urutan skincare harian yang disarankan (Cleanser, Toner, Active Serum, Moisturizer, Sunscreen SPF 50).
5. Akhiri dengan ajakan ramah untuk menjadwalkan konsultasi langsung / reservasi di klinik dengan dokter spesialis kami.
6. Gunakan Bahasa Indonesia yang santun, hangat, dan tersusun rapi dengan poin-poin (bullet points) serta format yang mudah dibaca.`;

    let userContext = "";
    if (skinProfile) {
      userContext = `[Profil Kulit Pasien] Tipe Kulit: ${skinProfile.skinType || "Tidak ditentukan"}, Masalah Utama: ${skinProfile.concerns?.join(", ") || "Konsultasi umum"}, Usia/Gender: ${skinProfile.ageGroup || "-"}.\n\n`;
    }

    // Prepare contents for Gemini
    const lastUserMessage = messages[messages.length - 1]?.content || "Halo, saya ingin konsultasi perawatan kulit.";
    const fullPrompt = `${userContext}Pertanyaan Pasien: ${lastUserMessage}`;

    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Terima kasih telah berkonsultasi. Silakan ajukan pertanyaan lebih spesifik mengenai kulit Anda.";

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Gagal menghubungkan ke sistem AI.",
      reply:
        "Halo! Terima kasih telah menghubungi Lumina Aesthetic Clinic. Untuk mendapatkan analisis akurat, kami menyarankan konsultasi langsung dengan dokter spesialis kami atau silakan reservasi jadwal pemeriksaan kulit gratis di klinik kami.",
    });
  }
});

// API Route: Get all reservations or single by code
app.get("/api/reservations", (req, res) => {
  const code = req.query.code as string;
  if (code) {
    const found = reservations.find(
      (r) => r.bookingCode.toUpperCase() === code.trim().toUpperCase()
    );
    if (found) {
      return res.json({ success: true, reservation: found });
    } else {
      return res.status(404).json({ success: false, message: "Kode booking tidak ditemukan." });
    }
  }
  res.json({ success: true, reservations });
});

// API Route: Create new reservation
app.post("/api/reservations", (req, res) => {
  try {
    const { patientName, phone, email, treatmentName, doctorName, branchName, date, timeSlot, notes } = req.body;

    if (!patientName || !phone || !treatmentName || !branchName || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: "Mohon lengkapi seluruh data wajib." });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `LMN-${randomNum}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      bookingCode,
      patientName,
      phone,
      email: email || "-",
      treatmentName,
      doctorName: doctorName || "Dokter On-Duty Specialist",
      branchName,
      date,
      timeSlot,
      notes: notes || "",
      status: "Terkonfirmasi",
      createdAt: new Date().toISOString(),
    };

    reservations.unshift(newReservation);

    res.json({
      success: true,
      message: "Reservasi online berhasil dibuat!",
      reservation: newReservation,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Gagal membuat reservasi." });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Lumina Aesthetic Clinic Server running on http://localhost:${PORT}`);
  });
}

startServer();
