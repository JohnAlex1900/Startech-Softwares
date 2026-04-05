import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const problemCards = [
  {
    title: 'Clients do not understand the offer',
    desc: 'We rewrite the message so visitors can tell what you do, who you help, and why they should trust you.',
  },
  {
    title: 'Leads come in slowly',
    desc: 'We improve the site structure, calls to action, and SEO signals that support more consistent enquiries.',
  },
  {
    title: 'Replies take too long',
    desc: 'We set up WhatsApp and social automation that keeps conversations moving even when you are busy.',
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
                Why this website exists
              </span>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                Built to help small businesses turn attention into <span className="text-primary-900 dark:text-secondary-400">actual revenue</span>
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
              Startech Softwares creates practical digital systems for businesses that need more than a pretty website. We focus on the moments where customers hesitate, leave, or delay, then design better answers around those moments.
            </motion.p>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={2}
              variants={fadeUp}
            >
              That means clearer messaging, stronger trust signals, faster response systems, and marketing support that helps your business stay visible without becoming overwhelming to manage.
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
                See how we help
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary-900 px-6 py-3.5 font-bold text-primary-900 transition-colors hover:bg-primary-900 hover:text-white dark:border-secondary-400 dark:text-secondary-300 dark:hover:bg-secondary-400 dark:hover:text-primary-950"
              >
                View proof of work
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
