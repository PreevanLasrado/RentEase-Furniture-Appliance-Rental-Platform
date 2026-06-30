import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Compass, Award, Rocket } from 'lucide-react';

const StorySection = () => {
  const milestones = [
    {
      year: '2023',
      title: 'The Spark',
      description: 'RentEase was born out of a simple struggle: high upfront costs of buying furniture vs low-quality cheap alternatives. Our founders realized modern nomads deserve beautiful spaces without massive investments.',
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      color: 'bg-primary'
    },
    {
      year: '2024',
      title: 'Going Live',
      description: 'We officially launched our core service in Mumbai and Delhi, introducing an online catalog of handpicked furniture rentals with zero security deposit and 72-hour delivery.',
      icon: <Rocket className="w-6 h-6 text-white" />,
      color: 'bg-primary'
    },
    {
      year: '2025',
      title: 'Expanding Horizons',
      description: 'Listening to our community, we introduced high-end smart home appliances (refrigerators, washers, Smart TVs) and expanded service coverage to 15 major metro areas across India.',
      icon: <Compass className="w-6 h-6 text-white" />,
      color: 'bg-primary'
    },
    {
      year: '2026',
      title: 'The Future of Living',
      description: 'Now serving over 10,000+ homes, we are building a seamless subscription model that enables customers to upgrade, swap, or return furniture on demand, building a circular economy.',
      icon: <Award className="w-6 h-6 text-white" />,
      color: 'bg-primary'
    }
  ];

  return (
    <section className="-mt-36 py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-18 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-[16px] tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              The RentEase Story
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-5xl mx-auto -mt-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={milestone.year} className="relative flex flex-col md:flex-row items-center">

                  {/* Left Side Content (Desktop) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:order-2 md:justify-start md:pl-12'} mb-4 md:mb-0`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.7, type: 'spring' }}
                      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-md w-full relative group hover:shadow-md transition-shadow"
                    >
                      <span className="text-4xl font-black text-primary/50 absolute top-4 right-6 select-none font-display">
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Centered Icon Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-primary hidden md:flex">
                    {milestone.icon}
                  </div>

                  {/* Right Side Empty Spacer (Desktop) */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StorySection;
