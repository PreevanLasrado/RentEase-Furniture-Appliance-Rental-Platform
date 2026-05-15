import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/dummyData';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              Explore by <span className="text-gradient">Category</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Discover our wide range of premium furniture and top-tier appliances curated for your modern lifestyle.
            </motion.p>
          </div>
          
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
          >
            View All Categories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="absolute inset-0 bg-gray-200">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90 transition-colors" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
