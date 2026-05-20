import { Metadata } from "next";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const siteUrl = "https://inknation.in"; // Replace with client's actual production domain if needed

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/og-image.jpg"
}: MetadataInput): Metadata {
  const fullTitle = `${title} | Ink Nation Tattoo Studio Bangalore & Mysore`;
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description: description.substring(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: canonicalUrl,
      siteName: "Ink Nation Tattoo Studio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
