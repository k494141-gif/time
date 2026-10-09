import React, { useState } from 'react';
import { Enquiry } from '../types/gym';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation, Car } from 'lucide-react';

interface LocationContactProps {
  onEnquirySubmitted: (enquiry: Enquiry) => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onEnquirySubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Membership & General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newEnquiry: Enquiry = {
      id: 'ENQ-' + Math.floor(100 + Math.random() * 900),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'N/A',
      subject: subject.trim(),
      message: message.trim(),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    onEnquirySubmitted(newEnquiry);
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Headquarters & Direct Communication
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white uppercase font-display tracking-tight">
            Location & Contact
          </h2>
          <p className="text-sm text-zinc-400">
            Located in the central sports district with private athlete parking. 
            Connect with our front desk instantly via WhatsApp, phone, or direct inquiry.
          </p>
        </div>

        {/* 3 Quick Action Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp */}
          <a
            href="https://wa.me/18005554766"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition-all flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Immediate Chat</span>
              <h3 className="text-base font-bold text-white uppercase font-display">WhatsApp Concierge</h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">+1 (800) 555-4766</p>
            </div>
          </a>

          {/* Call Now */}
          <a
            href="tel:+18005554766"
            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Voice Desk</span>
              <h3 className="text-base font-bold text-white uppercase font-display">Call Our Team Now</h3>
              <p className="text-xs text-red-400 font-semibold mt-0.5">24/7 Front Reception</p>
            </div>
          </a>

          {/* Email / Support */}
          <a
            href="mailto:concierge@apexirongym.com"
            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Corporate & Media</span>
              <h3 className="text-base font-bold text-white uppercase font-display">Email Helpdesk</h3>
              <p className="text-xs text-zinc-300 font-semibold mt-0.5">concierge@apexirongym.com</p>
            </div>
          </a>
        </div>

        {/* 2-Column Split: Google Maps & Hours vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map & Facility Timetable */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-display text-lg font-bold uppercase">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Apex Iron Headquarters</span>
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </span>
              </div>

              <p className="text-xs text-zinc-400">
                840 Performance Parkway, Athletic District, Suite 100, Metropolis, USA
              </p>

              {/* Google Maps Embed iframe */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
                <iframe
                  title="Apex Iron Gym Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=40.7128,-74.0060&hl=en&z=14&output=embed"
                />
              </div>

              {/* Driving & Transit directions link */}
              <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-zinc-500" />
                  <span>Free 3-Hour Member Parking Garage</span>
                </span>
                <a
                  href="https://maps.google.com/?q=40.7128,-74.0060"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-400 hover:text-red-300 font-bold uppercase flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="pt-6 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Facility & Staffed Hours</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-zinc-950 border border-zinc-800/70">
                  <span className="text-zinc-400">Monday - Friday (Full Staff & Spa)</span>
                  <span className="font-semibold text-white">05:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-zinc-950 border border-zinc-800/70">
                  <span className="text-zinc-400">Saturday - Sunday (Weekend Jam)</span>
                  <span className="font-semibold text-white">06:00 AM - 09:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-red-950/20 border border-red-500/20">
                  <span className="text-red-300 font-semibold">Keycard Biometric Members</span>
                  <span className="font-bold text-red-400">24/7 / 365 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Inquiry Form */}
          <div className="lg:col-span-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white uppercase font-display">
                Send Us A Message
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Have questions regarding team corporate passes, equipment drop-ins, or physical rehab?
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Message received! Our team responds within 2 business hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium focus:border-red-500 focus:outline-none"
                >
                  <option value="Membership & General Inquiry">Membership & General Inquiry</option>
                  <option value="Corporate Wellness & Group Passes">Corporate Wellness & Group Passes</option>
                  <option value="Personal Trainer Consult Request">Personal Trainer Consult Request</option>
                  <option value="Powerlifting Platform Drop-in Pass">Powerlifting Platform Drop-in Pass</option>
                  <option value="Billing & Account Support">Billing & Account Support</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist with your training journey?..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
