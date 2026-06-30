import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { reviews } from '../../data/dummyData';

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
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
          className="overflow-hidden"
        >

          <motion.div
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 60,
              ease: 'linear',
            }}
            className="flex gap-8 w-max"
          >

            {[...reviews, ...reviews, ...reviews].map((review, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="
                  min-w-[420px]
                  max-w-[420px]

                  glass-dark

                  p-8
                  rounded-3xl

                  relative

                  border
                  border-white/10

                  shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                "
              >

                {/* QUOTE */}
                <Quote className="
                  absolute
                  top-6
                  right-6

                  w-12
                  h-12

                  text-gray-700/50
                " />

                {/* STARS */}
                <div className="flex items-center gap-1 mb-6">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`
                        w-5
                        h-5

                        ${i < Math.floor(review.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-600'
                        }
                      `}
                    />
                  ))}
                </div>

                {/* REVIEW */}
                <p className="
                  text-gray-300
                  leading-relaxed
                  mb-8
                  text-lg
                ">
                  "{review.text}"
                </p>

                {/* USER */}
                <div className="flex items-center gap-4 mt-auto">

                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="
                      w-14
                      h-14

                      rounded-full
                      object-cover

                      border-2
                      border-primary
                    "
                  />

                  <div>
                    <h4 className="text-white font-bold">
                      {review.name}
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Testimonials;
