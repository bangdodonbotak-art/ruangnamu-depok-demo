export interface StoryBeat {
  id: string;
  step: string;
  title: string;
  summary: string;
  priceText: string | null;
  basisText: string | null;
  mediaPath: string | null;
}

export interface MenuItem {
  id: string;
  name: string;
  category: "Kopi & Minuman" | "Makanan Utama" | "Camilan";
  description: string;
  priceText: string | null;
  basisText: string;
  featured?: boolean;
  mediaPath: string | null;
}

export interface GallerySpace {
  id: string;
  title: string;
  zone: "Joglo" | "Taman" | "Fasilitas";
  detail: string;
  aspect: "landscape" | "portrait";
  mediaPath: string | null;
}

export interface VerifiedReview {
  id: string;
  quote: string;
  author: string;
  source: string;
  date: string;
}

export const SITE_DATA = {
  brandName: "Ruangnamu",
  fullBrandName: "Ruangnamu Coffee & Space",
  alsoKnownAs: "Ruangnamu Coffee & Eatery",
  siteUrl: "https://ruangnamu-depok-demo.vercel.app",
  locale: "id_ID",
  heroHeadlineLines: [
    "Rumah Joglo di",
    "balik ramai",
    "Margonda, untuk",
    "ngopi pelan.",
  ],
  heroSubtext:
    "Kafe bernuansa Jawa di Kemiri Muka dengan taman rindang, kolam ikan, dan sajian rumahan dari pagi hingga malam.",
  primaryCtaLabel: "Reservasi Meja",
  address:
    "Jl. Ciliwung No.10, RW.1, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423",
  landmarkNote:
    "Masuk sekitar 50 meter dari Jl. Margonda Raya, di gang sebelum Sifaana Hotel / sebelum gerbang Pesona Khayangan.",
  hours: [
    { days: "Senin – Kamis & Minggu", time: "10.00 – 22.00 WIB" },
    { days: "Jumat – Sabtu", time: "10.00 – 23.00 WIB" },
  ],
  // Structured hours (single source of truth for the live OPEN NOW chip
  // and the JSON-LD openingHoursSpecification). Mirrors `hours` above:
  // 0 = Sunday. Source: RESEARCH.md row 5 (VERIFIED, 5 sources).
  hoursStructured: [
    { days: [0, 1, 2, 3, 4], opens: "10:00", closes: "22:00" }, // Sun–Thu
    { days: [5, 6], opens: "10:00", closes: "23:00" }, // Fri–Sat
  ],
  instagramHandle: "@ruangnamucoffee",
  instagramUrl: "https://www.instagram.com/ruangnamucoffee/",
  whatsappNumber: "",
  googleRating: "4.7",
  todayAvailability: {
    updatedLabel: "Hari ini — cek konfirmasi admin sebelum datang rombongan",
    note: "Tersedia area indoor, pendopo Joglo, dan semi-outdoor taman.",
  },
  storyUnitLabel: "Tiga pemberhentian, dari pendopo Joglo sampai photobox",
  storyBeats: [
    {
      id: "beat-joglo",
      step: "01",
      title: "Masuk ke pendopo Joglo",
      summary:
        "Struktur kayu tradisional Jawa menyambut dengan meja kerja bercolokan, Wi-Fi, dan ruang indoor.",
      priceText: null,
      basisText: null,
      mediaPath: "/media/journey-01-joglo.webp",
    },
    {
      id: "beat-kolam",
      step: "02",
      title: "Teras taman & kolam ikan",
      summary:
        "Area semi-outdoor terbuka menghadap kolam ikan dan tanaman hijau, lengkap dengan mushola di area belakang.",
      priceText: null,
      basisText: null,
      mediaPath: "/media/journey-02-garden.webp",
    },
    {
      id: "beat-photobox",
      step: "03",
      title: "Sudut cetak kenangan",
      summary:
        "Tersedia photobox digital interaktif untuk mengabadikan momen berkumpul sebelum pulang.",
      priceText: null,
      basisText: null,
      mediaPath: "/media/journey-03-photobox.webp",
    },
  ] satisfies StoryBeat[],
  menuItems: [
    {
      id: "nasi-jeruk-paru",
      name: "Nasi Jeruk With Paru Pedas",
      category: "Makanan Utama",
      description: "Nasi daun jeruk hangat dengan paru goreng bumbu pedas.",
      priceText: null,
      basisText: "per porsi",
      featured: true,
      mediaPath: "/media/menu-nasi-jeruk.webp",
    },
    {
      id: "nasi-kulit",
      name: "Nasi Kulit Tuanruma",
      category: "Makanan Utama",
      description: "Nasi hangat dengan kulit ayam renyah, serundeng, dan bumbu hitam.",
      priceText: null,
      basisText: "per porsi",
      mediaPath: null,
    },
    {
      id: "grilled-chicken-steak",
      name: "Grilled Chicken Steak",
      category: "Makanan Utama",
      description: "Ayam panggang saus blackpepper, kentang goreng, dan salad.",
      priceText: null,
      basisText: "per porsi",
      mediaPath: null,
    },
    {
      id: "pasta-carbonara",
      name: "Pasta Carbonara",
      category: "Makanan Utama",
      description: "Spageti saus creamy dengan smoked beef, jamur, mozzarella, dan garlic bread.",
      priceText: null,
      basisText: "per porsi",
      featured: true,
      mediaPath: "/media/menu-carbonara.webp",
    },
    {
      id: "ice-cafe-latte",
      name: "Ice Cafe Latte",
      category: "Kopi & Minuman",
      description: "Perpaduan espresso dan susu segar dingin.",
      priceText: null,
      basisText: "per gelas",
      mediaPath: null,
    },
    {
      id: "ice-matcha-espresso",
      name: "Ice Matcha Espresso",
      category: "Kopi & Minuman",
      description: "Lapisan matcha, susu segar, dan shot espresso seimbang.",
      priceText: null,
      basisText: "per gelas",
      mediaPath: null,
    },
    {
      id: "ice-lemongrass",
      name: "Ice Lemon Grass Tea",
      category: "Kopi & Minuman",
      description: "Teh dingin segar dengan aroma sereh dan perasan lemon.",
      priceText: null,
      basisText: "per gelas",
      mediaPath: null,
    },
    {
      id: "cireng-rujak",
      name: "Cireng With Bumbu Rujak",
      category: "Camilan",
      description: "Cireng renyah hangat dengan cocolan bumbu rujak manis pedas.",
      priceText: null,
      basisText: "per porsi",
      mediaPath: null,
    },
    {
      id: "kopi-susu-tuanruma",
      name: "Kopi Susu Tuanruma",
      category: "Kopi & Minuman",
      description: "Kopi susu gula aren signature Ruangnamu.",
      priceText: null,
      basisText: "per botol",
      mediaPath: null,
    },
  ] satisfies MenuItem[],
  spaces: [
    {
      id: "space-joglo",
      title: "Pendopo Kayu Joglo",
      zone: "Joglo",
      detail: "Struktur kayu tradisional Jawa — limasan, atap tinggi, meja kayu panjang.",
      aspect: "portrait",
      mediaPath: "/media/spaces-joglo.webp",
    },
    {
      id: "space-kolam",
      title: "Teras Taman & Kolam",
      zone: "Taman",
      detail: "Kolam ikan dan taman rindang di area semi-outdoor.",
      aspect: "portrait",
      mediaPath: "/media/spaces-taman.webp",
    },
    {
      id: "space-wfc",
      title: "Meja Kerja & Colokan",
      zone: "Joglo",
      detail: "Meja kerja bercolokan. Wi-Fi tersedia, bisa melambat saat ramai.",
      aspect: "portrait",
      mediaPath: "/media/spaces-wfc.webp",
    },
    {
      id: "space-parkir",
      title: "Parkir & Mushola",
      zone: "Fasilitas",
      detail: "Parkir luas untuk sekitar 10 mobil, gang muat 1 mobil; mushola di area belakang.",
      aspect: "portrait",
      mediaPath: "/media/spaces-parkir.webp",
    },
  ] satisfies GallerySpace[],
  photobox: {
    priceText: "Rp30.000",
    includes: "2 strip cetak + softfile + GIF",
    sourceLine: "Harga peluncuran Photoplace.id, 6 Feb 2025. Konfirmasi harga saat reservasi.",
  },
  verifiedReviews: [
    {
      id: "rev-3",
      quote:
        "Big thanks to Ruangnamu for the chill vibes and awesome service — couldn’t have picked a better place to spend my birthday.",
      author: "GIA A.",
      source: "Google Maps (via top-rated.online)",
      date: "Sekitar 5 bulan lalu",
    },
  ] satisfies VerifiedReview[],
} as const;
