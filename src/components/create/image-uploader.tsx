"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Text, LabelText } from "@/components/ui";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
    uploadedImage: string | null;
    onChange: (imageUrl: string | null) => void;
}

export function ImageUploader({ uploadedImage, onChange }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFile(file: File) {
        // Validate
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("Chỉ chấp nhận file JPG, PNG hoặc WEBP");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("File không được vượt quá 10MB");
            return;
        }
        // Tạm thời dùng object URL để preview — sau sẽ upload lên Cloudinary
        const url = URL.createObjectURL(file);
        onChange(url);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }

    return (
        <div className="bg-white rounded-lg border border-border p-5 flex flex-col gap-4">
            <LabelText accent>Ảnh Của Bạn</LabelText>

            {uploadedImage ? (
                // Đã có ảnh
                <div className="relative rounded-md overflow-hidden aspect-square">
                    <img
                        src={uploadedImage}
                        alt="Ảnh đã tải lên"
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
                        aria-label="Xoá ảnh"
                    >
                        <X size={14} className="text-text-primary" />
                    </button>
                </div>
            ) : (
                // Chưa có ảnh — drag & drop zone
                <button
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={cn(
                        "aspect-square rounded-md border-2 border-dashed border-border",
                        "flex flex-col items-center justify-center gap-3",
                        "hover:border-primary hover:bg-primary-light/30",
                        "transition-all duration-150 cursor-pointer"
                    )}
                >
                    <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                        <ImageIcon size={22} className="text-text-muted" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Text size="sm" className="font-medium text-text-primary flex items-center gap-1.5">
                            <Upload size={14} />
                            Tải ảnh lên
                        </Text>
                        <Text size="sm" muted>hoặc kéo thả vào đây</Text>
                        <Text size="sm" muted>JPG, PNG, WEBP · Tối đa 10MB</Text>
                    </div>
                </button>
            )}

            {/* Input ẩn */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleInputChange}
            />
        </div>
    );
}