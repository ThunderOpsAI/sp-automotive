'use client';

import React from 'react';
import { Phone, Truck, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export function EmergencyRoadsideBanner() {
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';

  const handleCall = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'emergency_roadside_banner_call',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white shadow-xl relative z-40 border-b border-red-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 animate-pulse">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-white text-red-700 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                  24/7 Breakdown Dispatch
                </span>
                <span className="font-extrabold text-xs sm:text-sm tracking-wide">
                  Emergency Roadside Assistance &amp; Towing
                </span>
              </div>
              <p className="text-[11px] text-white/90 hidden md:block mt-0.5">
                Stuck on the Hume Freeway or Wangaratta district? Flat tyre, dead battery, radiator failure or towing needed? We dispatch immediately.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/90">
              <Clock className="w-3.5 h-3.5" />
              <span>Average Response &lt; 30 Mins</span>
            </div>

            <a
              href={`tel:${cleanPhone}`}
              onClick={handleCall}
              className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-surface-100 text-red-700 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-103 active:scale-98"
            >
              <Phone className="w-4 h-4 text-red-600 group-hover:rotate-12 transition-transform animate-bounce" />
              <span>Tap to Call Emergency: {phoneNumber}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
