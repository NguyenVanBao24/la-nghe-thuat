const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? "https://leafora.vn";
const siteName = "Lá Nghệ Thuật";

// LocalBusiness — dùng cho trang About, Home
export function localBusinessJsonLd() {
    return {
        "@context":   "https://schema.org",
        "@type":      "LocalBusiness",
        name:         siteName,
        description:  "Xưởng tranh lá tự nhiên handmade tại Nha Trang",
        url:          appUrl,
        telephone:    "+84901234567",
        email:        "hello@langhethuat.vn",
        address: {
            "@type":           "PostalAddress",
            addressLocality:   "Nha Trang",
            addressRegion:     "Khánh Hoà",
            addressCountry:    "VN",
        },
        geo: {
            "@type":     "GeoCoordinates",
            latitude:    12.2388,
            longitude:   109.1967,
        },
        openingHoursSpecification: {
            "@type":      "OpeningHoursSpecification",
            dayOfWeek:    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens:        "08:00",
            closes:       "17:00",
        },
        sameAs: [
            "https://facebook.com/langhethuat",
            "https://instagram.com/langhethuat",
        ],
    };
}

// Product — dùng cho trang product detail
export function productJsonLd({
                                  name,
                                  description,
                                  price,
                                  image,
                                  slug,
                                  availability,
                              }: {
    name:         string;
    description:  string;
    price:        number;
    image:        string;
    slug:         string;
    availability: "InStock" | "OutOfStock";
}) {
    return {
        "@context":   "https://schema.org",
        "@type":      "Product",
        name,
        description,
        image,
        brand: {
            "@type": "Brand",
            name:    siteName,
        },
        offers: {
            "@type":        "Offer",
            price:          price / 100,
            priceCurrency:  "VND",
            availability:   `https://schema.org/${availability}`,
            url:            `${appUrl}/shop/${slug}`,
            seller: {
                "@type": "Organization",
                name:    siteName,
            },
        },
    };
}

// Article — dùng cho blog post
export function articleJsonLd({
                                  title,
                                  excerpt,
                                  author,
                                  publishedAt,
                                  slug,
                              }: {
    title:       string;
    excerpt:     string;
    author:      string;
    publishedAt: string;
    slug:        string;
}) {
    return {
        "@context":        "https://schema.org",
        "@type":           "Article",
        headline:          title,
        description:       excerpt,
        author: {
            "@type": "Person",
            name:    author,
        },
        publisher: {
            "@type": "Organization",
            name:    siteName,
            url:     appUrl,
        },
        datePublished: publishedAt,
        url:           `${appUrl}/blog/${slug}`,
    };
}

// BreadcrumbList
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type":    "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type":   "ListItem",
            position:  index + 1,
            name:      item.name,
            item:      item.url,
        })),
    };
}