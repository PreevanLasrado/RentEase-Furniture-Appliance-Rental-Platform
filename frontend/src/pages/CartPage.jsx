import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import ProductDetailsModal from '../components/products/ProductDetailsModal';
import CheckoutModal from '../components/cart/CheckoutModal';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, updateCartItemRent, loading } = useCart();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const mapProduct = (prod) => {
    if (!prod) return null;
    return {
      id: prod._id || prod.id,
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

  const handleOpenDetails = (cartItem) => {
    if (!cartItem) return;
    const prod = cartItem.product;
    const mapped = mapProduct(prod);
    if (mapped) {
      setSelectedProduct({
        ...mapped,
        cartItemId: cartItem._id,
        currentMonthlyRent: cartItem.monthlyRent,
      });
      setIsDetailsOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-[#1F1F1F]"
    >
      {/* Navbar fixed at the top */}
      <Navbar />

      {/* Main Container Flow */}
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          
          {loading && cart.length === 0 ? (
            // Full screen loader inside main content
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Syncing your cart...</p>
            </div>
          ) : cart.length === 0 ? (
            // Empty State
            <div className="py-12">
              <EmptyCart />
            </div>
          ) : (
            // Filled Cart Layout: 70% Left | 30% Right
            <div className="space-y-8">
              {/* Header with Item Count Badge */}
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  My Cart
                </h2>
                <span className="text-sm font-extrabold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Cart Item List (70% width on Desktop) */}
                <div className="lg:col-span-8 space-y-5">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                        onViewDetails={handleOpenDetails}
                        onUpdateTenure={updateCartItemRent}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Right Side: Sticky Order Summary (30% width on Desktop) */}
                <div className="lg:col-span-4">
                  <CartSummary
                    cart={cart}
                    subtotal={cartTotal}
                    cartCount={cartCount}
                    onCheckout={() => {
                      if (!user) {
                        toast.error('Please log in to proceed to checkout');
                        const loginBtn = document.querySelector('button[class*="Login / Signup"]');
                        if (loginBtn) {
                          loginBtn.click();
                        }
                        return;
                      }
                      
                      // Validate if any item in cart is Out of Stock or exceeds available stock
                      const hasOutOfStock = cart.some(item => {
                        const prod = item.product;
                        return prod.stockStatus === 'Out of Stock' || prod.availability === false || prod.stock < item.quantity;
                      });

                      if (hasOutOfStock) {
                        toast.error('This product is no longer available in the requested quantity.', {
                          id: 'out-of-stock-checkout-err',
                        });
                        return;
                      }

                      setIsCheckoutOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>

      {/* Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        isCartView={true}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Global Footer */}
      <Footer />
    </motion.div>
  );
};

export default CartPage;
