'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  suffix: string;
  label: string;
  isInView: boolean;
  delay: number;
}

function Counter({ target, suffix, label, isInView, delay }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        delay,
        ease: 'easeOut',
      });
      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, target, delay, count, rounded]);

  return (
    <div className="text-center">
      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-sand mb-2">
        {displayValue.toLocaleString()}
        <span className="text-light-terracotta">{suffix}</span>
      </div>
      <p className="text-warm-sand/60 text-sm sm:text-base font-medium">{label}</p>
    </div>
  );
}

const stats = [
  { target: 5000, suffix: '+', label: 'Women Empowered' },
  { target: 200, suffix: '+', label: 'Workshops Conducted' },
  { target: 3000, suffix: '+', label: 'Families Impacted' },
  { target: 15, suffix: '+', label: 'Cities Reached' },
];

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" className="relative py-32 sm:py-40 bg-deep-slate overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(249,247,242,0.4) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-olive/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-warm-sand/10 text-warm-sand/80 text-sm font-medium rounded-full border border-warm-sand/10 mb-4">
            Our Impact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-sand leading-tight mb-6">
            Numbers That <span className="text-light-terracotta">Tell Our Story</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-warm-sand/60 leading-relaxed">
            Every number represents a life changed, a family empowered, and a step 
            closer to a financially literate India.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <Counter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                isInView={isInView}
                delay={0.2 + i * 0.15}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 sm:mt-20 h-[1px] bg-gradient-to-r from-transparent via-warm-sand/20 to-transparent"
        />
      </div>
    </section>
  );
}
