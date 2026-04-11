import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PricingTiers from '../components/PricingTiers';

const PricingPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200/60 dark:border-white/5 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.16),transparent_25%)]" />

        <div className="relative container mx-auto px-6">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-300">
              Investment & ROI
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Simple, transparent pricing that scales with your business
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/85 md:text-lg">
              Start with your first month free. After month one, you can continue on the service package you choose based on your goals and preferred scope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-28 bg-white/50 dark:bg-slate-950/30">
        <div className="container mx-auto px-6">
          <PricingTiers />
        </div>
      </section>

      {/* FAQ or CTA Section */}
      <section className="py-20 md:py-28 bg-slate-50/80 dark:bg-slate-950/55">
        <div className="container mx-auto px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              Have questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
              Let's talk about your business goals
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Every business is unique. We will help you choose the right package, start with your first month free, and then move to paid delivery only if you decide to continue.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-7 py-4 font-bold text-white shadow-lg shadow-primary-900/15 transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
            >
              Claim Your Free First Month
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
