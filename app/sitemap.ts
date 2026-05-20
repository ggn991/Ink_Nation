import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inknation.in";
  
  const coreRoutes = [
    "",
    "/gallery",
    "/gallery/bangalore",
    "/gallery/mysore",
    "/gallery/tattoos",
    "/gallery/piercings",
    "/gallery/nail-art",
    "/services",
    "/artists",
    "/about",
    "/pricing",
    "/faq",
    "/blog",
    "/contact",
    "/booking"
  ];

  return coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.includes("gallery") || route === "/booking" ? 0.8 : 0.6,
  }));
}
