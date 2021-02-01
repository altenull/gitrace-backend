const getGithubApiHeaders = () => {
  const requestHeaders = new Headers();

  requestHeaders.append("Accept", "application/vnd.github.v3+json");
  requestHeaders.append(
    "Authorization",
    `token ${Deno.env.get("GITHUB_TOKEN")}`,
  );

  return requestHeaders;
};

export const errorHandler = (error: Error) =>
  console.log("There was a problem!", error.message);

export const githubApi = <T>(url: string): Promise<T> =>
  fetch(url, {
    headers: getGithubApiHeaders(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json() as Promise<T>;
    })
    .catch((error: Error) => {
      throw error; // Rethrow the error so that consumer can still catch it.
    });
