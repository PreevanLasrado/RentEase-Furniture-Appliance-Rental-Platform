import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/stats');
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
      toast.error('Failed to retrieve orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const { data } = await api.put(`/orders/${orderId}/status`, {
        orderStatus: newStatus
      });
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update order status', err);
      toast.error(err.response?.data?.message || 'Failed to update status');
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
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manage Subscriptions & Orders</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Review active bookings and update lease states (Completed & Returned release inventory).</p>
            </div>
            <button
              onClick={fetchOrders}
              className="p-3 bg-white hover:bg-gray-50 border border-gray-250 rounded-full text-gray-700 shadow-xs transition-all cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Loading orders list...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-150 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <th className="p-5 font-bold">Order ID</th>
                      <th className="p-5 font-bold">Customer Details</th>
                      <th className="p-5 font-bold">Rented Item(s)</th>
                      <th className="p-5 font-bold">Monthly Rent</th>
                      <th className="p-5 font-bold">Order Status</th>
                      <th className="p-5 font-bold text-right">Update Lease State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-10 text-center text-sm text-gray-400 font-medium">
                          No orders placed yet.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-5 text-sm font-bold text-gray-800">
                            {order.orderId}
                          </td>
                          <td className="p-5">
                            <p className="text-sm font-bold text-gray-800">{order.user?.fullName}</p>
                            <p className="text-xs text-gray-400 font-bold mt-0.5">{order.user?.email}</p>
                          </td>
                          <td className="p-5 text-sm font-semibold text-gray-600 max-w-xs truncate">
                            {order.products?.map(p => p.product?.name).join(', ') || 'Unknown item'}
                          </td>
                          <td className="p-5 text-sm font-black text-gray-900">
                            ₹{order.totalAmount}
                          </td>
                          <td className="p-5">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              order.orderStatus === 'Delivered' || order.orderStatus === 'Completed' || order.orderStatus === 'Returned'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : order.orderStatus === 'Cancelled'
                                ? 'bg-rose-50 text-rose-700 border-rose-100'
                                : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <select
                              value={order.orderStatus}
                              disabled={updatingId === order._id}
                              onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                              className="px-3 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-250 rounded-xl outline-none shadow-xs hover:border-gray-450 transition-all cursor-pointer"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled (Restock)</option>
                              <option value="Completed">Completed (Restock)</option>
                              <option value="Returned">Returned (Restock)</option>
                            </select>
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

export default AdminOrders;
