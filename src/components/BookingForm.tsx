import React, { useState, useEffect } from 'react';
import { MembershipPlan, Trainer, Booking } from '../types/gym';
import { CheckCircle2, ShieldCheck, Calendar, User, Phone, Mail, Award, X, QrCode, ArrowRight } from 'lucide-react';

interface BookingFormProps {
  plans: MembershipPlan[];
  trainers: Trainer[];
  preSelectedPlanId?: string;
  preSelectedTrainerId?: string;
  preSelectedGoal?: string;
  onBookingSubmitted: (newBooking: Booking) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  plans,
  trainers,
  preSelectedPlanId,
  preSelectedTrainerId,
  preSelectedGoal,
  onBookingSubmitted
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(preSelectedPlanId || plans[1]?.id || plans[0]?.id || 'plan-pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(preSelectedTrainerId || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [goal, setGoal] = useState(preSelectedGoal || '');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');

  // Update when props change
  useEffect(() => {
    if (preSelectedPlanId) setSelectedPlanId(preSelectedPlanId);
  }, [preSelectedPlanId]);

  useEffect(() => {
    if (preSelectedTrainerId) setSelectedTrainerId(preSelectedTrainerId);
  }, [preSelectedTrainerId]);

  useEffect(() => {
    if (preSelectedGoal) setGoal(preSelectedGoal);
  }, [preSelectedGoal]);

  // Set default preferred date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const activeTrainer = trainers.find(t => t.id === selectedTrainerId);

  const pricePerMonth = billingCycle === 'annual' ? activePlan?.annualPricePerMonth : activePlan?.monthlyPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    const bookingId = 'APX-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking: Booking = {
      id: bookingId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      planId: activePlan.id,
      planName: activePlan.name,
      billingCycle,
      preferredDate,
      goal: goal.trim() || 'General strength and body conditioning',
      trainerId: activeTrainer?.id,
      trainerName: activeTrainer?.name,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      notes: notes.trim()
    };

    onBookingSubmitted(newBooking);
    setCompletedBooking(newBooking);

    // Reset fields
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="booking" className="py-24 bg-zinc-950 border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Secure Enrollment & Free Trial
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Online Membership Booking
          </h2>
          <p className="text-sm text-zinc-400">
            Lock in your membership tier or request a 1-day complimentary guest pass. 
            Receive your digital biometric induction code instantly upon booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Main Booking Form */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-9 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white uppercase font-display border-b border-zinc-800 pb-3">
              1. Choose Membership & Personal Details
            </h3>

            {formError && (
              <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Plan Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Select Membership Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {plans.map((p) => {
                    const isSelected = p.id === selectedPlanId;
                    const price = billingCycle === 'annual' ? p.annualPricePerMonth : p.monthlyPrice;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-950/30 border-red-500 text-white shadow-md shadow-red-950/40'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase font-display">{p.name}</span>
                          <span className="text-xs font-bold text-red-400 tabular-nums">${price}/mo</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 line-clamp-1 mt-1">{p.accessHours}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Annual (Save 20%)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Monthly Flexible
                </button>
              </div>

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Preferred Start / Orientation Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Goal & Optional Trainer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Primary Fitness Goal
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 lb Deadlift, 15% Fat Shred, Marathon Prep"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Preferred Coach (Optional)
                  </label>
                  <select
                    value={selectedTrainerId}
                    onChange={(e) => setSelectedTrainerId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium focus:border-red-500 focus:outline-none"
                  >
                    <option value="">No preference / Floor coach orientation</option>
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Special Inquiries or Injuries (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention previous sports injuries, schedule preferences, or guest trial requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Membership & Request Biometric Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Live Summary Order Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white uppercase font-display">
                Membership Summary
              </h3>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white uppercase font-display">{activePlan?.name}</span>
                  <span className="text-xs font-bold text-red-500 uppercase px-2 py-0.5 rounded bg-red-950/40 border border-red-500/30">
                    {billingCycle}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  {activePlan?.description}
                </p>

                <div className="pt-2 border-t border-zinc-800 flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">Monthly Equivalent</span>
                  <span className="text-2xl font-bold text-white font-display tabular-nums">
                    ${pricePerMonth}<span className="text-xs text-zinc-500 font-normal">/mo</span>
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Money-Back Transformation Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Enrollment Initiation Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary InBody 770 Scan Included</span>
                </div>
              </div>

              {/* Direct Support */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Prefer Booking Over Phone / WhatsApp?
                </div>
                <p className="text-xs text-zinc-400">
                  Call our membership concierge anytime at{' '}
                  <a href="tel:+18005554766" className="text-red-400 hover:underline font-semibold">
                    +1 (800) 555-4766
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Digital Membership Confirmation Pass Modal */}
      {completedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setCompletedBooking(null)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase font-display">
                Membership Pass Issued
              </h3>
              <p className="text-xs text-zinc-400">
                Welcome to the brotherhood of iron, <strong className="text-white">{completedBooking.fullName}</strong>.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="p-5 rounded-2xl bg-zinc-950 border-2 border-red-500/50 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-display">
                    APEX IRON BIOMETRIC PASS
                  </span>
                  <div className="text-lg font-bold text-white uppercase font-display">
                    {completedBooking.planName}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase">Pass ID</span>
                  <div className="text-xs font-mono font-bold text-red-400 tabular-nums">
                    {completedBooking.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">Member Name</span>
                  <p className="font-semibold text-zinc-200">{completedBooking.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">Orientation Date</span>
                  <p className="font-semibold text-zinc-200">{completedBooking.preferredDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">Phone</span>
                  <p className="font-semibold text-zinc-200">{completedBooking.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase">Assigned Coach</span>
                  <p className="font-semibold text-red-400">{completedBooking.trainerName || 'Floor Master Coach'}</p>
                </div>
              </div>

              {/* QR Mockup */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-zinc-950" />
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <span className="font-semibold text-white block">Biometric QR Ready</span>
                    <span>Scan at turnstile kiosk for entrance</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                  {completedBooking.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCompletedBooking(null)}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Done / Return to Site
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
