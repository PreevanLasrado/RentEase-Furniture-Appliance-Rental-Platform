import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import Image1 from "../../assets/images/image1.jpg";
import Image6 from "../../assets/images/image6.jpeg";
import Image3 from "../../assets/images/image3.jpg";
import Image5 from "../../assets/images/image5.jpg";

const VisionMission = () => {
  const missionBullets = [
    "Flexible Rental Solutions",
    "Affordable Premium Living",
    "Customer-Centric Experiences",
    "Hassle-Free Relocation Support",
  ];

  const visionBullets = [
    "Redefining Smart Living",
    "Sustainable Lifestyle Solutions",
    "Affordable Luxury Access",
    "Empowering Modern Cities",
  ];

  return (
    <section className="-mt-10 py-6 md:py-6 bg-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* SECTION HEADING */}
        <div className="text-center mb-20 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-[16px] tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Vision & Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              The Purpose Behind RentEase
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="space-y-32 md:space-y-48 max-w-6xl mx-auto">

          {/* 1. OUR MISSION (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Side: Premium Image Collage */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
              {/* Large Rounded Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-[82%] h-[90%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100/50"
              >
                <motion.img
                  src={Image1}
                  alt="Our Mission - Premium Living Room"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Smaller Floating Overlapping Image Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-[-5%] right-[2%] w-[48%] h-[72%] z-20"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 6,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.03, y: -18 }}
                  className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[8px] border-white bg-white"
                >
                  <img
                    src={Image6}
                    alt="Our Mission - Premium Refrigerator"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side: Mission Content */}
            <div className="space-y-6 lg:pl-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl md:text-5.5xl font-black text-gray-900 leading-tight mb-5">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed text-justify mb-8">
                  To simplify modern living by providing premium furniture and appliance rental experiences that are affordable, flexible, and hassle-free.
                </p>
              </motion.div>

              {/* Checklist */}
              <ul className="space-y-4">
                {missionBullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/10 flex-shrink-0">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <span className="text-gray-700 font-bold text-base md:text-lg group-hover:text-primary transition-colors duration-300">
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>

          {/* 2. OUR VISION (Content Left, Image Right) */}
          <div className="-mt-26 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Side: Vision Content */}
            <div className="space-y-6 lg:pr-6 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl md:text-5.5xl font-black text-gray-900 leading-tight mb-5">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed text-justify mb-8">
                  To redefine urban living by making premium furniture and appliances accessible to everyone through smart, sustainable, and flexible rental solutions.
                </p>
              </motion.div>

              {/* Checklist */}
              <ul className="space-y-4">
                {visionBullets.map((bullet, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/10 flex-shrink-0">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <span className="text-gray-700 font-bold text-base md:text-lg group-hover:text-primary transition-colors duration-300">
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Side: Premium Image Collage */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] order-1 lg:order-2">
              {/* Large Rounded Image */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-[82%] h-[90%] ml-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100/50"
              >
                <motion.img
                  src={Image3}
                  alt="Our Vision - Premium Bedroom Furniture"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Smaller Floating Overlapping Image Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-[-5%] left-[2%] w-[48%] h-[72%] z-20"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 6,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.03, y: 6 }}
                  className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[8px] border-white bg-white"
                >
                  <img
                    src={Image5}
                    alt="Our Vision - Premium Washing Machine"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMission;