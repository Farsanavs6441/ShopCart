import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
