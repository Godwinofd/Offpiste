'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
    {
        id: 1,
        name: 'Sarah Mitchell',
        location: 'Colorado, USA',
        trip: 'Backcountry Expedition',
        rating: 5,
        quote: 'The most incredible ski experience of my life. The guides knew every inch of the terrain, and the powder was endless.',
        date: 'March 2024',
    },
    {
        id: 2,
        name: 'James Chen',
        location: 'Vancouver, Canada',
        trip: 'Heli-Ski Adventure',
        rating: 5,
        quote: 'Absolutely mind-blowing. From the helicopter ride to the untouched slopes, every moment exceeded expectations.',
        date: 'February 2024',
    },
    {
        id: 3,
        name: 'Emma Larsson',
        location: 'Stockholm, Sweden',
        trip: 'Luxury Chalet Retreat',
        rating: 5,
        quote: 'Perfect blend of adventure and comfort. The chalet was stunning, the food was incredible, and the skiing was world-class.',
        date: 'January 2024',
    },
];

export default function Scene10Testimonials() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Book entrance
        gsap.from('#storybook', {
            scale: 0.5,
            opacity: 0,
            rotation: -10,
            scrollTrigger: {
                trigger: scene,
                start: '20% top',
                end: '40% top',
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

    const nextPage = () => {
        if (currentPage < testimonials.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentTestimonial = testimonials[currentPage];

    return (
        <section
            id="scene-10"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-charcoal-900 to-ice-blue-900"
        >
            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text">
                    Traveler Stories
                </h2>

                {/* Storybook */}
                <div
                    id="storybook"
                    className="relative bg-gradient-to-br from-warm-gold-600 to-warm-gold-400 p-2 rounded-lg shadow-2xl"
                    style={{
                        transform: 'perspective(1000px) rotateY(-2deg)',
                    }}
                >
                    {/* Book pages */}
                    <div className="bg-gradient-to-br from-snow-100 to-snow-200 p-12 rounded-md relative min-h-[500px] flex flex-col justify-between">
                        {/* Page texture overlay */}
                        <div
                            className="absolute inset-0 opacity-10 rounded-md pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(currentTestimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} fill="#f59e0b" stroke="#f59e0b" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="font-body text-xl md:text-2xl text-charcoal-900 mb-8 italic leading-relaxed">
                                "{currentTestimonial.quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="border-t-2 border-charcoal-900/20 pt-6">
                                <p className="font-heading text-2xl font-bold text-charcoal-900 mb-1">
                                    {currentTestimonial.name}
                                </p>
                                <p className="font-body text-sm text-charcoal-700 mb-1">
                                    {currentTestimonial.location}
                                </p>
                                <p className="font-body text-sm text-ice-blue-600 font-semibold mb-2">
                                    {currentTestimonial.trip}
                                </p>
                                <p className="font-body text-xs text-charcoal-600">
                                    {currentTestimonial.date}
                                </p>
                            </div>
                        </div>

                        {/* Page number */}
                        <div className="text-center font-body text-sm text-charcoal-600">
                            Page {currentPage + 1} of {testimonials.length}
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-warm-gold-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-warm-gold-600 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextPage}
                        disabled={currentPage === testimonials.length - 1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-warm-gold-500 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-warm-gold-600 transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
