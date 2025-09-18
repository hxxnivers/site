import fs from "fs";
import path from "path";
import Link from "next/link";

interface ContentItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

function loadContents(): ContentItem[] {
  const filePath = path.join(process.cwd(), "public", "content", "contents.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const list: ContentItem[] = JSON.parse(raw);
  const toKey = (d: string): number => {
    if (!d) return 0;
    const [yStr, mStr] = d.split(".");
    const y = Number(yStr);
    const m = Number(mStr || "1");
    if (!Number.isFinite(y)) return 0;
    const monthIndex = Number.isFinite(m) ? Math.max(1, Math.min(12, m)) - 1 : 0;
    return new Date(y, monthIndex, 1).getTime();
  };
  return [...list].sort((a, b) => toKey(b.date) - toKey(a.date));
}

export default function ContentsViewerPage() {
  const contents = loadContents();

  return (
    <div className="mx-auto max-w-[100vw] px-0">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold">뷰페이저</h1>
        <Link href="/contents" className="text-sm underline text-blue-600">그리드 보기</Link>
      </div>

      {/* Horizontal snap pager with background screenshot restored */}
      <div className="w-screen overflow-x-auto snap-x snap-mandatory flex no-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
        {contents.map((item, idx) => {
          const bgUrl = `/content/${item.id}/background.jpg`;
          return (
            <Link
              key={idx}
              href={`/contents/${item.id}`}
              className="snap-start shrink-0 w-screen h-[80vh] sm:h-[85vh] relative block"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-center bg-contain bg-no-repeat bg-black"
                style={{ backgroundImage: `url(${bgUrl})` }}
              />
              {/* Dim */}
              <div className="absolute inset-0 bg-black/50" />
              {/* Caption */}
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-bold mb-4">{item.title}</h2>
                  <p className="max-w-3xl mx-auto whitespace-pre-line opacity-90">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
