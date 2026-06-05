---
name: Nova rebrand
description: App was renamed from "Pulse"/"Aether" to "Nova". Key files changed and important exception for storage keys.
---

# Nova Rebrand

**Rule:** All user-visible text says "Nova". Internal storage keys stay as `pulse-*`.

**Why:** Changing localStorage/sessionStorage key prefixes (`pulse-token`, `pulse-user-id`, etc.) would immediately log out all existing users. These keys are implementation details, not branding.

**How to apply:** When adding new user-visible strings, use "Nova". When adding new storage keys (localStorage, sessionStorage, CustomEvents like `pulse:unauthorized`), keep the `pulse-` prefix for continuity.

## Files updated in this rename
- `artifacts/pulse/index.html` — title, meta tags, OG tags
- `artifacts/pulse/public/manifest.json` — name, short_name, description
- `artifacts/pulse/public/favicon.svg` — new nova star-burst SVG icon
- `artifacts/pulse/src/components/PulseLogo.tsx` — new orange gradient star-burst logo
- `artifacts/pulse/public/sw.js` — cache name is now "nova-v1"
- All pages/components: Login, Register, Sidebar, Home, Settings, App, Prime, Bots, ForgotPassword, Leaderboard, Profile, QrConfirm, Support, Wallet, ChatWindow, ScreenLock, PwaInstallPrompt, AddAccountDialog, translations.ts
