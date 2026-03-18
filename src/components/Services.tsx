'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Financial Literacy Workshops',
    description: 'Interactive sessions that break down complex financial concepts into simple, actionable knowledge. From budgeting basics to understanding market dynamics.',
    accent: 'terracotta',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Investment Education',
    description: 'Learn about mutual funds, SIPs, fixed deposits, and equity markets. We guide you step-by-step through building a diversified investment portfolio.',
    accent: 'soft-olive',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Mutual Fund Awareness',
    description: 'Dedicated programs to demystify mutual funds. Understand NAV, expense ratios, fund categories, and how to choose the right fund for your goals.',
    accent: 'terracotta',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Family Financial Planning',
    description: 'Comprehensive planning sessions for families — budgeting, insurance, retirement planning, and building emergency funds together as a team.',
    accent: 'soft-olive',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="services" className="py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-forest-green/10 text-forest-green text-sm font-medium rounded-full mb-4">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green leading-tight mb-6">
            Our <span className="text-terracotta">Services</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-forest-green/80 leading-relaxed">
            Comprehensive financial education programs designed to empower, educate, 
            and enable women to take charge of their financial future.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative backdrop-blur-md bg-white/40 rounded-2xl p-8 sm:p-10 shadow-[var(--shadow-card)] border border-forest-green/10 hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Accent corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[2rem] rounded-tr-2xl opacity-5 ${
                service.accent === 'terracotta' ? 'bg-terracotta' : 'bg-soft-olive'
              }`} />

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                service.accent === 'terracotta' 
                  ? 'bg-terracotta/10 text-terracotta' 
                  : 'bg-soft-olive/10 text-soft-olive'
              }`}>
                {service.icon}
              </div>

              <h3 className="font-heading text-xl font-bold text-forest-green mb-3">
                {service.title}
              </h3>
              <p className="text-forest-green/80 leading-relaxed max-w-xl group-hover:text-forest-green transition-colors duration-300">
                {service.description}
              </p>

              <div className={`mt-6 flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                service.accent === 'terracotta' 
                  ? 'text-terracotta group-hover:text-light-terracotta' 
                  : 'text-soft-olive group-hover:text-forest-green'
              }`}>
                <span>Learn more</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
