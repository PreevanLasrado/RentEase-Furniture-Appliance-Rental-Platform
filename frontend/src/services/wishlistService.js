import api from './api';

export const fetchWishlistAPI = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

export const addWishlistAPI = async (productId) => {
  const response = await api.post('/wishlist/add', { productId });
  return response.data;
};

export const removeWishlistAPI = async (productId) => {
  const response = await api.delete(`/wishlist/remove/${productId}`);
  return response.data;
};
