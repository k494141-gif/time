import React, { useState } from 'react';
import { MembershipPlan } from '../types/gym';
import { Check, X, Zap, Shield, Sparkles } from 'lucide-react';

interface PricingProps {
  plans: MembershipPlan[];
  onSelectPlan: (planId: string, billingCycle: 'monthly' | 'annual') => void;
}

export const Pricing: React.FC<PricingProps> = ({ plans, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="plans" className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Membership Plans
          </h2>
          <p className="text-sm text-zinc-400">
            No sneaky initiation penalties. No hidden cancellation locks. Pick the level of access, 
            coaching, and recovery tailored to your goals.
          </p>

          {/* Monthly vs Annual Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly Billed
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>Annual Membership</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white/20 rounded">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.isPopular;
            const price = billingCycle === 'annual' ? plan.annualPricePerMonth : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border-2 border-red-500 shadow-2xl shadow-red-950/40 lg:-translate-y-2'
                    : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                } p-6 sm:p-7`}
              >
                {/* Popular / Best Value Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-full shadow-md shadow-red-600/40">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Title & Description */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white uppercase font-display">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 min-h-[32px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-zinc-400">$</span>
                      <span className="text-4xl font-bold text-white font-display tabular-nums tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-zinc-400">/month</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1">
                      {billingCycle === 'annual' ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed month-to-month'}
                    </div>
                  </div>

                  {/* Access tag */}
                  <div className="text-[11px] font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-red-500" />
                    <span>{plan.accessHours}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      What's Included:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Excluded items (clean muted presentation) */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-3 space-y-2 border-t border-zinc-800/40">
                        <ul className="space-y-2">
                          {plan.notIncluded.map((notFeat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-500">
                              <X className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                              <span className="line-through">{notFeat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plan Action Button */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  <button
                    onClick={() => onSelectPlan(plan.id, billingCycle)}
                    className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate & Day Pass Footnote */}
        <div className="mt-12 text-center text-xs text-zinc-400">
          <span>Need corporate group discounts for your team? </span>
          <a href="#contact" className="text-red-400 hover:underline font-semibold">
            Inquire about Corporate Wellness Packages
          </a>
        </div>
      </div>
    </section>
  );
};
