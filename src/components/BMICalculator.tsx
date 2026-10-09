import React, { useState } from 'react';
import { Calculator, Activity, Flame, Dumbbell, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface BMICalculatorProps {
  onSelectRecommendedProgram: (programName: string) => void;
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({ onSelectRecommendedProgram }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric fields
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(78);

  // Imperial fields
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(172);

  // Demographics & goal
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // 1.2 = Sedentary, 1.375 = Light, 1.55 = Moderate (3-5d), 1.725 = Hard, 1.9 = Elite
  const [fitnessGoal, setFitnessGoal] = useState<'cut' | 'maintain' | 'bulk'>('bulk');

  // Compute BMI
  let weightInKg = unitSystem === 'metric' ? weightKg : weightLbs * 0.453592;
  let heightInMeters = unitSystem === 'metric'
    ? heightCm / 100
    : ((heightFeet * 12) + heightInches) * 0.0254;

  const validHeight = heightInMeters > 0.5 ? heightInMeters : 1.75;
  const validWeight = weightInKg > 20 ? weightInKg : 70;

  const bmi = Number((validWeight / (validHeight * validHeight)).toFixed(1));

  // Determine Classification
  let classification = 'Normal Weight';
  let categoryColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
  let recommendedProgram = 'Titan Hypertrophy Protocol';
  let barPercentage = 50; // between 15 and 40

  if (bmi < 18.5) {
    classification = 'Underweight';
    categoryColor = 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    recommendedProgram = 'Titan Hypertrophy Protocol';
    barPercentage = Math.max(5, ((bmi - 15) / 3.5) * 25);
  } else if (bmi < 25) {
    classification = 'Optimal Athletic Range';
    categoryColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
    recommendedProgram = 'Heavy Iron: Barbell Mastery';
    barPercentage = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    classification = 'Overweight';
    categoryColor = 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    recommendedProgram = fitnessGoal === 'cut' ? 'Inferno Lean Shred' : 'Metabolic Velocity & VO2 Engine';
    barPercentage = 50 + ((bmi - 25) / 5) * 25;
  } else {
    classification = 'High Body Mass Index';
    categoryColor = 'text-red-400 border-red-500/30 bg-red-950/40';
    recommendedProgram = 'Inferno Lean Shred';
    barPercentage = Math.min(100, 75 + ((bmi - 30) / 10) * 25);
  }

  // Calculate BMR (Mifflin-St Jeor)
  // BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age + (male: +5, female: -161)
  const heightInCmCalculated = validHeight * 100;
  const baseBmr = (10 * validWeight) + (6.25 * heightInCmCalculated) - (5 * age) + (gender === 'male' ? 5 : -161);
  const tdee = Math.round(baseBmr * activityLevel);

  // Goal caloric adjustment
  let targetCalories = tdee;
  if (fitnessGoal === 'cut') targetCalories = Math.round(tdee - 450);
  if (fitnessGoal === 'bulk') targetCalories = Math.round(tdee + 350);

  // Macronutrient breakdown (40% Carbs, 30% Protein, 30% Fats approx)
  const proteinGrams = Math.round((targetCalories * 0.3) / 4);
  const carbsGrams = Math.round((targetCalories * 0.45) / 4);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);

  return (
    <section id="calculator" className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Biometric Assessment
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Interactive BMI & Macro Calculator
          </h2>
          <p className="text-sm text-zinc-400">
            Evaluate your baseline body mass index, basal metabolic expenditure (TDEE), 
            and discover the exact training protocol tailored to your physiology.
          </p>

          {/* Unit Toggle */}
          <div className="pt-2 flex justify-center">
            <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-1.5 text-xs font-bold uppercase rounded-md transition-all cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Metric (kg / cm)
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-4 py-1.5 text-xs font-bold uppercase rounded-md transition-all cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Imperial (lbs / ft)
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Tool Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-10">
          {/* Left Inputs */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-lg font-bold text-white uppercase font-display flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-500" />
              <span>Enter Your Measurements</span>
            </h3>

            {/* Height & Weight Inputs */}
            {unitSystem === 'metric' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="240"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Height (Feet)
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Height (Inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    min="70"
                    max="500"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Gender and Age */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Biological Sex
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-1.5 text-xs font-semibold rounded cursor-pointer ${
                      gender === 'male' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-1.5 text-xs font-semibold rounded cursor-pointer ${
                      gender === 'female' ? 'bg-zinc-800 text-white' : 'text-zinc-500'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Math.max(14, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Weekly Activity / Training Frequency
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium focus:border-red-500 focus:outline-none"
              >
                <option value={1.2}>Sedentary (Office desk, minimal gym)</option>
                <option value={1.375}>Lightly Active (1-2 gym sessions / week)</option>
                <option value={1.55}>Moderately Active (3-5 intense gym sessions / week)</option>
                <option value={1.725}>Very Active (6+ heavy barbell/conditioning sessions)</option>
                <option value={1.9}>Elite Athlete (Twice daily training & competitive lifting)</option>
              </select>
            </div>

            {/* Target Goal Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Primary Physical Objective
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFitnessGoal('cut')}
                  className={`py-2 px-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                    fitnessGoal === 'cut'
                      ? 'bg-red-600/20 border-red-500 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Fat Shred (-450 kcal)
                </button>
                <button
                  onClick={() => setFitnessGoal('maintain')}
                  className={`py-2 px-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                    fitnessGoal === 'maintain'
                      ? 'bg-red-600/20 border-red-500 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Recomp (Maintenance)
                </button>
                <button
                  onClick={() => setFitnessGoal('bulk')}
                  className={`py-2 px-2 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                    fitnessGoal === 'bulk'
                      ? 'bg-red-600/20 border-red-500 text-white'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Muscle Bulk (+350 kcal)
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Diagnosis & Recommendation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 uppercase font-semibold">Calculated Score</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-bold text-white font-display tabular-nums tracking-tight">
                      {bmi}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">kg/m²</span>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${categoryColor}`}>
                  {classification}
                </div>
              </div>

              {/* Visual Meter Bar */}
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="w-[25%] bg-amber-500" title="Underweight (<18.5)" />
                  <div className="w-[30%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
                  <div className="w-[25%] bg-amber-500" title="Overweight (25 - 29.9)" />
                  <div className="w-[20%] bg-red-500" title="Obese (30+)" />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                  <span>15.0</span>
                  <span>18.5</span>
                  <span>25.0</span>
                  <span>30.0</span>
                  <span>40.0+</span>
                </div>
              </div>

              {/* Daily Energy & Macro Breakdown */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 font-semibold uppercase tracking-wider">
                    Target Daily Intake:
                  </span>
                  <span className="text-lg font-bold text-red-400 font-display tabular-nums">
                    {targetCalories.toLocaleString()} kcal / day
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase">Protein</span>
                    <div className="text-sm font-bold text-white font-display tabular-nums">
                      {proteinGrams}g
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase">Carbohydrates</span>
                    <div className="text-sm font-bold text-white font-display tabular-nums">
                      {carbsGrams}g
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase">Fats</span>
                    <div className="text-sm font-bold text-white font-display tabular-nums">
                      {fatGrams}g
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Program */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-red-400 font-semibold uppercase tracking-wider">
                  <span>Recommended Apex Protocol</span>
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                </div>
                <h4 className="text-base font-bold text-white uppercase font-display">
                  {recommendedProgram}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Engineered to optimize your energy expenditure and accelerate muscle adaptation 
                  based on your goal and current body mass index.
                </p>
                <button
                  onClick={() => onSelectRecommendedProgram(recommendedProgram)}
                  className="w-full mt-2 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-600/25 cursor-pointer"
                >
                  <span>Enroll in {recommendedProgram}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
