'use client';

import React, { useState } from 'react';
import { Wrench, CheckCircle2, ShieldCheck, ArrowRight, Phone, Car, Clock, ShieldAlert, Sparkles, Fuel } from 'lucide-react';
import Link from 'next/link';

export const VEHICLE_MAKES = [
  'Toyota',
  'Ford',
  'Mazda',
  'Holden',
  'Hyundai / Kia',
  'Subaru',
  'Nissan',
  'Volkswagen',
  'Mitsubishi',
  'European / Other',
];

export const SERVICE_TIERS = [
  {
    id: 'minor-service',
    name: 'Minor Safety Service',
    tagline: 'Routine Lubrication & 62-Point Inspection',
    basePrice: 199,
    duration: '1.5 - 2 Hours',
    badge: 'Every 10,000 km',
    features: [
      'Engine oil drain & premium semi/full-synthetic oil replacement',
      'OEM-spec premium oil filter replacement',
      '62-point comprehensive mechanical safety & brake wear inspection',
      'Brake fluid, coolant, power steering & washer fluid top-ups',
      'Tyre pressures adjusted, tread depth measured & rotation check',
      'Battery state-of-health electronic diagnostic test printout',
    ],
  },
  {
    id: 'major-service',
    name: 'Major Comprehensive Service',
    tagline: 'Full Driveline, Filters & Fluid Flush',
    basePrice: 389,
    duration: '3 - 4 Hours',
    badge: 'Every 40,000 km',
    features: [
      'Everything in Minor Safety Service included',
      'Engine air filter & in-cabin pollen filter replacement',
      'Fuel filter inspection / replacement (where serviceable)',
      'Brake fluid system chemical pressure flush & bleed',
      'Full electronic computer scan & OBD2 error codes cleared',
      'Spark plugs inspected / ignition coil test (petrol models)',
      'Underbody suspension bushings, CV boots & steering link check',
    ],
  },
  {
    id: 'logbook-service',
    name: 'Manufacturer Logbook Service',
    tagline: 'Maintains New Car Statutory Warranty 100%',
    basePrice: 329,
    duration: '2.5 - 3.5 Hours',
    badge: 'Warranty Protected',
    features: [
      'Strict compliance with manufacturer factory logbook service schedule',
      'Genuine or OEM matching specification parts & approved lubricants',
      'Digital service record updated & physical logbook stamped',
      'Computer diagnostic reset of service reminder indicator',
      '100% preserves statutory manufacturer warranty under Australian law',
      'No dealership markups or unnecessary add-on charges',
    ],
  },
  {
    id: 'rwc-inspection',
    name: 'VicRoads Roadworthy Inspection (RWC)',
    tagline: 'Licensed Vehicle Safety Tester',
    basePrice: 195,
    duration: '1.5 Hours',
    badge: 'VicRoads Licensed Tester',
    features: [
      'Official VicRoads Roadworthy Certificate testing & inspection',
      'Comprehensive structural steering, suspension & braking test',
      'Tyre tread, wheel bearings & chassis integrity assessment',
      'Lamps, headlights aim, reflectors & electrical safety check',
      'Windscreen clarity, wipers, washers & seatbelt operation',
      'Same-day certificate issue upon pass or clear itemised repair list',
    ],
  },
];

export const FUEL_TYPES = [
  { id: 'petrol', label: 'Petrol Engine', surcharge: 0 },
  { id: 'diesel', label: 'Common-Rail Diesel', surcharge: 40 },
  { id: '4wd-diesel', label: '4WD / Turbo Diesel', surcharge: 65 },
];

export function LogbookCalculator() {
  const [selectedMake, setSelectedMake] = useState('Toyota');
  const [selectedTierId, setSelectedTierId] = useState('logbook-service');
  const [selectedFuelId, setSelectedFuelId] = useState('petrol');
  const [odometerKm, setOdometerKm] = useState('60,000 km');
  const [needLoanCar, setNeedLoanCar] = useState(false);

  const selectedTier = SERVICE_TIERS.find((t) => t.id === selectedTierId) || SERVICE_TIERS[2];
  const selectedFuel = FUEL_TYPES.find((f) => f.id === selectedFuelId) || FUEL_TYPES[0];

  const totalCalculatedPrice = selectedTier.basePrice + selectedFuel.surcharge;

  const quoteUrl = `/quote?tier=${encodeURIComponent(selectedTier.name)}&make=${encodeURIComponent(selectedMake)}&fuel=${encodeURIComponent(selectedFuel.label)}&price=${totalCalculatedPrice}&loancar=${needLoanCar}&kms=${encodeURIComponent(odometerKm)}`;

  return (
    <section id="estimator" className="py-20 bg-surface-950 text-surface-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Fixed-Price Service Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Transparent Mechanical Servicing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-300">
            No surprise bills. Select your vehicle make, engine type, and required service tier for an instant fixed-price quote backed by certified VACC technicians.
          </p>
        </div>

        {/* Step 1: Vehicle Make & Fuel Type */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
            <Car className="w-4 h-4" /> Step 1: Vehicle Make, Fuel &amp; Odometer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-surface-400 uppercase mb-2">Vehicle Make</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-900 border border-surface-800 text-white font-bold text-sm focus:border-blue-500 focus:outline-none"
              >
                {VEHICLE_MAKES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-surface-400 uppercase mb-2">Engine / Fuel Type</label>
              <select
                value={selectedFuelId}
                onChange={(e) => setSelectedFuelId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-900 border border-surface-800 text-white font-bold text-sm focus:border-blue-500 focus:outline-none"
              >
                {FUEL_TYPES.map((f) => (
                  <option key={f.id} value={f.id}>{f.label} {f.surcharge > 0 ? `(+${f.surcharge})` : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-surface-400 uppercase mb-2">Current Odometer (Approx)</label>
              <select
                value={odometerKm}
                onChange={(e) => setOdometerKm(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-900 border border-surface-800 text-white font-bold text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="10,000 - 20,000 km">10,000 - 20,000 km</option>
                <option value="30,000 - 50,000 km">30,000 - 50,000 km</option>
                <option value="60,000 - 90,000 km">60,000 - 90,000 km</option>
                <option value="100,000 - 140,000 km">100,000 - 140,000 km</option>
                <option value="150,000+ km">150,000+ km</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Service Tiers */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4" /> Step 2: Choose Service Tier
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_TIERS.map((tier) => {
              const active = tier.id === selectedTierId;
              const calculatedTierPrice = tier.basePrice + selectedFuel.surcharge;

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    active
                      ? 'bg-gradient-to-b from-surface-900 to-surface-950 border-blue-500 shadow-2xl shadow-blue-600/20 ring-2 ring-blue-500'
                      : 'bg-surface-900/60 border-surface-800 hover:border-surface-700 hover:bg-surface-900/90'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                        {tier.badge}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-surface-400">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {tier.duration}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-white">{tier.name}</h4>
                    <p className="text-xs text-surface-400 mt-1 mb-4">{tier.tagline}</p>

                    <div className="mb-5 pb-5 border-b border-surface-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-blue-400">${calculatedTierPrice}</span>
                        <span className="text-[11px] text-surface-400">fixed price</span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {tier.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-surface-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTierId(tier.id);
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all ${
                      active
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                        : 'bg-surface-800 hover:bg-surface-700 text-surface-200'
                    }`}
                  >
                    {active ? 'Selected Service' : 'Select'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Loan Car Option */}
        <div className="mb-12">
          <label className="flex items-center gap-3 p-4 rounded-2xl bg-surface-900/80 border border-surface-800 cursor-pointer max-w-xl hover:border-surface-700">
            <input
              type="checkbox"
              checked={needLoanCar}
              onChange={(e) => setNeedLoanCar(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-bold text-sm text-white block">
                Reserve Free Courtesy / Loan Car for the Day
              </span>
              <span className="text-xs text-surface-400">
                Keep going about your workday while our mechanics service your vehicle. Zero extra hire fee.
              </span>
            </div>
          </label>
        </div>

        {/* Live Estimate Summary & CTA Box */}
        <div className="bg-gradient-to-r from-surface-950 via-surface-900 to-surface-950 border border-blue-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                Live Fixed-Price Estimate
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedMake} • {selectedTier.name}
              </h3>
              <p className="text-sm text-surface-300">
                Engine: <strong className="text-white">{selectedFuel.label}</strong> • Time Est: <strong className="text-white">{selectedTier.duration}</strong>
                {needLoanCar && ' • Courtesy Loan Car Reserved'}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-surface-400 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>VACC Member • Statutory Warranty Maintained • Wangaratta Workshop</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center lg:text-right">
                <div className="text-xs text-surface-400 uppercase font-black tracking-wider">Fixed Price</div>
                <div className="text-4xl sm:text-5xl font-black text-blue-400 tracking-tight">
                  ${totalCalculatedPrice}
                </div>
                <div className="text-[11px] text-surface-400">Includes oil, filter, labor &amp; GST</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={quoteUrl}
                  className="flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black rounded-2xl text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-103"
                >
                  <span>Book Service Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="tel:0357224213"
                  className="flex items-center justify-center gap-2 px-5 py-4 bg-surface-800 hover:bg-surface-700 text-white font-bold rounded-2xl text-sm transition-all border border-surface-700"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call (03) 5722 4213</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
