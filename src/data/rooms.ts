
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
    location: "Kadıköy, Istanbul",
    price: 15000,
    size: 18,
    furnished: true,
    image: "/images/room-1.jpeg",
    description:
      "A modern furnished room designed for comfortable student living, with a dedicated study area.",
    deposit: 15000,
    utilities: 1500,
    amenities: [
      "Wi-Fi",
      "Study desk",
      "Shared kitchen",
      "Heating",
    ],
  },
  {
    id: 2,
    title: "Cozy shared apartment",
    location: "Beşiktaş, Istanbul",
    price: 12000,
    size: 15,
    furnished: true,
    image: "/images/room-2.jpeg",
    description:
      "A cozy student room in a shared apartment with comfortable common areas.",
    deposit: 12000,
    utilities: 1250,
    amenities: [
      "Wi-Fi",
      "Washing machine",
      "Shared kitchen",
    ],
  },
  {
    id: 3,
    title: "Bright private room",
    location: "Şişli, Istanbul",
    price: 18000,
    size: 24,
    furnished: true,
    image: "/images/room-3.jpeg",
    description:
      "A spacious private room with natural light and plenty of space for studying.",
    deposit: 18000,
    utilities: 2000,
    amenities: [
      "Wi-Fi",
      "Study desk",
      "Heating",
      "Wardrobe",
    ],
  },
];
