export function buildStatusFilter(
  status: string | null,
  field = "available",
) {
  if (!status || status === "all") {
    return {} 
  }

  return {
    [field]: status === "true",
  }
}