// __tests__/filterProducts.test.ts
import { filterProducts } from "../components/filterProducts";
const products = [
  { id: '1', title: 'Audio Speaker', price: 100, category: 'audio', rating: 4.5, thumbnail: 'https://example.com/speaker.jpg' },
  { id: '2', title: 'Smart Watch', price: 200, category: 'wearable', rating: 4.0, thumbnail: 'https://example.com/watch.jpg' },
  { id: '3', title: 'Book', price: 10, category: 'books', rating: 5.0, thumbnail: 'https://example.com/book.jpg' },
];

describe('filterProducts', () => {
  it('filters by search query', () => {
    const result = filterProducts(products, 'audio', 'All', { min: 0, max: 1000 });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Audio Speaker');
  });

  it('filters by category', () => {
    const result = filterProducts(products, '', 'books', { min: 0, max: 1000 });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Book');
  });

  it('filters by price range', () => {
    const result = filterProducts(products, '', 'All', { min: 50, max: 150 });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Audio Speaker');
  });

  it('returns empty array if no match', () => {
    const result = filterProducts(products, 'xyz', 'All', { min: 0, max: 1000 });
    expect(result).toHaveLength(0);
  });

  it('combines all filters', () => {
    const result = filterProducts(products, 'smart', 'wearable', { min: 150, max: 250 });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Smart Watch');
  });
});
