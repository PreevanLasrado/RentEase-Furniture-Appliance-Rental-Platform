import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AboutPreview = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-18">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                alt="Modern Interior"
                className="w-full rounded-[2rem] shadow-2xl relative z-10"
              />

              {/* Floating Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-9 -right-10 md:-right-16 glass mr-6 p-6 rounded-3xl w-[170px] z-20"
              >
                <div className="text-4xl font-black text-primary -mt-2 mb-1">5+</div>
                <div className="text-sm text-left font-medium text-gray-800">Years of redefining modern living spaces</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="flex-1 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-primary font-medium text-[16px] mb-4 animate-pulse">
                <span className="text-2xl leading-none">✦</span>Our Mission<span className="text-2xl leading-none">✦</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                Furnishing Dreams, <br />
                <span className="text-gradient">Without the Cost.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-3 text-justify leading-relaxed">
                RentEase was born out of a simple idea: everyone deserves a beautifully furnished home, regardless of how often they move or their immediate budget.
              </p>
              <p className="text-lg text-gray-600 mb-6 text-justify leading-relaxed">
                We provide a sustainable, flexible, and affordable alternative to buying furniture. By choosing us, you're not just renting a sofa; you're upgrading your lifestyle instantly.
              </p>

              <button 
                onClick={() => navigate('/about-us')}
                className="flex items-center gap-2 text-primary font-bold text-lg hover:text-primary-dark transition-colors group cursor-pointer"
              >
                Read our full story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
