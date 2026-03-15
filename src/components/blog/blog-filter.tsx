import { cn } from "@/lib/utils";

interface BlogFilterProps {
    tags: string[];
    active: string;
    onChange: (tag: string) => void;
}

const tagLabels: Record<string, string> = {
    all:        "Tất Cả",
    "văn hoá":  "Văn Hoá",
    "hướng dẫn":"Hướng Dẫn",
    "kiến thức":"Kiến Thức",
    "quà tặng": "Quà Tặng",
    "handmade": "Handmade",
    "quy trình":"Quy Trình",
};

export function BlogFilter({ tags, active, onChange }: BlogFilterProps) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onChange(tag)}
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                        active === tag
                            ? "bg-primary text-white"
                            : "bg-surface text-text-secondary border border-border hover:border-primary/40"
                    )}
                >
                    {tagLabels[tag] ?? tag}
                </button>
            ))}
        </div>
    );
}