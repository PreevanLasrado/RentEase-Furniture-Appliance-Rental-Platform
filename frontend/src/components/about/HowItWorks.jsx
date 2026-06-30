import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sliders, Truck, Heart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Browse Products",
      description: "Explore our extensive curated collections of premium home furniture and top-tier smart appliances online."
    },
    {
      num: "02",
      icon: <Sliders className="w-6 h-6 text-primary" />,
      title: "Select Rental Plan",
      description: "Choose a flexible rental tenure options matching your specific lifestyle goals and budget requirements."
    },
    {
      num: "03",
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Get Fast Delivery",
      description: "Sit back and relax as our professional logistics team delivers and sets up your order for free in 72 hours."
    },
    {
      num: "04",
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Enjoy Hassle-Free Living",
      description: "Live stress-free with complimentary relocation assistance and fully covered repairs & maintenance."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 -mt-12 bg-white relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6 md:px-18 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Hassle-Free Process
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              How RentEase Works
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line for Large Screens */}
          <div className="absolute top-[28%] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-gray-150 hidden lg:block -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-center text-center"
            >
              {/* Step Number Badge */}
              <span className="absolute top-4 right-6 font-black text-primary/20 text-3xl">
                {step.num}
              </span>

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-6 border border-gray-100 shadow-inner group-hover:bg-primary/10 transition-colors">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
