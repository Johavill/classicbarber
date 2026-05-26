import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BARBERS, BUSINESS } from "@/lib/data";
import LeadCapture from "@/components/barberos/LeadCapture";
import { getCloudinaryUrl, cloudinaryLoader } from "@/lib/cloudinary";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);

  if (!barber) return { title: "Barbero no encontrado" };

  return {
    title: `${barber.name} | ${BUSINESS.name}`,
    description: `Reserva tu cita con ${barber.name}, experto en ${barber.specialty}.`,
    openGraph: {
      title: `${barber.name} - Master Barber`,
      description: barber.specialty,
      images: [{ url: barber.mobileImage }],
    },
  };
}

export default async function BarberPage({ params }: Props) {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);

  if (!barber) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center pb-20 selection:bg-[#D4AF37] selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header/Nav - Logo back to home */}
        <nav className="py-8 flex justify-center">
          <h1 className="text-[#D4AF37] font-serif text-2xl tracking-widest font-bold">
            CLASSIC BARBER
          </h1>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center mt-4">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-md opacity-50 animate-pulse" />
            <div className="relative w-48 h-48 rounded-full border-2 border-[#D4AF37] overflow-hidden p-1 bg-[#0A0A0A]">
              <Image
                src={getCloudinaryUrl(barber.mobileImage, { width: 200, height: 200, crop: "c_fill" })}
                alt={barber.name}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-full grayscale"
                priority
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              {barber.badge}
            </div>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold tracking-tight">{barber.name}</h2>
            <p className="text-[#D4AF37] font-medium text-lg mt-1">
              {barber.title}
            </p>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed px-4">
              {barber.specialty}. Más de {barber.years} años de experiencia creando estilos impecables.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-white/5">
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold text-xl">{barber.cuts}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Cortes</p>
          </div>
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold text-xl">{barber.rating}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Puntaje</p>
          </div>
          <div className="text-center">
            <p className="text-[#D4AF37] font-bold text-xl">{barber.years}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Experiencia</p>
          </div>
        </section>

        {/* Action Button */}
        <section className="mt-10">
          <LeadCapture 
            barberId={barber.id} 
            barberName={barber.name} 
            barberPhone={barber.phone} 
          />
          <p className="text-[10px] text-gray-600 text-center mt-3 uppercase tracking-tighter">
            Atención prioritaria para reservas vía QR
          </p>
        </section>

        {/* Portfolio Gallery */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-widest uppercase text-white/90">
              Portfolio
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {barber.portfolioImages.slice(0, 6).map((img, idx) => (
              <div 
                key={idx} 
                className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0a]"
              >
                <Image
                  loader={cloudinaryLoader}
                  src={img}
                  alt={`Corte ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <footer className="mt-20 text-center">
          <p className="text-gray-500 text-xs italic">
            © {new Date().getFullYear()} Classic Barbería — Laureles
          </p>
        </footer>
      </div>
    </div>
  );
}
