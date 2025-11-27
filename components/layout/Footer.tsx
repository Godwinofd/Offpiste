'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        trips: [
            { label: 'Backcountry Expeditions', href: '/trips/backcountry' },
            { label: 'Luxury Chalet Retreats', href: '/trips/luxury-chalet' },
            { label: 'Heli-Ski Adventures', href: '/trips/heli-ski' },
            { label: 'Ski & Culture Tours', href: '/trips/culture-tours' },
        ],
        company: [
            { label: 'Our Story', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/contact' },
            { label: 'FAQ', href: '/faq' },
        ],
        legal: [
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Cancellation Policy', href: '/cancellation' },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: 'https://instagram.com/offpiste', label: 'Instagram' },
        { icon: Facebook, href: 'https://facebook.com/offpiste', label: 'Facebook' },
        { icon: Youtube, href: 'https://youtube.com/offpiste', label: 'YouTube' },
    ];

    return (
        <footer className="relative bg-charcoal-900 border-t border-white/10">
            {/* Mountain silhouette divider */}
            <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                <svg
                    className="absolute bottom-0 w-full h-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 L200,80 L400,40 L600,90 L800,30 L1000,70 L1200,20 L1200,120 L0,120 Z"
                        fill="currentColor"
                        className="text-charcoal-900"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <h3 className="font-heading text-2xl font-bold gradient-text mb-4">
                            OFFPISTE
                        </h3>
                        <p className="text-snow-300 text-sm mb-6">
                            Where Adventure Meets Elevation. Immersive ski experiences in the world's most stunning mountains.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-snow-100 hover:bg-warm-gold-500 hover:text-deep-black transition-all duration-300 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Trips Column */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-snow-100 mb-4">
                            Trips
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.trips.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-snow-300 text-sm hover:text-warm-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-snow-100 mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-snow-300 text-sm hover:text-warm-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-snow-100 mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-snow-300 text-sm">
                                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                                <a href="mailto:adventures@offpiste.com" className="hover:text-warm-gold-400 transition-colors">
                                    adventures@offpiste.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-snow-300 text-sm">
                                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                                <a href="tel:+15551234567" className="hover:text-warm-gold-400 transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-snow-300 text-sm">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                <span>Mountain Time Zone</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-snow-300 text-sm">
                            © {currentYear} Offpiste Adventures. All rights reserved.
                        </p>

                        <div className="flex gap-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-snow-300 text-sm hover:text-warm-gold-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
