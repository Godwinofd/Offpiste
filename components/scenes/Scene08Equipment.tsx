'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Info, Snowflake, Wind, Shield } from 'lucide-react';
import SplineScene from '@/components/ui/SplineScene';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const gearItems = [
    {
        id: 'skis',
        name: 'Offpiste Pro 108',
        type: 'Freeride Skis',
        description: 'Carbon-reinforced core for maximum float and stability in deep powder.',
        stats: { weight: '1.8kg', width: '108mm', flex: 'Stiff' },
        icon: Snowflake,
    },
    {
        id: 'boots',
        name: 'Summit Seeker 130',
        type: 'Touring Boots',
        description: 'Lightweight uphill performance with uncompromising downhill power.',
        stats: { weight: '1.2kg', flex: '130', range: '60°' },
        icon: Wind,
    },
    {
        id: 'safety',
        name: 'Avalanche Airbag',
        type: 'Safety Gear',
        description: 'Essential backcountry protection with rapid inflation system.',
        stats: { volume: '30L', weight: '2.1kg', system: 'Electric' },
        icon: Shield,
    },
];

export default function Scene08Equipment() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [activeItem, setActiveItem] = useState(gearItems[0]);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Gear reveal animation
        gsap.from('.gear-display', {
            scale: 0.8,
            opacity: 0,
            rotationY: 45,
            scrollTrigger: {
                trigger: scene,
                start: '20% top',
                end: '50% top',
                scrub: 1,
            },
        });

        // Tech specs stagger
        gsap.from('.tech-spec', {
            x: 50,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: scene,
                start: '40% top',
                end: '60% top',
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
            id="scene-08"
            ref={sceneRef}
            className="scene cinematic-container bg-charcoal-900 relative overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

                {/* Gear Selector */}
                <div className="w-full lg:w-1/3 space-y-4">
                    <h2 className="font-heading text-4xl md:text-5xl gradient-text mb-8">
                        Premium Gear
                    </h2>

                    <div className="space-y-4">
                        {gearItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveItem(item)}
                                className={`w-full p-6 rounded-lg border transition-all duration-300 flex items-center gap-4 text-left group ${activeItem.id === item.id
                                        ? 'bg-ice-blue-900/50 border-ice-blue-500 shadow-glow-blue'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <div className={`p-3 rounded-full ${activeItem.id === item.id ? 'bg-ice-blue-500 text-white' : 'bg-white/10 text-snow-300'
                                    }`}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h3 className={`font-heading text-xl ${activeItem.id === item.id ? 'text-white' : 'text-snow-300'
                                        }`}>
                                        {item.name}
                                    </h3>
                                    <p className="font-body text-xs text-snow-400 uppercase tracking-wide">
                                        {item.type}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Display */}
                <div className="w-full lg:w-2/3 relative h-[600px] flex items-center justify-center">
                    <div className="gear-display relative w-full h-full glass-card border-ice-blue-500/30 flex items-center justify-center overflow-hidden">

                        {/* Spline 3D Model */}
                        <div className="absolute inset-0 z-0">
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HvC9y-5s/scene.splinecode"
                                className="w-full h-full scale-125"
                            />
                        </div>

                        {/* Hotspots Overlay */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-warm-gold-500 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-125 transition-transform shadow-glow animate-pulse">
                                <Info size={16} className="text-white" />
                            </div>
                        </div>

                        {/* Tech Specs Overlay */}
                        <div className="absolute top-8 right-8 space-y-4 z-20 pointer-events-none">
                            {Object.entries(activeItem.stats).map(([key, value], index) => (
                                <div key={key} className="tech-spec glass-card p-4 min-w-[150px]">
                                    <p className="font-body text-xs text-ice-blue-400 uppercase tracking-wider mb-1">
                                        {key}
                                    </p>
                                    <p className="font-heading text-xl text-white">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="absolute bottom-8 left-8 right-8 glass-card p-6 bg-black/60 backdrop-blur-xl z-20 pointer-events-none">
                            <p className="font-body text-lg text-snow-100">
                                {activeItem.description}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
