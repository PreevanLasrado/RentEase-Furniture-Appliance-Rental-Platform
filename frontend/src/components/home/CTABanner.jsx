import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-white overflow-hidden">

      <div className="container mx-auto px-18">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            relative

            rounded-[4rem]
            overflow-hidden

            bg-[#050816]

            px-10
            md:px-20

            py-20

            flex
            flex-col
            lg:flex-row

            items-center
            justify-between

            gap-16
          "
        >

          {/* BACKGROUND GLOW */}
          <div className="absolute inset-0 z-0 overflow-hidden">

            <div className="
              absolute
              top-[-200px]
              left-1/2
              -translate-x-1/2

              w-[700px]
              h-[700px]

              rounded-full

              bg-primary/30

              blur-[140px]
            " />

            <div className="
              absolute
              right-[-100px]
              top-1/2
              -translate-y-1/2

              w-[400px]
              h-[400px]

              rounded-full

              bg-blue-500/10

              blur-[120px]
            " />
          </div>

          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-2xl">

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="
                text-5xl
                md:text-7xl

                font-black
                text-white

                leading-[1.05]
                tracking-tight

                mb-8
              "
            >
              Upgrade Your Lifestyle
              <br />
              Without Heavy Costs
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="
                text-xl
                text-gray-300

                leading-relaxed

                mb-12

                max-w-xl
              "
            >
              Join thousands of happy customers who have transformed
              their homes with RentEase. Get started in minutes.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5"
            >

              {/* PRIMARY */}
              <button 
                onClick={() => navigate('/furniture-appliances')}
                className="
                  bg-primary

                  hover:bg-primary-light

                  text-white

                  px-10
                  py-5

                  rounded-full

                  text-lg
                  font-bold

                  transition-all

                  shadow-[0_10px_40px_rgba(220,38,38,0.45)]

                  hover:-translate-y-1

                  cursor-pointer
                "
              >
                Start Renting Today
              </button>

              {/* SECONDARY */}
              <button 
                onClick={() => navigate('/contact-us')}
                className="
                  bg-white/10

                  hover:bg-white/20

                  backdrop-blur-xl

                  text-white

                  border
                  border-white/10

                  px-10
                  py-5

                  rounded-full

                  text-lg
                  font-bold

                  transition-all

                  hover:-translate-y-1

                  flex
                  items-center
                  justify-center
                  gap-2

                  group

                  cursor-pointer
                "
              >

                Contact Us

                <ArrowRight className="
                  w-5
                  h-5

                  group-hover:translate-x-1
                  transition-transform
                " />
              </button>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="
              relative
              z-10

              w-full
              max-w-[550px]
            "
          >

            {/* GLOW */}
            <div className="
              absolute
              inset-0

              bg-primary/20

              blur-[80px]

              scale-90
            " />

            {/* MAIN IMAGE */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              className="
                relative

                rounded-[3rem]
                overflow-hidden

                border
                border-white/10

                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
              "
            >

              <img
                src="https://philipsmodernhomes.com/cdn/shop/files/Minimalist_Marquis_Leather_Bed_Frame_Design_-3.png?v=1775117985&width=2000"
                alt="Luxury Interior"
                className="
                  w-full
                  h-[500px]

                  object-cover
                "
              />
            </motion.div>

            {/* FLOATING CARD */}
            <motion.div
              animate={{
                y: [10, -10, 10],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
              }}
              className="
                absolute

                -bottom-6
                -left-6

                bg-white

                rounded-3xl

                px-6
                py-5

                shadow-2xl
              "
            >

              <p className="text-gray-500 text-sm mb-1">
                Trusted by
              </p>

              <h4 className="text-2xl font-black text-gray-900">
                10,000+
              </h4>

              <p className="text-primary font-semibold">
                Happy Customers
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;