// A plain Vite + React dev server for local work on the page.
//
// The default `dev` script runs vinext with the Cloudflare plugin, which boots a
// workerd runtime. That stack is what the site deploys to, but it is also heavy
// and, on some Windows hosts, loses a startup race against workerd and dies
// before binding a port. Nothing on this page needs it: app/page.tsx is a single
// client component with no server components, data loading, or bindings.
//
// So this config serves that same component over plain Vite — same source, same
// CSS, same assets, no Worker runtime. Use it for day-to-day UI work; use
// `npm run build` (vinext) for anything that has to match the deploy target.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL("./dev-vite/", import.meta.url)),
  // Serve the real assets: /media/*, /fonts/*, /favicon.svg, /mobile-screen.png.
  publicDir: fileURLToPath(new URL("./public/", import.meta.url)),
  resolve: {
    alias: { "@": projectRoot.replace(/[/\\]$/, "") },
  },
  // postcss.config.mjs (Tailwind) lives at the project root, not at `root`.
  css: { postcss: projectRoot },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
