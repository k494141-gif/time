import React, { useState } from 'react';
import { WorkoutProgram, ProgramCategory } from '../types/gym';
import { GymImage } from './GymImage';
import { Dumbbell, Flame, Zap, Clock, Calendar, Check, X, ArrowRight } from 'lucide-react';

interface ProgramsProps {
  programs: WorkoutProgram[];
  onSelectProgramForBooking: (programName: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({
  programs,
  onSelectProgramForBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProgram, setActiveModalProgram] = useState<WorkoutProgram | null>(null);

  const categories: Array<'All' | ProgramCategory> = [
    'All',
    'Weight Training',
    'Cardio & Conditioning',
    'Muscle Building',
    'Weight Loss',
    'Personal Training'
  ];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Extreme':
        return 'text-red-400 border-red-500/30 bg-red-950/40';
      case 'High':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
      default:
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
    }
  };

  return (
    <section id="programs" className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Evidence-Based Methodologies
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
              Elite Workout Programs
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
              Each discipline is structured around progressive overload, autonomic recovery periods, 
              and biomechanical efficiency.
            </p>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="rounded-xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <GymImage
                  src={prog.image}
                  alt={prog.name}
                  fallbackTitle={prog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Unboxed Metadata Header */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getIntensityColor(prog.intensity)}`}>
                    {prog.intensity} Intensity
                  </span>
                  <span className="text-[11px] font-medium text-zinc-300 bg-zinc-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-zinc-800">
                    {prog.durationWeeks} Weeks
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 text-xs text-red-400 font-semibold uppercase tracking-wider">
                  {prog.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase font-display group-hover:text-red-400 transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-2 border-t border-zinc-800/80 pt-3">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                    Key Outcomes:
                  </div>
                  <ul className="space-y-1.5">
                    {prog.keyBenefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Controls */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    View Syllabus
                  </button>
                  <button
                    onClick={() => onSelectProgramForBooking(prog.name)}
                    className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Enroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Syllabus Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  {activeModalProgram.category} · Protocol Specification
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase font-display mt-1">
                  {activeModalProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/60 hover:bg-zinc-800 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image banner */}
              <div className="aspect-[16/8] rounded-xl overflow-hidden border border-zinc-800">
                <GymImage
                  src={activeModalProgram.image}
                  alt={activeModalProgram.name}
                  fallbackTitle={activeModalProgram.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Duration</div>
                  <div className="text-sm font-bold text-white font-display tabular-nums">
                    {activeModalProgram.durationWeeks} Weeks
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Frequency</div>
                  <div className="text-sm font-bold text-white font-display tabular-nums">
                    {activeModalProgram.sessionsPerWeek} Days / Wk
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Supervising Coach</div>
                  <div className="text-sm font-bold text-red-400 font-display">
                    {activeModalProgram.coachName}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Program Philosophy & Scope
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeModalProgram.description}
                </p>
              </div>

              {/* All Benefits */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Curriculum Outcomes & Focus
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProgram.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-200">
                      <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Used */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Hardware & Stations Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProgram.equipmentUsed.map((eq, i) => (
                    <span key={i} className="text-xs font-medium text-zinc-300 px-3 py-1 bg-zinc-800/80 rounded-md border border-zinc-700/60">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-800 flex items-center justify-end gap-3 bg-zinc-950/50">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const name = activeModalProgram.name;
                  setActiveModalProgram(null);
                  onSelectProgramForBooking(name);
                }}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Enroll In This Program
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
