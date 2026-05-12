import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Productos from "@/components/Productos";
import Portafolio from "@/components/Portafolio";
import QuienesSomos from "@/components/QuienesSomos";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Portafolio />
        <Productos />
        <QuienesSomos />
        <Contacto />
      </main>
      <Footer />
      {/* Floating WhatsApp button — fixed on all screens */}
      <WhatsAppButton />
    </>
  );
}
