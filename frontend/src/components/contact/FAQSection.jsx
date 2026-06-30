import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: 'How does renting work?',
      a: 'Renting is extremely easy with RentEase. Browse our website, select the products you want, choose your rental commitment tenure, upload minimal documents for KYC verification, and pay. We deliver and install within 72 hours.',
    },
    {
      q: 'Can I relocate products?',
      a: 'Yes, absolutely! If you are moving within the same city, RentEase provides free relocation services. We dismantle, safely pack, transport, and set up your rented furniture or appliances at your new residence at no extra cost.',
    },
    {
      q: 'Are repairs free?',
      a: 'Yes. All manufacturing flaws, mechanical breakdowns, and normal wear and tear repairs are covered 100% free by RentEase. Just raise a service request from your user dashboard and our technicians will fix it.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, you have full flexibility. You can cancel your subscription plan at any time. Depending on your original commitment tenure, a nominal early termination charge will be calculated transparently.',
    },
    {
      q: 'How long does approval take?',
      a: 'Once your order is placed and you submit your basic KYC details, our verification team approves documents within 2 to 4 working hours. Once approved, delivery is scheduled according to your preferences.',
    },
  ];

  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-12 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 md:px-18">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4 -mt-8">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#F7F7F7] rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full py-6 px-8 flex justify-between items-center text-left gap-4 font-bold text-gray-900 text-lg group cursor-pointer"
                >
                  <span className="flex items-center gap-3 group-hover:text-primary transition-colors">
                    <HelpCircle className="w-5.5 h-5.5 text-primary flex-shrink-0" />
                    {faq.q}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-8 pb-6 pt-1 text-gray-600 text-sm leading-relaxed text-justify border-t border-gray-200/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
