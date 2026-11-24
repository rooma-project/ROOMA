
export interface Room {
  id: number;
  title: string;
  location: string;
  price: number;
  size: number;
  furnished: boolean;
  image: string;
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
  },
  {
    id: 2,
    title: "Cozy shared apartment",
    location: "University District",
    price: 280,
    size: 15,
    furnished: true,
    image: "/images/room-2.jpeg",
  },
  {
    id: 3,
    title: "Bright private room",
    location: "West District",
    price: 420,
    size: 24,
    furnished: true,
    image: "/images/room-3.jpeg",
  },
];
