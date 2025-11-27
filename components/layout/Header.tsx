'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Zap, Coffee } from 'lucide-react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { mode, toggleMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Logo reveal animation on mount
        gsap.from('#logo', {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5,
        });

        // Nav items stagger
        gsap.from('.nav-item', {
            opacity: 0,
            y: -10,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.8,
        });
    }, []);

    const navItems = [
        { href: '/trips', label: 'Trips' },
        { href: '/about', label: 'Our Story' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-deep-black/80 backdrop-blur-md border-b border-white/10'
                    : 'bg-transparent'
            )}
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" id="logo">
                        <h1 className="font-heading text-3xl font-bold tracking-wider gradient-text hover:scale-105 transition-transform">
                            OFFPISTE
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="nav-item font-body text-sm uppercase tracking-wide text-snow-100 hover:text-warm-gold-400 transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-warm-gold-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}

                        {/* Mode Toggle */}
                        <button
                            onClick={toggleMode}
                            className="nav-item flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            title={mode === 'adventure' ? 'Switch to Relax Mode' : 'Switch to Adventure Mode'}
                        >
                            {mode === 'adventure' ? (
                                <>
                                    <Zap size={16} className="text-warm-gold-400" />
                                    <span className="text-xs font-heading uppercase tracking-wider text-white">Adventure</span>
                                </>
                            ) : (
                                <>
                                    <Coffee size={16} className="text-ice-blue-400" />
                                    <span className="text-xs font-heading uppercase tracking-wider text-white">Relax</span>
                                </>
                            )}
                        </button>

                        <Link
                            href="/#booking"
                            className="nav-item px-6 py-2 bg-gradient-to-r from-ice-blue-600 to-warm-gold-500 rounded-full font-body text-sm uppercase tracking-wide text-snow-100 hover:shadow-glow transition-all duration-300 hover:scale-105"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-snow-100 hover:text-warm-gold-400 transition-colors z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-deep-black/95 backdrop-blur-lg z-40 pt-20">
                        <div className="flex flex-col items-center gap-8 p-8">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-heading text-2xl text-snow-100 hover:text-warm-gold-400 transition-colors"
                                    style={{
                                        animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link
                                href="/#booking"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-8 py-3 bg-gradient-to-r from-ice-blue-600 to-warm-gold-500 rounded-full font-body text-sm uppercase tracking-wide text-snow-100 hover:shadow-glow transition-all duration-300"
                                style={{
                                    animation: `slideUp 0.5s ease-out ${navItems.length * 0.1}s both`,
                                }}
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
