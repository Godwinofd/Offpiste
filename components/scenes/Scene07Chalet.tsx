'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Coffee, Sparkles, Wind } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const amenities = [
    { icon: Flame, label: 'Fireplace', description: 'Crackling warmth' },
    { icon: Coffee, label: 'Gourmet Dining', description: 'Chef-prepared meals' },
    { icon: Sparkles, label: 'Spa & Wellness', description: 'Relaxation & recovery' },
    { icon: Wind, label: 'Hot Tub', description: 'Mountain views' },
];

export default function Scene07Chalet() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Defrost animation
        gsap.from('#defrost-mask circle', {
            attr: { r: 0 },
            scrollTrigger: {
                trigger: scene,
                start: '30% top',
                end: '60% top',
                scrub: 1,
            },
        });

        gsap.to('#frosted-glass', {
            opacity: 0,
            scrollTrigger: {
                trigger: scene,
                start: '30% top',
                end: '60% top',
                scrub: 1,
            },
        });

        // Interior content reveal
        gsap.from('.amenity-icon', {
            scale: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: scene,
                start: '70% top',
                end: '85% top',
                scrub: 1,
            },
        });

        // Fireplace glow pulse
        gsap.to('#fireplace-glow', {
            opacity: 0.6,
            scale: 1.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
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
            id="scene-07"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-ice-blue-900 to-warm-gold-600 relative overflow-hidden"
        >
            {/* Fireplace glow */}
            <div
                id="fireplace-glow"
                className="absolute inset-0 bg-gradient-radial from-warm-gold-400/30 via-transparent to-transparent opacity-40"
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Window Frame with Defrost Effect */}
                    <div className="relative">
                        <svg viewBox="0 0 400 500" className="w-full">
                            {/* Window frame */}
                            <rect x="20" y="20" width="360" height="460" fill="#5c4033" rx="10" />
                            <rect x="40" y="40" width="320" height="420" fill="url(#window-interior)" rx="5" />

                            {/* Frosted glass overlay */}
                            <rect
                                id="frosted-glass"
                                x="40"
                                y="40"
                                width="320"
                                height="420"
                                fill="rgba(255, 255, 255, 0.7)"
                                filter="url(#frost-blur)"
                                mask="url(#defrost-mask)"
                                rx="5"
                            />

                            {/* Snow on windowsill */}
                            <ellipse cx="200" cy="470" rx="180" ry="20" fill="white" opacity="0.8" />

                            {/* Definitions */}
                            <defs>
                                {/* Interior gradient */}
                                <linearGradient id="window-interior" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#f59e0b" />
                                </linearGradient>

                                {/* Frost blur */}
                                <filter id="frost-blur">
                                    <feGaussianBlur stdDeviation="10" />
                                </filter>

                                {/* Defrost mask */}
                                <mask id="defrost-mask">
                                    <rect x="0" y="0" width="400" height="500" fill="white" />
                                    <circle cx="200" cy="250" r="0" fill="black">
                                        {/* This circle will be animated by GSAP */}
                                    </circle>
                                </mask>
                            </defs>
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="font-body text-sm text-white/60 uppercase tracking-wide">
                                Scroll to reveal
                            </p>
                        </div>
                    </div>

                    {/* Chalet Features */}
                    <div className="space-y-8">
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow">
                            Luxury Awaits
                        </h2>

                        <p className="font-body text-lg text-white/90 text-shadow">
                            After conquering the slopes, retreat to your private sanctuary. Our hand-selected chalets blend rustic alpine charm with modern luxury.
                        </p>

                        {/* Amenities Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {amenities.map((amenity, index) => (
                                <div
                                    key={index}
                                    className="amenity-icon glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
                                >
                                    <amenity.icon size={40} className="mx-auto mb-3 text-warm-gold-300" />
                                    <h3 className="font-heading text-lg font-semibold text-white mb-1">
                                        {amenity.label}
                                    </h3>
                                    <p className="font-body text-sm text-white/70">
                                        {amenity.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
