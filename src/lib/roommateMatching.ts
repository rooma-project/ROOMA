import type { RoommatePreferences } from "../data/roommatePreferences";

type WeightedKey = "cleanliness" | "sleep" | "smoking" | "social" | "guests" | "cooking";
const criteria = [
  { key: "cleanliness", label: "Cleanliness", weight: 25, levels: ["relaxed", "balanced", "very_tidy"] },
  { key: "sleep", label: "Sleep schedule", weight: 20, levels: ["early", "flexible", "late"] },
  { key: "smoking", label: "Smoking habits", weight: 20, levels: ["never", "occasionally", "regularly"] },
  { key: "social", label: "Social habits", weight: 15, levels: ["quiet", "balanced", "social"] },
  { key: "guests", label: "Guest frequency", weight: 10, levels: ["rarely", "sometimes", "often"] },
  { key: "cooking", label: "Cooking habits", weight: 10, levels: ["rarely", "sometimes", "often"] },
] satisfies { key: WeightedKey; label: string; weight: number; levels: string[] }[];

export interface MatchResult {
  score: number | null;
  conflicts: string[];
  breakdown: { key: WeightedKey; label: string; weight: number; points: number; similarity: number }[];
}

export function calculateMatch(user: RoommatePreferences, candidate: RoommatePreferences): MatchResult {
  const conflicts: string[] = [];
  if (user.smokerPolicy === "reject" && candidate.smoking !== "never") conflicts.push("You do not accept roommates who smoke.");
  if (candidate.smokerPolicy === "reject" && user.smoking !== "never") conflicts.push("This roommate does not accept smokers.");
  if (user.petPolicy === "reject" && candidate.hasPet === "yes") conflicts.push("You do not accept roommates who bring pets.");
  if (candidate.petPolicy === "reject" && user.hasPet === "yes") conflicts.push("This roommate does not accept pets.");
  if (conflicts.length) return { score: null, conflicts, breakdown: [] };

  const breakdown = criteria.map(({ key, label, weight, levels }) => {
    const distance = Math.abs(levels.indexOf(user[key]) - levels.indexOf(candidate[key]));
    const similarity = 1 - distance / 2;
    return { key, label, weight, points: weight * similarity, similarity };
  });
  return { score: Math.round(breakdown.reduce((sum, item) => sum + item.points, 0)), conflicts, breakdown };
}
