import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistPayload = {
  email?: unknown;
  company?: unknown;
  role?: unknown;
  consent?: unknown;
  website?: unknown;
  partnerSlug?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  return cleaned ? cleaned.slice(0, maxLength) : null;
}

export async function POST(request: NextRequest) {
  let payload: WaitlistPayload;

  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 8_000) {
      return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
    }
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Quietly accept honeypot submissions without storing them.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = cleanText(payload.email, 254)?.toLowerCase();
  const company = cleanText(payload.company, 120);
  const role = cleanText(payload.role, 80);
  const partnerSlug = cleanText(payload.partnerSlug, 80);

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid work email address." }, { status: 400 });
  }
  if (payload.consent !== true) {
    return NextResponse.json({ ok: false, error: "Please confirm that we can email you about early access." }, { status: 400 });
  }
  if (partnerSlug && !/^[a-z0-9-]{2,80}$/.test(partnerSlug)) {
    return NextResponse.json({ ok: false, error: "Invalid referral attribution." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { ok: false, error: "The waitlist is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/waitlist_signups?on_conflict=email`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify({
          email,
          company_name: company,
          role,
          partner_slug: partnerSlug,
          source: "metodit-landing",
          consent_at: new Date().toISOString(),
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Waitlist persistence failed", { status: response.status });
      return NextResponse.json(
        { ok: false, error: "We couldn’t save your details. Please try again shortly." },
        { status: 502 },
      );
    }

    const rows = (await response.json().catch(() => [])) as unknown[];
    return NextResponse.json({ ok: true, alreadyJoined: rows.length === 0 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The waitlist is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}