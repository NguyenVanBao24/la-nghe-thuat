import { supabase } from "@/lib/supabase";
import { type Product, type LeafType, type ProductStatus } from "@/types";

interface LeafTypeRef {
    type: string;
    name: string;
}

interface LeafSizeRef {
    id:          string;
    label:       string;
    width_cm:    number;
    height_cm:   number;
    price_extra: number;
}

interface ProductRow {
    id:          string;
    slug:        string;
    title:       string;
    description: string | null;
    price:       number;
    images:      string[];
    status:      string;
    tags:        string[];
    is_featured: boolean;
    created_at:  string;
    updated_at:  string;
    leaf_types:  LeafTypeRef | null;
    leaf_sizes:  LeafSizeRef | null;
}

function mapProduct(row: ProductRow): Product {
    return {
        id:          row.id,
        slug:        row.slug,
        title:       row.title,
        description: row.description ?? "",
        price:       row.price,
        images:      row.images ?? [],
        leafType:    row.leaf_types?.type as LeafType,
        size: {
            id:         row.leaf_sizes?.id         ?? "",
            label:      row.leaf_sizes?.label      ?? "",
            widthCm:    row.leaf_sizes?.width_cm   ?? 0,
            heightCm:   row.leaf_sizes?.height_cm  ?? 0,
            priceExtra: row.leaf_sizes?.price_extra ?? 0,
        },
        status:     row.status as ProductStatus,
        tags:       row.tags ?? [],
        createdAt:  row.created_at,
        isFeatured: row.is_featured,
    };
}

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      leaf_types ( type, name ),
      leaf_sizes ( id, label, width_cm, height_cm, price_extra )
    `)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as ProductRow[] ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      leaf_types ( type, name ),
      leaf_sizes ( id, label, width_cm, height_cm, price_extra )
    `)
        .eq("slug", slug)
        .single();

    if (error) return null;
    return mapProduct(data as ProductRow);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select(`
      *,
      leaf_types ( type, name ),
      leaf_sizes ( id, label, width_cm, height_cm, price_extra )
    `)
        .eq("is_featured", true)
        .eq("status", "available")
        .limit(6);

    if (error) throw new Error(error.message);
    return (data as ProductRow[] ?? []).map(mapProduct);
}