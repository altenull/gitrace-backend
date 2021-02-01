import {
  GithubCommitActivity,
  GitraceCommitActivity,
} from "../models/commit-activity.ts";
import { parseGitraceAuthor } from "./author.parser.ts";

export const parseGitraceCommitActivities = (
  githubCommitActivities: GithubCommitActivity[]
): GitraceCommitActivity[] =>
  githubCommitActivities.map(
    ({ total, weeks, author }: GithubCommitActivity) => ({
      totalCommits: total,
      weeklyCommitActivities: weeks,
      author: parseGitraceAuthor(author),
    })
  );
