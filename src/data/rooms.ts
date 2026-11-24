
export interface Room {
  id: number;
  title: string;
  location: string;
  price: number;
  size: number;
  furnished: boolean;
  image: string;
  description: string;
  deposit: number;
  utilities: number;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: 1,
    title: "Modern student room",
    location: "City Centre",
    price: 350,
    size: 18,
    furnished: true,
    image: "/images/room-1.jpeg",
    description:
      "A modern furnished room designed for comfortable student living, with a dedicated study area.",
    deposit: 350,
    utilities: 45,
    amenities: ["Wi-Fi", "Study desk", "Shared kitchen", "Heating"],
  },
  {
    id: 2,
    title: "Cozy shared apartment",
    location: "University District",
    price: 280,
    size: 15,
    furnished: true,
    image: "/images/room-2.jpeg",
    description:
      "A cozy student room in a shared apartment with comfortable common areas.",
    deposit: 280,
    utilities: 35,
    amenities: ["Wi-Fi", "Washing machine", "Shared kitchen"],
  },
  {
    id: 3,
    title: "Bright private room",
    location: "West District",
    price: 420,
    size: 24,
    furnished: true,
    image: "/images/room-3.jpeg",
    description:
      "A spacious private room with natural light and plenty of space for studying.",
    deposit: 420,
    utilities: 50,
    amenities: ["Wi-Fi", "Study desk", "Heating", "Wardrobe"],
  },
];
