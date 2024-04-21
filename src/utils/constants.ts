export const EXPERIENCES = [
  "elementary_school",
  "middle_or_high_school",
  "university_bachelor",
  "university_master_or_doctoral",
] as const;

export const EXPERIENCES_REGEX = EXPERIENCES.join("|");

export const PRETTY_EXPERIENCES = {
  elementary_school: "Elementary School",
  middle_or_high_school: "Middle or High School",
  university_bachelor: "University Bachelor",
  university_master_or_doctoral: "University Master or Doctoral",
} as const;

export type Experience = (typeof EXPERIENCES)[number];
