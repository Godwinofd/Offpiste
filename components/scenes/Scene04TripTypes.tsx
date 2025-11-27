'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mountain, Home, Plane, Compass } from 'lucide-react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const tripTypes = [
    {
        id: 1,
        icon: Mountain,
        title: 'Backcountry Expeditions',
        description: 'Untouched powder, expert guides, pristine wilderness.',
        color: '#3b82f6',
        href: '/trips/backcountry',
    },
    {
        id: 2,
        icon: Home,
        title: 'Luxury Chalet Retreats',
        description: 'Premium comfort, gourmet dining, mountain views.',
        color: '#f59e0b',
        href: '/trips/luxury-chalet',
    },
    {
        id: 3,
        icon: Plane,
        title: 'Heli-Ski Adventures',
        description: 'Ultimate access, pristine terrain, expert-only.',
        color: '#a855f7',
        href: '/trips/heli-ski',
    },
    {
        id: 4,
        icon: Compass,
        title: 'Ski & Culture Tours',
        description: 'Alpine villages, local traditions, authentic experiences.',
        color: '#10b981',
        href: '/trips/culture-tours',
    },
];

export default function Scene04TripTypes() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const panels = scene.querySelectorAll('.trip-panel');

        panels.forEach((panel, index) => {
            // Panel slide in
            gsap.from(panel, {
                x: 100,
                opacity: 0,
                scrollTrigger: {
                    trigger: scene,
                    start: `${index * 20 + 10}% top`,
                    end: `${index * 20 + 30}% top`,
                    scrub: 1,
                },
            });

            // Icon bounce
            gsap.from(panel.querySelector('.trip-icon'), {
                scale: 0,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: scene,
                    start: `${index * 20 + 15}% top`,
                    end: `${index * 20 + 25}% top`,
                    scrub: 1,
                },
            });
        });

        // Parallax background layers
        gsap.to('#mountain-layer-1', {
            y: -200,
            scrollTrigger: {
                trigger: scene,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.3,
            },
        });

        gsap.to('#mountain-layer-2', {
            y: -100,
            scrollTrigger: {
                trigger: scene,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === scene) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section
            id="scene-04"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-charcoal-900 to-ice-blue-900 relative"
        >
            {/* Parallax mountain background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <svg
                    id="mountain-layer-1"
                    viewBox="0 0 1200 600"
                    className="absolute bottom-0 w-full h-2/3"
                    preserveAspectRatio="xMidYMax meet"
                >
                    <path
                        d="M0,600 L200,300 L400,400 L600,150 L800,350 L1000,250 L1200,450 L1200,600 Z"
                        fill="#1e3a8a"
                    />
                </svg>
                <svg
                    id="mountain-layer-2"
                    viewBox="0 0 1200 600"
                    className="absolute bottom-0 w-full h-1/2"
                    preserveAspectRatio="xMidYMax meet"
                >
                    <path
                        d="M0,600 L300,400 L500,500 L700,300 L900,450 L1200,350 L1200,600 Z"
                        fill="#0a0f1a"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text">
                    Choose Your Adventure
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tripTypes.map((trip) => (
                        <Link
                            key={trip.id}
                            href={trip.href}
                            className="trip-panel group"
                        >
                            <div className="glass-card p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-glow">
                                {/* Icon */}
                                <div
                                    className="trip-icon w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${trip.color}20`, border: `2px solid ${trip.color}` }}
                                >
                                    <trip.icon size={40} style={{ color: trip.color }} />
                                </div>

                                {/* Title */}
                                <h3
                                    className="font-heading text-2xl font-semibold mb-4 transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(to right, ${trip.color}, #fbbf24)`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                    }}
                                >
                                    {trip.title}
                                </h3>

                                {/* Description */}
                                <p className="font-body text-sm text-snow-300 mb-6 flex-grow">
                                    {trip.description}
                                </p>

                                {/* CTA */}
                                <div className="font-body text-sm uppercase tracking-wide text-warm-gold-400 group-hover:text-warm-gold-300 transition-colors">
                                    Explore →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
