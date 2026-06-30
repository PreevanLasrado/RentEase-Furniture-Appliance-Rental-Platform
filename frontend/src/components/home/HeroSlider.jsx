import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { ArrowRight } from 'lucide-react';

const slideData = [
  {
    id: 1,
    title: 'Modern Living Sets',
    subtitle: 'Transform your space',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'Smart Appliances',
    subtitle: 'Upgrade your kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'Cozy Bedrooms',
    subtitle: 'Rest in luxury',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
  },
];

const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white overflow-hidden py-10 -mt-16 -mb-16">
      <div className="container mx-auto px-18">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] overflow-hidden shadow-2xl relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] hero-swiper"
          >
            {slideData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent flex items-center">
                    <div className="pl-12 md:pl-24 max-w-xl">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <p className="text-primary-light font-bold ml-1 uppercase tracking-wider mb-2">
                          {slide.subtitle}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                          {slide.title}
                        </h2>
                        <button 
                          onClick={() => navigate('/furniture-appliances')}
                          className="bg-white text-gray-900 hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 group"
                        >
                          View Collection
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: var(--color-primary);

          background: transparent;

          width: 42px;
          height: 42px;

          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          transform: scale(1.12);
          opacity: 0.85;
        }

        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 25px;
          font-weight: 900;
          font-family: 'Poppins', sans-serif;
          -webkit-text-stroke: 2px currentColor;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
          width: 8px;
          height: 8px;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary);
          opacity: 1;
        }
      `}} />
    </section>
  );
};

export default HeroSlider;
