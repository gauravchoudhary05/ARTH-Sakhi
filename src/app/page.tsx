'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';

// 3D Rupee — loaded client-side only (WebGL / Canvas)
const ThreeRupee = dynamic(() => import('@/components/ThreeRupee'), { ssr: false, loading: () => null });

// ─── UTILITIES ─────────────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Mission', id: 'mission' },
  { label: 'Impact', id: 'impact' },
  { label: 'Founder', id: 'founder' },
  { label: 'Contact', id: 'contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 🔴 THE MATH FIX: Since your Hero is 800vh, we wait until you scroll 
      // past 7.5x the screen height. This perfectly times the Navbar drop
      // with the very last frame of your video!
      setScrolled(window.scrollY > window.innerHeight * 5.5);
    };

    // Check on initial load in case the user refreshes halfway down the page
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${scrolled
        ? 'translate-y-0 opacity-100 bg-[#F9F7F2]/90 backdrop-blur-md shadow-sm border-b border-[#1B3022]/5'
        // 🔴 HIDES THE NAVBAR COMPLETELY DURING THE VIDEO
        : '-translate-y-full opacity-0'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-white overflow-hidden border border-[#1B3022]/10 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/logo.png"
              alt="ArthaSakhi"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-serif text-lg font-semibold text-[#1B3022] tracking-tight">
            ArthaSakhi
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-[#1B3022]/70 hover:text-[#1B3022] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-[#1B3022] text-[#F9F7F2] text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#B66D4B] hover:shadow-lg"
          >
            Join Us
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[#1B3022] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1B3022] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#1B3022] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1B3022]/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-[#1B3022]/80 hover:text-[#1B3022] transition-colors py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 bg-[#1B3022] text-[#F9F7F2] text-sm font-medium rounded-full text-center"
              >
                Join Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── SECTION 1: HERO — SCROLL-SCRUBBING CANVAS (SMOOTH) ──────────────────────
function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas State
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // 🔴 IMPORTANT: Change this to match the last number in your folder!
  const FRAME_COUNT = 240;

  // 1. PRELOAD IMAGES
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(6, '0');

      // 🔴 This points exactly to your new folder and correct name format!
      img.src = `/hero-sequence/hero_${paddedIndex}_result.webp`;

      img.onload = () => {
        loadedCount++;
        // When all 240 images finish loading, reveal the canvas
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.drawImage(loadedImages[0], 0, 0, 1920, 1080);
          }
        }
      };

      img.onerror = () => {
        console.error(`Failed to load: ${img.src}`);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []); // <-- Make sure this final line is included!

  // 2. SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Keep your original spring settings for a smooth feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.0005,
  });

  // 3. DRAW TO CANVAS ON SCROLL
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    // Calculate current frame (e.g., 50% scroll * 120 frames = frame 60)
    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    frameIndex = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));

    const ctx = canvasRef.current.getContext('2d');
    if (ctx && images[frameIndex]) {
      // Clear the canvas and draw the new frame
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.drawImage(images[frameIndex], 0, 0, 1920, 1080);
    }
  });

  // 4. ANIMATE YOUR TEXT (Original Logic)
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const progressScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={wrapperRef}
      id="hero"
      style={{ height: '600vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* ── Fallback Gradient ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #F9F7F2 0%, #EDE8DF 50%, #e0d8cc 100%)',
          }}
        />

        {/* ── Dot-grid ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3022 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ── THE MAGIC CANVAS (Replaces the <video> tag) ── */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 2,
            opacity: imagesLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease', // Fades in beautifully when loaded
          }}
        />

        {/* ── Dark scrim ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.50) 100%)',
          }}
        />

        {/* ── Original Overlay Text ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          role="banner"
          style={{
            zIndex: 4,
            opacity: textOpacity,
            y: textY,
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
            <motion.span
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block px-5 py-2 rounded-full text-sm font-medium tracking-wide"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#F0C99A',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              A Community for Financial Awareness &amp; Investment Education
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-bold tracking-tight leading-none"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                color: '#FFFFFF',
                textShadow: '0 4px 32px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              ArthaSakhi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: 'rgba(255,255,255,0.85)',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                maxWidth: '640px',
                lineHeight: 1.65,
              }}
            >
              Empowering Women with Financial Knowledge.{' '}
              <br className="hidden sm:block" />
              Strengthening Families through Smart Investing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 items-center pt-2"
            >
              <a
                href="#about"
                className="group flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: '#1B3022',
                  color: '#F9F7F2',
                  boxShadow: '0 6px 28px rgba(0,0,0,0.4)',
                }}
              >
                Discover Our Community
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#founder"
                className="px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#FFFFFF',
                }}
              >
                Meet the Founder
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 5,
            opacity: indicatorOpacity,
          }}
        >
          <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)' }}
          />
        </motion.div>

        {/* ── Progress Bar ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            zIndex: 6,
            transformOrigin: 'left center',
            scaleX: progressScaleX,
            background: 'linear-gradient(90deg, #B66D4B, #F0C99A)',
          }}
        />
      </div>
    </div>
  );
}

// ─── SECTION 2: ABOUT THE COMMUNITY ──────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="pt-16 pb-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <FadeUp className="mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/8 text-[#B66D4B] text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            About the Community
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B3022] leading-[1.1] mb-10">
            About the{' '}
            <span className="text-[#B66D4B] italic">Community</span>
          </h2>
          <div className="space-y-5 text-lg text-[#1B3022]/75 leading-[1.85]">
            <p>
              ArthaSakhi is a grassroots financial awareness initiative founded with a simple yet powerful
              mission — to make financial knowledge accessible, practical, and empowering for women and
              families. For many years, this community operated through offline gatherings, awareness
              sessions, and discussions, where women from diverse backgrounds came together to learn about
              money, savings, investments, and financial security.
            </p>
            <p>
              What started as a small effort gradually grew into a vibrant community movement, attracting
              enthusiastic participation from women and families who wished to understand and manage their
              finances better. Through this initiative, the goal was never just about investment education
              — it was about building confidence with money, encouraging independent financial thinking,
              and creating financially aware families.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 3: OUR MISSION ──────────────────────────────────────────────────────

function Mission() {
  return (
    <section id="mission" className="py-32 bg-[#EDE8DF]/50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <FadeUp>
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/8 text-[#B66D4B] text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            Our Mission
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B3022] leading-[1.1] mb-10">
            Our{' '}
            <span className="text-[#B66D4B] italic">Mission</span>
          </h2>
          <div className="relative bg-white/60 backdrop-blur-sm border border-[#1B3022]/10 rounded-2xl p-10 shadow-sm overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-4 right-8 font-serif text-9xl text-[#B66D4B]/8 leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <p className="text-xl sm:text-2xl text-[#1B3022]/80 leading-relaxed font-serif italic relative z-10">
              To promote financial literacy, responsible investing, and long-term financial awareness,
              especially among women, so that families can make informed and confident financial decisions.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 4: WHAT WE FOCUSED ON ───────────────────────────────────────────────

const FOCUS_ITEMS = [
  {
    icon: '📋',
    title: 'Financial Planning',
    body: 'Understanding the importance of financial planning for a secure and stable future.',
  },
  {
    icon: '👩‍👧‍👦',
    title: 'Women & Family Finances',
    body: 'Encouraging women to take active interest in family finances and household decisions.',
  },
  {
    icon: '🏦',
    title: 'Savings & Investments',
    body: 'Basic awareness about savings and investments — building the foundation of financial health.',
  },
  {
    icon: '📈',
    title: 'Mutual Funds',
    body: 'Understanding mutual funds and long-term investing to grow wealth over time.',
  },
  {
    icon: '🎯',
    title: 'Goal-Based Investing',
    body: 'Importance of financial discipline and goal-based investing for meaningful outcomes.',
  },
  {
    icon: '💬',
    title: 'Financial Conversations',
    body: 'Creating a culture of financial discussions within families for collective empowerment.',
  },
];

function WhatWeFocusedOn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="focus" className="py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        <FadeUp className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/8 text-[#B66D4B] text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            What We Focused On
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3022] leading-[1.1] mb-5">
            What We{' '}
            <span className="text-[#B66D4B] italic">Focused On</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#1B3022]/70 leading-relaxed">
            The community sessions focused on practical financial knowledge such as:
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {FOCUS_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.09 }}
              className="group relative bg-white/50 backdrop-blur-sm border border-[#1B3022]/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_8px_40px_rgba(27,48,34,0.1)] transition-all duration-500 hover:-translate-y-1.5 cursor-default overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B66D4B]/0 to-[#B66D4B]/0 group-hover:from-[#B66D4B]/3 group-hover:to-[#F9F7F2]/0 transition-all duration-500 rounded-2xl pointer-events-none" />
              <div className="text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 w-fit">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B3022] mb-3 group-hover:text-[#B66D4B] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#1B3022]/65 leading-relaxed text-[0.95rem]">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-14 text-center">
          <p className="max-w-3xl mx-auto text-[#1B3022]/65 text-base leading-relaxed italic bg-[#EDE8DF]/50 rounded-2xl px-8 py-6 border border-[#1B3022]/5">
            The sessions were designed to be simple, interactive, and easy to understand, making financial
            concepts accessible to everyone.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 5: COMMUNITY IMPACT ─────────────────────────────────────────────────

const METRICS = [
  { headline: 'Fastest Growing', sub: 'Community' },
  { headline: '1500+', sub: 'Women Participating' },
  { headline: 'Across the', sub: 'Region' },
  { headline: '300+', sub: 'Families Reached' },
  { headline: 'Years of', sub: 'Impact' },
  { headline: '70+', sub: 'Sessions Conducted' },
];

function CommunityImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="impact" className="bg-[#2C3639] text-[#F9F7F2] py-32 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B66D4B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#4A5D3A]/15 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <FadeUp className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-[#F9F7F2]/10 text-[#F9F7F2]/80 text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            Community Impact
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F9F7F2] leading-[1.1] mb-6 max-w-3xl mx-auto">
            Community{' '}
            <span className="text-[#B66D4B] italic">Impact</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-[#F9F7F2]/65 leading-relaxed">
            Over the years, the initiative saw remarkable participation and engagement. Women who once felt
            hesitant discussing finances began confidently asking questions, understanding investments, and
            actively participating in financial decisions within their families.
          </p>
        </FadeUp>

        {/* Community created space */}
        <FadeUp delay={0.1} className="mb-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-[#F9F7F2]/80 text-base font-medium mb-5 text-center tracking-wide uppercase text-sm">
              The community created a space where:
            </p>
            <ul className="space-y-3">
              {[
                'Women felt comfortable discussing money',
                'Families became more financially aware',
                'Financial conversations became normal and empowering',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[#F9F7F2]/75 text-lg bg-white/5 border border-white/10 rounded-xl px-6 py-4"
                >
                  <span className="w-2 h-2 rounded-full bg-[#B66D4B] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.sub}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="text-center bg-white/5 border border-white/10 rounded-2xl px-6 py-8 hover:bg-white/10 transition-colors duration-300"
            >
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#B66D4B] mb-2 leading-none">
                {metric.headline}
              </p>
              <p className="text-[#F9F7F2]/65 font-medium text-sm">{metric.sub}</p>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-16 text-center">
          <p className="max-w-3xl mx-auto text-[#F9F7F2]/60 leading-relaxed italic">
            The response and participation from the community were overwhelmingly positive, turning this
            initiative into a meaningful movement for financial awareness.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 6: WHY FINANCIAL AWARENESS MATTERS ───────────────────────────────────

const AWARENESS_PILLARS = [
  { icon: '🛡️', title: 'Security', desc: 'Building a financial safety net that protects families in times of uncertainty.' },
  { icon: '💪', title: 'Independence', desc: 'Empowering women to make autonomous financial decisions with confidence.' },
  { icon: '🧠', title: 'Informed Decision-Making', desc: 'Moving beyond guesswork to clarity, backed by knowledge and understanding.' },
  { icon: '🏡', title: 'Stable Future', desc: 'Building a stable, prosperous future for families across generations.' },
];

function WhyItMatters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="why" className="py-32 bg-[#1B3022]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        <FadeUp className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/10 text-[#B66D4B] text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            The Bigger Picture
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3022] leading-[1.1] mb-6 max-w-3xl mx-auto">
            Why Financial Awareness{' '}
            <span className="text-[#B66D4B] italic">Matters</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#1B3022]/70 leading-relaxed">
            Financial awareness is not only about growing wealth. It is about:
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {AWARENESS_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group flex gap-5 bg-white/60 backdrop-blur-sm border border-[#1B3022]/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_8px_40px_rgba(27,48,34,0.1)] transition-all duration-400 hover:-translate-y-1"
            >
              <div className="text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 w-10">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B3022] mb-2">{pillar.title}</h3>
                <p className="text-[#1B3022]/65 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-16 text-center">
          <p className="max-w-2xl mx-auto text-xl font-serif italic text-[#1B3022]/80 leading-relaxed">
            When women understand finances, entire families become stronger and more confident about their
            future.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── SECTION 7: FOUNDER ──────────────────────────────────────────────────────────

function Founder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="founder" className="py-32 bg-[#EDE8DF]/40">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/8 text-[#B66D4B] text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
            About the Founder
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3022] leading-[1.1]">
            About the{' '}
            <span className="text-[#B66D4B] italic">Founder</span>
          </h2>
        </FadeUp>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Circular portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex flex-col items-center gap-5"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-[#B66D4B]/25 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-6 rounded-full border border-[#B66D4B]/10" />
              {/* Photo frame */}
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-[#1B3022]/10 relative">
                <Image
                  src="/images/founder.jpeg"
                  alt="Ms. Hema Poonia — Founder, ArthaSakhi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="font-serif text-lg font-bold text-[#1B3022]">Ms. Hema Poonia</p>
              <p className="text-sm text-[#B66D4B] font-medium">Founder, ArthaSakhi</p>
              <p className="text-xs text-[#1B3022]/50 mt-1">Wealth Management Consultant</p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="space-y-5 text-lg text-[#1B3022]/75 leading-[1.85]">
              <p>
                This community was founded and led by <strong className="text-[#1B3022] font-semibold">Ms HEMA POONIA</strong>, a
                Wealth Management Consultant and Social Impact Leader in the domain of financial literacy.
                With a strong belief that financial awareness can transform lives, she has spent years
                guiding women and families toward better understanding of money, investments, and long-term
                financial thinking.
              </p>
              <p>
                Her mission continues to focus on building financially empowered women and financially
                aware families.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 8: MESSAGES ─────────────────────────────────────────────────────────

function Messages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="messages" className="py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8" ref={ref}>
        <FadeUp className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#1B3022]/8 text-[#B66D4B] text-sm font-semibold rounded-full mb-4 tracking-wide uppercase">
            Words from the Heart
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3022] leading-[1.1]">
            Our <span className="text-[#B66D4B] italic">Messages</span>
          </h2>
        </FadeUp>

        <div className="space-y-8">
          {/* Block 1: Founder's Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-[#1B3022] rounded-2xl p-10 sm:p-14 overflow-hidden shadow-xl"
          >
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #F9F7F2 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Giant quote */}
            <div className="absolute top-4 right-8 font-serif text-[10rem] text-[#B66D4B]/10 leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-[#B66D4B]/15 text-[#D4926F] text-xs font-semibold rounded-full mb-8 tracking-widest uppercase">
                Founder&apos;s Message
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl text-[#F9F7F2]/90 leading-relaxed italic mb-8">
                &ldquo;Financial awareness is one of the most powerful forms of empowerment. When women understand
                money, they gain the confidence to make informed decisions, protect their families&apos; future,
                and build long-term financial stability. Through this initiative, my goal has always been
                simple — to make financial knowledge accessible, practical, and empowering for every woman
                and every family.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-6 border-t border-[#F9F7F2]/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B66D4B]/30">
                  <Image
                    src="/images/founder.jpeg"
                    alt="Ms. Hema Poonia"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-[#F9F7F2]">Ms. Hema Poonia</p>
                  <p className="text-sm text-[#B66D4B]">Founder, ArthaSakhi</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2: Our Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="relative bg-white/70 backdrop-blur-sm border border-[#1B3022]/10 rounded-2xl p-10 sm:p-14 overflow-hidden shadow-sm"
          >
            {/* Accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B66D4B] to-[#D4926F] rounded-l-2xl" />
            {/* Giant quote */}
            <div className="absolute top-4 right-8 font-serif text-[10rem] text-[#B66D4B]/6 leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <div className="relative z-10 pl-4">
              <span className="inline-block px-4 py-1.5 bg-[#B66D4B]/10 text-[#B66D4B] text-xs font-semibold rounded-full mb-8 tracking-widest uppercase">
                Our Philosophy
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl text-[#1B3022]/85 leading-relaxed italic mb-8">
                At Arth Sakhi, we believe that financial awareness is not about chasing noise, but about
                finding clarity. In a world full of overwhelming advice, our philosophy is simple — clarity
                over chaos, depth over desperation. Through education, honest conversations, and practical
                guidance, Arth Sakhi aims to make finance more empowering and less intimidating. Because
                when financial clarity grows, confidence and independence naturally follow.
              </blockquote>
              <div className="flex items-center gap-3 pt-6 border-t border-[#1B3022]/8">
                <div className="w-2 h-2 rounded-full bg-[#B66D4B]" />
                <p className="text-sm font-medium text-[#1B3022]/60">Arth Sakhi — Core Philosophy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9: FOOTER ───────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="bg-[#0F1D15] text-[#F9F7F2]/70">
      {/* Closing line — above footer */}
      <div className="bg-[#1B3022] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-xl sm:text-2xl text-[#F9F7F2]/85 leading-relaxed italic">
            ArthaSakhi continues to stand as a symbol of the belief that financial knowledge has the power
            to transform families and generations.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-px bg-[#B66D4B]/50" />
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden border border-white/10">
              <Image
                src="/images/logo.png"
                alt="ArthaSakhi"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif text-xl font-semibold text-[#F9F7F2]">ArthaSakhi</span>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['about', 'mission', 'impact', 'founder', 'messages'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm capitalize text-[#F9F7F2]/50 hover:text-[#B66D4B] transition-colors duration-300"
              >
                {id}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F9F7F2]/8">
          <p className="text-sm text-[#F9F7F2]/50 text-center leading-relaxed">
            Founded by Ms Hema Poonia | Wealth Management Consultant | Building Financially Empowered Women &amp; Families
          </p>
          <p className="mt-3 text-xs text-[#F9F7F2]/25 text-center">
            © {new Date().getFullYear()} ArthaSakhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────────

// ─── PAGE ────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      {/* 3D Rupee — fixed behind all content, scroll-reactive */}
      <ThreeRupee />
      <Navbar />
      <Hero />
      <About />
      <Mission />
      <WhatWeFocusedOn />
      <CommunityImpact />
      <WhyItMatters />
      <Founder />
      <Messages />
      <Footer />
    </main>
  );
}