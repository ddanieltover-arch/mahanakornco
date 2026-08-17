export const categorySeoContent: Record<
  string,
  { title: string; description: string; answerCapsule: string; intro: string; keyword: string }
> = {
  sugar: {
    title: "ICUMSA Sugar Wholesale Supplier",
    description:
      "Bulk ICUMSA 45, VHP, and brown cane sugar from Thailand. MAHANAKORN supplies wholesale sugar for food manufacturers and distributors worldwide.",
    keyword: "ICUMSA sugar wholesale",
    answerCapsule:
      "MAHANAKORN supplies bulk ICUMSA-grade cane sugar from Thailand including ICUMSA 45 white refined, ICUMSA 100/150, and ICUMSA 600–1200 brown sugar for global B2B buyers with export documentation and quality certificates.",
    intro:
      "Our sugar portfolio covers the full range of ICUMSA grades for industrial, food-service, and retail repackaging markets. Every shipment undergoes pre-export quality verification. Explore individual grades below or request a formal quotation for your destination port.",
  },
  rice: {
    title: "Thai Jasmine Rice Bulk Supplier",
    description:
      "Wholesale Thai Hom Mali jasmine rice, parboiled rice, and specialty varieties exported from Thailand for global food industry buyers.",
    keyword: "Thai jasmine rice bulk supplier",
    answerCapsule:
      "MAHANAKORN exports premium Thai rice including Hom Mali jasmine, white rice, parboiled, and basmati-style varieties in bulk packaging for importers, distributors, and food manufacturers worldwide.",
    intro:
      "Thailand is one of the world's leading rice exporters. We supply fragrant Hom Mali jasmine rice and specialty grades with consistent quality and full export documentation. Browse our rice catalogue or contact us for container-load pricing.",
  },
  fertilizers: {
    title: "NPK Fertilizer Wholesale Thailand",
    description:
      "Bulk NPK, water-soluble, and specialty fertilizers from Thailand for agricultural distributors and farming enterprises worldwide.",
    keyword: "NPK fertilizer wholesale Thailand",
    answerCapsule:
      "MAHANAKORN supplies wholesale agricultural fertilizers including NPK compounds, water-soluble formulations, phosphates, and micronutrient products sourced from trusted manufacturers for export to global markets.",
    intro:
      "From compound NPK to specialty water-soluble grades, our fertilizer range supports commercial agriculture across diverse climates. All products are available for bulk export with specifications and certificates on request.",
  },
  "edible-cooking-oil": {
    title: "RBD Edible Cooking Oil Bulk Export",
    description:
      "Wholesale RBD palm oil, soybean oil, and olein for food industry buyers. Bulk edible cooking oil export from Thailand.",
    keyword: "RBD edible cooking oil bulk",
    answerCapsule:
      "MAHANAKORN exports refined, bleached, and deodorized (RBD) edible cooking oils including palm oil, soybean oil, and olein in bulk quantities for food manufacturers and distributors globally.",
    intro:
      "Our edible oil products meet food-industry standards for refining and packaging. We coordinate FOB and CIF shipments with full export documentation. View available grades below or request a quote for your volume and destination.",
  },
  "poultry-products": {
    title: "Poultry Products Wholesale Export",
    description:
      "Wholesale poultry products for export including chicken cuts and portions for distributors and food-service buyers.",
    keyword: "poultry products wholesale export",
    answerCapsule:
      "MAHANAKORN supplies wholesale poultry products for export markets, including chicken portions and cuts, with cold-chain logistics coordination and export compliance documentation.",
    intro:
      "We work with certified processing partners to supply poultry products for wholesale distribution. Contact our team for specifications, halal certification availability, and destination-market requirements.",
  },
  nuts: {
    title: "Cashew & Pistachio Nuts Wholesale",
    description:
      "Premium cashew nuts, pistachios, and specialty nuts for wholesale and export markets worldwide.",
    keyword: "cashew pistachio nuts wholesale",
    answerCapsule:
      "MAHANAKORN exports premium natural nuts including cashews and pistachios in bulk for wholesalers, roasters, and food manufacturers, with flexible packaging and export documentation.",
    intro:
      "Our nuts portfolio serves snack manufacturers, retailers, and ingredient buyers globally. Browse available varieties below or inquire about custom grades and packaging for your market.",
  },
};

export const productsHubAnswer =
  "MAHANAKORN offers 70+ wholesale agricultural products across sugar, rice, fertilizer, edible cooking oil, poultry, and nuts — all available for bulk export from Thailand with formal quotations, quality certificates, and global shipping coordination.";

export function getCategorySeo(slug: string) {
  return categorySeoContent[slug];
}
