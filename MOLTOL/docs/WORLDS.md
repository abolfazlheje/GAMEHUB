# MOLTOL — World Catalogue

The dashboard is the stable navigation layer. Worlds are independently loadable experiences with shared identity, access, and lifecycle contracts.

| ID | World | Purpose | Initial state |
|---|---|---|---|
| void | THE VOID | Entry point and orientation | Foundation |
| multiverse | MULTIVERSE | Discover connected spaces | Planned |
| dream-engine | DREAM ENGINE | Generative environments | Planned |
| time-machine | TIME MACHINE | Time-based exploration | Planned |
| ai-consciousness | AI CONSCIOUSNESS | Conversational intelligence | Planned |
| portal-network | PORTAL NETWORK | World discovery and transitions | Planned |
| infinite-gallery | INFINITE GALLERY | Curated visual collections | Planned |
| digital-lab | DIGITAL LAB | Experiments and interactive demos | Planned |
| sound-dimension | SOUND DIMENSION | Audio-reactive environments | Planned |
| reality-glitch | REALITY GLITCH | Rule-bending visual experiments | Planned |
| space-explorer | SPACE EXPLORER | Scale and astronomy experiences | Planned |
| quantum-room | QUANTUM ROOM | Abstract probability-inspired interactions | Planned |
| creative-studio | CREATIVE STUDIO | User-created artifacts | Planned |
| secret-zones | SECRET ZONES | Discoverable and permission-gated content | Planned |
| live-universe | LIVE UNIVERSE | Shared live events | Planned |
| digital-archive | DIGITAL ARCHIVE | Saved artifacts and history | Planned |
| profile-dimension | PROFILE DIMENSION | Personal identity and preferences | Planned |
| community | COMMUNITY | Shared spaces and collaboration | Planned |
| achievements | ACHIEVEMENTS | Progress and discovery records | Planned |
| beyond | BEYOND | Future experimental experiences | Planned |

## World contract

Every world should declare:

- stable `id` and human-readable title
- short description and visual identity
- route and loading component
- access classification
- required capabilities (WebGL, audio, network)
- fallback experience
- lifecycle hooks for enter, suspend, resume, and exit

## Access classifications

- **public:** available without an account.
- **discoverable:** hidden in the interface until a discovery condition is met; not confidential.
- **authenticated:** requires a valid signed-in session.
- **permissioned:** requires a server-verified role or entitlement.

Never use an obscure URL, client-side flag, or hidden button as authorization.
