import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import customerSupportImg from '../../assets/images/customer_support.png';

const ContactHero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-[#FFF5F5] via-white to-white overflow-hidden pt-28 pb-16 px-8">
      {/* Background Abstract Shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e53935_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Circular Image with floating animations */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary to-primary-light opacity-25 blur-xl animate-pulse" />

              {/* Floating Container */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative bg-white p-4 rounded-full shadow-2xl border border-gray-100 max-w-[320px] sm:max-w-[400px] aspect-square overflow-hidden"
              >
                <img
                  src={customerSupportImg}
                  alt="Professional Customer Support Representative"
                  className="rounded-full w-full h-full object-cover border-4 border-white"
                />
              </motion.div>

              {/* Decorative badges */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 bg-white shadow-xl px-5 py-3 rounded-2xl flex items-center gap-3 border border-gray-50"
              >
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full absolute top-[18px] left-[20px]" />
                <span className="text-xs font-bold text-gray-800">Support Online</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-1 -left-4 bg-white shadow-xl px-5 py-3 rounded-2xl flex items-center gap-3 border border-gray-100"
              >
                <div className="w-3 h-3 rounded-xl bg-red-50 flex items-center justify-center">
                  <span className="text-primary text-lg">✓</span>
                </div>

                <span className="text-xs font-bold text-gray-800">Trusted Service</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Header details */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="bg-primary/10 text-primary font-extrabold text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-primary/20">
                  SUPPORT HUB
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none">
                Get in Touch <br />
                <span className="text-primary mt-2 inline-block">With Us</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-justify max-w-lg mx-auto lg:mx-0">
                Need assistance with rentals, orders, payments, maintenance, or support? Our RentEase team is always ready to help you with fast and reliable service.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  Reach Us
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
