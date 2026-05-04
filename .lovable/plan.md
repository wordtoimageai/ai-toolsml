# Add GA4 User-ID Tracking on Auth State Change

Single file change to `src/hooks/useAuth.ts` — sends the Supabase user UUID to GA4 as `user_id` whenever auth state changes, so GA4 can stitch sessions across devices.

## Change

In `src/hooks/useAuth.ts`:

1. Add module-scoped helpers above the `useAuth` export:
   - `GA_ID = 'G-BWC5XNH86E'` (matches existing tag in `index.html`)
   - `isProductionHost()` — returns true only for `toolsml.com` / `www.toolsml.com`, mirroring the gate in `index.html` so preview/lovable.app domains never call gtag
   - `setGtagUserId(userId, attempt)` — calls `window.gtag('config', GA_ID, { user_id })`; if `window.gtag` isn't ready yet (it loads lazily via `requestIdleCallback`), retry up to 3 times at 500ms intervals
2. Add `window.gtag` to the global Window typing (small ambient declaration in the same file) to satisfy TypeScript without touching `vite-env.d.ts`
3. Inside the hook, add a new `useEffect` with `[user?.id]` dependency:
   - On login → `setGtagUserId(user.id)`
   - On logout / no user → `setGtagUserId(null)` (sent as `undefined` to clear)

No PII is sent — only the Supabase UUID. No changes to `index.html`, no migrations, no other files.

## Why this is safe

- Hostname gate matches the analytics loader in `index.html`, so this is a no-op on preview domains.
- Retry-with-backoff handles the race where auth resolves before `requestIdleCallback` loads gtag.
- UUID-only respects the existing privacy posture (consent banner, no PII in analytics).
- `[user?.id]` dependency ensures we only fire on actual auth transitions, not on every profile/role re-render.

## Files

- `src/hooks/useAuth.ts` — add helpers + one `useEffect` (~25 lines)

## Post-deploy

After Publish, mark **GA4 → Admin → Tasks → Add first-party data → Set up User-ID** as complete (7/15).
