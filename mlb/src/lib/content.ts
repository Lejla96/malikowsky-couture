export interface SiteContent {
  hero: {
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
    ctaEn: string;
    ctaMk: string;
    ctaSecondaryEn: string;
    ctaSecondaryMk: string;
    searchPlaceholderEn: string;
    searchPlaceholderMk: string;
    badge: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    videoUrl: string;
    videoOverlayOpacity: string;
  };
  categories: {
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
  };
  featured: {
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
  };
  howItWorks: {
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
    step1TitleEn: string;
    step1TitleMk: string;
    step1DescEn: string;
    step1DescMk: string;
    step2TitleEn: string;
    step2TitleMk: string;
    step2DescEn: string;
    step2DescMk: string;
    step3TitleEn: string;
    step3TitleMk: string;
    step3DescEn: string;
    step3DescMk: string;
  };
  testimonials: {
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
    items: Array<{
      name: string;
      eventEn: string;
      eventMk: string;
      textEn: string;
      textMk: string;
    }>;
  };
  cta: {
    badgeEn: string;
    badgeMk: string;
    titleEn: string;
    titleMk: string;
    subtitleEn: string;
    subtitleMk: string;
  };
  about: {
    titleEn: string;
    titleMk: string;
    introEn: string;
    introMk: string;
    missionTitleEn: string;
    missionTitleMk: string;
    missionText1En: string;
    missionText1Mk: string;
    missionText2En: string;
    missionText2Mk: string;
  };
  footer: {
    aboutEn: string;
    aboutMk: string;
    copyrightEn: string;
    copyrightMk: string;
    madeWithEn: string;
    madeWithMk: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const siteContent: SiteContent = {
  hero: {
    titleEn: "Your Dream Event Starts Here",
    titleMk: "Вашиот сонувачки настан почнува тука",
    subtitleEn: "Discover Macedonia's finest event professionals. From weddings to celebrations, find and book the perfect vendors for your special day.",
    subtitleMk: "Откријте ги најдобрите професионалци за настани во Македонија. Од свадби до прослави, пронајдете и резервирајте ги совршените продавачи за вашиот посебен ден.",
    ctaEn: "Plan Your Event",
    ctaMk: "Планирај го настанот",
    ctaSecondaryEn: "Browse Vendors",
    ctaSecondaryMk: "Прегледај продавачи",
    searchPlaceholderEn: "What are you looking for?",
    searchPlaceholderMk: "Што барате?",
    badge: "Macedonia's Premier Event Marketplace",
    stat1Number: "50+",
    stat1Label: "Vendors",
    stat2Number: "500+",
    stat2Label: "Events",
    stat3Number: "98%",
    stat3Label: "Satisfaction",
    videoUrl: "https://assets.mixkit.co/videos/5213/5213-720.mp4",
    videoOverlayOpacity: "0.35",
  },
  categories: {
    titleEn: "Browse by Category",
    titleMk: "Прегледај по категорија",
    subtitleEn: "Find the perfect vendors for every aspect of your celebration",
    subtitleMk: "Пронајдете ги совршените продавачи за секој аспект од вашата прослава",
  },
  featured: {
    titleEn: "Featured Vendors",
    titleMk: "Истакнати продавачи",
    subtitleEn: "Handpicked professionals trusted by hundreds of happy couples",
    subtitleMk: "Рачно избрани професионалци на кои им веруваат стотици среќни парови",
  },
  howItWorks: {
    titleEn: "How It Works",
    titleMk: "Како функционира",
    subtitleEn: "Planning your dream event is easy with MLB",
    subtitleMk: "Планирањето на вашиот сонувачки настан е лесно со MLB",
    step1TitleEn: "Browse & Discover",
    step1TitleMk: "Прегледај и откријте",
    step1DescEn: "Explore our curated collection of top-rated vendors across all categories.",
    step1DescMk: "Истражете ја нашата курирана колекција на најдобро оценети продавачи во сите категории.",
    step2TitleEn: "Connect & Compare",
    step2TitleMk: "Поврзете се и споредете",
    step2DescEn: "View detailed profiles, read reviews, and compare options to find your perfect match.",
    step2DescMk: "Прегледајте детални профили, прочитајте рецензии и споредете ги опциите за да го најдете вашиот совршен избор.",
    step3TitleEn: "Book & Celebrate",
    step3TitleMk: "Резервирајте и прославете",
    step3DescEn: "Request a consultation, confirm your booking, and enjoy your perfect event.",
    step3DescMk: "Побарајте консултација, потврдете ја вашата резервација и уживајте во вашиот совршен настан.",
  },
  testimonials: {
    titleEn: "What Our Couples Say",
    titleMk: "Што велат нашите парови",
    subtitleEn: "Real stories from real celebrations",
    subtitleMk: "Вистински приказни од вистински прослави",
    items: [
      {
        name: "Ana & Marko",
        eventEn: "Wedding in Skopje",
        eventMk: "Свадба во Скопје",
        textEn: "MLB made our wedding planning so much easier. We found the most amazing musicians and decorator through the platform. Everything was perfect!",
        textMk: "MLB го направи нашето планирање на свадбата многу полесно. Пронајдовме неверојатни музичари и декоратор преку платформата. Сè беше совршено!",
      },
      {
        name: "Elena & Stefan",
        eventEn: "Engagement in Ohrid",
        eventMk: "Веридба во Охрид",
        textEn: "The vendor profiles were so detailed and helpful. We loved being able to see photos and reviews before making our decision. Highly recommend!",
        textMk: "Профилите на продавачите беа толку детални и корисни. Ни се допадна можноста да видиме фотографии и рецензии пред да донесеме одлука. Топло препорачуваме!",
      },
      {
        name: "Selma & Bajram",
        eventEn: "Wedding in Bitola",
        eventMk: "Свадба во Битола",
        textEn: "As a Roma couple, it was important for us to find vendors who understand our traditions. MLB connected us with incredible professionals.",
        textMk: "Како ромски пар, ни беше важно да најдеме продавачи кои ги разбираат нашите традиции. MLB нè поврза со неверојатни професионалци.",
      },
    ],
  },
  cta: {
    badgeEn: "Get Started Today",
    badgeMk: "Започнете денес",
    titleEn: "Ready to Plan Your Perfect Event?",
    titleMk: "Подготвени да го планирате вашиот совршен настан?",
    subtitleEn: "Join thousands of couples who found their perfect vendors through MLB.",
    subtitleMk: "Придружете се на илјадници парови кои ги пронајдоа нивните совршени продавачи преку MLB.",
  },
  about: {
    titleEn: "About MLB",
    titleMk: "За MLB",
    introEn: "MLB is Macedonia's premier digital event planning platform, dedicated to promoting and supporting Roma-owned businesses and event professionals across the country.",
    introMk: "MLB е премиерната дигитална платформа за планирање настани во Македонија, посветена на промовирање и поддршка на ромските бизниси и професионалци за настани.",
    missionTitleEn: "Our Mission",
    missionTitleMk: "Нашата мисија",
    missionText1En: "We believe every celebration deserves perfection. Our mission is to connect couples and families with the most talented event professionals in Macedonia, with a special focus on promoting Roma entrepreneurs and businesses.",
    missionText1Mk: "Веруваме дека секоја прослава заслужува совршенство. Нашата мисија е да ги поврземе паровите и семејствата со најталентираните професионалци за настани во Македонија, со посебен фокус на промовирање на ромските претприемачи и бизниси.",
    missionText2En: "Through MLB, we're creating a premium digital ecosystem where talent meets opportunity, empowering Roma businesses to grow while helping clients plan their perfect events.",
    missionText2Mk: "Преку MLB, создаваме премиум дигитален екосистем каде талентот се среќава со можноста, овозможувајќи им на ромските бизниси да растат додека им помагаме на клиентите да ги планираат нивните совршени настани.",
  },
  footer: {
    aboutEn: "MLB is Macedonia's premier event planning marketplace, connecting you with the finest vendors for weddings, engagements, birthdays, and celebrations.",
    aboutMk: "MLB е премиерната пазарница за планирање настани во Македонија, која ве поврзува со најдобрите продавачи за свадби, веридби, родендени и прослави.",
    copyrightEn: "© 2026 MLB Marketplace. All rights reserved.",
    copyrightMk: "© 2026 MLB Marketplace. Сите права задржани.",
    madeWithEn: "Made with love in Macedonia",
    madeWithMk: "Направено со љубов во Македонија",
    email: "info@mlb.mk",
    phone: "+389 2 XXX XXXX",
    address: "Skopje, Macedonia",
  },
};

export function getContent(): SiteContent {
  return siteContent;
}

export function updateContent(section: string, data: Record<string, unknown>) {
  const s = section as keyof SiteContent;
  if (siteContent[s] && typeof siteContent[s] === "object") {
    Object.assign(siteContent[s], data);
  }
}
