import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, ChevronRight, Package, Loader, Compass, ShieldCheck } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/about/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Rentals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRentals = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await api.get('/rentals/my');
        setRentals(data);
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRentals();
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Sign In Required</h2>
              <p className="text-gray-500 text-sm">
                Please log in to view your current rentals, billing status, and subscription details.
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
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-full shadow-lg shadow-primary/20 transition-all cursor-pointer"
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-18 max-w-5xl">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Rentals</h1>
            <p className="text-gray-500 text-sm mt-1">Track active subscriptions, check rental cycles, and request assistance.</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader className="w-10 h-10 text-primary animate-spin" />
              <p className="text-gray-500 font-bold text-sm">Loading your subscription dashboard...</p>
            </div>
          ) : rentals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl max-w-lg mx-auto space-y-6"
            >
              <div className="w-20 h-20 bg-red-50 text-primary rounded-3xl flex items-center justify-center mx-auto">
                <Compass className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">No Rentals Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  Bring home comfort and convenience. Rent premium furniture and appliances at low monthly rates!
                </p>
              </div>
              <button
                onClick={() => navigate('/furniture-appliances')}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 cursor-pointer text-sm"
              >
                Browse Catalog
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {rentals.map((rental, idx) => (
                <motion.div
                  key={rental._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl hover:border-gray-250/30 transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Order Reference</p>
                        <p className="font-extrabold text-gray-800 text-sm mt-1 uppercase truncate max-w-[120px] md:max-w-none">
                          #{rental._id.slice(-8)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Rental Status */}
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                          rental.rentalStatus === 'active'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : rental.rentalStatus === 'completed'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-red-50 text-red-600 border border-red-100'
                        }`}
                      >
                        {rental.rentalStatus}
                      </span>

                      {/* Payment Status */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 border ${
                          rental.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : rental.paymentStatus === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <CreditCard className="w-3 h-3" />
                        {rental.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* Products summary list */}
                    <div className="lg:col-span-2 space-y-4">
                      {rental.products.map((item) => (
                        <div key={item._id || item.product._id} className="flex items-center gap-4">
                          <img
                            src={
                              item.product?.images?.[0] ||
                              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80'
                            }
                            alt={item.product?.name || 'Furniture'}
                            className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100 shadow-sm flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-extrabold text-gray-800 text-sm hover:text-primary transition-colors cursor-pointer">
                              {item.product?.name || 'RentEase Item'}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Quantity: <span className="text-gray-700 font-bold">{item.quantity}</span> | Monthly Rent:{' '}
                              <span className="text-gray-700 font-bold">{formatCurrency(item.monthlyRent)}/mo</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Rental Timeline & Price Details */}
                    <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-bold uppercase tracking-wider">Rental Term</span>
                        <span className="text-gray-700 font-extrabold flex items-center gap-1">
                          {formatDate(rental.startDate)} <ChevronRight className="w-3 h-3 text-gray-400" /> {formatDate(rental.endDate)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200/60 pt-3 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Rent</p>
                          <p className="text-xl font-black text-gray-800 mt-1">
                            {formatCurrency(rental.totalAmount)}
                            <span className="text-xs text-gray-500 font-bold font-sans">/mo</span>
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            // Support hub navigation (optional or query params)
                            navigate('/contact-us');
                          }}
                          className="px-4 py-2 bg-white border border-gray-200 hover:border-primary hover:text-primary rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Support
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rentals;
