import { Branch } from "@/lib/data/branches";

// Organization schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ink Nation Tattoo Studio",
    "url": "https://inknation.in",
    "logo": "https://inknation.in/logo.png",
    "sameAs": [
      "https://www.instagram.com/ink_nation_tattooz",
    ]
  };
}

// LocalBusiness schema for physical branches
export function getLocalBusinessSchema(branch: Branch) {
  const isBangalore = branch.id === "bangalore";
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Ink Nation Tattoo Studio ${branch.city}`,
    "image": "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800",
    "telephone": branch.phone,
    "url": `https://inknation.in/contact?branch=${branch.id}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isBangalore 
        ? "1st Floor, 20th Main Rd, KHB Colony, 5th Block, Koramangala" 
        : "F-225, 1st Floor, 1st Main Rd, Gokulam 2nd Stage",
      "addressLocality": isBangalore ? "Bengaluru" : "Mysore",
      "postalCode": isBangalore ? "560095" : "570002",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": branch.coords.lat,
      "longitude": branch.coords.lng
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": branch.rating.toString(),
      "reviewCount": branch.reviewCount.toString()
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": isBangalore ? "11:00" : "10:15",
        "closes": "21:00"
      }
    ]
  };
}

// FAQ Page schema
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Article schema for blog posts
export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": [{
      "@type": "Person",
      "name": post.author,
      "url": `https://inknation.in/artists/${post.author.toLowerCase()}`
    }],
    "description": post.excerpt
  };
}

// ImageGallery schema
export function getImageGallerySchema(images: { url: string; caption?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "associatedMedia": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "caption": img.caption || "Ink Nation Portfolio Work"
    }))
  };
}

// BreadcrumbList schema
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://inknation.in${item.item}`
    }))
  };
}
