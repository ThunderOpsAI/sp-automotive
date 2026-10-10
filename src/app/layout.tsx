import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SP Automotive | Mechanic, Logbook Servicing & 24/7 Roadside Wangaratta",
  description: "Licensed mechanics in Wangaratta VIC. Fixed-price manufacturer logbook servicing, VicRoads Roadworthy Certificates (RWC), brake and clutch repairs, auto diagnostics, and 24/7 emergency roadside assistance & towing. Call (03) 5722 4213.",
  keywords: [
    "SP Automotive",
    "Mechanic Wangaratta",
    "Logbook Servicing Wangaratta",
    "Roadworthy Certificate Wangaratta RWC",
    "24/7 Roadside Assistance Wangaratta",
    "Emergency Towing Wangaratta Hume Highway",
    "Brake and Clutch Repairs Wangaratta",
    "Auto Electrician & Diagnostics Wangaratta VIC 3677"
  ],
  openGraph: {
    title: "SP Automotive | Wangaratta Mechanical & 24/7 Roadside Assistance",
    description: "Expert mechanical servicing, roadworthy inspections, and 24/7 emergency roadside assistance across Wangaratta & Hume Highway corridor.",
    type: "website",
    locale: "en_AU",
    siteName: "SP Automotive",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
