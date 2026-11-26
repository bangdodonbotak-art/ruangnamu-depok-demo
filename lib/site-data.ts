export interface StoryBeat {
  id: string;
  step: string;
  title: string;
  summary: string;
  highlightItem: string;
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
  siteUrl: "https://ruangnamu.example.com",
  locale: "id_ID",
  heroHeadlineLines: [
    "Rumah Joglo di balik",
    "ramai Margonda, untuk",
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
  instagramHandle: "@ruangnamucoffee",
  instagramUrl: "https://www.instagram.com/ruangnamucoffee/",
  whatsappNumber: "",
  googleRating: "4.7",
  todayAvailability: {
    updatedLabel: "Hari ini — cek konfirmasi admin sebelum datang rombongan",
    note: "Tersedia area indoor, pendopo Joglo, dan semi-outdoor taman.",
  },
  storyUnitLabel: "Langkah kaki dari gerbang Jl. Ciliwung menuju taman belakang",
  storyBeats: [
    {
      id: "beat-gerbang",
      step: "01",
      title: "Berbelok dari hiruk Margonda",
      summary:
        "Lima puluh meter masuk ke Jl. Ciliwung, bising jalan utama berganti halaman parkir luas dan rimbun pepohonan.",
      highlightItem: "Ice Lemon Grass Tea",
      priceText: null,
      basisText: null,
      mediaPath: null,
    },
    {
      id: "beat-joglo",
      step: "02",
      title: "Masuk ke pendopo Joglo",
      summary:
        "Struktur kayu tradisional Jawa menyambut dengan meja kerja bercolokan, Wi-Fi, dan ruang indoor.",
      highlightItem: "Ice Cafe Latte",
      priceText: null,
      basisText: null,
      mediaPath: null,
    },
    {
      id: "beat-kolam",
      step: "03",
      title: "Teras taman & kolam ikan",
      summary:
        "Area semi-outdoor terbuka menghadap kolam ikan dan tanaman hijau, lengkap dengan mushola di area belakang.",
      highlightItem: "Nasi Jeruk With Paru Pedas",
      priceText: null,
      basisText: null,
      mediaPath: null,
    },
    {
      id: "beat-photobox",
      step: "04",
      title: "Sudut cetak kenangan",
      summary:
        "Tersedia photobox digital interaktif untuk mengabadikan momen berkumpul sebelum pulang.",
      highlightItem: "Tempe Mendoan",
      priceText: null,
      basisText: null,
      mediaPath: null,
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
      mediaPath: null,
    },
    {
      id: "nasi-kulit",
      name: "Nasi Kulit TuanRuma",
      category: "Makanan Utama",
      description: "Nasi hangat dengan kulit ayam renyah, serundeng, dan bumbu hitam.",
      priceText: null,
      basisText: "per porsi",
      featured: true,
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
      mediaPath: null,
    },
    {
      id: "ice-cafe-latte",
      name: "Ice Cafe Latte",
      category: "Kopi & Minuman",
      description: "Perpaduan espresso dan susu segar dingin.",
      priceText: null,
      basisText: "per gelas",
      featured: true,
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
      basisText: "per botol / gelas",
      mediaPath: null,
    },
  ] satisfies MenuItem[],
  gallerySpaces: [
    {
      id: "space-joglo",
      title: "Pendopo Kayu Joglo",
      zone: "Joglo",
      detail: "Atap tinggi bergaya rumah tradisional Jogja dengan pencahayaan hangat dan sirkulasi udara alami.",
      aspect: "landscape",
      mediaPath: null,
    },
    {
      id: "space-kolam",
      title: "Teras Kolam Ikan",
      zone: "Taman",
      detail: "Bangku semi-outdoor di tepi kolam ikan yang dikelilingi tanaman rindang.",
      aspect: "portrait",
      mediaPath: null,
    },
    {
      id: "space-wfc",
      title: "Meja Kerja & Colokan",
      zone: "Joglo",
      detail: "Area duduk tenang dengan akses Wi-Fi dan stop kontak untuk kerja atau diskusi kecil.",
      aspect: "landscape",
      mediaPath: null,
    },
    {
      id: "space-parkir",
      title: "Halaman Parkir & Mushola",
      zone: "Fasilitas",
      detail: "Halaman depan yang lega untuk kendaraan serta mushola dan toilet yang terawat.",
      aspect: "portrait",
      mediaPath: null,
    },
    {
      id: "space-photobox",
      title: "Photobox Digital",
      zone: "Fasilitas",
      detail: "Sudut foto interaktif dengan hasil cetak langsung untuk pengunjung.",
      aspect: "landscape",
      mediaPath: null,
    },
  ] satisfies GallerySpace[],
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
