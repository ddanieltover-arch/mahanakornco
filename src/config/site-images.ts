/**
 * Curated images from MAHANAKORN uploads (products, agriculture, facilities).
 * Avoid Seodo theme demo assets under 2020/10/.
 */
export const siteImages = {
  placeholder: "/uploads/2023/07/raw-brown-sugar.jpg",

  hero: [
    {
      image: "/uploads/2025/09/4.png",
      tagline: "Premium Quality",
      title: "Your Trusted Agricultural Commodities Partner",
      subtitle: "Sugar · Rice · Fertilizer · Edible Cooking Oil",
    },
    {
      image: "/uploads/2024/06/1.-Thai-hommali-jasmine-rice-600x450-1.jpg",
      tagline: "Global Export",
      title: "Wholesale Supply from Thailand",
      subtitle: "Serving distributors and industries worldwide since 2004",
    },
    {
      image: "/uploads/2024/07/Sugercane-Farming-.jpg",
      tagline: "Quality Assured",
      title: "ICUMSA Sugar & Premium Thai Rice",
      subtitle: "Rigorous quality control at every stage of production",
    },
  ],

  home: {
    welcome: "/uploads/2024/07/white-sugar-in-a-.webp",
    experience: "/uploads/2024/07/sugar-factory.webp",
  },

  about: "/uploads/2024/07/Sugercane-Farming-.jpg",

  categories: {
    sugar: "/uploads/2023/04/CANE-SUGAR-–-ICUMSA-100-2.jpg",
    fertilizers: "/uploads/2025/06/privi-00-00-50-175-s-water-soluble-fertilizer.webp",
    rice: "/uploads/2024/06/1.-Thai-hommali-jasmine-rice-600x450-1.jpg",
    "edible-cooking-oil": "/uploads/2025/09/rbd-soybean-oil.png",
    "poultry-products": "/uploads/2026/02/whole-chicken-griller.webp",
    "automotive-urea": "/uploads/2025/07/automotive-urea-global-win-co-ltd.png",
  },

  /** Banner thumbnails for static and listing pages */
  pages: {
    products: "/uploads/2025/09/4.png",
    about: "/uploads/2024/07/Sugercane-Farming-.jpg",
    contact: "/uploads/2024/07/sugar-factory.webp",
    "quality-control": "/uploads/2023/07/top-quality-icumsa-45-white-refined-brazil-sugar.jpg",
    sustainability: "/uploads/2024/07/Sugercane-Farming-.jpg",
    "ordering-procedures": "/uploads/2024/07/white-sugar-in-a-.webp",
    "privacy-policy": "/uploads/2024/07/sugar-factory.webp",
  },
} as const;

export function getCategoryImage(slug: string): string {
  const images: Record<string, string> = siteImages.categories;
  return images[slug] ?? siteImages.placeholder;
}
