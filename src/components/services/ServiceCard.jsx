import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Camera,
  Network,
  PhoneCall,
  Fingerprint,
  Volume2,
  Wind,
  Code,
  Printer,
  Monitor,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Camera,
  Network,
  PhoneCall,
  Fingerprint,
  Volume2,
  Wind,
  Code,
  Printer,
  Monitor
};

export default function ServiceCard({ service, index = 0 }) {
  if (!service) return null;

  const IconComponent = ICON_MAP[service.icon] || Network;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/70 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <Link
        to={`/services/${service.slug}`}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        {/* Centered Top Icon */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
          <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300" />
        </div>

        {/* Individual Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug max-w-[240px]">
          {service.title}
        </h3>
      </Link>
    </motion.div>
  );
}
