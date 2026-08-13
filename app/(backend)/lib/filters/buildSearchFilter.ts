export function buildSearchFilter(
  search: string | null,
  fields: readonly string[],
){
  if (!search?.trim()) {
    return {};
  }

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: search.trim(),
        mode: "insensitive",
      },
    })),
  }
}