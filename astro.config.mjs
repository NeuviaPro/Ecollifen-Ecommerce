// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  // Modo estático: máxima compatibilidad con cPanel (subes solo la carpeta dist/).
  // El catálogo se genera en build con las claves Woo; el carrito vive en el
  // cliente vía Store API (src/lib/store/cart.ts).
  output: "static",

  // Dominio de producción: el sitio Astro va en la raíz y WordPress en /wp.
  site: "https://ecollifen.cl",

  // === Ruta de upgrade a SSR (solo si tu cPanel tiene "Setup Node.js App") ===
  // 1. npm install @astrojs/node
  // 2. import node from '@astrojs/node';
  // 3. añade aquí:  adapter: node({ mode: 'standalone' }),
  // 4. marca las páginas dinámicas con:  export const prerender = false;

  // Dominios cuyas imágenes remotas puede optimizar Astro (las del Hero salen de
  // WordPress). Se mantienen ambos: producción y el LocalWP de desarrollo.
  image: {
      domains: ["ecollifen.cl", "ecollifen.local"],
  },

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [preact()],
});