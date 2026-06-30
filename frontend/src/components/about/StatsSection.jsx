import React from 'react';
import { motion } from 'framer-motion';
import CountUpPkg from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, Armchair, MapPin, Award } from 'lucide-react';

const CountUp = CountUpPkg.default || CountUpPkg;

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      end: 10000,
      suffix: "+",
      label: "Happy Customers",
      description: "Subscribed homes transformed"
    },
    {
      icon: <Armchair className="w-8 h-8 text-white" />,
      end: 5000,
      suffix: "+",
      label: "Products Renting Out",
      description: "Designer furniture & appliances"
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      end: 25,
      suffix: "+",
      label: "Cities Served",
      description: "Leading metros across India"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      end: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Unmatched rental experience"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-18 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden shadow-2xl"
    >
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4 relative group"
            >
              {/* Stat Icon Circle */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number with Counter */}
              <div className="text-4xl md:text-5xl font-black tracking-tight">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>

              {/* Label */}
              <div>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white/95">
                  {stat.label}
                </h4>
                <p className="text-white/70 text-xs mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
