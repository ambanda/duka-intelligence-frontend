import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dukaintelligence.co.ke",
      lastModified: new Date(),
    },
    {
      url: "https://dukaintelligence.co.ke/about",
      lastModified: new Date(),
    },
    {
      url: "https://dukaintelligence.co.ke/product",
      lastModified: new Date(),
    },
    {
      url: "https://dukaintelligence.co.ke/contact",
      lastModified: new Date(),
    },
  ];
}
