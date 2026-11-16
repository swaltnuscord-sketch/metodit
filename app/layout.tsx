import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://metodit.com"),
  title: {
    default: "Metodit — Find the margin hiding in your freight paperwork",
    template: "%s | Metodit",
  },
  description:
    "Autonomous freight reconciliation for brokerages. Find unbilled detention and lumper charges, catch carrier overbilling, and flag duplicate invoices before month-end close.",
  applicationName: "Metodit",
  keywords: [
    "freight reconciliation",
    "freight brokerage finance",
    "carrier invoice audit",
    "unbilled accessorials",
    "freight audit software",
  ],
  openGraph: {
    type: "website",
    siteName: "Metodit",
    title: "Metodit — Find the margin hiding in your freight paperwork",
    description:
      "Reconcile the paperwork behind every load. Catch unbilled accessorials, carrier overbilling, and duplicate invoices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metodit — Freight finance, reconciled",
    description:
      "Find the margin hiding in your freight paperwork. Join the Metodit early-access list.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090B0E",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}