'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, ShieldCheck, MapPin, Wrench, Car, Calendar, Truck } from 'lucide-react';
import { VEHICLE_MAKES, SERVICE_TIERS, FUEL_TYPES } from './LogbookCalculator';

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const phoneNumber = '(03) 5722 4213';
  const cleanPhone = '0357224213';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: 'Toyota',
    vehicleModel: '',
    vehicleYear: '',
    vehicleRego: '',
    odometer: '60,000 km',
    serviceTier: 'Manufacturer Logbook Service',
    estimatedPrice: 329,
    loanCar: false,
    roadsideEmergency: false,
    preferredDate: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill from search parameters if user arrived from the LogbookCalculator
  useEffect(() => {
    if (!searchParams) return;
    const tier = searchParams.get('tier');
    const make = searchParams.get('make');
    const price = searchParams.get('price');
    const loancar = searchParams.get('loancar');
    const kms = searchParams.get('kms');

    setFormData((prev) => ({
      ...prev,
      serviceTier: tier || prev.serviceTier,
      vehicleMake: make || prev.vehicleMake,
      estimatedPrice: price ? Number(price) : prev.estimatedPrice,
      loanCar: loancar === 'true' ? true : prev.loanCar,
      odometer: kms || prev.odometer,
    }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your First Name, Email, and Phone number.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          vehicleMake: formData.vehicleMake,
          vehicleModel: formData.vehicleModel,
          vehicleYear: `${formData.vehicleYear} (Rego: ${formData.vehicleRego})`,
          odometer: formData.odometer,
          serviceTier: formData.serviceTier,
          estimatedPrice: formData.estimatedPrice,
          loanCar: formData.loanCar,
          roadsideEmergency: formData.roadsideEmergency,
          preferredDate: formData.preferredDate,
          message: formData.message,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit service booking. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Service booking submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please call (03) 5722 4213 directly.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-surface-50 text-surface-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-blue-700" />
            Fast Workshop Booking Confirmation
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-surface-900 tracking-tight">
            Book Mechanical Service or Inspection
          </h1>
          <p className="mt-4 text-base text-surface-600 font-normal">
            Schedule your logbook service, roadworthy certificate, or mechanical repair below. We will confirm your bay allocation and courtesy car availability within 2 business hours. Need immediate assistance? Call <strong className="text-surface-900">{phoneNumber}</strong>.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-surface-900">
              Service Booking Request Confirmed!
            </h2>
            <p className="text-surface-600 max-w-lg mx-auto">
              Thank you, <strong>{formData.firstName}</strong>. Our service advisor has received your vehicle booking request for your <strong>{formData.vehicleMake}</strong> and will contact you via phone or SMS shortly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Workshop: {phoneNumber}</span>
              </a>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-6 py-3.5 bg-surface-100 hover:bg-surface-200 text-surface-800 font-bold rounded-xl text-sm transition-all"
              >
                Book Another Vehicle
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-surface-200 shadow-xl space-y-8">
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Emergency Notice Checkbox */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="roadsideEmergency"
                  checked={formData.roadsideEmergency}
                  onChange={handleChange}
                  className="w-5 h-5 rounded text-red-600 focus:ring-red-500"
                />
                <div>
                  <span className="font-black text-sm text-amber-900 block flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-red-600" />
                    Urgent Roadside Breakdown / Towing Required Right Now
                  </span>
                  <span className="text-xs text-amber-800">
                    If your car is currently broken down on the road, check this box or call <strong>{phoneNumber}</strong> immediately for priority dispatch.
                  </span>
                </div>
              </label>
            </div>

            {/* Step 1: Vehicle Information */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                <Car className="w-4 h-4" /> Step 1: Vehicle Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Make</label>
                  <select
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  >
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Model</label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. Hilux, Ranger, CX-5, Golf"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Year &amp; Rego</label>
                  <input
                    type="text"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    placeholder="e.g. 2019 / 1XX-2YY"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Service Tier & Odometer */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Step 2: Service Tier &amp; Kilometres
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Service Tier</label>
                  <select
                    name="serviceTier"
                    value={formData.serviceTier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  >
                    {SERVICE_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.name}>{tier.name} (from ${tier.basePrice})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Approx Odometer</label>
                  <input
                    type="text"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleChange}
                    placeholder="e.g. 75,000 km"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Loan Car Checkbox */}
              <div className="mt-4 pt-3 border-t border-surface-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="loanCar"
                    checked={formData.loanCar}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-surface-800">
                    I need a complimentary courtesy loan car during this service
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Preferred Appointment Date */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Step 3: Preferred Date
              </h2>
              <div>
                <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Preferred Drop-Off Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4">
                Step 4: Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="04xx xxx xxx or (03) xxxx xxxx"
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-surface-700 uppercase mb-1">Mechanical Symptoms, Noises or Extra Requests</label>
                <textarea
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about warning lights, squeaking brakes, shuddering, or specific logbook checklist items..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-100">
              <div className="flex items-center gap-2 text-xs text-surface-500">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Zero Hidden Fees • Upfront Price Guarantee • VACC Member</span>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black rounded-xl text-base shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Confirm Service Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}

export function QuoteForm() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading booking engine...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}
