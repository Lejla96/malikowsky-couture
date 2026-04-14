import prisma from "./prisma";
import { hashPassword } from "./auth";

const categories = [
  { name: "Musicians & Bands", nameMk: "Музичари и бендови", slug: "musicians-bands", icon: "Music", order: 1 },
  { name: "Restaurants & Catering", nameMk: "Ресторани и кетеринг", slug: "restaurants-catering", icon: "UtensilsCrossed", order: 2 },
  { name: "Hair & Makeup", nameMk: "Фризери и шминка", slug: "hair-makeup", icon: "Sparkles", order: 3 },
  { name: "Fashion & Clothing", nameMk: "Мода и облека", slug: "fashion-clothing", icon: "Shirt", order: 4 },
  { name: "Event Decorators", nameMk: "Декоратори за настани", slug: "event-decorators", icon: "Palette", order: 5 },
  { name: "Photographers & Videographers", nameMk: "Фотографи и видеографи", slug: "photographers-videographers", icon: "Camera", order: 6 },
];

const cities = ["Skopje", "Bitola", "Ohrid", "Prilep", "Kumanovo", "Tetovo", "Štip", "Veles", "Strumica", "Gostivar"];

const vendorTemplates = [
  { businessName: "Golden Sound Orchestra", ownerName: "Milan", ownerSurname: "Ristic", catSlug: "musicians-bands", city: "Skopje", desc: "Premier Roma orchestra specializing in traditional and modern wedding music. With over 15 years of experience, we bring joy and celebration to every event with our signature blend of Romani, Macedonian, and international music.", descMk: "Премиер ромски оркестар специјализиран за традиционална и модерна свадбена музика. Со повеќе од 15 години искуство, носиме радост и прослава на секој настан со нашата карактеристична мешавина на ромска, македонска и интернационална музика." },
  { businessName: "Romani Rhythms Band", ownerName: "Alen", ownerSurname: "Jasharovski", catSlug: "musicians-bands", city: "Bitola", desc: "High-energy live band performing a mix of Romani, Balkan, and contemporary hits. Perfect for weddings, engagements, and celebrations.", descMk: "Бенд со висока енергија кој изведува мешавина на ромски, балкански и современи хитови. Совршен за свадби, веридби и прослави." },
  { businessName: "Palazzo Elegance", ownerName: "Stefan", ownerSurname: "Ramadanovski", catSlug: "restaurants-catering", city: "Skopje", desc: "Luxury event venue and catering service offering exquisite Macedonian and international cuisine. Our elegant halls accommodate 50 to 500 guests with impeccable service.", descMk: "Луксузен простор за настани и кетеринг услуга која нуди извонредна македонска и интернационална кујна. Нашите елегантни сали може да сместат од 50 до 500 гости со беспрекорна услуга." },
  { businessName: "Royal Feast Catering", ownerName: "Dzafer", ownerSurname: "Sulejmanovski", catSlug: "restaurants-catering", city: "Ohrid", desc: "Premium catering service with a focus on traditional Romani and Macedonian delicacies. We create unforgettable culinary experiences for your special occasions.", descMk: "Премиум кетеринг услуга со фокус на традиционални ромски и македонски деликатеси. Создаваме незаборавни кулинарски искуства за вашите посебни прилики." },
  { businessName: "Glamour Studio", ownerName: "Selma", ownerSurname: "Bajramovic", catSlug: "hair-makeup", city: "Skopje", desc: "Award-winning bridal beauty studio specializing in luxury wedding hair and makeup. Our team of expert artists creates stunning looks that last all day.", descMk: "Награден студио за невестинска убавина специјализиран за луксузна свадбена фризура и шминка. Нашиот тим на експертски артисти создава неверојатни изгледи кои траат цел ден." },
  { businessName: "Bella Beauty Bar", ownerName: "Ramiza", ownerSurname: "Asanovic", catSlug: "hair-makeup", city: "Kumanovo", desc: "Professional hair styling and makeup artistry for all occasions. Specializing in bridal looks, engagement parties, and special event styling.", descMk: "Професионално стилизирање на коса и уметност на шминка за сите прилики. Специјализирани за невестински изгледи, веридбени забави и стилизирање за посебни настани." },
  { businessName: "Malikowsky Couture", ownerName: "Erhan", ownerSurname: "Malikowsky", catSlug: "fashion-clothing", city: "Skopje", desc: "Bespoke bridal and evening wear designer creating stunning custom gowns. Each piece is handcrafted with the finest fabrics and meticulous attention to detail.", descMk: "Дизајнер на невестински и вечерни тоалети кој создава неверојатни фустани по нарачка. Секое парче е рачно изработено со најфини ткаенини и внимателна посветеност на детали." },
  { businessName: "Romani Elegance Fashion", ownerName: "Sabrina", ownerSurname: "Demirovic", catSlug: "fashion-clothing", city: "Prilep", desc: "Contemporary Roma-inspired fashion house offering bridal, formal, and celebration attire. Our designs blend traditional aesthetics with modern luxury.", descMk: "Современа модна куќа инспирирана од ромската традиција која нуди невестинска, формална и облека за прослави. Нашите дизајни ги спојуваат традиционалната естетика со модерниот луксуз." },
  { businessName: "Dream Décor Studio", ownerName: "Ajsel", ownerSurname: "Ibrahimovic", catSlug: "event-decorators", city: "Skopje", desc: "Full-service event decoration studio creating breathtaking wedding and celebration environments. From intimate gatherings to grand celebrations, we transform spaces into magical settings.", descMk: "Студио за декорација на настани кое создава неверојатни свадбени и празнични амбиенти. Од интимни собирања до големи прослави, ги трансформираме просторите во магични сетинзи." },
  { businessName: "Enchanted Events", ownerName: "Bajram", ownerSurname: "Sejdiu", catSlug: "event-decorators", city: "Tetovo", desc: "Creative event decoration and styling for weddings, engagements, and celebrations. We specialize in luxurious floral arrangements and thematic designs.", descMk: "Креативна декорација и стилизирање на настани за свадби, веридби и прослави. Специјализирани сме за луксузни цветни аранжмани и тематски дизајни." },
  { businessName: "Timeless Moments Photography", ownerName: "Denis", ownerSurname: "Kasumovic", catSlug: "photographers-videographers", city: "Skopje", desc: "Fine art wedding photography and cinematic videography. We capture the emotion, beauty, and joy of your most precious moments with artistic vision.", descMk: "Фотографија за свадби и кинематографска видеографија. Ги доловуваме емоциите, убавината и радоста на вашите најдрагоцени моменти со уметничка визија." },
  { businessName: "Roma Lens Studios", ownerName: "Kemal", ownerSurname: "Amet", catSlug: "photographers-videographers", city: "Strumica", desc: "Professional photography and videography studio offering comprehensive event coverage. Our team combines photojournalistic style with editorial elegance.", descMk: "Професионално студио за фотографија и видеографија кое нуди сеопфатно покривање на настани. Нашиот тим комбинира фотожурналистички стил со уредничка елеганција." },
];

export async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mlb.mk";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: await hashPassword(adminPassword),
        name: "MLB Admin",
        role: "admin",
      },
    });
  }

  for (const cat of categories) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      await prisma.category.create({ data: cat });
    }
  }

  const allCategories = await prisma.category.findMany();
  const catMap = Object.fromEntries(allCategories.map((c) => [c.slug, c.id]));

  for (const v of vendorTemplates) {
    const slug = v.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const existing = await prisma.vendor.findUnique({ where: { slug } });
    if (!existing) {
      await prisma.vendor.create({
        data: {
          businessName: v.businessName,
          ownerName: v.ownerName,
          ownerSurname: v.ownerSurname,
          email: `${slug}@example.com`,
          phone: "+389 7" + Math.floor(Math.random() * 9000000 + 1000000),
          categoryId: catMap[v.catSlug],
          location: v.city + ", Macedonia",
          city: v.city,
          description: v.desc,
          descriptionMk: v.descMk,
          slug,
          photos: JSON.stringify([]),
          eventTypes: JSON.stringify(["Wedding", "Engagement", "Birthday", "Corporate", "Other"]),
          featured: Math.random() > 0.4,
          approved: true,
          rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
          reviewCount: Math.floor(Math.random() * 50 + 5),
          priceRange: ["$", "$$", "$$$"][Math.floor(Math.random() * 3)],
        },
      });
    }
  }
}
