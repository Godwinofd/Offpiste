'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP Configuration
 * Sets up global defaults and custom easing curves
 */

// Global defaults
gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
});

// Custom easing curves
export const customEases = {
    cinematic: 'power3.inOut',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)',
    smooth: 'power2.inOut',
    slowStart: 'power4.out',
};

/**
 * Initialize GSAP with reduced motion detection
 */
export function initGSAP() {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        gsap.globalTimeline.timeScale(100); // Make animations instant
        ScrollTrigger.config({ autoRefreshEvents: 'none' });
    }

    // ScrollTrigger defaults
    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
    });

    // Refresh ScrollTrigger on resize (debounced)
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

/**
 * Cleanup all ScrollTriggers
 */
export function cleanupScrollTriggers() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Create a scroll-triggered animation
 */
export function createScrollAnimation(
    trigger: string | HTMLElement,
    animation: gsap.TweenVars,
    options?: ScrollTrigger.Vars
) {
    return gsap.to(trigger, {
        ...animation,
        scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            ...options,
        },
    });
}

/**
 * Create a pinned scene animation
 */
export function createPinnedScene(
    sceneId: string,
    animations: gsap.TweenVars[],
    options?: Partial<ScrollTrigger.Vars>
) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: `#${sceneId}`,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            ...options,
        },
    });

    animations.forEach((anim) => {
        tl.to(anim.targets || `#${sceneId}`, anim);
    });

    return tl;
}

/**
 * Stagger animation helper
 */
export function staggerAnimation(
    targets: string | HTMLElement[],
    animation: gsap.TweenVars,
    staggerAmount: number = 0.1
) {
    return gsap.from(targets, {
        ...animation,
        stagger: staggerAmount,
    });
}

/**
 * Magnetic button effect
 */
export function magneticButton(
    buttonSelector: string,
    strength: number = 0.3
) {
    if (typeof window === 'undefined') return;

    const button = document.querySelector(buttonSelector) as HTMLElement;
    if (!button) return;

    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    });
}

/**
 * React hook for GSAP initialization
 */
export function useGSAPInit() {
    useEffect(() => {
        initGSAP();

        return () => {
            cleanupScrollTriggers();
        };
    }, []);
}

export { gsap, ScrollTrigger };
