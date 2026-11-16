# Metodit

Metodit is freight finance and autonomous reconciliation software for mid-market US freight brokerages.

This repository contains the Phase 1 marketing landing page and early-access waitlist foundation, aligned with the approved PRD and Metodit design baseline.

## Local development

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Waitlist setup

The form persists signups to Supabase through a server-side Next.js route. It does not report success unless Supabase confirms the request.

1. Create a Supabase project.
2. Run [supabase/migrations/202611160001_waitlist.sql](supabase/migrations/202611160001_waitlist.sql) in the Supabase SQL editor.
3. Add these environment variables to your local environment and deployment platform:

```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

4. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never prefix it with `NEXT_PUBLIC_`.
5. Deploy the Next.js app to Vercel (or another Node.js host).

The database has RLS enabled and no public policies. The API route uses the service-role key on the server, validates input, normalizes email addresses, requires explicit email-update consent, includes a honeypot field, and ignores duplicate email submissions.

## Brand system

The landing page uses the approved Metodit palette:

| Token | Value |
|---|---|
| Deep Obsidian | `#090B0E` |
| Graphite | `#11151B` |
| Steel border | `#1F2732` |
| Primary text | `#F3F4F6` |
| Muted text | `#9CA3AF` |
| Signal Emerald | `#10B981` |
| Variance Amber | `#F59E0B` |
| Duplicate / overbill Crimson | `#EF4444` |

Inter is used for interface typography. JetBrains Mono is used for financial and technical data. All illustrative report figures are visibly marked `[MOCK / SYNTHETIC DATA]`.

## Product scope and accuracy

This is the landing page and waitlist only. It does not claim that document ingestion, reconciliation workers, billing, Stripe Connect, or the audit portal are live. The 14-day / 200-load audit and $2,500/month + $1.50 per reconciled exception load are presented as the commercial model specified in the approved product plan; final terms are confirmed during onboarding.

## Validation

```bash
npm run typecheck
npm run build
```
