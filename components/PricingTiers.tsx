import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ONE_TIME_SETUPS, PRICING_TIERS } from '../constants';
import type { OneTimeSetup, PricingTier } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PricingTiers: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Flexible pricing
          </span>
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            The 3-tier value model
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            First month is free for new clients. After month one, you continue on the package you select if you are happy with the direction and fit.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mb-10 max-w-4xl rounded-2xl border border-secondary-200 bg-secondary-50 p-5 text-center dark:border-secondary-500/40 dark:bg-secondary-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
            30-day no-fee start: We build and launch your growth system in month one, then monthly billing begins on your selected package if you choose to continue.
          </p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Performance depends on your market, offer, and implementation pace, so results will vary by business.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PRICING_TIERS.map((tier: PricingTier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={`relative rounded-3xl overflow-hidden transition-all ${
                tier.highlighted
                  ? 'ring-2 ring-secondary-400/50 shadow-2xl shadow-secondary-400/20'
                  : 'border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-950/5'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-400/5 to-secondary-500/5 pointer-events-none" />
              )}
              
              <div className={`relative p-8 md:p-10 ${
                tier.highlighted ? 'bg-gradient-to-br from-white to-secondary-50/30 dark:from-slate-900/40 dark:to-slate-900/20' : 'bg-white dark:bg-slate-900/50'
              }`}>
                {tier.highlighted && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-300 bg-secondary-100 dark:bg-secondary-500/20 dark:border-secondary-500/40 px-4 py-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary-700 dark:text-secondary-300">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {tier.bestFor}
                </p>
                
                <div className="mb-8">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Monthly after free month
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {tier.price}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {tier.period}
                    </span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`w-full inline-flex items-center justify-center rounded-xl font-bold py-3.5 px-6 transition-all mb-8 ${
                    tier.highlighted
                      ? 'bg-secondary-400 text-primary-950 hover:bg-secondary-300 shadow-lg shadow-secondary-400/25'
                      : 'border-2 border-primary-900 dark:border-secondary-400 text-primary-900 dark:text-secondary-300 hover:bg-primary-900/5 dark:hover:bg-secondary-400/10'
                  }`}
                >
                  Start free for 30 days
                </Link>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">
                    What's included
                  </div>
                  <ul className="space-y-4">
                    {tier.includes.map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex gap-3 items-start text-sm text-slate-600 dark:text-slate-300"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-400 text-xs font-bold mt-0.5">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">Why this investment is worth it: </span>
                    {tier.valueDelivered}
                    {tier.positioningLine && (
                      <p className="mt-3 text-secondary-700 dark:text-secondary-300 font-medium">
                        {tier.positioningLine}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 rounded-2xl border border-secondary-200 bg-secondary-50 p-4 text-sm leading-7 text-slate-700 dark:border-secondary-500/30 dark:bg-secondary-500/10 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">Expected outcome in 30 days: </span>
                    {tier.expected30DayOutcome}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
              One-time system setups
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              Extra setup options when you need a focused build
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              These setup options use clear minimum pricing so you can quickly add high-impact systems without committing to a larger monthly package.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ONE_TIME_SETUPS.map((setup: OneTimeSetup) => (
              <div key={setup.name} className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-7 shadow-lg shadow-slate-950/5">
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400">One-time setup</div>
                <h4 className="mt-3 text-xl font-black text-slate-900 dark:text-white">{setup.name}</h4>
                <div className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{setup.price}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{setup.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            None of these plans fit your needs?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            We can combine or adjust any package to fit your goals, scope, and budget.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-8 py-3.5 font-bold text-white shadow-lg shadow-primary-900/15 transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
          >
            Get a Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTiers;
