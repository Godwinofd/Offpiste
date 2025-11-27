'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilmGrain from '@/components/effects/FilmGrain';
import { initGSAP } from '@/lib/gsap-config';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    useEffect(() => {
        initGSAP();

        gsap.from('.contact-anim', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
        });
    }, []);

    return (
        <main className="relative min-h-screen bg-deep-black text-white pt-24">
            <FilmGrain opacity={0.03} />
            <Header />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Info Side */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="contact-anim font-heading text-5xl md:text-7xl gradient-text mb-6">
                                Get in Touch
                            </h1>
                            <p className="contact-anim font-body text-xl text-snow-300">
                                Ready to plan your next expedition? Our team of mountain experts is here to help you craft the perfect itinerary.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="contact-anim flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-ice-blue-900/50 flex items-center justify-center group-hover:bg-ice-blue-600 transition-colors duration-300">
                                    <Mail className="text-ice-blue-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl text-white mb-1">Email Us</h3>
                                    <p className="font-body text-snow-400">hello@offpiste.com</p>
                                    <p className="font-body text-snow-400">bookings@offpiste.com</p>
                                </div>
                            </div>

                            <div className="contact-anim flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-warm-gold-900/50 flex items-center justify-center group-hover:bg-warm-gold-600 transition-colors duration-300">
                                    <Phone className="text-warm-gold-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl text-white mb-1">Call Us</h3>
                                    <p className="font-body text-snow-400">+1 (555) 123-4567</p>
                                    <p className="font-body text-xs text-snow-500 mt-1">Mon-Fri, 9am - 6pm MST</p>
                                </div>
                            </div>

                            <div className="contact-anim flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                    <MapPin className="text-snow-200 group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl text-white mb-1">Base Camp</h3>
                                    <p className="font-body text-snow-400">123 Alpine Way</p>
                                    <p className="font-body text-snow-400">Aspen, CO 81611</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="contact-anim glass-card p-8 md:p-10">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-heading text-sm text-snow-300 uppercase tracking-wider">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-ice-blue-500 focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-heading text-sm text-snow-300 uppercase tracking-wider">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-ice-blue-500 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-heading text-sm text-snow-300 uppercase tracking-wider">Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-ice-blue-500 focus:outline-none transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="font-heading text-sm text-snow-300 uppercase tracking-wider">Message</label>
                                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-ice-blue-500 focus:outline-none transition-colors"></textarea>
                            </div>

                            <button type="button" className="w-full py-4 bg-gradient-to-r from-ice-blue-600 to-ice-blue-500 rounded-lg font-heading text-lg uppercase tracking-wider text-white hover:shadow-glow-blue transition-all duration-300 flex items-center justify-center gap-2 group">
                                <span>Send Message</span>
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
