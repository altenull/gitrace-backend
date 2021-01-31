import { GitraceRepo, GithubRepo } from "../models/repo.ts";

export const parseGitraceRepos = (githubRepos: GithubRepo[]): GitraceRepo[] => {
  return githubRepos.map(
    ({
      id,
      name,
      size,
      stargazers_count,
      watchers_count,
      created_at,
      pushed_at,
      archived,
      description,
      language,
    }: GithubRepo) => ({
      id,
      name,
      size,
      numberOfStars: stargazers_count,
      numberOfWatchers: watchers_count,
      isArchived: archived,
      createdAt: created_at,
      pushedAt: pushed_at,
      ...(description != null && { description }),
      ...(language != null && { language }),
    })
  );
};
