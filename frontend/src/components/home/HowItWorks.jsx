import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, CalendarCheck, Truck } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Browse & Select',
    description: 'Explore our vast catalog of premium furniture and appliances. Choose what fits your style.',
  },
  {
    icon: CalendarCheck,
    title: 'Choose Rental Plan',
    description: 'Select a flexible rental tenure that suits you. The longer you rent, the less you pay.',
  },
  {
    icon: Truck,
    title: 'Get Delivered',
    description: 'Sit back and relax. We deliver, install, and set up everything for free within 48 hours.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="container mx-auto px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            How It <span className="text-gradient">Works?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Get your dream home set up in three simple steps.
          </motion.p>
        </div>

        <div className="relative -mt-4">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-light"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-100 shadow-xl flex items-center justify-center mb-8 relative group-hover:border-primary transition-colors duration-300">
                    <div className="absolute inset-2 rounded-full bg-red-50 group-hover:bg-primary transition-colors duration-300" />
                    <Icon className="w-8 h-8 text-primary group-hover:text-white relative z-10 transition-colors duration-300" />

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
