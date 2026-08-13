export function buildDateFilter(
  dateFilter: string | null,
  field = "createdAt",
){
  if (!dateFilter || dateFilter === "all") {
    return {} ;
  }

  const now = new Date();

  let dateCondition:
    | {
        gte?: Date;
        lte?: Date;
      }
    | undefined;

  switch (dateFilter) {
    case "today":
      dateCondition = {
        gte: new Date(
          new Date(now).setHours(0, 0, 0, 0)
        ),
        lte: new Date(
          new Date(now).setHours(23, 59, 59, 999)
        ),
      };
      break;

    case "past7":
      dateCondition = {
        gte: new Date(Date.now() - 7 * 86400000),
      };
      break;

    case "past30":
      dateCondition = {
        gte: new Date(Date.now() - 30 * 86400000),
      };
      break;

    default:
      return {};
  }

  return {
    [field]: dateCondition,
  } 
}