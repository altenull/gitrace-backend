import GithubApiService from "./github-api.service.ts";
import { GitraceUser } from "./models/user.ts";
import { GitraceRepo } from "./models/repo.ts";
import type { Response } from "https://deno.land/x/oak/mod.ts";

const githubApiService = new GithubApiService();

export const getUser = async ({
  params,
  response,
}: {
  params: { userName: string };
  response: Response;
}) => {
  const gitraceUser: GitraceUser = await githubApiService.getUser(
    params.userName
  );

  if (gitraceUser != null) {
    response.status = 200;
    response.body = gitraceUser;
  }
};

export const getRepos = async ({
  params,
  response,
}: {
  params: { userName: string };
  response: Response;
}) => {
  const gitraceRepos: GitraceRepo[] = await githubApiService.getRepos(
    params.userName
  );

  if (gitraceRepos != null) {
    response.status = 200;
    response.body = gitraceRepos;
  }
};
