"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS, HOURS, IMAGES } from "@/lib/data";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  fadeInUp,
  VIEWPORT,
} from "@/lib/animations";
import GoogleMap from "@/components/GoogleMap";
import FormularioContacto from "@/components/FormularioContacto";

export default function Contacto() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hola! Me gustaría reservar un turno en Classic Barbería.`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;

  return (
    <section
      id="contacto"
      className="border-t border-[rgba(245,245,240,0.1)]"
      aria-labelledby="contacto-heading"
    >
      {/* Top half — info + map */}
      <motion.div
        className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {/* Left panel — info */}
        <motion.div
          variants={slideInLeft}
          className="relative flex-1 flex flex-col justify-center px-8 lg:px-24 py-20 lg:py-24 overflow-hidden"
        >
          {/* Background image */}
          <Image
            src={IMAGES.contactBg}
            alt="Interior Classic Barbería — mobiliario antiguo y ambiente elegante"
            fill
            className="object-cover opacity-20"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Color overlay */}
          <div className="absolute inset-0 bg-[#3d2b1f]" style={{ opacity: 0.85 }} />

          {/* Content */}
          <div className="relative z-10">
            <h2
              id="contacto-heading"
              className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-5xl lg:text-[80px] xl:text-[96px] leading-none mb-10 lg:mb-12"
            >
              Visítanos
            </h2>

            <div className="flex flex-col gap-10">
              {/* Location */}
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-sm tracking-[1.4px] uppercase">
                  Ubicación
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.8)] text-lg font-light leading-relaxed">
                  {BUSINESS.addressLine1}
                  <br />
                  {BUSINESS.addressLine2}
                </p>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-sm tracking-[1.4px] uppercase">
                  Horario
                </p>
                <div className="flex flex-col gap-2">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex justify-between max-w-xs">
                      <span
                        className={`font-[family-name:var(--font-montserrat)] text-lg font-light ${
                          h.muted
                            ? "text-[rgba(245,245,240,0.5)]"
                            : "text-[rgba(245,245,240,0.8)]"
                        }`}
                      >
                        {h.days}
                      </span>
                      <span
                        className={`font-[family-name:var(--font-montserrat)] text-lg font-light ${
                          h.muted
                            ? "text-[rgba(245,245,240,0.5)]"
                            : "text-[rgba(245,245,240,0.8)]"
                        }`}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-sm tracking-[1.4px] uppercase">
                  Contacto
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.8)] text-lg font-light leading-relaxed">
                  {BUSINESS.phone}
                  <br />
                  {BUSINESS.email}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  id="contact-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] rounded text-white font-[family-name:var(--font-montserrat)] font-bold text-sm tracking-[2px] uppercase hover:bg-[rgba(37,211,102,0.9)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" />
                  <span>Reservar por WhatsApp</span>
                </a>
                <a
                  id="contact-maps-btn"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-[rgba(197,160,89,0.4)] bg-[rgba(26,26,26,0.5)] rounded text-[#c5a059] font-[family-name:var(--font-montserrat)] font-medium text-sm tracking-[2px] uppercase hover:border-[#c5a059] hover:bg-[rgba(26,26,26,0.7)] transition-all duration-300"
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  <span>Cómo Llegar</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right panel — Google Maps full bleed */}
        <motion.div
          variants={slideInRight}
          className="relative flex-1 min-h-[400px] lg:min-h-0 overflow-hidden"
        >
          <GoogleMap />
        </motion.div>
      </motion.div>

      {/* Bottom half — Contact form */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="bg-[#111111] border-t border-[rgba(245,245,240,0.06)] px-6 lg:px-24 py-16 lg:py-24"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-10">
          {/* Heading */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[4px] uppercase">
              Escríbenos
            </p>
            <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-3xl lg:text-4xl">
              ¿Tienes alguna pregunta?
            </h3>
            <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm font-light leading-relaxed">
              Completa el formulario y te responderemos a la brevedad.
            </p>
          </motion.div>

          {/* Form */}
          <FormularioContacto />
        </div>
      </motion.div>
    </section>
  );
}
