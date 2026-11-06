# NOVA Academy

A Persian, right-to-left online learning platform built with Next.js, TypeScript and Supabase.

## Current foundation
- Responsive Persian RTL landing page
- Course discovery starter UI
- Supabase browser/server client helpers
- Initial PostgreSQL schema with row-level security
- Environment variable template

## Local development
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
4. Apply `supabase/schema.sql` in the Supabase SQL editor.
5. Run `npm run dev`.

## Important security notes
- Never commit real credentials or service-role keys.
- Payment orders must only be marked paid after server-side verification with the payment provider.
- Live payment activation requires an eligible, verified merchant account and provider credentials. Until then, use a clearly labeled test mode.
- Admin authorization must be enforced server-side; never trust a role supplied by the browser.

## Project status
Foundation in progress. Authentication flows, student dashboard, course management, payment integration, tests and deployment configuration are not yet complete.
