import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Wrench,
  Server,
  Camera,
  Monitor,
  PhoneCall,
  Pause,
  Play
} from 'lucide-react';

const ABOUT_SLIDES = [
  {
    id: 'slide-heritage',
    badge: 'Established 2014 • Dhaka, Bangladesh',
    title: 'A Decade of Enterprise IT & Engineering Trust',
    subtitle: 'From a specialized networking consultancy in Dhaka to one of Bangladesh’s premier turnkey system integrators and retail computer showrooms.',
    highlights: ['10+ Years in Bangladesh', '5,000+ Completed Deployments', '100% Genuine Components'],
    image: '/images/banners/banner_tplink_c6.jpg',
    fallbackImage: '/placeholder.jpg',
    imageAlt: 'EXPERT IT SOLUTIONS Network Infrastructure',
    ctaText: 'Discover Our Services',
    ctaLink: '/services',
    secondaryCtaText: 'Contact Team',
    secondaryCtaLink: '/contact',
    align: 'left',
    icon: Building2,
    theme: {
      accentColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-700',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  },
  {
    id: 'slide-cctv',
    badge: 'Commercial Security & Surveillance',
    title: 'Enterprise-Grade CCTV & IP Surveillance Solutions',
    subtitle: 'High-definition 24/7 video monitoring, smart AI detection, remote mobile access, and turnkey cabling for corporate offices, factories, and retail outlets.',
    highlights: ['Authorized Hikvision Partner', 'Full HD to 4K Recording', 'On-Site Maintenance SLAs'],
    image: '/images/banners/banner_hikvision_cam.jpg',
    fallbackImage: '/images/products/hikvision_cctv_camera_1788949682215.jpg',
    imageAlt: 'Hikvision CCTV Surveillance Setup',
    ctaText: 'View Security Systems',
    ctaLink: '/services/security-systems',
    secondaryCtaText: 'Request Site Survey',
    secondaryCtaLink: '/contact',
    align: 'left',
    icon: Camera,
    theme: {
      accentColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    }
  },
  {
    id: 'slide-hardware',
    badge: 'Authorized Retail & Distribution',
    title: 'Authentic Computing Hardware & Peripherals',
    subtitle: 'We supply 100% genuine monitors, SSDs, RAM modules, routers, and computer peripherals with direct official distributor warranties and instant replacements.',
    highlights: ['Zero Counterfeit Tolerance', 'Official Manufacturer Warranty', 'Walk-in Dhaka Showroom'],
    image: '/images/banners/banner_hp_m22f.jpg',
    fallbackImage: '/images/products/hp_monitor_placeholder_1788945252910.jpg',
    imageAlt: 'Authentic Hardware and Displays',
    ctaText: 'Visit Hardware Shop',
    ctaLink: '/shop',
    secondaryCtaText: 'Browse Categories',
    secondaryCtaLink: '/categories',
    align: 'left',
    icon: Monitor,
    theme: {
      accentColor: 'text-cyan-700',
      badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-800',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700 text-white'
    }
  },
  {
    id: 'slide-lab',
    badge: 'Engineering Rigor & In-House Lab',
    title: 'Custom PC Assembly & Professional Hardware Lab',
    subtitle: 'Equipped with precision testing benches, thermal optimization tools, and certified hardware engineers who build reliable workstations and gaming systems.',
    highlights: ['Certified In-House Engineers', 'Thermal & Stress Benchmarking', 'Rapid Diagnostic Support'],
    image: '/images/banners/banner_antec_nx292.jpg',
    fallbackImage: '/images/products/antec_pc_casing_1788949708213.jpg',
    imageAlt: 'Custom Hardware Integration Lab',
    ctaText: 'Consult Our Engineers',
    ctaLink: '/contact',
    secondaryCtaText: 'Browse PC Components',
    secondaryCtaLink: '/shop?category=casing',
    align: 'left',
    icon: Wrench,
    theme: {
      accentColor: 'text-amber-700',
      badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white'
    }
  }
];

export default function AboutSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const slideCount = ABOUT_SLIDES.length;

  const goToSlide = useCallback(
    (index, newDirection = 1) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        if (index >= slideCount) return 0;
        if (index < 0) return slideCount - 1;
        return index;
      });
    },
    [slideCount]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1, 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1, -1);
  }, [currentIndex, goToSlide]);

  // Auto-slide effect (6 seconds)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const currentSlide = ABOUT_SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const SlideIcon = currentSlide.icon;

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Banner Wrapper - Light White Canvas */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Full-size Image */}
            <img
              src={currentSlide.image}
              onError={(e) => {
                if (currentSlide.fallbackImage && e.currentTarget.src !== currentSlide.fallbackImage) {
                  e.currentTarget.src = currentSlide.fallbackImage;
                }
              }}
              alt={currentSlide.imageAlt}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            />

            {/* Bright Multi-layer Gradient Overlay for a clean, light, white aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 sm:via-white/85 to-white/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

            {/* Top Indicator Badge */}
            <div className="absolute top-4 sm:top-6 right-6 sm:right-8 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-slate-700 text-xs shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">{currentSlide.badge}</span>
            </div>

            {/* Slide Content Box */}
            <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 py-8 sm:py-12">
              <div className="max-w-2xl space-y-4">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${currentSlide.theme.badgeBg}`}
                >
                  <SlideIcon className="w-3.5 h-3.5" />
                  <span>{currentSlide.badge}</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900"
                >
                  {currentSlide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl"
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* Bullet Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1"
                >
                  {currentSlide.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/90 text-[11px] sm:text-xs text-slate-700 shadow-xs backdrop-blur-xs font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.35 }}
                  className="flex flex-wrap items-center gap-3 pt-3"
                >
                  <Link
                    to={currentSlide.ctaLink}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${currentSlide.theme.buttonBg}`}
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={currentSlide.secondaryCtaLink}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs backdrop-blur-md transition-all active:scale-95"
                  >
                    <span>{currentSlide.secondaryCtaText}</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left Navigation Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-12 sm:h-14 bg-white/95 hover:bg-white text-orange-500 hover:text-orange-600 border border-slate-200 rounded-xl shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Navigation Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-12 sm:h-14 bg-white/95 hover:bg-white text-orange-500 hover:text-orange-600 border border-slate-200 rounded-xl shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        {/* Bottom Pagination Dots & Play/Pause */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-md">
          {ABOUT_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-7 bg-orange-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}

          <div className="w-px h-3 bg-slate-200 mx-1"></div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-slate-600 hover:text-slate-900 transition-colors"
            title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-500" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
