import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Workshop, Diagnostic Bays & Recovery Fleet | SP Automotive Wangaratta',
  description: 'Tour our modern automotive workshop facilities, diagnostic scan bays, licensed roadworthy testing equipment, and 24/7 tilt-tray recovery fleet in Wangaratta VIC.',
  openGraph: {
    title: 'Workshop & Recovery Fleet | SP Automotive Wangaratta',
    description: 'Modern diagnostic equipment, hoist service bays, and 24/7 towing fleet across Wangaratta & Hume Highway.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-16 sm:pt-20">
        <Gallery />
        <BeforeAfterSection />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
