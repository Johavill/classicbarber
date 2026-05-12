"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  VIEWPORT,
} from "@/lib/animations";

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="bg-[#1a1a1a] py-20 lg:py-32"
      aria-labelledby="servicios-heading"
    >
      <div className="section-container">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center gap-4 lg:gap-6 mb-16 lg:mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Mobile */}
          <motion.div variants={fadeInUp} className="lg:hidden w-12 h-px bg-[#c5a059]" />
          <motion.div variants={fadeInUp} className="lg:hidden text-center">
            <h2
              id="servicios-heading"
              className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-4xl leading-tight"
            >
              Experiencia<br />Premium
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm tracking-[1.4px] uppercase mt-3">
              Detalles que marcan la diferencia
            </p>
          </motion.div>

          {/* Desktop */}
          <motion.h2
            id="servicios-heading-desktop"
            variants={fadeInUp}
            className="hidden lg:block font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-5xl lg:text-[60px] leading-none text-center"
          >
            El Arte de la Tradición
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="hidden lg:block w-24 h-px bg-[#c5a059]"
          />
          <motion.p
            variants={fadeInUp}
            className="hidden lg:block font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm tracking-[2px] uppercase text-center"
          >
            Detalles que marcan la diferencia
          </motion.p>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              className="flex flex-col items-center gap-4 p-8 lg:p-10 rounded-lg border border-[#3d2b1f] bg-[rgba(61,43,31,0.3)] hover:border-[rgba(197,160,89,0.4)] hover:bg-[rgba(61,43,31,0.5)] transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex w-16 h-16 lg:w-20 lg:h-20 items-center justify-center rounded-full bg-[#3d2b1f] group-hover:bg-[rgba(197,160,89,0.15)] transition-colors duration-300">
                <i
                  className={`${service.icon} text-[#c5a059] text-2xl lg:text-3xl`}
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl lg:text-2xl text-center leading-snug mt-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm font-light text-center leading-relaxed">
                {service.description}
              </p>

              {/* Price badge */}
              {service.price && (
                <div className="mt-auto pt-4 border-t border-[rgba(197,160,89,0.2)] w-full text-center">
                  <span className="font-[family-name:var(--font-playfair)] text-[#c5a059] text-lg italic">
                    {service.price}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
