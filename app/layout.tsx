import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "후니버스 | Hooniverse",
  description: "마인크래프트의 새로운 지평을 여는 크리에이티브 그룹, 후니버스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Transparent Navbar */}
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
