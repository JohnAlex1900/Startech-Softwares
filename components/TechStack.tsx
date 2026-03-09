import React from "react";
import { motion } from "framer-motion";
import { TECH_STACK } from "../constants";

const TechStack: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900"
      aria-labelledby="tech-heading"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Technology
          </span>
          <h2
            id="tech-heading"
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
          >
            Our Tech Stack & Skills
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We use modern tools and technologies to build amazing products.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-primary-900 dark:hover:text-secondary-400 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ scale: 1.15, y: -4 }}
            >
              <div className="fill-current">{tech.icon}</div>
              <span className="font-semibold text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
