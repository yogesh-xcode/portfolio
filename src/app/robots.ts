import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yogeshbuilds.in/sitemap.xml",
    host: "https://yogeshbuilds.in",
  };
}
