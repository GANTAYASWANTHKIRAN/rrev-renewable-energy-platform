import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit3, Plus, Check, AlertCircle, X, Sliders } from 'lucide-react';
import { SubscriptionPlan } from '../../types';

interface AdminSubscriptionsViewProps {
  onNavigate: (view: string) => void;
}

export const AdminSubscriptionsView: React.FC<AdminSubscriptionsViewProps> = ({ onNavigate }) => {
  const { plans, packages, subscriptions, allUsers, updatePlan, addPlan } = useApp();

  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState<Partial<SubscriptionPlan>>({});

  const [addForm, setAddForm] = useState({
    name: '',
    category: 'farm' as 'home' | 'farm' | 'commercial',
    packageId: 'pkg-farm-30',
    monthlyPriceINR: 1999,
    yearlyPriceINR: 19990,
    monthlyIncludedSwaps: 8,
    yearlyIncludedSwaps: 96,
    additionalSwapPriceINR: 150,
    serviceAreaEligibility: ['Kurnool District (AP)', 'Warangal Rural (TS)'],
    supportLevel: 'Priority Farm Support',
    usageLimits: 'Standard agricultural cycle limitations. Additional swaps ₹150.',
    isPilotAssumption: true,
    description: 'Custom energy plan for agricultural high-throughput pumping.'
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    updatePlan(editingPlan.id, editForm);
    setEditingPlan(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name) return;
    addPlan(addForm);
    setIsAddOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Commercial & Billing Strategy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Subscription Plan & Pricing Configuration
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure monthly & annual subscription tariffs, included swap allowances, and service area eligibility.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => {
          const pkg = packages.find(k => k.id === p.packageId);

          return (
            <div key={p.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                    {p.category}
                  </span>
                  <button
                    onClick={() => {
                      setEditingPlan(p);
                      setEditForm({ ...p });
                    }}
                    className="p-1.5 text-stone-500 hover:text-emerald-800 rounded hover:bg-stone-100"
                    title="Configure Pricing"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900">{p.name}</h3>
                  <div className="text-xs text-stone-500 font-mono">
                    Hardware: {pkg ? pkg.name : p.packageId}
                  </div>
                </div>

                <div className="space-y-1 py-2 border-y border-stone-100 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Monthly Price:</span>
                    <span className="font-bold text-stone-900">₹{p.monthlyPriceINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Yearly Price:</span>
                    <span className="font-bold text-stone-900">₹{p.yearlyPriceINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Included Swaps:</span>
                    <span className="font-bold text-emerald-800">{p.monthlyIncludedSwaps}/mo ({p.yearlyIncludedSwaps}/yr)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-sans">Extra Swap Fee:</span>
                    <span className="text-stone-700">₹{p.additionalSwapPriceINR}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400">
                <span>Limits: {p.usageLimits}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Active Subscriptions Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Active Member Subscriptions ({subscriptions.length})
          </h2>
          <span className="text-xs text-stone-400 font-mono">Recurring Revenue Registry</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Subscription ID</th>
                <th className="py-3.5 px-6">Customer Name</th>
                <th className="py-3.5 px-6">Selected Plan</th>
                <th className="py-3.5 px-6">Cycle & Paid</th>
                <th className="py-3.5 px-6">Swaps (Used / Remaining)</th>
                <th className="py-3.5 px-6">Renewal Date</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {subscriptions.map((sub) => {
                const user = allUsers.find(u => u.id === sub.userId);
                const pl = plans.find(p => p.id === sub.planId);

                return (
                  <tr key={sub.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-stone-900">{sub.id}</td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-stone-900 block">{user ? user.name : sub.userId}</span>
                      <span className="text-stone-500 text-[11px]">{user ? `${user.village}, ${user.district}` : ''}</span>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-stone-900">
                      {pl ? pl.name : sub.planId}
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      ₹{sub.pricePaidINR} <span className="text-stone-400 capitalize">({sub.billingCycle})</span>
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      <span className="font-bold text-emerald-800">{sub.remainingSwaps} left</span>
                      <span className="text-stone-400"> of {sub.includedSwaps} total</span>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-stone-600">
                      {sub.renewalDate}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PLAN MODAL */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">Configure Plan: {editingPlan.name}</h3>
                <span className="text-xs text-stone-500">Update commercial rates and swapping quotas.</span>
              </div>
              <button onClick={() => setEditingPlan(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Monthly Price (INR)
                  </label>
                  <input
                    type="number"
                    value={editForm.monthlyPriceINR || 0}
                    onChange={(e) => setEditForm({ ...editForm, monthlyPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Annual Price (INR)
                  </label>
                  <input
                    type="number"
                    value={editForm.yearlyPriceINR || 0}
                    onChange={(e) => setEditForm({ ...editForm, yearlyPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Monthly Swaps
                  </label>
                  <input
                    type="number"
                    value={editForm.monthlyIncludedSwaps || 0}
                    onChange={(e) => setEditForm({ ...editForm, monthlyIncludedSwaps: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Yearly Swaps
                  </label>
                  <input
                    type="number"
                    value={editForm.yearlyIncludedSwaps || 0}
                    onChange={(e) => setEditForm({ ...editForm, yearlyIncludedSwaps: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Extra Swap (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.additionalSwapPriceINR || 0}
                    onChange={(e) => setEditForm({ ...editForm, additionalSwapPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Usage Limits & Conditions
                </label>
                <textarea
                  rows={2}
                  value={editForm.usageLimits || ''}
                  onChange={(e) => setEditForm({ ...editForm, usageLimits: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PLAN MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-xl font-bold text-stone-900">Create New Subscription Plan</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Healthcare Cold-Chain Pro"
                  className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    <option value="farm">Farm Energy</option>
                    <option value="home">Home Energy</option>
                    <option value="commercial">Commercial / Institutional</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Hardware Package
                  </label>
                  <select
                    value={addForm.packageId}
                    onChange={(e) => setAddForm({ ...addForm, packageId: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white font-mono"
                  >
                    {packages.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.nominalKwh} kWh)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Monthly Price (INR)
                  </label>
                  <input
                    type="number"
                    value={addForm.monthlyPriceINR}
                    onChange={(e) => setAddForm({ ...addForm, monthlyPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Annual Price (INR)
                  </label>
                  <input
                    type="number"
                    value={addForm.yearlyPriceINR}
                    onChange={(e) => setAddForm({ ...addForm, yearlyPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Monthly Included Swaps
                  </label>
                  <input
                    type="number"
                    value={addForm.monthlyIncludedSwaps}
                    onChange={(e) => setAddForm({ ...addForm, monthlyIncludedSwaps: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Extra Swap Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={addForm.additionalSwapPriceINR}
                    onChange={(e) => setAddForm({ ...addForm, additionalSwapPriceINR: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm"
                >
                  Publish Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
