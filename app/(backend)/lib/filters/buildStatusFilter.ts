export function buildStatusFilter(
  status: string | null,
  field = "available",
) {
  if (!status || status === "all") {
    return {};
  }

  if (field === "available") {
    return {
      [field]: status === "true",
    };
  }

  return {
    [field]: status,
  }
}