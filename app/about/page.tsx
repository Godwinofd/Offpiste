'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';
import { initGSAP } from '@/lib/gsap-config';
import { gsap } from 'gsap';

export default function AboutPage() {
    useEffect(() => {
        initGSAP();

        gsap.from('.reveal-text', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
    }, []);

    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="reveal-text font-heading text-6xl md:text-8xl gradient-text mb-8">
                        Our Story
                    </h1>

                    <div className="space-y-8 font-body text-lg md:text-xl text-snow-300 leading-relaxed">
                        <p className="reveal-text">
                            Born from a desire to escape the crowded resorts and artificial slopes, Offpiste was founded by a collective of mountain guides, alpinists, and dreamers.
                        </p>

                        <p className="reveal-text">
                            We believe that true adventure begins where the groomed runs end. It's in the silence of a snow-covered forest, the roar of the wind on a ridgeline, and the weightlessness of that first turn in deep powder.
                        </p>

                        <div className="reveal-text my-12 p-8 glass-card border-l-4 border-warm-gold-500">
                            <h3 className="font-heading text-2xl text-white mb-4">The Offpiste Philosophy</h3>
                            <p className="italic text-white/80">
                                "We don't just sell ski trips. We curate moments of elevation—physical, emotional, and spiritual."
                            </p>
                        </div>

                        <p className="reveal-text">
                            Our team has spent decades exploring the world's most remote mountain ranges. From the jagged peaks of the Alps to the deep powder of Japan and the vast wilderness of Alaska, we have handpicked the finest lodges, the most capable guides, and the most breathtaking terrain.
                        </p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { number: '15+', label: 'Years Experience' },
                            { number: '500+', label: 'Expeditions Led' },
                            { number: '100%', label: 'Safety Record' }
                        ].map((stat, i) => (
                            <div key={i} className="reveal-text glass-card p-8 text-center">
                                <div className="font-heading text-5xl text-warm-gold-400 mb-2">{stat.number}</div>
                                <div className="font-body text-sm uppercase tracking-widest text-snow-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
