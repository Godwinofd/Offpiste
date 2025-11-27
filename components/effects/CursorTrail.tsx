'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function CursorTrail() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over interactive elements
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('button, a, input, textarea, .cursor-pointer');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    useEffect(() => {
        gsap.to('.cursor-dot', {
            x: position.x,
            y: position.y,
            duration: 0.1,
            ease: 'power2.out'
        });

        gsap.to('.cursor-ring', {
            x: position.x,
            y: position.y,
            duration: 0.5,
            ease: 'power2.out'
        });
    }, [position]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-difference">
            {/* Main Dot */}
            <div
                className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
            />

            {/* Trailing Ring */}
            <div
                className={`cursor-ring fixed top-0 left-0 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isHovering ? 'w-12 h-12 opacity-100 bg-white/20' : 'w-8 h-8 opacity-50'
                    }`}
            />
        </div>
    );
}
