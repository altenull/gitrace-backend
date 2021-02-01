import { githubApi, errorHandler } from "./github-api.helper.ts";
import { GithubUser, GitraceUser } from "./models/user.ts";
import { GithubRepo, GitraceRepo } from "./models/repo.ts";
import {
  GithubCommitActivity,
  GitraceCommitActivity,
} from "./models/commit-activity.ts";
import { PunchCard } from "./models/punch-card.ts";
import { Languages } from "./models/language.ts";
import { parseGitraceUser } from "./parsers/user.parser.ts";
import { parseGitraceRepos } from "./parsers/repo.parser.ts";
import { parseGitraceCommitActivities } from "./parsers/commit-activity.parser.ts";

const GITHUB_API_END_POINT: string = "https://api.github.com";

export default class GithubApiService {
  async getUser(userName: string): Promise<GitraceUser> {
    const url: string = `${GITHUB_API_END_POINT}/users/${userName}`;

    return (await githubApi<GithubUser>(url)
      .then(parseGitraceUser)
      .catch(errorHandler)) as GitraceUser;
  }

  async getRepos(userName: string): Promise<GitraceRepo[]> {
    const url: string = `${GITHUB_API_END_POINT}/users/${userName}/repos`;

    return (await githubApi<GithubRepo[]>(url)
      .then(parseGitraceRepos)
      .catch(errorHandler)) as GitraceRepo[];
  }

  async getPunchCard(owner: string, repoName: string): Promise<PunchCard> {
    const url: string = `${GITHUB_API_END_POINT}/repos/${owner}/${repoName}/stats/punch_card`;

    return (await githubApi<PunchCard>(url).catch(errorHandler)) as PunchCard;
  }

  async getLanguages(owner: string, repoName: string): Promise<Languages> {
    const url: string = `${GITHUB_API_END_POINT}/repos/${owner}/${repoName}/languages`;

    return (await githubApi<Languages>(url).catch(errorHandler)) as Languages;
  }

  async getCommitActivities(
    owner: string,
    repoName: string
  ): Promise<GitraceCommitActivity[]> {
    const url: string = `${GITHUB_API_END_POINT}/repos/${owner}/${repoName}/stats/contributors`;

    return (await githubApi<GithubCommitActivity[]>(url)
      .then(parseGitraceCommitActivities)
      .catch(errorHandler)) as GitraceCommitActivity[];
  }
}
