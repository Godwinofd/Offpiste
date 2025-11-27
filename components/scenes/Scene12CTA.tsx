'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import SplineScene from '@/components/ui/SplineScene';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene12CTA() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        const button = buttonRef.current;
        if (!scene) return;

        // Text sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scene,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                pin: true,
            },
        });

        tl.from('#cta-line-1', {
            opacity: 0,
            y: 30,
            duration: 0.5,
        })
            .from(
                '#cta-line-2',
                {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                },
                '+=0.3'
            )
            .from(
                '#cta-button',
                {
                    scale: 0,
                    ease: 'elastic.out(1, 0.5)',
                    duration: 1,
                },
                '+=0.3'
            )
            .from(
                '.social-proof-stat',
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.2,
                },
                '+=0.2'
            );

        // Magnetic button effect
        if (button) {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                });
            };

            button.addEventListener('mousemove', handleMouseMove);
            button.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                button.removeEventListener('mousemove', handleMouseMove);
                button.removeEventListener('mouseleave', handleMouseLeave);
                ScrollTrigger.getAll().forEach((trigger) => {
                    if (trigger.vars.trigger === scene) {
                        trigger.kill();
                    }
                });
            };
        }
    }, []);

    return (
        <section
            id="scene-12"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-charcoal-900 via-ice-blue-900 to-electric-purple relative overflow-hidden"
        >
            {/* Background Landscape */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent z-10" />
                <SplineScene
                    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                    className="w-full h-full opacity-50"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 gap-12">
                {/* CTA Text */}
                <div className="space-y-6">
                    <h2
                        id="cta-line-1"
                        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-snow-100 text-shadow glow"
                    >
                        Your next adventure starts here.
                    </h2>

                    <p
                        id="cta-line-2"
                        className="font-body text-2xl md:text-3xl lg:text-4xl font-light text-snow-200 text-shadow"
                    >
                        Join us on the mountain.
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    id="cta-button"
                    ref={buttonRef}
                    href="/#booking"
                    className="px-12 py-4 bg-gradient-to-r from-ice-blue-600 to-warm-gold-500 rounded-full font-heading text-xl uppercase tracking-wide text-snow-100 shadow-glow hover:shadow-glow-blue transition-all duration-300 hover:scale-110"
                >
                    Book Your Trip
                </Link>

                {/* Social Proof */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-8">
                    <div className="social-proof-stat">
                        <div className="font-heading text-3xl md:text-4xl font-bold gradient-text">
                            500+
                        </div>
                        <div className="font-body text-sm text-snow-300 uppercase tracking-wide">
                            Adventures Completed
                        </div>
                    </div>

                    <div className="social-proof-stat">
                        <div className="font-heading text-3xl md:text-4xl font-bold gradient-text">
                            4.9★
                        </div>
                        <div className="font-body text-sm text-snow-300 uppercase tracking-wide">
                            Average Rating
                        </div>
                    </div>

                    <div className="social-proof-stat">
                        <div className="font-heading text-3xl md:text-4xl font-bold gradient-text">
                            98%
                        </div>
                        <div className="font-body text-sm text-snow-300 uppercase tracking-wide">
                            Would Recommend
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
