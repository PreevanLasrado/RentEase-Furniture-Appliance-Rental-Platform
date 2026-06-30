import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, IndianRupee, AlertTriangle, Eye, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    outOfStockProducts: 0,
    totalRevenue: 0
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/admin/stats');
        if (data.success) {
          setStats(data.stats);
          setOrders(data.orders.slice(0, 5)); // Recent 5 orders
          setProducts(data.products.slice(0, 5)); // Recent 5 products
        }
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-[#1F1F1F]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Manage and track your platform catalog, subscriptions, and stock levels.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin/products"
                className="px-5 py-2.5 bg-white border border-gray-250 hover:bg-gray-50 rounded-full text-sm font-bold text-gray-700 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Manage Products
              </Link>
              <Link
                to="/admin/orders"
                className="px-5 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-full text-sm font-bold shadow-md hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <ClipboardList className="w-4 h-4" />
                Manage Orders
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Loading admin metrics...</p>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Revenue */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Revenue</span>
                    <span className="text-2xl font-black text-gray-900 mt-2 block">
                      ₹{stats.totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* Total Orders */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Subscriptions</span>
                    <span className="text-2xl font-black text-gray-900 mt-2 block">
                      {stats.totalOrders}
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-650 rounded-2xl">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* Out of Stock */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Out of Stock Items</span>
                    <span className="text-2xl font-black text-rose-600 mt-2 block">
                      {stats.outOfStockProducts}
                    </span>
                  </div>
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* Total Users */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Members</span>
                    <span className="text-2xl font-black text-gray-900 mt-2 block">
                      {stats.totalUsers}
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50 text-purple-650 rounded-2xl">
                    <Users className="w-6 h-6" />
                  </div>
                </motion.div>
                
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Subscriptions / Orders */}
                <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-gray-900">Recent Orders</h3>
                    <Link to="/admin/orders" className="text-xs font-bold text-[#E53935] hover:underline flex items-center gap-1">
                      View All
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {orders.length === 0 ? (
                      <p className="text-sm text-gray-500 font-medium py-4 text-center">No orders placed yet.</p>
                    ) : (
                      orders.map((order) => (
                        <div key={order._id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-gray-800">{order.orderId}</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">{order.user?.fullName} ({order.user?.email})</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-gray-900">₹{order.totalAmount}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              order.orderStatus === 'Delivered' || order.orderStatus === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : order.orderStatus === 'Cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-100'
                                : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Stock Warning List */}
                <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-gray-900">Recent Products & Inventory</h3>
                    <Link to="/admin/products" className="text-xs font-bold text-[#E53935] hover:underline flex items-center gap-1">
                      View All
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {products.length === 0 ? (
                      <p className="text-sm text-gray-500 font-medium py-4 text-center">No products found.</p>
                    ) : (
                      products.map((prod) => (
                        <div key={prod._id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
                              alt={prod.name}
                              className="w-10 h-10 object-cover rounded-xl bg-gray-50 border border-gray-100"
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-800 truncate max-w-xs">{prod.name}</p>
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{prod.category?.categoryName}</p>
                            </div>
                          </div>
                          <div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              prod.stockStatus === 'In Stock'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              {prod.stockStatus || 'In Stock'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
