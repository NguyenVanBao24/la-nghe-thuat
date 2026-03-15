import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const ALLOWED_TYPES  = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file     = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "Không có file" },
                { status: 400 }
            );
        }

        // Validate type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Chỉ chấp nhận JPG, PNG, WEBP" },
                { status: 400 }
            );
        }

        // Validate size
        if (file.size > MAX_SIZE_BYTES) {
            return NextResponse.json(
                { error: "File không được vượt quá 10MB" },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        // Tạo tên file unique
        const ext      = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `user-uploads/${fileName}`;

        // Upload lên Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const { error: uploadError } = await supabase.storage
            .from("artwork-images")
            .upload(filePath, arrayBuffer, {
                contentType: file.type,
                upsert:      false,
            });

        if (uploadError) throw new Error(uploadError.message);

        // Lấy public URL
        const { data: urlData } = supabase.storage
            .from("artwork-images")
            .getPublicUrl(filePath);

        return NextResponse.json({
            url:      urlData.publicUrl,
            filePath,
        });

    } catch (error) {
        console.error("[POST /api/upload]", error);
        return NextResponse.json(
            { error: "Upload thất bại" },
            { status: 500 }
        );
    }
}