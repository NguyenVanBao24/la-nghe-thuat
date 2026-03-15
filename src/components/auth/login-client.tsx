"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { Input } from "@/components/ui";
import { signIn } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";

export function LoginClient() {
    const router  = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [form, setForm]       = useState({ email: "", password: "" });
    const [error, setError]     = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        setError(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { user } = await signIn(form);
            if (user) setUser(user);
            router.push("/account");
        } catch {
            setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center py-20">
            <Container size="sm" className="max-w-md">
                <Card className="p-8 flex flex-col gap-6">

                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Link href="/" className="font-serif text-2xl font-medium text-text-primary">
                            Lá Nghệ Thuật
                        </Link>
                        <LabelText accent>Chào mừng trở lại</LabelText>
                        <Heading as="h1" size="md">Đăng Nhập</Heading>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                        />
                        <Input
                            label="Mật khẩu"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                        />

                        {error && (
                            <div className="p-3 rounded-md bg-red-50 border border-red-200">
                                <Text size="sm" className="text-red-600">{error}</Text>
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Đăng Nhập
                        </Button>
                    </form>

                    {/* Links */}
                    <div className="flex flex-col items-center gap-3">
                        <Text size="sm" muted>
                            Chưa có tài khoản?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Đăng ký ngay
                            </Link>
                        </Text>
                        <Link href="/" className="text-sm text-text-muted hover:text-primary transition-colors">
                            Tiếp tục không cần đăng nhập
                        </Link>
                    </div>

                </Card>
            </Container>
        </div>
    );
}