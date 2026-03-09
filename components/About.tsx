import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Results-Driven",
    desc: "Every strategy is measured against growth KPIs — traffic, leads, and conversions.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Tech-Forward",
    desc: "We leverage cutting-edge tools — AI, automation, and modern frameworks — for competitive advantage.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Client-Centered",
    desc: "Dedicated support and tailored solutions to match your unique business objectives.",
  },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white dark:bg-slate-800/30"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              variants={fadeUp}
            >
              <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
                Who We Are
              </span>
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
              >
                A Digital Agency Built for{" "}
                <span className="text-primary-900 dark:text-secondary-400">
                  Business Growth
                </span>
              </h2>
            </motion.div>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              variants={fadeUp}
            >
              At <span className="font-bold text-primary-900 dark:text-white">Startech Softwares</span>, we
              specialize in delivering comprehensive digital services that help businesses establish, grow, and
              dominate their online presence. From sleek websites and custom apps to intelligent automation and
              strategic SEO — we are your end-to-end digital partner.
            </motion.p>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={2}
              variants={fadeUp}
            >
              We serve <span className="font-semibold text-secondary-600 dark:text-secondary-400">startups, SMEs,
              and established enterprises</span> — combining technical expertise with creative vision to deliver
              measurable outcomes.
            </motion.p>

            <motion.a
              href="#services"
              className="inline-flex items-center gap-2 font-bold text-primary-900 dark:text-secondary-400 hover:gap-4 transition-all group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={3}
              variants={fadeUp}
            >
              Explore Our Services
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Right: pillars */}
          <div className="grid grid-cols-1 gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="flex gap-5 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-secondary-400/50 transition-colors group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-900 dark:bg-primary-900/60 text-secondary-400 flex items-center justify-center shadow-inner">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
