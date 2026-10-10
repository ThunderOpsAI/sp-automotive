'use client';

import { Mail, MapPin, Phone, ShieldCheck, Clock, Wrench, Truck } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';
  const email = 'info@spautomotive.com.au';

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'footer_call_link',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  const serviceAreas = [
    'Wangaratta Workshop',
    'Glenrowan',
    'Oxley & Milawa',
    'Chiltern Corridor',
    'Beechworth',
    'Benalla District',
    'Hume Freeway Corridor',
    'Myrtleford',
    'North East Victoria',
    '24/7 Roadside Region',
  ];

  return (
    <footer className="bg-surface-950 text-surface-300 border-t border-surface-800 pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black text-white block leading-none">
                    SP <span className="text-blue-500">Automotive</span>
                  </span>
                  <span className="text-[10px] text-surface-400 uppercase tracking-widest font-semibold block mt-0.5">
                    Mechanic &amp; 24/7 Roadside
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-xs text-surface-400 leading-relaxed font-normal">
              Trusted independent mechanical workshop in Wangaratta. Providing manufacturer logbook servicing, VicRoads Roadworthy Certificates (RWC), brake and clutch repairs, auto diagnostics, and 24/7 emergency roadside towing.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>VACC Accredited • Statutory Warranty Preserved</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Workshop Services
            </h4>
            <ul className="space-y-2.5 text-xs text-surface-400">
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Manufacturer Logbook Servicing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  VicRoads Roadworthy Inspections (RWC)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Brakes, Clutches &amp; Rotor Machining
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Computer Diagnostics &amp; Auto Electrics
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-blue-400 transition-colors">
                  Suspension, Steering &amp; 4WD Upgrades
                </Link>
              </li>
              <li>
                <Link href="/#roadside" className="hover:text-red-400 transition-colors font-bold text-red-400">
                  24/7 Emergency Towing &amp; Roadside
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Service Areas */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Service Areas
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-surface-400">
              {serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-surface-500 mt-3">
              Full workshop facilities in Wangaratta VIC 3677 with courtesy loan cars available. Emergency roadside tilt-tray covering the Hume Freeway corridor.
            </p>
          </div>

          {/* Direct Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              Workshop Contact &amp; Hours
            </h4>
            <a
              href={`tel:${cleanPhone}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-2.5 text-sm font-bold text-white hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{phoneNumber}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-xs text-surface-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>{email}</span>
            </a>
            <div className="flex items-start gap-2.5 text-xs text-surface-400 pt-2">
              <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p>Workshop: Mon - Fri: 8:00 AM – 5:00 PM</p>
                <p>Saturday: 8:30 AM – 12:00 PM (By Appt)</p>
                <p className="text-red-400 font-bold mt-1">24/7 Roadside &amp; Towing: Always On-Call</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-500">
          <div>
            &copy; {new Date().getFullYear()} SP Automotive. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-surface-400">
            <Link href="/quote" className="hover:text-blue-400 transition-colors">
              Book a Service
            </Link>
            <span>•</span>
            <Link href="/gallery" className="hover:text-blue-400 transition-colors">
              Workshop
            </Link>
            <span>•</span>
            <Link href="/reviews" className="hover:text-blue-400 transition-colors">
              Reviews
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
