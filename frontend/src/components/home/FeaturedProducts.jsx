import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../common/ProductCard';
import { products } from '../../data/dummyData';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              Featured <span className="text-gradient">Products</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Handpicked premium items for your modern home.
            </motion.p>
          </div>

          {/* Custom Navigation */}
          <div className="hidden md:flex gap-3">
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12 !overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
