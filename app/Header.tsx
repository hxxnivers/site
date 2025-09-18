"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "";
  // Hide header only on content detail pages: /contents/[slug]
  const hideOnDetail = /^\/contents\/[^\/]+$/.test(pathname);

  if (hideOnDetail) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/50">
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="후니버스 로고" width={40} height={40} />
          <span className="text-lg font-semibold">Hooniverse</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/contents" className="hover:underline">Portfolio</Link>
        </div>
      </nav>
    </header>
  );
}
