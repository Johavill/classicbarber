"use client";

import { useState, useRef, useEffect } from "react";

export default function NuestrosBarberosTimer() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videoUrl =
    "https://res.cloudinary.com/dazruxlue/video/upload/v1787865494/classic_barberia_spectacular_FINAL_adeadg.mp4";
  const posterUrl =
    "https://res.cloudinary.com/dazruxlue/video/upload/v1787865494/classic_barberia_spectacular_FINAL_adeadg.jpg";

  useEffect(() => {
    // Target Date: Sept 2, 2026, end of day
    const targetDate = new Date("2026-09-02T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
      { rootMargin: "200px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile && isVisible && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
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
    <section
      ref={sectionRef}
      id="nuestros-barberos-timer"
      className="py-20 bg-[#111] relative overflow-hidden"
    >
      {/* Máscara de degradado superior */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>
      {/* Máscara de degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>

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
            Conoce al equipo de expertos que transformará tu estilo y prepárate
            para nuestras próximas ofertas.
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
                  <h3 className="font-playfair font-bold text-xl mb-1">
                    Classic Barbería
                  </h3>
                  <p className="text-sm text-gray-200">Medellín, Laureles</p>
                </div>
                <div className="flex items-center justify-between pointer-events-auto">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-[#d4af37]/80 hover:text-black transition-all"
                  >
                    <i
                      className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"} text-lg ml-${isPlaying ? "0" : "1"}`}
                    ></i>
                  </button>
                  {!isMobile && (
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <i
                        className={`fa-solid ${isMuted ? "fa-volume-xmark" : "fa-volume-high"}`}
                      ></i>
                    </button>
                  )}
                </div>
              </div>

              {isMobile && !isPlaying && isVisible && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center rounded-full bg-[#d4af37]/90 text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] z-30 transition-transform transform hover:scale-110 pointer-events-auto"
                >
                  <i className="fa-solid fa-play text-3xl ml-2"></i>
                </button>
              )}
            </div>
          </div>

          {/* Columna Derecha: Countdown */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6 h-full justify-center ">
            <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#111] border-2 border-[#d4af37] rounded-3xl p-8 lg:p-12 shadow-[0_0_80px_rgba(212,175,55,0.4)] overflow-hidden text-center group">
              {/* Overlay brillante festivo */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#d4af37]/5 to-[#d4af37]/10 pointer-events-none"></div>

              {/* Globos de fondo (oro y plata) con textos */}
              <div className="absolute inset-0 pointer-events-none opacity-80 z-0">
                {/* Globo 1: Oro */}
                <div className="absolute top-[-30px] left-[5%] w-24 h-28 bg-gradient-to-b from-[#f3d05e] to-[#aa8c2c] rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center animate-[bounce_3s_ease-in-out_infinite]">
                  <span className="text-[#333] font-bold text-xs rotate-[-15deg] font-playfair tracking-wider">
                    AMOR
                  </span>
                  <div className="absolute bottom-[-20px] w-[2px] h-20 bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>

                {/* Globo 2: Plata */}
                <div className="absolute top-[10%] right-[5%] w-20 h-24 bg-gradient-to-b from-[#e0e0e0] to-[#606060] rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite_0.5s]">
                  <span className="text-[#111] font-bold text-[10px] rotate-[10deg] font-playfair tracking-wider">
                    AMISTAD
                  </span>
                  <div className="absolute bottom-[-15px] w-[2px] h-24 bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>

                {/* Globo 3: Plata */}
                <div className="absolute bottom-[25%] left-[8%] w-16 h-20 bg-gradient-to-b from-[#e0e0e0] to-[#606060] rounded-[50%] shadow-lg animate-[bounce_3.5s_ease-in-out_infinite_1s]">
                  <div className="absolute bottom-[-10px] left-[50%] w-[1.5px] h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>

                {/* Globo 4: Oro gigante */}
                <div className="absolute bottom-[-10%] right-[10%] w-32 h-40 bg-gradient-to-b from-[#f3d05e] to-[#aa8c2c] rounded-[50%] shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center animate-[bounce_5s_ease-in-out_infinite_0.2s]">
                  <span className="text-[#333] font-bold text-sm rotate-[-5deg] font-playfair tracking-widest text-center leading-tight mt-4">
                    MES DEL
                    <br />
                    AMOR
                  </span>
                  <div className="absolute bottom-[-30px] left-[50%] w-[2.5px] h-24 bg-gradient-to-b from-white/50 to-transparent"></div>
                </div>

                {/* Destellos dorados esparcidos */}
                <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#d4af37,0_0_20px_#d4af37] animate-pulse"></div>
                <div className="absolute top-[60%] right-[25%] w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#c0c0c0,0_0_25px_#c0c0c0] animate-pulse delay-75"></div>
                <div className="absolute bottom-[15%] left-[40%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#d4af37,0_0_20px_#d4af37] animate-pulse delay-150"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 backdrop-blur-sm">
                  <span className="text-[#d4af37] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                    <i className="fa-solid fa-heart text-red-500"></i>
                    Especial Amor y Amistad
                    <i className="fa-solid fa-heart text-red-500"></i>
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  Promociones de septiembre, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#d4af37] animate-pulse">
                    ¡espéralas pronto!
                  </span>
                </h3>

                <p className="text-gray-300 text-xl mb-10 font-light drop-shadow-md max-w-lg mx-auto">
                  Prepárate para sorpresas exclusivas. El mes más romántico y
                  especial del año trae descuentos increíbles.
                </p>

                <div className="flex justify-center gap-3 md:gap-6">
                  {[
                    {
                      label: "Días",
                      value: timeLeft.days,
                      color: "text-[#d4af37]",
                    },
                    {
                      label: "Horas",
                      value: timeLeft.hours,
                      color: "text-white",
                    },
                    {
                      label: "Minutos",
                      value: timeLeft.minutes,
                      color: "text-[#c0c0c0]",
                    },
                    {
                      label: "Segundos",
                      value: timeLeft.seconds,
                      color: "text-[#d4af37]",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group/timer"
                    >
                      <div className="w-16 h-20 md:w-24 md:h-28 bg-gradient-to-b from-[#222] to-[#000] border-2 border-[#d4af37]/40 rounded-2xl flex items-center justify-center text-3xl md:text-6xl font-bold shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] group-hover/timer:border-[#d4af37] transition-all relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent opacity-0 group-hover/timer:opacity-100 transition-opacity"></div>
                        <span
                          className={`${item.color} drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]`}
                        >
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-gray-400 text-[10px] md:text-xs mt-3 font-bold tracking-widest uppercase group-hover/timer:text-[#d4af37] transition-colors">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
