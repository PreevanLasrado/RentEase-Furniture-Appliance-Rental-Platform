import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CreditCard, ChevronDown, Package, Loader, Compass, MapPin, Clock, ArrowLeft, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Cancellation States
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellingLoader, setCancellingLoader] = useState(false);

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    try {
      setCancellingLoader(true);
      const { data } = await api.put(`/orders/${orderToCancel._id}/cancel`);
      if (data.success) {
        toast.success('Order Cancelled Successfully', {
          id: 'cancel-success-toast',
          position: 'top-center',
          style: {
            background: '#EF4444',
            color: '#FFF',
            fontWeight: '600',
            borderRadius: '9999px',
          }
        });
        // Update local orders list state to Cancelled
        setOrders(prev =>
          prev.map(o => (o._id === orderToCancel._id ? { ...o, orderStatus: 'Cancelled' } : o))
        );
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel order. Please try again.');
    } finally {
      setCancellingLoader(false);
      setIsCancelModalOpen(false);
      setOrderToCancel(null);
    }
  };

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await api.get('/orders/my');
        setOrders(data);
        // Expand the first order by default if it exists
        if (data.length > 0) {
          setExpandedOrder(data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-[#E53935] rounded-2xl flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Sign In Required</h2>
              <p className="text-gray-500 text-sm">
                Please log in to view your orders, delivery address, and payment history.
              </p>
            </div>
            <button
              onClick={() => {
                const loginBtn = document.querySelector('button[class*="Login / Signup"]');
                if (loginBtn) {
                  loginBtn.click();
                } else {
                  window.location.href = '/';
                }
              }}
              className="w-full bg-[#E53935] hover:bg-[#C62828] text-white font-bold py-3.5 rounded-full shadow-lg shadow-red-500/20 transition-all cursor-pointer"
            >
              Sign In Now
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-6 md:px-18 max-w-5xl">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
              <p className="text-gray-500 text-sm mt-1">Track your subscription orders, invoices, and delivery schedules.</p>
            </div>
            <button
              onClick={() => navigate('/furniture-appliances')}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#E53935] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader className="w-10 h-10 text-[#E53935] animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Loading your subscription orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-gray-150 shadow-xl max-w-lg mx-auto space-y-6"
            >
              <div className="w-20 h-20 bg-red-50 text-[#E53935] rounded-3xl flex items-center justify-center mx-auto animate-pulse">
                <Compass className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">No Orders Placed Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  Bring premium furniture & appliances home. Select your tenure and place your order today!
                </p>
              </div>
              <button
                onClick={() => navigate('/furniture-appliances')}
                className="bg-[#E53935] hover:bg-[#C62828] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/35 transition-all duration-300 cursor-pointer text-sm"
              >
                Browse Catalog
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => {
                const isExpanded = expandedOrder === order._id;
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-3xl border border-gray-200/80 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Order Summary Header */}
                    <div
                      onClick={() => toggleExpand(order._id)}
                      className="bg-gray-50/70 hover:bg-gray-50 px-6 py-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E53935] flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Order ID</span>
                            <span className="text-xs font-bold text-[#E53935] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                              {order.orderId}
                            </span>
                          </div>
                          <p className="font-extrabold text-gray-800 text-sm mt-1">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-auto md:ml-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Monthly rent</p>
                          <p className="font-extrabold text-gray-800 mt-1">
                            {formatCurrency(order.monthlyRent)}/mo
                          </p>
                        </div>

                        {/* Order Status Badge */}
                        <span
                          className={`text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                            order.orderStatus === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : order.orderStatus === 'Processing'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : order.orderStatus === 'Delivered'
                              ? 'bg-teal-50 text-teal-600 border border-teal-100'
                              : 'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}
                        >
                          {order.orderStatus}
                        </span>

                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 md:p-8 border-t border-gray-100 bg-white space-y-6">
                            {/* Products Section */}
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ordered Subscription Items</h4>
                                {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOrderToCancel(order);
                                      setIsCancelModalOpen(true);
                                    }}
                                    className="px-5 py-1.5 rounded-full border border-red-200 hover:bg-red-50 text-[#E53935] font-extrabold text-xs transition-all duration-300 cursor-pointer shadow-sm"
                                  >
                                    Cancel Order
                                  </button>
                                )}
                              </div>
                              <div className="divide-y divide-gray-100 border border-gray-150 rounded-2xl overflow-hidden bg-gray-50/30">
                                {order.products.map((item) => (
                                  <div key={item._id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <img
                                      src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'}
                                      alt={item.product?.name || 'RentEase Item'}
                                      className="w-16 h-16 rounded-xl object-cover bg-white border border-gray-200/80 shadow-sm flex-shrink-0"
                                    />
                                    <div className="flex-grow min-w-0">
                                      <h5 className="font-extrabold text-gray-800 text-sm truncate">
                                        {item.product?.name || 'Premium Rental Product'}
                                      </h5>
                                      <p className="text-xs text-gray-400 mt-0.5">
                                        Category: <span className="text-gray-600 font-semibold">{item.product?.category || 'Furniture'}</span>
                                      </p>
                                      <p className="text-xs text-gray-400 mt-0.5">
                                        Quantity: <span className="text-gray-800 font-bold">{item.quantity}</span> | Rent:{' '}
                                        <span className="text-gray-800 font-bold">{formatCurrency(item.rent)}/mo</span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                              {/* Left detail card: Delivery details */}
                              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150 space-y-3">
                                <h5 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  Delivery Schedule
                                </h5>
                                <div className="space-y-2 text-xs">
                                  <p className="text-gray-600 font-semibold flex justify-between">
                                    <span>Date:</span>
                                    <span className="text-gray-800 font-bold">{formatDate(order.deliveryDate)}</span>
                                  </p>
                                  <p className="text-gray-600 font-semibold flex justify-between">
                                    <span>Slot:</span>
                                    <span className="text-gray-800 font-bold">{order.deliveryTime} Slot</span>
                                  </p>
                                  <p className="text-gray-600 font-semibold flex justify-between">
                                    <span>Duration:</span>
                                    <span className="text-[#E53935] font-extrabold">{order.rentalDuration} Months</span>
                                  </p>
                                </div>
                              </div>

                              {/* Center detail card: Address details */}
                              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150 space-y-3">
                                <h5 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4 text-gray-500" />
                                  Delivery Address
                                </h5>
                                <div className="text-xs space-y-1 text-gray-600 font-semibold">
                                  <p className="text-gray-800 font-bold">{order.address?.fullName}</p>
                                  <p>{order.address?.houseFlat}, {order.address?.street}</p>
                                  <p>{order.address?.area}</p>
                                  <p>{order.address?.city}, {order.address?.state} - {order.address?.pincode}</p>
                                  <p className="pt-1.5 flex items-center gap-1 text-gray-500">
                                    <span>Tel:</span>
                                    <span className="text-gray-700 font-bold">{order.address?.phone}</span>
                                  </p>
                                </div>
                              </div>

                              {/* Right detail card: Payment and summary details */}
                              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150 space-y-3">
                                <h5 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <CreditCard className="w-4 h-4 text-gray-500" />
                                  Payment Details
                                </h5>
                                <div className="space-y-2 text-xs">
                                  <p className="text-gray-600 font-semibold flex justify-between">
                                    <span>Method:</span>
                                    <span className="text-gray-800 font-bold uppercase">{order.paymentMethod}</span>
                                  </p>
                                  <p className="text-gray-600 font-semibold flex justify-between items-center">
                                    <span>Status:</span>
                                    <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] uppercase border ${
                                      order.paymentStatus === 'Paid'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : order.paymentStatus === 'Pending'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border-rose-200'
                                    }`}>
                                      {order.paymentStatus}
                                    </span>
                                  </p>
                                  <div className="border-t border-gray-200/80 pt-2 space-y-1">
                                    <p className="text-gray-600 font-semibold flex justify-between">
                                      <span>Security Deposit:</span>
                                      <span className="text-gray-800 font-bold">{formatCurrency(order.securityDeposit)}</span>
                                    </p>
                                    <p className="text-gray-600 font-semibold flex justify-between">
                                      <span>Paid Today:</span>
                                      <span className="text-gray-900 font-black">{formatCurrency(order.totalAmount)}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Cancellation Confirmation Modal */}
      <AnimatePresence>
        {isCancelModalOpen && orderToCancel && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] max-w-md w-full p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setOrderToCancel(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-red-50 text-[#E53935] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-gray-900 tracking-tight">Cancel Subscription Order?</h3>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed font-semibold">
                Are you sure you want to cancel order <span className="font-extrabold text-[#E53935]">{orderToCancel.orderId}</span>? This action cannot be undone and your subscription will be terminated.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsCancelModalOpen(false);
                    setOrderToCancel(null);
                  }}
                  className="py-3.5 px-6 rounded-full border border-gray-250 hover:bg-gray-50 font-bold text-gray-600 hover:text-gray-950 transition-all cursor-pointer flex-1 text-sm"
                >
                  No, Keep Order
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancellingLoader}
                  className="py-3.5 px-6 rounded-full bg-[#E53935] hover:bg-[#C62828] font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex-1 text-sm flex items-center justify-center gap-2"
                >
                  {cancellingLoader ? (
                    <Loader className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    "Yes, Cancel Order"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MyOrders;
