import React, { useState } from 'react';
import { Booking, Trainer, MembershipPlan, Enquiry } from '../types/gym';
import { Shield, Lock, Users, Calendar, DollarSign, Mail, Check, X, Trash2, Edit3, Plus, Download, RefreshCw, Key, LogOut } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  trainers: Trainer[];
  plans: MembershipPlan[];
  enquiries: Enquiry[];
  onUpdateBookings: (updated: Booking[]) => void;
  onUpdateTrainers: (updated: Trainer[]) => void;
  onUpdatePlans: (updated: MembershipPlan[]) => void;
  onUpdateEnquiries: (updated: Enquiry[]) => void;
  onResetData: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  bookings,
  trainers,
  plans,
  enquiries,
  onUpdateBookings,
  onUpdateTrainers,
  onUpdatePlans,
  onUpdateEnquiries,
  onResetData,
  isAdminLoggedIn,
  setIsAdminLoggedIn
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'trainers' | 'plans' | 'enquiries'>('overview');

  // Booking search/filter
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Trainer addition form state
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);
  const [newTrainerName, setNewTrainerName] = useState('');
  const [newTrainerRole, setNewTrainerRole] = useState('');
  const [newTrainerExp, setNewTrainerExp] = useState(5);
  const [newTrainerCerts, setNewTrainerCerts] = useState('CSCS, CPR/AED');
  const [newTrainerSpecs, setNewTrainerSpecs] = useState('Powerlifting, Strength');
  const [newTrainerBio, setNewTrainerBio] = useState('');

  // Plan editing modal
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

  if (!isOpen) return null;

  // Authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'apex123') {
      setIsAdminLoggedIn(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect passcode. Use "admin123" to enter demo admin console.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // Calculations for Overview Dashboard
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active');
  const estimatedRevenue = confirmedBookings.reduce((sum, b) => {
    const plan = plans.find(p => p.id === b.planId);
    const cost = b.billingCycle === 'annual' ? (plan?.annualPricePerMonth || 50) : (plan?.monthlyPrice || 70);
    return sum + cost;
  }, 0);

  // Bookings Handlers
  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    onUpdateBookings(updated);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Delete this membership record permanently?')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      onUpdateBookings(updated);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Plan,Billing,Preferred Date,Status,Created At\n';
    const rows = bookings.map(b => 
      `"${b.id}","${b.fullName}","${b.email}","${b.phone}","${b.planName}","${b.billingCycle}","${b.preferredDate}","${b.status}","${b.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apex-gym-memberships-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Trainer Handlers
  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainerName.trim()) return;

    const newTrainer: Trainer = {
      id: 'coach-' + Date.now(),
      name: newTrainerName.trim(),
      role: newTrainerRole.trim() || 'Strength & Conditioning Coach',
      experienceYears: Number(newTrainerExp),
      certifications: newTrainerCerts.split(',').map(s => s.trim()).filter(Boolean),
      specialties: newTrainerSpecs.split(',').map(s => s.trim()).filter(Boolean),
      bio: newTrainerBio.trim() || 'Dedicated athletic performance coach at Apex Iron Gym.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      athletesTrained: 120,
      quote: 'Consistency outworks raw talent every single time.'
    };

    onUpdateTrainers([newTrainer, ...trainers]);
    setIsAddingTrainer(false);
    setNewTrainerName('');
    setNewTrainerRole('');
    setNewTrainerBio('');
  };

  const handleDeleteTrainer = (id: string) => {
    if (window.confirm('Remove this trainer from active staff?')) {
      onUpdateTrainers(trainers.filter(t => t.id !== id));
    }
  };

  // Plan Edit Handler
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    const updated = plans.map(p => p.id === editingPlan.id ? editingPlan : p);
    onUpdatePlans(updated);
    setEditingPlan(null);
  };

  // Enquiry status change
  const handleEnquiryStatus = (id: string, newStatus: Enquiry['status']) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    onUpdateEnquiries(updated);
  };

  const handleDeleteEnquiry = (id: string) => {
    onUpdateEnquiries(enquiries.filter(e => e.id !== id));
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = bookingFilterStatus === 'All' || b.status === bookingFilterStatus;
    const matchesSearch = b.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.id.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Admin Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white uppercase font-display">
                  Apex Operations Admin Console
                </h2>
                <span className="text-[10px] font-bold text-red-400 uppercase bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                  Internal Protected
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Manage memberships, trainer rosters, plan pricing, and incoming inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Screen if NOT logged in */}
        {!isAdminLoggedIn ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-zinc-950">
            <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 space-y-6 text-center shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase font-display">
                  Staff Authentication Required
                </h3>
                <p className="text-xs text-zinc-400">
                  Enter administrative passcode to manage gym records.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs text-left">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="Enter admin passcode"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  Unlock Admin Console
                </button>
              </form>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Demo Passcode:</span>
                <button
                  type="button"
                  onClick={() => setPasswordInput('admin123')}
                  className="text-red-400 font-mono font-bold hover:underline"
                >
                  admin123 (Click to fill)
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
            {/* Top Navigation Tabs */}
            <div className="px-6 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between overflow-x-auto gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  Overview & KPIs
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'bookings'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Memberships</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-300">
                    {bookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('trainers')}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'trainers'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Trainers</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-300">
                    {trainers.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'plans'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  Membership Plans ({plans.length})
                </button>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'enquiries'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Enquiries</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-300">
                    {enquiries.length}
                  </span>
                </button>
              </div>

              <button
                onClick={onResetData}
                title="Reset sample data"
                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo State</span>
              </button>
            </div>

            {/* Tab Contents (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">Estimated MRR (Active)</span>
                      <div className="text-3xl font-bold text-white font-display tabular-nums">
                        ${estimatedRevenue.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-emerald-400">Recurring revenue from memberships</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">Total Enrollments</span>
                      <div className="text-3xl font-bold text-white font-display tabular-nums">
                        {bookings.length}
                      </div>
                      <span className="text-[11px] text-zinc-400">{confirmedBookings.length} confirmed / active</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">Active Master Coaches</span>
                      <div className="text-3xl font-bold text-white font-display tabular-nums">
                        {trainers.length}
                      </div>
                      <span className="text-[11px] text-zinc-400">Specializing across 12 disciplines</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">Unread Enquiries</span>
                      <div className="text-3xl font-bold text-red-500 font-display tabular-nums">
                        {enquiries.filter(e => e.status === 'New').length}
                      </div>
                      <span className="text-[11px] text-zinc-400">Total: {enquiries.length} messages</span>
                    </div>
                  </div>

                  {/* Recent Bookings Quick Table */}
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white uppercase font-display">
                        Recent Membership Bookings
                      </h3>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="text-xs text-red-400 hover:underline font-semibold"
                      >
                        View Full Registry →
                      </button>
                    </div>

                    <div className="divide-y divide-zinc-800/80">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <span className="font-bold text-white block">{b.fullName}</span>
                            <span className="text-zinc-500 font-mono">{b.id} · {b.planName}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              b.status === 'Active' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                              'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}>
                              {b.status}
                            </span>
                            <span className="text-zinc-400 tabular-nums hidden sm:inline">{b.preferredDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEMBERSHIPS / BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* Filter Toolbar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                        className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs w-full sm:w-64 focus:outline-none focus:border-red-500"
                      />
                      <select
                        value={bookingFilterStatus}
                        onChange={(e) => setBookingFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Active">Active</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-red-500" />
                      <span>Export to CSV</span>
                    </button>
                  </div>

                  {/* Bookings Table */}
                  <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <table className="w-full text-left text-xs text-zinc-300">
                      <thead className="bg-zinc-900 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold font-display">
                        <tr>
                          <th className="p-3.5">Member & Pass ID</th>
                          <th className="p-3.5">Plan & Billing</th>
                          <th className="p-3.5">Contact Details</th>
                          <th className="p-3.5">Orientation Date</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-zinc-500">
                              No membership records match this filter.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-zinc-900/50 transition-colors">
                              <td className="p-3.5">
                                <div className="font-bold text-white">{b.fullName}</div>
                                <div className="text-[10px] text-zinc-500 font-mono">{b.id}</div>
                                {b.trainerName && (
                                  <div className="text-[10px] text-red-400 mt-0.5">Coach: {b.trainerName}</div>
                                )}
                              </td>
                              <td className="p-3.5">
                                <div className="font-semibold text-zinc-200">{b.planName}</div>
                                <div className="text-[10px] text-zinc-500 capitalize">{b.billingCycle} billing</div>
                              </td>
                              <td className="p-3.5">
                                <div>{b.email}</div>
                                <div className="text-zinc-500">{b.phone}</div>
                              </td>
                              <td className="p-3.5 font-medium tabular-nums">
                                {b.preferredDate}
                              </td>
                              <td className="p-3.5">
                                <select
                                  value={b.status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold uppercase focus:outline-none border cursor-pointer ${
                                    b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                                    b.status === 'Active' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                                    b.status === 'Cancelled' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' :
                                    'bg-amber-950 text-amber-400 border-amber-800'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Active">Active</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: TRAINERS */}
              {activeTab === 'trainers' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-display">
                        Staff Roster & Coaches
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Add or modify master coach assignments shown on the public site.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingTrainer(!isAddingTrainer)}
                      className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Trainer</span>
                    </button>
                  </div>

                  {/* Add Trainer Form */}
                  {isAddingTrainer && (
                    <form onSubmit={handleCreateTrainer} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase font-display">
                        New Trainer Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Cole Sterling"
                            value={newTrainerName}
                            onChange={(e) => setNewTrainerName(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Role Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Head of Olympic Weightlifting"
                            value={newTrainerRole}
                            onChange={(e) => setNewTrainerRole(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Years Experience</label>
                          <input
                            type="number"
                            min="1"
                            value={newTrainerExp}
                            onChange={(e) => setNewTrainerExp(Number(e.target.value))}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Certifications (comma separated)</label>
                          <input
                            type="text"
                            value={newTrainerCerts}
                            onChange={(e) => setNewTrainerCerts(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Specialties (comma separated)</label>
                          <input
                            type="text"
                            value={newTrainerSpecs}
                            onChange={(e) => setNewTrainerSpecs(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-zinc-400 font-semibold uppercase block mb-1">Bio</label>
                          <textarea
                            rows={2}
                            value={newTrainerBio}
                            onChange={(e) => setNewTrainerBio(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingTrainer(false)}
                          className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
                        >
                          Save Trainer
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Trainers List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainers.map((t) => (
                      <div key={t.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-12 h-12 rounded-lg object-cover border border-zinc-700"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white uppercase font-display">{t.name}</h4>
                            <p className="text-xs text-red-400 font-medium">{t.role}</p>
                            <p className="text-[11px] text-zinc-400 mt-1">{t.experienceYears} Years Exp · {t.certifications.join(', ')}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteTrainer(t.id)}
                          className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-800 cursor-pointer"
                          title="Remove Trainer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MEMBERSHIP PLANS */}
              {activeTab === 'plans' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase font-display">
                      Membership Plan Configurations
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Configure retail pricing, featured badges, and plan descriptions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plans.map((p) => (
                      <div key={p.id} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white uppercase font-display">{p.name}</h4>
                          {p.badge && (
                            <span className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded">
                              {p.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-4 text-xs">
                          <div>
                            <span className="text-zinc-500 uppercase block">Monthly:</span>
                            <span className="text-lg font-bold text-white font-display tabular-nums">${p.monthlyPrice}/mo</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 uppercase block">Annual Rate:</span>
                            <span className="text-lg font-bold text-red-400 font-display tabular-nums">${p.annualPricePerMonth}/mo</span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {p.description}
                        </p>

                        <div className="pt-2 border-t border-zinc-800 flex justify-end">
                          <button
                            onClick={() => setEditingPlan(p)}
                            className="px-3 py-1.5 text-xs font-semibold uppercase text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Pricing</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Plan Edit Modal */}
                  {editingPlan && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <h4 className="text-lg font-bold text-white uppercase font-display">
                          Edit Plan: {editingPlan.name}
                        </h4>

                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-zinc-400 font-semibold block mb-1">Monthly Price ($)</label>
                            <input
                              type="number"
                              value={editingPlan.monthlyPrice}
                              onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: Number(e.target.value) })}
                              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-zinc-400 font-semibold block mb-1">Annual Price ($/month)</label>
                            <input
                              type="number"
                              value={editingPlan.annualPricePerMonth}
                              onChange={(e) => setEditingPlan({ ...editingPlan, annualPricePerMonth: Number(e.target.value) })}
                              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-zinc-400 font-semibold block mb-1">Badge (Optional, e.g. "MOST POPULAR")</label>
                            <input
                              type="text"
                              value={editingPlan.badge || ''}
                              onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                            />
                          </div>

                          <div>
                            <label className="text-zinc-400 font-semibold block mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={editingPlan.description}
                              onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                              className="w-full p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingPlan(null)}
                            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSavePlan}
                            className="px-5 py-2 text-xs font-bold uppercase text-white bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
                          >
                            Update Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-display">
                        Member & Corporate Inquiries
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Messages submitted through the public website contact section.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {enquiries.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800">
                        No inquiries received yet.
                      </div>
                    ) : (
                      enquiries.map((enq) => (
                        <div key={enq.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{enq.name}</span>
                              <span className="text-zinc-500">· {enq.email}</span>
                              <span className="text-zinc-500">· {enq.phone}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                enq.status === 'New' ? 'bg-red-950 text-red-400 border border-red-800' :
                                enq.status === 'Replied' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {enq.status}
                              </span>
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-xs font-semibold text-red-400">
                            Subject: {enq.subject}
                          </div>

                          <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/60">
                            {enq.message}
                          </p>

                          <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
                            <span>Received {new Date(enq.createdAt).toLocaleDateString()}</span>
                            {enq.status === 'New' && (
                              <button
                                onClick={() => handleEnquiryStatus(enq.id, 'Replied')}
                                className="text-xs text-emerald-400 hover:underline font-semibold"
                              >
                                Mark as Replied ✓
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
