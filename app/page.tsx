'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import FilmGrain from '@/components/effects/FilmGrain';
import { initGSAP } from '@/lib/gsap-config';
import { Loader2 } from 'lucide-react';

// Loading fallback
const SceneLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-deep-black">
    <Loader2 className="w-8 h-8 text-warm-gold-500 animate-spin" />
  </div>
);

// Lazy load scenes
const Scene01Hero = dynamic(() => import('@/components/scenes/Scene01Hero'), { loading: () => <SceneLoader /> });
const Scene02Problem = dynamic(() => import('@/components/scenes/Scene02Problem'));
const Scene03Vision = dynamic(() => import('@/components/scenes/Scene03Vision'));
const Scene04TripTypes = dynamic(() => import('@/components/scenes/Scene04TripTypes'));
const Scene05Map = dynamic(() => import('@/components/scenes/Scene05Map'));
const Scene06Gallery = dynamic(() => import('@/components/scenes/Scene06Gallery'));
const Scene07Chalet = dynamic(() => import('@/components/scenes/Scene07Chalet'));
const Scene08Equipment = dynamic(() => import('@/components/scenes/Scene08Equipment'));
const Scene09Weather = dynamic(() => import('@/components/scenes/Scene09Weather'));
const Scene10Testimonials = dynamic(() => import('@/components/scenes/Scene10Testimonials'));
const Scene11Booking = dynamic(() => import('@/components/scenes/Scene11Booking'));
const Scene12CTA = dynamic(() => import('@/components/scenes/Scene12CTA'));

export default function Home() {
  useEffect(() => {
    // Initialize GSAP on mount
    initGSAP();
  }, []);

  return (
    <main className="relative">
      {/* Global Effects */}
      <FilmGrain opacity={0.03} />

      {/* Layout Components */}
      <Header />
      <ScrollProgress />

      {/* Cinematic Scroll Scenes */}
      <Scene01Hero />
      <Scene02Problem />
      <Scene03Vision />
      <Scene04TripTypes />
      <Scene05Map />
      <Scene06Gallery />
      <Scene07Chalet />
      <Scene08Equipment />
      <Scene09Weather />
      <Scene10Testimonials />
      <Scene11Booking />
      <Scene12CTA />

      <Footer />
    </main >
  );
}
