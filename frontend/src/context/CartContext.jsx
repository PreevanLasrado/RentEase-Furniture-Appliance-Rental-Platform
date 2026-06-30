import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to fetch cart from backend
  const fetchCartFromBackend = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart from backend:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sync cart depending on login state
  useEffect(() => {
    const syncCartOnAuthStateChange = async () => {
      if (user && user.token) {
        // User logged in: Check if we have guest items in localStorage to merge
        const storedGuestCart = localStorage.getItem('rentease_guest_cart');
        if (storedGuestCart) {
          try {
            const guestItems = JSON.parse(storedGuestCart);
            if (Array.isArray(guestItems) && guestItems.length > 0) {
              // Upload guest items to backend database
              for (const item of guestItems) {
                if (item.product && item.product._id) {
                  await api.post('/cart/add', {
                    productId: item.product._id,
                    quantity: item.quantity,
                  });
                }
              }
            }
          } catch (e) {
            console.error('Error syncing guest cart items to backend:', e);
          } finally {
            // Clean guest cart once uploaded
            localStorage.removeItem('rentease_guest_cart');
          }
        }
        // Load combined user cart from DB
        await fetchCartFromBackend();
      } else {
        // Guest mode: load from localStorage
        const storedGuestCart = localStorage.getItem('rentease_guest_cart');
        if (storedGuestCart) {
          try {
            setCart(JSON.parse(storedGuestCart));
          } catch (e) {
            console.error('Failed to parse guest cart storage:', e);
            setCart([]);
          }
        } else {
          setCart([]);
        }
      }
    };

    syncCartOnAuthStateChange();
  }, [user]);

  // Save guest cart changes to localStorage (runs only in guest mode)
  useEffect(() => {
    if (!user || !user.token) {
      localStorage.setItem('rentease_guest_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Add Item to Cart
  const addToCart = async (product, quantity = 1, tenureMonths = 12) => {
    if (!product || (!product._id && !product.id)) {
      toast.error('Invalid product structure');
      return;
    }

    const productId = product._id || product.id;
    const selectedOption = product.tenureOptions?.find(opt => opt.months === Number(tenureMonths));
    const rent = selectedOption ? selectedOption.rent : product.monthlyRent;

    if (user && user.token) {
      // Backend integration
      try {
        setLoading(true);
        const { data } = await api.post('/cart/add', {
          productId,
          quantity,
          monthlyRent: rent,
        });
        
        if (data.success) {
          toast.success('Item added to cart', {
            id: 'cart-add-toast',
            position: 'top-center',
            style: {
              background: '#10B981',
              color: '#FFF',
              fontWeight: '600',
              borderRadius: '9999px',
              padding: '12px 24px',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
            },
            icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          });
          // Refetch to sync state
          await fetchCartFromBackend();
        }
      } catch (error) {
        console.error('Error adding item to cart:', error.message);
        toast.error(error.response?.data?.message || 'Failed to add item to cart');
      } finally {
        setLoading(false);
      }
    } else {
      // Guest mode localStorage integration
      setCart((prevCart) => {
        const existingIdx = prevCart.findIndex((item) => (item.product._id || item.product.id) === productId);
        let updatedCart = [...prevCart];

        if (existingIdx > -1) {
          // Increase quantity by 1
          updatedCart[existingIdx] = {
            ...updatedCart[existingIdx],
            quantity: updatedCart[existingIdx].quantity + Number(quantity),
            monthlyRent: rent,
          };
        } else {
          // Create new guest cart item
          updatedCart.push({
            _id: 'guest-' + Date.now() + Math.random().toString(36).substr(2, 4),
            product,
            quantity: Number(quantity),
            monthlyRent: rent,
          });
        }

        toast.success('Item added to cart', {
          id: 'cart-add-toast',
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#FFF',
            fontWeight: '600',
            borderRadius: '9999px',
            padding: '12px 24px',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          },
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
        });

        return updatedCart;
      });
    }
  };

  // Remove Item from Cart
  const removeFromCart = async (cartItemId) => {
    if (user && user.token) {
      try {
        setLoading(true);
        const { data } = await api.delete(`/cart/remove/${cartItemId}`);
        if (data.success) {
          toast.success('Item removed from cart', {
            id: 'cart-remove-toast',
            position: 'top-center',
            style: {
              background: '#374151',
              color: '#FFF',
              fontWeight: '500',
              borderRadius: '9999px',
              padding: '10px 20px',
            },
          });
          await fetchCartFromBackend();
        }
      } catch (error) {
        console.error('Error removing item from cart:', error.message);
        toast.error('Failed to remove item');
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) => prevCart.filter((item) => item._id !== cartItemId));
      toast.success('Item removed from cart', {
        id: 'cart-remove-toast',
        position: 'top-center',
        style: {
          background: '#374151',
          color: '#FFF',
          fontWeight: '500',
          borderRadius: '9999px',
          padding: '10px 20px',
        },
      });
    }
  };

  // Update Item Quantity
  const updateQuantity = async (cartItemId, quantity) => {
    const qtyNum = Number(quantity);
    if (qtyNum <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    if (user && user.token) {
      try {
        setLoading(true);
        const { data } = await api.put(`/cart/update/${cartItemId}`, {
          quantity: qtyNum,
        });
        if (data.success) {
          await fetchCartFromBackend();
        }
      } catch (error) {
        console.error('Error updating cart quantity:', error.message);
        toast.error('Failed to update quantity');
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItemId ? { ...item, quantity: qtyNum } : item
        )
      );
    }
  };

  // Update Item Monthly Rent / Tenure
  const updateCartItemRent = async (cartItemId, rent) => {
    const rentNum = Number(rent);
    if (user && user.token) {
      try {
        setLoading(true);
        const { data } = await api.put(`/cart/update/${cartItemId}`, {
          monthlyRent: rentNum,
        });
        if (data.success) {
          toast.success('Rental tenure updated', {
            id: 'cart-update-toast',
            position: 'top-center',
            style: {
              background: '#10B981',
              color: '#FFF',
              fontWeight: '600',
              borderRadius: '9999px',
              padding: '12px 24px',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
            },
            icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          });
          await fetchCartFromBackend();
        }
      } catch (error) {
        console.error('Error updating cart item rent:', error.message);
        toast.error('Failed to update tenure');
      } finally {
        setLoading(false);
      }
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItemId ? { ...item, monthlyRent: rentNum } : item
        )
      );
      toast.success('Rental tenure updated', {
        id: 'cart-update-toast',
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#FFF',
          fontWeight: '600',
          borderRadius: '9999px',
          padding: '12px 24px',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
        },
        icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      });
    }
  };

  // Clear Entire Cart
  const clearCart = async () => {
    if (user && user.token) {
      try {
        setLoading(true);
        const { data } = await api.delete('/cart/clear');
        if (data.success) {
          setCart([]);
        }
      } catch (error) {
        console.error('Error clearing cart:', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setCart([]);
    }
  };

  // Dynamic values calculated from current cart state
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + (item.monthlyRent || item.product?.monthlyRent || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItemRent,
        clearCart,
        refetchCart: fetchCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
