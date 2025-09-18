import fs from "fs";
import path from "path";
import ContentsClient, {type ContentItem as ClientContentItem} from "./ContentsClient";

interface ContentItem {
    id: string;
    title: string;
    date: string; // e.g., "2025.05"
    description: string;
    isSelf?: boolean;
}

function loadContents(): ContentItem[] {
    const filePath = path.join(process.cwd(), "public", "content", "contents.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const list: ContentItem[] = JSON.parse(raw);
    // Sort by date string in format "YYYY.MM" descending (most recent first)
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

export default function ContentsPage() {
    const contents = loadContents();
    return <ContentsClient items={contents as ClientContentItem[]}/>;
}
