'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene to prevent SSR issues with WebGL
const ThreeDScene = dynamic(() => import('./ThreeDScene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />
});

export default function Hero() {
  const containerRef = useRef(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out text as we scroll down
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[200vh]">
      {/* Sticky Container for 3D Art & Content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeDScene />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3022 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Floating Foreground Content */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center pt-20 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 backdrop-blur-md bg-white/40 shadow-[var(--shadow-card)] border border-forest-green/10 text-terracotta text-sm font-medium rounded-full">
              Financial Awareness Initiative
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-forest-green leading-[1.05] tracking-tight mb-8 drop-shadow-sm"
          >
            Empowering Women.<br />
            <span className="text-terracotta italic font-medium">Building Wealth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-forest-green/80 font-body leading-relaxed mb-12"
          >
            ArthaSakhi is a grassroots movement dedicated to financial literacy and investment 
            education — because every woman deserves the power to build her family&apos;s future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center pointer-events-auto"
          >
            <a
              href="#about"
              className="group px-8 py-4 bg-forest-green text-warm-sand font-medium rounded-full text-base transition-all duration-300 hover:scale-105 hover:bg-terracotta hover:shadow-xl hover:shadow-terracotta/20 flex items-center gap-2"
            >
              Start Your Journey
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="px-8 py-4 backdrop-blur-md bg-white/30 border border-forest-green/10 text-forest-green font-medium rounded-full text-base transition-all duration-300 hover:scale-105 hover:bg-white/50"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-forest-green/40"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll to Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-forest-green/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
