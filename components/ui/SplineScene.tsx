'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

interface SplineSceneProps {
    scene: string;
    className?: string;
    fallback?: React.ReactNode;
}

export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    function onLoad() {
        setIsLoading(false);
    }

    function onError() {
        setError(true);
        setIsLoading(false);
    }

    if (error && fallback) {
        return <>{fallback}</>;
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
            )}

            <Suspense fallback={null}>
                {/* <Spline
                    scene={scene}
                    onLoad={onLoad}
                    onError={onError}
                    className="w-full h-full"
                /> */}
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <p className="text-white/50 font-heading">3D Scene Placeholder (Dependency Error)</p>
                </div>
            </Suspense>
        </div>
    );
}
