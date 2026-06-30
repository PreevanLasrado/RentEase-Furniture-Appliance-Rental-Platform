import api from './api';
import { products as mockProducts } from '../data/furnitureAppliancesData';

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    if (response.data && response.data.length > 0) {
      // Map backend products schema to match our frontend UI structure if needed
      return response.data.map((prod) => ({
        id: prod._id,
        name: prod.name,
        // Resolve category object or use subCategory/string
        category: prod.category?.categoryName || prod.subCategory || 'Furniture',
        material: prod.material || 'Solid Wood', // default fallback
        monthlyRent: prod.monthlyRent,
        securityDeposit: prod.securityDeposit || prod.monthlyRent,
        rating: prod.rating || 4.5,
        reviewsCount: prod.reviewsCount || 42,
        stock: prod.stock,
        stockStatus: prod.stockStatus || (prod.stock > 0 ? 'In Stock' : 'Out of Stock'),
        availability: prod.availability !== undefined ? prod.availability : (prod.stock > 0),
        deliveryTime: prod.deliveryTime || '2-3 Days',
        badge: prod.badge || '',
        image: (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
        images: prod.images || [],
        description: prod.description || 'No description available',
        specifications: prod.specifications || {},
        tenureOptions: prod.tenureOptions || [
          { months: 3, rent: Math.round(prod.monthlyRent * 1.2) },
          { months: 6, rent: Math.round(prod.monthlyRent * 1.1) },
          { months: 12, rent: prod.monthlyRent },
          { months: 24, rent: Math.round(prod.monthlyRent * 0.9) }
        ]
      }));
    }
    return mockProducts;
  } catch (error) {
    console.warn("Backend products fetch failed, using premium local mock products instead.", error);
    return mockProducts;
  }
};
