import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://microsoft.skunkworksacademy.com"),
  title: {
    default: "Microsoft Training & Certification | Skunkworks Academy",
    template: "%s | Skunkworks Academy Microsoft"
  },
  description:
    "Browse Microsoft learning, certification and instructor-led training with Skunkworks Academy, a Microsoft Global Training Partner. Explore Azure, Microsoft 365, Security, Power Platform, Data & AI, Dynamics 365 and DevOps.",
  keywords: [
    "Microsoft training",
    "Microsoft certification",
    "Microsoft Global Training Partner",
    "Azure training",
    "Microsoft 365 training",
    "Power Platform training",
    "Microsoft security training",
    "Microsoft Learn catalog",
    "Skunkworks Academy"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Skunkworks Academy",
    title: "Microsoft Training & Certification | Skunkworks Academy",
    description:
      "Microsoft skilling, certification pathways, instructor-led delivery and a browsable Microsoft Learn catalog from a Microsoft Global Training Partner.",
    locale: "en_ZA"
  },
  twitter: {
    card: "summary_large_image",
    title: "Microsoft Training & Certification | Skunkworks Academy",
    description:
      "Browse Microsoft learning, certification pathways and instructor-led training with Skunkworks Academy."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-ZA"><body>{children}</body></html>;
}
