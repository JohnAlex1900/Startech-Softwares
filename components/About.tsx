import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const problemCards = [
  {
    title: 'More qualified customers finding you',
    desc: 'Your business becomes the obvious choice when prospects are searching. Better visibility + professional positioning = higher quality leads.',
  },
  {
    title: 'Higher conversion from first contact',
    desc: 'Visitors understand exactly what you offer and trust you immediately. Clear messaging + trust signals = more customers saying yes.',
  },
  {
    title: 'Revenue growth without hiring',
    desc: 'Automation handles routine inquiries, lead capture, and follow-ups. Work smarter = handle more customers with your current team.',
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white/75 dark:bg-slate-950/35" aria-labelledby="about-heading">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              variants={fadeUp}
            >
              <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
                What changes for your business
              </span>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                You'll see more walk-ins, calls, and <span className="text-primary-900 dark:text-secondary-400">bottom-line revenue growth</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={1}
              variants={fadeUp}
            >
              We help small businesses become the obvious choice in their market. That means better positioning online, faster customer acquisition, and systems that turn prospects into paying customers—without you working harder.
            </motion.p>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={2}
              variants={fadeUp}
            >
              Most businesses fail at one thing: connecting qualified prospects to buying. We focus entirely on that gap—from making sure the right people find you, to making sure they say yes when they contact you.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={3}
              variants={fadeUp}
            >
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3.5 font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
              >
                What You'll Get
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary-900 px-6 py-3.5 font-bold text-primary-900 transition-colors hover:bg-primary-900 hover:text-white dark:border-secondary-400 dark:text-secondary-300 dark:hover:bg-secondary-400 dark:hover:text-primary-950"
              >
                See Results
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {problemCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-transform dark:border-slate-700 dark:bg-slate-900/60"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <div className="mb-3 h-10 w-10 rounded-xl bg-primary-900 text-secondary-400 flex items-center justify-center font-black">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
