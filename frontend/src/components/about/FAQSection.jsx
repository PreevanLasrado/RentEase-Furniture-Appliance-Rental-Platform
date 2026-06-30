import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: "How does RentEase work?",
      a: "RentEase makes renting extremely simple: browse our furniture & appliance catalogue online, select your rental plan tenure, upload minimal documents for verification, and schedule your free delivery. We deliver and assemble everything within 72 hours."
    },
    {
      q: "What happens if products get damaged?",
      a: "We understand that normal wear and tear happens. RentEase covers minor scratches and minor damages up to ₹1,000 completely free of charge. For major structural damages, a nominal repair cost is evaluated and charged fairly."
    },
    {
      q: "Can I relocate rented products?",
      a: "Yes, absolutely! If you are relocating to another home within the same city, RentEase will dismantle, pack, transport, and assemble your rented items at your new address completely free of charge. Just notify us 7 days in advance."
    },
    {
      q: "Are repairs and maintenance free?",
      a: "Yes. All manufacturing defects, functional faults, and maintenance checkups are covered 100% free by RentEase. If an appliance breaks down or a table gets wobbly, simply raise a support request and our technicians will resolve it."
    },
    {
      q: "Can I upgrade or swap products later?",
      a: "Yes, you can swap or upgrade products after your current tenure active period ends. If you want to change designs or upgrade to a bigger refrigerator mid-tenure, you can contact our support team to calculate tenure adjustments."
    }
  ];

  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
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
              FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#F7F7F7] rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full py-6 px-8 flex justify-between items-center text-left gap-4 font-bold text-gray-900 text-lg group"
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
