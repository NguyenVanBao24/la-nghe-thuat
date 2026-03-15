"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { Input } from "@/components/ui";
import { type ShippingAddress } from "@/types";
import { ArrowRight } from "lucide-react";

const initialAddress: ShippingAddress = {
    fullName:    "",
    phone:       "",
    email:       "",
    addressLine: "",
    ward:        "",
    district:    "",
    province:    "",
};

interface ShippingFormProps {
    onSubmit: (address: ShippingAddress) => void;
}

export function ShippingForm({ onSubmit }: ShippingFormProps) {
    const [address, setAddress] = useState<ShippingAddress>(initialAddress);
    const [errors, setErrors]   = useState<Partial<ShippingAddress>>({});

    function handleChange(field: keyof ShippingAddress, value: string) {
        setAddress((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }

    function validate(): boolean {
        const newErrors: Partial<ShippingAddress> = {};
        if (!address.fullName.trim())    newErrors.fullName    = "Vui lòng nhập họ tên";
        if (!address.phone.trim())       newErrors.phone       = "Vui lòng nhập số điện thoại";
        if (!address.email.trim())       newErrors.email       = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email))
            newErrors.email       = "Email không hợp lệ";
        if (!address.addressLine.trim()) newErrors.addressLine = "Vui lòng nhập địa chỉ";
        if (!address.ward.trim())        newErrors.ward        = "Vui lòng nhập phường/xã";
        if (!address.district.trim())    newErrors.district    = "Vui lòng nhập quận/huyện";
        if (!address.province.trim())    newErrors.province    = "Vui lòng nhập tỉnh/thành phố";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate()) onSubmit(address);
    }

    return (
        <Card className="p-6 flex flex-col gap-6">
            <Heading as="h2" size="sm">Thông Tin Giao Hàng</Heading>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Thông tin cá nhân */}
                <div className="flex flex-col gap-4">
                    <Text className="font-medium text-text-primary text-sm">Thông tin người nhận</Text>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Họ và tên"
                            placeholder="Nguyễn Văn A"
                            value={address.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            error={errors.fullName}
                            required
                        />
                        <Input
                            label="Số điện thoại"
                            type="tel"
                            placeholder="0901 234 567"
                            value={address.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            error={errors.phone}
                            required
                        />
                    </div>
                    <Input
                        label="Email nhận xác nhận đơn hàng"
                        type="email"
                        placeholder="email@example.com"
                        value={address.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={errors.email}
                        required
                    />
                </div>

                {/* Địa chỉ */}
                <div className="flex flex-col gap-4">
                    <Text className="font-medium text-text-primary text-sm">Địa chỉ giao hàng</Text>
                    <Input
                        label="Số nhà, tên đường"
                        placeholder="123 Đường Lê Lợi"
                        value={address.addressLine}
                        onChange={(e) => handleChange("addressLine", e.target.value)}
                        error={errors.addressLine}
                        required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                            label="Phường / Xã"
                            placeholder="Phường Tân Lập"
                            value={address.ward}
                            onChange={(e) => handleChange("ward", e.target.value)}
                            error={errors.ward}
                            required
                        />
                        <Input
                            label="Quận / Huyện"
                            placeholder="TP. Nha Trang"
                            value={address.district}
                            onChange={(e) => handleChange("district", e.target.value)}
                            error={errors.district}
                            required
                        />
                        <Input
                            label="Tỉnh / Thành phố"
                            placeholder="Khánh Hoà"
                            value={address.province}
                            onChange={(e) => handleChange("province", e.target.value)}
                            error={errors.province}
                            required
                        />
                    </div>
                </div>

                <Button type="submit" size="lg" className="gap-2 self-end">
                    Tiếp Tục Thanh Toán
                    <ArrowRight size={16} />
                </Button>

            </form>
        </Card>
    );
}