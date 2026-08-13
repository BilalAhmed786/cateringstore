export function buildSort(
  sort: string | null,
  field: string,
  defaultField = "createdAt",
){
  if (sort === "asc") {
    return {
      [field]: "asc",
    }
  }

  if (sort === "desc") {
    return {
      [field]: "desc",
    } 
  }

  return {
    [defaultField]: "desc",
  } 
}