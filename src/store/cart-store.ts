import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartItem } from "@/types";

interface CartStore {
    items: CartItem[];
    addItem:    (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQty:  (id: string, qty: number) => void;
    clearCart:  () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const existing = get().items.find((i) => i.id === item.id);
                if (existing) {
                    set((state) => ({
                        items: state.items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    }));
                } else {
                    set((state) => ({ items: [...state.items, item] }));
                }
            },

            removeItem: (id) =>
                set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

            updateQty: (id, qty) => {
                if (qty <= 0) {
                    get().removeItem(id);
                    return;
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: qty } : i
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
        }),
        { name: "leaf-art-cart" }
    )
);