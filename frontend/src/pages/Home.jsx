import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import HeroSlider from '../components/home/HeroSlider';
import Categories from '../components/home/Categories';
import Benefits from '../components/home/Benefits';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import Stats from '../components/home/Stats';
import AboutPreview from '../components/home/AboutPreview';
import CTABanner from '../components/home/CTABanner';

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <HeroSlider />
        <Categories />
        <Benefits />
        <HowItWorks />
        <FeaturedProducts />
        <AboutPreview />
        <Stats />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
