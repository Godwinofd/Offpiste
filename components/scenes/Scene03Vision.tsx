'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplineScene from '@/components/ui/SplineScene';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene03Vision() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Background color transition
        gsap.to(scene, {
            background: 'radial-gradient(circle at center, #fbbf24, #f59e0b)',
            scrollTrigger: {
                trigger: scene,
                start: 'top top',
                end: '20% top',
                scrub: 1,
            },
        });

        // Compass entrance (placeholder)
        gsap.from('#compass-placeholder', {
            scale: 0,
            rotation: -180,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: scene,
                start: '30% top',
                end: '50% top',
                scrub: 1,
            },
        });

        // Continuous rotation
        gsap.to('#compass-placeholder', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'none',
        });

        // Text reveals
        gsap.from('#vision-line-1', {
            opacity: 0,
            y: 30,
            scrollTrigger: {
                trigger: scene,
                start: '50% top',
                end: '60% top',
                scrub: 1,
            },
        });

        gsap.from('#vision-line-2', {
            opacity: 0,
            y: 30,
            scrollTrigger: {
                trigger: scene,
                start: '70% top',
                end: '80% top',
                scrub: 1,
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
            id="scene-03"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-ice-blue-900 to-warm-gold-500 transition-all duration-1000 relative overflow-hidden"
        >
            {/* Radial glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-warm-gold-300/30 via-transparent to-transparent" />

            {/* Light rays */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-warm-gold-100 to-transparent"
                        style={{
                            transform: `rotate(${i * 45}deg) translateX(-50%)`,
                            transformOrigin: 'center',
                        }}
                    />
                ))}
            </div>

            {/* Background Compass/Map Element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
                <SplineScene
                    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                    className="w-full h-full animate-spin-slow"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 gap-12">
                {/* Compass placeholder (will be replaced with Spline) */}
                <div
                    id="compass-placeholder"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-warm-gold-600 bg-warm-gold-500/20 backdrop-blur-sm flex items-center justify-center shadow-glow"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-warm-gold-600 flex items-center justify-center">
                        <div className="w-1 h-8 md:h-10 bg-snow-100 rounded-full" />
                    </div>
                </div>

                {/* Vision text */}
                <div className="space-y-8">
                    <h2
                        id="vision-line-1"
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-snow-100 text-shadow max-w-3xl"
                    >
                        We believe ski adventures should feel alive.
                    </h2>

                    <p
                        id="vision-line-2"
                        className="font-body text-2xl md:text-3xl lg:text-4xl font-light text-snow-100 text-shadow"
                    >
                        Immersive. Real. Unforgettable.
                    </p>
                </div>
            </div>
        </section>
    );
}
