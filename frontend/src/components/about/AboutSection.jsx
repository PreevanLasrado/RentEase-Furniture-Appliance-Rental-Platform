import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Sparkles, Zap, HeartHandshake } from 'lucide-react';

const AboutSection = () => {
  const cards = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Affordable Luxury",
      description: "Access high-end, designer-curated furniture and top-tier smart appliances at a fraction of retail prices."
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Flexible Tenures",
      description: "Choose your own rental plan term matching your life goals, from short relocations to long-term leases."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Hassle-Free Experience",
      description: "Enjoy zero upfront deposits, free relocation within the city, and comprehensive in repair/maintenance support."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      title: "Sustainable Living",
      description: "Reduce environmental waste by participating in the shared economy. Rent, reuse, and reduce your carbon footprint."
    }
  ];

  return (
    <section id="about-section" className="py-24 -mt-10 bg-white relative overflow-hidden scroll-mt-4">
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-[16px] tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Making Premium Living Accessible To Everyone
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 text-lg leading-relaxed">
              RentEase is a modern lifestyle rental brand built for the fluid and evolving lifestyle of India's urban generation. We believe that physical spaces shouldn't bind you, and premium living shouldn't cost you a fortune.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Card top gradient */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
