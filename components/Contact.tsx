import React from 'react';
import { motion } from 'framer-motion';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

const Contact: React.FC = () => {
  const contactItems = [
    {
      href: 'mailto:johnirungu977@gmail.com',
      icon: <EmailIcon />,
      label: 'Email',
      value: 'johnirungu977@gmail.com',
      description: 'Best for project briefs and detailed requests',
    },
    {
        href: 'tel:+254711632577',
      icon: <PhoneIcon />,
      label: 'Call',
        value: '+254 711 632 577',
      description: 'Fastest for direct conversations',
    },
    {
        href: 'https://wa.me/254711632577',
      icon: <WhatsAppIcon />,
      label: 'WhatsApp',
      value: 'Start a chat',
      description: 'Good for quick follow-up questions',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-white/75 dark:bg-slate-950/35" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-secondary-600 dark:text-secondary-400 font-bold text-sm uppercase tracking-widest mb-3">
            Next step
          </span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Ready to replace guesswork with a clear digital plan?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Start with a free first month. We build your growth system first, then you continue on the service package that best fits your goals.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
            {contactItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:border-secondary-400/50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-900 text-secondary-400">
                  {item.icon}
                </div>
                <div className="font-bold text-slate-900 dark:text-white">{item.label}</div>
                <div className="mt-1 text-sm font-medium text-secondary-600 dark:text-secondary-400">{item.value}</div>
                <div className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">{item.description}</div>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              className="rounded-[2rem] bg-primary-950 p-8 text-white shadow-2xl shadow-primary-950/20"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-black mb-3">What happens when you reach out?</h3>
              <p className="text-primary-200/75 leading-7 mb-6">
                We start with your current bottleneck, look at your existing presence, and outline a realistic way to improve the result without bloating the process.
              </p>
              <div className="space-y-4">
                {[
                  'Quick discussion of your goals and current challenge',
                  'A short recommendation on the best starting point',
                  'Clear next steps, pricing direction, and timeline expectations',
                ].map((step) => (
                  <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary-400" />
                    <p className="text-sm leading-6 text-primary-100/85">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/254711632577?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20business%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-secondary-500 px-6 py-3.5 font-bold text-white transition-colors hover:bg-secondary-400"
                >
                  Message on WhatsApp
                </a>
                <a
                  href="mailto:johnirungu977@gmail.com"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 font-bold text-white transition-colors hover:border-secondary-400 hover:text-secondary-200"
                >
                  Send an email brief
                </a>
              </div>
            </motion.div>

            <motion.div
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900/70"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Who this is for</h3>
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <p>
                  Business owners who have a presence online but feel the messaging is not converting.
                </p>
                <p>
                  Teams that need a better website, sharper content, and automation that responds quickly when prospects reach out.
                </p>
                <p>
                  Brands that want to look more established without overcomplicating the process or the budget.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/70">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400">Response expectation</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  We aim to respond within 2 business hours during working days, and WhatsApp enquiries are usually handled faster.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
