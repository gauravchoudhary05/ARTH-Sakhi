'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const testimonials = [
  {
    quote: "Before ArthaSakhi, I never thought about investing. Now I run a SIP portfolio and my family looks to me for financial advice. It's the most empowering thing I've ever done.",
    name: 'Sunita Sharma',
    role: 'Homemaker & Investor',
    location: 'Jaipur',
  },
  {
    quote: "Hema ji explained mutual funds in a way that made me feel confident, not confused. I started my first SIP with just ₹500 and now I'm planning for my daughter's education.",
    name: 'Meena Devi',
    role: 'Small Business Owner',
    location: 'Jodhpur',
  },
  {
    quote: "The workshop changed my perspective completely. I used to think investing was only for the rich. ArthaSakhi showed me that financial security is for everyone.",
    name: 'Priya Rathore',
    role: 'Teacher',
    location: 'Udaipur',
  },
  {
    quote: "My husband and I now plan our finances together, thanks to the family financial planning sessions. It has brought us closer and reduced our stress about the future.",
    name: 'Kavita Kumari',
    role: 'Government Employee',
    location: 'Bikaner',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 sm:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-medium rounded-full mb-4">
            Voices of Change
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green leading-tight mb-6">
            Stories From Our <span className="text-terracotta">Community</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-forest-green/80 leading-relaxed">
            Real women, real transformation. Hear from those whose lives have been 
            changed through financial empowerment.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              onMouseEnter={() => setActiveIndex(i)}
              className={`relative backdrop-blur-md bg-white/40 border border-forest-green/10 rounded-2xl p-8 sm:p-10 transition-all duration-500 cursor-default ${
                activeIndex === i
                  ? 'shadow-[var(--shadow-hover)] scale-[1.02]'
                  : 'shadow-[var(--shadow-card)]'
              }`}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 font-heading text-6xl text-terracotta/10 leading-none">
                &ldquo;
              </div>

              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-forest-green/80 leading-relaxed relative z-10 italic mb-8 flex-grow">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-forest-green/5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-terracotta to-light-terracotta flex items-center justify-center text-warm-sand font-heading font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-forest-green text-sm">{t.name}</p>
                    <p className="text-xs text-warm-gray">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
