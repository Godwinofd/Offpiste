'use client';

import { useEffect, useRef } from 'react';
import { randomRange } from '@/lib/utils';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
}

interface SnowParticlesProps {
    count?: number;
    intensity?: 'light' | 'medium' | 'heavy';
    interactive?: boolean;
}

export default function SnowParticles({
    count = 100,
    intensity = 'medium',
    interactive = true,
}: SnowParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    // Adjust count based on intensity
    const particleCount = {
        light: Math.floor(count * 0.5),
        medium: count,
        heavy: Math.floor(count * 1.5),
    }[intensity];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: randomRange(0, canvas.width),
            y: randomRange(-canvas.height, 0),
            size: randomRange(2, 5),
            speedY: randomRange(1, 3),
            speedX: randomRange(-0.5, 0.5),
            opacity: randomRange(0.3, 0.8),
        }));

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        if (interactive) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.y += particle.speedY;
                particle.x += particle.speedX;

                // Interactive: particles avoid cursor
                if (interactive) {
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const avoidRadius = 100;

                    if (distance < avoidRadius) {
                        const force = (avoidRadius - distance) / avoidRadius;
                        particle.x -= (dx / distance) * force * 2;
                        particle.y -= (dy / distance) * force * 2;
                    }
                }

                // Reset particle if it goes off screen
                if (particle.y > canvas.height) {
                    particle.y = -10;
                    particle.x = randomRange(0, canvas.width);
                }
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (interactive) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particleCount, interactive]);

    // Check for reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return null; // Don't render particles if user prefers reduced motion
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            aria-hidden="true"
        />
    );
}
