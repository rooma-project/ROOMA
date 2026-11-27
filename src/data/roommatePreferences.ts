export const preferenceSections = [
  {
    title: "Your lifestyle.",
    subtitle: "01 / Living habits",
    questions: [
      { key: "cleanliness", label: "How tidy do you keep shared spaces?", options: [{ value: "relaxed", label: "Relaxed" }, { value: "balanced", label: "Reasonably tidy" }, { value: "very_tidy", label: "Very tidy" }] },
      { key: "sleep", label: "What is your usual sleep schedule?", options: [{ value: "early", label: "Early bird" }, { value: "flexible", label: "Flexible" }, { value: "late", label: "Night owl" }] },
      { key: "smoking", label: "Do you smoke?", options: [{ value: "never", label: "Never" }, { value: "occasionally", label: "Occasionally" }, { value: "regularly", label: "Regularly" }] },
      { key: "social", label: "How social are you at home?", options: [{ value: "quiet", label: "Prefer quiet time" }, { value: "balanced", label: "A bit of both" }, { value: "social", label: "Very social" }] },
      { key: "guests", label: "How often do you invite guests over?", options: [{ value: "rarely", label: "Rarely" }, { value: "sometimes", label: "Sometimes" }, { value: "often", label: "Often" }] },
      { key: "cooking", label: "How often do you cook at home?", options: [{ value: "rarely", label: "Rarely" }, { value: "sometimes", label: "Sometimes" }, { value: "often", label: "Often" }] },
      { key: "hasPet", label: "Would you bring a pet to the shared home?", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
  {
    title: "Set your boundaries.",
    subtitle: "02 / Roommate requirements",
    questions: [
      { key: "smokerPolicy", label: "Would you live with a roommate who smokes?", options: [{ value: "accept", label: "Yes" }, { value: "reject", label: "No, this is a dealbreaker" }] },
      { key: "petPolicy", label: "Would you live with a roommate who brings a pet?", options: [{ value: "accept", label: "Yes" }, { value: "reject", label: "No, this is a dealbreaker" }] },
    ],
  },
] as const;

export const preferenceQuestions = preferenceSections.flatMap((section) => [...section.questions]);

export type PreferenceQuestion = (typeof preferenceQuestions)[number];
export type PreferenceKey = PreferenceQuestion["key"];
export type RoommatePreferences = {
  [K in PreferenceKey]: Extract<PreferenceQuestion, { key: K }>["options"][number]["value"];
};
export type PreferenceDraft = Record<PreferenceKey, string>;

export const emptyPreferences: PreferenceDraft = {
  cleanliness: "", sleep: "", smoking: "", social: "", guests: "", cooking: "", hasPet: "", smokerPolicy: "", petPolicy: "",
};

export const preferenceStorageKey = "rooma:demo-preferences:v1";

export function isCompletePreferences(value: unknown): value is RoommatePreferences {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return preferenceQuestions.every((question) =>
    question.options.some((option) => option.value === record[question.key])
  );
}
