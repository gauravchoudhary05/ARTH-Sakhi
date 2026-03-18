'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function FounderMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="founder" className="py-32 sm:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-medium rounded-full mb-4">
            Founder&apos;s Message
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green leading-tight">
            The Heart Behind <span className="text-terracotta">ArthaSakhi</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-terracotta/20 to-light-terracotta/10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-terracotta/20 rounded-2xl" />
              <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] border border-forest-green/10">
                <Image
                  src="/images/founder.png"
                  alt="Ms. Hema Poonia — Founder, ArthaSakhi"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/60 border border-forest-green/10 rounded-2xl px-6 py-3 shadow-lg">
                <p className="font-heading text-sm font-semibold text-forest-green">Ms. Hema Poonia</p>
                <p className="text-xs text-terracotta font-medium">Founder, ArthaSakhi</p>
              </div>
            </div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative">
              {/* Pull Quote */}
              <div className="mb-8 pl-6 border-l-4 border-terracotta">
                <p className="font-heading text-2xl sm:text-3xl font-semibold text-forest-green leading-snug italic">
                  &quot;When a woman learns to manage money, she doesn&apos;t just change her own life — she rewrites her family&apos;s story.&quot;
                </p>
              </div>

              <div className="space-y-6 text-forest-green/80 leading-relaxed max-w-3xl">
                <p>
                  As a financial professional with over a decade of experience in mutual funds and 
                  investment advisory, I witnessed firsthand how financial decisions in most Indian 
                  households are made without the involvement of women — not because they lack 
                  capability, but because they lack opportunity and access to knowledge.
                </p>
                <p>
                  ArthaSakhi was born from a simple yet powerful conviction: <strong className="text-forest-green">financial literacy 
                  should be accessible to every woman</strong>, regardless of her background, education, or 
                  economic standing. What started as informal conversations in living rooms has now 
                  grown into a movement touching thousands of lives.
                </p>
                <p>
                  Through workshops, community sessions, and one-on-one guidance, we&apos;ve seen 
                  homemakers become investors, small business owners become savvy financial 
                  planners, and families build a secure future together.
                </p>
              </div>

              {/* Signature area */}
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[2px] bg-terracotta" />
                <div>
                  <p className="font-heading font-semibold text-forest-green">Hema Poonia</p>
                  <p className="text-sm text-warm-gray">Founder & Lead Educator</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
