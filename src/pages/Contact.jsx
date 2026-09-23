import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

export default function Contact() {
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeLocation, setActiveLocation] = useState('corporate');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      error('Please fill in your name, contact phone, and message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      success('Thank you! Your message has been sent to our Dhaka support team. We will call you back shortly.');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Contact Us & Showroom' }]} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-md inline-block">
            Direct Technical Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Get in Touch with EXPERT IT SOLUTIONS
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Need an on-site corporate survey, CCTV cabling quotation, server rack configuration, or showroom product inquiries? Reach out to our engineers today.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Official Registration</span>
          <h3 className="font-bold text-base text-slate-900 -mt-1">Registered Address</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            16, Tower Hamlet, Level-07,<br />
            Kemal Ataturk Avenue, Banani,<br />
            Dhaka-1213, Bangladesh
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Operational Hub & Showroom</span>
          <h3 className="font-bold text-base text-slate-900 -mt-1">Corporate Address</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Shop #307, Level #03,<br />
            Sheltech Sierra Computer City,<br />
            New Elephant Road, Dhaka 1205
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Voice & WhatsApp</span>
          <h3 className="font-bold text-base text-slate-900 -mt-1">Phone Hotlines</h3>
          <div className="text-xs text-slate-600 space-y-1 font-mono">
            <p>
              <a href="tel:+8801762596986" className="text-slate-900 hover:text-blue-600 font-bold transition-colors block">
                +8801762596986
              </a>
            </p>
            <p>
              <a href="tel:+8809644217151" className="text-slate-900 hover:text-blue-600 font-bold transition-colors block">
                +8809644217151
              </a>
            </p>
            <span className="text-[11px] text-slate-400 font-sans block">Direct Corporate & Support Lines</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">Executive Communication</span>
          <h3 className="font-bold text-base text-slate-900 -mt-1">Email & Management</h3>
          <div className="text-xs text-slate-600 space-y-1">
            <a
              href="mailto:reza@expertitsolutionsbd.com"
              className="font-mono text-slate-900 hover:text-blue-600 font-bold transition-colors block break-all"
            >
              reza@expertitsolutionsbd.com
            </a>
            <div className="pt-1 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-800">Md. Raihan Reza</span> — Founder & CEO
            </div>
          </div>
        </div>
      </div>

      {/* Form + Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Send Us an Inquiry or Message</h2>
            <p className="text-xs text-slate-500 mt-1">
              Provide details regarding your requirements and we will provide an itemized quote.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asif Mahmud"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 17XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Service / Purpose *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="CCTV Installation Quotation">CCTV Installation Quotation</option>
                  <option value="Enterprise Networking & Fiber">Enterprise Networking & Fiber</option>
                  <option value="PABX / Intercom Setup">PABX / Intercom Setup</option>
                  <option value="Biometric Access Control">Biometric Access Control</option>
                  <option value="Hardware / Showroom Purchase">Hardware / Showroom Purchase</option>
                  <option value="Web & Software Development">Web & Software Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Message or Requirements *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about the site location, number of floors/nodes, or equipment specifications you need..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Map & Showroom Visit Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Our Office & Showroom Locations</span>
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We welcome corporate clients, contractors, and retail buyers to inspect hardware, test cameras, and consult with our certified engineers.
            </p>

            {/* Interactive location tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveLocation('corporate')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeLocation === 'corporate'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Corporate Office
              </button>
              <button
                type="button"
                onClick={() => setActiveLocation('registered')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  activeLocation === 'registered'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Registered Office
              </button>
            </div>

            {/* Map Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 bg-slate-100 flex items-center justify-center">
              <iframe
                key={activeLocation}
                title={
                  activeLocation === 'corporate'
                    ? 'EXPERT IT SOLUTIONS - Sheltech Sierra Computer City, New Elephant Road, Dhaka 1205'
                    : 'EXPERT IT SOLUTIONS - 16, Tower Hamlet, Level-07, Kemal Ataturk Avenue, Banani, Dhaka-1213'
                }
                src={
                  activeLocation === 'corporate'
                    ? 'https://maps.google.com/maps?q=Sheltech+Sierra+Computer+City+New+Elephant+Road+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed'
                    : 'https://maps.google.com/maps?q=16+Tower+Hamlet+Kemal+Ataturk+Avenue+Banani+Dhaka+1213&t=&z=16&ie=UTF8&iwloc=&output=embed'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-3">
              <div className={`p-3.5 rounded-xl text-xs transition-all border ${
                activeLocation === 'registered'
                  ? 'bg-blue-50/70 border-blue-200'
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Registered Address:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium pl-5 mt-1">
                  16, Tower Hamlet, Level-07, Kemal Ataturk Avenue, Banani, Dhaka-1213
                </p>
              </div>

              <div className={`p-3.5 rounded-xl text-xs transition-all border ${
                activeLocation === 'corporate'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Corporate Address:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium pl-5 mt-1">
                  Shop #307, Level #03, Sheltech Sierra Computer City, New Elephant Road, Dhaka 1205
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
