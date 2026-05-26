"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { BUSINESS, SERVICES } from "@/lib/data";

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
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState(SERVICES[0]?.title || "");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Format date beautifully if possible
    let formattedDate = fecha;
    if (fecha) {
      const parts = fecha.split("-");
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    // Google Sheets integration payload via serverless API proxy
    try {
      await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Fecha_Registro: new Date().toLocaleString("es-CO"),
          Nombre: nombre,
          Celular: telefono,
          Servicio: servicio,
          Barbero: barberName,
          Fecha: formattedDate || "A convenir",
          Hora: hora || "A convenir",
          Origen: "Perfil_Barbero_QR"
        })
      });
    } catch (error) {
      console.error("Error al registrar en Google Sheets:", error);
    }

    // Build the WhatsApp message
    const message = `¡Hola ${barberName}! Me gustaría hacer una Reserva Express directamente desde tu perfil:
*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Servicio:* ${servicio}
*Fecha:* ${formattedDate || "A convenir"}
*Hora:* ${hora || "A convenir"}

¿Tienes disponibilidad en este espacio? ¡Muchas gracias!`;

    const targetPhone = barberPhone || BUSINESS.whatsapp;
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsLoading(false);
      setIsOpen(false);
      // Reset fields
      setNombre("");
      setTelefono("");
      setFecha("");
      setHora("");
    }, 800);
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-[family-name:var(--font-montserrat)] text-sm appearance-none";

  // Get current date in YYYY-MM-DD format to prevent selecting past days
  const todayStr = new Date().toISOString().split("T")[0];

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
                className="relative w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                {/* Gold Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <h2 className="text-2xl font-bold text-[#D4AF37] mb-1">
                  Reserva Express
                </h2>
                <p className="text-gray-400 mb-6 text-sm">
                  Agenda tu cita directamente con <strong>{barberName}</strong>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-1.5 ml-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      className={inputClass}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-1.5 ml-1">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Ej. +57 300 123 4567"
                      className={inputClass}
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>

                  {/* Servicio */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-1.5 ml-1">
                      Servicio
                    </label>
                    <div className="relative">
                      <select
                        required
                        className={`${inputClass} pr-10`}
                        value={servicio}
                        onChange={(e) => setServicio(e.target.value)}
                      >
                        {SERVICES.map((s) => (
                          <option key={s.title} value={s.title} className="bg-[#121212] text-white">
                            {s.title}
                          </option>
                        ))}
                        <option value="Otro Servicio" className="bg-[#121212] text-white">
                          Otro / No estoy seguro
                        </option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none text-xs" />
                    </div>
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-1.5 ml-1">
                      Fecha
                    </label>
                    <input
                      required
                      type="date"
                      min={todayStr}
                      className={inputClass}
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </div>

                  {/* Hora */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D4AF37] mb-1.5 ml-1">
                      Hora
                    </label>
                    <div className="relative">
                      <select
                        required
                        className={`${inputClass} pr-10`}
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                      >
                        <option value="" className="bg-[#121212] text-gray-500">
                          Selecciona una hora
                        </option>
                        <option value="08:00 AM" className="bg-[#121212] text-white">08:00 AM</option>
                        <option value="09:00 AM" className="bg-[#121212] text-white">09:00 AM</option>
                        <option value="10:00 AM" className="bg-[#121212] text-white">10:00 AM</option>
                        <option value="11:00 AM" className="bg-[#121212] text-white">11:00 AM</option>
                        <option value="12:00 PM" className="bg-[#121212] text-white">12:00 PM</option>
                        <option value="01:00 PM" className="bg-[#121212] text-white">01:00 PM</option>
                        <option value="02:00 PM" className="bg-[#121212] text-white">02:00 PM</option>
                        <option value="03:00 PM" className="bg-[#121212] text-white">03:00 PM</option>
                        <option value="04:00 PM" className="bg-[#121212] text-white">04:00 PM</option>
                        <option value="05:00 PM" className="bg-[#121212] text-white">05:00 PM</option>
                        <option value="06:00 PM" className="bg-[#121212] text-white">06:00 PM</option>
                        <option value="07:00 PM" className="bg-[#121212] text-white">07:00 PM</option>
                        <option value="08:00 PM" className="bg-[#121212] text-white">08:00 PM</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none text-xs" />
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-xl mt-6 relative overflow-hidden"
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
