export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  category?: string;
  thumbnail: string;
  images?: string[];
  description?: string;
}
