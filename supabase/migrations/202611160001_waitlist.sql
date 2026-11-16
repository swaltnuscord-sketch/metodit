-- Metodit early-access waitlist.
-- The landing page writes through the server-side API using the service-role key.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  company_name text,
  role text,
  partner_slug text,
  source text not null default 'metodit-landing',
  consent_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

create index if not exists waitlist_signups_partner_slug_idx
  on public.waitlist_signups (partner_slug)
  where partner_slug is not null;

alter table public.waitlist_signups enable row level security;

-- No anon/authenticated policies: public reads and direct writes are denied.
revoke all on table public.waitlist_signups from anon, authenticated;
grant all on table public.waitlist_signups to service_role;