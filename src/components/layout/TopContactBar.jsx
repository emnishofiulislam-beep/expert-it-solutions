import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function TopContactBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <a
              href="tel:+8801762596986"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              title="Call Primary Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-medium">+8801762596986</span>
            </a>
            <span className="text-slate-600">/</span>
            <a
              href="tel:+8809644217151"
              className="hover:text-blue-400 transition-colors font-medium"
              title="Call Office Hotline"
            >
              +8809644217151
            </a>
          </div>

          <a
            href="mailto:reza@expertitsolutionsbd.com"
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            title="Email EXPERT IT SOLUTIONS"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>reza@expertitsolutionsbd.com</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span title="Banani (Registered) & Elephant Road (Corporate), Dhaka">Banani & Elephant Road, Dhaka</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <div className="hidden lg:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sat - Thu: 9:00 AM - 8:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showroom & On-Site Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
