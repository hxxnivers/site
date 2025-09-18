"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type HomeBannerProps = {
  id: string;
  title: string;
  description: string;
  targetAt: string; // ISO string
  bgUrl: string;
  logoUrl: string;
};

function formatTimeLeft(msLeft: number) {
  if (msLeft <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const totalSeconds = Math.floor(msLeft / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { d, h, m, s };
}

export default function HomeBanner({ id, title, description, targetAt, bgUrl, logoUrl }: HomeBannerProps) {
  const target = useMemo(() => new Date(targetAt).getTime(), [targetAt]);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const msLeft = Math.max(0, target - now);
  const { d, h, m, s } = formatTimeLeft(msLeft);

  // If already started, hide the banner
  if (msLeft <= 0) return null;

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Top row: logo left, timer centered */}
      <div className="relative z-10 flex items-start justify-center px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <Image src={logoUrl} alt="로고" width={64} height={64} className="rounded-md shadow" />
        </div>
        <div className="text-center">
          <div className="text-white text-sm sm:text-base uppercase tracking-wider">오픈까지 남은 시간</div>
          <div className="mt-1 font-mono text-white text-2xl sm:text-4xl font-semibold">
            {d.toString().padStart(2, "0")}일 {h.toString().padStart(2, "0")}:{m
              .toString()
              .padStart(2, "0")}
            :{s.toString().padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Center: title and description */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 mt-20 sm:mt-28">
        <h2 className="text-white text-3xl sm:text-5xl font-bold drop-shadow">{title}</h2>
        <p className="mt-4 max-w-3xl whitespace-pre-line text-white/90 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
        <Link
          href={`/contents/${id}`}
          className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
        >
          참가 신청
        </Link>
      </div>
    </section>
  );
}
