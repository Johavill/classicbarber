"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

type FormState = "idle" | "loading" | "success" | "error";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, telefono, mensaje }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setNombre("");
        setTelefono("");
        setMensaje("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[rgba(61,43,31,0.2)] border border-[rgba(197,160,89,0.2)] rounded-sm px-5 py-4 text-[#f5f5f0] placeholder-[rgba(245,245,240,0.3)] font-[family-name:var(--font-montserrat)] text-sm focus:outline-none focus:border-[rgba(197,160,89,0.6)] focus:bg-[rgba(61,43,31,0.3)] transition-all duration-200";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nombre"
            className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
          >
            Nombre Completo
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Juan Carlos Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="telefono"
            className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
          >
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            placeholder="Ej: +57 300 000 0000"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>

        {/* Mensaje */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="mensaje"
            className="font-[family-name:var(--font-montserrat)] text-[#c5a059] text-xs tracking-[1.4px] uppercase"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={4}
            placeholder="¿En qué podemos ayudarte?"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            disabled={status === "loading"}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="flex items-center justify-center gap-3 py-4 px-8 bg-[#c5a059] rounded-sm text-[#1a1a1a] font-[family-name:var(--font-montserrat)] font-bold text-sm tracking-[2.8px] uppercase hover:bg-[rgba(197,160,89,0.9)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
          aria-live="polite"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin w-4 h-4 text-[#1a1a1a]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar Mensaje</span>
              <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
            </>
          )}
        </button>

        {/* Feedback Messages */}
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 font-[family-name:var(--font-montserrat)] text-sm"
            role="alert"
          >
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            ¡Mensaje enviado! Te contactaremos pronto.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 font-[family-name:var(--font-montserrat)] text-sm"
            role="alert"
          >
            <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
            Hubo un error, escríbenos por{" "}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] underline underline-offset-2"
            >
              WhatsApp
            </a>
            .
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
