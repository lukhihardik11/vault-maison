export interface Concept {
  id: string;
  number: string;
  name: string;
  dna: string;
  accent: string;
  bg: string;
  text: string;
  font: string;
  route: string;
}

export const concepts: Concept[] = [
  { id: "vault", number: "01", name: "The Vault", dna: "Gated · Monolithic · Intimate", accent: "#D4AF37", bg: "#0A0A0A", text: "#EAEAEA", font: "font-cinzel", route: "/vault" },
  { id: "observatory", number: "02", name: "The Observatory", dna: "Analytical · Transparent · Authoritative", accent: "#00E5FF", bg: "#0D1B2A", text: "#FFFFFF", font: "font-ibm-plex", route: "/observatory" },
  { id: "gallery", number: "03", name: "The Gallery", dna: "Editorial · Curated · Spacious", accent: "#2C2C2C", bg: "#FDFBF7", text: "#2C2C2C", font: "font-playfair", route: "/gallery" },
  { id: "atelier", number: "04", name: "The Atelier", dna: "Bespoke · Tactile · Process-driven", accent: "#8C3A3A", bg: "#F4F1EA", text: "#2B2B2B", font: "font-cormorant", route: "/atelier" },
  { id: "salon", number: "05", name: "The Salon", dna: "Intimate · Conversational · Warm", accent: "#4A5D23", bg: "#FDF5E6", text: "#2B2B2B", font: "font-lora", route: "/salon" },
  { id: "archive", number: "06", name: "The Archive", dna: "Historical · Provenance · Deep", accent: "#D4A574", bg: "#2C1A1D", text: "#F5F0EB", font: "font-playfair", route: "/archive" },
  { id: "minimal", number: "07", name: "The Minimal Machine", dna: "Brutalist · Restrained · Precise", accent: "#050505", bg: "#FFFFFF", text: "#050505", font: "", route: "/minimal" },
  { id: "theater", number: "08", name: "The Immersive Theater", dna: "Cinematic · Emotional · Enveloping", accent: "#E0C097", bg: "#1A1A24", text: "#F5F0EB", font: "font-bodoni", route: "/theater" },
  { id: "marketplace", number: "09", name: "The Marketplace of Rarity", dna: "Urgent · Scarce · Event-driven", accent: "#FF3B30", bg: "#1A1A1A", text: "#F2F2F2", font: "font-space-grotesk", route: "/marketplace" },
  { id: "maison", number: "10", name: "The Modern Maison", dna: "Balanced · Performant · Timeless", accent: "#8B7355", bg: "#FAFAFA", text: "#1C1C1C", font: "font-libre", route: "/maison" },
];
