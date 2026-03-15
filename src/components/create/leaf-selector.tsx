import { cn } from "@/lib/utils";
import { Text, LabelText } from "@/components/ui";
import { Check } from "lucide-react";
import { type Leaf } from "@/types";

const leafEmojis: Record<string, string> = {
    bodhi: "🍃",
    maple: "🍁",
    lotus: "🌿",
    fern:  "🌱",
    other: "🍀",
};

interface LeafSelectorProps {
    leaves: Leaf[];
    selected: Leaf;
    onChange: (leaf: Leaf) => void;
}

export function LeafSelector({ leaves, selected, onChange }: LeafSelectorProps) {
    return (
        <div className="bg-white rounded-lg border border-border p-5 flex flex-col gap-4">
            <LabelText accent>Chọn Loại Lá</LabelText>
            <div className="flex flex-col gap-2">
                {leaves.map((leaf) => {
                    const isSelected = leaf.id === selected.id;
                    return (
                        <button
                            key={leaf.id}
                            onClick={() => onChange(leaf)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-md border-2 text-left transition-all duration-150",
                                isSelected
                                    ? "border-primary bg-primary-light"
                                    : "border-border hover:border-primary/40 hover:bg-surface"
                            )}
                        >
                            <span className="text-2xl">{leafEmojis[leaf.type]}</span>
                            <div className="flex-1 min-w-0">
                                <Text className={cn(
                                    "font-medium text-sm",
                                    isSelected ? "text-primary" : "text-text-primary"
                                )}>
                                    {leaf.name}
                                </Text>
                                <Text size="sm" muted className="truncate">{leaf.description}</Text>
                            </div>
                            {isSelected && (
                                <Check size={16} className="text-primary flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}