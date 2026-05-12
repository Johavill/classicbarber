"use client";

import { useState, useEffect } from "react";
import { BUSINESS, NAV_LINKS } from "@/lib/data";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b border-[rgba(245,245,240,0.1)] transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(26,26,26,0.95)] backdrop-blur-md"
          : "bg-[rgba(26,26,26,0.90)] backdrop-blur-sm"
      }`}
    >
      <div className="section-container h-20 lg:h-24 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label={`${BUSINESS.name} — inicio`}
        >
          <i className="fa-solid fa-scissors text-[#c5a059] text-xl lg:text-2xl transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
          <span className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl lg:text-2xl tracking-[2px] uppercase">
            {BUSINESS.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-10"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.8)] text-sm tracking-[2.8px] uppercase hover:text-[#c5a059] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#c5a059] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          id="header-cta"
          className="hidden lg:flex items-center gap-3 px-6 py-3 border border-[#c5a059] rounded text-[#c5a059] font-[family-name:var(--font-montserrat)] text-sm tracking-[1.4px] uppercase hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300"
        >
          <span>Reservar Ahora</span>
          <i className="fa-solid fa-calendar-days text-sm" aria-hidden="true" />
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden flex items-center justify-center w-12 h-12 text-[#c5a059]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-2xl transition-transform duration-200`} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[rgba(26,26,26,0.98)] border-t border-[rgba(197,160,89,0.2)] px-6 py-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.8)] text-sm tracking-[2.8px] uppercase hover:text-[#c5a059] transition-colors"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="flex items-center justify-center gap-3 py-4 border border-[#c5a059] rounded text-[#c5a059] font-[family-name:var(--font-montserrat)] text-sm tracking-[1.4px] uppercase hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300"
            onClick={handleNavClick}
          >
            Reservar Ahora
          </a>
        </div>
      </div>
    </header>
  );
}
