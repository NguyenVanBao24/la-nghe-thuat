import { cn } from "@/lib/utils";
import { Text, LabelText } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { type LeafSize } from "@/types";

interface SizeSelectorProps {
    sizes: LeafSize[];
    selected: LeafSize;
    basePrice: number;
    onChange: (size: LeafSize) => void;
}

export function SizeSelector({ sizes, selected, basePrice, onChange }: SizeSelectorProps) {
    return (
        <div className="bg-white rounded-lg border border-border p-5 flex flex-col gap-4">
            <LabelText accent>Chọn Kích Thước</LabelText>
            <div className="flex flex-col gap-2">
                {sizes.map((size) => {
                    const isSelected = size.id === selected.id;
                    const price = basePrice + size.priceExtra;
                    return (
                        <button
                            key={size.id}
                            onClick={() => onChange(size)}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-md border-2 text-left transition-all duration-150",
                                isSelected
                                    ? "border-primary bg-primary-light"
                                    : "border-border hover:border-primary/40 hover:bg-surface"
                            )}
                        >
                            <Text className={cn(
                                "text-sm font-medium",
                                isSelected ? "text-primary" : "text-text-primary"
                            )}>
                                {size.label}
                            </Text>
                            <Text className={cn(
                                "text-sm font-medium",
                                isSelected ? "text-primary" : "text-text-secondary"
                            )}>
                                {formatPrice(price)}
                            </Text>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}