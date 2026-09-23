import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Wrench,
  Sparkles,
  ArrowRight,
  Clock,
  Store,
  Phone,
  Mail,
  MapPin,
  Server,
  Zap,
  BadgeCheck
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import AboutSlider from '../components/about/AboutSlider.jsx';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Top Hero Slider */}
      <AboutSlider />

      {/* Story & Company Mission Section (Full-width, right-side monitor removed) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-xs space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Our Heritage & Mission</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            Delivering Enterprise-Grade Security & Hardware Since 2014
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <p>
            Founded with the vision to provide reliable, headache-free technology infrastructure, <strong>EXPERT IT SOLUTIONS</strong> has grown from a specialized networking consultancy into one of Dhaka&apos;s most trusted turnkey system integrators and electronics showrooms. We operate on the foundational belief that business operations should never stall because of poor network cabling or sub-par computing equipment.
          </p>
          <p>
            Whether wiring a 5-story manufacturing plant with optical fiber backbones and industrial IP cameras, or helping an individual professional pick the perfect borderless IPS monitor and mechanical keyboard, our commitment remains the same: 100% genuine components, clean cable craftsmanship, and responsive after-sales support with official distributor warranties.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Certified Engineers</p>
              <p className="text-slate-500 mt-0.5">In-house certified systems & network engineers on call.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Authorized Warranty</p>
              <p className="text-slate-500 mt-0.5">Direct manufacturer & distributor RMA replacements.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Physical Showroom & Lab</p>
              <p className="text-slate-500 mt-0.5">Sheltech Sierra Computer City, Elephant Rd & Banani, Dhaka.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Rapid On-Site Support</p>
              <p className="text-slate-500 mt-0.5">Quick diagnostics, maintenance SLAs, and troubleshooting.</p>
            </div>
          </div>
        </div>

        {/* Key Metrics / Credibility Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="text-center p-3">
            <span className="block text-2xl sm:text-3xl font-black text-blue-600">10+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Years Active</span>
          </div>
          <div className="text-center p-3">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-600">5,000+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects Completed</span>
          </div>
          <div className="text-center p-3">
            <span className="block text-2xl sm:text-3xl font-black text-purple-600">100%</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Genuine Hardware</span>
          </div>
          <div className="text-center p-3">
            <span className="block text-2xl sm:text-3xl font-black text-amber-600">24/7</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Technical SLA Support</span>
          </div>
        </div>
      </div>

      {/* Founder & Executive Leadership Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Company Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Founder & Executive Leadership
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Under the visionary leadership of our Founder & CEO, EXPERT IT SOLUTIONS provides reliable infrastructure, authentic computing hardware, and client-first technical partnership across Bangladesh.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 border-2 border-blue-400/50 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shrink-0">
              RR
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wide mb-1 border border-blue-400/20">
                Founder & CEO
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Md. Raihan Reza</h3>
              <p className="text-xs sm:text-sm text-blue-400 font-semibold">Founder & Chief Executive Officer</p>
              <p className="text-[11px] text-slate-400 mt-0.5">EXPERT IT SOLUTIONS</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                <a href="tel:+8801762596986" className="text-white hover:text-blue-400 font-mono font-bold transition-colors">
                  +8801762596986
                </a>
                <span className="text-slate-500">/</span>
                <a href="tel:+8809644217151" className="text-white hover:text-blue-400 font-mono font-bold transition-colors">
                  +8809644217151
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href="mailto:reza@expertitsolutionsbd.com" className="text-white hover:text-blue-400 font-mono font-bold transition-colors">
                reza@expertitsolutionsbd.com
              </a>
            </div>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">Registered Address</span>
                  <span className="text-slate-300 leading-relaxed block">
                    16, Tower Hamlet, Level-07, Kemal Ataturk Avenue, Banani, Dhaka-1213
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">Corporate Address</span>
                  <span className="text-slate-300 leading-relaxed block">
                    Shop #307, Level #03, Sheltech Sierra Computer City, New Elephant Road, Dhaka 1205
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pillars of Excellence</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Drives Our Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">100% Genuine Authenticity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never deal in counterfeit, refurbished, or grey-market parts. Every CCTV camera, switch, RAM module, and hard drive is backed by manufacturer guarantees.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Engineering Rigor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Neat conduit piping, structured patch panel labeling, power redundancy, and load balancing. We take pride in clean hardware installations that stand the test of time.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Client-First Partnership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our relationship doesn’t end when the invoice is settled. We provide continuous maintenance agreements, SLA support, and emergency on-call technical dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black">Ready to Upgrade Your IT Systems?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Schedule an on-site survey or visit our showroom in Dhaka to test the latest hardware in person.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Contact Our Team
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            Visit Showroom Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
