'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import SnowParticles from '@/components/effects/SnowParticles';
import WindParallax from '@/components/effects/WindParallax';
import SplineScene from '@/components/ui/SplineScene';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene01Hero() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        const text = textRef.current;

        if (!scene || !text) return;

        // Logo Reveal Animation
        const logoChars = text.querySelectorAll('.char');
        gsap.fromTo(
            logoChars,
            {
                y: 100,
                opacity: 0,
                rotateX: -90
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: 'back.out(1.7)',
                delay: 0.5,
            }
        );

        // Tagline Fade In
        gsap.fromTo(
            '.tagline',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: 'power2.out' }
        );

        // Scroll Indicator Pulse
        gsap.to('.scroll-indicator', {
            y: 10,
            opacity: 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

        // Parallax Effect on Scroll
        gsap.to(scene, {
            opacity: 0,
            scale: 0.95,
            scrollTrigger: {
                trigger: scene,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
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

    // Split text for animation
    const logoText = "OFFPISTE";

    return (
        <section
            id="scene-01"
            ref={sceneRef}
            className="scene h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-deep-black to-charcoal-900"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <WindParallax intensity={20}>
                    {/* Spline Mountain Scene */}
                    <div className="absolute inset-0 opacity-60">
                        <SplineScene
                            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                </WindParallax>

                <SnowParticles count={100} />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4">
                <div ref={textRef} className="overflow-hidden mb-4">
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-snow-400">
                        {logoText.split('').map((char, i) => (
                            <span key={i} className="char inline-block origin-bottom">
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>

                <p className="tagline font-body text-lg md:text-xl text-snow-200 tracking-widest uppercase opacity-0">
                    Where Adventure Meets Elevation
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-snow-400">
                <span className="text-xs uppercase tracking-widest">Scroll to begin</span>
                <ChevronDown size={24} />
            </div>
        </section>
    );
}
