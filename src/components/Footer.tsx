"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/data";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Barberos", href: "#barberos" },
    { label: "Quiénes Somos", href: "#quienes-somos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer
      className="bg-[#1a1a1a] border-t border-[rgba(197,160,89,0.2)]"
      aria-label="Pie de página"
    >
      <motion.div
        className="section-container py-12 lg:py-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-3 gap-12 pb-10 border-b border-[rgba(197,160,89,0.1)]">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-3 group w-fit"
              aria-label={`${BUSINESS.name} — volver al inicio`}
            >
              <i
                className="fa-solid fa-scissors text-[#c5a059] text-xl transition-transform duration-300 group-hover:rotate-12"
                aria-hidden="true"
              />
              <span className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl tracking-[2px] uppercase">
                {BUSINESS.name}
              </span>
            </a>
            <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm font-light leading-relaxed max-w-xs">
              La barbería de lujo en Recoleta, Buenos Aires. Tradición,
              distinción y excelencia en cada visita.
            </p>
          </motion.div>

          {/* Nav column */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[2.8px] uppercase">
              Navegación
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm hover:text-[#c5a059] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[2.8px] uppercase">
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm font-light">
                {BUSINESS.addressLine1}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm font-light">
                {BUSINESS.addressLine2}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm font-light mt-2">
                {BUSINESS.phone}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.6)] text-sm font-light">
                {BUSINESS.email}
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                id="footer-instagram"
                className="flex w-10 h-10 items-center justify-center rounded-full border border-[#3d2b1f] text-[rgba(245,245,240,0.6)] hover:text-[#c5a059] hover:border-[rgba(197,160,89,0.4)] transition-all duration-200"
              >
                <i
                  className="fa-brands fa-instagram text-base"
                  aria-hidden="true"
                />
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                id="footer-facebook"
                className="flex w-10 h-10 items-center justify-center rounded-full border border-[#3d2b1f] text-[rgba(245,245,240,0.6)] hover:text-[#c5a059] hover:border-[rgba(197,160,89,0.4)] transition-all duration-200"
              >
                <i
                  className="fa-brands fa-facebook text-base"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                id="footer-whatsapp"
                className="flex w-10 h-10 items-center justify-center rounded-full border border-[#3d2b1f] text-[rgba(245,245,240,0.6)] hover:text-[#25D366] hover:border-[rgba(37,211,102,0.4)] transition-all duration-200"
              >
                <i
                  className="fa-brands fa-whatsapp text-base"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-2"
            aria-label={`${BUSINESS.name} — volver al inicio`}
          >
            <i
              className="fa-solid fa-scissors text-[#c5a059] text-xl"
              aria-hidden="true"
            />
            <span className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl tracking-[2px] uppercase">
              {BUSINESS.name}
            </span>
          </a>
          <div className="flex items-center gap-8">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[rgba(245,245,240,0.6)] hover:text-[#c5a059] transition-colors text-xl"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[rgba(245,245,240,0.6)] hover:text-[#c5a059] transition-colors text-xl"
            >
              <i className="fa-brands fa-facebook" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-[rgba(245,245,240,0.6)] hover:text-[#25D366] transition-colors text-xl"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(197,160,89,0.3)] to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 lg:mt-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.3)] text-[10px] tracking-[2px] uppercase text-center lg:text-left">
            © {currentYear} {BUSINESS.name}. Todos los derechos reservados.
          </p>
          <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.3)] text-[10px] tracking-[1.5px] uppercase">
            Medellín · Colombia
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
