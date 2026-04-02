'use client';

import React from 'react';
import MorphPaperbag from '@/components/demos/MorphPaperbag';

/**
 * High-Fidelity Cinematic Demo Page
 * Focused on full-viewport immersion and PowerPoint-style Morph transitions.
 */
export default function PaperbagMorphPage() {
    return (
        <div className="w-full h-screen bg-[#FBFBFB]">
            <MorphPaperbag />
        </div>
    );
}
