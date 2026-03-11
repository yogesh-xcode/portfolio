import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yogesh Builds",
    short_name: "Yogesh",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f3ed",
    theme_color: "#2e4f47",
    icons: [
      {
        src: "/image.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
