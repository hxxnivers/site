import fs from "fs";
import path from "path";
import Image from "next/image";
import UpcomingCountdowns from "./components/UpcomingCountdowns";

type ContentItem = {
    id: string;
    title: string;
    date: string;
    description: string;
    links?: Record<string, string>;
};

interface MemberItem {
    name: string;
    role: string;
    mcNickname: string;
    intro?: string;
    portfolio?: string;
    comment?: string;
    links?: Record<string, string>;
}

function parseContentDate(d: string): Date | null {
    if (!d) return null;
    // Cases: "YYYY.MM" or "YYYY.MM.DD HH:mm:ss"
    const hasTime = d.includes(":") || d.trim().split(" ")[0].split(".").length >= 3;
    try {
        if (hasTime) {
            const [datePart, timePart = "00:00:00"] = d.trim().split(" ");
            const [yStr, mStr, dayStr] = datePart.split(".");
            const [hh = "0", mm = "0", ss = "0"] = (timePart || "").split(":");
            const y = Number(yStr);
            const m = Number(mStr);
            const day = Number(dayStr);
            if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(day)) return null;
            const date = new Date(y, (m || 1) - 1, day || 1, Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
            return date;
        } else {
            const [yStr, mStr] = d.split(".");
            const y = Number(yStr);
            const m = Number(mStr || "1");
            if (!Number.isFinite(y)) return null;
            return new Date(y, Math.max(1, Math.min(12, m)) - 1, 1, 0, 0, 0);
        }
    } catch {
        return null;
    }
}

function loadAllUpcoming() {
    const filePath = path.join(process.cwd(), "public", "content", "contents.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const list: ContentItem[] = JSON.parse(raw);
    const now = Date.now();
    const withDates = list
        .map((c) => ({c, at: parseContentDate(c.date)?.getTime() || null}))
        .filter((x) => x.at !== null && (x.at as number) > now) as { c: ContentItem; at: number }[];
    if (withDates.length === 0) return [] as {
        id: string;
        title: string;
        description: string;
        targetAt: string;
        bgUrl: string;
        logoUrl: string
    }[];
    withDates.sort((a, b) => a.at - b.at);
    return withDates.map(({c, at}) => {
        const id = c.id;
        return {
            id,
            title: c.title,
            description: c.description,
            targetAt: new Date(at).toISOString(),
            bgUrl: `/content/${id}/background.jpg`,
            logoUrl: `/content/${id}/logo.png`,
        };
    });
}

function loadMembers(): MemberItem[] {
    const filePath = path.join(process.cwd(), "public", "member", "member.json");
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
}

function skinPath(mcNickname?: string): string | null {
    if (!mcNickname) return null;
    const diskPath = path.join(process.cwd(), "public", "member", "skin", `${mcNickname}.png`);
    if (!fs.existsSync(diskPath)) return null;
    return `/member/skin/${mcNickname}.png`;
}

function Contact({member}: { member: MemberItem }) {
    const hasPortfolio = member.portfolio && member.portfolio.trim().length > 0;
    const links = member.links ?? {};
    const entries = Object.entries(links).filter(([, v]) => typeof v === "string" && v.trim().length > 0);

    // Map link keys to icon image paths under /public/icon
    const iconMap: Record<string, string> = {
        github: "/icon/github.png",
        chzzk: "/icon/chzzk.png",
        email: "/icon/email.png",
        discord: "/icon/discord.png",
        // Add more mappings here as icons are added to /public/icon
    };

    return (
        <div className="text-sm text-white/70 space-y-1">
            {hasPortfolio && (
                <p>
                    포트폴리오: <a className="underline" href={member.portfolio} target="_blank"
                              rel="noreferrer">{member.portfolio}</a>
                </p>
            )}
            {entries.length > 0 && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                    {entries.map(([key, url]) => {
                        const isEmail = key.toLowerCase() === "email";
                        const href = isEmail ? `mailto:${url}` : url;
                        const iconSrc = iconMap[key.toLowerCase()] ?? null;
                        // Special handling for Discord: show ID text, not a link
                        if (key.toLowerCase() === "discord") {
                            return (
                                <div
                                    key={key}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-transparent text-sm"
                                    aria-label="Discord"
                                    title="Discord"
                                >
                                    {iconSrc ? (
                                        <Image src={iconSrc} alt="Discord 아이콘" width={18} height={18}/>
                                    ) : (
                                        <span className="text-base" aria-hidden>💬</span>
                                    )}
                                    <span className="font-medium text-white/90">{url}</span>
                                </div>
                            );
                        }

                        return (
                            <a
                                key={key}
                                href={href}
                                target={isEmail ? undefined : "_blank"}
                                rel={isEmail ? undefined : "noreferrer"}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition text-sm"
                                aria-label={key}
                                title={key}
                            >
                                {iconSrc ? (
                                    <Image src={iconSrc} alt={`${key} 아이콘`} width={18} height={18}/>
                                ) : (
                                    <span className="text-base" aria-hidden>🔗</span>
                                )}
                                <span className="underline decoration-dotted">
                  {key}
                </span>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function Home() {
    const upcoming = loadAllUpcoming();
    const members = loadMembers();

    return (
        <>
            <div className="mx-auto max-w-6xl px-4 pb-16">
                {/* Intro section */}
                <section className="mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mt-6 mb-4">🌟 후니버스 (hxxnivers)</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-6">
                        🎮 마인크래프트의 새로운 지평을 여는 크리에이티브 그룹 <b>후니버스</b>는
                        마인크래프트 플레이어들에게 혁신적이고 신선한 콘텐츠를 제공하는 것을 목표로 합니다.
                    </p>
                    {upcoming.length > 0 && <UpcomingCountdowns items={upcoming}/>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">🚀 우리의 미션</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>독창적인 마인크래프트 콘텐츠 개발</li>
                                <li>혁신적인 미디어 콘텐츠 제작</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">💡 우리가 하는 일</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>커스텀 맵 디자인</li>
                                <li>독특한 게임 모드 개발</li>
                                <li>엔터테이닝한 영상 콘텐츠 제작</li>
                                <li>커뮤니티 이벤트 기획 및 운영</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Team members section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {members.map((m, idx) => {
                        const skin = skinPath(m.mcNickname);
                        return (
                            <article key={idx}
                                     className="rounded-xl border border-white/15 bg-white/5 p-5 sm:p-6 flex gap-5">
                                <div
                                    className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white/10 border border-white/10">
                                    {skin ? (
                                        <Image src={skin} alt={`${m.name} 스킨`} width={128} height={128}
                                               className="h-full w-auto object-contain"/>
                                    ) : (
                                        <span
                                            className="text-xs font-semibold tracking-wider text-white/60">NO SKIN</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white">
                                        {m.name}
                                        <span
                                            className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">{m.role}</span>
                                    </h2>
                                    {m.mcNickname && (
                                        <p className="text-sm text-white/60">MC: {m.mcNickname}</p>
                                    )}
                                    {m.comment && m.comment.trim().length > 0 && (
                                        <p className="mt-2 text-sm text-white/90 italic">&quot;{m.comment}&quot;</p>
                                    )}
                                    {m.intro && m.intro.trim().length > 0 ? (
                                        <p className="mt-2 text-sm leading-relaxed text-white/85">{m.intro}</p>
                                    ) : (
                                        <p className="mt-2 text-sm text-white/50 italic">소개가 곧 업데이트됩니다.</p>
                                    )}
                                    <div className="mt-3">
                                        <Contact member={m}/>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
