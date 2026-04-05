import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-20 md:py-28 bg-white/80 dark:bg-slate-950/35" aria-labelledby="work-heading">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Proof of work
          </span>
          <h2 id="work-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Selected projects that improved clarity, trust, and lead quality
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            These examples show how we approach websites as conversion tools, not just visual assets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
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
            to="/portfolio"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary-900 px-7 py-3.5 font-bold text-primary-900 transition-colors hover:bg-primary-900 hover:text-white dark:border-secondary-400 dark:text-secondary-300 dark:hover:bg-secondary-400 dark:hover:text-primary-950"
          >
            Open the full portfolio
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-7 py-3.5 font-bold text-white shadow-lg shadow-primary-900/15 transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
          >
            Discuss a similar project
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
