import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flipside America Inc. | A Different Perspective",
  description: "Strategic consulting for credit, business growth, media, investigations, and property management. Based in Philadelphia. Discover your next move with Flipside America Inc.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
