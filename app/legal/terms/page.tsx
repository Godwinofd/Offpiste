'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';

export default function TermsPage() {
    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
                    <h1 className="font-heading text-5xl gradient-text mb-8">Terms of Service</h1>

                    <p className="font-body text-snow-300 mb-6">
                        Last updated: November 27, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="font-body text-snow-300">
                            By accessing and using the Offpiste website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">2. Booking & Cancellations</h2>
                        <p className="font-body text-snow-300">
                            All bookings are subject to availability. A deposit is required to secure your spot. Cancellations made more than 60 days prior to the trip start date are eligible for a partial refund.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">3. Risk & Liability</h2>
                        <p className="font-body text-snow-300">
                            Skiing and mountaineering involve inherent risks. All participants must sign a liability waiver before joining any expedition. Offpiste is not responsible for injuries or accidents that occur during the trip.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">4. Insurance</h2>
                        <p className="font-body text-snow-300">
                            Comprehensive travel and medical insurance, including coverage for backcountry skiing and helicopter evacuation, is mandatory for all participants.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
