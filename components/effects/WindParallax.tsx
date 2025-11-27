'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { throttle } from '@/lib/utils';

interface WindParallaxProps {
    children: ReactNode;
    intensity?: number;
    className?: string;
}

export default function WindParallax({
    children,
    intensity = 1,
    className = '',
}: WindParallaxProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = throttle((e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate offset based on mouse position (centered)
            const xOffset = ((clientX - innerWidth / 2) / innerWidth) * 20 * intensity;
            const yOffset = ((clientY - innerHeight / 2) / innerHeight) * 20 * intensity;

            container.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }, 50);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [intensity]);

    return (
        <div
            ref={containerRef}
            className={`transition-transform duration-300 ease-out ${className}`}
        >
            {children}
        </div>
    );
}
