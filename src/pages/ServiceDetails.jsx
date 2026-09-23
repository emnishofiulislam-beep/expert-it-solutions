import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Send,
  X,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '../data/services.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ServiceDetails() {
  const { slug } = useParams();
  const { success } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Request Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    requirements: '',
    preferredDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = SERVICES.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          title="Service Not Found"
          description="The service you are looking for does not exist or may have been updated."
          actionText="View All Services"
          actionLink="/services"
        />
      </div>
    );
  }

  const relatedServicesList = SERVICES.filter(
    (s) => service.relatedServices?.includes(s.slug) || (s.id !== service.id && s.category === service.category)
  ).slice(0, 2);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        requirements: '',
        preferredDate: ''
      });
      success(`Thank you! Your request for "${service.title}" has been received. Our technical team will call you within 2 business hours.`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Services', to: '/services' },
          { label: service.title }
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-md">
              {service.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request This Service</span>
              </button>

              <a
                href="tel:+8801762596986"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Call Hotline: +8801762596986</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-4 shadow-2xl">
              <img
                src={service.image || '/placeholder.jpg'}
                alt={service.title}
                className="w-full h-56 sm:h-72 object-contain rounded-xl bg-slate-900 p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overview & Key Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Detailed Description */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Service Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDescription}
            </p>
          </section>

          {/* Key Deliverables & Features */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Key Features & Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Business Benefits */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Business & Operational Benefits</h2>
            <div className="space-y-3">
              {service.benefits?.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4-Step Process */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Our Service Execution Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.processSteps?.map((p) => (
                <div key={p.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative">
                  <span className="text-2xl font-black text-blue-600 block">{p.step}</span>
                  <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Why Choose Us & Quick Request Form */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Box */}
          <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black leading-snug">Need a Custom Quotation for Your Facility?</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              We offer free preliminary consultation and on-site inspection for corporate offices, factories, and showrooms in Dhaka.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
            >
              Request This Service Now
            </button>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Why Choose EXPERT IT?
            </h3>
            <ul className="space-y-3 text-xs text-slate-600">
              {service.whyChooseUs?.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Services */}
          {relatedServicesList.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Related Services
              </h3>
              <div className="space-y-3">
                {relatedServicesList.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/services/${rel.slug}`}
                    className="block p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 flex items-center justify-between">
                      <span>{rel.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5" />
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{rel.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* REQUEST SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Direct Inquiry
              </span>
              <h3 className="text-xl font-bold text-slate-900">Request: {service.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your details below and our technical supervisor will contact you with a customized estimate.
              </p>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Engr. Tanvir Ahmed"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 17XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Site / Office Location (City & Area) *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Uttara Sector 4, Dhaka or Gazipur Industrial Zone"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Details & Requirements *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Briefly describe your space, number of cameras/nodes/points needed, or specific brands..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Survey Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Submit Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
