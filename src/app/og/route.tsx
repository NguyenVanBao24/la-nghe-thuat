import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title       = searchParams.get("title") ?? "Lá Nghệ Thuật";
    const description = searchParams.get("desc")  ?? "Tranh lá tự nhiên handmade";

    return new ImageResponse(
        (
            <div
                style={{
                    width:           "100%",
                    height:          "100%",
                    display:         "flex",
                    flexDirection:   "column",
                    alignItems:      "center",
                    justifyContent:  "center",
                    backgroundColor: "#F5EDD6",
                    padding:         "60px",
                }}
            >
                {/* Background decoration */}
                <div
                    style={{
                        position:        "absolute",
                        top:             -100,
                        right:           -100,
                        width:           400,
                        height:          400,
                        borderRadius:    "50%",
                        backgroundColor: "#E8F2EC",
                        opacity:         0.6,
                        display:         "flex",
                    }}
                />
                <div
                    style={{
                        position:        "absolute",
                        bottom:          -80,
                        left:            -80,
                        width:           300,
                        height:          300,
                        borderRadius:    "50%",
                        backgroundColor: "#C9A96E",
                        opacity:         0.2,
                        display:         "flex",
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display:        "flex",
                        flexDirection:  "column",
                        alignItems:     "center",
                        gap:            "24px",
                        zIndex:         1,
                        textAlign:      "center",
                    }}
                >
                    <div style={{ fontSize: 80, display: "flex" }}>🍃</div>

                    <div
                        style={{
                            fontSize:   "12px",
                            color:      "#4A7C59",
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                            display:    "flex",
                        }}
                    >
                        LÁ NGHỆ THUẬT · LEAF ART STUDIO
                    </div>

                    <div
                        style={{
                            fontSize:   title.length > 30 ? "42px" : "52px",
                            fontWeight: "bold",
                            color:      "#1C1C1A",
                            lineHeight: 1.2,
                            maxWidth:   "800px",
                            display:    "flex",
                        }}
                    >
                        {title}
                    </div>

                    {description && (
                        <div
                            style={{
                                fontSize:  "24px",
                                color:     "#6B6B5E",
                                maxWidth:  "700px",
                                display:   "flex",
                            }}
                        >
                            {description}
                        </div>
                    )}
                </div>

            </div>
        ),
        {
            width:  1200,
            height: 630,
        }
    );
}