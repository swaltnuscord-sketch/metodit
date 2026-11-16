# Metodit

Metodit is freight brokerage reconciliation software that helps finance teams identify unbilled accessorials, carrier overbilling, and duplicate invoices.

## Project status

Phase 1 landing page and waitlist experience. The waitlist API requires Supabase credentials; without them, submissions are not stored and the UI reports that clearly.

## Stack

- Next.js App Router
- React + TypeScript
- CSS design tokens (Inter + JetBrains Mono)
- Supabase Postgres for optional waitlist persistence

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` to enable waitlist persistence. Never expose the service-role key to the browser.

Run `supabase/schema.sql` in the Supabase SQL editor to create the waitlist table.

## Waitlist behavior

`POST /api/waitlist` validates and stores email addresses when Supabase is configured. Otherwise it returns a service-unavailable response. The client never displays a false success state.

## Brand

See [DESIGN.md](./DESIGN.md) for the Metodit brand and interface tokens. All example metrics are labeled as illustrative.