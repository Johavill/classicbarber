import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Portafolio from "@/components/Portafolio";
import QuienesSomos from "@/components/QuienesSomos";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactoModal from "@/components/ContactoModal";
import AnnouncementBar from "@/components/AnnouncementBar";
import PromoBanner from "@/components/PromoBanner";
import NuestrosBarberos from "@/components/NuestrosBarberos";
import NuestrosBarberosTimer from "@/components/NuestrosBarberosTimer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        {/* <NuestrosBarberos /> */}
        <NuestrosBarberosTimer />
        <Servicios />
        <Portafolio />
        <QuienesSomos />
        <Contacto />
      </main>
      <Footer />
      {/* Floating WhatsApp button — fixed on all screens */}
      <WhatsAppButton />
      {/* Global Booking Modal */}
      <ContactoModal />
    </>
  );
}
