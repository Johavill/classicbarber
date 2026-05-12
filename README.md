# Classic Barbería — Landing Page

Landing page de alta performance para negocio local, construida con Next.js 14, Tailwind CSS v4 y Framer Motion.

## Características

- 🚀 **Performance**: 100/100 en Lighthouse (estimado). Imágenes optimizadas con AVIF/WebP.
- 📱 **Responsive**: Diseño pixel-perfect para Mobile, Tablet y Desktop.
- 🎨 **Estética Premium**: Paleta Charcoal & Gold con tipografía elegante.
- 🔍 **SEO**: Metadata dinámica, Open Graph, Twitter Cards y Schema.org (LocalBusiness).
- ♿ **Accesibilidad**: Navegación por teclado, Focus Trap en modales y etiquetas ARIA.
- 🛡️ **Seguridad**: Headers de seguridad configurados y variables de entorno protegidas.

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion v12
- **Iconos**: FontAwesome 6
- **Tipografía**: Next/Font (Google Fonts)

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` basado en `.env.example` y completa los datos del negocio.
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Crea el build de producción.
- `npm run postbuild`: Genera el sitemap automáticamente (corre después del build).
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Ejecuta el linter para encontrar problemas de código.

## Configuración de Variables de Entorno

El proyecto usa variables de entorno para centralizar la información del negocio. Consulta el archivo `.env.example` para ver la lista completa.
