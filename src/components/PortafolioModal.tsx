"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import type { Barber } from "@/lib/data";
import { BUSINESS } from "@/lib/data";
import LeadCapture from "./barberos/LeadCapture";
import { cloudinaryLoader } from "@/lib/cloudinary";

type Props = {
  barber: Barber;
  onClose: () => void;
};

export default function PortafolioModal({ barber, onClose }: Props) {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hola! Quiero reservar un turno con ${encodeURIComponent(barber.name.split(" ")[0])}`;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Portafolio de ${barber.name}`}
        aria-describedby="modal-description"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[rgba(26,26,26,0.92)] backdrop-blur-sm" />

        {/* Modal panel */}
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <motion.div
            className="relative z-10 w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-lg border border-[rgba(197,160,89,0.3)] bg-[#1a1a1a] shadow-2xl scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar portafolio"
              className="absolute top-4 right-4 z-20 flex w-10 h-10 items-center justify-center rounded-full border border-[rgba(197,160,89,0.3)] text-[#c5a059] hover:bg-[rgba(61,43,31,0.4)] transition-colors duration-200"
            >
              <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-3 px-8 lg:px-10 pt-16 pb-10 border-b border-[rgba(197,160,89,0.1)]">
              <div className="px-4 py-1 rounded-full border border-[rgba(197,160,89,0.4)]">
                <span className="text-[#c5a059] text-[10px] font-[family-name:var(--font-montserrat)] font-normal tracking-[3px] uppercase">
                  {barber.badge}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-center leading-tight tracking-tight">
                <span className="text-[#f5f5f0]">{barber.name.split(" ")[0]} </span>
                <span className="text-[#c5a059] italic">&lsquo;The Blade&rsquo;</span>
                <span className="text-[#f5f5f0]"> {barber.name.split(" ")[1] ?? ""}</span>
              </h2>
              <p id="modal-description" className="text-[rgba(245,245,240,0.6)] font-[family-name:var(--font-montserrat)] text-sm font-light tracking-[1.4px] uppercase text-center">
                {barber.specialty}
              </p>
            </div>

            {/* Gallery Bento Grid (Optimized for Vertical Portrait Haircut Photos) */}
            <div className="p-6 lg:p-8 bg-[rgba(61,43,31,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[250px]">
                {/* Image 1: Tall vertical portrait 1 (Row span 2) */}
                <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-2 col-span-1">
                  <Image
                    loader={cloudinaryLoader}
                    src={barber.portfolioImages[0] || barber.image}
                    alt={`${barber.name} — trabajo destacado`}
                    fill
                    className="object-cover hover:scale-105 transition-all duration-700 contrast-[1.05] brightness-[0.9]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Image 2: Tall vertical portrait 2 (Row span 2) */}
                <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-2 col-span-1">
                  <Image
                    loader={cloudinaryLoader}
                    src={barber.portfolioImages[1]}
                    alt={`${barber.name} — corte de cabello con degradado`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Image 3: Tall vertical portrait 3 (Row span 2) */}
                <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-2 col-span-1">
                  <Image
                    loader={cloudinaryLoader}
                    src={barber.portfolioImages[2]}
                    alt={`${barber.name} — perfil de barba esculpida`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Image 4: Square detail 1 (Row span 1) */}
                <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-1 col-span-1">
                  <Image
                    loader={cloudinaryLoader}
                    src={barber.portfolioImages[3]}
                    alt={`${barber.name} — detalle de afeitado`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Image 5: Square detail 2 (Row span 1) */}
                <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-1 col-span-1">
                  <Image
                    loader={cloudinaryLoader}
                    src={barber.portfolioImages[4]}
                    alt={`${barber.name} — estilo clásico`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                {/* Image 6: Square detail 3 (Row span 1) */}
                {barber.portfolioImages[5] && (
                  <div className="relative rounded-md border border-[rgba(61,43,31,0.3)] overflow-hidden row-span-1 col-span-1">
                    <Image
                      loader={cloudinaryLoader}
                      src={barber.portfolioImages[5]}
                      alt={`${barber.name} — acabado final`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Stats + CTA */}
            <div className="flex flex-col items-center gap-8 px-8 lg:px-10 py-10 bg-[#1a1a1a] border-t border-[rgba(197,160,89,0.1)]">
              {/* Stats */}
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#c5a059]">
                    {barber.years}
                  </span>
                  <span className="text-[rgba(245,245,240,0.4)] font-[family-name:var(--font-montserrat)] text-[10px] tracking-[1px] uppercase">
                    Años de Exp.
                  </span>
                </div>
                <div className="w-px h-10 bg-[rgba(197,160,89,0.2)]" aria-hidden="true" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#c5a059]">
                    {barber.cuts}
                  </span>
                  <span className="text-[rgba(245,245,240,0.4)] font-[family-name:var(--font-montserrat)] text-[10px] tracking-[1px] uppercase">
                    Cortes Realizados
                  </span>
                </div>
                <div className="w-px h-10 bg-[rgba(197,160,89,0.2)]" aria-hidden="true" />
                <div className="flex flex-col items-center gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#c5a059]">
                    {barber.rating}
                  </span>
                  <span className="text-[rgba(245,245,240,0.4)] font-[family-name:var(--font-montserrat)] text-[10px] tracking-[1px] uppercase">
                    Valoración
                  </span>
                </div>
              </div>

              {/* WhatsApp Lead Capture */}
              <div className="w-full max-w-sm">
                <LeadCapture 
                  barberId={barber.id} 
                  barberName={barber.name} 
                  barberPhone={barber.phone} 
                />
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguir en Instagram"
                  className="text-[rgba(245,245,240,0.4)] hover:text-[rgba(245,245,240,0.7)] transition-colors"
                >
                  <i className="fa-brands fa-instagram text-xl" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguir en Facebook"
                  className="text-[rgba(245,245,240,0.4)] hover:text-[rgba(245,245,240,0.7)] transition-colors"
                >
                  <i className="fa-brands fa-facebook text-xl" aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat por WhatsApp"
                  className="text-[rgba(245,245,240,0.4)] hover:text-[rgba(245,245,240,0.7)] transition-colors"
                >
                  <i className="fa-brands fa-whatsapp text-xl" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </FocusTrap>
      </motion.div>
    </AnimatePresence>
  );
}
