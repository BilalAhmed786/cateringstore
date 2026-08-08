export type StatsPeriod = "1m" | "3m" | "6m" | "1y";

const PERIOD_MONTHS: Record<StatsPeriod, number> = {
  "1m": 1,
  "3m": 3,
  "6m": 6,
  "1y": 12,
};

export function getPeriodDates(period: StatsPeriod) {
  const months = PERIOD_MONTHS[period];

  const currentEnd = new Date();

  const currentStart = new Date(currentEnd);
  currentStart.setMonth(currentStart.getMonth() - months);

  const previousEnd = new Date(currentStart);

  const previousStart = new Date(previousEnd);
  previousStart.setMonth(previousStart.getMonth() - months);

  return {
    currentStart,
    currentEnd,
    previousStart,
    previousEnd,
  };
}