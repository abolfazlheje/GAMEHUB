# MOLTOL — System Architecture

## 1. Product shape

MOLTOL uses a **hybrid architecture**:

1. A conventional, fast, accessible dashboard for orientation, account controls, search, settings, and status.
2. Immersive 3D world experiences entered through portals from the dashboard.
3. A shared application shell so navigation, accessibility, and system state remain consistent across both modes.

The 4D design language means 3D environments that evolve over time and react to user input. It does not claim a literal fourth spatial dimension.

## 2. Technology decisions

| Area | Choice | Responsibility |
|---|---|---|
| Web framework | Next.js App Router | Routing, server rendering, API boundaries |
| Language | TypeScript | Typed application contracts |
| UI | React | Dashboard and interactive controls |
| 3D | Three.js | Scenes, cameras, shaders, post-processing |
| Animation | CSS first; GSAP when justified | UI and scene transitions |
| Workspace | pnpm monorepo | Shared packages and app boundaries |
| Testing | Vitest + Playwright (planned) | Unit and end-to-end coverage |

## 3. Runtime layers

- **Experience shell:** layout, navigation, command palette, responsive behavior.
- **World registry:** metadata, access requirements, loading strategy, fallback route.
- **3D engine:** renderer lifecycle, scene graph, camera, lighting, asset loading, disposal.
- **Interaction system:** pointer, keyboard, touch, focus, reduced-motion support.
- **Temporal state:** world clock, environment transitions, event sequencing.
- **AI boundary:** provider-neutral server adapter; provider credentials remain server-only.
- **Persistence:** user preferences and progress behind authenticated server APIs.
- **Observability:** error reporting, performance metrics, and privacy-aware event telemetry.

## 4. World lifecycle

1. Resolve the world identifier and metadata.
2. Check whether the world is public, discoverable, or permission-gated.
3. Load the lightweight shell and show a meaningful loading state.
4. Dynamically load 3D assets only when needed.
5. Initialize scene, controls, and event subscriptions.
6. Dispose GPU resources and listeners on exit.
7. Preserve only explicitly persisted state.

## 5. Performance principles

- Lazy-load Three.js and world-specific assets.
- Prefer compressed textures and glTF assets.
- Cap device pixel ratio on mobile.
- Pause rendering when a scene is hidden or the tab is inactive.
- Respect `prefers-reduced-motion` and provide a non-3D route.
- Avoid loading all worlds at initial page load.
- Set measurable budgets for LCP, INP, memory, and scene frame time before launch.

## 6. Accessibility

All essential navigation must work without 3D, with keyboard and screen readers. Motion must be optional where practical. Color is never the only status signal. Provide loading, error, and empty states.

## 7. Proposed package boundaries

- `@moltol/3d-engine`: renderer and reusable scene primitives.
- `@moltol/world-system`: world metadata, lifecycle, portal transitions.
- `@moltol/design-system`: tokens and accessible UI primitives.
- `@moltol/ai-core`: provider-agnostic server integration.
- `@moltol/audio-engine`: audio context and reactive visual signals.
- `@moltol/auth`: session and authorization interfaces.
- `@moltol/shared`: common types and validation schemas.

These packages are architectural targets; they should be extracted as real code only when there is a stable shared API.
