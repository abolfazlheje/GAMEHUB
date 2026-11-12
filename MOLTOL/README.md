# MOLTOL

> **You Are Not Browsing. You Are Entering.**

MOLTOL is an experimental, hybrid digital universe: a polished control dashboard connected to immersive 3D worlds, time-based experiences, creative tools, and discoverable secret spaces.

## Product direction

- **Architecture:** Hybrid dashboard + immersive 3D worlds
- **Access model:** Secret/discovery-oriented experiences, with real authorization enforced server-side when private data is introduced
- **Priority:** All — visual quality, interaction, product capabilities, performance, accessibility, and maintainability

## Workspace

This repository is a pnpm monorepo.

- `apps/web` — Next.js web experience
- `packages/3d-engine` — shared 3D runtime (planned)
- `packages/world-system` — world registry and transitions (planned)
- `packages/design-system` — shared visual primitives (planned)
- `packages/ai-core` — provider-agnostic AI integration boundary (planned)
- `packages/audio-engine` — audio and reactive motion (planned)
- `packages/auth` — authentication and authorization boundary (planned)
- `packages/shared` — shared types and utilities (planned)
- `docs/` — architecture, world catalogue, security, and roadmap

## Getting started

Requirements: Node.js 20.9+ and pnpm 9+.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Next.js (normally http://localhost:3000).

## Important security note

Secret zones in the starter are discovery-oriented UI, not a security boundary. Do not put API keys, private content, or authorization decisions in client-side code. Enforce authentication and permissions in server routes/actions before connecting private data.

## Project status

This is the initial foundation and product architecture. The dashboard shell is implemented; dedicated 3D worlds, real authentication, persistence, and AI provider integrations are staged in the roadmap.
