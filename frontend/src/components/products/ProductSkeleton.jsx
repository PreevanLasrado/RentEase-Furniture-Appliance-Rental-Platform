import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-4 space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
      
      {/* Title & Price Skeleton */}
      <div className="flex justify-between items-start pt-2">
        <div className="space-y-2 w-2/3">
          <div className="h-6 bg-gray-200 rounded-md w-full"></div>
          <div className="h-6 bg-gray-200 rounded-md w-4/5"></div>
        </div>
        <div className="space-y-2 w-1/4 flex flex-col items-end">
          <div className="h-3 bg-gray-200 rounded-md w-12"></div>
          <div className="h-6 bg-gray-200 rounded-md w-16"></div>
        </div>
      </div>
      
      {/* Rating Skeleton */}
      <div className="h-4 bg-gray-200 rounded-md w-24"></div>
      
      {/* Buttons Placeholder */}
      <div className="flex gap-4 pt-2">
        <div className="h-10 bg-gray-200 rounded-full flex-1"></div>
        <div className="h-10 bg-gray-200 rounded-full flex-1"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
