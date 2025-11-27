'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const scenes = [
    { id: 1, label: 'Hero' },
    { id: 2, label: 'Problem' },
    { id: 3, label: 'Vision' },
    { id: 4, label: 'Trips' },
    { id: 5, label: 'Map' },
    { id: 6, label: 'Gallery' },
    { id: 7, label: 'Chalet' },
    { id: 8, label: 'Equipment' },
    { id: 9, label: 'Weather' },
    { id: 10, label: 'Stories' },
    { id: 11, label: 'Booking' },
    { id: 12, label: 'CTA' },
];

export default function ScrollProgress() {
    const [activeScene, setActiveScene] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Update scroll progress
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Create ScrollTriggers for each scene
        scenes.forEach((scene) => {
            ScrollTrigger.create({
                trigger: `#scene-${String(scene.id).padStart(2, '0')}`,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveScene(scene.id),
                onEnterBack: () => setActiveScene(scene.id),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            {/* Progress Bar */}
            <div className="relative w-1 h-96 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-ice-blue-500 to-warm-gold-400 transition-all duration-300 ease-out"
                    style={{ height: `${scrollProgress}%` }}
                />
            </div>

            {/* Scene Dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-between py-2">
                {scenes.map((scene) => (
                    <button
                        key={scene.id}
                        onClick={() => {
                            const element = document.getElementById(`scene-${String(scene.id).padStart(2, '0')}`);
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative"
                        aria-label={`Go to ${scene.label}`}
                    >
                        <div
                            className={cn(
                                'w-3 h-3 rounded-full transition-all duration-300',
                                activeScene === scene.id
                                    ? 'bg-warm-gold-400 scale-150 shadow-glow'
                                    : 'bg-white/30 hover:bg-white/50 hover:scale-125'
                            )}
                        />

                        {/* Tooltip */}
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="glass-card px-3 py-1 whitespace-nowrap">
                                <span className="text-xs font-body text-snow-100">{scene.label}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
