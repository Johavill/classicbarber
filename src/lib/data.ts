/* ──────────────────────────────────────────────
   lib/data.ts — Central data store
   Cambia aquí textos, imágenes y datos del negocio
 ────────────────────────────────────────────── */

export const BUSINESS = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Classic Barbería",
  tagline:
    process.env.NEXT_PUBLIC_BUSINESS_TAGLINE ??
    "La Excelencia en el Arte de la Barbería",
  subTagline: "Donde la tradición se encuentra con la distinción moderna.",
  address:
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
    "Av. 80 # 53 a 10, Laureles - Estadio, Medellín, Antioquia, Colombia",
  addressLine1: "Av. 80 # 53 a 10, Laureles - Estadio",
  addressLine2: "Medellín, Antioquia, Colombia",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+57 324 243 2321",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "classicbarberias@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573242432321",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://instagram.com/classicbarberia",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ??
    "https://facebook.com/classicbarberia",
  year: "2024",
} as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Barberos", href: "#barberos" },
  { label: "Contacto", href: "#contacto" },
] as const;

export type Service = {
  icon: string;
  title: string;
  description: string;
  price?: string;
};

export const SERVICES: Service[] = [
  {
    icon: "fa-solid fa-scissors",
    title: "Corte Clásico",
    description:
      "Corte personalizado con técnicas tradicionales y asesoramiento de visagismo para resaltar tus mejores facciones.",
    price: "Incluye lavado",
  },
  {
    icon: "fa-solid fa-user-tie",
    title: "Atención Personalizada",
    description:
      "Asesoramiento de imagen exclusivo, diagnóstico capilar y bebidas de cortesía premium (Single Malt o espresso) para una experiencia sin prisa.",
    price: "Incluye lavado",
  },
  {
    icon: "fa-solid fa-soap",
    title: "Cuidado de Barba",
    description:
      "Ritual completo de afeitado o perfilado con navaja, aceites esenciales premium, toallas calientes e hidratación de la piel.",
    price: "Incluye lavado",
  },
];

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Noble Pomade — Strong Hold",
    category: "Estilo",
    description:
      "Cera premium con acabado mate y fijación extrema para estilos que duran todo el día.",
    price: "$2.800",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/5b9fb70bbff256124e7c1e315b14522f58814b43?width=447",
  },
  {
    id: 2,
    name: "Aceite de Barba 'Imperial'",
    category: "Cuidado",
    description:
      "Mezcla de aceites esenciales de sándalo y cedro para hidratación y brillo superior.",
    price: "$1.950",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1deee8133b874f8f2dadda47d5d90f6ad04c9fed?width=447",
  },
  {
    id: 3,
    name: "Peine de Sándalo Tallado",
    category: "Accesorios",
    description:
      "Madera genuina tallada a mano para evitar el frizz y masajear el cuero cabelludo.",
    price: "$3.500",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/963aa641a1e032d22f12a279f3e91e513c0312ce?width=447",
  },
  {
    id: 4,
    name: "Vitality Boost — Suplemento",
    category: "Vitalidad",
    description:
      "Potenciador natural formulado para mejorar la energía y vitalidad diaria del hombre moderno.",
    price: "$4.200",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b9d2bd2907e6477374c83c8701eed72bcf9ddf61?width=447",
  },
  {
    id: 5,
    name: "Kit 'The Blade' — Tradicional",
    category: "Kits",
    description:
      "Navaja de acero inoxidable, brocha de cerda natural y jabón de afeitar artesanal.",
    price: "$8.900",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/c1efa40d94860e91bd2b80195ae49df2b608082f?width=447",
  },
  {
    id: 6,
    name: "Shampoo de Carbon Activado",
    category: "Cuidado",
    description:
      "Limpieza profunda que elimina impurezas y revitaliza el folículo capilar.",
    price: "$1.700",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/47c9a97f75d581afc0ef497fbec5e1c697935d9b?width=925",
  },
];

export type Barber = {
  id: number;
  name: string;
  title: string;
  image: string;
  mobileImage: string;
  badge: string;
  specialty: string;
  years: string;
  cuts: string;
  rating: string;
  portfolioImages: string[];
  slug: string;
  phone?: string;
};

export const BARBERS: Barber[] = [
  {
    id: 1,
    name: "Jhonathan Arley Cardona",
    title: "Estilista Clásico",
    image: "https://res.cloudinary.com/dazruxlue/image/upload/v1779209682/Jhonatan_xbxehc.jpg",
    mobileImage: "https://res.cloudinary.com/dazruxlue/image/upload/v1779209682/Jhonatan_xbxehc.jpg",
    badge: "Estilista Clásico",
    specialty: "Corte de cabello y Barba",
    years: "6+",
    cuts: "1.2k",
    rating: "4.9/5",
    portfolioImages: [
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810297/vis7_ozrzb5.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810296/vis4_agmfas.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810296/arg1_ehnxjs.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810296/vis3_qv2gvj.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810296/barb3_ef1jjq.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810295/fade1_dj66xf.jpg"
    ],
    slug: "jhonatan-b",
    phone: "573137441721",
  },
  {
    id: 2,
    name: "Alexis López",
    title: "Especialista en Cabello & Barba",
    image: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774528/Alexis_dkc1pr.jpg",
    mobileImage: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774528/Alexis_dkc1pr.jpg",
    badge: "Estilo Moderno",
    specialty: "Corte de cabello y Barba",
    years: "5+",
    cuts: "900",
    rating: "4.8/5",
    portfolioImages: [
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811314/m2_xutqyj.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811313/m1_zuuzo3.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811312/4_lru76x.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811312/3_pz9nrs.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811310/5_iqgczw.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811309/6_tsyjom.jpg"
    ],
    slug: "alexis-lopez",
    phone: "573235296403",
  },
  {
    id: 3,
    name: "Helmer López",
    title: "Maestro Barbero",
    image: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774446/Helmer_hy1lqd.jpg",
    mobileImage: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774446/Helmer_hy1lqd.jpg",
    badge: "Senior Barber",
    specialty: "Corte de cabello y Barba",
    years: "10+",
    cuts: "2.1k",
    rating: "4.9/5",
    portfolioImages: [
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810853/6_f0otz4.png",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810852/r2_gzxqfb.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810851/rr_kpn7ag.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810851/r1_fbz5tn.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810851/5_cu7vzz.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779810850/4_mnoyxg.jpg"
    ],
    slug: "helmer-lopez",
    phone: "573008576763",
  },
  {
    id: 4,
    name: "Juan Carlos Restrepo",
    title: "Experto en Barbería",
    image: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774493/JuanCarlos_hxbvgy.jpg",
    mobileImage: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774493/JuanCarlos_hxbvgy.jpg",
    badge: "Classic Specialist",
    specialty: "Corte de cabello y Barba",
    years: "8+",
    cuts: "1.5k",
    rating: "4.7/5",
    portfolioImages: [
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814230/2_ixfhg6.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814234/4_qyj8h1.png",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814233/6_h4s8lx.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814232/5_nywy7r.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814229/1_xecom2.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779814229/1_xecom2.jpg"
    ],
    slug: "juan-carlos",
    phone: "573143232008",
  },
  {
    id: 5,
    name: "Didier Hernandez G.",
    title: "Master Barber",
    image: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774425/didier_y19f9m.jpg",
    mobileImage: "https://res.cloudinary.com/dazruxlue/image/upload/v1778774425/didier_y19f9m.jpg",
    badge: "Expert",
    specialty: "Corte de cabello y Barba",
    years: "7+",
    cuts: "1.3k",
    rating: "4.8/5",
    portfolioImages: [
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811649/6_clfynf.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811648/5_jsetqm.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811647/4_qhkveg.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811646/3_uppcla.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811645/2_nrqwlg.jpg",
      "https://res.cloudinary.com/dazruxlue/image/upload/v1779811645/1_w0lrmk.jpg"
    ],
    slug: "didier-hernandez",
    phone: "573215588411",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"El nivel de detalle y la atmósfera del lugar son incomparables. El ritual de toallas calientes es el mejor de la ciudad. Una verdadera experiencia de lujo."',
    name: "Alejandro M.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/a9ea6408c788e7d7a91176f86ce1715a60704d7a?width=96",
  },
  {
    quote:
      '"Llevo años buscando un barbero que entienda mi estilo. Helmer no solo corta el pelo, esculpe. El whisky de cortesía es un gran toque."',
    name: "Diego S.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/584f3a52308299c1638a46c6743180c29ea4867e?width=96",
  },
  {
    quote:
      '"Impecable. Desde la reserva hasta el resultado final. Un oasis de masculinidad clásica en medio de la ciudad moderna."',
    name: "Carlos V.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/91aeff9c1db80317fa192de38994fc70801edafa?width=96",
  },
];

export const HOURS = [
  { days: "Lunes - Sábado:", time: "08:00 - 21:00", muted: false },
  { days: "Dom - Festivos:", time: "09:00 - 19:00", muted: false },
] as const;

/* Builder.io image URLs used in sections */
export const IMAGES = {
  heroBg:
    "https://res.cloudinary.com/dazruxlue/image/upload/v1779209518/fondo_tl59ys.jpg",
  contactBg:
    "https://api.builder.io/api/v1/image/assets/TEMP/32845337765f6ea95327aeb029a3767ac8ce8b71?width=1440",
  mapBg:
    "https://api.builder.io/api/v1/image/assets/TEMP/9b477d6d1d27b4268ffb3a4e255d538f1cd3d283?width=1440",
  teamGroup:
    "https://res.cloudinary.com/dazruxlue/image/upload/v1779209683/grupal_bzh3ye.jpg",
  teamGroupMobile:
    "https://res.cloudinary.com/dazruxlue/image/upload/v1779209683/barberos1_lxczzu.jpg",
} as const;
