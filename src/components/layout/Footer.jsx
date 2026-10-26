import React from 'react';
import { Link } from 'react-router-dom';
import {
  Server,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Send
} from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { CATEGORIES } from '../../data/categories.js';
import BrandLogo from '../common/BrandLogo.jsx';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Genuine Products</h4>
                <p className="text-xs text-slate-400 mt-1">100% official brand warranty and verified hardware.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Certified Engineers</h4>
                <p className="text-xs text-slate-400 mt-1">Skilled CCNA & security technicians for on-site execution.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Fast 24/7 Support</h4>
                <p className="text-xs text-slate-400 mt-1">Prompt emergency maintenance & troubleshooting response.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Physical Showroom</h4>
                <p className="text-xs text-slate-400 mt-1">Visit our Dhaka showroom to test products hands-on.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="EXPERT IT SOLUTIONS">
              <BrandLogo variant="footer" className="h-10 w-auto" />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              EXPERT IT SOLUTIONS is a premier IT solutions provider and physical electronics showroom in Dhaka, Bangladesh. We deliver turnkey security surveillance, networking infrastructure, PABX systems, computer hardware sales, and modern software development.
            </p>

            <div className="pt-1 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-blue-400 font-semibold">Founder & CEO:</span>
              <span className="text-white font-medium">Md. Raihan Reza</span>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-white">Registered Address:</span>
                </div>
                <p className="pl-5 text-slate-400 leading-relaxed">
                  16, Tower Hamlet, Level-07, Kemal Ataturk Avenue, Banani, Dhaka-1213
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-white">Corporate Address:</span>
                </div>
                <p className="pl-5 text-slate-400 leading-relaxed">
                  Shop #307, Level #03, Sheltech Sierra Computer City, New Elephant Road, Dhaka 1205
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>Hotline:</span>
                  <a href="tel:+8801762596986" className="hover:text-blue-400 transition-colors">+8801762596986</a>
                  <span>/</span>
                  <a href="tel:+8809644217151" className="hover:text-blue-400 transition-colors">+8809644217151</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:reza@expertitsolutionsbd.com" className="hover:text-blue-400 transition-colors">
                  reza@expertitsolutionsbd.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Shop Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Showroom Shop
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/categories"
                  className="text-blue-400 hover:underline text-xs font-semibold pt-1 inline-block"
                >
                  View All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Showroom Visit */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-400 transition-colors">
                  Online Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-blue-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold flex items-center gap-1">
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <p className="font-semibold text-white">Showroom Hours:</p>
              <p className="text-slate-400 mt-0.5">Saturday – Thursday</p>
              <p className="text-blue-400 font-medium">9:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 EXPERT IT SOLUTIONS. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
