import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CartSummary = ({ cart, subtotal, cartCount, onCheckout }) => {
  const navigate = useNavigate();

  // Discount logic: ₹200 discount if user rents 3 or more items, otherwise ₹0
  const discount = cartCount >= 3 ? 200 : 0;
  const deliveryFee = 0; // FREE Delivery
  const total = Math.max(0, subtotal - discount);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      // Navigate to checkout passing cart items and totals in state
      navigate('/checkout', {
        state: {
          cartItems: cart,
          totalAmount: total,
          subtotalAmount: subtotal,
          discountAmount: discount,
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6 sticky top-28">
      <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">
        Order Summary
      </h3>

      <div className="space-y-4">
        {/* Item count */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Items Count</span>
          <span className="text-gray-900 font-extrabold">{cartCount} items</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Subtotal Monthly Rent</span>
          <span className="text-gray-900 font-extrabold">{formatCurrency(subtotal)}</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Delivery Fee</span>
          <span className="text-emerald-600 font-extrabold uppercase text-xs bg-emerald-50 px-2 py-0.5 rounded">
            FREE
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Multi-item Discount</span>
            <span className="text-emerald-600 font-extrabold">
              -{formatCurrency(discount)}
            </span>
          </div>
        )}

        <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
              Total Monthly Rent
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {formatCurrency(total)}<span className="text-xs text-gray-500 font-medium">/mo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleCheckout}
          disabled={cartCount === 0}
          className={`w-full py-4 rounded-full font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
            cartCount === 0
              ? 'bg-gray-300 shadow-none cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5'
          }`}
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/furniture-appliances')}
          className="w-full py-4 rounded-full font-bold text-gray-600 border border-gray-250/80 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
