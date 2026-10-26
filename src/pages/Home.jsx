import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Cpu,
  Clock,
  Wrench,
  Award,
  ArrowRight,
  Sparkles,
  Store,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Headphones,
  FileCheck,
  Building2,
  Users
} from 'lucide-react';
import { SERVICES } from '../data/services.js';
import { useProducts } from '../context/ProductContext.jsx';
import ServiceCard from '../components/services/ServiceCard.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import HeroSlider from '../components/home/HeroSlider.jsx';

export default function Home() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products.filter((p) => p.featured).slice(0, 8)
      : products.filter((p) => {
        if (selectedCategory === 'ssd') {
          return p.category.toLowerCase().includes('ssd') || p.category.toLowerCase().includes('hdd');
        }
        if (selectedCategory === 'casing' || selectedCategory === 'pc-casing') {
          return p.category.toLowerCase().includes('casing');
        }
        return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SLIDER BANNER */}
      <HeroSlider />

      {/* 2. CORE ADVANTAGES / TRUST CARDS (6 Points) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Core Strengths & Commitments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Experience peace of mind with authentic hardware, verified warranties, and dedicated tech support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              icon: Wrench,
              title: 'Professional Service',
              tag: 'Certified Engineering',
              desc: 'Turnkey network installation, server deployments, structured cabling, and precision component-level repair.',
              accent: 'border-blue-200/70 hover:border-blue-400 group-hover:bg-blue-50/50',
              iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
              badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/60',
              glow: 'from-blue-500/10'
            },
            {
              icon: Award,
              title: 'Quality Products',
              tag: 'Tested & Verified',
              desc: 'High-durability computer parts, enterprise storage, and peripherals thoroughly benchmarked for maximum stability.',
              accent: 'border-emerald-200/70 hover:border-emerald-400 group-hover:bg-emerald-50/50',
              iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
              badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
              glow: 'from-emerald-500/10'
            },
            {
              icon: Users,
              title: 'Expert Tech Team',
              tag: 'Skilled Specialists',
              desc: 'Qualified IT professionals offering fast diagnostics, custom PC architecture advisory, and corporate support.',
              accent: 'border-indigo-200/70 hover:border-indigo-400 group-hover:bg-indigo-50/50',
              iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
              badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
              glow: 'from-indigo-500/10'
            },
            {
              icon: Clock,
              title: 'Fast Support',
              tag: 'Quick Response',
              desc: 'Prompt customer helpline, rapid turnaround troubleshooting, and on-demand emergency technical assistance.',
              accent: 'border-amber-200/70 hover:border-amber-400 group-hover:bg-amber-50/50',
              iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
              badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/60',
              glow: 'from-amber-500/10'
            },
            {
              icon: ShieldCheck,
              title: 'Genuine Products',
              tag: 'Official Warranty',
              desc: '100% genuine products sourced directly from authorized brand distributors with valid replacement warranty.',
              accent: 'border-purple-200/70 hover:border-purple-400 group-hover:bg-purple-50/50',
              iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
              badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/60',
              glow: 'from-purple-500/10'
            },
            {
              icon: Building2,
              title: 'Physical Showroom',
              tag: 'Visit & Test in Dhaka',
              desc: 'Drop by our Dhaka showroom to physically experience products, test configurations, and pick up orders in person.',
              accent: 'border-rose-200/70 hover:border-rose-400 group-hover:bg-rose-50/50',
              iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
              badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/60',
              glow: 'from-rose-500/10'
            }
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: 'easeOut' }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative bg-white rounded-2xl p-6 border ${card.accent} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default`}
              >
                {/* Subtle decorative background gradient on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.glow} to-transparent rounded-bl-full opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl border ${card.iconBg} flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Guaranteed Quality
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 group-hover:text-slate-400">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. SERVICES SECTION (All 9 services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <span>Enterprise & Home IT Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Our Professional IT Services
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Turnkey system design, hardware installation, cabling infrastructure, and on-site servicing for business and residential clients.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-5 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <span>View All 9 Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. SHOWROOM & FEATURED PRODUCTS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
                <Store className="w-4 h-4" />
                <span>Showroom Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Featured IT Products & Hardware
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Browse CCTV units, borderless IPS monitors, routers, storage SSDs, PC casing and genuine accessories available online and in our showroom.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <span>Explore Full Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'cctv', label: 'CCTV Cameras' },
              { id: 'casing', label: 'PC Casing' },
              { id: 'ssd', label: 'SSD & HDD' },
              { id: 'ram', label: 'RAM Memory' },
              { id: 'keyboard', label: 'Keyboards' },
              { id: 'mouse', label: 'Mice' },
              { id: 'monitor', label: 'Monitors' },
              { id: 'router', label: 'Routers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product._id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DUAL CALL-TO-ACTION (CTA) BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CTA 1: IT Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-700/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-bold tracking-wider text-blue-400 uppercase bg-blue-500/20 px-3 py-1 rounded-md">
                Corporate IT & Security
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Need Professional IT Solutions?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Looking for corporate CCTV cabling, server rack setup, biometric access control, or enterprise network routing? Talk to our technical team today for a customized site inspection and blueprint.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-blue-500/30 transition-all group-hover:scale-102"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Our Technical Team</span>
              </Link>
            </div>
          </motion.div>

          {/* CTA 2: Showroom IT Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-700/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-bold tracking-wider text-amber-400 uppercase bg-amber-500/20 px-3 py-1 rounded-md">
                Physical Showroom & Retail
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Looking for IT Products?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Explore our showroom collection of genuine computer components, monitors, keyboards, routers, and CCTV accessories. Order online for fast courier delivery across Bangladesh or pick up in-store.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black shadow-md hover:shadow-amber-500/30 transition-all group-hover:scale-102"
              >
                <Store className="w-4 h-4" />
                <span>Explore Showroom Collection</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. WHY CHOOSE EXPERT IT SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <ShieldCheck className="w-4 h-4" />
                <span>The EXPERT IT Advantage</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Why Businesses Trust <br className="hidden sm:block" />
                EXPERT IT SOLUTIONS
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need a single replacement monitor or a 200-camera multi-branch industrial IP surveillance system with optical fiber cabling, we combine engineering rigor with reliable showroom inventory.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Certified In-House Engineering Staff</h4>
                    <p className="text-xs text-slate-500 mt-0.5">We don’t outsource. Our certified network, electrical, and hardware technicians execute every job with clean cable dressing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Physical Presence & Real Showroom in Dhaka</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Never worry about disappearing online sellers. Visit our physical showroom anytime for warranty support and live hardware testing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Transparent Pricing & Official Warranty</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Every quotation includes itemized hardware specs, brand authenticity seals, and guaranteed replacement warranty periods.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stat Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '100%', title: 'Genuine Hardware', desc: 'Official manufacturer seals', color: 'text-blue-600' },
                { stat: '9', title: 'Dedicated Services', desc: 'From CCTV to custom web apps', color: 'text-emerald-600' },
                { stat: '2,000+', title: 'Satisfied Clients', desc: 'Offices, factories & homes', color: 'text-indigo-600' },
                { stat: '24/7', title: 'Emergency Support', desc: 'On-call technical response', color: 'text-amber-600' }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-center cursor-default"
                >
                  <p className={`text-3xl sm:text-4xl font-black ${card.color} mb-1`}>{card.stat}</p>
                  <p className="text-xs font-bold text-slate-800">{card.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
