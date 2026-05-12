"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { PRODUCTS, BUSINESS } from "@/lib/data";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Productos() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="productos"
      className="bg-[#1a1a1a] py-20 lg:py-32 overflow-hidden border-t border-[rgba(245,245,240,0.05)]"
      aria-labelledby="productos-heading"
    >
      <div className="section-container">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeInUp}
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[4px] uppercase mb-4"
            >
              Exclusividad en Casa
            </motion.p>
            <motion.h2
              id="productos-heading"
              variants={fadeInUp}
              className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-4xl lg:text-6xl leading-tight"
            >
              Boutique de <span className="text-[#c5a059] italic">Caballeros</span>
            </motion.h2>
          </motion.div>

          {/* Desktop Controls */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="hidden md:flex items-center gap-4"
          >
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-[rgba(197,160,89,0.3)] flex items-center justify-center text-[#c5a059] hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300"
              aria-label="Anterior producto"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-[rgba(197,160,89,0.3)] flex items-center justify-center text-[#c5a059] hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300"
              aria-label="Siguiente producto"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div
            ref={containerRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hidden items-stretch"
          >
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ ...VIEWPORT, once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[280px] md:min-w-[340px] snap-start flex flex-col group/card"
              >
                {/* Product Image Card */}
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[rgba(61,43,31,0.5)] bg-[rgba(61,43,31,0.2)] mb-6 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={idx === 0}
                    className="object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 280px, 340px"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1a1a1a]/80 backdrop-blur-md rounded border border-[rgba(197,160,89,0.3)]">
                    <span className="text-[#c5a059] text-[10px] font-[family-name:var(--font-montserrat)] tracking-[2px] uppercase">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Info Container - Fixed height through flex-1 */}
                <div className="flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-xl lg:text-2xl leading-tight">
                      {product.name}
                    </h3>
                    <span className="font-[family-name:var(--font-montserrat)] text-[#c5a059] font-semibold whitespace-nowrap pt-1">
                      {product.price}
                    </span>
                  </div>
                  
                  {/* Description - flex-1 pushes the button to the bottom */}
                  <p className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm font-light leading-relaxed flex-1">
                    {product.description}
                  </p>
                  
                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hola! Me interesa el producto: ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 py-4 border border-[rgba(197,160,89,0.4)] rounded-sm text-[#c5a059] font-[family-name:var(--font-montserrat)] text-xs tracking-[2px] uppercase hover:bg-[#c5a059] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <span>Consultar</span>
                    <i className="fa-brands fa-whatsapp text-sm" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(197,160,89,0.1)]">
            <motion.div
              className="h-full bg-[#c5a059]"
              style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
