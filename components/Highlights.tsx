import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Websites Built", icon: "🌐" },
  { value: "30+", label: "Businesses Served", icon: "🏢" },
  { value: "99%", label: "Client Satisfaction", icon: "⭐" },
  { value: "24/7", label: "AI Automation", icon: "🤖" },
];

const testimonials = [
  {
    quote:
      "Startech completely transformed our online presence. Our leads doubled within 3 months of launching the new website.",
    name: "James Mwangi",
    role: "CEO, Gift & Sons International",
    initials: "JM",
  },
  {
    quote:
      "The SEO and social media work they did for us was outstanding. We rank on the first page of Google for our key terms now.",
    name: "Amina Hassan",
    role: "Marketing Director, Sifabora Africa",
    initials: "AH",
  },
  {
    quote:
      "Their WhatsApp automation has saved us hours every day. Customers get instant replies and our team can focus on what matters.",
    name: "Brian Kariuki",
    role: "Operations Manager, TechBridge Kenya",
    initials: "BK",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const Highlights: React.FC = () => {
  return (
    <section
      id="highlights"
      className="py-20 md:py-28 bg-primary-950 dark:bg-primary-950 overflow-hidden"
      aria-labelledby="highlights-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Our Impact
          </span>
          <h2
            id="highlights-heading"
            className="text-3xl md:text-4xl font-black text-white mb-4"
          >
            Why Businesses Choose{" "}
            <span className="text-secondary-400">Startech</span>
          </h2>
          <p className="text-lg text-primary-200/70 max-w-2xl mx-auto">
            Proven results, satisfied clients, and a relentless drive for digital excellence.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-secondary-400/40 transition-colors"
            >
              <div className="text-3xl mb-2" aria-hidden="true">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-secondary-400 mb-1">
                {stat.value}
              </div>
              <div className="text-primary-200/70 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
            What Our Clients Say
          </h3>
          <div className="h-1 w-16 bg-secondary-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 hover:border-secondary-400/30 rounded-2xl p-7 flex flex-col gap-5 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 stars">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-secondary-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-primary-100/80 text-sm leading-relaxed italic flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-primary-300/60 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="inline-block bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg shadow-secondary-500/30 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
