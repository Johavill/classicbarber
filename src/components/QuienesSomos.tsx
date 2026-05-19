"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TESTIMONIALS, IMAGES } from "@/lib/data";
import { cloudinaryLoader } from "@/lib/cloudinary";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  VIEWPORT,
} from "@/lib/animations";

export default function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="bg-[#1a1a1a] py-20 lg:py-32"
      aria-labelledby="testimonios-heading"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="flex flex-col items-center gap-4 mb-16 lg:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#c5a059]" />
            <span className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[3px] uppercase">
              Nuestros Clientes
            </span>
            <div className="w-12 h-px bg-[#c5a059]" />
          </motion.div>
          <motion.h2
            id="testimonios-heading"
            variants={fadeInUp}
            className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-3xl lg:text-[60px] text-center"
          >
            Voces de Distinción
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm tracking-[1.4px] text-center max-w-md"
          >
            Lo que dicen quienes viven la experiencia Classic Barbería
          </motion.p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="relative flex flex-col gap-8 p-8 lg:p-10 rounded-lg border border-[rgba(61,43,31,0.5)] bg-[rgba(61,43,31,0.2)] hover:border-[rgba(197,160,89,0.3)] transition-colors duration-300"
            >
              {/* Decorative quote */}
              <i className="fa-solid fa-quote-left absolute top-6 left-8 text-4xl text-[rgba(197,160,89,0.2)]" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-1 pt-4">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star text-[#c5a059] text-xs"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.8)] text-sm lg:text-base font-light italic leading-relaxed flex-1">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#3d2b1f] flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={`Foto de ${t.name}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-lg">
                    {t.name}
                  </p>
                  <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.4)] text-xs tracking-[1px] uppercase mt-0.5">
                    Cliente verificado
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* About / Who we are blurb */}
        <motion.div
          className="mt-20 lg:mt-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Text block */}
          <motion.div variants={fadeInUp} className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#c5a059]" />
              <span className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[3px] uppercase">
                Quiénes Somos
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-3xl lg:text-5xl leading-tight">
              Una Tradición de{" "}
              <span className="text-[#c5a059] italic">Excelencia</span>
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.7)] text-base font-light leading-relaxed">
              Classic Barbería nació de la pasión por el arte del barbero clásico.
              Desde 2012, nuestro espacio en Recoleta se ha convertido en un refugio
              para el caballero moderno que valora la tradición, el detalle y la
              experiencia premium.
            </p>
            <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.7)] text-base font-light leading-relaxed">
              Cada visita es un ritual: desde el momento en que cruzas la puerta hasta
              el último toque de colonia. Nuestros maestros barberos combinan técnicas
              italianas clásicas con las tendencias contemporáneas más sofisticadas.
            </p>
            {/* Stats row */}
            <div className="flex gap-8 pt-4 border-t border-[rgba(197,160,89,0.2)]">
              {[
                { value: "12+", label: "Años de Experiencia" },
                { value: "5k+", label: "Clientes Satisfechos" },
                { value: "4.9", label: "Valoración Promedio" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-[#c5a059] text-3xl">
                    {stat.value}
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-xs tracking-[1px] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            variants={fadeInUp}
            className="hidden lg:block w-px h-80 bg-gradient-to-b from-transparent via-[rgba(197,160,89,0.4)] to-transparent"
          />

          {/* Quote & Image block */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 flex flex-col gap-6 w-full lg:pl-6"
          >
            {/* Team group photo - responsive container with golden accent border */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-[rgba(197,160,89,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              {/* Desktop view */}
              <div className="hidden sm:block absolute inset-0">
                <Image
                  loader={cloudinaryLoader}
                  src={IMAGES.teamGroup}
                  alt="Equipo de barberos profesionales en Medellín - Classic Barbería"
                  fill
                  quality={80}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
              {/* Mobile view */}
              <div className="block sm:hidden absolute inset-0">
                <Image
                  loader={cloudinaryLoader}
                  src={IMAGES.teamGroupMobile}
                  alt="Los mejores barberos de Medellín - Classic Barbería"
                  fill
                  quality={80}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quote details */}
            <div className="flex flex-col gap-4 mt-2">
              <i className="fa-solid fa-scissors text-[#c5a059] text-3xl" aria-hidden="true" />
              <blockquote className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl lg:text-2xl italic leading-relaxed">
                &ldquo;El cabello es la corona que nunca te quitas. Nosotros nos
                aseguramos de que siempre brille.&rdquo;
              </blockquote>
              <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-sm tracking-[2px] uppercase">
                — Jhon B., Fundador
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
