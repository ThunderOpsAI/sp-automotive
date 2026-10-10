'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CalendarCheck, Phone, Truck, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export function PreFooterCTAs() {
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';

  return (
    <section className="py-14 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Fixed-Price Service Calculator */}
          <Link href="/#estimator" className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-surface-950 text-white border border-surface-800 shadow-2xl hover:border-blue-500/60 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Calculator className="w-32 h-32 text-blue-400" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-black uppercase tracking-wider mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  Fixed-Price Calculator
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
                  Instant Service Calculator
                </h3>
                <p className="mt-3 text-sm text-surface-300 font-normal leading-relaxed">
                  Select your vehicle make, odometer, and service tier (Minor, Major, Logbook, Roadworthy RWC) for an upfront fixed-price estimate with zero hidden surprises.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-blue-400 group-hover:text-blue-300">
                <span>Calculate Your Service Price</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Card 2: 24/7 Roadside Assistance & Towing */}
          <a href={`tel:${cleanPhone}`} className="group block">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-2xl hover:shadow-red-600/30 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none text-white">
                <Truck className="w-32 h-32" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/20 text-xs font-black uppercase tracking-wider mb-4">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  24/7 Emergency Dispatch
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  24/7 Roadside &amp; Towing
                </h3>
                <p className="mt-3 text-sm text-white/95 font-medium leading-relaxed">
                  Broken down or stuck on the Hume Highway corridor? Tilt-tray tow truck and on-call mechanics ready 24/7 for fast dispatch. Tap to call <strong>{phoneNumber}</strong>.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-white group-hover:translate-x-1 transition-transform">
                <Phone className="w-4 h-4" />
                <span>Call Emergency Roadside Assistance</span>
              </div>
            </motion.div>
          </a>

        </div>
      </div>
    </section>
  );
}
