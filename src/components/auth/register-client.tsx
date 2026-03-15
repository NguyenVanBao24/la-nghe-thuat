"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { Input } from "@/components/ui";
import { signUp } from "@/lib/auth";

export function RegisterClient() {
    const [form, setForm] = useState({
        fullName: "",
        email:    "",
        password: "",
        confirm:  "",
    });
    const [error, setError]         = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone]       = useState(false);

    function handleChange(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        setError(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (form.password !== form.confirm) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }
        if (form.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await signUp({
                email:    form.email,
                password: form.password,
                fullName: form.fullName,
            });
            setIsDone(true);
        } catch {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isDone) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center py-20">
                <Container size="sm" className="max-w-md">
                    <Card className="p-8 flex flex-col items-center gap-6 text-center">
                        <span className="text-6xl">✉️</span>
                        <div className="flex flex-col gap-2">
                            <Heading as="h2" size="md">Kiểm Tra Email</Heading>
                            <Text muted>
                                Chúng tôi đã gửi link xác nhận đến{" "}
                                <span className="font-medium text-text-primary">{form.email}</span>.
                                Vui lòng kiểm tra hộp thư và click vào link để kích hoạt tài khoản.
                            </Text>
                        </div>
                        <Link href="/login" className="text-primary hover:underline font-medium text-sm">
                            Quay lại đăng nhập
                        </Link>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center py-20">
            <Container size="sm" className="max-w-md">
                <Card className="p-8 flex flex-col gap-6">

                    <div className="flex flex-col items-center gap-2 text-center">
                        <Link href="/" className="font-serif text-2xl font-medium text-text-primary">
                            Lá Nghệ Thuật
                        </Link>
                        <LabelText accent>Tạo tài khoản mới</LabelText>
                        <Heading as="h1" size="md">Đăng Ký</Heading>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Họ và tên"
                            placeholder="Nguyễn Văn A"
                            value={form.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            required
                        />
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
                            placeholder="Ít nhất 6 ký tự"
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                        />
                        <Input
                            label="Xác nhận mật khẩu"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={form.confirm}
                            onChange={(e) => handleChange("confirm", e.target.value)}
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
                            Tạo Tài Khoản
                        </Button>
                    </form>

                    <Text size="sm" muted className="text-center">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Đăng nhập
                        </Link>
                    </Text>

                </Card>
            </Container>
        </div>
    );
}