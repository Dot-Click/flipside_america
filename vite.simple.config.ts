// Plain Vite + React: the dev server (`dev`) and the static production build
// (`build:static`, which is what Vercel runs).
//
// `dev:vinext` / `build` drive vinext with the Cloudflare plugin, which boots a
// workerd runtime and emits a Worker bundle — the right target for Cloudflare,
// but not something a static host can serve, and heavy for local work. Nothing on
// this page needs it: app/page.tsx is a single client component with no server
// components, data loading, or bindings, and the contact form is a mailto link.
//
// So this config builds and serves that same component as a plain static site —
// same source, same CSS, same assets, no Worker runtime.

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
  // `root` is dev-vite/, so point the output back at the project root. Kept
  // separate from vinext's dist/ so the two builds never collide.
  build: {
    outDir: fileURLToPath(new URL("./dist-static/", import.meta.url)),
    emptyOutDir: true,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
