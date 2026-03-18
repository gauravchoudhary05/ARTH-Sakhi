'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-1.5 bg-soft-olive/10 text-soft-olive text-sm font-medium rounded-full mb-4">
            Our Mission
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green leading-tight mb-6">
            Every Woman Deserves <br className="hidden sm:block" />
            <span className="text-terracotta">Financial Freedom</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-forest-green/80 leading-relaxed">
            ArthaSakhi bridges the financial literacy gap by bringing investment education 
            directly to women in communities across India.
          </p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">
                    Knowledge is Power
                  </h3>
                  <p className="text-forest-green/80 leading-relaxed max-w-xl">
                    We believe financial literacy isn&apos;t a luxury — it&apos;s a fundamental right. Our workshops 
                    demystify investing, savings, and financial planning in simple, relatable language.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-soft-olive/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-soft-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">
                    Community-Driven
                  </h3>
                  <p className="text-forest-green/80 leading-relaxed max-w-xl">
                    From small neighborhood gatherings to city-wide seminars, ArthaSakhi grows 
                    through the strength of its community — one conversation at a time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-forest-green mb-2">
                    Building Generational Wealth
                  </h3>
                  <p className="text-forest-green/80 leading-relaxed max-w-xl">
                    When a woman understands money, she transforms not just her life, but her entire 
                    family&apos;s future. We focus on creating lasting, generational financial impact.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Vision Card */}
          <AnimatedSection delay={0.25}>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-terracotta/10 to-soft-olive/10" />
              <div className="relative backdrop-blur-md bg-white/40 rounded-2xl p-8 sm:p-10 shadow-[var(--shadow-card)] border border-forest-green/10 hover:shadow-[var(--shadow-hover)] transition-shadow duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-green to-soft-olive flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-warm-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-forest-green mb-4">
                  Our Vision
                </h3>
                <p className="text-forest-green/80 leading-relaxed mb-6">
                  &quot;To create a financially aware India where every woman is equipped with the 
                  knowledge and confidence to make smart investment decisions for herself and 
                  her family.&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-forest-green/10">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                    <span className="text-terracotta text-lg">✦</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-green">Founded in Rajasthan</p>
                    <p className="text-xs text-deep-slate/50">Expanding Across India</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
