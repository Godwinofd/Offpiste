'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const checkpoints = [
    { id: 1, label: 'Base Camp', elevation: '1,200m', day: 'Day 1', description: 'Arrival & Orientation' },
    { id: 2, label: 'Alpine Meadow', elevation: '1,800m', day: 'Day 2-3', description: 'Acclimatization' },
    { id: 3, label: 'Tree Line', elevation: '2,400m', day: 'Day 4-5', description: 'Alpine Zone' },
    { id: 4, label: 'Summit Ridge', elevation: '3,200m', day: 'Day 6', description: 'The Push' },
    { id: 5, label: 'Peak', elevation: '3,800m', day: 'Day 7', description: 'Summit Day' },
];

export default function Scene05Map() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const scene = sceneRef.current;
        const path = pathRef.current;
        if (!scene || !path) return;

        // Get path length for animation
        const pathLength = path.getTotalLength();

        // Set initial state
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        });

        // Animate path drawing
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: scene,
                start: '10% top',
                end: '80% top',
                scrub: 1,
            },
        });

        // Animate checkpoints
        checkpoints.forEach((checkpoint, index) => {
            const progress = 10 + (index * 70) / (checkpoints.length - 1);

            // Dot scale in
            gsap.from(`#checkpoint-${checkpoint.id} .dot`, {
                scale: 0,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: scene,
                    start: `${progress}% top`,
                    end: `${progress + 5}% top`,
                    scrub: 1,
                },
            });

            // Label fade in
            gsap.from(`#checkpoint-${checkpoint.id} .label`, {
                opacity: 0,
                x: -20,
                scrollTrigger: {
                    trigger: scene,
                    start: `${progress}% top`,
                    end: `${progress + 5}% top`,
                    scrub: 1,
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
            id="scene-05"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-ice-blue-900 to-charcoal-900 relative"
        >
            {/* Background mountain */}
            <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <path
                        d="M0,800 L200,400 L400,500 L600,200 L800,450 L1000,300 L1200,500 L1200,800 Z"
                        fill="#1e3a8a"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                {/* SVG Path */}
                <div className="w-full md:w-1/2 h-[600px] relative">
                    <svg viewBox="0 0 400 600" className="w-full h-full">
                        {/* Path */}
                        <path
                            ref={pathRef}
                            d="M 200 580 Q 150 500 180 420 Q 210 340 160 260 Q 110 180 140 100 L 200 20"
                            fill="none"
                            stroke="url(#path-gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="path-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#fbbf24" />
                            </linearGradient>
                        </defs>

                        {/* Checkpoints */}
                        {checkpoints.map((checkpoint, index) => {
                            const positions = [
                                { x: 200, y: 580 },
                                { x: 180, y: 420 },
                                { x: 160, y: 260 },
                                { x: 140, y: 100 },
                                { x: 200, y: 20 },
                            ];
                            const pos = positions[index];

                            return (
                                <g key={checkpoint.id} id={`checkpoint-${checkpoint.id}`}>
                                    {/* Pulsing dot */}
                                    <circle className="dot" cx={pos.x} cy={pos.y} r="8" fill="#fbbf24">
                                        <animate
                                            attributeName="r"
                                            values="8;12;8"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="1;0.5;1"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle cx={pos.x} cy={pos.y} r="4" fill="#fff" />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Checkpoint Labels */}
                <div className="w-full md:w-1/2 space-y-8">
                    {checkpoints.map((checkpoint) => (
                        <div
                            key={checkpoint.id}
                            id={`checkpoint-${checkpoint.id}`}
                            className="label glass-card p-6 hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-heading text-2xl font-bold gradient-text">
                                    {checkpoint.label}
                                </h3>
                                <span className="font-body text-sm text-warm-gold-400">
                                    {checkpoint.elevation}
                                </span>
                            </div>
                            <p className="font-body text-sm text-ice-blue-400 mb-2">
                                {checkpoint.day}
                            </p>
                            <p className="font-body text-snow-300">
                                {checkpoint.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
