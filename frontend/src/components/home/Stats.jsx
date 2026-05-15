import React from 'react';
import { motion } from 'framer-motion';
import CountUpPkg from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUp = CountUpPkg.default || CountUpPkg;

const stats = [
  { value: 10000, label: 'Happy Customers', prefix: '', suffix: '+' },
  { value: 5000, label: 'Products', prefix: '', suffix: '+' },
  { value: 25, label: 'Cities Served', prefix: '', suffix: '+' },
  { value: 98, label: 'Customer Satisfaction', prefix: '', suffix: '%' },
];

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white border-y border-gray-100" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 flex items-center">
                {stat.prefix}
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <p className="text-gray-500 font-medium tracking-wide uppercase text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
