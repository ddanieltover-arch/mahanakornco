export const siteConfig = {
  name: "MAHANAKORN NAKO NAGARAJ CO., LTD",
  shortName: "MAHANAKORN",
  tagline: "Your #1 Rice, Sugar, Edible Cooking Oil and Fertilizer Supplier",
  description:
    "MAHANAKORN NAKO NAGARAJ CO., LTD is a trusted wholesale supplier of sugar, rice, fertilizer, and edible cooking oil from Thailand. Established in 2004.",
  url: "https://mahanakornco.com",
  email: "sales@mahanakornco.com",
  phone: "+66 64 994 9760",
  whatsapp: "66649949760",
  established: 2004,
  addresses: [
    {
      label: "Head Office",
      address:
        "789 Moo 1, Nong Kung Si Subdistrict, Non Sa-at District, Udon Thani Province, Thailand",
    },
    {
      label: "Branch — Lampang",
      address:
        "Phaholyothin Rd, Sobtui Sub-District, Muang District, Lampang Province 52100, Thailand",
    },
    {
      label: "Branch — Lampang (Mae Tah)",
      address:
        "129/1 Lampang-Mae Tah Rd, Tambon Phrabat, Mueang Lampang District, Lampang 52000, Thailand",
    },
  ],
  stats: {
    clients: 1850,
    delivered: 4430,
    satisfaction: 1450,
    years: 21,
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "Sugar", href: "/sugar" },
        { label: "Fertilizers", href: "/fertilizers" },
        { label: "Rice", href: "/rice" },
        { label: "Edible Cooking Oil", href: "/edible-cooking-oil" },
        { label: "Poultry Products", href: "/poultry-products" },
      ],
    },
    { label: "Ordering Procedures", href: "/ordering-procedures" },
    { label: "Quality Control", href: "/quality-control" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Ordering Procedures", href: "/ordering-procedures" },
    { label: "Quality Control", href: "/quality-control" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
