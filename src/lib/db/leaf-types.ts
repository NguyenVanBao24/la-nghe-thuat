import { supabase } from "@/lib/supabase";
import {type Leaf, type LeafSize, LeafType} from "@/types";

interface LeafSizeRow {
    id:          string;
    label:       string;
    width_cm:    number;
    height_cm:   number;
    price_extra: number;
}

interface LeafTypeRow {
    id:           string;
    type:         string;
    name:         string;
    name_en:      string;
    description:  string | null;
    image_url:    string | null;
    is_available: boolean;
    leaf_sizes:   LeafSizeRow[];
}

export async function getLeafTypes(): Promise<Leaf[]> {
    const { data, error } = await supabase
        .from("leaf_types")
        .select(`
      *,
      leaf_sizes (*)
    `)
        .eq("is_available", true)
        .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);

    return (data as LeafTypeRow[] ?? []).map((row) => ({
        id:          row.id,
        type:        row.type as LeafType,
        name:        row.name,
        nameEn:      row.name_en,
        description: row.description ?? "",
        imageUrl:    row.image_url ?? "",
        isAvailable: row.is_available,
        availableSizes: (row.leaf_sizes ?? []).map((s) => ({
            id:         s.id,
            label:      s.label,
            widthCm:    s.width_cm,
            heightCm:   s.height_cm,
            priceExtra: s.price_extra,
        })) as LeafSize[],
    }));
}