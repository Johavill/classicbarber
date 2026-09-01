/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://classicbarberia.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async (config) => {
    const result = [];
    // Agregamos las anclas principales al sitemap
    const sections = ['#servicios', '#nuestros-barberos', '#portafolio', '#contacto'];
    for (const section of sections) {
      result.push({
        loc: `${config.siteUrl}/${section}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }
    return result;
  },
}
