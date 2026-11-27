import type { RoommatePreferences } from "./roommatePreferences";

export interface Roommate {
  id: number;
  name: string;
  university: string;
  department: string;
  location: string;
  budget: number;
  bio: string;
  preferences: RoommatePreferences;
}

// Fictional profiles used only to demonstrate matching.
export const roommates: Roommate[] = [
  {
    id: 1, name: "Deniz Kaya", university: "Marmara University",
    department: "Computer Engineering", location: "Kadıköy", budget: 15000,
    bio: "I enjoy a tidy home, quiet study evenings and cooking with friends.",
    preferences: { cleanliness: "very_tidy", sleep: "early", smoking: "never", social: "balanced", guests: "rarely", cooking: "often", hasPet: "no", smokerPolicy: "reject", petPolicy: "accept" },
  },
  {
    id: 2, name: "Ece Yılmaz", university: "Yıldız Technical University",
    department: "Architecture", location: "Beşiktaş", budget: 13000,
    bio: "I like exploring the city, working on creative projects and hosting friends.",
    preferences: { cleanliness: "balanced", sleep: "late", smoking: "occasionally", social: "social", guests: "often", cooking: "sometimes", hasPet: "no", smokerPolicy: "accept", petPolicy: "accept" },
  },
  {
    id: 3, name: "Alex Morgan", university: "Istanbul Technical University",
    department: "Industrial Engineering", location: "Şişli", budget: 18000,
    bio: "I prefer a calm home, flexible schedules and a friendly shared space with my cat.",
    preferences: { cleanliness: "balanced", sleep: "flexible", smoking: "never", social: "quiet", guests: "sometimes", cooking: "rarely", hasPet: "yes", smokerPolicy: "reject", petPolicy: "accept" },
  },
  {
    id: 4, name: "Mert Aydın", university: "Istanbul University",
    department: "Economics", location: "Fatih", budget: 11000,
    bio: "I value personal space, shared responsibilities and relaxed weekends.",
    preferences: { cleanliness: "relaxed", sleep: "flexible", smoking: "never", social: "balanced", guests: "sometimes", cooking: "sometimes", hasPet: "no", smokerPolicy: "accept", petPolicy: "reject" },
  },
];
