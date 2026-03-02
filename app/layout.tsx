import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Inter, Sora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "600", "700", "900"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mortugaba Tech",
  description: "Comunidade de tecnologia e inovação em Mortugaba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.className} ${sora.className}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
