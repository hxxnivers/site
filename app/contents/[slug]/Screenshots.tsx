"use client";

import { useEffect, useState } from "react";

export default function Screenshots({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Close on ESC and lock body scroll when modal is open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (openIndex !== null) {
        if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : Math.min(screenshots.length - 1, i + 1)));
        if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)));
      }
    }
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, screenshots.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((src, i) => (
          <button
            key={i}
            type="button"
            className="rounded-lg overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/40"
            onClick={() => setOpenIndex(i)}
            aria-label={`${title} 스크린샷 ${i + 1} 확대`}
          >
            {/* Height-based crop thumbnail */}
            <div className="w-full h-48 sm:h-60 md:h-72 overflow-hidden">
              <img
                src={src}
                alt={`${title} 스크린샷 ${i + 1}`}
                className="w-full h-full object-cover object-center block transition-transform duration-200 hover:scale-[1.01] cursor-zoom-in"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)));
              }}
              className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20"
              aria-label="이전 이미지"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(null);
              }}
              className="px-3 py-2 rounded bg-white text-black font-semibold shadow"
              aria-label="닫기"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : Math.min(screenshots.length - 1, i + 1)));
              }}
              className="px-3 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20"
              aria-label="다음 이미지"
            >
              →
            </button>
          </div>

          {/* Stop click propagation so clicking the image doesn't close */}
          <div className="w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Width-first full view: fill viewport width, allow vertical scrolling */}
            <img
              src={screenshots[openIndex]}
              alt={`${title} 스크린샷 확대 ${openIndex + 1}`}
              className="w-full h-auto max-w-none cursor-zoom-out"
            />
          </div>
        </div>
      )}
    </>
  );
}
