import { createServerClient } from "@/lib/supabase";
import { type CartItem, type ShippingAddress } from "@/types";

interface CreateOrderPayload {
    items:                 CartItem[];
    shippingAddress:       ShippingAddress;
    stripePaymentIntentId: string;
    subtotal:              number;
    shippingFee:           number;
    total:                 number;
    userId?:               string;
    note?:                 string;
}

export async function createOrder(payload: CreateOrderPayload): Promise<string> {
    const supabase = createServerClient();

    // Tạo order code
    const { data: codeData, error: codeError } = await supabase
        .rpc("generate_order_code");

    if (codeError) throw new Error(codeError.message);
    const orderCode = codeData as string;

    // Insert order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            order_code:               orderCode,
            user_id:                  payload.userId ?? null,
            status:                   "confirmed",
            subtotal:                 payload.subtotal,
            shipping_fee:             payload.shippingFee,
            total:                    payload.total,
            stripe_payment_intent_id: payload.stripePaymentIntentId,
            note:                     payload.note ?? null,
        })
        .select()
        .single();

    if (orderError) throw new Error(orderError.message);

    // Insert order items
    const orderItems = payload.items.map((item) => ({
        order_id:          order.id,
        leaf_name:         item.leafName,
        size_label:        item.sizeLabel,
        quantity:          item.quantity,
        unit_price:        item.unitPrice,
        user_image_url:    item.userImageUrl    ?? null,
        preview_image_url: item.previewImageUrl ?? null,
        note:              item.note            ?? null,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (itemsError) throw new Error(itemsError.message);

    // Insert shipping address
    const { error: addressError } = await supabase
        .from("shipping_addresses")
        .insert({
            order_id:     order.id,
            full_name:    payload.shippingAddress.fullName,
            phone:        payload.shippingAddress.phone,
            email:        payload.shippingAddress.email,
            address_line: payload.shippingAddress.addressLine,
            ward:         payload.shippingAddress.ward,
            district:     payload.shippingAddress.district,
            province:     payload.shippingAddress.province,
        });

    if (addressError) throw new Error(addressError.message);

    return orderCode;
}

export async function getOrderByCode(orderCode: string) {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("orders")
        .select(`
      *,
      order_items (*),
      shipping_addresses (*)
    `)
        .eq("order_code", orderCode)
        .single();

    if (error) return null;
    return data;
}

export async function getOrdersByUserId(userId: string) {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("orders")
        .select(`
      *,
      order_items (*),
      shipping_addresses (*)
    `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
}