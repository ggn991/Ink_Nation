import React from "react";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TattooParlor",
        "@id": "https://inknation.in/#bangalore-studio",
        "name": "Ink Nation Tattoo Studio - Bangalore",
        "image": "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800",
        "url": "https://inknation.in",
        "telephone": "+919876543210",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1st Floor, 20th Main Rd, above Sangeetha Mobiles, opp. Airtel Showroom, KHB Colony, 5th Block, Koramangala",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560095",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.9361184",
          "longitude": "77.6161049"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "21:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1200",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "TattooParlor",
        "@id": "https://inknation.in/#mysore-studio",
        "name": "Ink Nation Tattoo Studio - Mysore",
        "image": "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800",
        "url": "https://inknation.in",
        "telephone": "08735097898",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "F-225, Near Ganesha Temple, 1st Floor, 1st Main Road, Gokulam 2nd Stage",
          "addressLocality": "Mysore",
          "addressRegion": "Karnataka",
          "postalCode": "570002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.29656",
          "longitude": "76.628964"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:15",
          "closes": "21:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "650",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface FAQPageSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQPageSchema({ questions }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleSchemaProps {
  title: string;
  slug: string;
  summary: string;
  image: string;
  datePublished: string;
  authorName: string;
}

export function ArticleSchema({
  title,
  slug,
  summary,
  image,
  datePublished,
  authorName
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": image,
    "datePublished": new Date(datePublished).toISOString(),
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ink Nation Tattoo Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://inknation.in/logo.png"
      }
    },
    "description": summary,
    "mainEntityOfPage": `https://inknation.in/blog/${slug}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ImageGallerySchemaProps {
  images: { url: string; caption: string }[];
}

export function ImageGallerySchema({ images }: ImageGallerySchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "associatedMedia": images.map((img) => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "caption": img.caption
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbSchemaProps {
  items: { name: string; item: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `https://inknation.in${it.item}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
