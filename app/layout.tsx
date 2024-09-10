import type { Metadata } from "next";
import Head from "next/head";

import "./globals.css";
import "hippo-guest-component-library/styles.css";

import initializeThemeManagement from "../test";

export const metadata: Metadata = {
  title: "HotelsHippo.com",
  description: "ota",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
