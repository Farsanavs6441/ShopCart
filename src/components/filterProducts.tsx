// utils/filterProducts.ts

import { Product } from "../features/products/types";


export const filterProducts = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string,
  priceRange: { min: number; max: number }
): Product[] => {
  let filtered = products;

  if (searchQuery) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  if (selectedCategory !== 'All') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

  return filtered;
};
