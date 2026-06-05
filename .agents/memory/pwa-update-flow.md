---
name: PWA offline update flow
description: How the service worker update/notify flow works in the Nova app.
---

# PWA Offline Update Flow

**Rule:** The SW does NOT call `self.skipWaiting()` automatically on install. It waits for a user-initiated trigger.

**Why:** Auto-skipping would reload the page mid-use, losing the user's chat context.

**How it works:**
1. New SW installs but stays in `waiting` state.
2. `useServiceWorkerUpdate` hook (in `src/hooks/useServiceWorkerUpdate.ts`) detects this via `updatefound` + `statechange` on the `installing` worker.
3. When `waiting` SW is detected, `PwaUpdateBanner` (rendered inside `MainAppInner` in `App.tsx`) fires a persistent toast: "Доступно обновление Nova" with an "Обновить" button.
4. Clicking "Обновить" posts `{ type: "skip-waiting" }` to the waiting SW, which triggers `skipWaiting()`, then reloads the page.
5. The `message` handler in `sw.js` handles both `skip-waiting` and `show-notification` types.
