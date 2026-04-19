import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const storyCards = [
  {
    title: "Before",
    subtitle: "Traffic without traction",
    text: "Visitors arrive, but the message does not guide them clearly enough to take the next step.",
    tone: "from-rose-500/20 to-rose-100/5",
  },
  {
    title: "During",
    subtitle: "We rebuild the path",
    text: "We improve clarity, trust, and response flow so your audience understands the value faster.",
    tone: "from-amber-500/20 to-amber-100/5",
  },
  {
    title: "After",
    subtitle: "A better growth engine",
    text: "You get a cleaner system that converts more interest into enquiries, calls, and clients.",
    tone: "from-emerald-500/20 to-emerald-100/5",
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28 bg-slate-50/80 dark:bg-slate-950/55" aria-labelledby="services-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.06),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.05),transparent_28%)] pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Story-driven services
          </span>
          <h2 id="services-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Services that move people from interest to action
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Each service supports a part of the customer journey: visibility, trust, response, and conversion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-10">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className={`rounded-2xl border border-slate-200/80 bg-gradient-to-br ${card.tone} p-6 text-left shadow-sm dark:border-slate-700`}
            >
              <div className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">{card.title}</div>
              <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{card.subtitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group rounded-3xl border border-white/60 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all dark:border-slate-700 dark:bg-slate-900/70"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-950 text-secondary-400 shadow-inner transition-colors group-hover:bg-primary-900">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-3">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 text-center">
                {service.description}
              </p>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left dark:border-slate-700 dark:bg-slate-800/70">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-secondary-700 dark:text-secondary-300">What this improves</div>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">A clearer path for your audience to trust, understand, and contact you.</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col gap-4 text-center sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary-900 px-7 py-3.5 font-bold text-primary-900 transition-colors hover:bg-primary-900 hover:text-white dark:border-secondary-400 dark:text-secondary-300 dark:hover:bg-secondary-400 dark:hover:text-primary-950"
          >
            See the full service story
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-7 py-3.5 font-bold text-white shadow-lg shadow-primary-900/15 transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
          >
            Get your growth plan
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
