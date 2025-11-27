'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Mountain, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    { id: 1, title: 'Choose Your Trip', icon: Mountain },
    { id: 2, title: 'Select Dates', icon: Calendar },
    { id: 3, title: 'Group Size', icon: Users },
    { id: 4, title: 'Confirm', icon: Check },
];

export default function Scene11Booking() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        tripType: '',
        startDate: '',
        groupSize: 1,
    });

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Form entrance
        gsap.from('#booking-form', {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: scene,
                start: '20% top',
                end: '40% top',
                scrub: 1,
            },
        });

        // Progress bar animation
        gsap.to('#progress-bar', {
            width: `${(currentStep / steps.length) * 100}%`,
            duration: 0.5,
            ease: 'power2.out',
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === scene) {
                    trigger.kill();
                }
            });
        };
    }, [currentStep]);

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <section
            id="scene-11"
            ref={sceneRef}
            className="scene cinematic-container bg-gradient-to-b from-ice-blue-900 to-charcoal-900"
        >
            {/* Content */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 gradient-text">
                    Book Your Adventure
                </h2>

                {/* Booking Form */}
                <div id="booking-form" className="glass-card p-8 md:p-12">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex justify-between mb-4">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`flex flex-col items-center ${step.id <= currentStep ? 'opacity-100' : 'opacity-40'
                                        } transition-opacity duration-300`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${step.id === currentStep
                                                ? 'bg-warm-gold-500 scale-110 shadow-glow'
                                                : step.id < currentStep
                                                    ? 'bg-ice-blue-600'
                                                    : 'bg-white/20'
                                            }`}
                                    >
                                        <step.icon size={24} className="text-white" />
                                    </div>
                                    <span className="font-body text-xs text-snow-300 text-center hidden md:block">
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                id="progress-bar"
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-ice-blue-500 to-warm-gold-400 rounded-full transition-all duration-500"
                                style={{ width: `${(currentStep / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Form Steps */}
                    <div className="min-h-[300px]">
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl font-semibold text-snow-100 mb-6">
                                    Choose Your Trip Type
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Backcountry Expedition', 'Luxury Chalet', 'Heli-Ski', 'Culture Tour'].map(
                                        (trip) => (
                                            <button
                                                key={trip}
                                                onClick={() => setFormData({ ...formData, tripType: trip })}
                                                className={`p-6 rounded-lg border-2 transition-all duration-300 ${formData.tripType === trip
                                                        ? 'border-warm-gold-400 bg-warm-gold-400/20 scale-105'
                                                        : 'border-white/20 bg-white/5 hover:border-white/40'
                                                    }`}
                                            >
                                                <span className="font-body text-snow-100">{trip}</span>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl font-semibold text-snow-100 mb-6">
                                    Select Your Dates
                                </h3>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full p-4 rounded-lg bg-white/10 border-2 border-white/20 text-snow-100 font-body focus:border-warm-gold-400 focus:outline-none transition-colors"
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="font-heading text-2xl font-semibold text-snow-100 mb-6">
                                    Group Size
                                </h3>
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={formData.groupSize}
                                    onChange={(e) =>
                                        setFormData({ ...formData, groupSize: parseInt(e.target.value) })
                                    }
                                    className="w-full p-4 rounded-lg bg-white/10 border-2 border-white/20 text-snow-100 font-body text-2xl text-center focus:border-warm-gold-400 focus:outline-none transition-colors"
                                />
                                <p className="text-center font-body text-sm text-snow-300">
                                    Number of participants (1-12)
                                </p>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-warm-gold-500 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                                    <Check size={40} className="text-white" />
                                </div>
                                <h3 className="font-heading text-3xl font-bold text-snow-100">
                                    Almost There!
                                </h3>
                                <div className="glass-card p-6 text-left">
                                    <p className="font-body text-snow-300 mb-2">
                                        <strong className="text-warm-gold-400">Trip:</strong> {formData.tripType}
                                    </p>
                                    <p className="font-body text-snow-300 mb-2">
                                        <strong className="text-warm-gold-400">Date:</strong> {formData.startDate}
                                    </p>
                                    <p className="font-body text-snow-300">
                                        <strong className="text-warm-gold-400">Group Size:</strong>{' '}
                                        {formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}
                                    </p>
                                </div>
                                <button className="px-12 py-4 bg-gradient-to-r from-ice-blue-600 to-warm-gold-500 rounded-full font-heading text-xl uppercase tracking-wide text-snow-100 shadow-glow hover:shadow-glow-blue transition-all duration-300 hover:scale-110">
                                    Complete Booking
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 rounded-full border-2 border-white/20 font-body text-snow-100 disabled:opacity-30 disabled:cursor-not-allowed hover:border-warm-gold-400 hover:text-warm-gold-400 transition-all duration-300"
                        >
                            ← Back
                        </button>

                        {currentStep < steps.length && (
                            <button
                                onClick={nextStep}
                                className="px-6 py-3 rounded-full bg-warm-gold-500 font-body text-white hover:bg-warm-gold-600 transition-all duration-300 hover:scale-105"
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
