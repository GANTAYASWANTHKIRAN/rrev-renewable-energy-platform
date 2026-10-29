import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, AlertCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface SubscriptionsPageProps {
  onNavigate: (view: string) => void;
}

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({ onNavigate }) => {
  const { plans, packages, currentUser, subscribeToPlan } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    if (!currentUser) {
      // Redirect to auth with plan hint
      onNavigate('auth');
      return;
    }

    // Subscribe user
    subscribeToPlan(currentUser.id, planId, billingCycle);
    setSubscriptionSuccess(planId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Subscription Tiers
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Transparent, Predictable Energy Plans
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          No debt, no depreciating assets. Subscribe for continuous battery access with included swap allowances and local hub support.
        </p>

        {/* Billing cycle toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-stone-200/90 rounded-2xl border border-stone-300">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-stone-950 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Annual Billing (Save 16%)
            </button>
          </div>
        </div>
      </div>

      {/* Honest Pilot Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4.5 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Pilot Pricing Assumptions:</strong> All subscription prices (₹799–₹2,499) and swap fees (₹100–₹180/swap) are early modeling hypotheses. Swaps are capped to avoid unsustainable battery degradation and battery-hoarding. Final commercial pricing will factor real logistics costs, battery cell depreciation, and local solar generation tariffs.
        </div>
      </div>

      {/* Success Notification */}
      {subscriptionSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 flex items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold">Subscription Request Registered! </span>
              Your energy plan has been activated for evaluation in the customer portal.
            </div>
          </div>
          <button
            onClick={() => onNavigate('customer-dashboard')}
            className="px-4 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg whitespace-nowrap"
          >
            Go to Customer Dashboard
          </button>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPriceINR : plan.yearlyPriceINR;
          const swaps = billingCycle === 'monthly' ? plan.monthlyIncludedSwaps : plan.yearlyIncludedSwaps;
          const pkg = packages.find(p => p.id === plan.packageId) || packages[0];

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm relative transition-all ${
                plan.popular ? 'border-emerald-700 ring-2 ring-emerald-700/80 shadow-md' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Most Popular Pilot Tier
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {plan.category === 'home' ? 'Rural Home' : 'Agricultural Farm'}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    {plan.name}
                  </h3>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">
                    Paired with {pkg.name} ({pkg.nominalKwh} kWh)
                  </div>
                </div>

                <div className="py-2 border-y border-stone-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono text-stone-900">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500 font-sans">
                      / {billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 mt-1">
                    Includes {swaps} Swaps / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Billed upfront annually (No hidden lock-ins)
                    </div>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features & limits */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-start gap-2 text-stone-700">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Continuous Power:</strong> Up to {pkg.maxContinuousWatts}W load</span>
                  </div>

                  <div className="flex items-start gap-2 text-stone-700">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Support:</strong> {plan.supportLevel}</span>
                  </div>

                  <div className="flex items-start gap-2 text-stone-700">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Extra Swaps:</strong> ₹{plan.additionalSwapPriceINR} / swap</span>
                  </div>

                  <div className="flex items-start gap-2 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-stone-500">
                      Eligible: {plan.serviceAreaEligibility.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                </div>

                {/* Usage limits callout */}
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 text-[11px] text-stone-500 leading-normal">
                  <span className="font-semibold text-stone-700">Usage Policy: </span>
                  {plan.usageLimits}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                    plan.popular
                      ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {currentUser ? 'Activate Subscription' : 'Choose Plan & Register'}
                </button>
                <div className="text-[10px] text-center text-stone-400 mt-2">
                  No payment card required for pilot sandbox
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Area Eligibility Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-stone-900">
          Pilot Service Area Eligibility & Regional Hubs
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Battery swap turnaround and emergency technician response are strictly bounded by proximity to designated RREV solar microgrid hubs. Check your mandal/district eligibility below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Kurnool District (Andhra Pradesh)</div>
            <div className="text-xs text-stone-500 mt-1">Chinnatekur, Kallur, Banaganapalle, Dhone</div>
            <div className="text-[11px] text-emerald-800 font-semibold mt-2">● Active Pilot Hub Operational</div>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Warangal District (Telangana)</div>
            <div className="text-xs text-stone-500 mt-1">Madikonda, Kazipet, Dharmasagar</div>
            <div className="text-[11px] text-emerald-800 font-semibold mt-2">● Active Pilot Hub Operational</div>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Nalgonda District (Telangana)</div>
            <div className="text-xs text-stone-500 mt-1">Nakrekal, Chityal, Narketpally</div>
            <div className="text-[11px] text-emerald-800 font-semibold mt-2">● Active Pilot Hub Operational</div>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Anantapur District (Andhra Pradesh)</div>
            <div className="text-xs text-stone-500 mt-1">Bukkarayasamudram, Dharmavaram</div>
            <div className="text-[11px] text-amber-800 font-semibold mt-2">▲ Equipment Testing Station</div>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Chittoor & Kuppam (Andhra Pradesh)</div>
            <div className="text-xs text-stone-500 mt-1">Kuppam Rural, Palamaner</div>
            <div className="text-[11px] text-stone-500 font-semibold mt-2">○ Scheduled Q1 2027 Expansion</div>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
            <div className="font-bold text-stone-900 text-xs">Nizamabad (Telangana)</div>
            <div className="text-xs text-stone-500 mt-1">Armoor, Balkonda rural</div>
            <div className="text-[11px] text-stone-500 font-semibold mt-2">○ Scheduled Q2 2027 Expansion</div>
          </div>
        </div>
      </div>
    </div>
  );
};
