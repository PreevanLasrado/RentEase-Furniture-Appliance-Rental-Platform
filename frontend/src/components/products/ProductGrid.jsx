import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { RefreshCw } from 'lucide-react';

const ProductGrid = ({ products, loading, onViewDetails, onClearFilters }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {[...Array(6)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-gray-200 shadow-sm w-full">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-primary mb-4 animate-bounce">
          <RefreshCw className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-extrabold text-gray-900 mb-1">No products found</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6 font-medium">
          We couldn't find any products matching your active filters. Try adjusting your selections or clearing all filters.
        </p>
        
        <button
          onClick={onClearFilters}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
