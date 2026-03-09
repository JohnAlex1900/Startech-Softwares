import React from "react";
import { motion } from "framer-motion";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-2xl border border-slate-100 dark:border-slate-700 hover:border-secondary-400/40 transition-all duration-300 overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-primary-50 dark:bg-primary-900/40 text-primary-900 dark:text-secondary-400 text-xs font-semibold px-3 py-1 rounded-full border border-primary-100 dark:border-primary-800"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-secondary-600 dark:text-secondary-400 text-sm font-semibold group-hover:gap-3 transition-all">
            Visit Site
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
