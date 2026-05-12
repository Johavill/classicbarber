"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BUSINESS } from "@/lib/data";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after a small delay so it doesn't block LCP
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=Hola! Me gustaría obtener información sobre sus servicios.`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1a1a1a] border border-[rgba(197,160,89,0.3)] rounded-lg px-4 py-2 shadow-xl"
              >
                <p className="font-[family-name:var(--font-montserrat)] text-[#f5f5f0] text-sm whitespace-nowrap">
                  Chatea con nosotros
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            id="whatsapp-floating-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="flex w-14 h-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute w-14 h-14 rounded-full bg-[#25D366] opacity-40"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <i className="fa-brands fa-whatsapp text-white text-3xl relative z-10" aria-hidden="true" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
