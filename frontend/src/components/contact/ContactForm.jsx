import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ContactForm = () => {
  const { user: userInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: '',
    message: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field change handlers with auto-sanitization
  const handleNameChange = (e) => {
    const val = e.target.value;
    // Allow alphabets and spaces only
    const cleanVal = val.replace(/[^a-zA-Z\s]/g, '');
    // Auto-capitalize first letter of each word
    const capitalized = cleanVal.replace(/\b\w/g, (char) => char.toUpperCase());
    setFormData((prev) => ({ ...prev, name: capitalized }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    // Allow digits only and restrict to 10 characters
    const cleanVal = val.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: cleanVal }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email format';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!userInfo || !userInfo.token) {
      toast.error("Please login first to send your message!", {
        id: "login-required",
        position: 'top-center',
        style: {
          borderRadius: "12px",
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fca5a5",
          padding: "14px 20px",
          fontWeight: "600",
          minWidth: "390px",
          whiteSpace: "nowrap",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#ffffff",
        },
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        subject: formData.subject,
        message: formData.message,
      });

      if (data.success) {
        toast.success("Message sent successfully!", {
          id: 'contact-submit-toast',
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#ecfdf5",
            color: "#16a34a",
            border: "1px solid #86efac",
            padding: "14px 18px",
            fontWeight: "600",
          },
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          subject: '',
          message: '',
          agree: false,
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      toast.error("Something went wrong!", {
        id: 'contact-submit-toast',
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fca5a5",
          padding: "14px 18px",
          fontWeight: "600",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#ffffff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="-mt-18 bg-white rounded-[32px] p-8 md:p-10 border-2 border-primary/30 shadow-[0_25px_60px_rgba(229,57,53,0.22),_0_0_80px_rgba(229,57,53,0.18),_0_0_120px_rgba(229,57,53,0.12)]"
    >
      {/* Title with highlighted Us */}
      <h3 className="-mt-4 text-5xl font-black text-gray-900 mb-8 text-center">
        Contact <span className="text-primary">Us</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Full Name | Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm transition-all duration-300 focus:outline-none ${errors.name
                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm transition-all duration-300 focus:outline-none ${errors.email
                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone Number | City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Phone Number
            </label>
            <div
              className={`flex rounded-xl border overflow-hidden bg-white transition-all duration-300 ${errors.phone
                ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200'
                : 'border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary'
                }`}
            >
              <span className="bg-gray-100/70 px-4 py-3 text-sm text-gray-500 font-bold border-r border-gray-200 flex items-center justify-center select-none">
                +91
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                className="flex-grow px-4 py-3 focus:outline-none text-sm bg-transparent"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              City
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm transition-all duration-300 focus:outline-none text-gray-700 cursor-pointer ${errors.city
                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
            >
              <option value="">Select City</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Subject */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What's this about?"
            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm transition-all duration-300 focus:outline-none ${errors.subject
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
              }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs font-semibold mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Row 4: Message */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Your Message
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your rental requirements, commitment tenure, items of interest, or any other details..."
            className={`w-full px-4 py-3 rounded-xl bg-white border text-sm transition-all duration-300 focus:outline-none resize-none ${errors.message
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
              }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Checkbox */}
        <div className="pt-1 -mt-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              className="mt-1 accent-primary rounded cursor-pointer"
            />
            <span className="text-gray-500 text-xs leading-relaxed">
              I agree that RentEase may contact me in response to this enquiry. My details will not be shared with third parties.
            </span>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.agree}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 -mt-3 -mb-1">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${loading
              ? 'bg-gray-400 shadow-none cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark shadow-primary/20 hover:shadow-primary/30'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
