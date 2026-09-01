"use client";

import { useState, useEffect } from "react";
import { getActivePromos, Promo } from "@/config/promos";

export default function PromoBanner() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const activePromos = getActivePromos();
    if (activePromos.length > 0) {
      // Pick a featured promo for the banner, e.g., the teaser or the main base promo
      const featuredPromo = activePromos.find(p => p.id === "promo-octubre-teaser") || activePromos[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPromo(featuredPromo);
    }
  }, []);

  if (!promo) return null;

  return (
    <section className="bg-[#1a1a1a] py-12 px-6 border-y border-[#d4af37]/30">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#111] to-[#222] rounded-xl border border-[#d4af37] p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              Oferta Especial
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
              {promo.titulo}
            </h2>
            {promo.subtitulo && (
              <h3 className="text-xl text-[#d4af37] font-medium mb-3">
                {promo.subtitulo}
              </h3>
            )}
            <p className="text-gray-300 text-lg mb-6 max-w-xl">
              {promo.descripcion}
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              {promo.precioPromo && (
                <div className="text-2xl font-bold text-[#d4af37]">
                  {promo.precioPromo}
                </div>
              )}
              {promo.cuposDisponibles && (
                <div className="text-sm text-gray-400">
                  <i className="fa-solid fa-fire mr-2 text-orange-500"></i>
                  Solo {promo.cuposDisponibles} cupos disponibles
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-auto">
            <a
              href={promo.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full md:w-auto text-center bg-[#d4af37] text-black font-semibold px-8 py-4 rounded-lg hover:bg-[#f3d05e] transition-colors shadow-lg hover:shadow-[#d4af37]/20"
            >
              <i className="fa-brands fa-whatsapp mr-2 text-lg"></i>
              {promo.ctaTexto}
            </a>
            {promo.fechaFin && (
              <p className="text-center text-xs text-gray-500 mt-3">
                Válido hasta el {new Date(promo.fechaFin).toLocaleDateString('es-CO')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
