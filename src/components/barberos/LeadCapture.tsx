"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { BUSINESS } from "@/lib/data";

interface LeadCaptureProps {
  barberId: string | number;
  barberName: string;
  barberPhone?: string;
}

export default function LeadCapture({
  barberId,
  barberName,
  barberPhone,
}: LeadCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", telefono: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      tenant_id: "CLASSIC_BARBER_001",
      barbero_id: barberId,
      nombre_cliente: formData.nombre,
      telefono_cliente: formData.telefono,
      source: "qr_mirror",
    };

    try {
      await fetch("https://tu-api-multitenant.com/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Lead enviado:", payload);
    } catch (error) {
      console.error("Error enviando lead:", error);
    } finally {
      // Use barber's specific phone or the general business phone
      const targetPhone = barberPhone || BUSINESS.whatsapp;
      const message = `Hola ${barberName}, me gustaría reservar una cita. Mi nombre es ${formData.nombre}.`;
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
        message
      )}`;

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 500);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 transition-transform"
      >
        RESERVAR CITA
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <FocusTrap active={isOpen}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Gold Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">
                  Casi listo
                </h2>
                <p className="text-gray-400 mb-6 text-sm">
                  Déjanos tus datos para agilizar tu cita con {barberName}.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Ej. +57 300 123 4567"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-xl mt-4 relative overflow-hidden"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-black"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        PROCESANDO...
                      </span>
                    ) : (
                      "RESERVAR POR WHATSAPP"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2 text-gray-500 text-sm hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                </form>
              </motion.div>
            </FocusTrap>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
