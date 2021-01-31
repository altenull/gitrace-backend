import { GithubUser, GitraceUser } from "../models/user.ts";

export const parseGitraceUser = ({
  login,
  id,
  avatar_url,
  name,
  company,
  location,
  email,
  bio,
  followers,
  following,
  created_at,
}: GithubUser): GitraceUser => {
  return {
    id,
    login,
    avatarUrl: avatar_url,
    numberOfFollowers: followers,
    numberOfFollowing: following,
    createdAt: created_at,
    ...(name != null && { name }),
    ...(company != null && { company }),
    ...(location != null && { location }),
    ...(email != null && { email }),
    ...(bio != null && { bio }),
  };
};
