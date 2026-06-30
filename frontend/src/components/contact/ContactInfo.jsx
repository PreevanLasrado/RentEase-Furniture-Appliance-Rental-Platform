import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-12">
      {/* General Inquiries Area (Clean, Unboxed Layout) */}
      <div className="space-y-8">
        <div>
          <h2 className="-mt-14 text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            General Inquiries
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            Reach out for partnerships, support, feedback, or rental assistance.
          </p>
        </div>

        {/* Contact List Details */}
        <div className="space-y-8 pt-4">
          {/* Email Item */}
          <div className="flex gap-4 items-center group">
            <div className="bg-gray-100 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary duration-300">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5">
                Email
              </p>
              <a
                href="mailto:support@rentease.in"
                className="text-base font-bold text-gray-900 hover:text-primary transition-colors duration-200"
              >
                support@rentease.in
              </a>
            </div>
          </div>

          {/* Phone Item */}
          <div className="flex gap-4 items-center group">
            <div className="bg-gray-100 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary duration-300">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5">
                Phone
              </p>
              <a
                href="tel:+919876543210"
                className="text-base font-bold text-gray-900 hover:text-primary transition-colors duration-200"
              >
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Head Office Item */}
          <div className="flex gap-4 items-center group">
            <div className="bg-gray-100 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-0.5">
                Headquarters
              </p>
              <a
                href="https://maps.google.com/?q=Bangalore,India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-gray-900 hover:text-primary transition-colors duration-200"
              >
                Bangalore, India
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Support Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gray-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden border border-gray-800"
      >
        <div className="relative z-10 space-y-4">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3.5">
              Urgent Support
            </span>
            <h3 className="text-2xl font-black text-white mb-2">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our support team is available to help with urgent rental, delivery, maintenance, and account-related issues.
            </p>
          </div>

          <div className="pt-2">
            <span
              onClick={() => window.open("https://wa.me/", "_blank")}
              className="inline-flex items-center gap-2 text-primary font-black hover:underline cursor-pointer transition-all duration-200"
            >
              Live WhatsApp Support <span className="text-lg">→</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
