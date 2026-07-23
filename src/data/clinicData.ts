import { Treatment, Doctor, BeforeAfterGalleryItem, ClinicBranch } from '../types';

export const TREATMENTS: Treatment[] = [
  {
    id: 'pico-laser',
    name: 'Pico Glow Laser Rejuvenation',
    category: 'laser',
    categoryLabel: 'Pico Laser & Glow',
    shortDesc: 'Teknologi picosecond tercanggih untuk menyamarkan flek hitam, bekas jerawat, dan mencerahkan wajah instan.',
    fullDesc: 'Pico Glow Laser menggunakan gelombang picosecond berkecepatan tinggi untuk menghancurkan pigmen melanin menjadi partikel mikroskopis tanpa merusak jaringan kulit sekitarnya. Sangat efektif untuk hiperpigmentasi, melasma, meratakan tekstur kulit, dan merangsang produksi kolagen alami.',
    price: 1800000,
    priceFormatted: 'Rp 1.800.000',
    durationMinutes: 45,
    downtime: 'Tanpa Downtime (Kemerahan Ringan 1-2 Jam)',
    painLevel: 'Sangat Minim',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Menghilangkan flek hitam, melasma, & bekas jerawat (PIH)',
      'Mengecilkan pori-pori dan meratakan tekstur kulit',
      'Mencerahkan wajah secara menyeluruh tanpa pengelupasan ekstrim',
      'Aman untuk semua warna kulit Asia'
    ],
    recommendedFrequency: '1 Sesi setiap 3-4 Minggu (Hasil optimal dalam 3-5 sesi)',
    procedureSteps: [
      'Cleansing mendalam & analisis kondisi kulit',
      'Aplikasi Krim Anestesi Topikal (opsional 15 menit)',
      'Tindakan Pico Laser oleh Dokter Spesialis',
      'Aplikasi Soothing Cooling Mask & LED Light Therapy',
      'Pemberian Sunscreen SPF 50 PA++++'
    ]
  },
  {
    id: 'hydrafacial-md',
    name: 'Hydrafacial MD Deep Cleanse',
    category: 'facial',
    categoryLabel: 'Facial & Glow',
    shortDesc: 'Perawatan medis 4-in-1: Cleansing, Eksfoliasi, Ekstraksi Komedo Tanpa Sakit, dan Infusi Serum Antioksidan.',
    fullDesc: 'Hydrafacial MD menggunakan teknologi paten Vortex-Fusion untuk mengangkat sel kulit mati, menyedot komedo hingga ke pori terdalam secara lembut, serta menginfusikan serum kaya asam hialuronat, peptida, dan antioksidan berstandar medis.',
    price: 950000,
    priceFormatted: 'Rp 950.000',
    durationMinutes: 60,
    downtime: 'Tanpa Downtime (Kulit Langsung Glowing)',
    painLevel: 'Tanpa Rasa Sakit',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Ekstraksi komedo mendalam tanpa rasa sakit / berdarah',
      'Hidrasi instan & mengembalikan kelembapan alami kulit',
      'Membersihkan pori-pori dari sisa makeup & polusi',
      'Membuat wajah segar dan dewy secara langsung'
    ],
    recommendedFrequency: 'Rutin 1 kali setiap bulan',
    procedureSteps: [
      'Vortex Cleanse & Gentle Peeling Asam Salisilat',
      'Vortex Extraction komedo & sebum berlebih',
      'Vortex Fusion serum antioksidan & hyaluronic acid',
      'Massage rileks leher & pundak',
      'Aplikasi Hydrating Essence & Sunscreen'
    ]
  },
  {
    id: 'salmon-dna',
    name: 'Salmon DNA Skin Booster (Rejuran)',
    category: 'booster',
    categoryLabel: 'Skin Booster',
    shortDesc: 'Injeksi Polynucleotide (PDRN) dari DNA Salmon asli untuk memperbaiki skin barrier dan elastisitas kulit.',
    fullDesc: 'Salmon DNA Skin Booster diformulasikan dengan PDRN murni berdensitas tinggi yang bekerja memperbaiki struktur jaringan sel kulit yang rusak, merangsang generasi kolagen baru, menipiskan garis halus, dan memperbaiki bopeng bekas jerawat (atrophic scars).',
    price: 2500000,
    priceFormatted: 'Rp 2.500.000',
    durationMinutes: 60,
    downtime: '1-2 Hari (Bentol kecil pasca injeksi hilang alami)',
    painLevel: 'Ringan / Nyaman',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Memperbaiki skin barrier yang rusak & sensitif',
      'Meregenerasi sel kulit baru & menghaluskan bopeng ringan',
      'Meningkatkan kelembapan kulit tingkat seluler',
      'Efect Glass Skin kenyal & awet muda'
    ],
    recommendedFrequency: '3 Sesi berturut-turut (interval 3 minggu), lalu maintenance per 6 bulan',
    procedureSteps: [
      'Double Cleansing & Pemotretan Skin Analyzer',
      'Aplikasi Anestesi Lokal Tebal (25 menit)',
      'Injeksi Mikro Salmon DNA PDRN oleh Dokter Spesialis',
      'Masker Pengenang Hydrogel Cooling',
      'Aplikasi Krem Calming & Sunscreen'
    ]
  },
  {
    id: 'acne-clearance',
    name: 'Acne Clearance & Blue Light Therapy',
    category: 'acne',
    categoryLabel: 'Acne & Scar',
    shortDesc: 'Terapi khusus mematikan bakteri penyebab jerawat (P. acnes), meredakan radang, dan menetralkan produksi sebum.',
    fullDesc: 'Kombinasi eksfoliasi asam salisilat medis, ekstraksi steril higienis, injeksi anti-inflamasi untuk jerawat batu, serta paparan sinar Blue LED Therapy (415nm) yang terbukti klinis membunuh bakteri jerawat hingga lapisan terdalam.',
    price: 850000,
    priceFormatted: 'Rp 850.000',
    durationMinutes: 50,
    downtime: 'Kemerahan Ringan 3-6 Jam',
    painLevel: 'Ringan / Nyaman',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Meredakan jerawat meradang & bisul kemerahan',
      'Membunuh bakteri P. acnes secara merata',
      'Mengurangi minyak berlebih dan menyumbat komedo baru',
      'Mencegah timbulnya bekas jerawat kehitaman / bopeng'
    ],
    recommendedFrequency: '1 Sesi per 2 Minggu hingga jerawat tenang',
    procedureSteps: [
      'Deep Cleansing Antiseptik',
      'Peeling Acne Mild & Ekstraksi Steril Dokter',
      'Injeksi Corticosteroid Jerawat Batu (bila diperlukan)',
      'Blue LED Light Therapy 20 Menit',
      'Acne Spot Treatment & Sunscreen Oil-Free'
    ]
  },
  {
    id: 'botox-youth',
    name: 'Anti-Aging Botox & Youth Contour',
    category: 'anti-aging',
    categoryLabel: 'Anti-Aging & Contour',
    shortDesc: 'Treatment peremajaan instan untuk merelaksasi otot penyebab kerutan dahi, crow\'s feet, & tirus pipi V-shape.',
    fullDesc: 'Penggunaan Botulinum Toxin A asli terlisensi FDA untuk menghaluskan garis ekspresi wajah di area dahi, antar alis, serta area samping mata. Juga efektif meniruskan rahang otot masseter untuk efek wajah V-shape proporsional.',
    price: 2200000,
    priceFormatted: 'Rp 2.200.000',
    durationMinutes: 30,
    downtime: 'Tanpa Downtime (Hindari tiduran 4 jam pertama)',
    painLevel: 'Ringan / Nyaman',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Menghilangkan kerutan dahi & garis senyum saat beraktivitas',
      'Meniruskan rahang & membentuk garis wajah V-Shape alami',
      'Hasil terlihat natural mulai hari ke 3-7',
      'Bertahan 4 - 8 Bulan'
    ],
    recommendedFrequency: 'Evaluasi ulang setiap 6 bulan',
    procedureSteps: [
      'Konsultasi Anatomi Wajah & Penandaan Titik Otot oleh Dokter',
      'Aplikasi Ice Pack & Anestesi Dingin',
      'Injeksi Presisi Mikro Botox',
      'Edukasi Post-Treatment Care'
    ]
  },
  {
    id: 'rf-vshape',
    name: 'RF Thermal Tightening & Double Chin Melt',
    category: 'body',
    categoryLabel: 'Body & Slimming',
    shortDesc: 'Pengencangan kulit kendur dan pemecahan lemak double chin tanpa bedah dengan energi Radio Frequency multipolar.',
    fullDesc: 'Menghantarkan energi panasRF terukur hingga lapisan dermis dalam untuk memicu kontraksi serat kolagen instan dan merangsang lipolisis (pembakaran lemak) di daerah dagu ganda (double chin) dan pipi bawah.',
    price: 1500000,
    priceFormatted: 'Rp 1.500.000',
    durationMinutes: 45,
    downtime: 'Tanpa Downtime (Hanya rasa hangat nyaman)',
    painLevel: 'Tanpa Rasa Sakit',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Mengencangkan kulit pipi kendur & garis rahang melorot',
      'Memudarkan lemak membandel di daerah double chin',
      'Merangsang kolagen alami tanpa jarum sama sekali',
      'Memberikan efek facelift tanpa operasi'
    ],
    recommendedFrequency: '4-6 Sesi (Seminggu sekali)',
    procedureSteps: [
      'Pembersihan area leher & wajah bawah',
      'Aplikasi Conductive Thermal Gel',
      'Tindakan RF Multipolar Probe selama 30 menit',
      'Pembersihan gel & Firming Serum'
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-clara',
    name: 'dr. Clara Vernanda Sp.D.V.E.',
    title: 'Dokter Spesialis Kulit & Kelamin',
    specialization: 'Laser Specialist, Melasma & Hyperpigmentation, Acne Complex',
    experienceYears: 11,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    scheduleDays: 'Senin, Rabu, Jumat (10:00 - 17:00)',
    branch: 'Dharmawangsa - Jakarta Selatan',
    rating: 4.9,
    bio: 'Alumni Spesialis Dermatologi FKUI. Telah menangani lebih dari 4.000+ pasien dengan fokus utama pada peremajaan laser picosecond dan penanganan flek membandel.',
    availableTimeSlots: ['10:00', '11:30', '14:00', '15:30', '16:30']
  },
  {
    id: 'doc-amanda',
    name: 'dr. Amanda Putri',
    title: 'Aesthetic & Anti-Aging Consultant',
    specialization: 'Skin Booster, Botox, Collagen Filler, Glass Skin Therapy',
    experienceYears: 8,
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    scheduleDays: 'Selasa, Kamis, Sabtu (11:00 - 18:00)',
    branch: 'Dharmawangsa & Puri Indah',
    rating: 4.9,
    bio: 'Bersertifikasi Internasional dari Korean Academy of Aesthetic Medicine. Ahli dalam kontur wajah alami, injeksi Salmon DNA, dan peremajaan tanpa bedah.',
    availableTimeSlots: ['11:00', '13:00', '14:30', '16:00', '17:30']
  },
  {
    id: 'doc-reza',
    name: 'dr. Reza Pratama M.Biomed',
    title: 'Dermatology & Laser Physician',
    specialization: 'Acne Scar Subcision, Pico Laser, Tattoo Removal, Body Contour',
    experienceYears: 9,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    scheduleDays: 'Senin - Sabtu (09:00 - 16:00)',
    branch: 'Gubeng - Surabaya',
    rating: 4.8,
    bio: 'Lulusan Magister Biomedik Kedokteran Anti-Aging. Berkelanjutan mengedukasi pasien tentang skin barrier health dan rekonstruksi bekas luka jerawat.',
    availableTimeSlots: ['09:30', '11:00', '13:30', '15:00']
  },
  {
    id: 'doc-sarah',
    name: 'dr. Sarah Nadia',
    title: 'Aesthetic Practitioner & Skincare Formulation Expert',
    specialization: 'Hydrafacial, Sensitive Skin Rehab, Teen Acne, Glow Infusion',
    experienceYears: 6,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    scheduleDays: 'Rabu, Jumat, Minggu (12:00 - 19:00)',
    branch: 'Dago - Bandung',
    rating: 4.9,
    bio: 'Spesialis dalam perawatan kulit sensitif, ibu hamil/menyusui, serta kombinasi treatment estetik harian dengan formulasi skincare klinis.',
    availableTimeSlots: ['12:30', '14:00', '15:30', '17:00', '18:00']
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterGalleryItem[] = [
  {
    id: 'ba-pico-1',
    title: 'Penanganan Flek Hitam & Melasma',
    category: 'laser',
    treatmentName: 'Pico Glow Laser Rejuvenation',
    doctorName: 'dr. Clara Vernanda Sp.D.V.E.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    sessionsCount: 3,
    patientAgeGroup: 'Usia 38 Tahun',
    patientConcern: 'Melasma membandel pasca kehamilan & bintik hitam sinar matahari',
    resultDescription: 'Pigmentasi berkurang hingga 85%, kulit terlihat jauh lebih cerah bersinar dan merata dalam waktu 2 bulan.'
  },
  {
    id: 'ba-acne-1',
    title: 'Penyembuhan Jerawat Parah & Kemandulan Pori',
    category: 'acne',
    treatmentName: 'Acne Clearance & Blue Light Therapy',
    doctorName: 'dr. Sarah Nadia',
    beforeImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    sessionsCount: 4,
    patientAgeGroup: 'Usia 24 Tahun',
    patientConcern: 'Jerawat radang komedonal & papula gatal di pipi dan dahi',
    resultDescription: 'Peradangan mereda sepenuhnya, tidak timbul bekas bopeng baru, dan produksi minyak terkontrol.'
  },
  {
    id: 'ba-booster-1',
    title: 'Peremajaan Glass Skin DNA Salmon',
    category: 'booster',
    treatmentName: 'Salmon DNA Skin Booster (Rejuran)',
    doctorName: 'dr. Amanda Putri',
    beforeImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    sessionsCount: 2,
    patientAgeGroup: 'Usia 32 Tahun',
    patientConcern: 'Kulit kusam, kering bersisik, dan garis halus mengganggu',
    resultDescription: 'Tingkat kelembapan kulit meningkat drastis, efek plumping kenyal terasa nyata dan cerah merona.'
  },
  {
    id: 'ba-contour-1',
    title: 'Wajah Tirus V-Shape & Kerutan Halus',
    category: 'anti-aging',
    treatmentName: 'Anti-Aging Botox & V-Shape Contour',
    doctorName: 'dr. Amanda Putri',
    beforeImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    sessionsCount: 1,
    patientAgeGroup: 'Usia 41 Tahun',
    patientConcern: 'Otot rahang lebar dan garis kerutan saat tersenyum',
    resultDescription: 'Garis rahang terlihat simetris dan lebih tirus elegan, kerutan dahi hilang sempurna.'
  }
];

export const CLINIC_BRANCHES: ClinicBranch[] = [
  {
    id: 'branch-south-jkt',
    name: 'Dharmawangsa - Jakarta Selatan',
    city: 'Jakarta Selatan',
    address: 'Jl. Dharmawangsa Raya No. 42A, Kebayoran Baru, Jakarta Selatan 12160',
    phone: '(021) 7280-9988',
    whatsappNumber: '6281234567890',
    openingHours: 'Senin - Minggu: 09.00 - 20.00 WIB',
    googleMapsUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'branch-west-jkt',
    name: 'Puri Indah - Jakarta Barat',
    city: 'Jakarta Barat',
    address: 'Ruko Puri Indah Blok A-12, Kembangan, Jakarta Barat 11610',
    phone: '(021) 5835-1122',
    whatsappNumber: '6281234567891',
    openingHours: 'Senin - Minggu: 09.00 - 20.00 WIB',
    googleMapsUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'branch-surabaya',
    name: 'Gubeng - Surabaya',
    city: 'Surabaya',
    address: 'Jl. Raya Gubeng No. 88, Gubeng, Surabaya 60281',
    phone: '(031) 503-4455',
    whatsappNumber: '6281234567892',
    openingHours: 'Senin - Minggu: 09.00 - 19.00 WIB',
    googleMapsUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'branch-bandung',
    name: 'Dago - Bandung',
    city: 'Bandung',
    address: 'Jl. Ir. H. Juanda (Dago) No. 104, Bandung 40132',
    phone: '(022) 250-7788',
    whatsappNumber: '6281234567893',
    openingHours: 'Senin - Minggu: 09.00 - 19.00 WIB',
    googleMapsUrl: 'https://maps.google.com',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 'testi-1',
    name: 'Valerie Angelica',
    role: 'Fashion Designer',
    rating: 5,
    comment: 'Pico Glow Laser di Lumina bener-bener game changer! Flek sisa bekas jerawat aku memudar signifikan setelah sesi ke-2. Tempatnya sangat mewah dan dr. Clara detail banget ngejelasinnya.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    treatmentUsed: 'Pico Glow Laser Rejuvenation'
  },
  {
    id: 'testi-2',
    name: 'Nadya Paramita',
    role: 'Entrepreneur',
    rating: 5,
    comment: 'Hydrafacial MD-nya rasanya nagih banget! Komedo di area hidung ketarik bersih tanpa ada rasa sakit sama sekali. Kulit langsung kerasa plum dan glowing instan buat acara.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    treatmentUsed: 'Hydrafacial MD Deep Cleanse'
  },
  {
    id: 'testi-3',
    name: 'Dimas Setiawan',
    role: 'Content Creator',
    rating: 5,
    comment: 'Sempat tidak percaya diri karena jerawat batu meradang di pipi. Setelah konsul AI dan diarahkan ambil Acne Clearance di cabang Dharmawangsa, dalam 3 minggu kulit kembali tenang!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    treatmentUsed: 'Acne Clearance & Blue Light Therapy'
  }
];
