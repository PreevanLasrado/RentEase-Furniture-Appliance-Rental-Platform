import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/about/HeroSection';
import AboutSection from '../components/about/AboutSection';
import StorySection from '../components/about/StorySection';
import VisionMission from '../components/about/VisionMission';
import WhyChooseUs from '../components/about/WhyChooseUs';
import HowItWorks from '../components/about/HowItWorks';
import StatsSection from '../components/about/StatsSection';
import BenefitsSection from '../components/about/BenefitsSection';
import Testimonials from '../components/about/Testimonials';
import FAQSection from '../components/about/FAQSection';
import CTASection from '../components/about/CTASection';
import Footer from '../components/about/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#1F1F1F]">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Page Flow (Hero handles fixed navbar offset with pt-24) */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <StorySection />
        <VisionMission />
        <WhyChooseUs />
        <HowItWorks />
        <StatsSection />
        <BenefitsSection />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
