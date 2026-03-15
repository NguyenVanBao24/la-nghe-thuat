import { create } from "zustand";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthStore {
    user:       User | null;
    isLoading:  boolean;
    setUser:    (user: User | null) => void;
    initialize: () => Promise<void>;
    signOut:    () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user:      null,
    isLoading: true,

    setUser: (user) => set({ user }),

    initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        set({ user: session?.user ?? null, isLoading: false });

        // Lắng nghe thay đổi auth state
        supabase.auth.onAuthStateChange((_event, session) => {
            set({ user: session?.user ?? null });
        });
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    },
}));