import { githubApi, errorHandler } from "./github-api.helper.ts";
import { GithubUser, GitraceUser } from "./models/user.ts";
import { parseGitraceUser } from "./parsers/user.parser.ts";

const GITHUB_API_END_POINT: string = "https://api.github.com";

export default class GithubApiService {
  async getUser(userName: string): Promise<GitraceUser> {
    const url: string = `${GITHUB_API_END_POINT}/users/${userName}`;

    return (await githubApi<GithubUser>(url)
      .then(parseGitraceUser)
      .catch(errorHandler)) as GitraceUser;
  }
}
