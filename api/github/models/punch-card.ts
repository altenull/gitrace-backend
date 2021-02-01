/**
 * [0]: dayOfWeek - 0(Sun) ~ 6(Sat)
 * [1]: hour - 0 ~ 23
 * [2]: number of commits
 * https://docs.github.com/en/rest/reference/repos#get-the-hourly-commit-count-for-each-day
 */
export type PunchCard = Array<Array<number>>;
