import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    eyebrow: 'Get more business, not just views',
    headline: 'Attract walk-ins and calls from ready-to-buy customers',
    sub: 'Your digital presence should work like a professional sales team—qualifying prospects, building trust, and converting visitors into revenue. We make that happen.',
  },
  {
    eyebrow: 'Stop losing money at the door',
    headline: 'Turn visibility into actual customer acquisition',
    sub: 'When prospects find you online, they need to instantly understand what you offer, trust that you\'re credible, and know how to buy. Most businesses fail at one of these. We fix all three.',
  },
  {
    eyebrow: 'Professional scaling for serious businesses',
    headline: 'Grow revenue without growing your team',
    sub: 'Automation, better marketing, and smarter systems let you handle more customers, respond faster, and close more deals—without hiring more people.',
  },
];

// Custom SVG Icons for Proof Points
const ClockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ZapIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IntegrateIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path d="M7 7l-2-2m10 0l2-2m-14 14l-2 2m14 0l2 2" />
  </svg>
);

const proofPoints = [
  { value: '2-4 weeks', label: 'to your first revenue-focused system', icon: ClockIcon },
  { value: '24/7', label: 'automatic customer engagement', icon: ZapIcon },
  { value: 'Multi-channel', label: 'customer acquisition setup', icon: IntegrateIcon },
];

const focusAreas = [
  { text: 'Attract qualified prospects', icon: '🎯' },
  { text: 'Convert faster and easier', icon: '⚡' },
  { text: 'Get real walk-ins & calls', icon: '📞' },
  { text: 'Increase revenue per customer', icon: '💰' },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 dark:border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.16),transparent_25%)]" />

      <div className="relative container mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-${current}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-300">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                  {slide.headline}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/85 md:text-lg">
                  {slide.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {focusAreas.map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100/90 hover:border-secondary-300/40 hover:bg-white/8 transition-all"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-secondary-400 px-7 py-4 font-bold text-primary-950 shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5"
              >
                Get Your Revenue Plan
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-sm transition-colors hover:border-secondary-300 hover:text-secondary-200"
              >
                See What You'll Get
              </a>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {proofPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={point.label}
                    className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5 backdrop-blur-sm hover:border-secondary-300/30 hover:from-white/12 hover:to-white/6 transition-all"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-secondary-400/10 group-hover:bg-secondary-400/15 transition-colors">
                        <IconComponent />
                        <style>{`.text-secondary-300 { color: rgb(34, 211, 238); }`}</style>
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-black text-secondary-300">{point.value}</div>
                        <div className="mt-1 text-sm leading-5 text-slate-200/75">{point.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.aside
            className="relative"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/12 to-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-300">What your clients need</div>
                    <div className="mt-2 text-xl font-bold text-white">A clear next step</div>
                  </div>
                  <div className="rounded-full bg-secondary-400/15 px-3 py-1 text-xs font-semibold text-secondary-200">Live support</div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { text: 'A website that explains the offer in seconds', icon: '✓' },
                    { text: 'Pricing and service details that reduce uncertainty', icon: '✓' },
                    { text: 'A fast way to ask questions or request a quote', icon: '✓' },
                    { text: 'Social proof that builds confidence before the first call', icon: '✓' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex gap-3 rounded-xl border border-white/8 bg-white/5 p-4 hover:bg-white/8 hover:border-secondary-400/30 transition-all group"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.06 }}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-400/20 text-xs font-bold text-secondary-300 group-hover:bg-secondary-400/30 transition-colors">
                        {item.icon}
                      </div>
                      <p className="text-sm leading-5.5 text-slate-200/80">{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-primary-900/80 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-300">Typical outcome</div>
                  <p className="mt-2 text-base leading-7 text-slate-100">
                    A cleaner site, quicker customer response, and a more confident first impression for people who discover you on social media.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90 shadow-lg shadow-black/20 backdrop-blur md:block">
              Designed for service businesses, startups, and local brands
            </div>
          </motion.aside>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to hero slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${index === current ? 'w-10 bg-secondary-400' : 'w-3 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
