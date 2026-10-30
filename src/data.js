export const SITE = {
  name: 'Good Trust Real Estate',
  formalName: 'Good Trust Estate Management Ltd.',
  founder: 'Peter Suleiman',
  phoneDisplay: '0810 375 7347',
  phone: '+2348103757347',
  whatsapp: '2348103757347',
  email: 'goodtrustrs@gmail.com',
  address: '18 Osuku Plaza, 1st 200 Housing Unit Junction, Lokoja, Nigeria',
  instagram: 'https://www.instagram.com/goodtrustrs/',
  linktree: 'https://linktr.ee/goodtrustrs',
};

// This is a portfolio showcase using client-provided photographs.
// The client did not provide asking prices, availability, exact property locations,
// bedroom counts, land titles, or floor areas. Never invent them.
// Confirm whether any item is available before advertising it as an active sale or rental.
export const properties = [
  {
    id: 'signature-residence',
    name: 'Pillared Luxury Residence',
    category: 'Residential',
    subtitle: 'Elegant multi-level residence',
    image: '/assets/grand-residence.webp',
    label: 'RESIDENTIAL SHOWCASE',
    location: 'Location on enquiry',
    description: 'An imposing residence with a dramatic pillared entrance, generous forecourt, and a distinctive dark roofline. A showcase of classic architectural presence.',
    details: ['Statement entrance', 'Paved forecourt', 'Classic architecture'],
  },
  {
    id: 'the-yellow-plaza',
    name: 'Yellow Accent Commercial Plaza',
    category: 'Commercial',
    subtitle: 'Contemporary commercial building',
    image: '/assets/commercial-plaza.webp',
    label: 'COMMERCIAL SHOWCASE',
    location: 'Location on enquiry',
    description: 'A welcoming low-rise commercial complex featuring expansive glazing, distinctive yellow accents, and convenient forecourt access.',
    details: ['Wide frontage', 'Easy access', 'Commercial layout'],
  },
  {
    id: 'modern-duplex-concept',
    name: 'Modern Duplex Concept',
    category: 'Design Concepts',
    subtitle: 'Architectural concept presentation',
    image: '/assets/modern-duplex-concept.webp',
    label: 'DESIGN CONCEPT',
    location: 'Concept visualisation',
    description: 'A contemporary duplex design concept with geometric lines, a refined neutral palette, and a clean architectural finish. This image is a visualisation, not a completed building photograph.',
    details: ['Contemporary facade', 'Geometric lines', 'Concept only'],
  },
  {
    id: 'bungalow',
    name: 'Courtyard Bungalow',
    category: 'Residential',
    subtitle: 'Warm and welcoming bungalow',
    image: '/assets/bungalow-residence.webp',
    label: 'RESIDENTIAL SHOWCASE',
    location: 'Location on enquiry',
    description: 'An inviting single-storey property with a spacious paved courtyard, classic pitched roof, and warm exterior materials.',
    details: ['Single-storey design', 'Paved courtyard', 'Welcoming exterior'],
  },
  {
    id: 'commercial-service',
    name: 'Commercial Forecourt',
    category: 'Commercial',
    subtitle: 'Large-format commercial facility',
    image: '/assets/commercial-station.webp',
    label: 'COMMERCIAL SHOWCASE',
    location: 'Location on enquiry',
    description: 'A broad covered commercial forecourt with multiple service lanes and an open, accessible arrangement.',
    details: ['Large canopy', 'Multiple lanes', 'Open commercial space'],
  },
];

export const createWhatsAppLink = (message = 'Hello Good Trust Real Estate, I would like to make an enquiry.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
