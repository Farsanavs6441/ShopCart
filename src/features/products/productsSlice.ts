import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  images?: string[];
  category?: string;
}

interface ProductsState {
  items: Product[];
  lastFetched: number | null;
}

const initialState: ProductsState = {
  items: [],
  lastFetched: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.lastFetched = Date.now();
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
