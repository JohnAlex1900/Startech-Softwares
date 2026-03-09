import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PROJECTS } from "../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

type FilterCategory = "All" | "Websites" | "Social Media" | "Automation" | "Branding";

const portfolioItems = [
  ...PROJECTS.map((p) => ({
    ...p,
    category: "Websites" as FilterCategory,
    type: "Website",
  })),
  {
    title: "TechBridge Kenya",
    description: "Complete social media management and WhatsApp automation setup for a technology consulting firm, boosting engagement by 300%.",
    technologies: ["WhatsApp API", "Instagram", "Facebook", "Content Strategy"],
    imageUrl: "",
    link: "#",
    category: "Social Media" as FilterCategory,
    type: "Social Media",
  },
  {
    title: "AfriHarvest Co-op",
    description: "Instagram growth strategy and content creation for an agricultural cooperative, growing their following from 200 to 8,000 in 6 months.",
    technologies: ["Instagram", "Canva", "Content Calendar", "Analytics"],
    imageUrl: "",
    link: "#",
    category: "Social Media" as FilterCategory,
    type: "Social Media",
  },
  {
    title: "Nairobi Real Estate Hub",
    description: "AI-powered WhatsApp automation system handling 500+ daily property inquiries, reducing response time from hours to seconds.",
    technologies: ["WhatsApp Business API", "Node.js", "OpenAI", "Firebase"],
    imageUrl: "",
    link: "#",
    category: "Automation" as FilterCategory,
    type: "Automation",
  },
  {
    title: "SafariLink Tours",
    description: "Complete brand identity overhaul including logo design, color system, and website redesign for a Kenyan tour operator.",
    technologies: ["Figma", "Brand Strategy", "React", "Tailwind CSS"],
    imageUrl: "",
    link: "#",
    category: "Branding" as FilterCategory,
    type: "Branding",
  },
];

const testimonials = [
  {
    quote: "Startech completely transformed our online presence. Our leads doubled within 3 months of launching the new website. The team was professional, responsive, and genuinely cared about our success.",
    name: "James Mwangi",
    role: "CEO, Gift & Sons International",
    initials: "JM",
    project: "Website Development",
    rating: 5,
  },
  {
    quote: "The SEO and social media work they did for us was outstanding. We rank on the first page of Google for our key terms now, and our organic traffic has tripled since we started working with Startech.",
    name: "Amina Hassan",
    role: "Marketing Director, Sifabora Africa",
    initials: "AH",
    project: "SEO & Social Media",
    rating: 5,
  },
  {
    quote: "Their WhatsApp automation has saved us hours every day. Customers get instant replies and our team can focus on what matters. The ROI has been incredible — I wish we'd done this sooner.",
    name: "Brian Kariuki",
    role: "Operations Manager, TechBridge Kenya",
    initials: "BK",
    project: "WhatsApp Automation",
    rating: 5,
  },
  {
    quote: "Working with Startech was a game-changer for our social media presence. They understand our audience, create incredible content, and the results speak for themselves — our engagement is through the roof.",
    name: "Wanjiru Kamau",
    role: "Brand Manager, AfriHarvest Co-op",
    initials: "WK",
    project: "Social Media Management",
    rating: 5,
  },
];

const categories: FilterCategory[] = ["All", "Websites", "Social Media", "Automation", "Branding"];

const PlaceholderImage: React.FC<{ title: string; type: string }> = ({ title, type }) => {
  const icons: Record<string, string> = {
    Website: "🌐",
    "Social Media": "📱",
    Automation: "🤖",
    Branding: "🎨",
  };
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-800 flex flex-col items-center justify-center">
      <span className="text-5xl mb-3" role="img" aria-label={type}>{icons[type] || "📁"}</span>
      <span className="text-primary-200/60 text-sm font-medium">{title}</span>
    </div>
  );
};

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const filtered = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(6,182,212,0.15),transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-secondary-400 font-bold text-sm uppercase tracking-widest mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Work That{" "}
              <span className="text-secondary-300">Speaks for Itself</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed">
              A showcase of transformative digital projects — from websites and social media campaigns to AI-powered automation systems that drive real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary-500 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "8", label: "Industry Sectors" },
              { value: "3", label: "Countries Served" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-white/80 text-sm font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Browse our work across websites, social media, automation, and branding.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === cat
                    ? "bg-primary-900 dark:bg-secondary-500 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 hover:border-secondary-400/30 transition-all"
                  whileHover={{ y: -6 }}
                >
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <PlaceholderImage title={item.title} type={item.type} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                    {item.link !== "#" && (
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-white text-primary-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-secondary-400 hover:text-white transition-colors"
                        >
                          Visit Site
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Clients Spotlight */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Client Spotlight
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              High-Profile Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              In-depth look at some of our most impactful client partnerships.
            </p>
          </motion.div>

          <div className="space-y-12">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                      >
                        Visit Live Site
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <span className="inline-block bg-secondary-500/10 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Featured Client
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-900 text-secondary-400 text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: "🚀", text: "Performance optimized" },
                      { icon: "📱", text: "Mobile responsive" },
                      { icon: "🔍", text: "SEO ready" },
                    ].map((badge) => (
                      <div key={badge.text} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span role="img" aria-label={badge.text}>{badge.icon}</span>
                        <span>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-primary-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.08),transparent)] pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              What Our Clients Say
            </h2>
            <div className="h-1 w-16 bg-secondary-500 mx-auto" />
          </motion.div>

          {/* Testimonial carousel */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10"
              >
                <div className="flex gap-1 mb-6" aria-label={`${testimonials[activeTestimonial].rating} stars`}>
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-secondary-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-primary-100/90 text-lg leading-relaxed italic mb-8">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">{testimonials[activeTestimonial].name}</div>
                    <div className="text-primary-300/70 text-sm">{testimonials[activeTestimonial].role}</div>
                    <span className="inline-block mt-1 text-xs bg-secondary-500/20 text-secondary-400 px-2 py-0.5 rounded-full font-medium">
                      {testimonials[activeTestimonial].project}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary-500 text-white flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? "bg-secondary-400 w-8" : "bg-white/30 w-3"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary-500 text-white flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's create something remarkable together. Your project could be our next featured work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-block bg-primary-900 hover:bg-primary-800 dark:bg-secondary-500 dark:hover:bg-secondary-400 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg transition-colors"
                >
                  Start Your Project
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/services"
                  className="inline-block border-2 border-primary-900 dark:border-secondary-400 text-primary-900 dark:text-secondary-400 hover:bg-primary-900 hover:text-white dark:hover:bg-secondary-400 dark:hover:text-primary-950 font-bold py-4 px-10 rounded-xl text-lg transition-colors"
                >
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
