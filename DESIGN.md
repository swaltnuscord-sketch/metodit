# Metodit Design System

**Status:** Brand token direction defined for future implementation  
**Scope:** Design specification only. These tokens have not been applied to the website.

## 1. Brand character

Metodit should feel like a precise financial instrument built for freight operators: calm, forensic, tactile, and quietly confident.

The visual identity is deliberately not another dark SaaS dashboard. Its signature is an **archival-paper and machine-ink** palette, restrained typography, fine rules, and one warm signal color. The interface should feel closer to a well-designed audit ledger or industrial field manual than a generic technology product.

### Design principles

- **Evidence before decoration.** Every visual element should clarify a number, source, status, or action.
- **Warm, not sterile.** Use mineral paper tones and ink rather than pure white on near-black.
- **One signature accent.** Burnt vermilion identifies Metodit actions and primary emphasis; it is not a general-purpose status color.
- **Quiet structure.** Prefer hairline dividers, aligned columns, and open space over nested cards, shadows, and gradients.
- **Numbers are the interface.** Financial values use tabular numerals and consistent alignment.
- **No visual theatre.** No glassmorphism, neon glow, decorative gradients, oversized abstract blobs, or gratuitous animation.

## 2. Core color tokens

The palette is organized around warm mineral surfaces, carbon ink, and a restrained vermilion signal.

| Token | Hex | Intended use |
|---|---:|---|
| canvas | #E9E5DC | Main light canvas; warm archival paper |
| surface | #F3F0E9 | Raised working surface and report sheet |
| surface-muted | #DED9CF | Quiet inset areas, table headers |
| ink | #20211E | Primary text and dark structural surfaces |
| ink-soft | #41433D | Secondary headings and strong supporting text |
| muted | #77786F | Metadata, helper copy, timestamps |
| line | #C9C4B9 | Hairline dividers and restrained borders |
| line-strong | #A9A397 | Emphasized separators and input boundaries |
| signal | #B84F35 | Primary action, key brand emphasis, selected state |
| signal-hover | #963D29 | Hover and pressed action state |
| signal-wash | #F1E1DA | Subtle selected or highlighted surface |

### Semantic status colors

Status colors must remain distinct from the brand accent. Never use the brand signal color to imply an exception severity.

| Token | Hex | Meaning |
|---|---:|---|
| status-recovery | #55745E | Recoverable margin / positive finding |
| status-warning | #A66A24 | Variance requiring review |
| status-danger | #A63F36 | Duplicate, overbill, or blocking issue |
| status-neutral | #77786F | Informational or unclassified |

Use status colors sparingly and pair them with text labels or icons. Color must never be the only carrier of meaning.

## 3. Dark working surfaces

Dark surfaces are an optional, deliberate mode for dense reconciliation work—not the default brand canvas. If used, retain the same warm undertone and vermilion signal.

| Token | Hex | Intended use |
|---|---:|---|
| dark-canvas | #20211E | Dark workspace background |
| dark-surface | #292A26 | Panels and working surfaces |
| dark-surface-raised | #33342F | Raised panels and selected rows |
| dark-ink | #F0EDE5 | Primary text on dark surfaces |
| dark-muted | #B0ADA3 | Secondary text on dark surfaces |
| dark-line | #484941 | Dividers and borders |
| dark-signal | #D4775E | Accessible warm signal on dark surfaces |

Do not mix light- and dark-mode surface tokens within one component.

## 4. Typography

### Typeface roles

- **Interface and editorial headings:** Instrument Sans, with a system sans-serif fallback.
- **Financial data, IDs, timestamps, and rule codes:** IBM Plex Mono, with a monospace fallback.

Use a small number of weights. Headings should be confident through proportion and spacing, not extreme weight or exaggerated tracking. Financial values should use tabular numerals (font-variant-numeric: tabular-nums).

### Type scale

| Token | Size / line height | Use |
|---|---|---|
| type-display | clamp(2.8rem, 5.4vw, 4.8rem) / 0.98 | One primary statement per page |
| type-h1 | 2.5rem / 1.05 | Page title |
| type-h2 | 1.75rem / 1.15 | Section heading |
| type-h3 | 1.125rem / 1.3 | Panel or subsection title |
| type-body | 0.9375rem / 1.65 | Main explanatory copy |
| type-small | 0.8125rem / 1.5 | Supporting copy |
| type-label | 0.6875rem / 1.35 | Labels and metadata |
| type-data | 0.875rem / 1.4 | Table and financial values |

Avoid all-caps body copy. Reserve uppercase and modest letter spacing for short metadata labels only.

## 5. Spacing and geometry

Use a 4px base unit. Whitespace should create hierarchy; do not fill every available area with a card.

| Token | Value |
|---|---:|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 24px |
| space-6 | 32px |
| space-7 | 48px |
| space-8 | 64px |
| space-9 | 96px |

- Controls: 4px radius.
- Small data surfaces: 6px radius.
- Large report surfaces: 8px radius.
- Pills: reserved for compact status indicators, not general decoration.
- Borders: default to 1px hairlines; use stronger borders only to establish a meaningful boundary.
- Shadows: avoid by default. Use a very subtle shadow only when elevation is necessary to communicate layering.

## 6. Component rules

### Actions

- Primary buttons use signal on canvas/surface, with dark text.
- Secondary actions use a transparent surface and a line-strong border.
- Tertiary actions are text-only.
- Do not place multiple competing primary buttons in one visual group.

### Tables and financial data

- Align currency values and quantities to the right.
- Use tabular numerals and consistent decimal precision.
- Keep column labels quiet and values visually dominant.
- Use row separators instead of boxed cells.
- Distinguish totals with weight, spacing, and a top rule—not a large colored block.
- Show the currency and unit explicitly where ambiguity is possible.

### Exceptions and evidence

- Every exception has a rule code, plain-language description, amount or impact, and a path to its evidence.
- Status color is secondary to a clear text label.
- Evidence should be presented as a source excerpt or document reference with enough context to verify the finding.
- Never imply that a synthetic example is a real customer result.

### Forms

- Labels remain visible when fields are populated.
- Inputs use a quiet surface, clear border, and a distinct focus ring.
- Error copy is specific and adjacent to the affected field.
- Consent and data-use language must remain readable, not visually buried.

## 7. Motion and interaction

- Motion is functional: state changes, filtering, loading, and confirmation.
- Use short transitions (roughly 120–180ms) with restrained easing.
- No parallax, looping decorative motion, cursor effects, or animated number inflation.
- Focus states must be visible and keyboard accessible.
- Hover must not be the only way to reveal essential information.

## 8. Accessibility and trust

- Meet WCAG AA contrast for text and interactive controls.
- Verify contrast for the signal color in each intended foreground/background pairing; do not assume the same pairing works on both light and dark surfaces.
- Pair every status color with a word, icon, or other non-color cue.
- Preserve visible keyboard focus.
- Respect reduced-motion preferences.
- Keep audit evidence, financial values, and synthetic-data disclosures legible at mobile widths.

## 9. CSS token reference

This is a future implementation reference only. Do not paste it into the current website as part of this specification update.

~~~css
:root {
  color-scheme: light;
  --color-canvas: #E9E5DC;
  --color-surface: #F3F0E9;
  --color-surface-muted: #DED9CF;
  --color-ink: #20211E;
  --color-ink-soft: #41433D;
  --color-muted: #77786F;
  --color-line: #C9C4B9;
  --color-line-strong: #A9A397;
  --color-signal: #B84F35;
  --color-signal-hover: #963D29;
  --color-signal-wash: #F1E1DA;

  --color-status-recovery: #55745E;
  --color-status-warning: #A66A24;
  --color-status-danger: #A63F36;
  --color-status-neutral: #77786F;

  --font-ui: "Instrument Sans", system-ui, sans-serif;
  --font-data: "IBM Plex Mono", ui-monospace, monospace;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --radius-control: 4px;
  --radius-data: 6px;
  --radius-panel: 8px;
}
~~~

## 10. Implementation boundary

This document defines the proposed brand-token direction. It does **not** change the existing landing page, stylesheets, components, assets, or behavior. The current website continues to use its existing implementation tokens until a separate implementation task is explicitly requested.

Any future implementation should update the relevant design tokens and components as a coordinated change, then verify responsive layouts, keyboard focus, color contrast, and production build.
