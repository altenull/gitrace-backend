import { isEmptyObject } from "../../lib/object.ts";
import {
  getFetchHeaders,
  checkStatus,
  errorHandler,
  parseJSON,
  GITHUB_API_END_POINT,
} from "./helpers/github-api.helper.ts";
import { Repo } from "./models/repo.ts";
import { User } from "./models/user.ts";

const mergeLanguageByRepos = (languageByRepos: Array<any>) =>
  languageByRepos.reduce((acc: any, languageByRepo: any) => {
    for (const [language, codeLine] of Object.entries(languageByRepo)) {
      if (!acc[language]) {
        acc[language] = 0;
      }

      acc[language] += codeLine;
    }

    return acc;
  }, {});

// const mergeFruits = (data) => {
//   const result = {}; //(1)

//   data.forEach((basket) => {
//     for (let [key, value] of Object.entries(basket)) {
//       if (result[key] != null) {
//         result[key] += value;
//       } else {
//         result[key] = value;
//       }
//     }
//   });

//   return result;
// };

export const getGithubUser = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  const user: User = (await fetch(
    `${GITHUB_API_END_POINT}/users/${params.user}`,
    {
      headers: getFetchHeaders(),
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .catch(errorHandler)) as User;

  response.body = user;
};

export const getGithubCore = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  const languageUrls: string[] = (await fetch(
    `${GITHUB_API_END_POINT}/users/${params.owner}/repos`,
    {
      headers: getFetchHeaders(),
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then((repos: Repo[]) => repos.map((repo: Repo) => repo.languages_url))
    .catch(errorHandler)) as string[];

  const languageResponse = await Promise.all(
    languageUrls.map((languageUrl) =>
      fetch(languageUrl, {
        headers: getFetchHeaders(),
      })
        .then(checkStatus)
        .then(parseJSON)
        .catch(errorHandler)
    )
  ).then((languageByRepos) => mergeLanguageByRepos(languageByRepos));

  //   [
  //     {
  //        "HTML":519763,
  //        "JavaScript":149730,
  //        "CSS":119701,
  //        "XSLT":8930
  //     },
  //     {
  //        "JavaScript":93532,
  //        "CSS":9699,
  //        "HTML":1420
  //     },
  //     {
  //        "HTML":19860,
  //        "CSS":2208
  //     },
  //     {
  //        "TypeScript":6399,
  //        "HTML":1742,
  //        "CSS":363
  //     },
  //     {
  //        "JavaScript":2135
  //     },
  //     {
  //        "TypeScript":112810,
  //        "JavaScript":845,
  //        "HTML":502
  //     },
  //     {
  //        "JavaScript":116527,
  //        "CSS":20706,
  //        "HTML":1618
  //     },
  //     {
  //        "TypeScript":94240,
  //        "JavaScript":54049,
  //        "CSS":6259,
  //        "HTML":507
  //     },
  //     {
  //        "TypeScript":103153,
  //        "JavaScript":17052,
  //        "SCSS":12774,
  //        "HTML":4143
  //     },
  //     {
  //        "JavaScript":163333
  //     },
  //     {
  //        "JavaScript":65414
  //     },
  //     {
  //        "Java":98458
  //     },
  //     {
  //        "JavaScript":62197,
  //        "CSS":6836,
  //        "HTML":1604
  //     },
  //     {
  //        "JavaScript":93434,
  //        "CSS":12178,
  //        "HTML":1219
  //     },
  //     {
  //        "TypeScript":38988,
  //        "CSS":1965,
  //        "HTML":929
  //     },
  //     {
  //        "TypeScript":250508,
  //        "CSS":22060,
  //        "JavaScript":16246,
  //        "HTML":8595,
  //        "Dockerfile":51
  //     },
  //     {
  //        "JavaScript":76869,
  //        "CSS":2630,
  //        "HTML":2448
  //     },
  //     {
  //        "JavaScript":1919984,
  //        "HTML":133216,
  //        "CSS":24224,
  //        "Stylus":21380,
  //        "Less":21380,
  //        "SCSS":21380,
  //        "Sass":20906,
  //        "TypeScript":16196,
  //        "Shell":125
  //     },
  //     {
  //        "JavaScript":11863,
  //        "CSS":7735,
  //        "HTML":1737
  //     },
  //     {
  //        "Java":50160
  //     },
  //     {
  //        "JavaScript":9864,
  //        "CSS":2203,
  //        "HTML":1590
  //     },
  //     {
  //        "HTML":54412,
  //        "JavaScript":12703,
  //        "CSS":111
  //     }
  //  ]

  response.body = languageResponse;
};
