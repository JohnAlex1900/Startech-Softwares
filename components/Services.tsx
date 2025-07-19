import React from "react";
import { SERVICES } from "../constants";

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-slate-100 dark:bg-slate-900 fade-in-section"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We deliver high-quality digital solutions across various domains.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-slate-700 mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
