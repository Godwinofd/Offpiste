'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene02Problem() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const lines = scene.querySelectorAll('.problem-line');

        lines.forEach((line, index) => {
            // Stagger each line's words
            const words = line.querySelectorAll('.word');

            gsap.from(words, {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: scene,
                    start: `${index * 20 + 20}% top`,
                    end: `${index * 20 + 40}% top`,
                    scrub: 1,
                },
            });

            // Fade previous lines
            if (index > 0) {
                gsap.to(lines[index - 1], {
                    opacity: 0.3,
                    scrollTrigger: {
                        trigger: scene,
                        start: `${index * 20 + 20}% top`,
                        end: `${index * 20 + 30}% top`,
                        scrub: 1,
                    },
                });
            }
        });

        // Fog layer animations
        gsap.to('#fog-layer-1', {
            x: '100%',
            duration: 60,
            repeat: -1,
            ease: 'none',
        });

        gsap.to('#fog-layer-2', {
            x: '-100%',
            duration: 45,
            repeat: -1,
            ease: 'none',
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === scene) {
                    trigger.kill();
                }
            });
        };
    }, []);

    const problemLines = [
        'Most ski websites feel generic.',
        'Static. Outdated. Lifeless.',
        "They don't capture the adventure.",
    ];

    return (
        <section
            id="scene-02"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-charcoal-900 to-ice-blue-900"
        >
            {/* Fog layers */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    id="fog-layer-1"
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-ice-blue-900/10 to-transparent blur-3xl opacity-30"
                />
                <div
                    id="fog-layer-2"
                    className="absolute top-1/4 left-0 w-full h-full bg-gradient-to-r from-transparent via-ice-blue-800/10 to-transparent blur-3xl opacity-20"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 gap-16">
                {problemLines.map((line, index) => (
                    <div key={index} className="problem-line">
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-regular text-snow-100 text-shadow">
                            {line.split(' ').map((word, wordIndex) => (
                                <span key={wordIndex} className="word inline-block mr-3">
                                    {word}
                                </span>
                            ))}
                        </h2>
                    </div>
                ))}
            </div>
        </section>
    );
}
