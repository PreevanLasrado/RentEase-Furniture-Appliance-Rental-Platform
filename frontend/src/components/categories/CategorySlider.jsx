import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Armchair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/furnitureAppliancesData';

const CategorySlider = ({
  selectedGroup,
  onSelectGroup,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Filter categories based on active group
  const filteredCategories = categories.filter(
    (cat) => selectedGroup === 'All' || cat.group.toLowerCase() === selectedGroup.toLowerCase()
  );

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [filteredCategories]);

  // Reset scroll position to beginning when group changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      // Wait for smooth scroll animation to finish before updating navigation arrows visibility
      setTimeout(checkScrollPosition, 350);
    }
  }, [selectedGroup]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      // Small timeout to allow smooth scroll completion before checking position
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 select-none relative group/slider">
      <div className="container mx-auto px-6 md:px-18">

        {/* Top Filters: Groups (Furniture & Appliances) */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 p-1 bg-white rounded-full w-fit">
            {['All', 'Furniture', 'Appliances'].map((group) => (
              <button
                key={group}
                onClick={() => {
                  onSelectGroup(group);
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedGroup.toLowerCase() === group.toLowerCase()
                  ? 'bg-white text-gray-900 shadow-sm outline-red-600 outline-1 outline-offset-2'
                  : 'text-gray-500 hover:text-red-600'
                  }`}
              >
                {group}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">
            RentEase Categories
          </span>
        </div>

        {/* Categories Horizontal Slider */}
        <div className="relative">

          {/* Left Navigation Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity duration-300 -ml-5"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Slider Content Wrapper */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* "All Products" Card
            <motion.div
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory('All')}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl border-2 transition-all duration-300 cursor-pointer p-3 text-center ${selectedCategory === 'All'
                ? 'border-[#E53935] bg-red-50/40 text-[#E53935] shadow-[0_8px_20px_rgba(229,57,53,0.15)] font-bold'
                : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
                }`}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2.5 transition-colors ${selectedCategory === 'All' ? 'bg-red-100/50' : 'bg-gray-50'
                }`}>
                <Armchair className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-xs md:text-sm tracking-tight font-medium leading-none">
                All Products
              </span>
            </motion.div> */}

            {/* Filtered Categories */}
            {filteredCategories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <motion.div
                  key={cat.id}
                  layout
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectCategory(cat.name)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-3xl border-2 transition-all duration-300 cursor-pointer p-3 text-center ${isActive
                    ? 'border-[#E53935] bg-red-50/40 text-[#E53935] shadow-[0_8px_20px_rgba(229,57,53,0.15)] font-bold'
                    : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
                    }`}
                >
                  <div className={`w-14 h-14 md:w-15 md:h-15 rounded-full overflow-hidden flex items-center justify-center mb-2.5 transition-all ${isActive ? 'bg-white' : 'bg-gray-50'
                    }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs md:text-sm tracking-tight font-medium leading-none">
                    {cat.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Right Navigation Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white border border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity duration-300 -mr-5"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CategorySlider;
