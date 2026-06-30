import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CategorySlider from '../components/categories/CategorySlider';
import FilterSidebar from '../components/filters/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';
import ProductDetailsModal from '../components/products/ProductDetailsModal';
import { fetchProducts } from '../services/productService';
import { categories } from '../data/furnitureAppliancesData';
import { motion } from 'framer-motion';

const FurnitureAppliances = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sidebar filters state
  const [filters, setFilters] = useState({
    status: [], // 'in-stock', 'out-of-stock'
    budget: [], // '0-500', '501-1000', '1001-2000', '2000+'
    materials: [],
    ratings: null,
    categories: [], // quick categories
  });

  // Modal details state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Handle category passed via state
  useEffect(() => {
    if (location.state?.category) {
      const catName = location.state.category;
      
      let mappedName = catName;
      if (catName.toLowerCase() === 'dining tables') {
        mappedName = 'Dining';
      } else if (catName.toLowerCase() === 'office furniture') {
        mappedName = 'Chairs';
      }
      
      const matchedCat = categories.find(
        (c) => c.name.toLowerCase() === mappedName.toLowerCase()
      );
      
      if (matchedCat) {
        setSelectedCategory(matchedCat.name);
        setSelectedGroup(matchedCat.group);
      } else {
        setSelectedCategory(mappedName);
      }
      
      // Clear location state to prevent sticky filter
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Handle search query and opening specific product passed via state
  useEffect(() => {
    if (location.state?.searchQuery !== undefined) {
      setSearchTerm(location.state.searchQuery || '');
      // Reset other filters for a clean search view
      setSelectedGroup('All');
      setSelectedCategory('All');
      setFilters({
        status: [],
        budget: [],
        materials: [],
        ratings: null,
        categories: [],
      });
      // Clear location state to prevent sticky filter
      navigate(location.pathname, { replace: true, state: {} });
    }
    
    if (location.state?.openProduct) {
      setSelectedProduct(location.state.openProduct);
      setIsModalOpen(true);
      // Clear location state to prevent modal reopening on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Filter products whenever products, selectedGroup, selectedCategory, or filters change
  useEffect(() => {
    let result = [...products];

    // 1. Group Tab Filter
    if (selectedGroup !== 'All') {
      result = result.filter((product) => {
        const catObj = categories.find(
          (cat) => cat.name.toLowerCase() === product.category.toLowerCase()
        );
        return catObj && catObj.group.toLowerCase() === selectedGroup.toLowerCase();
      });
    }

    // 2. Top Category Slider Filter
    if (selectedCategory !== 'All' && selectedCategory !== null) {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Sidebar Status Filter
    if (filters.status.length > 0) {
      result = result.filter((product) => {
        const inStock = product.stock > 0;
        if (filters.status.includes('in-stock') && inStock) return true;
        if (filters.status.includes('out-of-stock') && !inStock) return true;
        return false;
      });
    }

    // 4. Sidebar Budget Filter
    if (filters.budget.length > 0) {
      result = result.filter((product) => {
        const rent = product.monthlyRent;
        return filters.budget.some((bracket) => {
          if (bracket === '0-500') return rent <= 500;
          if (bracket === '501-1000') return rent > 500 && rent <= 1000;
          if (bracket === '1001-2000') return rent > 1000 && rent <= 2000;
          if (bracket === '2000+') return rent > 2000;
          return false;
        });
      });
    }

    // 5. Sidebar Materials Filter
    if (filters.materials.length > 0) {
      result = result.filter((product) =>
        filters.materials.some(
          (mat) => product.material && product.material.toLowerCase() === mat.toLowerCase()
        )
      );
    }

    // 6. Sidebar Ratings Filter
    if (filters.ratings !== null) {
      result = result.filter((product) => product.rating >= filters.ratings);
    }

    // 7. Sidebar Quick Categories Filter
    // Note: If top slider is set to a specific category, we respect that, but if top slider is "All",
    // then sidebar quick category filters can filter across categories.
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.some(
          (cat) => product.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    // 8. Search Term Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          (product.description && product.description.toLowerCase().includes(term))
      );
    }

    setFilteredProducts(result);
  }, [products, selectedGroup, selectedCategory, filters, searchTerm]);

  // Extract unique category names for the sidebar quick category filter
  const availableCategories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedGroup('All');
    setSelectedCategory('All');
    setFilters({
      status: [],
      budget: [],
      materials: [],
      ratings: null,
      categories: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-[#1F1F1F]">
      {/* Existing Navbar */}
      <Navbar />

      {/* Page Content Starts below fixed navbar */}
      <main className="flex-grow pt-20">
        
        {/* Category Slider Section */}
        <CategorySlider
          selectedGroup={selectedGroup}
          onSelectGroup={(group) => {
            setSelectedGroup(group);
            setSelectedCategory('All');
            // Clear quick category sidebar selections to avoid conflicting filters
            setFilters((prev) => ({ ...prev, categories: [] }));
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            // Clear quick category sidebar selections to avoid conflicting filters
            setFilters((prev) => ({ ...prev, categories: [] }));
          }}
        />

        {/* Main Content Area */}
        <div className="container mx-auto px-6 md:px-18 py-10">
          
          {/* Title & Count Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 flex flex-wrap items-center gap-3">
                {searchTerm ? (
                  <>
                    <span>Search Results for "{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-xs font-extrabold text-[#E53935] bg-red-50 px-3 py-1 rounded-full border border-red-100 cursor-pointer hover:bg-red-100/50 transition-colors"
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  selectedCategory === 'All' ? 'Furniture & Appliances' : selectedCategory
                )}
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Showing {loading ? '...' : filteredProducts.length} premium products available for rent
              </p>
            </div>
            
            {/* Active breadcrumbs or helper info */}
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white py-2.5 px-5 rounded-full border border-gray-100 shadow-xs">
              Home / {selectedCategory}
            </div>
          </div>

          {/* Two Column Layout (Filter + Grid) */}
          <div className="flex flex-col lg:flex-row gap-8 relative items-start">
            
            {/* Left Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              availableCategories={availableCategories}
            />

            {/* Right Product Grid */}
            <div className="flex-1 w-full">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onViewDetails={handleOpenDetails}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FurnitureAppliances;
