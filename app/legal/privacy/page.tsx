'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';

export default function PrivacyPage() {
    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
                    <h1 className="font-heading text-5xl gradient-text mb-8">Privacy Policy</h1>

                    <p className="font-body text-snow-300 mb-6">
                        Last updated: November 27, 2025
                    </p>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">1. Information We Collect</h2>
                        <p className="font-body text-snow-300">
                            We collect information you provide directly to us, such as when you book a trip, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and payment information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">2. How We Use Your Information</h2>
                        <p className="font-body text-snow-300">
                            We use your information to process bookings, communicate with you about your trip, send you marketing communications (if you opt in), and improve our services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">3. Data Security</h2>
                        <p className="font-body text-snow-300">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-heading text-2xl text-white mb-4">4. Contact Us</h2>
                        <p className="font-body text-snow-300">
                            If you have any questions about this Privacy Policy, please contact us at privacy@offpiste.com.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
