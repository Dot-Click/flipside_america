// Entry point for the plain Vite + React dev server (see vite.simple.config.ts).
// It renders the same `app/page.tsx` the vinext build uses, so what you see here
// is the real page — only the server around it is different.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../app/globals.css";
import Home from "../app/page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
