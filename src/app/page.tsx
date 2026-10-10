import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { LogbookCalculator } from '@/components/LogbookCalculator';
import { ReviewsHighlight } from '@/components/ReviewsHighlight';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-16 sm:pt-20">
        <Hero />
        <Services />
        <LogbookCalculator />
        <ReviewsHighlight />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
