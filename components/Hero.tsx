
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    headline: 'Empowering Businesses with Digital Excellence',
    sub: 'We craft powerful digital experiences — from websites and apps to AI-powered automation that drives real results.',
    bg: 'from-primary-950 via-primary-900 to-primary-800',
  },
  {
    headline: 'Your Growth, Powered by Smart Technology',
    sub: 'SEO management, social media mastery, and WhatsApp automation built to scale your business in the digital era.',
    bg: 'from-primary-900 via-primary-800 to-secondary-900',
  },
  {
    headline: '50+ Businesses Transformed Online',
    sub: 'From local startups to international enterprises — we build the digital presence your brand deserves.',
    bg: 'from-secondary-900 via-primary-900 to-primary-950',
  },
];

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dcxdamtgm/image/upload/v1773081049/41230A8E-56CC-4E27-9872-DD4C8E5A9DD3_hui5kr.png';

const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <img
      src={OFFICIAL_LOGO_URL}
      alt="Startech Softwares logo"
      className="w-12 h-12 rounded-full object-cover shadow-lg shadow-secondary-500/40"
      loading="eager"
    />
    <div className="text-white">
      <div className="font-black text-xl leading-none tracking-tight">STARTECH</div>
      <div className="text-secondary-300 text-xs font-semibold tracking-widest uppercase leading-none">Softwares</div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated gradient background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(6,182,212,0.15),transparent)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10"
        >
          <Logo />
        </motion.div>

        {/* Slide headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h-${current}`}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {slide.headline.split(' ').map((word, i, arr) =>
              i === arr.length - 1 || i === arr.length - 2 ? (
                <span key={`${current}-w-${i}`} className="text-secondary-300"> {word}</span>
              ) : (
                <span key={`${current}-w-${i}`}> {word}</span>
              )
            )}
          </motion.h1>
        </AnimatePresence>

        {/* Slide sub */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`p-${current}`}
            className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            {slide.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.a
            href="#services"
            className="inline-block bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg shadow-secondary-500/40 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Services
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-block border-2 border-white/30 hover:border-secondary-400 text-white hover:text-secondary-300 font-bold py-4 px-10 rounded-xl text-lg backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-14">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'bg-secondary-400 w-8' : 'bg-white/30 w-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
