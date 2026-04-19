import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SERVICES } from "../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const storyFrames = [
  {
    title: "Before",
    subtitle: "Visibility without conversion",
    desc: "You may be getting traffic, but unclear messaging and weak response paths cause prospects to leave without taking action.",
    tone: "from-rose-500/20 to-rose-100/5",
  },
  {
    title: "During",
    subtitle: "Structured digital rebuild",
    desc: "We redesign your touchpoints so your offer is easier to understand, trust is stronger, and contact is frictionless.",
    tone: "from-amber-500/20 to-amber-100/5",
  },
  {
    title: "After",
    subtitle: "Reliable growth engine",
    desc: "You get a cleaner system that attracts better enquiries, responds faster, and supports long-term business growth.",
    tone: "from-emerald-500/20 to-emerald-100/5",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Business Discovery",
    desc: "We uncover where prospects drop off, where trust is weak, and where growth opportunities are being missed.",
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    desc: "We map a focused action plan that aligns with your goals, audience behavior, and delivery capacity.",
  },
  {
    number: "03",
    title: "Build & Deployment",
    desc: "Design, development, and automation are implemented with clarity, performance, and maintainability in mind.",
  },
  {
    number: "04",
    title: "Optimization",
    desc: "We refine weak points and improve user flow so the experience works better for both prospects and your team.",
  },
  {
    number: "05",
    title: "Scale Support",
    desc: "After launch, we continue improving what matters most: visibility quality, conversion clarity, and response speed.",
  },
];

const serviceDetails: Record<string, { features: string[]; highlight: string }> = {
  "Website Development": {
    features: [
      "Custom responsive design tailored to your brand",
      "Fast-loading pages optimized for Core Web Vitals",
      "SEO-ready structure and semantic HTML",
      "CMS integration (WordPress, Headless, custom)",
      "E-commerce capabilities with payment integration",
      "Ongoing maintenance and updates",
    ],
    highlight: "We focus on speed, clarity, and action so the website helps more visitors become enquiries."
  },
  "App Development": {
    features: [
      "Cross-platform apps for iOS and Android",
      "Native-feel UI with smooth animations",
      "Backend API development and integration",
      "Push notifications and real-time features",
      "App Store and Google Play submission support",
      "Performance optimization and testing",
    ],
    highlight: "From MVPs to full-scale apps — we build mobile solutions your users will love.",
  },
  "SEO Management": {
    features: [
      "Comprehensive keyword research and strategy",
      "On-page and technical SEO optimization",
      "Link building and domain authority growth",
      "Local SEO for Kenya and international markets",
      "Monthly analytics reports with actionable insights",
      "Competitor analysis and opportunity mapping",
    ],
    highlight: "We target search terms that matter to your business and build the site so Google can understand it clearly.",
  },
  "Content Creation": {
    features: [
      "Blog posts and long-form articles",
      "Website copy and landing page content",
      "Email marketing campaigns",
      "Social media captions and scripts",
      "Video scripts and voiceover content",
      "Brand storytelling and messaging",
    ],
    highlight: "Compelling content that ranks on search engines and resonates with your audience.",
  },
  "Social Media Management": {
    features: [
      "Multi-platform management (Instagram, Facebook, X, LinkedIn, TikTok)",
      "Content calendar planning and scheduling",
      "Community management and engagement",
      "Paid social advertising campaigns",
      "Monthly performance analytics",
      "Influencer collaboration coordination",
    ],
    highlight: "We create content systems that keep your brand visible and make it easier for people to remember you.",
  },
  "WhatsApp & Social Automation": {
    features: [
      "WhatsApp Business API integration",
      "Automated auto-reply systems",
      "Instagram DM automation and lead capture",
      "Chatbot flows for sales and support",
      "CRM integration for lead management",
      "Custom trigger-based messaging sequences",
    ],
    highlight: "Automation helps you handle common questions faster while keeping the conversation human.",
  },
  "AI Call Agents": {
    features: [
      "Custom AI voice agent development",
      "Natural language understanding and response",
      "After-hours call handling support",
      "Appointment booking and inquiry management",
      "Call recording and transcript analysis",
      "Seamless human handoff when needed",
    ],
    highlight: "Voice agents can answer routine questions and hand off serious leads when needed.",
  },
  "UI/UX Design": {
    features: [
      "User research and persona development",
      "Wireframing and interactive prototyping",
      "Design systems and component libraries",
      "Accessibility-first design approach",
      "A/B testing and conversion rate optimization",
      "Handoff-ready Figma files for developers",
    ],
    highlight: "Interfaces that reduce friction, improve readability, and make the next step obvious.",
  },
};

const ServicesPage: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 py-28 md:py-36">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(6,182,212,0.15),transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 text-sm font-bold uppercase tracking-widest text-secondary-400">
              Value-Focused Services
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              We Build the Digital Systems
              <span className="block text-secondary-300">That Turn Interest into Clients</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed">
              Every service is designed to solve one core business challenge: low trust, weak visibility, slow response, or poor conversion flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story strip */}
      <section className="bg-slate-100 py-14 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {storyFrames.map((frame, i) => (
              <motion.div
                key={frame.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`rounded-2xl border border-slate-200/80 bg-gradient-to-br ${frame.tone} p-6 dark:border-slate-700`}
              >
                <div className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">{frame.title}</div>
                <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{frame.subtitle}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{frame.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Service Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              What We Deliver for Your Business
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Select any service to see the practical outcomes, capabilities, and strategic value it adds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-10">
            {[
              { title: 'Better visibility', text: 'Get discovered by people already searching for your type of service.' },
              { title: 'Higher trust', text: 'Communicate your value clearly so prospects feel confident contacting you.' },
              { title: 'Faster response', text: 'Automate repetitive interactions and capture leads before they go cold.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => {
              const isActive = activeService === service.title;
              const details = serviceDetails[service.title];
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="col-span-1"
                >
                  <motion.button
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveService(isActive ? null : service.title)}
                    className={`w-full text-left bg-white dark:bg-slate-800 p-7 rounded-2xl shadow-sm border transition-all cursor-pointer group ${
                      isActive
                        ? "border-secondary-400 shadow-xl shadow-secondary-400/10"
                        : "border-transparent hover:border-secondary-400/30 hover:shadow-xl"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-14 w-14 rounded-xl text-secondary-400 mb-5 shadow-inner transition-colors ${
                        isActive ? "bg-primary-800" : "bg-primary-900 dark:bg-primary-900/60 group-hover:bg-primary-800"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{service.description}</p>
                    <div className={`mt-4 flex items-center gap-1 text-sm font-semibold transition-colors ${
                      isActive ? "text-secondary-500" : "text-slate-400 group-hover:text-secondary-500"
                    }`}>
                      <span>{isActive ? "Hide Details" : "View Details"}</span>
                      <motion.svg
                        className="w-4 h-4"
                        animate={{ rotate: isActive ? 180 : 0 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded service detail */}
          <AnimatePresence>
            {activeService && serviceDetails[activeService] && (
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-secondary-400/30 shadow-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{activeService}</h3>
                      <p className="text-secondary-600 dark:text-secondary-400 font-semibold text-sm mb-6">
                        {serviceDetails[activeService].highlight}
                      </p>
                      <ul className="space-y-3">
                        {serviceDetails[activeService].features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="flex gap-3 items-center"
                          >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary-500 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="bg-primary-950 rounded-2xl p-6">
                        <p className="text-secondary-400 font-bold text-sm uppercase tracking-widest mb-2">Implementation path</p>
                        <p className="text-primary-200/80 text-sm mb-4">Let us map how this service can be applied to your business goals and current growth stage.</p>
                        <Link
                          to="/contact"
                          className="inline-block bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors"
                        >
                          Book Strategy Call
                        </Link>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          <span className="font-bold text-slate-900 dark:text-white">Outcome focus:</span>{" "}
                          every recommendation is tied to clarity, trust, faster response, and better client conversion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Process */}
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
              Delivery Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              How We Turn Strategy into Results
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A focused process that keeps the work clear, accountable, and tied to business outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 hover:border-secondary-400/30 transition-all"
              >
                <span className="text-5xl font-black text-secondary-500/20 dark:text-secondary-400/20 leading-none">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
                Our Commitment
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                More Than Delivery — <span className="text-secondary-400">A Long-Term Growth Partner</span>
              </h2>
              <p className="text-primary-200/80 text-lg leading-relaxed mb-6">
                We do not just execute tasks. We look at the stage where customers lose interest, then design the experience so more of them move forward.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Dedicated Project Manager", desc: "One point of contact for seamless communication" },
                  { label: "Real-time Progress Updates", desc: "Stay informed at every stage of your project" },
                  { label: "Tailored Scope", desc: "Solutions aligned to your goals, delivery pace, and team capacity" },
                  { label: "Post-launch Support", desc: "We're here long after your project goes live" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex gap-4 items-start"
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{item.label}</div>
                      <div className="text-primary-300/60 text-xs">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-black text-white mb-6">Get a Free Consultation</h3>
              <p className="text-primary-200/70 mb-6 text-sm leading-relaxed">
                Not sure which services fit your stage? Book a focused consultation and we will map your best next moves.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Identify the biggest opportunities for your business",
                  "Get expert recommendations tailored to your goals",
                  "See a clear implementation sequence",
                  "Zero commitment required",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-secondary-400 text-lg">✓</span>
                    <span className="text-primary-200/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-block w-full text-center bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-3.5 px-8 rounded-xl transition-colors"
              >
                Book Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Tell us about your project and we'll create a custom solution that delivers real, measurable results.
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
                  to="/portfolio"
                  className="inline-block border-2 border-primary-900 dark:border-secondary-400 text-primary-900 dark:text-secondary-400 hover:bg-primary-900 hover:text-white dark:hover:bg-secondary-400 dark:hover:text-primary-950 font-bold py-4 px-10 rounded-xl text-lg transition-colors"
                >
                  View Proof
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
