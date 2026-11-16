"use client";

import { FormEvent, useEffect, useState } from "react";

type SignupState = "idle" | "submitting" | "success" | "exists" | "error";

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? "brand-mark-small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M4 27.5V8.5h5.3l8.7 12 8.7-12H32v19h-5.1V16l-8.9 12-8.9-12v11.5H4Z" fill="currentColor" />
        <path d="M4 32h28" stroke="#10B981" strokeWidth="2" />
      </svg>
    </span>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 12.5 12 4m0 0H5m7 0v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3 8.3 3.1 3.1L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const findings = [
  { code: "R-01", title: "Unbilled lumper", detail: "Receipt present · no shipper charge", amount: "$385.00", tone: "warning" },
  { code: "R-02", title: "Unbilled detention", detail: "3h 42m on-site · 2h free time", amount: "$612.50", tone: "warning" },
  { code: "R-03", title: "Carrier overbill", detail: "Invoice exceeds approved rate con", amount: "$240.00", tone: "danger" },
  { code: "R-04", title: "Duplicate invoice", detail: "Same carrier · invoice number match", amount: "$1,120.00", tone: "danger" },
];

const steps = [
  { number: "01", title: "Bring the load packet", body: "Upload Rate Cons, BOLs or PODs, lumper receipts, and carrier invoices in a batch. A companion load CSV adds billing context." },
  { number: "02", title: "Reconcile against the record", body: "Metodit compares extracted line items, timestamps, approved rates, and billing exports using explicit reconciliation rules." },
  { number: "03", title: "Review the evidence", body: "Get a concise recovered-margin report with each exception tied back to its source document. Your team decides what to resolve." },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [partnerSlug, setPartnerSlug] = useState("");
  const [status, setStatus] = useState<SignupState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const incoming = params.get("partner")?.trim().toLowerCase();
      const stored = localStorage.getItem("metodit_partner_attribution");
      if (incoming && /^[a-z0-9-]{2,80}$/.test(incoming)) {
        const attribution = { slug: incoming, expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 };
        localStorage.setItem("metodit_partner_attribution", JSON.stringify(attribution));
        setPartnerSlug(incoming);
      } else if (stored) {
        const parsed = JSON.parse(stored) as { slug?: string; expiresAt?: number };
        if (parsed.slug && parsed.expiresAt && parsed.expiresAt > Date.now()) {
          setPartnerSlug(parsed.slug);
        } else {
          localStorage.removeItem("metodit_partner_attribution");
        }
      }
    } catch {
      // Attribution is optional; the waitlist form remains usable if storage is unavailable.
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          role,
          consent,
          website,
          partnerSlug,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; alreadyJoined?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "We couldn’t add you right now. Please try again.");
      }

      if (result.alreadyJoined) {
        setStatus("exists");
        setMessage("This email is already on the early-access list. We’ll be in touch when a place is ready.");
      } else {
        setStatus("success");
        setMessage("You’re on the list. We’ll email you when early access opens.");
        setEmail("");
        setCompany("");
        setRole("");
        setConsent(false);
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <div className="topline">
        <div className="topline-inner">
          <span className="topline-indicator"><span /> BUILT FOR THE PEOPLE WHO CLOSE THE BOOKS</span>
          <span className="topline-right">FREIGHT FINANCE / RECONCILIATION</span>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Metodit home">
          <BrandMark />
          <span>metodit<span className="brand-period">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#method">How it works</a>
          <a href="#findings">What it catches</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="header-cta" href="#early-access">Request early access <ArrowUpRight /></a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> FREIGHT FINANCE, RECONCILED</div>
          <h1>Find the margin<br />hiding in your <em>paperwork.</em></h1>
          <p className="hero-description">
            Every load leaves a paper trail. Metodit reconciles it—so unbilled accessorials,
            carrier overbilling, and duplicate invoices don’t make it past month-end.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#early-access">Join the early-access list <ArrowUpRight /></a>
            <a className="text-link" href="#method">See how it works <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="proof-item"><span className="proof-number">01</span><span>One load packet<br />at a time</span></div>
            <div className="proof-rule" />
            <div className="proof-item"><span className="proof-number">04</span><span>Deterministic<br />exception rules</span></div>
            <div className="proof-rule" />
            <div className="proof-item"><span className="proof-number">100%</span><span>Evidence-led<br />review</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Illustrative Metodit reconciliation report">
          <div className="visual-topbar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>METODIT / AUDIT PREVIEW</span>
            <span className="visual-live"><b /> SAMPLE</span>
          </div>
          <div className="report-head">
            <div>
              <div className="micro-label">RECOVERED MARGIN REPORT</div>
              <div className="report-title">Load packet review</div>
            </div>
            <div className="report-period">BATCH 0248<br /><span>200 LOADS</span></div>
          </div>
          <div className="mock-badge">[MOCK / SYNTHETIC DATA]</div>
          <div className="metric-grid">
            <div className="metric-card metric-primary">
              <span className="metric-label">TOTAL RECOVERABLE MARGIN</span>
              <strong>$4,286<span>.50</span></strong>
              <small>Identified for review</small>
            </div>
            <div className="metric-card">
              <span className="metric-label">CARRIER OVERBILLING</span>
              <strong>$1,840<span>.00</span></strong>
              <small className="danger-copy">12 exceptions flagged</small>
            </div>
          </div>
          <div className="findings-head">
            <span>EXCEPTION REGISTER</span>
            <span>4 EXAMPLE FINDINGS <b>↗</b></span>
          </div>
          <div className="finding-list">
            {findings.map((finding) => (
              <div className="finding-row" key={finding.code}>
                <span className={`finding-code ${finding.tone}`}>{finding.code}</span>
                <div className="finding-description">
                  <strong>{finding.title}</strong>
                  <small>{finding.detail}</small>
                </div>
                <span className="finding-amount">{finding.amount}</span>
              </div>
            ))}
          </div>
          <div className="visual-foot">
            <span><i /> RULE-BASED REVIEW</span>
            <span>ILLUSTRATIVE DATA ONLY</span>
          </div>
          <div className="visual-index">FIG. 01 / RECONCILIATION SURFACE</div>
        </div>
      </section>

      <section className="ticker" aria-label="Reconciliation categories">
        <div className="ticker-inner">
          <span>UNBILLED LUMPER</span><i />
          <span>DETENTION VARIANCE</span><i />
          <span>CARRIER OVERBILL</span><i />
          <span>DUPLICATE INVOICE</span><i />
          <span>UNBILLED LUMPER</span><i />
          <span>DETENTION VARIANCE</span>
        </div>
      </section>

      <section className="problem-section section-shell">
        <div className="section-kicker">THE COST OF MANUAL RECONCILIATION <span>01 / 04</span></div>
        <div className="problem-grid">
          <h2>The load is closed.<br /><em>The numbers aren’t.</em></h2>
          <div className="problem-copy">
            <p>Brokerage finance teams work across rate confirmations, BOLs, PODs, receipts, carrier invoices, and shipper billing exports. The gaps between those documents are where margin disappears.</p>
            <p>Metodit is built to surface those gaps with a traceable finding—not another spreadsheet to maintain.</p>
          </div>
        </div>
        <div className="problem-bottom">
          <span>THE PAPER TRAIL IS THE SOURCE OF TRUTH.</span>
          <span>METODIT TURNS IT INTO A CONTROL.</span>
        </div>
      </section>

      <section className="method-section section-shell" id="method">
        <div className="section-kicker">A CLEARER WAY TO CLOSE <span>02 / 04</span></div>
        <div className="section-heading-row">
          <h2>From load packet<br />to <em>actionable evidence.</em></h2>
          <p>No black-box financial verdicts. Each exception is tied to a document, a rule, and a dollar impact your team can inspect.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <div className="step-top"><span>{step.number}</span><span className="step-mark">↗</span></div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="step-bottom"><span>METODIT WORKFLOW</span><span>{step.number} / 03</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="findings-section section-shell" id="findings">
        <div className="section-kicker">WHAT METODIT LOOKS FOR <span>03 / 04</span></div>
        <div className="findings-layout">
          <div className="findings-intro">
            <h2>Four rules.<br /><em>Less margin left behind.</em></h2>
            <p>Reconciliation starts with explicit comparisons—not a model guessing what a number should be.</p>
            <a href="#early-access" className="text-link">Get on the list <span>→</span></a>
          </div>
          <div className="rule-list">
            <article className="rule-item">
              <span className="rule-id">R-01</span>
              <div><h3>Unbilled lumper</h3><p>A receipt exists, but no matching lumper charge appears on the shipper billing export.</p></div>
              <span className="rule-tag warning-tag">MARGIN RECOVERY</span>
            </article>
            <article className="rule-item">
              <span className="rule-id">R-02</span>
              <div><h3>Unbilled detention</h3><p>Arrival-to-departure time exceeds free time, with a valid stamp or signature, and remains unbilled.</p></div>
              <span className="rule-tag warning-tag">MARGIN RECOVERY</span>
            </article>
            <article className="rule-item">
              <span className="rule-id">R-03</span>
              <div><h3>Carrier overbill</h3><p>Carrier invoice totals exceed the approved Rate Con plus approved change orders.</p></div>
              <span className="rule-tag danger-tag">PAYMENT CONTROL</span>
            </article>
            <article className="rule-item">
              <span className="rule-id">R-04</span>
              <div><h3>Duplicate invoice</h3><p>Carrier and invoice identifiers—or load and amount—match within a 90-day window.</p></div>
              <span className="rule-tag danger-tag">PAYMENT CONTROL</span>
            </article>
          </div>
        </div>
      </section>

      <section className="pricing-section section-shell" id="pricing">
        <div className="section-kicker">STRAIGHTFORWARD COMMERCIALS <span>04 / 04</span></div>
        <div className="pricing-layout">
          <div>
            <h2>Make the numbers<br /><em>make sense.</em></h2>
            <p className="pricing-intro">Designed for mid-market freight brokerages processing roughly 500–3,000 loads a month.</p>
          </div>
          <div className="price-card">
            <div className="price-label">BROKERAGE PLAN / PROPOSED PRICING</div>
            <div className="price-amount">$2,500<span>/ month</span></div>
            <p className="price-sub">Base retainer · up to 1,500 loads / month</p>
            <div className="price-divider" />
            <div className="price-extra"><span>Reconciled exception load</span><strong>$1.50</strong></div>
            <div className="price-extra"><span>Initial audit</span><strong>Free</strong></div>
            <div className="price-note">14 days · up to 200 loads</div>
            <a href="#early-access" className="button button-primary price-button">Request early access <ArrowUpRight /></a>
            <small>Pricing shown as specified in the product plan. Final terms are confirmed during onboarding.</small>
          </div>
        </div>
        <div className="partner-strip">
          <div className="partner-symbol">↗</div>
          <div><strong>For freight factoring teams, TMS consultants & transportation CPAs</strong><p>Refer a brokerage and earn a 20% recurring revenue share on converted accounts.</p></div>
          <a href="#early-access" className="text-link">Partner with Metodit <span>→</span></a>
        </div>
      </section>

      <section className="waitlist-section" id="early-access">
        <div className="waitlist-inner section-shell">
          <div className="waitlist-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> EARLY ACCESS</div>
            <h2>Close the gap<br />before it <em>closes you.</em></h2>
            <p>Get on the early-access list for Metodit. We’re speaking with brokerage finance teams and distribution partners ahead of the first rollout.</p>
            <div className="waitlist-note"><span className="note-check"><CheckIcon /></span><span>Early access updates. No fabricated case studies. No inflated recovery promises.</span></div>
          </div>
          <div className="waitlist-form-wrap">
            <div className="form-heading"><span>REQUEST ACCESS</span><span>01 / 01</span></div>
            <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">Work email <span>*</span></label>
                <input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
              </div>
              <div className="field">
                <label htmlFor="company">Brokerage / company <span className="optional">OPTIONAL</span></label>
                <input id="company" type="text" autoComplete="organization" placeholder="Company name" value={company} onChange={(event) => setCompany(event.target.value)} maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor="role">Your role <span className="optional">OPTIONAL</span></label>
                <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="">Select your role</option>
                  <option value="Finance / Controller">Finance / Controller</option>
                  <option value="Billing Operations">Billing Operations</option>
                  <option value="Brokerage Leadership">Brokerage Leadership</option>
                  <option value="Factoring / Lending Partner">Factoring / Lending Partner</option>
                  <option value="TMS Consultant">TMS Consultant</option>
                  <option value="Transportation CPA">Transportation CPA</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
              </div>
              <label className="consent-row">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
                <span>I agree to receive Metodit early-access and product updates by email. I can unsubscribe at any time.</span>
              </label>
              <button className="button button-primary submit-button" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Adding you…" : "Join the early-access list"}
                {status !== "submitting" && <ArrowUpRight />}
              </button>
              <p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p>
              <p className="form-privacy">Your details are used only to manage early access and related product updates.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><BrandMark small /><span>metodit<span className="brand-period">.</span></span></a>
          <p>Financial control for freight.<br />Evidence over assumption.</p>
          <a className="footer-top" href="#top">BACK TO TOP ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} METODIT</span>
          <span>FREIGHT FINANCE / AUTONOMOUS RECONCILIATION</span>
          <span>BUILT FOR THE CLOSE.</span>
        </div>
      </footer>
    </main>
  );
}