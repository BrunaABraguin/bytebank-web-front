import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bytebank",
  description:
    "Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased bg-green-light p-6" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
