import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import WhyChooseUs from '../components/contact/WhyChooseUs';
import FAQSection from '../components/contact/FAQSection';
import ContactFooter from '../components/contact/ContactFooter';

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex flex-col font-sans text-[#1F1F1F]"
    >
      {/* Existing Fixed Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Information & Form Section */}
        <section id="contact-form-section" className="py-24 bg-white scroll-mt-28">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* General Inquiries & Urgent Help Cards */}
              <div className="lg:col-span-5">
                <ContactInfo />
              </div>

              {/* MERN-Connected Contact Form Card */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose RentEase Feature Grid */}
        <WhyChooseUs />

        {/* Accordion FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer Wrapper */}
      <ContactFooter />
    </motion.div>
  );
};

export default ContactUs;
