import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Headphones, Wrench, CalendarX, Truck, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const cards = [
    {
      title: 'Secure Payments',
      description: 'Your transactions are encrypted and processed securely. Flexible monthly payments via UPI, Cards, or Net Banking.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 Assistance',
      description: 'Round-the-clock dedicated customer service. Get help with repairs, subscription extensions, or support anytime.',
      icon: Headphones,
    },
    {
      title: 'Free Maintenance',
      description: 'Zero cost check-ups and repairs. If any appliance or furniture develops functional issues, we will repair it free.',
      icon: Wrench,
    },
    {
      title: 'Cancel Anytime',
      description: 'Commitment-free rental subscriptions. Cancel your plan at any time with transparent early termination fees.',
      icon: CalendarX,
    },
    {
      title: 'Easy Relocation',
      description: 'Relocating to a new house? We dismantle, pack, move, and set up your items at the new address absolutely free.',
      icon: Truck,
    },
    {
      title: 'Premium Quality Products',
      description: 'Every product goes through rigorous quality checks and sanitization before delivery to ensure a brand-new experience.',
      icon: Award,
    },
  ];

  return (
    <section className="py-12 px-16 -mt-10 bg-white">
      <div className="container mx-auto px-6 md:px-18">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Why RentEase
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              A Rental Experience Built <br className="hidden sm:inline" />
              Around Your Needs
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border border-gray-150/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon Wrapper */}
                  <div className="bg-primary/5 text-primary p-4 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-justify">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
