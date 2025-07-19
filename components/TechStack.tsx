import React from "react";
import { TECH_STACK } from "../constants";

const TechStack: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="py-20 md:py-28 bg-slate-100 dark:bg-slate-900 fade-in-section"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Tech Stack & Skills
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We use modern tools and technologies to build amazing products.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 md:gap-x-16">
          {TECH_STACK.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 transition-transform duration-300 hover:scale-110 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <div className="fill-current">{tech.icon}</div>
              <span className="font-semibold text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
