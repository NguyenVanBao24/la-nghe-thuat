import { cn } from "@/lib/utils";
import { Text } from "@/components/ui";
import { type FilterType, type SortType } from "./gallery-client";

const filters: { value: FilterType; label: string }[] = [
    { value: "all",   label: "Tất Cả"      },
    { value: "bodhi", label: "Lá Bồ Đề"   },
    { value: "maple", label: "Lá Phong"    },
    { value: "lotus", label: "Lá Sen"      },
    { value: "fern",  label: "Lá Dương Xỉ" },
];

const sorts: { value: SortType; label: string }[] = [
    { value: "newest",     label: "Mới nhất"    },
    { value: "price-asc",  label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
];

interface GalleryFilterProps {
    filter: FilterType;
    sort: SortType;
    total: number;
    onFilterChange: (f: FilterType) => void;
    onSortChange: (s: SortType) => void;
}

export function GalleryFilter({
                                  filter,
                                  sort,
                                  total,
                                  onFilterChange,
                                  onSortChange,
                              }: GalleryFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => onFilterChange(f.value)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150",
                            filter === f.value
                                ? "bg-primary text-white"
                                : "bg-surface text-text-secondary border border-border hover:border-primary/40"
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-4">
                <Text size="sm" muted>{total} tác phẩm</Text>
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as SortType)}
                    className="text-sm font-sans text-text-secondary bg-white border border-border rounded-sm px-3 py-1.5 focus:outline-none focus:border-primary"
                >
                    {sorts.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

        </div>
    );
}