import React, { useState } from 'react';
import { Transformation } from '../types/gym';
import { GymImage } from './GymImage';
import { ArrowLeftRight, CheckCircle2, TrendingUp, Calendar, User } from 'lucide-react';

interface TransformationsProps {
  transformations: Transformation[];
  onOpenBooking: () => void;
}

export const Transformations: React.FC<TransformationsProps> = ({
  transformations,
  onOpenBooking
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)

  const currentStory = transformations[activeStoryIndex] || transformations[0];

  return (
    <section id="transformations" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Real Proof · Quantified Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Before & After Transformations
          </h2>
          <p className="text-sm text-zinc-400">
            Every physique transformation is backed by verified biometric InBody scans and consistent periodized training.
          </p>

          {/* Member Selection Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {transformations.map((trans, idx) => (
              <button
                key={trans.id}
                onClick={() => {
                  setActiveStoryIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeStoryIndex === idx
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {trans.memberName} ({trans.duration})
              </button>
            ))}
          </div>
        </div>

        {/* Transformation Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10">
          {/* Interactive Before/After Split Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-700/80 select-none bg-zinc-950">
              {/* After Image (Full background) */}
              <div className="absolute inset-0 w-full h-full">
                <GymImage
                  src={currentStory.afterImage}
                  alt={`${currentStory.memberName} After`}
                  fallbackTitle="After Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider font-display z-10 shadow-lg">
                  AFTER
                </div>
              </div>

              {/* Before Image (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="w-full h-full relative" style={{ width: '100%' }}>
                  <GymImage
                    src={currentStory.beforeImage}
                    alt={`${currentStory.memberName} Before`}
                    fallbackTitle="Before Transformation"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute top-4 left-4 bg-zinc-900/90 text-zinc-200 border border-zinc-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider font-display z-10">
                    BEFORE
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl z-20 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl border-2 border-red-600 pointer-events-auto">
                  <ArrowLeftRight className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>

            {/* Interactive Slider Input */}
            <div className="space-y-1.5 px-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                <span>← Slide to reveal Before</span>
                <span className="text-red-400 font-semibold">{sliderPosition}% Ratio</span>
                <span>Slide to reveal After →</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full accent-red-600 cursor-ew-resize h-1.5 bg-zinc-800 rounded-lg"
                aria-label="Before after comparison slider"
              />
            </div>
          </div>

          {/* Right Metrics & Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                <Calendar className="w-4 h-4" />
                <span>{currentStory.duration} Case Study</span>
              </div>
              <h3 className="text-3xl font-bold text-white uppercase font-display">
                {currentStory.memberName}, {currentStory.age}
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Protocol: <span className="text-zinc-200">{currentStory.program}</span>
              </p>
            </div>

            {/* Biometric Data Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Starting Weight</span>
                <p className="text-base font-bold text-zinc-300 font-display tabular-nums">
                  {currentStory.startingWeight}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Current Weight</span>
                <p className="text-base font-bold text-white font-display tabular-nums">
                  {currentStory.currentWeight}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 col-span-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Body Fat & Recomposition</span>
                <p className="text-lg font-bold text-red-400 font-display flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{currentStory.bodyFatChange}</span>
                </p>
              </div>
            </div>

            {/* Testimonial Story */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{currentStory.story}"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                <span>Coached by: <strong className="text-zinc-200">{currentStory.trainer}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Member
                </span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all shadow-lg shadow-red-600/30 cursor-pointer"
            >
              Start Your Own Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
