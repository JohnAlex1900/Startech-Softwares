import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Results-Driven",
    desc: "We measure every strategy against real KPIs — traffic, leads, conversions, and ROI. Your growth is our primary benchmark.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Tech-Forward",
    desc: "We leverage cutting-edge tools — AI, automation, modern frameworks, and cloud infrastructure — to give your business a competitive edge.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Client-Centered",
    desc: "Every solution is tailored to your unique business objectives. We listen first, then build what you actually need — not a one-size-fits-all product.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trust & Transparency",
    desc: "We maintain open communication throughout every project — no hidden fees, no vague timelines. You always know what's happening and why.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Innovation First",
    desc: "We don't follow trends — we set them. Our team continuously explores new technologies and methodologies to keep you ahead of the competition.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global Reach",
    desc: "From Kenya to international markets — we build digital solutions that transcend borders and connect your brand to a global audience.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Startech Softwares was established with a vision to empower businesses through digital transformation." },
  { year: "2021", title: "First 10 Clients", desc: "Delivered websites and digital strategies for 10 businesses across Kenya, from startups to SMEs." },
  { year: "2022", title: "Expanded Services", desc: "Launched AI automation services including WhatsApp bots, Instagram auto-replies, and SEO management." },
  { year: "2023", title: "Expanded Delivery", desc: "Supported more businesses with clearer websites, stronger content, and faster response systems." },
  { year: "2024", title: "AI Call Agents", desc: "Introduced intelligent AI call agents, revolutionizing how businesses handle customer communication." },
  { year: "2025", title: "International Expansion", desc: "Serving clients internationally with a growing team and an expanded suite of digital services." },
];

const stats = [
  { value: "12+", label: "Projects Delivered" },
  { value: "8+", label: "Businesses Served" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "5+", label: "Years of Experience" },
];

const journeyScenes = [
  {
    stage: "Before",
    title: "Scattered first impression",
    detail: "Businesses often have traffic, but weak messaging and unclear structure make prospects hesitate.",
    color: "from-rose-500/20 to-rose-400/5",
    icon: "🧩",
  },
  {
    stage: "During",
    title: "Focused digital rebuild",
    detail: "We align visuals, content, and customer flow so people quickly understand what you do and why it matters.",
    color: "from-amber-400/20 to-amber-300/5",
    icon: "⚙️",
  },
  {
    stage: "After",
    title: "Confidence and conversion",
    detail: "You gain a stronger online presence that turns more attention into enquiries, calls, and consistent growth.",
    color: "from-emerald-500/20 to-emerald-300/5",
    icon: "🚀",
  },
];

const AboutPage: React.FC = () => {
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              About{" "}
              <span className="text-secondary-300">Startech Softwares</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed">
              We help businesses present themselves more clearly online, respond faster to new enquiries, and build digital systems that support steady growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-secondary-500 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
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

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Visual Story
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              How clients experience transformation
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {journeyScenes.map((scene, i) => (
              <motion.div
                key={scene.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`rounded-2xl border border-slate-200/70 bg-gradient-to-br ${scene.color} p-6 dark:border-slate-700`}
              >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">{scene.stage}</div>
                    <div className="text-lg" aria-hidden="true">{scene.icon}</div>
                  </div>
                <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{scene.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{scene.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={0}
                variants={fadeUp}
              >
                <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
                  Who We Are
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                  A Practical Partner for{" "}
                  <span className="text-primary-900 dark:text-secondary-400">Business Growth</span>
                </h2>
              </motion.div>
              <motion.p
                className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={1}
                variants={fadeUp}
              >
                At <span className="font-bold text-primary-900 dark:text-white">Startech Softwares</span>, we focus on the parts of your digital presence that directly affect customer decisions: messaging, trust, speed, and response. The goal is simple — help good businesses look credible and convert interest into action.
              </motion.p>
              <motion.p
                className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={2}
                variants={fadeUp}
              >
                From modern websites and content structure to SEO and automation, we build the essentials that help smaller teams stay visible and responsive. We work best with <span className="font-semibold text-secondary-600 dark:text-secondary-400">startups, SMEs, and service businesses</span> that need real support, not vague promises.
              </motion.p>
              <motion.p
                className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={3}
                variants={fadeUp}
              >
                Our team of developers, designers, marketers, and AI specialists work collaboratively to ensure every solution is not just technically sound — but commercially powerful.
              </motion.p>
            </div>

            {/* Visual accent */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-primary-900 to-primary-950 p-8 md:p-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="text-secondary-400 mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
                  <p className="text-primary-200/80 leading-relaxed mb-6">
                    To empower businesses of every size with transformative digital solutions — making enterprise-grade technology accessible, affordable, and impactful.
                  </p>
                  <div className="h-px bg-white/10 mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
                  <p className="text-primary-200/80 leading-relaxed">
                    To be the leading digital transformation partner in Africa — known for innovation, integrity, and the lasting impact we create for our clients.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white dark:bg-slate-800 p-7 rounded-2xl shadow-sm hover:shadow-xl border border-transparent hover:border-secondary-400/30 transition-all group"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-900 dark:bg-primary-900/60 text-secondary-400 mb-5 shadow-inner group-hover:bg-primary-800 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
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
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Growing with{" "}
              <span className="text-secondary-400">Every Milestone</span>
            </h2>
            <p className="text-lg text-primary-200/70 max-w-2xl mx-auto">
              From early projects to a focused business-support practice — here is how the work evolved.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`flex flex-col md:flex-row gap-6 items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white/5 border border-white/10 hover:border-secondary-400/30 rounded-2xl p-6 transition-colors">
                      <span className="text-secondary-400 font-black text-2xl">{milestone.year}</span>
                      <h3 className="text-white font-bold text-lg mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-primary-200/70 text-sm leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-secondary-500 items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-secondary-500/30">
                    <span className="text-white font-black text-xs">{milestone.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
            >
              <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
                Why Startech
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                What Sets Us Apart from the Rest
              </h2>
              <div className="space-y-4">
                {[
                  "End-to-end support under one roof — no need to juggle multiple vendors",
                  "Automation that helps you stay responsive when customers reach out",
                  "Transparent pricing with no hidden fees or surprise costs",
                  "Dedicated support when your project needs attention",
                  "A practical track record with real client work delivered",
                  "Deep understanding of both local and international markets",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3 items-start"
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              {[
                { icon: "🚀", title: "Fast Delivery", desc: "We meet deadlines consistently without compromising quality." },
                { icon: "🎯", title: "Precision Work", desc: "Every pixel, line of code, and strategy is crafted with purpose." },
                { icon: "🤝", title: "Long-term Partner", desc: "We don't just deliver projects — we build lasting partnerships." },
                { icon: "🔒", title: "Secure & Reliable", desc: "Security-first approach ensuring your business data is always protected." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-secondary-400/40 transition-colors"
                  whileHover={{ y: -4 }}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <div className="text-3xl mb-3" role="img" aria-label={item.title}>{item.icon}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-950">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to improve how your business shows up online?
            </h2>
            <p className="text-primary-200/80 text-lg mb-8 max-w-2xl mx-auto">
              If you want a clearer website, faster response flow, or stronger credibility, we can help you choose the best place to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-block bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg shadow-secondary-500/30 transition-colors"
                >
                  Start a conversation
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/services"
                  className="inline-block border-2 border-white/30 hover:border-secondary-400 text-white hover:text-secondary-300 font-bold py-4 px-10 rounded-xl text-lg transition-colors"
                >
                  Explore services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
