import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden bg-gray-900 py-20 px-6 text-center shadow-2xl"
        >
          {/* Abstract BG */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-primary-dark/80 to-gray-900/90" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              Upgrade Your Lifestyle <br className="hidden md:block" />
              Without Heavy Costs
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of happy customers who have transformed their homes with RentEase. Get started in minutes.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button className="bg-primary hover:bg-primary-light text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-primary/50 hover:-translate-y-1">
                Start Renting Today
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Browse Catalog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
