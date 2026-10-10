'use client';

import { Menu, X, Phone, Wrench, MapPin, Calculator, Truck } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { EmergencyRoadsideBanner } from './EmergencyRoadsideBanner';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'header_call_button',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* 24/7 Roadside Assistance / Towing Tap-To-Call Banner */}
      <EmergencyRoadsideBanner />

      <div className="bg-surface-950/90 backdrop-blur-xl border-b border-surface-800 shadow-lg py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo & Local Badge */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-none">
                    SP <span className="text-blue-500">Automotive</span>
                  </span>
                  <span className="text-[10px] text-surface-400 uppercase tracking-widest font-semibold block mt-0.5">
                    Mechanical Workshop &amp; 24/7 Roadside
                  </span>
                </div>
              </Link>
              
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-800/80 border border-surface-700/60 text-[11px] text-surface-300 ml-2">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>Wangaratta VIC 3677</span>
              </div>
            </div>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link 
                href="/#services" 
                className="text-surface-300 hover:text-blue-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Services
              </Link>
              <Link 
                href="/#estimator" 
                className="flex items-center gap-1.5 text-surface-300 hover:text-blue-400 transition-colors text-sm font-semibold tracking-wide"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-500" />
                <span>Service Calculator</span>
              </Link>
              <Link 
                href="/gallery" 
                className="text-surface-300 hover:text-blue-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Workshop
              </Link>
              <Link 
                href="/reviews" 
                className="text-surface-300 hover:text-blue-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Reviews
              </Link>
              <Link 
                href="/quote" 
                className="text-surface-300 hover:text-blue-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Book Service
              </Link>
              
              {/* Phone Button */}
              <a 
                href={`tel:${cleanPhone}`}
                onClick={handlePhoneClick}
                className="group flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-blue-600/30 hover:scale-103"
              >
                <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform text-white" />
                <span>{phoneNumber}</span>
              </a>
            </nav>

            {/* Mobile menu button */}
            <button 
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-blue-400 hover:text-blue-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-7 w-7 text-blue-400" /> : <Menu className="h-7 w-7 text-blue-400" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-surface-950/98 backdrop-blur-2xl border-t border-surface-800 overflow-hidden shadow-2xl"
            >
              <div className="px-5 pt-3 pb-6 space-y-2 mt-1">
                <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-surface-900 border border-surface-800 text-xs text-surface-300 mb-3">
                  <Wrench className="w-3.5 h-3.5 text-blue-500" />
                  <span>Licensed Mechanics • VicRoads RWC Tester • 24/7 Roadside</span>
                </div>
                <Link 
                  href="/#services" 
                  className="block px-4 py-3 text-base font-semibold text-surface-200 hover:text-blue-400 hover:bg-surface-900 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mechanical Services &amp; Repairs
                </Link>
                <Link 
                  href="/#estimator" 
                  className="block px-4 py-3 text-base font-semibold text-surface-200 hover:text-blue-400 hover:bg-surface-900 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fixed-Price Logbook Calculator
                </Link>
                <Link 
                  href="/gallery" 
                  className="block px-4 py-3 text-base font-semibold text-surface-200 hover:text-blue-400 hover:bg-surface-900 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Workshop &amp; Diagnostic Bays
                </Link>
                <Link 
                  href="/reviews" 
                  className="block px-4 py-3 text-base font-semibold text-surface-200 hover:text-blue-400 hover:bg-surface-900 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Customer Endorsements &amp; Reviews
                </Link>
                <Link 
                  href="/quote" 
                  className="block px-4 py-3 text-base font-semibold text-surface-200 hover:text-blue-400 hover:bg-surface-900 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a Service / Schedule Appointment
                </Link>
                
                <div className="pt-2">
                  <a 
                    href={`tel:${cleanPhone}`}
                    onClick={() => {
                      handlePhoneClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-3 px-5 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl transition-transform active:scale-98 shadow-lg shadow-blue-600/30"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call SP Automotive: {phoneNumber}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
