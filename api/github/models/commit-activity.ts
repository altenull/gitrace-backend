import { GithubAuthor, GitraceAuthor } from "./author.ts";

export interface WeeklyCommitActivity {
  w: number; // Start of the week, given as a Unix timestamp.
  a: number; // Number of additions
  d: number; // Number of deletions
  c: number; // Number of commits
}

export interface GithubCommitActivity {
  total: number;
  weeks: WeeklyCommitActivity[];
  author: GithubAuthor;
}

export interface GitraceCommitActivity {
  totalCommits: number;
  weeklyCommitActivities: WeeklyCommitActivity[];
  author: GitraceAuthor;
}
