import React, { useState } from 'react';
import { Filter, X, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = ({ filters, setFilters, availableCategories }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const clearAllFilters = () => {
    setFilters({
      status: [], // 'in-stock', 'out-of-stock'
      budget: [], // '0-500', '501-1000', '1001-2000', '2000+'
      materials: [],
      ratings: null,
      categories: [],
    });
  };

  const handleStatusChange = (statusVal) => {
    setFilters((prev) => {
      const isAlreadyChecked = prev.status.includes(statusVal);
      const updatedStatus = isAlreadyChecked
        ? prev.status.filter((s) => s !== statusVal)
        : [...prev.status, statusVal];
      return { ...prev, status: updatedStatus };
    });
  };

  const handleBudgetChange = (budgetVal) => {
    setFilters((prev) => {
      const isAlreadyChecked = prev.budget.includes(budgetVal);
      const updatedBudget = isAlreadyChecked
        ? prev.budget.filter((b) => b !== budgetVal)
        : [...prev.budget, budgetVal];
      return { ...prev, budget: updatedBudget };
    });
  };

  const handleMaterialChange = (materialVal) => {
    setFilters((prev) => {
      const isAlreadyChecked = prev.materials.includes(materialVal);
      const updatedMaterials = isAlreadyChecked
        ? prev.materials.filter((m) => m !== materialVal)
        : [...prev.materials, materialVal];
      return { ...prev, materials: updatedMaterials };
    });
  };

  const handleRatingChange = (ratingVal) => {
    setFilters((prev) => ({
      ...prev,
      ratings: prev.ratings === ratingVal ? null : ratingVal,
    }));
  };

  const handleCategoryChange = (categoryVal) => {
    setFilters((prev) => {
      const isAlreadyChecked = prev.categories.includes(categoryVal);
      const updatedCategories = isAlreadyChecked
        ? prev.categories.filter((c) => c !== categoryVal)
        : [...prev.categories, categoryVal];
      return { ...prev, categories: updatedCategories };
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    count += filters.status.length;
    count += filters.budget.length;
    count += filters.materials.length;
    count += filters.categories.length;
    if (filters.ratings !== null) count += 1;
    return count;
  };

  const activeCount = getActiveFilterCount();

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          Filters
          {activeCount > 0 && (
            <span className="bg-red-50 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* A. PRODUCT STATUS */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Product Availability</h4>
        <div className="flex gap-2">
          {['In Stock', 'Out of Stock'].map((status) => {
            const val = status === 'In Stock' ? 'in-stock' : 'out-of-stock';
            const isActive = filters.status.includes(val);
            return (
              <button
                key={status}
                onClick={() => handleStatusChange(val)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#E53935] bg-red-50/50 text-[#E53935]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* B. MONTHLY BUDGET */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Monthly Budget</h4>
        <div className="space-y-2.5">
          {[
            { label: 'Under ₹500', val: '0-500' },
            { label: '₹501 - ₹1000', val: '501-1000' },
            { label: '₹1001 - ₹2000', val: '1001-2000' },
            { label: '₹2000 & Above', val: '2000+' }
          ].map((item) => {
            const isChecked = filters.budget.includes(item.val);
            return (
              <label
                key={item.val}
                className="flex items-center gap-3 cursor-pointer select-none group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBudgetChange(item.val)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'border-[#E53935] bg-[#E53935] text-white shadow-sm'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </div>
                <span className={`text-sm font-medium ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* C. MATERIAL */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Material</h4>
        <div className="flex flex-wrap gap-2">
          {['Foam', 'Leatherette', 'Metal', 'Solid Wood', 'Engineered Wood', 'Plastic'].map((mat) => {
            const isActive = filters.materials.includes(mat);
            return (
              <button
                key={mat}
                onClick={() => handleMaterialChange(mat)}
                className={`py-1.5 px-3 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#E53935] bg-[#E53935] text-white'
                    : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
                }`}
              >
                {mat}
              </button>
            );
          })}
        </div>
      </div>

      {/* D. RATINGS */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Ratings</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((stars) => {
            const isActive = filters.ratings === stars;
            return (
              <button
                key={stars}
                onClick={() => handleRatingChange(stars)}
                className={`w-full flex items-center justify-between py-1.5 px-3 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'border-[#E53935] bg-red-50/50 text-[#E53935]'
                    : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-gray-200'}`}
                    />
                  ))}
                  <span className="text-gray-700 font-bold ml-1">{stars}★ & above</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-[#E53935]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* E. QUICK CATEGORIES FILTER */}
      <div>
        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Quick Categories</h4>
        <div className="space-y-2.5">
          {availableCategories.map((cat) => {
            const isChecked = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer select-none group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryChange(cat)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'border-[#E53935] bg-[#E53935] text-white shadow-sm'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </div>
                <span className={`text-sm font-medium ${isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-28 w-[280px] p-6 bg-white rounded-3xl border border-gray-200 shadow-sm self-start">
        <SidebarContent />
      </aside>

      {/* Mobile Sticky Filters Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-gray-900 text-white px-6 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-[#E53935] active:scale-95 transition-all text-sm uppercase tracking-wider cursor-pointer"
        >
          <Filter className="w-4 h-4 text-primary" />
          Filter Options
          {activeCount > 0 && (
            <span className="bg-[#E53935] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ml-1 animate-pulse">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            {/* Content Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between"
            >
              <div className="overflow-y-auto pr-1 no-scrollbar flex-1 pb-16">
                {/* Close Button on top-right of mobile drawer */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <SidebarContent />
              </div>

              {/* Mobile Sticky Apply Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
                <button
                  onClick={() => {
                    clearAllFilters();
                    setIsMobileOpen(false);
                  }}
                  className="flex-1 py-3.5 border border-gray-200 rounded-full font-bold text-gray-600 text-sm cursor-pointer"
                >
                  Reset
                </button>
                
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-2 py-3.5 bg-[#E53935] hover:bg-[#C62828] text-white rounded-full font-bold text-sm shadow-md cursor-pointer"
                >
                  Apply Filters ({activeCount})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
