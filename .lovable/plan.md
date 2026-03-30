

## Plan: Fix Edge Function Build Errors

### Summary
Fix 4 TypeScript errors across 4 edge functions — 3 are `unknown` error type narrowing issues, 1 is a `Uint8Array` response body type mismatch.

### Changes

**1. Fix `error` type narrowing (3 files)**

In each catch block, replace `error.message` with `(error as Error).message`:

- `supabase/functions/generate-sitemap/index.ts` line ~310
- `supabase/functions/prerender-middleware/index.ts` line ~197
- `supabase/functions/sitemap/index.ts` line ~498

**2. Fix `Uint8Array` response body (`og-image/index.ts` line ~259)**

Change:
```ts
return new Response(pngData, { ... })
```
To:
```ts
return new Response(pngData as unknown as BodyInit, { ... })
```
Or use `pngData.buffer` if the runtime supports `ArrayBuffer` as `BodyInit`.

### Impact
- No functional changes — purely type-safety fixes
- Unblocks the build pipeline

