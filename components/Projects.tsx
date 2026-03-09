
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="work" className="py-20 md:py-28 bg-white dark:bg-slate-800/30" aria-labelledby="work-heading">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Portfolio
          </span>
          <h2 id="work-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Our Work
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A selection of projects that showcase our commitment to quality and innovation.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/portfolio"
              className="inline-block bg-primary-900 hover:bg-primary-800 dark:bg-secondary-500 dark:hover:bg-secondary-400 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg transition-colors"
            >
              View Full Portfolio
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-block border-2 border-primary-900 dark:border-secondary-400 text-primary-900 dark:text-secondary-400 hover:bg-primary-900 hover:text-white dark:hover:bg-secondary-400 dark:hover:text-primary-950 font-bold py-3.5 px-10 rounded-xl transition-colors"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
