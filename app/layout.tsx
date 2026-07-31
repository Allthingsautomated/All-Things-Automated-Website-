import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All Things Automated | Smart Home Systems in Sarasota",
  description:
    "Lutron lighting, Savant automation, UniFi security, audio, networking, and smart-home systems serving Sarasota, Bradenton, and Venice.",
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
