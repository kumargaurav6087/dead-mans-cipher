import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Dead Man's Cipher",
  description: "Secure the message. Hide the secret.",
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
