/**
 * Lightweight cn utility for merging Tailwind/CSS classes.
 * Bypasses dependency on clsx/tailwind-merge for simple, high-performance class joining.
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}

/**
 * Dispara un evento nativo personalizado para abrir el modal global de Reserva Express.
 */
export function openBookingModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  }
}
