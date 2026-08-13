export function buildPriceFilter(
  minPrice: string | null,
  maxPrice: string | null,
  field = "price",
){
  if (!minPrice && !maxPrice) {
    return {} 
  }

  const price: {gte?: number; lte?: number  } = {};

  if (minPrice) {
    price.gte = Number(minPrice);
  }

  if (maxPrice) {
    price.lte = Number(maxPrice);
  }

  return {
    [field]: price,
  } 
}