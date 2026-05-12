"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { BARBERS, type Barber } from "@/lib/data";
import PortafolioModal from "./PortafolioModal";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  VIEWPORT,
} from "@/lib/animations";

export default function Portafolio() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  return (
    <>
      <section
        id="barberos"
        className="py-20 lg:py-32 border-t border-b border-[rgba(245,245,240,0.1)] bg-[rgba(61,43,31,0.1)]"
        aria-labelledby="barberos-heading"
      >
        <div className="section-container">
          {/* Header */}
          <motion.div
            className="flex items-end justify-between mb-12 lg:mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.h2
              id="barberos-heading"
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-3xl lg:text-[72px] leading-tight lg:leading-none"
            >
              <span className="text-[#f5f5f0]">Nuestros </span>
              <span className="text-[#c5a059] italic">Maestros</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="hidden lg:block font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm tracking-[1.4px] max-w-xs text-right"
            >
              Haz clic en cada barbero para ver su portafolio completo
            </motion.p>
            <i className="lg:hidden fa-solid fa-chevron-right text-[#c5a059] text-lg" aria-hidden="true" />
          </motion.div>

          {/* Desktop grid */}
          <motion.div
            className="hidden md:grid grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {BARBERS.map((barber) => (
              <motion.div
                key={barber.id}
                variants={scaleIn}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setSelectedBarber(barber)}
                role="button"
                tabIndex={0}
                aria-label={`Ver portafolio de ${barber.name}`}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  setSelectedBarber(barber)
                }
              >
                <div className="relative h-[520px]">
                  <Image
                    src={barber.image}
                    alt={`${barber.name} — ${barber.title}`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 33vw, 400px"
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[rgba(26,26,26,0.5)] to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-3xl leading-tight">
                    {barber.name}
                  </h3>
                  <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-sm tracking-[1.4px] uppercase mt-1 mb-4">
                    {barber.title}
                  </p>
                  <button
                    id={`barber-portfolio-btn-${barber.id}`}
                    className="w-full py-3 border border-[rgba(197,160,89,0.5)] rounded font-[family-name:var(--font-montserrat)] text-[#f5f5f0] text-sm tracking-[1.4px] uppercase hover:bg-[rgba(197,160,89,0.2)] hover:border-[#c5a059] transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBarber(barber);
                    }}
                  >
                    Ver Portafolio
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hidden">
            <div
              className="flex gap-6"
              style={{ width: `${BARBERS.length * 296}px` }}
            >
              {BARBERS.map((barber) => (
                <div
                  key={barber.id}
                  className="relative rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
                  style={{ width: 280, height: 400 }}
                  onClick={() => setSelectedBarber(barber)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver portafolio de ${barber.name}`}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    setSelectedBarber(barber)
                  }
                >
                  <Image
                    src={barber.mobileImage}
                    alt={`${barber.name} — ${barber.title}`}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[rgba(26,26,26,0.1)] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-2xl">
                      {barber.name}
                    </h3>
                    <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.2px] uppercase mt-1">
                      {barber.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal — rendered outside section to avoid stacking context issues */}
      {selectedBarber && (
        <PortafolioModal
          barber={selectedBarber}
          onClose={() => setSelectedBarber(null)}
        />
      )}
    </>
  );
}
