import { getPeriodDates, StatsPeriod } from "./dateRange";
import { getDeliveredOrderCount } from "./getOrderDelivers";
import { getRevenue } from "./getRevenue";
import { getUserCount } from "./getUser";
import { getOrderCount } from "./statsQueries";
import { calculateTrend } from "./trendCalculator";



export async function calculateDashboardStats(
  period: StatsPeriod
) {
  const dates = getPeriodDates(period);

  const currentRange = {
    start: dates.currentStart,
    end: dates.currentEnd,
  };

  const previousRange = {
    start: dates.previousStart,
    end: dates.previousEnd,
  };

  const [
    currentOrders,
    previousOrders,

    currentUsers,
    previousUsers,

    currentRevenue,
    previousRevenue,

    currentDelivered,
    previousDelivered,
  ] = await Promise.all([
    getOrderCount(currentRange),
    getOrderCount(previousRange),

    getUserCount(currentRange),
    getUserCount(previousRange),

    getRevenue(currentRange),
    getRevenue(previousRange),

    getDeliveredOrderCount(currentRange),
    getDeliveredOrderCount(previousRange),
  ]);

  return {
    period,

    stats: {
      totalOrders: {
        value: currentOrders,
        trend: calculateTrend(
          currentOrders,
          previousOrders
        ),
      },

      totalUsers: {
        value: currentUsers,
        trend: calculateTrend(
          currentUsers,
          previousUsers
        ),
      },

      revenue: {
        value: currentRevenue,
        trend: calculateTrend(
          currentRevenue,
          previousRevenue
        ),
      },

      deliveredOrders: {
        value: currentDelivered,
        trend: calculateTrend(
          currentDelivered,
          previousDelivered
        ),
      },
    },
  };
}