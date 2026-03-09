import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SERVICES } from "../constants";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4"
          >
            Comprehensive Digital Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            From strategy to execution — every digital solution your business needs, under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-slate-800 p-7 rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-secondary-400/30 transition-shadow cursor-default group"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-900 dark:bg-primary-900/60 text-secondary-400 mx-auto mb-5 shadow-inner group-hover:bg-primary-800 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-center">
                {service.description}
              </p>
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
              to="/services"
              className="inline-block border-2 border-primary-900 dark:border-secondary-500 text-primary-900 dark:text-secondary-400 hover:bg-primary-900 hover:text-white dark:hover:bg-secondary-500 dark:hover:text-white font-bold py-3.5 px-10 rounded-xl transition-colors"
            >
              View All Services
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-block bg-primary-900 hover:bg-primary-800 dark:bg-secondary-500 dark:hover:bg-secondary-400 text-white font-bold py-3.5 px-10 rounded-xl shadow-lg transition-colors"
            >
              Discuss Your Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
