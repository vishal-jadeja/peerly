// Shared TypeScript types — mirror of apps/web/types/index.ts for cross-package use

export type Platform = "reddit" | "twitter" | "linkedin";

export interface PersonResult {
  id: string;
  username: string;
  platform: Platform;
  snippet: string;
  profileUrl: string;
  postUrl: string;
  postedAt: string;
}

export interface PlatformQueries {
  reddit: string[];
  twitter: string[];
  linkedin: string[];
}

export interface ScrapeResponse {
  people: PersonResult[];
}

export interface DraftMessage {
  personId: string;
  text: string;
}
