import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote, Star } from 'lucide-react';
import { reviews } from '../../data/dummyData';

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Loved by <span className="text-primary">Thousands</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Don't just take our word for it. Hear what our happy customers have to say about their RentEase experience.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="h-full glass-dark p-8 rounded-3xl relative">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-700/50" />
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <h4 className="text-white font-bold">{review.name}</h4>
                      <p className="text-gray-500 text-sm">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet { background: #4b5563; }
        .swiper-pagination-bullet-active { background: var(--color-primary); }
      `}} />
    </section>
  );
};

export default Testimonials;
