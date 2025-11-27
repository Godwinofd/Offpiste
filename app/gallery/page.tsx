'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';
import { initGSAP } from '@/lib/gsap-config';
import { gsap } from 'gsap';

export default function GalleryPage() {
    useEffect(() => {
        initGSAP();

        gsap.from('.gallery-img', {
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
        });
    }, []);

    const images = [
        { src: 'linear-gradient(to br, #1e3a8a, #000)', title: 'Summit Push' },
        { src: 'linear-gradient(to br, #f59e0b, #000)', title: 'Golden Hour' },
        { src: 'linear-gradient(to br, #a855f7, #000)', title: 'Deep Powder' },
        { src: 'linear-gradient(to br, #10b981, #000)', title: 'Forest Run' },
        { src: 'linear-gradient(to br, #3b82f6, #000)', title: 'Ice Cave' },
        { src: 'linear-gradient(to br, #ef4444, #000)', title: 'Alpenglow' },
        { src: 'linear-gradient(to br, #6366f1, #000)', title: 'Night Ski' },
        { src: 'linear-gradient(to br, #ec4899, #000)', title: 'Sunrise' },
        { src: 'linear-gradient(to br, #8b5cf6, #000)', title: 'Base Camp' },
    ];

    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="font-heading text-5xl md:text-7xl gradient-text mb-6">
                        Visual Journey
                    </h1>
                    <p className="font-body text-xl text-snow-300 max-w-2xl mx-auto">
                        Glimpses of the extraordinary. Moments frozen in time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`gallery-img relative rounded-xl overflow-hidden group cursor-pointer ${i % 4 === 0 ? 'md:col-span-2' : ''
                                }`}
                        >
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                                style={{ background: img.src }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="font-heading text-2xl text-white tracking-widest uppercase border-b-2 border-warm-gold-400 pb-2">
                                    {img.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
