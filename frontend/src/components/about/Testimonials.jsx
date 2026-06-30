import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Aanya Sharma",
      city: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
      rating: 5,
      review: "Renting furniture from RentEase was the absolute best decision when I moved to Bangalore. The process was completely seamless. They delivered and installed the entire living room set within 48 hours. The furniture is premium, modern, and very comfortable!"
    },
    {
      id: 2,
      name: "Rohit Verma",
      city: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      rating: 5,
      review: "I rented a smart refrigerator and a washing machine for my new flat. Instead of spending huge upfront money, I pay a tiny monthly rent. The products are in brand new condition, and their support team is extremely quick to help with queries."
    },
    {
      id: 3,
      name: "Pooja Patel",
      city: "Delhi NCR",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
      rating: 5,
      review: "Absolutely love the service! The free relocation feature came in handy when I had to switch apartments last month. RentEase moved all the rented furniture to my new place completely free of charge. Strongly recommend them!"
    },
    {
      id: 4,
      name: "Vikram Malhotra",
      city: "Hyderabad",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
      rating: 5,
      review: "High quality appliances and furniture models that would have cost a fortune to buy. Excellent customer service, hassle-free document verification, and smooth onboarding. Definitely a game-changer for working professionals!"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-1 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-18 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              What Our Subscribers Say
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative flex flex-col items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-8 items-center md:items-start relative"
            >
              <Quote className="w-16 h-16 text-primary/10 absolute top-6 right-8 pointer-events-none" />

              {/* Profile Image & Rating */}
              <div className="flex flex-col items-center gap-3 text-center md:w-1/4">
                <img
                  src={reviews[activeIdx].avatar}
                  alt={reviews[activeIdx].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-md"
                />
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg leading-tight">
                    {reviews[activeIdx].name}
                  </h4>
                  <p className="text-gray-450 text-sm font-semibold">{reviews[activeIdx].city}</p>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-yellow-400 mt-1">
                  {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                <p className="text-gray-600 text-lg md:text-xl italic leading-relaxed font-medium">
                  "{reviews[activeIdx].review}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-white" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2 mt-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
