'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
    { id: 1, title: 'Powder Day', category: 'action', size: 'large' },
    { id: 2, title: 'Summit Sunrise', category: 'landscape', size: 'medium' },
    { id: 3, title: 'Cozy Chalet', category: 'interior', size: 'small' },
    { id: 4, title: 'Après-Ski', category: 'culture', size: 'medium' },
    { id: 5, title: 'Backcountry', category: 'action', size: 'large' },
    { id: 6, title: 'Mountain View', category: 'landscape', size: 'small' },
    { id: 7, title: 'Fresh Tracks', category: 'action', size: 'medium' },
    { id: 8, title: 'Alpine Village', category: 'culture', size: 'small' },
];

export default function Scene06Gallery() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [rotations, setRotations] = useState<number[]>([]);

    useEffect(() => {
        // Generate random rotations only on client-side to avoid hydration mismatch
        setRotations(galleryItems.map(() => gsap.utils.random(-2, 2)));
    }, []);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const items = scene.querySelectorAll('.gallery-item');

        items.forEach((item, index) => {
            // Stagger item appearance
            gsap.from(item, {
                opacity: 0,
                y: 50,
                rotation: gsap.utils.random(-5, 5),
                scrollTrigger: {
                    trigger: scene,
                    start: `${10 + index * 5}% top`,
                    end: `${20 + index * 5}% top`,
                    scrub: 1,
                },
            });

            // Parallax effect based on data-speed
            const speed = parseFloat((item as HTMLElement).dataset.speed || '1');
            gsap.to(item, {
                y: -100 * speed,
                scrollTrigger: {
                    trigger: scene,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
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
            id="scene-06"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-charcoal-900 to-ice-blue-900 py-20"
        >
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text">
                    Experience Gallery
                </h2>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-item break-inside-avoid group cursor-pointer"
                            data-speed={1 + (index % 3) * 0.3}
                            style={{
                                transform: rotations[index] ? `rotate(${rotations[index]}deg)` : 'none',
                            }}
                        >
                            {/* Polaroid frame */}
                            <div className="bg-white p-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-glow">
                                {/* Image */}
                                <div
                                    className={`relative mb-3 overflow-hidden rounded-sm ${item.size === 'large'
                                        ? 'h-80'
                                        : item.size === 'medium'
                                            ? 'h-60'
                                            : 'h-40'
                                        }`}
                                >
                                    <Image
                                        src={`https://source.unsplash.com/random/800x600?skiing,${item.category},${index}`}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>

                                {/* Caption */}
                                <div className="text-center">
                                    <h3 className="font-heading text-lg text-charcoal-900 font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-xs text-charcoal-700 uppercase tracking-wide">
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
