import { MetadataRoute } from "next";
import { siteConfig } from "~/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Main pages
  const routes = [
    "",
    "/blog",
    "/pricing",
    "/about",
    "/contact",
    "/features",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));
  
  // Add blog posts dynamically if you have access to them
  // This would typically come from your CMS or content layer
  // For now, we'll just use the main routes
  
  return [...routes];
} 