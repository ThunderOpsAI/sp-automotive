'use client';

import React, { useState } from 'react';
import { Wrench, MapPin, CheckCircle2, ShieldCheck, Truck, Gauge, Cpu } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'Logbook Service Bays',
  'Roadworthy RWC Testing',
  'Brakes & Suspension',
  'Diagnostics & Electrics',
  '24/7 Roadside & Towing'
] as const;

type Category = typeof categories[number];

const projectGallery = [
  {
    id: 1,
    title: 'Manufacturer Logbook Servicing on Current Model Toyota Hilux',
    location: 'Wangaratta Workshop',
    category: 'Logbook Service Bays',
    tag: 'Statutory Warranty Maintained',
    desc: '40,000 km major service following Toyota factory schedule. Genuine filtration, driveline oils, brake inspection, and digital logbook stamped.'
  },
  {
    id: 2,
    title: 'VicRoads Licensed Roadworthy Inspection (RWC Bay)',
    location: 'Wangaratta Workshop',
    category: 'Roadworthy RWC Testing',
    tag: 'VicRoads Accredited Station',
    desc: 'Complete roadworthy safety examination of steering components, brake pad thickness, tyre wear, and lighting systems with same-day digital signoff.'
  },
  {
    id: 3,
    title: 'Brembo Brake Machining & Heavy-Duty Pad Upgrade',
    location: 'Wangaratta Workshop',
    category: 'Brakes & Suspension',
    tag: 'On-Car Disc Machining',
    desc: 'Precision on-car rotor machining eliminating brake pedal pulsation, paired with Bendix heavy-duty ceramic pads for a Ford Ranger touring rig.'
  },
  {
    id: 4,
    title: 'Advanced Common-Rail Diesel Diagnostics & DPF Regen',
    location: 'Wangaratta Workshop',
    category: 'Diagnostics & Electrics',
    tag: 'Live Data OBD2 Scans',
    desc: 'Diagnosing diesel particulate filter soot accumulation and turbo boost sensors using modern scan tools with successful static forced regeneration.'
  },
  {
    id: 5,
    title: '24/7 Tilt-Tray Highway Recovery on Hume Freeway',
    location: 'Glenrowan Section, Hume Fwy',
    category: '24/7 Roadside & Towing',
    tag: 'Rapid Emergency Towing',
    desc: 'Urgent night-time recovery of a family SUV with a ruptured water pump. Safely loaded onto our tilt-tray and transported directly to our workshop.'
  },
  {
    id: 6,
    title: 'Heavy-Duty 4x4 2-Inch Suspension Lift Kit Installation',
    location: 'Wangaratta Workshop',
    category: 'Brakes & Suspension',
    tag: 'Old Man Emu & Tough Dog',
    desc: 'Supplying and installing heavy-duty coil springs, matched gas shock absorbers, and greasable shackles for an overland Isuzu D-MAX.'
  },
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredProjects = selectedCategory === 'All'
    ? projectGallery
    : projectGallery.filter((p) => p.category === selectedCategory);

  return (
    <section className="pt-32 pb-16 bg-surface-50 text-surface-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-blue-700" />
            Workshop Capabilities &amp; Fleet
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Workshop &amp; Diagnostic Bays
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-600 font-normal">
            Take a look inside our Wangaratta workshop. From 4-post vehicle hoists and computerized wheel balancers to modern OBD2 scan tools and 24/7 tilt-tray recovery trucks.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-surface-200 text-surface-700 hover:bg-surface-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 border border-surface-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-800">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-surface-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-surface-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-surface-600 leading-relaxed mb-4">
                  {project.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700">{project.category}</span>
                <Link
                  href="/quote"
                  className="text-xs font-bold text-surface-700 hover:text-blue-700 transition-colors"
                >
                  Book Service Bay &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
