// ─────────────────────────────────────────
// Leaf (Loại lá)
// ─────────────────────────────────────────
export type LeafType =
    | "bodhi"       // lá bồ đề
    | "maple"       // lá phong
    | "lotus"       // lá sen
    | "fern"        // lá dương xỉ
    | "other";

export interface Leaf {
    id: string;
    type: LeafType;
    name: string;           // "Lá Bồ Đề"
    nameEn: string;         // "Bodhi Leaf"
    description: string;
    imageUrl: string;
    availableSizes: LeafSize[];
    isAvailable: boolean;
}

export interface LeafSize {
    id: string;
    label: string;          // "Nhỏ (10x15cm)"
    widthCm: number;
    heightCm: number;
    priceExtra: number;     // thêm bao nhiêu so với giá base
}

// ─────────────────────────────────────────
// Product (Sản phẩm có sẵn trong Shop)
// ─────────────────────────────────────────
export type ProductStatus = "available" | "sold" | "reserved";

export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    images: string[];       // mảng URL
    leafType: LeafType;
    size: LeafSize;
    status: ProductStatus;
    tags: string[];
    createdAt: string;
    isFeatured: boolean;
}

// ─────────────────────────────────────────
// Custom Order (Đặt tranh theo yêu cầu)
// ─────────────────────────────────────────
export type OrderStatus =
    | "pending_payment"
    | "confirmed"
    | "in_production"
    | "completed"
    | "shipped"
    | "delivered"
    | "cancelled";

export interface CustomOrderItem {
    leafId: string;
    leafName: string;
    sizeId: string;
    sizeLabel: string;
    quantity: number;
    unitPrice: number;
    userImageUrl: string;   // ảnh khách upload lên Cloudinary
    previewImageUrl: string; // ảnh preview sau khi blend
    note?: string;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    email: string;
    addressLine: string;
    ward: string;
    district: string;
    province: string;
}

export interface Order {
    id: string;
    orderCode: string;      // VD: "LA-20240315-001"
    userId?: string;        // optional nếu guest checkout
    items: CustomOrderItem[];
    shippingAddress: ShippingAddress;
    subtotal: number;
    shippingFee: number;
    total: number;
    status: OrderStatus;
    stripePaymentIntentId?: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
    estimatedDelivery?: string;
}

// ─────────────────────────────────────────
// Cart
// ─────────────────────────────────────────
export interface CartItem {
    id: string;             // unique id trong cart
    type: "custom" | "ready-made";
    productId?: string;     // nếu là ready-made
    leafId?: string;        // nếu là custom
    leafName: string;
    sizeLabel: string;
    quantity: number;
    unitPrice: number;
    userImageUrl?: string;
    previewImageUrl?: string;
    note?: string;
}

// ─────────────────────────────────────────
// Blog
// ─────────────────────────────────────────
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;        // MDX content
    coverImage: string;
    author: string;
    publishedAt: string;
    tags: string[];
    readingTimeMinutes: number;
    isFeatured: boolean;
}

// ─────────────────────────────────────────
// User / Auth
// ─────────────────────────────────────────
export interface UserProfile {
    id: string;
    email: string;
    fullName?: string;
    phone?: string;
    avatarUrl?: string;
    createdAt: string;
}

// ─────────────────────────────────────────
// Preview Tool
// ─────────────────────────────────────────
export interface PreviewConfig {
    userImageUrl: string;
    leafId: string;
    positionX: number;      // 0-100 (%)
    positionY: number;
    scale: number;          // 0.5 - 2.0
    opacity: number;        // 0 - 1
    contrast: number;       // 0.5 - 1.5
}

// ─────────────────────────────────────────
// API Response
// ─────────────────────────────────────────
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}