import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PenTool, RefreshCcw, Truck, Leaf, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Wallet,
    title: 'Affordable Monthly Rentals',
    description: 'Enjoy premium products without the heavy upfront investment. Pay a fraction of the cost monthly.',
  },
  {
    icon: PenTool,
    title: 'Free Maintenance',
    description: 'We cover all maintenance and repair costs. If it breaks, we fix it or replace it for free.',
  },
  {
    icon: RefreshCcw,
    title: 'Flexible Upgrades',
    description: 'Bored of the old look? Upgrade to newer models easily whenever your term ends.',
  },
  {
    icon: Truck,
    title: 'Fast Free Delivery',
    description: 'Get your items delivered and installed safely at your doorstep within 48 hours.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Living',
    description: 'Join the circular economy. Renting reduces waste and promotes sustainable living.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'All our products are meticulously quality-checked and sanitized before delivery.',
  },
];

const Benefits = () => {
  return (
    <section className="py-12 -mb-22 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-26 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            Why Choose <span className="text-gradient">RentEase?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            We're revolutionizing how you furnish your home. Experience the ultimate convenience and luxury with our zero-hassle rental service.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                <div className="w-14 h-14 rounded-xl bg-red-50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
