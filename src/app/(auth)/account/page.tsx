import { generatePageMetadata } from "@/lib/metadata";
import { AccountClient } from "@/components/account/account-client";

export const metadata = generatePageMetadata({
    title: "Tài Khoản",
    path:  "/account",
});

export default function AccountPage() {
    return <AccountClient />;
}