import { generatePageMetadata } from "@/lib/metadata";
import { RegisterClient } from "@/components/auth/register-client";

export const metadata = generatePageMetadata({
    title: "Đăng Ký",
    path:  "/register",
});

export default function RegisterPage() {
    return <RegisterClient />;
}