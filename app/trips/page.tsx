'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';
import { initGSAP } from '@/lib/gsap-config';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const trips = [
    {
        id: 'backcountry',
        title: 'Backcountry Expeditions',
        description: 'Venture beyond the resort boundaries into untouched wilderness.',
        image: 'linear-gradient(to bottom right, #1e3a8a, #000000)',
        level: 'Expert',
        duration: '5-7 Days'
    },
    {
        id: 'chalet',
        title: 'Luxury Chalet Retreats',
        description: 'The perfect balance of adrenaline and relaxation in our premium lodges.',
        image: 'linear-gradient(to bottom right, #f59e0b, #000000)',
        level: 'All Levels',
        duration: '3-14 Days'
    },
    {
        id: 'heli',
        title: 'Heli-Ski Adventures',
        description: 'Access the inaccessible. The ultimate powder experience.',
        image: 'linear-gradient(to bottom right, #a855f7, #000000)',
        level: 'Advanced',
        duration: '1-3 Days'
    },
    {
        id: 'culture',
        title: 'Ski & Culture Tours',
        description: 'Immerse yourself in local traditions, cuisine, and alpine history.',
        image: 'linear-gradient(to bottom right, #10b981, #000000)',
        level: 'Intermediate',
        duration: '7-10 Days'
    }
];

export default function TripsPage() {
    useEffect(() => {
        initGSAP();

        gsap.from('.trip-card', {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
        });
    }, []);

    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="font-heading text-5xl md:text-7xl gradient-text mb-6">
                        Curated Adventures
                    </h1>
                    <p className="font-body text-xl text-snow-300 max-w-2xl mx-auto">
                        Choose your path. From high-adrenaline descents to immersive cultural journeys, we have the perfect expedition for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {trips.map((trip, index) => (
                        <Link key={trip.id} href={`/trips/${trip.id}`} className="trip-card group block">
                            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={`https://source.unsplash.com/random/800x600?skiing,${trip.id}`}
                                        alt={trip.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index < 2}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-heading uppercase tracking-wider">
                                                {trip.level}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-heading uppercase tracking-wider">
                                                {trip.duration}
                                            </span>
                                        </div>

                                        <h2 className="font-heading text-3xl md:text-4xl text-white mb-2 group-hover:text-warm-gold-400 transition-colors">
                                            {trip.title}
                                        </h2>

                                        <p className="font-body text-snow-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {trip.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-warm-gold-400 font-heading uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            <span>View Details</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
