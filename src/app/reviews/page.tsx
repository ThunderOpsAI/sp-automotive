import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';
import { ApprovedReviews } from '@/components/ApprovedReviews';
import { ReviewSubmitForm } from '@/components/ReviewSubmitForm';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';

export const metadata: Metadata = {
  title: 'Client Reviews & Fleet Endorsements | SP Automotive Wangaratta',
  description: 'Read reviews and testimonials from local drivers, regional farmers, and commercial fleet owners who trust SP Automotive for logbook servicing and 24/7 roadside assistance.',
  openGraph: {
    title: 'Client Reviews & Fleet Endorsements | SP Automotive',
    description: 'Verified testimonials from vehicle owners across Wangaratta, Glenrowan, Milawa, and the Hume Highway corridor.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-200 text-surface-900 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-16 sm:pt-20">
        <ApprovedReviews />
        <ReviewSubmitForm />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
