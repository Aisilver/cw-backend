export const TIME_CONSTANT = {
  SECOND: 1,
  SECOND_MS: 1000,

  MINUTE: 60,
  MINUTE_MS: 60 * 1000,

  HOUR: 60 * 60,
  HOUR_MS: 60 * 60 * 1000,

  DAY: 24 * 60 * 60,
  DAY_MS: 24 * 60 * 60 * 1000,

  WEEK: 7 * 24 * 60 * 60,
  WEEK_MS: 7 * 24 * 60 * 60 * 1000,

  MONTH: 30 * 24 * 60 * 60,
  MONTH_MS: 30 * 24 * 60 * 60 * 1000,
} as const;