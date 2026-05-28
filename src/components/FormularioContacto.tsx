"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SERVICES, BARBERS, BUSINESS } from "@/lib/data";

interface FormularioContactoProps {
  onSuccess?: () => void;
}

export default function FormularioContacto({ onSuccess }: FormularioContactoProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState(SERVICES[0]?.title || "");
  const [barberoId, setBarberoId] = useState<string>("cualquiera");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find selected barber details
    const selectedBarber = BARBERS.find((b) => b.id.toString() === barberoId);
    
    // Choose destination phone: selected barber's phone or business main whatsapp
    const destPhone = selectedBarber?.phone || BUSINESS.whatsapp;
    const barberoName = selectedBarber ? selectedBarber.name : "Cualquiera (Asignación automática)";

    // Format date beautifully if possible
    let formattedDate = fecha;
    if (fecha) {
      const parts = fecha.split("-");
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    // Build the WhatsApp message
    const message = `¡Hola! Me gustaría hacer una Reserva Express:
*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Servicio:* ${servicio}
*Barbero:* ${barberoName}
*Fecha:* ${formattedDate || "A convenir"}
*Hora:* ${hora || "A convenir"}

¿Tienen disponibilidad en este espacio? ¡Muchas gracias!`;

    // Google Sheets integration payload via internal API proxy
    try {
      fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Fecha_Registro: new Date().toLocaleString("es-CO"),
          Nombre: nombre,
          Celular: telefono,
          Servicio: servicio,
          Barbero: barberoName,
          Fecha: formattedDate || "A convenir",
          Hora: hora || "A convenir",
          Origen: "Sitio_Web_Principal"
        })
      });
    } catch (error) {
      console.error("Error al registrar en Google Sheets:", error);
    }

    const whatsappUrl = `https://wa.me/${destPhone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);

    // Trigger onSuccess callback if provided
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }

    // Reset success message after 5 seconds (safe cleanup)
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const inputClass =
    "w-full bg-[rgba(61,43,31,0.2)] border border-[rgba(197,160,89,0.2)] rounded-sm px-5 py-4 text-[#f5f5f0] placeholder-[rgba(245,245,240,0.3)] font-[family-name:var(--font-montserrat)] text-sm focus:outline-none focus:border-[rgba(197,160,89,0.6)] focus:bg-[rgba(61,43,31,0.3)] transition-all duration-200 appearance-none";

  // Get current date in YYYY-MM-DD format to prevent selecting past days
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Nombre y Teléfono (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nombre"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Tu Nombre Completo
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: Juan Carlos Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="telefono"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Teléfono / WhatsApp
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="Ej: +57 300 123 4567"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Servicio y Barbero (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="servicio"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Servicio Deseado
            </label>
            <div className="relative">
              <select
                id="servicio"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className={`${inputClass} pr-10`}
                required
              >
                {SERVICES.map((s) => (
                  <option key={s.title} value={s.title} className="bg-[#1a1a1a] text-[#f5f5f0]">
                    {s.title}
                  </option>
                ))}
                <option value="Otro Servicio" className="bg-[#1a1a1a] text-[#f5f5f0]">
                  Otro / No estoy seguro
                </option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(197,160,89,0.6)] pointer-events-none text-xs" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="barbero"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Barbero Preferido
            </label>
            <div className="relative">
              <select
                id="barbero"
                value={barberoId}
                onChange={(e) => setBarberoId(e.target.value)}
                className={`${inputClass} pr-10`}
              >
                <option value="cualquiera" className="bg-[#1a1a1a] text-[#f5f5f0]">
                  Cualquiera (Asignación automática)
                </option>
                {BARBERS.map((b) => (
                  <option key={b.id} value={b.id.toString()} className="bg-[#1a1a1a] text-[#f5f5f0]">
                    {b.name} ({b.title})
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(197,160,89,0.6)] pointer-events-none text-xs" />
            </div>
          </div>
        </div>

        {/* Fecha y Hora (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fecha"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Fecha Tentativa
            </label>
            <input
              id="fecha"
              type="date"
              min={todayStr}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="hora"
              className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
            >
              Hora de Preferencia
            </label>
            <div className="relative">
              <select
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className={`${inputClass} pr-10`}
                required
              >
                <option value="" className="bg-[#1a1a1a] text-[rgba(245,245,240,0.3)]">
                  Selecciona una hora
                </option>
                <option value="08:00 AM" className="bg-[#1a1a1a] text-[#f5f5f0]">08:00 AM</option>
                <option value="09:00 AM" className="bg-[#1a1a1a] text-[#f5f5f0]">09:00 AM</option>
                <option value="10:00 AM" className="bg-[#1a1a1a] text-[#f5f5f0]">10:00 AM</option>
                <option value="11:00 AM" className="bg-[#1a1a1a] text-[#f5f5f0]">11:00 AM</option>
                <option value="12:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">12:00 PM</option>
                <option value="01:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">01:00 PM</option>
                <option value="02:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">02:00 PM</option>
                <option value="03:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">03:00 PM</option>
                <option value="04:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">04:00 PM</option>
                <option value="05:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">05:00 PM</option>
                <option value="06:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">06:00 PM</option>
                <option value="07:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">07:00 PM</option>
                <option value="08:00 PM" className="bg-[#1a1a1a] text-[#f5f5f0]">08:00 PM</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(197,160,89,0.6)] pointer-events-none text-xs" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-3 py-4 px-8 bg-[#c5a059] rounded-sm text-[#1a1a1a] font-[family-name:var(--font-montserrat)] font-bold text-sm tracking-[2.8px] uppercase hover:bg-[rgba(197,160,89,0.9)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] mt-2"
        >
          <span>Reservar por WhatsApp</span>
          <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true" />
        </button>

        {/* Success Feedback Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 font-[family-name:var(--font-montserrat)] text-sm p-4 bg-[rgba(34,197,94,0.1)] rounded border border-green-500/20"
            role="alert"
          >
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            <div>
              <p className="font-semibold">¡Redirigiendo a WhatsApp!</p>
              <p className="text-xs text-[rgba(245,245,240,0.7)] mt-0.5">
                Se ha abierto una nueva pestaña. Envía el mensaje pre-armado para agendar tu turno.
              </p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
