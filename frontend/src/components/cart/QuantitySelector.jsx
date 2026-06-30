import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border border-gray-250/80 rounded-xl overflow-hidden bg-gray-50/50 w-fit">
      <button
        onClick={onDecrease}
        className="px-3.5 py-2 hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors flex items-center justify-center cursor-pointer border-r border-gray-250/80"
        title="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      
      <span className="px-4 py-1 text-sm font-extrabold text-gray-800 select-none text-center min-w-[36px]">
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        className="px-3.5 py-2 hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors flex items-center justify-center cursor-pointer border-l border-gray-250/80"
        title="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
