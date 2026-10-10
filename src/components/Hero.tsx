'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Truck,
  Car,
  Gauge,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

const MECHANICAL_CAPABILITIES = [
  {
    id: 'logbook-servicing',
    name: 'Manufacturer Logbook Servicing',
    shortName: 'Logbook Servicing',
    icon: Wrench,
    category: 'Warranty Preserved',
    headline: 'Strict Factory Schedule Logbook Servicing',
    description: 'Protect your vehicle’s statutory new-car warranty without the inflated dealership service pricing. We use OEM-grade filters, factory-specified synthetic oils, and digital logbook stamping for all makes & models.',
    specs: {
      warrantyProtection: '100% Statutory Warranty Compliant (ACCC Law)',
      partsQuality: 'Genuine & OEM-Certified Replacement Filters & Fluids',
      digitalRecord: 'Factory Digital Service Records Stamped & Documented',
    },
    badge: 'Dealership Alternative',
  },
  {
    id: 'roadworthy-rwc',
    name: 'VicRoads Roadworthy Inspections (RWC)',
    shortName: 'Roadworthy RWC',
    icon: ShieldCheck,
    category: 'Licensed Vehicle Tester',
    headline: 'Licensed VicRoads Vehicle Roadworthy Station',
    description: 'Accredited testing station for private vehicle sales, interstate transfers, and defect notice clearances across Wangaratta. Clear testing checklist, fast turnarounds, and itemised repair solutions.',
    specs: {
      accreditation: 'VicRoads Licensed Vehicle Tester Station',
      scope: 'Suspension, Brakes, Steering, Tyres, Structure & Lights',
      turnaround: 'Same-Day Digital Certificate Issue on Inspection Pass',
    },
    badge: 'VicRoads Accredited',
  },
  {
    id: 'brakes-suspension',
    name: 'Brakes, Clutches & 4WD Upgrades',
    shortName: 'Brakes & Clutch',
    icon: Gauge,
    category: 'Precision Mechanical',
    headline: 'Brake Disc Machining & Driveline Overhauls',
    description: 'Complete brake pad replacements, on-car rotor machining, clutch hydraulics, and heavy-duty 4x4 suspension lift kits for North East touring utes, towing rigs, and family passenger cars.',
    specs: {
      brakeTesting: 'Hydraulic Pressure Bleed & Bendix High-Performance Pads',
      clutchSystems: 'Exedy Heavy-Duty Clutches & Dual-Mass Flywheels',
      suspension: 'Shock Absorber Testing & Driveline Bushing Upgrades',
    },
    badge: 'Heavy-Duty Ready',
  },
  {
    id: 'roadside-dispatch',
    name: '24/7 Emergency Roadside Assistance & Towing',
    shortName: '24/7 Towing',
    icon: Truck,
    category: 'Hume Highway & Local Towing',
    headline: '24/7 Breakdown Dispatch Across Wangaratta & Hume Corridor',
    description: 'Flat tyre, mechanical seizure, overheated radiator or accident retrieval? Our tilt-tray recovery truck is on 24/7 standby to tow passenger vehicles, trade utes, and caravans safely to our secure depot.',
    specs: {
      coverage: 'Wangaratta, Glenrowan, Chiltern, Benalla & Hume Freeway',
      equipment: 'Modern Heavy Tilt-Tray with Soft Wheel Tie-Downs',
      availability: '24 Hours / 7 Days On-Call Immediate Response',
    },
    badge: '24/7 On-Call',
  },
];

export function Hero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCap = MECHANICAL_CAPABILITIES[selectedIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % MECHANICAL_CAPABILITIES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    startTimer();
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-black uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-blue-700" />
            Wangaratta’s Trusted Mechanical Workshop
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-800 text-surface-300 border border-surface-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            VACC Member • Licensed VicRoads Tester
          </div>
        </div>

        {/* Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-surface-900 tracking-tight leading-[1.08]">
              Fixed-Price Logbook Servicing, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Roadworthy Testing &amp; 24/7 Roadside
              </span>
            </h1>

            <p className="text-base sm:text-lg text-surface-600 leading-relaxed max-w-2xl font-normal">
              Reliable, dealer-level vehicle maintenance with straight-up country honesty. From routine minor safety services and factory warranty logbook stamps to computer diagnostics, brake repairs, and 24/7 emergency roadside assistance across Wangaratta &amp; the Hume Freeway.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black rounded-2xl text-base shadow-xl shadow-blue-600/30 transition-all hover:scale-103"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl text-base transition-all shadow-md"
              >
                <Truck className="w-5 h-5 text-white" />
                <span>Roadside Emergency Call</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 px-5 py-4 bg-white hover:bg-surface-100 text-surface-900 font-bold rounded-2xl text-base transition-all border border-surface-200 shadow-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{phoneNumber}</span>
              </a>
            </div>

            {/* Micro Trust points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-surface-200 text-xs text-surface-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>New Car Warranty Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Complimentary Courtesy Car</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>24/7 Emergency Dispatch</span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Card Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-surface-950 text-white rounded-3xl p-6 sm:p-8 border border-surface-800 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                  {activeCap.badge}
                </span>
                <span className="text-xs text-surface-400">{activeCap.category}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCap.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {activeCap.headline}
                  </h3>
                  <p className="text-sm text-surface-300 leading-relaxed">
                    {activeCap.description}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-surface-800/80">
                    {Object.entries(activeCap.specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-2 text-xs text-surface-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-surface-800">
                {MECHANICAL_CAPABILITIES.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === selectedIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                          : 'bg-surface-900 text-surface-400 hover:text-white hover:bg-surface-850'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
