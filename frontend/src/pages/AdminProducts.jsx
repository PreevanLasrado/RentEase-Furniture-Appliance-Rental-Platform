import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, RefreshCw, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/stats');
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to retrieve products', err);
      toast.error('Failed to retrieve products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateStock = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'In Stock' ? 'Out of Stock' : 'In Stock';
    try {
      setUpdatingId(productId);
      const { data } = await api.put(`/products/${productId}`, {
        stockStatus: newStatus
      });
      if (data) {
        setProducts(prev => prev.map(p => p._id === productId ? { 
          ...p, 
          stockStatus: newStatus, 
          availability: newStatus === 'In Stock', 
          stock: newStatus === 'In Stock' ? (p.stock || 1) : 0 
        } : p));
        toast.success(`Product updated to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update product stock status', err);
      toast.error('Failed to update stock status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAdjustStockQty = async (productId, currentStock, amount) => {
    const newStock = Math.max(0, currentStock + amount);
    try {
      setUpdatingId(productId + '_qty');
      const { data } = await api.put(`/products/${productId}`, {
        stock: newStock
      });
      if (data) {
        setProducts(prev => prev.map(p => p._id === productId ? { 
          ...p, 
          stock: newStock, 
          availability: newStock > 0, 
          stockStatus: newStock > 0 ? 'In Stock' : 'Out of Stock' 
        } : p));
        toast.success(`Stock adjusted to ${newStock}`);
      }
    } catch (err) {
      console.error('Failed to adjust product stock quantity', err);
      toast.error('Failed to adjust stock quantity');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-[#1F1F1F]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          
          {/* Back to Dashboard */}
          <div className="mb-6">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manage Product Inventory</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Directly adjust quantities and toggle availability status for catalog products.</p>
            </div>
            <button
              onClick={fetchProducts}
              className="p-3 bg-white hover:bg-gray-50 border border-gray-250 rounded-full text-gray-700 shadow-xs transition-all cursor-pointer"
              title="Refresh Products"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Loading products catalog...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-150 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <th className="p-5 font-bold">Product Details</th>
                      <th className="p-5 font-bold">Category</th>
                      <th className="p-5 font-bold">Monthly Rent</th>
                      <th className="p-5 font-bold">Stock</th>
                      <th className="p-5 font-bold">Availability</th>
                      <th className="p-5 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-10 text-center text-sm text-gray-400 font-medium">
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      products.map((prod) => (
                        <tr key={prod._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-5">
                            <div className="flex items-center gap-4">
                              <img
                                src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
                                alt={prod.name}
                                className="w-12 h-12 object-cover rounded-2xl bg-gray-50 border border-gray-100 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-800 truncate max-w-xs">{prod.name}</p>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{prod.material || 'Standard'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-5 text-sm font-semibold text-gray-600">
                            {prod.category?.categoryName || 'Uncategorized'}
                          </td>
                          <td className="p-5 text-sm font-black text-gray-900">
                            ₹{prod.monthlyRent}/mo
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleAdjustStockQty(prod._id, prod.stock || 0, -1)}
                                disabled={updatingId === prod._id + '_qty' || (prod.stock || 0) <= 0}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-50 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-sm font-bold text-gray-800 w-6 text-center">
                                {prod.stock || 0}
                              </span>
                              <button
                                onClick={() => handleAdjustStockQty(prod._id, prod.stock || 0, 1)}
                                disabled={updatingId === prod._id + '_qty'}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="p-5">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-inline items-center gap-1.5 ${
                              (prod.availability && (prod.stock || 0) > 0)
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              {(prod.availability && (prod.stock || 0) > 0) ? '🟢 In Stock' : '🔴 Out of Stock'}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <button
                              onClick={() => handleUpdateStock(prod._id, (prod.availability && (prod.stock || 0) > 0) ? 'In Stock' : 'Out of Stock')}
                              disabled={updatingId === prod._id}
                              className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer ${
                                (prod.availability && (prod.stock || 0) > 0)
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-150'
                              }`}
                            >
                              {updatingId === prod._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                              ) : (prod.availability && (prod.stock || 0) > 0) ? (
                                'Mark Out of Stock'
                              ) : (
                                'Mark In Stock'
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProducts;
