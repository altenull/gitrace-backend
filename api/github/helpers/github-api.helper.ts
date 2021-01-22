export const GITHUB_API_END_POINT: string = "https://api.github.com";

export const getFetchHeaders = () => {
  const requestHeaders = new Headers();

  requestHeaders.append("Accept", "application/vnd.github.v3+json");
  requestHeaders.append(
    "Authorization",
    "token 6b18c4c996b0862376d499c5cf568bee6f103835"
  );

  return requestHeaders;
};

export const checkStatus = (response: any) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

export const parseJSON = (response: any) => response.json();

export const errorHandler = (error: any) =>
  console.log("There was a problem!", error);
