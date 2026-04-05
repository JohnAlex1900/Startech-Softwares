import React from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-20 md:py-28 bg-slate-50/80 dark:bg-slate-950/55" aria-labelledby="tech-heading">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Delivery stack
          </span>
          <h2 id="tech-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            The tools we use to build reliable, modern business experiences
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We use practical, production-ready tools to keep projects fast, maintainable, and easy to extend.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 md:gap-x-16">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-primary-900 dark:text-slate-400 dark:hover:text-secondary-400"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ scale: 1.08, y: -4 }}
            >
              <div className="fill-current text-secondary-500">{tech.icon}</div>
              <span className="text-sm font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
