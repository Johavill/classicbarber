"use client";

import { useState, useEffect } from "react";
import { getActivePromos, Promo } from "@/config/promos";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [promos, setPromos] = useState<Promo[]>([]);

  useEffect(() => {
    const active = getActivePromos();
    const featured = active.filter(p => ["promo-ruleta", "promo-hora-feliz", "promo-maraton"].includes(p.id));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPromos(featured);
    
    const dismissedId = localStorage.getItem("dismissed-promo-septiembre-24");
    if (!dismissedId && featured.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleDismiss = () => {
    localStorage.setItem("dismissed-promo-septiembre-24", "true");
    setIsVisible(false);
  };

  return (
    <div className="bg-[#111] border-b border-[#d4af37] text-white text-sm py-2 px-4 relative z-40 overflow-hidden shadow-md flex items-center">
      
      <div className="flex-1 overflow-hidden whitespace-nowrap relative">
        <div className="inline-block animate-marquee w-max">
          {promos.map((promo, index) => (
            <span key={promo.id} className="mx-8 font-montserrat">
              🔥 <span className="font-bold text-[#d4af37]">{promo.titulo}</span>: {promo.descripcion}{" "}
              <a
                href={promo.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-white hover:text-[#f3d05e] transition-colors ml-2"
              >
                {promo.ctaTexto}
              </a>
              {index < promos.length - 1 && <span className="ml-8 text-[#d4af37]">|</span>}
            </span>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleDismiss}
        className="ml-4 text-gray-400 hover:text-white transition-colors p-1 bg-[#111] z-10"
        aria-label="Cerrar anuncio"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
