import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { fetchWishlistAPI, addWishlistAPI, removeWishlistAPI } from '../services/wishlistService';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const mapProduct = (prod) => {
    if (!prod) return null;
    return {
      id: prod.id || prod._id,
      name: prod.name,
      category: prod.category?.categoryName || prod.subCategory || 'Furniture',
      material: prod.material || 'Solid Wood',
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
    };
  };

  const fetchWishlist = useCallback(async () => {
    if (!user || !user.token) return;
    try {
      setLoading(true);
      const data = await fetchWishlistAPI();
      const mapped = data.map((item) => mapProduct(item.product)).filter(Boolean);
      setWishlistItems(mapped);
      setWishlistCount(mapped.length);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addWishlist = useCallback(async (product) => {
    if (!user || !user.token) {
      showAuthToast();
      return;
    }
    const productId = product.id || product._id;
    try {
      // Optimistic update
      const mappedProd = mapProduct(product);
      setWishlistItems((prev) => {
        if (prev.some((item) => item.id === productId)) return prev;
        const updated = [...prev, mappedProd];
        setWishlistCount(updated.length);
        return updated;
      });

      // API Call
      await addWishlistAPI(productId);

      // Toast Success
      toast.success('Added to Wishlist', {
        id: 'wishlist-add-toast',
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#FFF',
          fontWeight: '600',
          borderRadius: '9999px',
          padding: '12px 24px',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        },
      });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      // Revert on error
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  const removeWishlist = useCallback(async (productId) => {
    if (!user || !user.token) return;
    try {
      // Optimistic update
      setWishlistItems((prev) => {
        const updated = prev.filter((item) => item.id !== productId);
        setWishlistCount(updated.length);
        return updated;
      });

      // API Call
      await removeWishlistAPI(productId);
      
      // Silent removal: NO TOAST
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      // Revert on error
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    setWishlistCount(0);
    setLoading(false);
  }, []);

  const toggleWishlist = useCallback((product) => {
    if (!user || !user.token) {
      showAuthToast();
      return;
    }
    const productId = product.id || product._id;
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === productId);

    if (isAlreadyInWishlist) {
      removeWishlist(productId);
    } else {
      addWishlist(product);
    }
  }, [user, wishlistItems, addWishlist, removeWishlist]);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some((item) => item.id === productId);
  }, [wishlistItems]);

  const showAuthToast = () => {
    toast.error('Please login to add items to your wishlist.', {
      id: 'wishlist-auth-toast',
      position: 'top-center',
      style: {
        background: '#EF4444',
        color: '#FFF',
        fontWeight: '600',
        borderRadius: '9999px',
        padding: '12px 24px',
        boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
        whiteSpace: 'nowrap',
        maxWidth: 'none',
      },
    });
  };

  // Sync with user authentication status
  useEffect(() => {
    if (user && user.token) {
      fetchWishlist();
    } else {
      clearWishlist();
    }
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        fetchWishlist,
        addWishlist,
        removeWishlist,
        clearWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

