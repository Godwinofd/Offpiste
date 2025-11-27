'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CloudSnow, Wind, Thermometer, Sun, Cloud } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Scene09Weather() {
    const sceneRef = useRef<HTMLDivElement>(null);

    // Simulated live weather data
    const [weatherData] = useState({
        temp: -8,
        windSpeed: 15,
        snowfall: 12,
        condition: 'Powder Alert',
        visibility: 'Good'
    });

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Animate weather cards
        gsap.from('.weather-card', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: scene,
                start: '30% top',
                end: '60% top',
                scrub: 1,
            },
        });

        // Animate circular progress
        gsap.to('.progress-ring-circle', {
            strokeDashoffset: 100, // Animate to value
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: scene,
                start: 'top center',
            }
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
            id="scene-09"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-ice-blue-900 to-charcoal-900 relative overflow-hidden"
        >
            {/* Dynamic Background Effects based on weather */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Simulated wind lines */}
                <div className="absolute w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 mb-4 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="font-heading text-sm tracking-wider">LIVE MOUNTAIN REPORT</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
                        Conditions Check
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Temperature Card */}
                    <div className="weather-card glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-ice-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Thermometer size={32} className="text-ice-blue-400" />
                        </div>
                        <span className="font-body text-sm text-snow-300 uppercase tracking-wider mb-2">Temperature</span>
                        <span className="font-heading text-5xl text-white mb-1">{weatherData.temp}°C</span>
                        <span className="font-body text-xs text-ice-blue-300">Feels like -12°C</span>
                    </div>

                    {/* Snowfall Card */}
                    <div className="weather-card glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors border-ice-blue-500/30 shadow-glow-blue">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:rotate-180 transition-transform duration-700">
                            <CloudSnow size={32} className="text-white" />
                        </div>
                        <span className="font-body text-sm text-snow-300 uppercase tracking-wider mb-2">Fresh Snow</span>
                        <span className="font-heading text-5xl text-white mb-1">{weatherData.snowfall}cm</span>
                        <span className="font-body text-xs text-warm-gold-400 font-bold">POWDER ALERT</span>
                    </div>

                    {/* Wind Card */}
                    <div className="weather-card glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-ice-blue-500/20 flex items-center justify-center mb-4 group-hover:translate-x-2 transition-transform">
                            <Wind size={32} className="text-ice-blue-400" />
                        </div>
                        <span className="font-body text-sm text-snow-300 uppercase tracking-wider mb-2">Wind Speed</span>
                        <span className="font-heading text-5xl text-white mb-1">{weatherData.windSpeed}</span>
                        <span className="font-body text-xs text-ice-blue-300">km/h NW</span>
                    </div>

                    {/* Visibility/Forecast */}
                    <div className="weather-card glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-warm-gold-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Sun size={32} className="text-warm-gold-400" />
                        </div>
                        <span className="font-body text-sm text-snow-300 uppercase tracking-wider mb-2">Visibility</span>
                        <span className="font-heading text-4xl text-white mb-2">{weatherData.visibility}</span>
                        <div className="flex gap-2 mt-2">
                            <Cloud size={16} className="text-snow-400" />
                            <Sun size={16} className="text-warm-gold-400" />
                            <CloudSnow size={16} className="text-ice-blue-400" />
                        </div>
                    </div>

                </div>

                {/* Forecast Strip */}
                <div className="mt-8 glass-card p-6 flex justify-between items-center overflow-x-auto">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center min-w-[80px] px-4 border-r border-white/10 last:border-0">
                            <span className="font-body text-xs text-snow-400 mb-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                            </span>
                            <CloudSnow size={20} className="text-white mb-2" />
                            <span className="font-heading text-lg text-white">-{5 + i}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
