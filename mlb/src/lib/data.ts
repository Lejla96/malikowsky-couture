export interface Category {
  id: string;
  name: string;
  nameMk: string;
  slug: string;
  icon: string;
  order: number;
  _count?: { vendors: number };
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  ownerSurname: string;
  email: string;
  phone: string;
  categoryId: string;
  category: Category;
  location: string;
  city: string;
  description: string;
  descriptionMk: string | null;
  slug: string;
  photos: string;
  coverPhoto: string | null;
  logo: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  priceRange: string | null;
  eventTypes: string;
  availability: string | null;
  featured: boolean;
  approved: boolean;
  rating: number;
  reviewCount: number;
  mapLat: number | null;
  mapLng: number | null;
  createdAt: string;
  reviews: Review[];
}

export interface Booking {
  id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  eventType: string;
  preferredDate: string;
  message: string | null;
  status: string;
  createdAt: string;
  vendor: { businessName: string; slug: string; email: string };
}

export interface Review {
  id: string;
  vendorId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
  vendor?: { businessName: string; slug: string };
}

export const categories: Category[] = [
  { id: "cat-1", name: "Musicians & Bands", nameMk: "Музичари и бендови", slug: "musicians-bands", icon: "Music", order: 1 },
  { id: "cat-2", name: "Restaurants & Catering", nameMk: "Ресторани и кетеринг", slug: "restaurants-catering", icon: "UtensilsCrossed", order: 2 },
  { id: "cat-3", name: "Hair & Makeup", nameMk: "Фризери и шминка", slug: "hair-makeup", icon: "Sparkles", order: 3 },
  { id: "cat-4", name: "Fashion & Clothing", nameMk: "Мода и облека", slug: "fashion-clothing", icon: "Shirt", order: 4 },
  { id: "cat-5", name: "Event Decorators", nameMk: "Декоратори за настани", slug: "event-decorators", icon: "Palette", order: 5 },
  { id: "cat-6", name: "Photographers & Videographers", nameMk: "Фотографи и видеографи", slug: "photographers-videographers", icon: "Camera", order: 6 },
];

const catMap: Record<string, Category> = Object.fromEntries(categories.map(c => [c.id, c]));

export const vendors: Vendor[] = [
  {
    id: "v-1", businessName: "Golden Sound Orchestra", ownerName: "Milan", ownerSurname: "Ristic",
    email: "golden-sound@example.com", phone: "+389 71 234 567", categoryId: "cat-1", category: catMap["cat-1"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Premier Roma orchestra specializing in traditional and modern wedding music. With over 15 years of experience, we bring joy and celebration to every event with our signature blend of Romani, Macedonian, and international music.",
    descriptionMk: "Премиер ромски оркестар специјализиран за традиционална и модерна свадбена музика. Со повеќе од 15 години искуство, носиме радост и прослава на секој настан со нашата карактеристична мешавина на ромска, македонска и интернационална музика.",
    slug: "golden-sound-orchestra", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate","Other"]',
    availability: "Weekends and holidays", featured: true, approved: true, rating: 4.9, reviewCount: 47,
    mapLat: null, mapLng: null, createdAt: "2024-01-15T00:00:00Z", reviews: []
  },
  {
    id: "v-2", businessName: "Romani Rhythms Band", ownerName: "Alen", ownerSurname: "Jasharovski",
    email: "romani-rhythms@example.com", phone: "+389 72 345 678", categoryId: "cat-1", category: catMap["cat-1"],
    location: "Bitola, Macedonia", city: "Bitola",
    description: "High-energy live band performing a mix of Romani, Balkan, and contemporary hits. Perfect for weddings, engagements, and celebrations.",
    descriptionMk: "Бенд со висока енергија кој изведува мешавина на ромски, балкански и современи хитови. Совршен за свадби, веридби и прослави.",
    slug: "romani-rhythms-band", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: null, instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday","Other"]',
    availability: null, featured: true, approved: true, rating: 4.7, reviewCount: 32,
    mapLat: null, mapLng: null, createdAt: "2024-02-10T00:00:00Z", reviews: []
  },
  {
    id: "v-3", businessName: "Palazzo Elegance", ownerName: "Stefan", ownerSurname: "Ramadanovski",
    email: "palazzo@example.com", phone: "+389 73 456 789", categoryId: "cat-2", category: catMap["cat-2"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Luxury event venue and catering service offering exquisite Macedonian and international cuisine. Our elegant halls accommodate 50 to 500 guests with impeccable service.",
    descriptionMk: "Луксузен простор за настани и кетеринг услуга која нуди извонредна македонска и интернационална кујна. Нашите елегантни сали може да сместат од 50 до 500 гости со беспрекорна услуга.",
    slug: "palazzo-elegance", photos: "[]", coverPhoto: null, logo: null,
    website: "https://palazzo-elegance.mk", facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate","Other"]',
    availability: "All week", featured: true, approved: true, rating: 4.8, reviewCount: 65,
    mapLat: null, mapLng: null, createdAt: "2024-01-20T00:00:00Z", reviews: []
  },
  {
    id: "v-4", businessName: "Royal Feast Catering", ownerName: "Dzafer", ownerSurname: "Sulejmanovski",
    email: "royal-feast@example.com", phone: "+389 74 567 890", categoryId: "cat-2", category: catMap["cat-2"],
    location: "Ohrid, Macedonia", city: "Ohrid",
    description: "Premium catering service with a focus on traditional Romani and Macedonian delicacies. We create unforgettable culinary experiences for your special occasions.",
    descriptionMk: "Премиум кетеринг услуга со фокус на традиционални ромски и македонски деликатеси. Создаваме незаборавни кулинарски искуства за вашите посебни прилики.",
    slug: "royal-feast-catering", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: null, instagram: null, tiktok: null,
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate"]',
    availability: null, featured: false, approved: true, rating: 4.5, reviewCount: 28,
    mapLat: null, mapLng: null, createdAt: "2024-03-05T00:00:00Z", reviews: []
  },
  {
    id: "v-5", businessName: "Glamour Studio", ownerName: "Selma", ownerSurname: "Bajramovic",
    email: "glamour-studio@example.com", phone: "+389 75 678 901", categoryId: "cat-3", category: catMap["cat-3"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Award-winning bridal beauty studio specializing in luxury wedding hair and makeup. Our team of expert artists creates stunning looks that last all day.",
    descriptionMk: "Награден студио за невестинска убавина специјализиран за луксузна свадбена фризура и шминка. Нашиот тим на експертски артисти создава неверојатни изгледи кои траат цел ден.",
    slug: "glamour-studio", photos: "[]", coverPhoto: null, logo: null,
    website: "https://glamour-studio.mk", facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: "https://tiktok.com",
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday","Other"]',
    availability: "Mon-Sat, 9am-7pm", featured: true, approved: true, rating: 4.9, reviewCount: 53,
    mapLat: null, mapLng: null, createdAt: "2024-01-25T00:00:00Z", reviews: []
  },
  {
    id: "v-6", businessName: "Bella Beauty Bar", ownerName: "Ramiza", ownerSurname: "Asanovic",
    email: "bella-beauty@example.com", phone: "+389 76 789 012", categoryId: "cat-3", category: catMap["cat-3"],
    location: "Kumanovo, Macedonia", city: "Kumanovo",
    description: "Professional hair styling and makeup artistry for all occasions. Specializing in bridal looks, engagement parties, and special event styling.",
    descriptionMk: "Професионално стилизирање на коса и уметност на шминка за сите прилики. Специјализирани за невестински изгледи, веридбени забави и стилизирање за посебни настани.",
    slug: "bella-beauty-bar", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: null,
    priceRange: "$", eventTypes: '["Wedding","Engagement","Birthday","Other"]',
    availability: null, featured: false, approved: true, rating: 4.6, reviewCount: 19,
    mapLat: null, mapLng: null, createdAt: "2024-04-10T00:00:00Z", reviews: []
  },
  {
    id: "v-7", businessName: "Malikowsky Couture", ownerName: "Erhan", ownerSurname: "Malikowsky",
    email: "malikowsky@example.com", phone: "+389 77 890 123", categoryId: "cat-4", category: catMap["cat-4"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Bespoke bridal and evening wear designer creating stunning custom gowns. Each piece is handcrafted with the finest fabrics and meticulous attention to detail.",
    descriptionMk: "Дизајнер на невестински и вечерни тоалети кој создава неверојатни фустани по нарачка. Секое парче е рачно изработено со најфини ткаенини и внимателна посветеност на детали.",
    slug: "malikowsky-couture", photos: "[]", coverPhoto: null, logo: null,
    website: "https://malikowsky-couture.com", facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$$", eventTypes: '["Wedding","Engagement","Other"]',
    availability: "By appointment", featured: true, approved: true, rating: 5.0, reviewCount: 41,
    mapLat: null, mapLng: null, createdAt: "2024-01-10T00:00:00Z", reviews: []
  },
  {
    id: "v-8", businessName: "Romani Elegance Fashion", ownerName: "Sabrina", ownerSurname: "Demirovic",
    email: "romani-elegance@example.com", phone: "+389 78 901 234", categoryId: "cat-4", category: catMap["cat-4"],
    location: "Prilep, Macedonia", city: "Prilep",
    description: "Contemporary Roma-inspired fashion house offering bridal, formal, and celebration attire. Our designs blend traditional aesthetics with modern luxury.",
    descriptionMk: "Современа модна куќа инспирирана од ромската традиција која нуди невестинска, формална и облека за прослави. Нашите дизајни ги спојуваат традиционалната естетика со модерниот луксуз.",
    slug: "romani-elegance-fashion", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: null, instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday"]',
    availability: null, featured: false, approved: true, rating: 4.4, reviewCount: 15,
    mapLat: null, mapLng: null, createdAt: "2024-05-01T00:00:00Z", reviews: []
  },
  {
    id: "v-9", businessName: "Dream Décor Studio", ownerName: "Ajsel", ownerSurname: "Ibrahimovic",
    email: "dream-decor@example.com", phone: "+389 71 012 345", categoryId: "cat-5", category: catMap["cat-5"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Full-service event decoration studio creating breathtaking wedding and celebration environments. From intimate gatherings to grand celebrations, we transform spaces into magical settings.",
    descriptionMk: "Студио за декорација на настани кое создава неверојатни свадбени и празнични амбиенти. Од интимни собирања до големи прослави, ги трансформираме просторите во магични сетинзи.",
    slug: "dream-decor-studio", photos: "[]", coverPhoto: null, logo: null,
    website: "https://dream-decor.mk", facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: "https://tiktok.com",
    priceRange: "$$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate","Other"]',
    availability: "All week", featured: true, approved: true, rating: 4.8, reviewCount: 38,
    mapLat: null, mapLng: null, createdAt: "2024-02-01T00:00:00Z", reviews: []
  },
  {
    id: "v-10", businessName: "Enchanted Events", ownerName: "Bajram", ownerSurname: "Sejdiu",
    email: "enchanted@example.com", phone: "+389 72 123 456", categoryId: "cat-5", category: catMap["cat-5"],
    location: "Tetovo, Macedonia", city: "Tetovo",
    description: "Creative event decoration and styling for weddings, engagements, and celebrations. We specialize in luxurious floral arrangements and thematic designs.",
    descriptionMk: "Креативна декорација и стилизирање на настани за свадби, веридби и прослави. Специјализирани сме за луксузни цветни аранжмани и тематски дизајни.",
    slug: "enchanted-events", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: "https://facebook.com", instagram: null, tiktok: null,
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday","Other"]',
    availability: null, featured: false, approved: true, rating: 4.3, reviewCount: 12,
    mapLat: null, mapLng: null, createdAt: "2024-06-15T00:00:00Z", reviews: []
  },
  {
    id: "v-11", businessName: "Timeless Moments Photography", ownerName: "Denis", ownerSurname: "Kasumovic",
    email: "timeless-moments@example.com", phone: "+389 73 234 567", categoryId: "cat-6", category: catMap["cat-6"],
    location: "Skopje, Macedonia", city: "Skopje",
    description: "Fine art wedding photography and cinematic videography. We capture the emotion, beauty, and joy of your most precious moments with artistic vision.",
    descriptionMk: "Фотографија за свадби и кинематографска видеографија. Ги доловуваме емоциите, убавината и радоста на вашите најдрагоцени моменти со уметничка визија.",
    slug: "timeless-moments-photography", photos: "[]", coverPhoto: null, logo: null,
    website: "https://timeless-moments.mk", facebook: "https://facebook.com", instagram: "https://instagram.com", tiktok: "https://tiktok.com",
    priceRange: "$$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate","Other"]',
    availability: "Weekends preferred", featured: true, approved: true, rating: 4.9, reviewCount: 56,
    mapLat: null, mapLng: null, createdAt: "2024-01-05T00:00:00Z", reviews: []
  },
  {
    id: "v-12", businessName: "Roma Lens Studios", ownerName: "Kemal", ownerSurname: "Amet",
    email: "roma-lens@example.com", phone: "+389 74 345 678", categoryId: "cat-6", category: catMap["cat-6"],
    location: "Strumica, Macedonia", city: "Strumica",
    description: "Professional photography and videography studio offering comprehensive event coverage. Our team combines photojournalistic style with editorial elegance.",
    descriptionMk: "Професионално студио за фотографија и видеографија кое нуди сеопфатно покривање на настани. Нашиот тим комбинира фотожурналистички стил со уредничка елеганција.",
    slug: "roma-lens-studios", photos: "[]", coverPhoto: null, logo: null,
    website: null, facebook: null, instagram: "https://instagram.com", tiktok: null,
    priceRange: "$$", eventTypes: '["Wedding","Engagement","Birthday","Corporate"]',
    availability: null, featured: false, approved: true, rating: 4.5, reviewCount: 22,
    mapLat: null, mapLng: null, createdAt: "2024-03-20T00:00:00Z", reviews: []
  },
];

// Add vendor counts to categories
categories.forEach(c => {
  c._count = { vendors: vendors.filter(v => v.categoryId === c.id && v.approved).length };
});

// In-memory stores for dynamic data
export const bookingsStore: Booking[] = [];
export const reviewsStore: Review[] = [];
export const vendorRegistrations: Vendor[] = [];

export function getCategories() {
  return categories;
}

export function getVendors(opts?: { approved?: boolean; featured?: boolean; category?: string; city?: string; search?: string }) {
  let result = [...vendors, ...vendorRegistrations.filter(v => v.approved)];
  if (opts?.approved !== undefined) result = result.filter(v => v.approved === opts.approved);
  if (opts?.featured) result = result.filter(v => v.featured);
  if (opts?.category) result = result.filter(v => v.category.slug === opts.category);
  if (opts?.city) result = result.filter(v => v.city === opts.city);
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    result = result.filter(v =>
      v.businessName.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q)
    );
  }
  return result;
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  const allVendors = [...vendors, ...vendorRegistrations];
  const vendor = allVendors.find(v => v.slug === slug);
  if (vendor) {
    vendor.reviews = reviewsStore.filter(r => r.vendorId === vendor.id && r.approved);
  }
  return vendor;
}

export function getCities() {
  return [...new Set(vendors.filter(v => v.approved).map(v => v.city))].sort();
}
