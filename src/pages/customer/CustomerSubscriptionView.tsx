import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Calendar, ArrowUpRight, Receipt, AlertCircle } from 'lucide-react';

interface CustomerSubscriptionViewProps {
  onNavigate: (view: string) => void;
}

export const CustomerSubscriptionView: React.FC<CustomerSubscriptionViewProps> = ({ onNavigate }) => {
  const { currentUser, subscriptions, plans, packages } = useApp();

  if (!currentUser) return null;

  const activeSub = subscriptions.find(s => s.userId === currentUser.id && s.status === 'active');
  const plan = activeSub ? plans.find(p => p.id === activeSub.planId) : null;
  const pkg = activeSub ? packages.find(p => p.id === activeSub.packageId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Account & Billing
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          My Energy Subscription
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your active energy plan terms, swap allowances, billing history, and upgrade options.
        </p>
      </div>

      {activeSub && plan && pkg ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Plan Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {plan.category.toUpperCase()} PLAN
                </span>
                <h2 className="text-2xl font-bold text-stone-900 mt-2">{plan.name}</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-stone-900">
                  ₹{activeSub.pricePaidINR}
                </div>
                <div className="text-xs text-stone-500 font-mono capitalize">
                  Billed {activeSub.billingCycle}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                <span className="text-stone-500 text-xs block">Start Date:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{activeSub.startDate}</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                <span className="text-stone-500 text-xs block">Next Renewal:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{activeSub.renewalDate}</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
                <span className="text-stone-500 text-xs block">Battery Hardware:</span>
                <span className="font-bold text-stone-900 text-sm">{pkg.name} ({pkg.nominalKwh} kWh)</span>
              </div>
            </div>

            {/* Swap allowance details */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Swap Allowance Tracker
              </h3>
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-950 font-medium">Included Swaps for Cycle:</span>
                  <span className="font-mono font-bold text-emerald-950 text-base">
                    {activeSub.remainingSwaps} of {activeSub.includedSwaps} Swaps Remaining
                  </span>
                </div>
                <div className="w-full bg-emerald-200/80 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-800 h-2.5 rounded-full"
                    style={{ width: `${Math.round((activeSub.remainingSwaps / activeSub.includedSwaps) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-800 font-mono">
                  <span>Used: {activeSub.usedSwaps} swaps</span>
                  <span>Extra swap fee: ₹{plan.additionalSwapPriceINR} / swap</span>
                </div>
              </div>
            </div>

            {/* Plan inclusions */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Plan Inclusions & Service Commitments
              </h3>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Free doorstep e-trike delivery within 5 km of village hub during daylight hours.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Comprehensive battery degradation guarantee: Weak packs below 80% SOH replaced automatically by RREV.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Priority agricultural helpline and WhatsApp dispatch for scheduled irrigation rosters.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Upgrade & Mock Receipts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Want to Change Your Plan?</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Need more monthly swaps for the upcoming harvest or wish to switch from monthly to annual billing?
              </p>
              <button
                onClick={() => onNavigate('subscriptions')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Browse All Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pilot Receipt Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-3 shadow-sm text-xs">
              <div className="flex items-center gap-2 text-stone-900 font-bold">
                <Receipt className="w-4 h-4 text-stone-500" />
                <span>Pilot Billing Receipt</span>
              </div>
              <div className="font-mono text-stone-500 space-y-1 pt-1 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Invoice:</span>
                  <span>RREV-INV-2026-904</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{activeSub.startDate}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-semibold pt-1">
                  <span>Total Paid:</span>
                  <span>₹{activeSub.pricePaidINR}</span>
                </div>
                <div className="text-[10px] text-stone-400 pt-1">
                  Pilot testing ledger · No real credit card charged
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h2 className="text-lg font-bold text-stone-900">No Active Energy Subscription</h2>
          <p className="text-xs text-stone-600">
            You have not subscribed to an RREV energy package yet. Choose a plan to activate battery swapping services.
          </p>
          <button
            onClick={() => onNavigate('subscriptions')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
          >
            Explore Subscription Plans
          </button>
        </div>
      )}
    </div>
  );
};
