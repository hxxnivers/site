"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";

export type ContentItem = {
    id: string;
    title: string;
    date: string;
    description: string;
    isSelf?: boolean;
};

export default function ContentsClient({items}: { items: ContentItem[] }) {
    const [tab, setTab] = useState<"self" | "external">("self");

    const filtered = useMemo(() => {
        if (tab === "self") return items.filter((i) => i.isSelf !== false);
        return items.filter((i) => i.isSelf === false);
    }, [items, tab]);

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16">
            <div className="my-8">
            </div>

            {/* Tabs */}
            <div className="mb-6 flex w-full items-center gap-2 border-b border-white/10">
                <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-center text-sm rounded-t ${tab === "self" ? "bg-white text-black font-semibold" : "text-white/80 hover:text-white"}`}
                    onClick={() => setTab("self")}
                    aria-pressed={tab === "self"}
                >
                    자체 제작
                </button>
                <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-center text-sm rounded-t ${tab === "external" ? "bg-white text-black font-semibold" : "text-white/80 hover:text-white"}`}
                    onClick={() => setTab("external")}
                    aria-pressed={tab === "external"}
                >
                    외부 컨텐츠
                </button>
            </div>

            {filtered.length === 0 ? (
                <div className="text-white/80 py-8">표시할 콘텐츠가 없습니다.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filtered.map((item, idx) => {
                        const logoUrl = `/content/${item.id}/logo.png`;
                        return (
                            <Link key={idx} href={`/contents/${item.id}`} className="block group h-full">
                                <article className="relative overflow-hidden rounded-xl border border-black/10 h-full flex flex-col min-h-[22rem] sm:min-h-[24rem]">
                                    <div className="relative w-full bg-black aspect-[16/9] overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-transform duration-300 group-hover:scale-[1.02]"
                                            style={{ backgroundImage: `url(/content/${item.id}/background.jpg)` }}
                                        />
                                    </div>
                                    <div className="p-4 sm:p-5 bg-black/80 text-white flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Image src={logoUrl} alt={`${item.title} 로고`} width={48} height={48}
                                                   className="rounded"/>
                                            <div>
                                                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                                                <p className="text-sm text-white/70">제작 시기: {item.date}</p>
                                            </div>
                                        </div>
                                        <p className="whitespace-pre-line leading-relaxed text-sm sm:text-base text-white/90 mt-auto" style={{display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden"}}>{item.description}</p>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
