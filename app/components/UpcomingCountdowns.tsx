"use client";

import Image from "next/image";
import Link from "next/link";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export type UpcomingItem = {
  id: string;
  title: string;
  description: string;
  targetAt: string; // ISO string
  bgUrl: string;
  logoUrl: string;
};

export default function UpcomingCountdowns({ items }: { items: UpcomingItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        {items.map((it) => (
          <article key={it.id} className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
              style={{ backgroundImage: `url(${it.bgUrl})` }}
              aria-hidden
            />
            <div className="relative z-10 p-5 sm:p-7">
              {/* Top bar: logo left, timer centered, button right */}
              <div className="relative min-h-[64px] px-24">
                {/* Left: Logo */}
                <div className="absolute left-0 top-1">
                  <Image src={it.logoUrl} alt={`${it.title} 로고`} width={56} height={56} className="rounded-md shadow" />
                </div>
                {/* Center: Timer */}
                <div className="flex justify-center">
                  <FlipClockCountdown
                    to={new Date(it.targetAt).getTime()}
                    className="flip-clock"
                    labels={["Days", "Hour", "Minutes", "Seconds"]}
                    labelStyle={{ fontSize: 12, fontWeight: 500, color: "#fff" }}
                    digitBlockStyle={{ width: 36, height: 48, fontSize: 28 }}
                    dividerStyle={{ height: 0 }}
                  />
                </div>
                {/* Right: CTA Button */}
                <div className="absolute right-0 top-1">
                  <Link
                    href={`/contents/${it.id}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
                  >
                    참가 신청
                  </Link>
                </div>
              </div>

              {/* Centered title and description */}
              <div className="mt-6 text-center flex flex-col items-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">{it.title}</h3>
                <p className="mt-2 whitespace-pre-line text-white/90 text-sm sm:text-base max-w-3xl">{it.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
