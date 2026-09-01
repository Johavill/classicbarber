"use client";

import { useState, useRef, useEffect } from "react";
import { getActivePromos, Promo } from "@/config/promos";

export default function NuestrosBarberos() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [promos, setPromos] = useState<Promo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videoUrl = "https://res.cloudinary.com/dazruxlue/video/upload/v1787865494/classic_barberia_spectacular_FINAL_adeadg.mp4";
  const posterUrl = "https://res.cloudinary.com/dazruxlue/video/upload/v1787865494/classic_barberia_spectacular_FINAL_adeadg.jpg";

  useEffect(() => {
    // Only run on client
    const active = getActivePromos();
    const featured = active.filter(p => ["promo-ruleta", "promo-hora-feliz", "promo-maraton"].includes(p.id));
    setPromos(featured);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile && isVisible && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isMobile, isVisible]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
    }
  };

  return (
    <section ref={sectionRef} id="nuestros-barberos" className="py-20 bg-[#111] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Nuestros <span className="text-[#d4af37]">Barberos</span> & Promos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Conoce al equipo de expertos que transformará tu estilo y descubre nuestras mejores ofertas del mes.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-8">
          
          {/* Columna Izquierda: Video */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="relative rounded-[2rem] p-2 bg-gradient-to-b from-[#333] via-[#1a1a1a] to-[#0a0a0a] shadow-2xl shadow-black/80 w-full max-w-[350px] aspect-[9/16] overflow-hidden border border-[#d4af37]/30 ring-1 ring-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10 rounded-[1.8rem]"></div>
              
              {isVisible ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  poster={posterUrl}
                  playsInline
                  loop
                  muted={isMuted}
                  className="w-full h-full object-cover rounded-[1.8rem] bg-black"
                  onClick={isMobile ? togglePlay : undefined}
                />
              ) : (
                <div className="w-full h-full bg-[#1a1a1a] rounded-[1.8rem] animate-pulse"></div>
              )}

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 pointer-events-none">
                <div className="mb-4 text-white drop-shadow-md">
                  <h3 className="font-playfair font-bold text-xl mb-1">Classic Barbería</h3>
                  <p className="text-sm text-gray-200">Medellín, Laureles</p>
                </div>
                <div className="flex items-center justify-between pointer-events-auto">
                  <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-[#d4af37]/80 hover:text-black transition-all">
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg ml-${isPlaying ? '0' : '1'}`}></i>
                  </button>
                  {!isMobile && (
                    <button onClick={toggleMute} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                      <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
                    </button>
                  )}
                </div>
              </div>
              
              {isMobile && !isPlaying && isVisible && (
                <button onClick={togglePlay} className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center rounded-full bg-[#d4af37]/90 text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] z-30 transition-transform transform hover:scale-110 pointer-events-auto">
                  <i className="fa-solid fa-play text-3xl ml-2"></i>
                </button>
              )}
            </div>
          </div>

          {/* Columna Derecha: Promociones */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {promos.map((promo) => (
              <div key={promo.id} className="bg-gradient-to-r from-[#1a1a1a] to-[#222] border border-[#d4af37]/20 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-[#d4af37] transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white font-playfair">{promo.titulo}</h3>
                    {promo.subtitulo && (
                      <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs px-2 py-1 rounded font-semibold tracking-wider w-fit">
                        {promo.subtitulo}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{promo.descripcion}</p>
                  
                  <div className="flex items-center justify-between mt-4 border-t border-[#333] pt-4">
                    {promo.precioPromo && (
                      <span className="text-[#d4af37] font-bold text-lg">{promo.precioPromo}</span>
                    )}
                    <a
                      href={promo.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center text-sm font-semibold text-black bg-[#d4af37] px-4 py-2 rounded hover:bg-[#f3d05e] transition-colors"
                    >
                      <i className="fa-brands fa-whatsapp mr-2"></i>
                      {promo.ctaTexto}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

