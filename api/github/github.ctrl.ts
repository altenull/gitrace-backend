import GithubApiService from "./github-api.service.ts";
import { GitraceUser } from "./models/user.ts";
import { GitraceRepo } from "./models/repo.ts";
import { PunchCard } from "./models/punch-card.ts";
import { Languages } from "./models/language.ts";
import { GitraceCommitActivity } from "./models/commit-activity.ts";
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
    params.userName,
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
    params.userName,
  );

  if (gitraceRepos != null) {
    response.status = 200;
    response.body = gitraceRepos;
  }
};

export const getPunchCard = async ({
  params,
  response,
}: {
  params: { owner: string; repoName: string };
  response: Response;
}) => {
  const punchCard: PunchCard = await githubApiService.getPunchCard(
    params.owner,
    params.repoName,
  );

  if (punchCard != null) {
    response.status = 200;
    response.body = punchCard;
  }
};

export const getLanguages = async ({
  params,
  response,
}: {
  params: { owner: string; repoName: string };
  response: Response;
}) => {
  const languages: Languages = await githubApiService.getLanguages(
    params.owner,
    params.repoName,
  );

  if (languages != null) {
    response.status = 200;
    response.body = languages;
  }
};

export const getCommitActivities = async ({
  params,
  response,
}: {
  params: { owner: string; repoName: string };
  response: Response;
}) => {
  const gitraceCommitActivities: GitraceCommitActivity[] =
    await githubApiService.getCommitActivities(
      params.owner,
      params.repoName,
    );

  if (gitraceCommitActivities != null) {
    response.status = 200;
    response.body = gitraceCommitActivities;
  }
};
