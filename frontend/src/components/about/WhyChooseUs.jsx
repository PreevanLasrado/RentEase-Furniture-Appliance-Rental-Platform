import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import promoBanner from '../../assets/images/about_promo_banner.png';

const WhyChooseUs = () => {
  const comparisonData = [
    { feature: "No Huge Upfront Cost", purchase: false, emi: false, rentease: true },
    { feature: "Monthly Payment Solution", purchase: false, emi: true, rentease: true },
    { feature: "Free Relocation", purchase: false, emi: false, rentease: true },
    { feature: "Free Repairs & Maintenance", purchase: false, emi: false, rentease: true },
    { feature: "Flexible Rental Plans", purchase: false, emi: false, rentease: true },
    { feature: "No Long-Term Commitment", purchase: false, emi: false, rentease: true },
    { feature: "Easy Upgrades", purchase: false, emi: false, rentease: true },
    { feature: "Premium Quality Products", purchase: true, emi: true, rentease: true },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
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
              The Smarter Choice
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight">
              Here’s why RentEase is the perfect choice
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side - Comparison Table */}
          <div className="lg:col-span-7 w-full overflow-x-auto no-scrollbar">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="min-w-[500px] bg-white rounded-3xl p-6"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 px-4 text-left text-20px font-extrabold text-gray-700">Features</th>
                    <th className="py-4 px-4 text-center text-20px font-extrabold text-gray-700">Purchase</th>
                    <th className="py-4 px-4 text-center text-20px font-extrabold text-gray-700">EMI</th>
                    <th className="py-4 px-4 text-center text-20px font-extrabold text-white bg-primary rounded-t-2xl relative shadow-lg shadow-primary/20">
                      RentEase
                      <Sparkles className="w-5 h-5 text-yellow-600 absolute -top-2 -right-1 animate-pulse" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${idx === comparisonData.length - 1 ? 'border-none' : ''}`}
                    >
                      <td className="py-4 px-4 text-sm font-bold text-gray-800">{row.feature}</td>

                      {/* Purchase Column */}
                      <td className="py-4 px-4 text-center">
                        {row.purchase ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-500">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-500">
                            <X className="w-4 h-4" />
                          </div>
                        )}
                      </td>

                      {/* EMI Column */}
                      <td className="py-4 px-4 text-center">
                        {row.emi ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-500">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-500">
                            <X className="w-4 h-4" />
                          </div>
                        )}
                      </td>

                      {/* RentEase Highlighted Column */}
                      <td className="py-4 px-4 text-center bg-primary/5 font-medium border-x border-primary/10 last:border-b last:rounded-b-2xl">
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white shadow-md shadow-primary/20">
                          <Check className="w-4.5 h-4.5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Right Side - Promotional Banner */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4 max-w-[420px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-3xl" />
              <img
                src={promoBanner}
                alt="Promo Banner Setup"
                className="rounded-2xl w-full h-[500px] object-cover"
              />

              {/* Content overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20 text-left">
                <span className="bg-primary text-white font-bold text-xs uppercase px-3 py-1 rounded-full mb-3 inline-block">
                  Live Smarter
                </span>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">
                  Upgrade Without Ownership Liability
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Join the thousands of smart homes opting for RentEase subscriptions rather than hefty EMIs.
                </p>
              </div>

              {/* Float Glass Card Badge */}
              <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-sm border border-white/20 p-3 rounded-2xl shadow-lg pointer-events-none flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-bold text-gray-800">Zero Security Deposit</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
