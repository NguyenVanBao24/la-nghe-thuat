import { generatePageMetadata } from "@/lib/metadata";
import { LoginClient } from "@/components/auth/login-client";

export const metadata = generatePageMetadata({
    title: "Đăng Nhập",
    path:  "/login",
});

export default function LoginPage() {
    return <LoginClient />;
}