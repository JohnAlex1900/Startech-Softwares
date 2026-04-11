import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
  { value: '35%+', label: 'average increase in customer inquiries', icon: '📈' },
  { value: '3x', label: 'faster response to customer contacts', icon: '⚡' },
  { value: '50%+', label: 'higher conversion from visitor to lead', icon: '🎯' },
  { value: '24/7', label: 'automated customer engagement coverage', icon: '🤖' },
];

const testimonials = [
  {
    quote: 'The new website made our services easier to understand, and people started reaching out with better enquiries instead of just browsing.',
    name: 'James Mwangi',
    role: 'Business Owner, Gift & Sons International',
    initials: 'JM',
  },
  {
    quote: 'What changed most was speed. Customers got quicker responses on WhatsApp and our team stopped missing leads after hours.',
    name: 'Amina Hassan',
    role: 'Operations Lead, Sifabora Africa',
    initials: 'AH',
  },
  {
    quote: 'The content and structure helped us look more credible online. We now have a cleaner path from social media to enquiry.',
    name: 'Brian Kariuki',
    role: 'Founder, TechBridge Kenya',
    initials: 'BK',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const Highlights: React.FC = () => {
  return (
    <section id="highlights" className="relative overflow-hidden py-20 md:py-28 bg-primary-950" aria-labelledby="highlights-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%)]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Results
          </span>
          <h2 id="highlights-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
            What our clients actually see—more customers, better conversions, higher revenue
          </h2>
          <p className="text-lg text-primary-200/75">
            These aren't promises. These are the average results our clients get across different industries. Your actual results may vary based on your starting point and commitment.
          </p>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ scale: 1.03 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <div className="mb-3 text-3xl" role="img" aria-label={stat.label}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-secondary-400">{stat.value}</div>
              <div className="mt-2 text-sm leading-6 text-primary-200/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">How real business owners describe the impact</h3>
          <div className="mx-auto h-1 w-16 bg-secondary-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <svg key={starIndex} className="h-4 w-4 fill-current text-secondary-400" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="flex-1 text-sm leading-7 italic text-primary-100/85">{testimonial.quote}</p>

              <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-primary-700 text-sm font-bold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-primary-200/60">{testimonial.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-16 flex flex-col gap-4 text-center sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-secondary-500 px-7 py-4 font-bold text-white shadow-lg shadow-secondary-500/20 transition-colors hover:bg-secondary-400"
          >
            Start your project
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white/25 px-7 py-4 font-bold text-white transition-colors hover:border-secondary-400 hover:text-secondary-200"
          >
            See the proof
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
