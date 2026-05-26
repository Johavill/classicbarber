export default function GoogleMap() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7!2d-75.5978!3d6.2476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429a94c5b9f4b%3A0x0!2sAv.+80+%2353a-10%2C+Laureles%2C+Medell%C3%ADn!5e0!3m2!1ses!2sco!4v1699000000000!5m2!1ses!2sco"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Classic Barbería — Av. 80 #53a-10, Laureles, Medellín"
      />
    </div>
  );
}
