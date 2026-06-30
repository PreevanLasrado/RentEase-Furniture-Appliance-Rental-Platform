import React, { useState } from 'react';
import { Trash2, Heart } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import RemoveModal from './RemoveModal';
import { useWishlist } from '../../context/WishlistContext';

const CartItem = ({ item, onUpdateQuantity, onRemove, onViewDetails, onUpdateTenure }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const product = item.product || {};
  const quantity = item.quantity || 1;
  const rent = item.monthlyRent || product.monthlyRent || 0;

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const tenureOptions = product.tenureOptions && product.tenureOptions.length > 0
    ? product.tenureOptions
    : [
        { months: 3, rent: Math.round((product.monthlyRent || rent) * 1.2) },
        { months: 6, rent: Math.round((product.monthlyRent || rent) * 1.1) },
        { months: 12, rent: product.monthlyRent || rent },
        { months: 24, rent: Math.round((product.monthlyRent || rent) * 0.9) }
      ];

  const selectedOption = tenureOptions.find(opt => Number(opt.rent) === Number(rent)) || 
                         tenureOptions.find(opt => opt.months === 12) || 
                         tenureOptions[0];

  const getProductCategoryLabel = () => {
    const catName = product.subCategory || product.category?.categoryName || product.category || 'Furniture';
    if (typeof catName !== 'string') return 'Furniture';

    const appliances = [
      'refrigerators', 'washing machines', 'water purifiers', 'air purifiers',
      'air conditioners', 'televisions', 'microwaves', 'air coolers',
      'air fryers', 'dishwashers', 'gas stoves'
    ];

    const normalized = catName.toLowerCase().trim();
    const isAppliance = appliances.includes(normalized);

    let displayCat = catName;
    if (normalized === 'televisions') {
      displayCat = 'TV';
    } else if (normalized === 'sofas') {
      displayCat = 'Sofa';
    } else if (normalized === 'beds') {
      displayCat = 'Bed';
    } else if (normalized === 'mattresses') {
      displayCat = 'Mattress';
    } else if (normalized === 'wardrobes' || normalized === 'wardrobe') {
      displayCat = 'Wardrobe';
    } else if (normalized === 'chairs') {
      displayCat = 'Chair';
    } else if (normalized === 'dining' || normalized === 'dining tables') {
      displayCat = 'Dining';
    }

    return isAppliance ? `Appliance - ${displayCat}` : `Furniture - ${displayCat}`;
  };

  const handleIncrease = () => {
    onUpdateQuantity(item._id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      setIsRemoveModalOpen(true);
    } else {
      onUpdateQuantity(item._id, quantity - 1);
    }
  };

  const handleSaveForLater = () => {
    const prodId = product._id || product.id;
    const inWish = isInWishlist(prodId);

    if (!inWish) {
      toggleWishlist(product);
    }
    onRemove(item._id, true); // silent remove from cart
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-150/80 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center">
      {/* Product Image */}
      <div className="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
        <img
          src={product.images && product.images[0] ? product.images[0] : (product.image || '/placeholder.jpg')}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow space-y-1 text-center sm:text-left min-w-0 w-full">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest py-1 rounded-full w-fit">
          {getProductCategoryLabel()}
        </span>
        <h4 className="text-lg font-black text-gray-900 truncate mt-1">
          {product.name || 'RentEase Premium Rental'}
        </h4>
        <p className="text-gray-500 text-xs font-medium line-clamp-1">
          {product.description || 'Flexible furniture subscription plan'}
        </p>
        <p className="text-sm font-bold text-gray-800 pt-1">
          Rent: <span className="text-gray-900 font-extrabold">{formatCurrency(rent)}</span>/mo
        </p>
        <div className="flex items-center gap-2 mt-1.5 justify-center sm:justify-start">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Plan:</span>
          <select
            value={selectedOption.months}
            onChange={(e) => {
              const months = Number(e.target.value);
              const opt = tenureOptions.find(o => o.months === months);
              if (opt && onUpdateTenure) {
                onUpdateTenure(item._id, opt.rent);
              }
            }}
            className="text-xs font-bold bg-gray-50 border border-gray-250 rounded-lg px-2 py-0.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 text-gray-700 cursor-pointer"
          >
            {tenureOptions.map(opt => (
              <option key={opt.months} value={opt.months}>
                {opt.months} Months ({formatCurrency(opt.rent)}/mo)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls: Selector and Action links */}
      <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto">
        <div className="flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <button
            onClick={() => setIsRemoveModalOpen(true)}
            className="p-2.5 text-gray-400 hover:text-primary hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            title="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* View Details Link */}
        <button
          onClick={() => onViewDetails(item)}
          className="text-xs font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer hover:underline mr-1.5"
        >
          View Details
        </button>
      </div>

      {/* Remove Confirmation Modal */}
      <RemoveModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={() => {
          setIsRemoveModalOpen(false);
          onRemove(item._id);
        }}
        itemName={product.name}
      />
    </div>
  );
};

export default CartItem;
