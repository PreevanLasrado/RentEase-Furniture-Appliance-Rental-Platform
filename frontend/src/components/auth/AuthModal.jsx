import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authImage from '../../assets/images/login-image.jpg';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, forgotPassword, loading } = useAuth();

  // Isolated Form States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Reset state on close
      setTimeout(() => {
        setIsLogin(true);
        setIsForgotPassword(false);
        setLoginData({ email: '', password: '' });
        setSignupData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', agreeTerms: false });
        setForgotPasswordData({ email: '', newPassword: '', confirmPassword: '' });
        setLoginErrors({});
        setSignupErrors({});
        setForgotPasswordErrors({});
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (loginErrors[e.target.name]) {
      setLoginErrors({ ...loginErrors, [e.target.name]: '' });
    }
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    if (forgotPasswordErrors[e.target.name]) {
      setForgotPasswordErrors({ ...forgotPasswordErrors, [e.target.name]: '' });
    }
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (name === 'fullName') {
      // Allow only alphabets and spaces
      const alphabetsOnly = value.replace(/[^a-zA-Z\s]/g, '');
      // Title case formatting
      newValue = alphabetsOnly.replace(/\b\w/g, (char) => char.toUpperCase());
    } else if (name === 'phone') {
      // Allow only digits and limit to 10
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setSignupData({ ...signupData, [name]: newValue });

    if (signupErrors[name]) {
      setSignupErrors({ ...signupErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (isForgotPassword) {
      const newErrors = {};
      if (!forgotPasswordData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) newErrors.email = 'Email is invalid';

      if (!forgotPasswordData.newPassword) newErrors.newPassword = 'New password is required';
      else if (forgotPasswordData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';

      if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      setForgotPasswordErrors(newErrors);
      isValid = Object.keys(newErrors).length === 0;
    } else if (isLogin) {
      const newErrors = {};
      if (!loginData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = 'Email is invalid';

      if (!loginData.password) newErrors.password = 'Password is required';

      setLoginErrors(newErrors);
      isValid = Object.keys(newErrors).length === 0;
    } else {
      const newErrors = {};
      if (!signupData.fullName) {
        newErrors.fullName = 'Full Name is required';
      } else if (signupData.fullName.trim().length < 3) {
        newErrors.fullName = 'Full Name must be at least 3 characters';
      }

      if (!signupData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Email is invalid';

      if (!signupData.phone) newErrors.phone = 'Phone Number is required';
      else if (signupData.phone.length !== 10) newErrors.phone = 'Phone Number must be exactly 10 digits';

      if (!signupData.password) newErrors.password = 'Password is required';
      else if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

      if (signupData.password !== signupData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!signupData.agreeTerms) {
        newErrors.agreeTerms = 'You must accept the Terms & Conditions';
      }

      setSignupErrors(newErrors);
      isValid = Object.keys(newErrors).length === 0;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isForgotPassword) {
        await forgotPassword(forgotPasswordData.email, forgotPasswordData.newPassword);
        // After successful password reset, switch back to login
        setIsForgotPassword(false);
        setIsLogin(true);
        setForgotPasswordData({ email: '', newPassword: '', confirmPassword: '' });
        setForgotPasswordErrors({});
      } else if (isLogin) {
        await login(loginData.email, loginData.password);
        // Only close modal after successful authentication with a slight delay
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        const phoneWithCode = signupData.phone.startsWith('+91') ? signupData.phone : `+91 ${signupData.phone}`;
        await register({
          fullName: signupData.fullName,
          email: signupData.email,
          phone: phoneWithCode,
          password: signupData.password
        });

        // After successful signup, switch to login tab and reset signup form
        setIsLogin(true);
        setSignupData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', agreeTerms: false });
        setSignupErrors({});
      }
    } catch (error) {
      // Error is caught here, toast is shown by AuthContext
      // DO NOT CLOSE MODAL HERE - allows user to correct credentials
      console.error('Authentication failed:', error);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-none md:rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden pointer-events-auto relative h-full md:h-auto max-h-[100dvh] md:max-h-[95vh]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Left Side - Image/Branding */}
              <div className="hidden md:block w-1/2 relative bg-gray-900">
                <div className="absolute inset-0 z-10" />
                <img
                  src={authImage}
                  alt="Premium Furniture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                      Live better,<br />for less.
                    </h2>
                    <p className="text-white text-lg">
                      Premium furniture & appliances on rent, designed for your comfortable life.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Right Side - Forms */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                {/* Tabs */}
                {!isForgotPassword && (
                  <div className="flex mb-8 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setIsLogin(true);

                        // CLEAR LOGIN FORM
                        setLoginData({
                          email: '',
                          password: '',
                        });

                        setLoginErrors({});
                      }}
                      className={`flex-1 pb-4 text-center font-semibold transition-all relative ${isLogin
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      Login

                      {isLogin && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsLogin(false);

                        // CLEAR SIGNUP FORM
                        setSignupData({
                          fullName: '',
                          email: '',
                          phone: '',
                          password: '',
                          confirmPassword: '',
                          agreeTerms: false,
                        });

                        setSignupErrors({});
                      }}
                      className={`flex-1 pb-4 text-center font-semibold transition-all relative ${!isLogin
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      Sign up

                      {!isLogin && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isForgotPassword ? 'Reset password' : isLogin ? 'Welcome back!' : 'Create an account'}
                  </h3>
                  <p className="text-gray-500">
                    {isForgotPassword
                      ? 'Enter your email to reset your password'
                      : isLogin
                        ? 'Login to continue to your account'
                        : 'Join us and start renting premium furniture'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {isForgotPassword ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={forgotPasswordData.email}
                              onChange={handleForgotPasswordChange}
                              placeholder="Enter your email"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${forgotPasswordErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'}`}
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                          {forgotPasswordErrors.email && <p className="text-red-500 text-xs mt-1">{forgotPasswordErrors.email}</p>}
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="newPassword"
                              value={forgotPasswordData.newPassword}
                              onChange={handleForgotPasswordChange}
                              placeholder="Enter new password"
                              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${forgotPasswordErrors.newPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'}`}
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {forgotPasswordErrors.newPassword && <p className="text-red-500 text-xs mt-1">{forgotPasswordErrors.newPassword}</p>}
                          {forgotPasswordData.newPassword.length > 0 && (
                            <div className="mt-2 flex gap-1">
                              <div className={`h-1 flex-1 rounded-full ${forgotPasswordData.newPassword.length > 2 ? 'bg-red-400' : 'bg-gray-200'}`} />
                              <div className={`h-1 flex-1 rounded-full ${forgotPasswordData.newPassword.length > 5 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                              <div className={`h-1 flex-1 rounded-full ${forgotPasswordData.newPassword.length > 7 ? 'bg-green-400' : 'bg-gray-200'}`} />
                            </div>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={forgotPasswordData.confirmPassword}
                              onChange={handleForgotPasswordChange}
                              placeholder="Confirm new password"
                              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${forgotPasswordErrors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'}`}
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {forgotPasswordErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{forgotPasswordErrors.confirmPassword}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            'Reset Password'
                          )}
                        </button>

                        <div className="text-center mt-6">
                          <p className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setIsForgotPassword(false);
                                setForgotPasswordData({ email: '', newPassword: '', confirmPassword: '' });
                                setForgotPasswordErrors({});
                              }}
                              className="text-primary font-semibold hover:underline"
                            >
                              Back to Login
                            </button>
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <>
                      <AnimatePresence mode="wait">
                        {!isLogin && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                          >
                            {/* Full Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="fullName"
                                  value={signupData.fullName}
                                  onChange={handleSignupChange}
                                  placeholder="John Doe"
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${signupErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'
                                    }`}
                                />
                                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              </div>
                              {signupErrors.fullName && <p className="text-red-500 text-xs mt-1">{signupErrors.fullName}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                              <div className="relative flex">
                                <div className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-2 py-2.5 flex items-center text-gray-500">
                                  +91
                                </div>
                                <input
                                  type="text"
                                  name="phone"
                                  value={signupData.phone}
                                  onChange={handleSignupChange}
                                  placeholder="9876543210"
                                  className={`w-full pl-3 pr-4 py-2.5 rounded-r-lg border focus:ring-2 focus:outline-none transition-colors ${signupErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'
                                    }`}
                                />
                              </div>
                              {signupErrors.phone && <p className="text-red-500 text-xs mt-1">{signupErrors.phone}</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={isLogin ? loginData.email : signupData.email}
                            onChange={isLogin ? handleLoginChange : handleSignupChange}
                            placeholder="Enter your email"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${(isLogin ? loginErrors.email : signupErrors.email) ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'
                              }`}
                          />
                          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        {(isLogin ? loginErrors.email : signupErrors.email) && <p className="text-red-500 text-xs mt-1">{isLogin ? loginErrors.email : signupErrors.email}</p>}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-sm font-medium text-gray-700">Password</label>
                          {isLogin && (
                            <button
                              type="button"
                              onClick={() => setIsForgotPassword(true)}
                              className="text-xs text-primary hover:underline font-medium"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={isLogin ? loginData.password : signupData.password}
                            onChange={isLogin ? handleLoginChange : handleSignupChange}
                            placeholder="Enter your password"
                            className={`w-full pl-10 pr-10 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${(isLogin ? loginErrors.password : signupErrors.password) ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'
                              }`}
                          />
                          <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {(isLogin ? loginErrors.password : signupErrors.password) && <p className="text-red-500 text-xs mt-1">{isLogin ? loginErrors.password : signupErrors.password}</p>}
                        {!isLogin && signupData.password.length > 0 && (
                          <div className="mt-2 flex gap-1">
                            <div className={`h-1 flex-1 rounded-full ${signupData.password.length > 2 ? 'bg-red-400' : 'bg-gray-200'}`} />
                            <div className={`h-1 flex-1 rounded-full ${signupData.password.length > 5 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                            <div className={`h-1 flex-1 rounded-full ${signupData.password.length > 7 ? 'bg-green-400' : 'bg-gray-200'}`} />
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <AnimatePresence>
                        {!isLogin && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  name="confirmPassword"
                                  value={signupData.confirmPassword}
                                  onChange={handleSignupChange}
                                  placeholder="Confirm your password"
                                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${signupErrors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'
                                    }`}
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                              {signupErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Checkboxes */}
                      {!isLogin && (
                        <div className="pt-2">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="terms"
                              name="agreeTerms"
                              checked={signupData.agreeTerms}
                              onChange={handleSignupChange}
                              className={`w-4 h-4 mt-0.5 text-primary rounded focus:ring-primary transition-colors ${signupErrors.agreeTerms ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                              I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                            </label>
                          </div>
                          <AnimatePresence>
                            {signupErrors.agreeTerms && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 text-xs mt-1.5 ml-6"
                              >
                                {signupErrors.agreeTerms}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          isLogin ? 'Login' : 'Create Account'
                        )}
                      </button>

                      <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                          {isLogin ? "Don't have an account? " : "Already have an account? "}
                          <button
                            type="button"
                            onClick={() => {

                              const switchingToLogin = !isLogin;

                              setIsLogin(switchingToLogin);

                              // CLEAR LOGIN FORM
                              setLoginData({
                                email: '',
                                password: '',
                              });

                              setLoginErrors({});

                              // CLEAR SIGNUP FORM
                              setSignupData({
                                fullName: '',
                                email: '',
                                phone: '',
                                password: '',
                                confirmPassword: '',
                                agreeTerms: false,
                              });

                              setSignupErrors({});

                              // RESET PASSWORD VISIBILITY
                              setShowPassword(false);
                              setShowConfirmPassword(false);
                            }}
                            className="text-primary font-semibold hover:underline"
                          >
                            {isLogin ? 'Sign up' : 'Login'}
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
