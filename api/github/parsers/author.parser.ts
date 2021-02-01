import { GithubAuthor, GitraceAuthor } from "../models/author.ts";

export const parseGitraceAuthor = ({
  id,
  login,
  avatar_url,
  html_url,
}: GithubAuthor): GitraceAuthor => {
  return {
    id,
    login,
    avatarUrl: avatar_url,
    htmlUrl: html_url,
  };
};
