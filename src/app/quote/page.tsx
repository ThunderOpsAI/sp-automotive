import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { QuoteForm } from '@/components/QuoteForm';
import { LogbookCalculator } from '@/components/LogbookCalculator';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Book a Service & Fixed-Price Calculator | SP Automotive Wangaratta',
  description: 'Book logbook servicing, roadworthy certificates (RWC), and mechanical repairs online with upfront fixed prices in Wangaratta VIC.',
  openGraph: {
    title: 'Book a Service & Fixed-Price Calculator | SP Automotive',
    description: 'Fixed-price logbook service booking and mechanical quotes in Wangaratta, Glenrowan, Oxley & Chiltern.',
    type: 'website',
  },
};

export default function QuotePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-20 sm:pt-24">
        <QuoteForm />
        <div className="border-t border-surface-200">
          <LogbookCalculator />
        </div>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
