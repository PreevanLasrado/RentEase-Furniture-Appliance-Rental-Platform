import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-8 -mt-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-18">

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-12 md:p-20 text-center overflow-hidden shadow-2xl"
        >
          {/* Decorative Ring Background Shapes */}
          <div className="absolute top-[-30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-white/5 border border-white/10 pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-white/5 border border-white/10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Start living smarter with RentEase.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg mx-auto">
              Upgrade your home with premium furniture and appliances. Skip the heavy buying cost and experience true subscription flexibility today.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link
                to="/furniture-appliances"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-150 text-primary px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1"
              >
                Contact Us
                <MessageSquareCode className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
