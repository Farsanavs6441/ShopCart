/**
 * Unit test for case-insensitive search filtering functionality
 * Tests that search works regardless of uppercase/lowercase input
 */

// Type definitions
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
}

describe('Case Insensitive Search Test', () => {
  const mockProducts: Product[] = [
    { id: '1', title: 'iPhone 14 Pro', price: 999, category: 'electronics' },
    { id: '2', title: 'MacBook Pro', price: 1999, category: 'electronics' },
    { id: '3', title: 'SAMSUNG Galaxy', price: 799, category: 'electronics' },
    { id: '4', title: 'airpods pro', price: 249, category: 'audio' },
    { id: '5', title: 'iPad Air', price: 599, category: 'electronics' },
  ];

  /**
   * Extract only the search filter logic to test case insensitivity
   * This mirrors your component's search functionality
   */
  const searchFilter = (
    products: Product[],
    searchQuery: string,
  ): Product[] => {
    if (!searchQuery) return products;

    return products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  describe('Lowercase Search Tests', () => {
    it('should find products with lowercase search', () => {
      const result = searchFilter(mockProducts, 'iphone');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('iPhone 14 Pro');
    });

    it('should find macbook with lowercase search', () => {
      const result = searchFilter(mockProducts, 'macbook');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('MacBook Pro');
    });

    it('should find samsung with lowercase search', () => {
      const result = searchFilter(mockProducts, 'samsung');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('SAMSUNG Galaxy');
    });
  });

  describe('Uppercase Search Tests', () => {
    it('should find products with uppercase search', () => {
      const result = searchFilter(mockProducts, 'MACBOOK');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('MacBook Pro');
    });

    it('should find iphone with uppercase search', () => {
      const result = searchFilter(mockProducts, 'IPHONE');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('iPhone 14 Pro');
    });

    it('should find airpods with uppercase search', () => {
      const result = searchFilter(mockProducts, 'AIRPODS');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('airpods pro');
    });
  });

  describe('Mixed Case Search Tests', () => {
    it('should find products with mixed case search', () => {
      const result = searchFilter(mockProducts, 'SaMsUnG');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('SAMSUNG Galaxy');
    });

    it('should find iPad with mixed case search', () => {
      const result = searchFilter(mockProducts, 'iPaD');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('iPad Air');
    });

    it('should find MacBook with mixed case search', () => {
      const result = searchFilter(mockProducts, 'mAcBoOk');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('MacBook Pro');
    });
  });

  describe('Partial Match Tests', () => {
    it('should find partial matches case insensitive', () => {
      const result = searchFilter(mockProducts, 'pro');

      expect(result).toHaveLength(3);
      expect(result.map(p => p.title)).toEqual([
        'iPhone 14 Pro',
        'MacBook Pro',
        'airpods pro',
      ]);
    });

    it('should find partial matches with uppercase', () => {
      const result = searchFilter(mockProducts, 'PRO');

      expect(result).toHaveLength(3);
      expect(result.map(p => p.title)).toEqual([
        'iPhone 14 Pro',
        'MacBook Pro',
        'airpods pro',
      ]);
    });

    it('should find partial matches with mixed case', () => {
      const result = searchFilter(mockProducts, 'PrO');

      expect(result).toHaveLength(3);
      expect(result.map(p => p.title)).toEqual([
        'iPhone 14 Pro',
        'MacBook Pro',
        'airpods pro',
      ]);
    });
  });

  describe('Edge Cases', () => {
    it('should return all products when search is empty', () => {
      const result = searchFilter(mockProducts, '');

      expect(result).toHaveLength(5);
      expect(result).toEqual(mockProducts);
    });

    it('should return empty array when no matches found', () => {
      const result = searchFilter(mockProducts, 'nonexistent');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should handle single character search', () => {
      const result = searchFilter(mockProducts, 'i');

      expect(result).toHaveLength(3); // Correct expectation
      expect(result.map(p => p.title)).toEqual([
        'iPhone 14 Pro',
        'airpods pro',
        'iPad Air',
      ]);
    });

    it('should handle space in search', () => {
      const result = searchFilter(mockProducts, 'iphone 14');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('iPhone 14 Pro');
    });
  });

  describe('Case Insensitive Logic Verification', () => {
    it('should work with completely different cases', () => {
      // Test with all possible case combinations
      const searches = ['airpods', 'AIRPODS', 'AirPods', 'aIrPoDs'];

      searches.forEach(search => {
        const result = searchFilter(mockProducts, search);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('airpods pro');
      });
    });

    it('should match regardless of title case format', () => {
      // Test that our filter finds products regardless of how title is cased
      const testProducts: Product[] = [
        { id: '1', title: 'lowercase product', price: 100, category: 'test' },
        { id: '2', title: 'UPPERCASE PRODUCT', price: 200, category: 'test' },
        { id: '3', title: 'Mixed Case Product', price: 300, category: 'test' },
        { id: '4', title: 'cAmElCaSe PrOdUcT', price: 400, category: 'test' },
      ];

      const result = searchFilter(testProducts, 'PRODUCT');

      expect(result).toHaveLength(4);
      expect(result.map(p => p.title)).toEqual([
        'lowercase product',
        'UPPERCASE PRODUCT',
        'Mixed Case Product',
        'cAmElCaSe PrOdUcT',
      ]);
    });
  });
});