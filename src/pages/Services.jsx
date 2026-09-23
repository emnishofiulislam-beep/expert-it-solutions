import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/services.js';
import ServiceCard from '../components/services/ServiceCard.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Security Systems', label: 'Security & Surveillance' },
    { id: 'Infrastructure', label: 'Infrastructure & Cabling' },
    { id: 'Telecommunications', label: 'Telecommunications' },
    { id: 'Audio & Acoustics', label: 'Sound & PA Systems' },
    { id: 'Cooling & Environment', label: 'AC & Cooling' },
    { id: 'Software Solutions', label: 'Web & Software' },
    { id: 'Hardware Solutions', label: 'Computer & Printers' }
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Our IT Services' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Engineering Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Comprehensive IT Solutions for Commercial & Residential Clients
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From industrial CCTV installations and enterprise structured cabling to biometric door access and modern web applications, EXPERT IT SOLUTIONS delivers professional, certified technical execution across Bangladesh.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>

      {/* Bottom Consultation CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Have a Custom IT Project or Multi-Branch Requirement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Our certified systems engineers are available for physical site surveys, architecture design, and corporate tender proposals.
          </p>
        </div>

        <Link
          to="/contact"
          className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Request Site Survey</span>
        </Link>
      </div>
    </div>
  );
}
