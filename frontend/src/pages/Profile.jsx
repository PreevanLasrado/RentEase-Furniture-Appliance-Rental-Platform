import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Calendar, Edit2, Check, X, AlertTriangle, Package, ShoppingCart, Heart, MapPin, Phone, LogOut, Loader, Search } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Address suggestion states
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || user.city || '',
        state: user.address?.state || user.state || '',
        pincode: user.address?.zipCode || user.address?.pincode || '',
      });
    }
  }, [user]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch orders count from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoadingOrders(true);
        const { data } = await api.get('/orders/my');
        setOrdersCount(data.length);
      } catch (error) {
        console.error('Failed to fetch orders count:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [user]);

  // Handle address input change and fetch suggestions from OpenStreetMap Nominatim
  const handleStreetChange = (val) => {
    setFormData(prev => ({ ...prev, street: val }));
    if (!isEditing) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (val.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoadingSuggestions(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&countrycodes=in&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 200);
  };

  // Auto fill address fields on selecting a suggestion
  const handleSelectSuggestion = (item) => {
    const addr = item.address || {};
    const road = addr.road || addr.suburb || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.village || addr.county || '';
    const state = addr.state || '';
    const pincode = addr.postcode || '';

    setFormData(prev => ({
      ...prev,
      street: item.display_name,
      city: city,
      state: state,
      pincode: pincode.replace(/\D/g, '').slice(0, 6)
    }));

    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'June 2026';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Show validation error toast with red background and unique ID
  const showValidationError = (msg) => {
    toast.error(msg, {
      id: 'profile-validation-error',
      position: 'top-center',
      style: {
        background: '#EF4444',
        color: '#FFF',
        fontWeight: '600',
        borderRadius: '9999px',
        padding: '12px 24px',
        boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
      },
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    // Name validation: Only letters and spaces
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      showValidationError('Full Name cannot be empty');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nameTrimmed)) {
      showValidationError('Full Name must only contain letters and spaces');
      return;
    }

    // Phone validation: Exactly 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      showValidationError('Phone Number cannot be empty');
      return;
    }
    if (phoneDigits.length !== 10) {
      showValidationError('Phone Number must be exactly 10 digits');
      return;
    }

    try {
      setSavingProfile(true);
      const payload = {
        fullName: nameTrimmed,
        phone: phoneDigits,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
          country: 'India',
        }
      };

      const { data } = await api.put('/auth/profile', payload);
      
      // Update local storage and auth context
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      setIsEditing(false);
      toast.success('Profile updated successfully!', {
        id: 'profile-update-success',
        style: {
          borderRadius: '9999px',
          background: '#10B981',
          color: '#fff',
          fontWeight: '600',
        },
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 text-center space-y-6"
          >
            <div className="w-16 h-16 bg-red-50 text-[#E53935] rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Access Denied</h2>
              <p className="text-gray-500 text-sm font-semibold">
                Please log in to view your profile details and manage your account.
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
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-6 md:px-18 max-w-6xl">
          {/* Header Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-40 rounded-[32px] bg-gradient-to-r from-gray-900 via-red-950 to-gray-900 relative shadow-lg overflow-hidden mb-8"
          >
            {/* Visual background patterns */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E53935_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-8 -translate-y-1/2 text-white">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Account Settings</h2>
              <p className="text-xs text-red-200 font-semibold mt-1 uppercase tracking-wider">Manage your personal profile & active rental details</p>
            </div>
          </motion.div>

          {/* Grid Layout: Left Overview | Right Detailed Edit Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile Card & Stats (40% width) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 bg-white rounded-[32px] p-6 shadow-md border border-gray-150/80 flex flex-col items-center text-center h-full space-y-6"
            >
              {/* Avatar with glowing ring */}
              <div className="relative group w-28 h-28 mt-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E53935] to-rose-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative w-28 h-28 rounded-full bg-white p-1.5 shadow-md border border-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-red-50 text-[#E53935] flex items-center justify-center font-black text-4xl select-none">
                    {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              </div>

              {/* User Bio */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-snug">
                  {formData.fullName}
                </h3>
                <div className="flex justify-center">
                  <span className="text-[10px] font-black text-[#E53935] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider border border-red-100">
                    {user.role === 'admin' ? 'Administrator' : 'Member Account'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-semibold pt-1">{formData.email}</p>
              </div>

              {/* Real-time stats row */}
              <div className="w-full border-y border-gray-100 py-5 grid grid-cols-3 gap-2">
                <div className="text-center space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto border border-gray-150/50">
                    <Package className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs font-black text-gray-800 mt-1 leading-none">{ordersCount}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Orders</p>
                </div>
                <div className="text-center space-y-1 border-x border-gray-100">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto border border-gray-150/50">
                    <ShoppingCart className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs font-black text-gray-800 mt-1 leading-none">{cartCount}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Cart Items</p>
                </div>
                <div className="text-center space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto border border-gray-150/50">
                    <Heart className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs font-black text-gray-800 mt-1 leading-none">{wishlistCount}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Wishlist</p>
                </div>
              </div>

              {/* Membership information */}
              <div className="w-full space-y-3 pt-1">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-150/80 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">Security Rating</p>
                    <p className="font-extrabold text-gray-800 text-xs mt-1">Verified Member</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-150/80 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">Membership Status</p>
                    <p className="font-extrabold text-gray-800 text-xs mt-1">Joined {formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Log out option */}
              <button
                onClick={handleLogoutClick}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer text-xs flex items-center justify-center gap-2 mt-auto"
              >
                <LogOut className="w-4 h-4" />
                Sign Out Account
              </button>
            </motion.div>

            {/* Right Column: Detailed Personal Form (60% width) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 bg-white rounded-[32px] p-8 shadow-md border border-gray-150/80"
            >
              {/* Form Title & Edit Trigger Actions */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">
                  Personal Information
                </h3>
                
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-gray-200 text-gray-600 hover:text-[#E53935] hover:border-red-200 transition-all text-xs font-black cursor-pointer bg-white shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={savingProfile}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all text-xs font-black cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {savingProfile ? (
                        <Loader className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      disabled={savingProfile}
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          fullName: user.fullName || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          street: user.address?.street || '',
                          city: user.address?.city || user.city || '',
                          state: user.address?.state || user.state || '',
                          pincode: user.address?.zipCode || user.address?.pincode || '',
                        });
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all text-xs font-black cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Form Grid */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.fullName}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow only letters and spaces in real-time
                          if (val === '' || /^[a-zA-Z\s]+$/.test(val)) {
                            setFormData({ ...formData, fullName: val });
                          }
                        }}
                        className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          isEditing
                            ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                            : 'border-transparent bg-gray-50 text-gray-800'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        disabled={true}
                        value={formData.email}
                        className="w-full pl-11 pr-4 py-3 border border-transparent bg-gray-50 text-gray-400 text-sm font-semibold cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Phone Number</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-gray-500 font-extrabold text-sm border-r border-gray-200 pr-2.5 select-none leading-none">
                        +91
                      </div>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={formData.phone}
                        placeholder="Enter phone number"
                        onChange={(e) => {
                          // Allow only digits and limit to 10 digits
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: val });
                        }}
                        className={`w-full pl-16 pr-4 py-3 border rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          isEditing
                            ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                            : 'border-transparent bg-gray-50 text-gray-800'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest block">
                      Default Shipping Address
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Street Name & Suggestions */}
                    <div className="space-y-1.5 md:col-span-2 relative" ref={suggestionRef}>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Street / House details</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          disabled={!isEditing}
                          placeholder="House No., Street Name, Area/Landmark"
                          value={formData.street}
                          onChange={(e) => handleStreetChange(e.target.value)}
                          onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true);
                          }}
                          className={`w-full pl-11 pr-10 py-3 border rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                            isEditing
                              ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                              : 'border-transparent bg-gray-50 text-gray-800'
                          }`}
                        />
                        {loadingSuggestions && (
                          <Loader className="w-4 h-4 animate-spin text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                        )}
                      </div>

                      {/* Suggestions Dropdown */}
                      <AnimatePresence>
                        {isEditing && showSuggestions && suggestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute z-30 left-0 right-0 top-[102%] bg-white border border-gray-150 rounded-2xl shadow-xl max-h-56 overflow-y-auto divide-y divide-gray-50"
                          >
                            {suggestions.map((item) => (
                              <div
                                key={item.place_id}
                                onClick={() => handleSelectSuggestion(item)}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition-colors"
                              >
                                <Search className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-700 font-semibold leading-normal truncate-2-lines">
                                  {item.display_name}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">City</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          isEditing
                            ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                            : 'border-transparent bg-gray-50 text-gray-800'
                        }`}
                      />
                    </div>

                    {/* State */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">State</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          isEditing
                            ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                            : 'border-transparent bg-gray-50 text-gray-800'
                        }`}
                      />
                    </div>

                    {/* Pincode */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Pincode</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        className={`w-full px-4 py-3 border rounded-2xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                          isEditing
                            ? 'border-gray-300 bg-white focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                            : 'border-transparent bg-gray-50 text-gray-800'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
