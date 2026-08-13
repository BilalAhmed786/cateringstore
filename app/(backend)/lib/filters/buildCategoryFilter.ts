export function buildCategoryFilter(
  category: string | null,
  field = "categoryId",
){
  if (!category || category === "all") {
    return {} ;
  }

  return {
    [field]: category.trim(),
  } 
}