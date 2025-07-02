import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NAV_LINKS_DASHBOARD } from "@repo/utils/paths";
import Sidebar from "@repo/ui/Sidebar";

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
      <body className="antialiased" suppressHydrationWarning={true}>
        <div className="bg-green-light">
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen xl:px-28">
            <Sidebar navLinks={NAV_LINKS_DASHBOARD} />
          </div>
          <main className="lg:col-span-3 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
