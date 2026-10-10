'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, CheckCircle2, ShieldCheck, Truck, Gauge, Disc } from 'lucide-react';
import Link from 'next/link';

const COMPARISON_SETS = [
  {
    id: 'brake-comp',
    title: 'Brakes: Warped Rotors & Squealing Pads to Precision Stopping Power',
    subtitle: 'From severe steering shudder under heavy downhill braking to precision machined disc rotors and low-dust ceramic pads.',
    beforeTitle: 'Warped Rotors & Thinning Pads',
    beforeDesc: 'Steering wheel shake on freeway exits, metal-on-metal squeal, and extended stopping distances.',
    afterTitle: 'Trued Rotors & Bendix Heavy-Duty Pads',
    afterDesc: 'Discs precision skimmed to ±0.01mm runout, zero shudder, full hydraulic pressure flush, and instant pedal response.',
    milestones: [
      { step: '01', title: 'Digital Micrometer', desc: 'Thickness variation & runout measured against min specs.' },
      { step: '02', title: 'Precision Skimming', desc: 'On-car disc lathe truing braking surfaces to factory spec.' },
      { step: '03', title: 'Bendix Ceramic', desc: 'High-temperature pads fitted with anti-rattle shims.' },
      { step: '04', title: 'Pressure Flush', desc: 'Fresh DOT4 fluid power-bled eliminating spongy pedal feel.' },
    ]
  },
  {
    id: 'clutch-comp',
    title: 'Driveline: Slipping Heavy-Haul Clutch to Exedy Heavy-Duty Package',
    subtitle: 'Replacing burnt, slipping clutches in regional towing utes with reinforced pressure plates and balanced flywheels.',
    beforeTitle: 'Slipping Clutch & Burning Smell',
    beforeDesc: 'Engine revving without acceleration up hill climbs, heavy burning smell, and stiff pedal resistance.',
    afterTitle: 'Exedy Heavy-Duty Clutch Package',
    afterDesc: 'Machined flywheel, new thrust bearing, and 30% higher torque clamping capacity for effortless towing.',
    milestones: [
      { step: '01', title: 'Gearbox Removal', desc: 'Careful transmission drop and bellhousing degrease.' },
      { step: '02', title: 'Flywheel Machining', desc: 'Surface ground and dynamically balanced.' },
      { step: '03', title: 'Spigot & Bearing', desc: 'New rear main crankshaft seal and pilot bearing.' },
      { step: '04', title: 'Alignment & Test', desc: 'Spline aligned, bled and road tested under high load.' },
    ]
  },
  {
    id: 'recovery-comp',
    title: 'Emergency: Hume Freeway Breakdown to Same-Day Workshop Repair',
    subtitle: 'Stranded on the highway with radiator or alternator failure safely recovered and back on the road without delay.',
    beforeTitle: 'Stranded on Hume Freeway',
    beforeDesc: 'Overheating engine warning, steam pouring from bonnet, or dead alternator battery leaving car disabled on roadside.',
    afterTitle: '24/7 Dispatch & Rapid Repair',
    afterDesc: 'Tilt-tray retrieval within 35 minutes, immediate parts dispatch, cooling system pressure test, and trip resumed.',
    milestones: [
      { step: '01', title: 'Rapid Dispatch', desc: 'Emergency tilt-tray en route with GPS coordination.' },
      { step: '02', title: 'Safe Recovery', desc: 'Soft strap tie-downs ensuring zero underbody damage.' },
      { step: '03', title: 'Diagnostic Triage', desc: 'Pressure testing cooling system / charging circuit test.' },
      { step: '04', title: 'OEM Part Replacement', desc: 'Replacement radiator or alternator installed and road tested.' },
    ]
  }
];

export function BeforeAfterSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSet = COMPARISON_SETS[activeIdx];

  return (
    <section className="py-20 bg-surface-950 text-surface-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Mechanical Case Studies
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Diagnosis to Resolution
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-300">
            See how our certified mechanics diagnose and solve complex braking, driveline, and roadside emergency challenges.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {COMPARISON_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                idx === activeIdx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-black'
                  : 'bg-surface-800 text-surface-300 hover:bg-surface-750 hover:text-white'
              }`}
            >
              {set.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Transformation Showcase Card */}
        <div className="bg-surface-900/90 rounded-3xl p-6 sm:p-10 border border-surface-800 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {activeSet.title}
            </h3>
            <p className="text-sm text-surface-400">
              {activeSet.subtitle}
            </p>
          </div>

          {/* Before & After Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-950 rounded-2xl p-6 border border-red-500/30 relative">
              <span className="inline-block px-3 py-1 rounded-full bg-red-950 text-red-300 text-xs font-black uppercase mb-3">
                Identified Symptom / Defect
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{activeSet.beforeTitle}</h4>
              <p className="text-xs sm:text-sm text-surface-400">{activeSet.beforeDesc}</p>
            </div>

            <div className="bg-surface-950 rounded-2xl p-6 border border-blue-500/40 relative">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-black uppercase mb-3">
                Completed Mechanical Resolution
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{activeSet.afterTitle}</h4>
              <p className="text-xs sm:text-sm text-surface-400">{activeSet.afterDesc}</p>
            </div>
          </div>

          {/* 4-Step Process Milestones */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">
              Workshop Repair Process
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeSet.milestones.map((m, idx) => (
                <div key={idx} className="bg-surface-950/80 rounded-xl p-4 border border-surface-800">
                  <span className="text-blue-400 text-xs font-black block mb-1">{m.step}</span>
                  <div className="text-white text-sm font-bold mb-1">{m.title}</div>
                  <div className="text-surface-400 text-xs">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-surface-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>12-Month / 20,000km Workmanship &amp; Parts Guarantee</span>
            </div>
            <Link
              href="/quote"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Book Service Bay &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
