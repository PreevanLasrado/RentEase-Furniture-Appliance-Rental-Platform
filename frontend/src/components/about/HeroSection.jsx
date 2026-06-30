import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info, Sparkles, CheckCircle2, ArrowDown } from 'lucide-react';
import heroImage from '../../assets/images/about_hero_setup.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-white pt-24 pb-16 overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 text-left space-y-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 mt-6 mb-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-[12px] uppercase tracking-wider animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Redefining Modern Living
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            >
              Redefining the way India Rents <span className="text-primary">Furniture & Appliances</span> - Rent<span className="text-primary">Ease</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 mt-4 text-lg md:text-xl leading-relaxed"
            >
              RentEase helps people live better with affordable premium furniture and appliances without the burden of ownership. Instantly transform your space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="/furniture-appliances"
                className="w-[220px] justify-center inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#about-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-[180px] justify-center inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                Learn More
                <Info className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Quick Benefits Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-gray-100"
            >
              {['Free Delivery', '72-Hour Setup', 'Cancel Anytime', 'Maintenance'].map((tag) => (
                <div key={tag} className="flex items-center gap-2 text-[16px] text-gray-500 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Showcase */}
          <div className="lg:col-span-5 mt-4 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-full max-w-[450px]"
            >
              {/* Outer Decorative Ring */}
              <div className="absolute inset-[-10px] border border-primary/30 rounded-2xl animate-[spin_30s_linear_infinite] -z-10" />

              {/* Main Image Container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img
                  src={heroImage}
                  alt="Premium Furniture Setup"
                  className="rounded-full"
                />

                {/* Floating Glassmorphic Badges */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 -left-8 bg-white/80 backdrop-blur-md border border-white/40 p-4 rounded-full shadow-lg flex items-center gap-3 z-20 pointer-events-none"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Premium Quality</h4>
                    <p className="text-gray-500 text-xs">Curated Designer Collections</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-12 -right-8 bg-white/80 backdrop-blur-md border border-white/40 p-4 rounded-full shadow-lg flex items-center gap-3 z-20 pointer-events-none"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <span className="text-emerald-500 font-extrabold text-sm">0%</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">No Buying Burden</h4>
                    <p className="text-gray-500 text-xs">Zero Upfront Security Deposit</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down Option */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => {
            document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group focus:outline-none border-none bg-transparent"
        >
          <ArrowDown className="w-5 h-5 text-gray-400 group-hover:text-primary animate-bounce transition-colors" />
          <span className="text-gray-400 group-hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors select-none">
            Scroll Down
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
