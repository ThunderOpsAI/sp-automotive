'use client';

import { Wrench, ShieldCheck, Check, Truck, Gauge, Cpu, Disc, Zap } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    name: 'Manufacturer Logbook Servicing',
    category: 'Warranty-Approved Maintenance',
    description: 'Strict factory specification logbook servicing maintaining new-car statutory warranties without dealership prices. Premium synthetic lubricants, genuine matching filters, and digital service records stamped.',
    icon: Wrench,
    tag: '100% Warranty Safe',
    specs: [
      'Statutory new car warranty protection',
      'Genuine & OEM matching parts installed',
      'Digital service record stamped & updated',
      'Complimentary courtesy loan vehicle available'
    ]
  },
  {
    name: 'Licensed VicRoads Roadworthy Tester (RWC)',
    category: 'Safety Certification Station',
    description: 'Licensed vehicle testing station authorised to perform VicRoads Roadworthy Certificate inspections for private sales, reregistrations, and unroadworthy defect notice clearances across Wangaratta.',
    icon: ShieldCheck,
    tag: 'VicRoads Licensed Station',
    specs: [
      'Comprehensive 70-point vehicle safety test',
      'Brake efficiency & suspension test report',
      'Same-day digital roadworthy certificate issue',
      'Fair, transparent quotes for required repairs'
    ]
  },
  {
    name: 'Brake Disc Machining & Clutch Systems',
    category: 'Hydraulics & Friction Components',
    description: 'Precision on-car brake disc rotor machining, Bendix heavy-duty pads, hydraulic system fluid power-bleeding, and clutch replacements for heavy hauling 4WDs, light trucks, and passenger cars.',
    icon: Disc,
    tag: 'Maximum Stopping Power',
    specs: [
      'Front & rear disc rotor precision machining',
      'Heavy-duty clutch plate & dual-mass flywheel kits',
      'Master & slave cylinder hydraulic overhauls',
      'Full chemical brake fluid pressure bleed'
    ]
  },
  {
    name: 'Engine Diagnostics & Auto Electrics',
    category: 'Advanced Electronic Fault Finding',
    description: 'State-of-the-art computer scan tools diagnosing check engine warning lights, ABS/ESC errors, DPF diesel particulate filter regenerations, alternator charging issues, and battery failures.',
    icon: Cpu,
    tag: 'Modern Scan Tool Suite',
    specs: [
      'OBD2 diagnostic computer fault code reading',
      'Live engine sensor parameter data logging',
      'Common-rail diesel injector testing',
      'Battery, alternator & starter motor load testing'
    ]
  },
  {
    name: 'Suspension, Steering & 4WD Upgrades',
    category: 'Ride Control & Touring Mods',
    description: 'Shock absorber replacements, steering rack overhauls, polyurethane suspension bushings, and heavy-duty 4x4 suspension lift kit installations for regional rural touring and towing caravans.',
    icon: Gauge,
    tag: '4x4 Touring & Towing Ready',
    specs: [
      'Heavy-duty constant-load leaf spring packs',
      'Bilstein, Tough Dog & Old Man Emu shock upgrades',
      'Power steering rack & pump leak repairs',
      'Laser wheel alignment & tyre balancing'
    ]
  },
  {
    name: '24/7 Roadside Assistance & Tilt-Tray Towing',
    category: 'Emergency Highway Recovery',
    description: 'On-call 24 hours a day, 7 days a week for immediate roadside assistance and tilt-tray towing throughout Wangaratta and the Hume Highway corridor between Benalla, Glenrowan, and Chiltern.',
    icon: Truck,
    tag: '24/7 Rapid Response',
    specs: [
      'Emergency accident recovery & breakdown towing',
      'Jump-starts, flat battery & tyre change assistance',
      'Tilt-tray handling lowered cars, 4WDs & vans',
      'Direct transport to our secure repair facility'
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-surface-50 text-surface-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-blue-700" />
            Full Mechanical &amp; Electrical Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Complete Vehicle Care in Wangaratta
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal">
            Whether your vehicle requires a factory-warranty logbook service, roadworthy inspection, clutch replacement, or 24/7 emergency highway towing, our licensed mechanics get you back on the road safely.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-surface-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-100 text-surface-700">
                      {service.tag}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-black text-surface-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-surface-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-surface-100 mb-6">
                    {service.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-surface-700 font-medium">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/#estimator"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-center bg-surface-100 hover:bg-blue-600 hover:text-white text-surface-800 transition-colors block"
                >
                  Calculate Fixed-Price Service
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
