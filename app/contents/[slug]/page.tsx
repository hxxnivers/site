import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Screenshots from "./Screenshots";

type Review = string;

interface ContentItem {
    id: string;
    title: string;
    date: string; // e.g., "2025.05"
    description: string;
    links?: Record<string, string>;
}

function loadContents(): ContentItem[] {
    const filePath = path.join(process.cwd(), "public", "content", "contents.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
}

function findById(id: string, list: ContentItem[]): ContentItem | null {
    for (const item of list) {
        if (item.id === id) return item;
    }
    return null;
}

function loadScreenshots(contentId: string): string[] {
    try {
        const dir = path.join(process.cwd(), "public", "content", contentId, "screenshot");
        if (!fs.existsSync(dir)) return [];
        const files = fs.readdirSync(dir, {withFileTypes: true});
        const imageNames = files
            .filter((e) => e.isFile())
            .map((e) => e.name)
            .filter((n) => /\.(png|jpg|jpeg|gif|webp)$/i.test(n))
            .sort();
        return imageNames.map((n) => `/content/${contentId}/screenshot/${n}`);
    } catch {
        return [];
    }
}

function loadReviews(contentId: string): Review[] {
    try {
        const file = path.join(process.cwd(), "public", "content", contentId, "reviews.json");
        if (!fs.existsSync(file)) return [];
        const raw = fs.readFileSync(file, "utf8");
        const arr = JSON.parse(raw) as string[];
        return arr.filter((review) => review && review.trim().length > 0);
    } catch {
        return [];
    }
}


export default function ContentDetailPage({params}: { params: { slug: string } }) {
    const contents = loadContents();
    const item = findById(params.slug, contents);

    if (!item) {
        return (
            <div className="p-8">
                <p>콘텐츠를 찾을 수 없습니다.</p>
                <Link className="underline" href="/contents">목록으로</Link>
            </div>
        );
    }

    const bgUrl = `/content/${item.id}/background.jpg`;
    const screenshots = loadScreenshots(item.id);
    const reviews = loadReviews(item.id);

    return (
        <div className="relative min-h-screen">
            {/* Background fixed behind content */}
            <div
                className="fixed inset-0 -z-10 bg-bottom bg-cover"
                style={{backgroundImage: `url(${bgUrl})`}}
                aria-hidden
            />
            {/* Dim overlay */}
            <div className="fixed inset-0 -z-10 bg-black/70" aria-hidden/>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col">
                {/* Floating Back Button for dark background */}
                <Link
                    href="/contents"
                    className="fixed top-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-gray-900 px-4 py-2 shadow-lg backdrop-blur-sm border border-white/60 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                    <span className="text-base">← 목록으로</span>
                </Link>

                {/* Hero section */}
                <section className="px-6 sm:px-10 md:px-14 pt-28 sm:pt-32 md:pt-36 pb-12">
                    <div className="text-left text-white w-full max-w-5xl">
                        <div className="mb-6 sm:mb-8">
                            <Image src={`/content/${item.id}/logo.png`} alt={`${item.title} 로고`} width={260}
                                   height={120}
                                   className="h-auto w-auto max-h-24 sm:max-h-28 md:max-h-32 object-contain"/>
                        </div>
                        <h1 style={{fontSize: "clamp(32px, 10vw, 120px)", lineHeight: 1, letterSpacing: "-0.02em"}}
                            className="font-bold mb-8 break-words whitespace-normal">
                            {item.title}
                        </h1>
                        <div className="space-y-6 sm:space-y-8">
                            <p className="text-xl sm:text-2xl whitespace-pre-line leading-relaxed">
                                {item.description}
                            </p>
                            <p className="text-lg opacity-90">작업기간: {item.date}</p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                {screenshots.length > 0 && (
                                    <a href="#screenshots"
                                       className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-gray-900 px-4 py-2 shadow border border-white/60">
                                        이미지 보기
                                    </a>
                                )}
                                {reviews.length > 0 && (
                                    <a href="#reviews"
                                       className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-gray-900 px-4 py-2 shadow border border-white/60">
                                        리뷰 보기
                                    </a>
                                )}
                                {item.links && Object.keys(item.links).length > 0 && (
                                    <a href="#links"
                                       className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-gray-900 px-4 py-2 shadow border border-white/60">
                                        관련 링크
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Links section */}
                {item.links && Object.keys(item.links).length > 0 && (
                    <section id="links" className="px-6 sm:px-10 md:px-14 pb-12 scroll-mt-24">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">관련 링크</h2>
                        <div className="flex flex-wrap gap-3">
                            {Object.entries(item.links).map(([name, url]) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-gray-900 px-4 py-2 shadow border border-white/60 transition-colors"
                                >
                                    <span>🔗</span>
                                    <span>{name}</span>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* Screenshots section */}
                {screenshots.length > 0 && (
                    <section id="screenshots" className="px-6 sm:px-10 md:px-14 pb-12 scroll-mt-24">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">스크린샷</h2>
                        <Screenshots screenshots={screenshots} title={item.title}/>
                    </section>
                )}

                {/* Reviews section */}
                {reviews.length > 0 && (
                    <section id="reviews" className="px-6 sm:px-10 md:px-14 pb-16 scroll-mt-24">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">리뷰</h2>
                        <div className="space-y-4">
                            {reviews.map((review, idx) => (
                                <article key={idx}
                                         className="rounded-lg border border-white/10 bg-white/5 p-4 text-white">
                                    <p className="whitespace-pre-line leading-relaxed">{review}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
