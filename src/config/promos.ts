export type Promo = {
  id: string;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  precioRegular?: string;
  precioPromo?: string;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string;    // YYYY-MM-DD
  ctaTexto: string;
  ctaLink: string;
  cuposDisponibles?: number;
  activo: boolean;
};

export const PROMOS: Promo[] = [
  {
    id: "promo-ruleta",
    titulo: "RULETA CLASSIC",
    subtitulo: "La Estrella",
    descripcion: "Reservá online y al terminar tu corte, girás la Ruleta Classic: barba gratis, gel de regalo, cejas, cerveza… o el gran premio: tu próximo corte gratis. Premios reales, cupos diarios.",
    fechaInicio: "2024-09-01",
    fechaFin: "2024-09-30",
    ctaTexto: "Reservar y Girar",
    ctaLink: "https://wa.me/573015156815?text=Hola,%20quiero%20reservar%20con%20el%20c%C3%B3digo%20RULETA-SEP%20%F0%9F%8E%B2",
    activo: true,
  },
  {
    id: "promo-hora-feliz",
    titulo: "HORA FELIZ",
    subtitulo: "Lun - Mié, 2 a 5 PM",
    descripcion: "Septiembre: reservá online de lunes a miércoles entre 2 y 5 PM y tu corte de $25.000 incluye bebida + producto de regalo. Cupos limitados por día.",
    precioPromo: "$25.000",
    fechaInicio: "2024-09-01",
    fechaFin: "2024-09-30",
    ctaTexto: "Reservar Hora Feliz",
    ctaLink: "https://wa.me/573015156815?text=Hola,%20quiero%20reservar%20con%20el%20c%C3%B3digo%20HORA-FELIZ%20%E2%8F%B0",
    activo: true,
  },
  {
    id: "promo-maraton",
    titulo: "MARATÓN AMOR Y AMISTAD",
    subtitulo: "Sábado 19",
    descripcion: "Maratón Classic de 10 AM a 8 PM. Cortes por $25.000 con cejas, o $30.000 con barba y cejas, música, sorpresas y sorteo del kit capilar al cierre. Solo reservando online.",
    precioPromo: "Desde $25.000",
    fechaInicio: "2024-09-14",
    fechaFin: "2024-09-19",
    ctaTexto: "Reservar Cupo",
    ctaLink: "https://wa.me/573015156815?text=Hola,%20quiero%20reservar%20con%20el%20c%C3%B3digo%20MARATON-AMOR%20%F0%9F%9A%80",
    activo: true,
  },
  {
    id: "promo-kit-sorpresa",
    titulo: "KIT SORPRESA",
    subtitulo: "Primeros 100",
    descripcion: "Los primeros 100 en reservar online reciben su producto capilar sorpresa: gel, cera o kit. ¿Cuál te toca? Solo reservando por la web.",
    fechaInicio: "2024-09-01",
    fechaFin: "2024-09-30",
    ctaTexto: "Reservar Kit",
    ctaLink: "https://wa.me/573015156815?text=Hola,%20quiero%20reservar%20con%20el%20c%C3%B3digo%20KIT-100%20%F0%9F%8E%81",
    cuposDisponibles: 100,
    activo: true,
  },
  {
    id: "promo-ritual",
    titulo: "RITUAL CLASSIC",
    descripcion: "Septiembre: tu corte incluye lavado con masaje capilar — el ritual que te deja listo para conquistar.",
    fechaInicio: "2024-09-01",
    fechaFin: "2024-09-30",
    ctaTexto: "Reservar Ritual",
    ctaLink: "https://wa.me/573015156815?text=Hola,%20quiero%20reservar%20con%20el%20c%C3%B3digo%20RITUAL%20%F0%9F%92%88",
    activo: true,
  }
];

export const getActivePromos = () => {
  const today = "2024-09-19"; 
  return PROMOS.filter(promo => promo.activo && promo.fechaInicio <= today && promo.fechaFin >= today);
};
