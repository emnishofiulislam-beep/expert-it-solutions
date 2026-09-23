import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Camera,
  Monitor,
  Cpu,
  HardDrive,
  Keyboard,
  Mouse,
  Database,
  Zap,
  Layers,
  BatteryCharging,
  Plug,
  Cable,
  Wifi,
  Network,
  Server,
  Printer,
  FileText,
  Shield,
  Package,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';

const ICON_MAP = {
  Camera,
  Monitor,
  Cpu,
  HardDrive,
  Keyboard,
  Mouse,
  Database,
  Zap,
  Layers,
  BatteryCharging,
  Plug,
  Cable,
  Wifi,
  Network,
  Server,
  Printer,
  FileText,
  Shield,
  Package
};

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Product Categories' }]} />

      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Showroom Categories</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
          Browse our extensive showroom catalog by category. From surveillance cameras to optical networking components and desktop computer hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category, idx) => {
          const IconComponent = ICON_MAP[category.icon] || Package;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.05, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="h-full"
            >
              <Link
                to={`/shop?category=${category.id}`}
                className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  {category.image ? (
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200/80 overflow-hidden flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-blue-400 transition-all shadow-2xs">
                      <img
                        src={category.image}
                        alt={category.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all shadow-2xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    {category.count}+ items
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    View genuine inventory with official warranty.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
