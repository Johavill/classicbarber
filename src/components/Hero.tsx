"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS, IMAGES } from "@/lib/data";
import { fadeIn, fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}`;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24"
      aria-label="Sección principal"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroBg}
          alt="Classic Barbería — ambiente interior"
          fill
          priority
          quality={85}
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,26,26,0.2)] via-[rgba(26,26,26,0.4)] to-[#1a1a1a]" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={VIEWPORT}
      >
        {/* Mobile eyebrow */}
        <motion.p
          variants={fadeIn}
          className="lg:hidden font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs font-medium tracking-[3.6px] uppercase"
        >
          Estilo &amp; Distinción
        </motion.p>

        {/* Desktop eyebrow */}
        <motion.div
          variants={fadeIn}
          className="hidden lg:flex items-center gap-4"
        >
          <div className="w-16 h-px bg-[#c5a059]" />
          <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[4px] uppercase">
            Estilo &amp; Distinción
          </p>
          <div className="w-16 h-px bg-[#c5a059]" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeInUp}
          className="font-[family-name:var(--font-playfair)] font-normal italic leading-none"
        >
          <span className="block text-[#f5f5f0] text-4xl sm:text-6xl lg:text-[96px] lg:leading-[96px]">
            La Excelencia en el
          </span>
          <span className="block text-[#c5a059] text-4xl sm:text-6xl lg:text-[96px] lg:leading-[96px]">
            Arte de la Barbería
          </span>
        </motion.h1>

        {/* Subtagline */}
        <motion.p
          variants={fadeInUp}
          className="font-[family-name:var(--font-montserrat)] font-light text-[rgba(245,245,240,0.8)] text-base sm:text-lg lg:text-xl tracking-[2px] uppercase max-w-xl"
        >
          {BUSINESS.subTagline}
        </motion.p>

        {/* Desktop CTA */}
        <motion.div variants={fadeInUp} className="hidden lg:flex mt-2">
          <a
            id="hero-cta-desktop"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-5 bg-[#c5a059] rounded text-[#1a1a1a] font-[family-name:var(--font-montserrat)] font-medium text-sm tracking-[2.8px] uppercase hover:bg-[rgba(197,160,89,0.9)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]"
          >
            <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" />
            <span>Agendar por WhatsApp</span>
          </a>
        </motion.div>

        {/* Mobile CTAs */}
        <motion.div
          variants={fadeInUp}
          className="lg:hidden flex flex-col gap-4 w-full max-w-sm mt-2"
        >
          <a
            id="hero-cta-mobile"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-5 bg-[#c5a059] rounded-sm text-[#1a1a1a] font-[family-name:var(--font-montserrat)] font-bold text-sm tracking-[2.8px] uppercase"
          >
            <span>Reservar Turno</span>
            <i className="fa-solid fa-calendar-days" aria-hidden="true" />
          </a>
          <a
            href="#servicios"
            className="flex items-center justify-center py-5 border border-[rgba(197,160,89,0.5)] rounded-sm text-[#c5a059] font-[family-name:var(--font-montserrat)] font-medium text-sm tracking-[2.8px] uppercase hover:border-[#c5a059] hover:bg-[rgba(197,160,89,0.1)] transition-all duration-300"
          >
            Ver Servicios
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          className="hidden lg:flex flex-col items-center gap-2 mt-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className="fa-solid fa-chevron-down text-[rgba(197,160,89,0.6)] text-sm" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
