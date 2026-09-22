# Flipside America — React codebase

## Run locally

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
pnpm build
```

This is a React + TypeScript project using Vinext (Next.js-compatible routing), Vite, and CSS. The original production build targets Cloudflare Workers.

## Main files

- app/page.tsx — all six sections and interactive controls
- app/globals.css — styling, blue gradients, and responsive layouts
- app/layout.tsx — page metadata and document layout
- public/media/ — original images and playable videos
- public/fonts/ — locally hosted fonts
- components/ui/ — shared UI components

The contact form prepares a message in the visitor's email application. It does not send email through a backend. No API keys are required for the current page.

This archive includes the application source, assets, lockfile, and project configuration. Dependencies, build output, caches, Git history, and local runtime state are excluded. See README.md for the underlying starter's detailed configuration.
