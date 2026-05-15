# Contexto del Proyecto: Classic Barbería

Este documento resume el estado actual, la arquitectura y los objetivos del proyecto **Classic Barbería**.

## 🚀 Descripción General
Classic Barbería es una landing page de alto rendimiento y diseño premium para un negocio local (barbería). El sitio está optimizado para conversión, velocidad y SEO, ofreciendo una experiencia de usuario fluida y estética.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (Alpha/Beta features integration)
- **Animaciones:** Framer Motion v12
- **Iconos:** FontAwesome 6
- **Tipografía:** Next/Font (Integración con Google Fonts: Inter/Bebas Neue/Montserrat)

## 📁 Estructura del Proyecto
- `app/`: Contiene la lógica de rutas, el layout principal y la página de inicio.
- `src/components/`: Biblioteca de componentes modulares y reutilizables.
- `src/lib/`: Utilidades y configuraciones compartidas.
- `public/`: Activos estáticos como imágenes (optimización AVIF/WebP) y logotipos.

## 🧱 Componentes y Secciones
1. **Header:** Navegación pegajosa con enlaces internos y diseño adaptativo.
2. **Hero:** Sección de impacto con llamado a la acción (CTA) claro.
3. **Servicios:** Catálogo de servicios ofrecidos por la barbería.
4. **Portafolio:** Galería interactiva de trabajos realizados (incluye `PortafolioModal`).
5. **Productos:** Sección dedicada a la exhibición de productos premium a la venta.
6. **Quienes Somos:** Historia y valores del negocio.
7. **Contacto:** Información de contacto, integración con Google Maps y `FormularioContacto`.
8. **Footer:** Resumen del sitio, enlaces sociales y créditos.
9. **WhatsAppButton:** Botón flotante persistente para contacto directo por WhatsApp.

## 🎨 Identidad Visual
- **Paleta de Colores:** Charcoal (Carboncillo) y Gold (Oro), transmitiendo elegancia y profesionalismo.
- **Estética:** Minimalista pero detallada, con micro-animaciones para mejorar el engagement.

## 📈 Características Técnicas Implementadas
- **SEO:** Metadata dinámica, Open Graph, Twitter Cards y Schema.org para LocalBusiness.
- **Performance:** Optimización de imágenes y carga diferida de componentes.
- **Accesibilidad:** Uso de etiquetas ARIA, Focus Trap en modales y navegación por teclado.
- **Configuración:** Uso intensivo de variables de entorno (`.env.local`) para centralizar la información del negocio (teléfonos, dirección, redes sociales).

## 📌 Estado Actual
El sitio se encuentra en una fase avanzada de desarrollo, con todas las secciones principales implementadas y funcionales. La integración de Tailwind CSS v4 permite el uso de variables CSS nativas y un sistema de diseño más robusto.
