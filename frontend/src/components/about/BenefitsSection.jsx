import React from 'react';
import { motion } from 'framer-motion';
import { BadgePercent, ShieldAlert, Sparkles, Truck, RotateCcw, Wrench } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <BadgePercent className="w-7 h-7 text-primary" />,
      title: "Affordable Monthly Rentals",
      description: "Pay only a minimal monthly fee instead of thousands on outright purchase down payments."
    },
    {
      icon: <Wrench className="w-7 h-7 text-primary" />,
      title: "Free Maintenance & Cleaning",
      description: "Enjoy complimentary periodic professional cleaning and upkeep to keep products as good as new."
    },
    {
      icon: <Sparkles className="w-7 h-7 text-primary" />,
      title: "Flexible Tenures",
      description: "Choose to rent for 3, 6, 12, or 24+ months. Swap or upgrade items as your lifestyle shifts."
    },
    {
      icon: <Truck className="w-7 h-7 text-primary" />,
      title: "Free Fast Delivery & Setup",
      description: "Get contactless, prompt delivery and professional setup within 72 hours of verification."
    },
    {
      icon: <ShieldAlert className="w-7 h-7 text-primary" />,
      title: "Premium Product Quality",
      description: "Receive deep-cleaned, quality-inspected items in pristine, top-notch functional shape."
    },
    {
      icon: <RotateCcw className="w-7 h-7 text-primary" />,
      title: "Easy Return Policy",
      description: "Decided to relocate or move out? We make returning products smooth with zero cancellation hassles."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Why Us
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Unmatched Benefits for Our Subscribers
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 -mt-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#F7F7F7] border border-gray-100 p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Hover highlight border */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-transparent group-hover:bg-primary transition-colors duration-300" />

              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 text-justify mb-3 group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
