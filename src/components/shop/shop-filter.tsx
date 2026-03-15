import { cn } from "@/lib/utils";
import { Text } from "@/components/ui";
import { type ShopFilterType, type ShopSortType, type StatusFilterType } from "./shop-client";

const leafFilters: { value: ShopFilterType; label: string }[] = [
    { value: "all",   label: "Tất Cả"       },
    { value: "bodhi", label: "Lá Bồ Đề"    },
    { value: "maple", label: "Lá Phong"     },
    { value: "lotus", label: "Lá Sen"       },
    { value: "fern",  label: "Lá Dương Xỉ"  },
];

const sorts: { value: ShopSortType; label: string }[] = [
    { value: "newest",     label: "Mới nhất"     },
    { value: "price-asc",  label: "Giá tăng dần"  },
    { value: "price-desc", label: "Giá giảm dần"  },
];

interface ShopFilterProps {
    leafFilter: ShopFilterType;
    statusFilter: StatusFilterType;
    sort: ShopSortType;
    total: number;
    onLeafFilterChange: (f: ShopFilterType) => void;
    onStatusFilterChange: (f: StatusFilterType) => void;
    onSortChange: (s: ShopSortType) => void;
}

export function ShopFilter({
                               leafFilter,
                               statusFilter,
                               sort,
                               total,
                               onLeafFilterChange,
                               onStatusFilterChange,
                               onSortChange,
                           }: ShopFilterProps) {
    return (
        <div className="flex flex-col gap-4">

            {/* Row 1: leaf filter + status toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Leaf filter pills */}
                <div className="flex items-center gap-2 flex-wrap flex-1">
                    {leafFilters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => onLeafFilterChange(f.value)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150",
                                leafFilter === f.value
                                    ? "bg-primary text-white"
                                    : "bg-surface text-text-secondary border border-border hover:border-primary/40"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Status toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                        className={cn(
                            "w-10 h-6 rounded-full transition-colors duration-200 relative",
                            statusFilter === "available" ? "bg-primary" : "bg-border"
                        )}
                        onClick={() =>
                            onStatusFilterChange(
                                statusFilter === "available" ? "all" : "available"
                            )
                        }
                    >
                        <div
                            className={cn(
                                "absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                                statusFilter === "available" ? "translate-x-5" : "translate-x-1"
                            )}
                        />
                    </div>
                    <Text size="sm" className="font-medium text-text-secondary">
                        Chỉ còn hàng
                    </Text>
                </label>
            </div>

            {/* Row 2: sort + count */}
            <div className="flex items-center justify-between">
                <Text size="sm" muted>{total} sản phẩm</Text>
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as ShopSortType)}
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