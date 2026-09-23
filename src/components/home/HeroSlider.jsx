import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Wrench,
  ShieldCheck,
  Pause,
  Play,
  Monitor,
  Laptop,
  Camera,
  Cpu
} from 'lucide-react';

const BANNER_SLIDES = [
  {
    id: 'hp-m22f',
    productId: 'prod-001',
    eyebrow: '21.5" FHD IPS • 75Hz FreeSync • 99% sRGB',
    title: 'HP M22f Borderless Monitor',
    subtitle: 'Ultra-slim profile with anti-glare micro-edge display & 3 Years Official HP Warranty.',
    priceText: '৳12,200',
    oldPriceText: '৳13,500',
    badge: '3 Years Official HP Warranty',
    brandTag: 'HP Official Distributor',
    image: '/images/banners/banner_hp_m22f.jpg',
    fallbackImage: '/images/products/hp_monitor_placeholder_1788945252910.jpg',
    imageAlt: 'HP M22f 21.5-inch FHD IPS Borderless Monitor',
    link: '/products/hp-m22f-21-5-fhd-ips-borderless-monitor',
    ctaText: 'View HP Monitor',
    align: 'left',
    theme: {
      accentColor: 'text-slate-950',
      highlightColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    icon: Monitor
  },
  {
    id: 'tplink-c6',
    productId: 'prod-003',
    eyebrow: 'AC1200 Dual-Band Gigabit • MU-MIMO • 4 Antennas',
    title: 'TP-Link Archer C6 Router',
    subtitle: 'High-speed dual-band gigabit Wi-Fi for buffer-free streaming and lag-free corporate networking.',
    priceText: '৳3,250',
    oldPriceText: '৳3,650',
    badge: '1 Year Official Warranty',
    brandTag: 'TP-Link Genuine Stock',
    image: '/images/banners/banner_tplink_c6.jpg',
    fallbackImage: '/placeholder.jpg',
    imageAlt: 'TP-Link Archer C6 AC1200 Gigabit Router',
    link: '/products/tp-link-archer-c6-ac1200-gigabit-router',
    ctaText: 'View Router Details',
    align: 'right',
    theme: {
      accentColor: 'text-slate-900',
      highlightColor: 'text-teal-600',
      badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
      buttonBg: 'bg-teal-600 hover:bg-teal-700 text-white'
    },
    icon: Laptop
  },
  {
    id: 'hikvision-bullet',
    productId: 'prod-002',
    eyebrow: '1080p Full HD • 20m Smart IR • IP67 Weatherproof',
    title: 'Hikvision 2MP HD Bullet CCTV',
    subtitle: 'Heavy-duty surveillance camera for outdoor commercial security with 24/7 crystal-clear recording.',
    priceText: '৳1,599',
    oldPriceText: '৳1,850',
    badge: '1 Year Replacement Warranty',
    brandTag: 'Authorized Hikvision Partner',
    image: '/images/banners/banner_hikvision_cam.jpg',
    fallbackImage: '/images/products/hikvision_cctv_camera_1788949682215.jpg',
    imageAlt: 'Hikvision DS-2CE16D0T-IRPF 2MP HD Bullet CCTV Camera',
    link: '/products/hikvision-ds-2ce16d0t-irpf-2mp-hd-bullet-cctv',
    ctaText: 'View CCTV Camera',
    align: 'left',
    theme: {
      accentColor: 'text-slate-900',
      highlightColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    icon: Camera
  },
  {
    id: 'antec-nx292',
    productId: 'prod-012',
    eyebrow: '4 Pre-installed RGB Fans • Tempered Glass • Mesh Front',
    title: 'Antec NX292 RGB Gaming Casing',
    subtitle: 'High airflow gaming mid-tower casing supporting liquid cooling radiators and full ATX builds.',
    priceText: '৳3,850',
    oldPriceText: '৳4,300',
    badge: '100% Brand New Boxed',
    brandTag: 'Antec Gaming Line',
    image: '/images/banners/banner_antec_nx292.jpg',
    fallbackImage: '/images/products/antec_pc_casing_1788949708213.jpg',
    imageAlt: 'Antec NX292 Mid-Tower RGB Gaming PC Casing',
    link: '/products/antec-nx292-rgb-mid-tower-casing',
    ctaText: 'View Gaming Casing',
    align: 'right',
    theme: {
      accentColor: 'text-slate-900',
      highlightColor: 'text-purple-600',
      badgeBg: 'bg-purple-50 border-purple-200 text-purple-800',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    icon: Cpu
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const slideCount = BANNER_SLIDES.length;

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

  // Auto-slide effect (5.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const currentSlide = BANNER_SLIDES[currentIndex];

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

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Banner Wrapper */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100 min-h-[340px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] flex items-center group">
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
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Gradient Overlay for crystal clear typography legibility */}
            <div
              className={`absolute inset-0 ${
                currentSlide.align === 'left'
                  ? 'bg-gradient-to-r from-white/95 via-white/80 sm:via-white/70 to-transparent'
                  : 'bg-gradient-to-l from-white/95 via-white/80 sm:via-white/70 to-transparent'
              }`}
            />

            {/* Brand Logo / Tag in top corner */}
            <div className="absolute top-4 sm:top-6 right-6 sm:right-10 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs">
              <span className="text-xs font-black tracking-tight text-slate-800">
                {currentSlide.brandTag}
              </span>
            </div>

            {/* Slide Content Box */}
            <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-20 py-8">
              <div
                className={`max-w-xl ${
                  currentSlide.align === 'right' ? 'ml-auto text-left sm:text-right' : 'mr-auto text-left'
                } text-slate-900`}
              >
                {/* Eyebrow / Specs Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide uppercase mb-2 sm:mb-3 text-blue-600"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSlide.eyebrow}</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 text-slate-900"
                >
                  {currentSlide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className={`text-xs sm:text-base font-medium mb-3 sm:mb-4 max-w-md ${
                    currentSlide.align === 'right' ? 'sm:ml-auto' : ''
                  } text-slate-600`}
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* Real Price Display */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  className={`flex items-baseline gap-2.5 mb-4 sm:mb-6 ${
                    currentSlide.align === 'right' ? 'sm:justify-end' : 'justify-start'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {currentSlide.priceText}
                  </span>
                  {currentSlide.oldPriceText && (
                    <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">
                      {currentSlide.oldPriceText}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    In Stock
                  </span>
                </motion.div>

                {/* CTA Buttons and Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.35 }}
                  className={`flex flex-wrap items-center gap-3 ${
                    currentSlide.align === 'right' ? 'sm:justify-end' : 'justify-start'
                  }`}
                >
                  <Link
                    to={currentSlide.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 ${currentSlide.theme.buttonBg}`}
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div
                    className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold backdrop-blur-md ${currentSlide.theme.badgeBg}`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{currentSlide.badge}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 1. Left Navigation Arrow Button (Styled after user's uploaded image with orange arrow) */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-12 sm:h-14 bg-white/95 hover:bg-white text-orange-500 hover:text-orange-600 border border-slate-200/90 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>

        {/* 2. Right Navigation Arrow Button (Styled after user's uploaded image with orange arrow) */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-9 sm:w-11 h-12 sm:h-14 bg-white/95 hover:bg-white text-orange-500 hover:text-orange-600 border border-slate-200/90 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group/btn"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        {/* Bottom Pagination Dots & Play/Pause */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
          {BANNER_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-7 bg-orange-500' : 'w-2 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}

          <div className="w-px h-3 bg-white/20 mx-1"></div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-white/80 hover:text-white transition-colors"
            title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
