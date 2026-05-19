"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { SparklesCore } from "@/components/ui/sparkles";
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
      className="bg-[#1a1a1a] py-20 lg:py-32 relative overflow-hidden"
      aria-labelledby="servicios-heading"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(197,160,89,0.03)] blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center gap-4 lg:gap-6 mb-16 lg:mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Mobile Heading */}
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

          {/* Desktop Heading */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              className="relative flex flex-col items-center gap-6 p-8 lg:p-10 rounded-xl border border-[rgba(197,160,89,0.15)] bg-gradient-to-b from-[rgba(30,22,16,0.3)] to-[rgba(15,10,8,0.5)] hover:border-[rgba(197,160,89,0.5)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.08)] transition-all duration-500 group overflow-hidden"
            >
              {/* Gold Sparkles background on hover */}
              <div className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <SparklesCore
                  id={`sparkles-service-${index}`}
                  background="transparent"
                  minSize={0.5}
                  maxSize={1.5}
                  particleDensity={70}
                  className="w-full h-full"
                  particleColor="#c5a059"
                  speed={0.8}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
              </div>

              {/* Icon container with refined gold border and outer pulse */}
              <div className="relative z-10 flex w-20 h-20 items-center justify-center rounded-full bg-[#2a1d15] border border-[rgba(197,160,89,0.3)] group-hover:border-[#c5a059] group-hover:bg-[#3d2b1f] shadow-[0_0_20px_rgba(197,160,89,0.1)] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.25)] transition-all duration-500">
                <i
                  className={`${service.icon} text-[#c5a059] text-3xl`}
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-2xl text-center leading-snug mt-2 group-hover:text-[#c5a059] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.65)] text-sm font-light text-center leading-relaxed max-w-xs group-hover:text-[rgba(245,245,240,0.85)] transition-colors duration-300">
                {service.description}
              </p>

              {/* Price badge */}
              {service.price && (
                <div className="relative z-10 mt-auto pt-6 border-t border-[rgba(197,160,89,0.15)] group-hover:border-[rgba(197,160,89,0.3)] w-full text-center transition-colors duration-300">
                  <span className="font-[family-name:var(--font-playfair)] text-[#c5a059] text-xl font-medium tracking-wide">
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
