import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FurnitureAppliances from '../pages/FurnitureAppliances';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import CartPage from '../pages/CartPage';
import Profile from '../pages/Profile';
import Rentals from '../pages/Rentals';
import Wishlist from '../pages/Wishlist';
import MyOrders from '../pages/MyOrders';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminOrders from '../pages/AdminOrders';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/furniture-appliances" element={<FurnitureAppliances />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-rentals" element={<Rentals />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/wishlist" element={<Wishlist />} />
      
      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />

      {/* Fallback to Home for other paths */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
