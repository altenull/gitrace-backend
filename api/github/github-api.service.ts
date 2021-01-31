import { githubApi, errorHandler } from "./github-api.helper.ts";
import { GithubUser, GitraceUser } from "./models/user.ts";
import { GithubRepo, GitraceRepo } from "./models/repo.ts";
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
}
