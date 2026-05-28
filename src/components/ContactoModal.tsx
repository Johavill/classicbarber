"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import FormularioContacto from "./FormularioContacto";

export default function ContactoModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Escuchar evento personalizado global para abrir el modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  // Bloquear el scroll del cuerpo de la página cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar al presionar la tecla Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Modal de Reserva Express"
          aria-describedby="contacto-modal-description"
        >
          {/* Backdrop con desenfoque de fondo */}
          <div
            className="absolute inset-0 bg-[rgba(26,26,26,0.94)] backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel del Modal */}
          <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
            <motion.div
              className="relative z-10 w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded border border-[rgba(197,160,89,0.3)] bg-[#111111] shadow-2xl p-6 lg:p-10 scrollbar-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Línea dorada de distinción en el tope superior */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

              {/* Botón de cerrar */}
              <button
                id="contacto-modal-close-btn"
                onClick={handleClose}
                aria-label="Cerrar modal de reserva"
                className="absolute top-5 right-5 z-20 flex w-10 h-10 items-center justify-center rounded-full border border-[rgba(197,160,89,0.3)] text-[#c5a059] hover:bg-[rgba(61,43,31,0.4)] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
              >
                <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
              </button>

              {/* Encabezado */}
              <div className="flex flex-col gap-3 mb-8 mt-4 text-center md:text-left">
                <p className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[4px] uppercase">
                  Reserva Express
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f5f0] text-3xl lg:text-4xl leading-tight">
                  Agenda tu Turno en Segundos
                </h3>
                <p
                  id="contacto-modal-description"
                  className="font-[family-name:var(--font-montserrat)] text-[rgba(245,245,240,0.5)] text-sm font-light leading-relaxed max-w-xl"
                >
                  Elige tu servicio, fecha, hora y barbero de preferencia. Te redirigiremos a WhatsApp con tu solicitud pre-armada al instante y guardaremos tu turno en nuestro sistema.
                </p>
              </div>

              {/* Formulario */}
              <FormularioContacto onSuccess={handleClose} />
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
