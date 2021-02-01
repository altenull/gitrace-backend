import { githubApi, errorHandler } from "./github-api.helper.ts";
import { GithubUser, GitraceUser } from "./models/user.ts";
import { GithubRepo, GitraceRepo } from "./models/repo.ts";
import { PunchCard } from "./models/punch-card.ts";
import { Languages } from "./models/language.ts";
import { parseGitraceUser } from "./parsers/user.parser.ts";
import { parseGitraceRepos } from "./parsers/repo.parser.ts";

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

  async getPunchCard(userName: string, repoName: string): Promise<PunchCard> {
    const url: string = `${GITHUB_API_END_POINT}/repos/${userName}/${repoName}/stats/punch_card`;

    return (await githubApi<PunchCard>(url).catch(errorHandler)) as PunchCard;
  }

  async getLanguages(userName: string, repoName: string): Promise<Languages> {
    const url: string = `${GITHUB_API_END_POINT}/repos/${userName}/${repoName}/languages`;

    return (await githubApi<Languages>(url).catch(errorHandler)) as Languages;
  }
}
