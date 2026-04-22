import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    eyebrow: 'Value-focused digital growth',
    headline: 'Turn attention into enquiries, calls, and clients',
    sub: 'Your online presence should guide people from first impression to first contact. We design the path so trust is clear and action is easy.',
  },
  {
    eyebrow: 'From friction to flow',
    headline: 'Make your services easier to understand and easier to buy',
    sub: 'Most businesses lose prospects because the offer is unclear or the next step feels hard. We simplify both.',
  },
  {
    eyebrow: 'Built for long-term growth',
    headline: 'Scale with systems that keep working after launch',
    sub: 'With clearer messaging, better response flows, and smart automation, your digital presence becomes a dependable growth engine.',
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
  { text: 'Clarify the offer', icon: '🎯' },
  { text: 'Build trust faster', icon: '🛡️' },
  { text: 'Reduce response friction', icon: '⚡' },
  { text: 'Convert more enquiries', icon: '📞' },
];

const storySteps = [
  {
    step: 'Before',
    title: 'Traffic without traction',
    detail: 'People arrive, but the message is not clear enough to guide them forward.',
    icon: '🧩',
  },
  {
    step: 'During',
    title: 'We rebuild the path',
    detail: 'We improve clarity, trust, and the response flow so the next step feels natural.',
    icon: '⚙️',
  },
  {
    step: 'After',
    title: 'A cleaner growth engine',
    detail: 'Your digital presence becomes easier to trust, easier to navigate, and easier to convert from.',
    icon: '🚀',
  },
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
                Start Your Growth Story
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-sm transition-colors hover:border-secondary-300 hover:text-secondary-200"
              >
                See the Service Story
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

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {storySteps.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + index * 0.08 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-black uppercase tracking-[0.25em] text-secondary-300">{item.step}</div>
                    <div className="text-xl" aria-hidden="true">{item.icon}</div>
                  </div>
                  <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200/80">{item.detail}</p>
                </motion.div>
              ))}
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
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-300">Service story</div>
                    <div className="mt-2 text-xl font-bold text-white">Clearer path, stronger response</div>
                  </div>
                  <div className="rounded-full bg-secondary-400/15 px-3 py-1 text-xs font-semibold text-secondary-200">Visual narrative</div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { text: 'A website that explains the offer in seconds', icon: '✓' },
                    { text: 'Custom service plans tailored to your needs', icon: '✓' },
                    { text: 'A fast way to ask questions or get personalized pricing', icon: '✓' },
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
                    A cleaner site, a stronger first impression, and a more confident path from discovery to enquiry.
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
