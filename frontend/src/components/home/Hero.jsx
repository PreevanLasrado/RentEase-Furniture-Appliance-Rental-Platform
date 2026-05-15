import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Truck, ShieldCheck, Headphones, RefreshCcw, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#faf9f8]">
      {/* Container */}
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="max-w-2xl z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-primary font-medium text-sm mb-8">
                <span className="text-xl leading-none">✦</span> Premium Furniture Rentals <span className="ml-1 text-lg leading-none">+</span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6">
                Rent Premium <br />
                <span className="text-primary">Furniture & <br /> Appliances</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg font-medium">
                Affordable monthly rentals with fast delivery and flexible plans. Experience high-end living without the long-term commitment.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Explore Rentals
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="flex items-center justify-center gap-3 bg-white border border-gray-100 hover:border-gray-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Play className="w-4 h-4 ml-0.5 text-gray-700" />
                  </div>
                  How It Works
                </button>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm z-10">
                    +2k
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    4.9/5 <span className="text-gray-500 font-normal">from 2000+ reviews</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Images Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative lg:h-[650px] w-full flex justify-center lg:justify-end items-center mt-12 lg:mt-0"
          >
            {/* Background Shapes */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] md:w-[80%] aspect-square bg-[#eedfd5] rounded-full z-0 translate-x-10" />
            <div className="absolute right-0 bottom-0 w-32 h-64 bg-primary rounded-l-full z-0 translate-x-4" />

            {/* Main Image */}
            <div className="relative z-10 w-[85%] md:w-[75%] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white mr-8">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000"
                alt="Living Room"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* Floating Image 1 (Top Left) */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[10%] left-0 w-32 md:w-48 rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-white z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=400"
                alt="Refrigerator"
                className="w-full aspect-square object-cover"
              />
            </motion.div>

            {/* Floating Image 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute bottom-[15%] left-[5%] w-36 md:w-56 rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-white z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400"
                alt="Bedroom"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            {/* Floating Image 3 (Bottom Right) */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-[5%] right-0 w-28 md:w-40 rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 translate-x-4"
            >
              <img
                src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400"
                alt="Washing Machine"
                className="w-full aspect-square object-cover"
              />
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="container mx-auto px-6 mt-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 border border-gray-100"
        >
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            <div className="flex items-center gap-4 px-4 w-full lg:w-auto pt-4 lg:pt-0">
              <Truck className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">24H Delivery</h4>
                <p className="text-xs text-gray-500 font-medium">Fast & Reliable</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 w-full lg:w-auto pt-4 lg:pt-0">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Premium Quality</h4>
                <p className="text-xs text-gray-500 font-medium">Trusted Brand</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 w-full lg:w-auto pt-4 lg:pt-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Secure Payments</h4>
                <p className="text-xs text-gray-500 font-medium">100% Protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 w-full lg:w-auto pt-4 lg:pt-0">
              <Headphones className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-500 font-medium">We're Here</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 w-full lg:w-auto pt-4 lg:pt-0 border-b-0 lg:border-l border-gray-100">
              <RefreshCcw className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Flexible Plans</h4>
                <p className="text-xs text-gray-500 font-medium">Change Anytime</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
