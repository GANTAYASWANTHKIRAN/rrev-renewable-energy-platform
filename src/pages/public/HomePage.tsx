import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RuntimeCalculator } from '../../components/RuntimeCalculator';
import { ArrowRight, CheckCircle2, BatteryCharging, Zap, ShieldAlert, Users, PhoneCall, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { plans, packages, submitContactInquiry } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    villageOrTown: '',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    customerType: 'farmer' as const,
    interestedPackage: 'pkg-farm-30',
    message: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.villageOrTown) return;
    submitContactInquiry(leadForm);
    setLeadSubmitted(true);
  };

  const homePkg = packages.find(p => p.category === 'home') || packages[0];
  const farmPkg = packages.find(p => p.category === 'farm') || packages[1];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-stone-100/80 via-white to-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left copy */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase">
                <span>Decentralized Rural Clean Energy</span>
                <span aria-hidden="true">·</span>
                <span>Andhra Pradesh & Telangana Pilot</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Reliable Energy for Every Rural Home and Farm.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                RREV introduces modular battery swapping and decentralized solar charging hubs designed specifically for rural villages, irrigation pumps, and critical community services.
              </p>

              {/* Two prominent CTAs as requested */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onNavigate('solutions')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  <span>Explore Home Energy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-all whitespace-nowrap"
                >
                  <span>Explore Farm Energy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Startup Transparency Anchor */}
              <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-500 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-700 mt-1 shrink-0"></div>
                <p>
                  <strong className="text-stone-700">Early-Stage Pilot Initiative:</strong> We are testing modular LiFePO4 battery swapping in rural Rayalaseema and Telangana clusters to validate equipment compatibility, pump inrush, and service economics.
                </p>
              </div>
            </div>

            {/* Right Hero Visual with generated asset */}
            <div className="lg:col-span-6 relative flex items-center">
              <div className="w-full h-full min-h-[340px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-stone-200 shadow-xl relative bg-stone-200">
                <img
                  src="/src/assets/images/rrev_hero_rural_energy_1793288535979.jpg"
                  alt="Rural solar microgrid and battery charging infrastructure in Andhra Pradesh"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-1">
                    Village Energy Microhub Concept
                  </div>
                  <div className="text-sm font-medium leading-snug">
                    Standardized modular batteries recharged via community solar arrays, ready for rapid 3-minute swap.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (Simple 3-step) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            The Swapping Model
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            How RREV Works in 3 Simple Steps
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            No expensive upfront battery ownership. Subscribe to an energy plan and exchange discharged units for fresh power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center font-mono text-base border border-emerald-200">
              01
            </div>
            <h3 className="text-lg font-bold text-stone-900">Choose Plan & Receive Unit</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Select a monthly or yearly plan tailored for your household or farm equipment. An RREV field technician installs the safety dock or delivers the wheeled trolley.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center font-mono text-base border border-emerald-200">
              02
            </div>
            <h3 className="text-lg font-bold text-stone-900">Power Your Home or Irrigation</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Run your household lights, ceiling fans, and phones uninterrupted during grid cuts, or power your compatible 1 HP agricultural pump directly in the field.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm relative space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center font-mono text-base border border-emerald-200">
              03
            </div>
            <h3 className="text-lg font-bold text-stone-900">Swap at Hub or Request Delivery</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              When the state of charge is low, swap for a fully recharged pack at the nearest village solar hub in under 3 minutes, or request doorstep cargo e-trike delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOME & FARM SOLUTION PREVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Engineered Offerings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Tailored Energy Packages
            </h2>
          </div>
          <button
            onClick={() => onNavigate('solutions')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full Technical Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Home Solution Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-emerald-700/50 transition-all">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                    Home Energy
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                    {homePkg.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900">
                    2.5 <span className="text-sm font-normal text-stone-500">kWh</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Nominal Capacity</div>
                </div>
              </div>

              <div className="h-48 sm:h-56 rounded-xl overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/rrev_home_battery_pack_1793288536714.jpg"
                  alt="RREV HomePack 2.5 kWh battery pack wall mounted"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {homePkg.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="font-semibold text-stone-800">Suitable Use Cases:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                  {homePkg.suitableUseCases.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 text-xs font-mono text-stone-700">
                <div className="flex justify-between">
                  <span>Planning Scenario:</span>
                  <span className="font-semibold text-stone-900">~9.5 hours @ 190W domestic load</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-1 font-sans">
                  Assumes 80% usable depth of discharge & 90% inverter conversion efficiency.
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Pilot Plans From</span>
                <div className="text-lg font-bold font-mono text-stone-900">
                  ₹{homePkg.baseMonthlyPriceINR} <span className="text-xs font-normal text-stone-500">/mo</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('solutions')}
                className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                Explore Home Specs
              </button>
            </div>
          </div>

          {/* Farm Solution Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-emerald-700/50 transition-all">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                    Farm Energy
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                    {farmPkg.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900">
                    3.0 <span className="text-sm font-normal text-stone-500">kWh</span>
                  </div>
                  <div className="text-[11px] text-stone-500">Nominal Capacity</div>
                </div>
              </div>

              <div className="h-48 sm:h-56 rounded-xl overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/rrev_farm_irrigation_1793288535938.jpg"
                  alt="RREV AgriPack 3.0 kWh battery in agricultural field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {farmPkg.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="font-semibold text-stone-800">Agricultural Applications:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                  {farmPkg.suitableUseCases.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-xs font-mono text-stone-700">
                <div className="flex justify-between">
                  <span>Planning Scenario:</span>
                  <span className="font-semibold text-stone-900">~2.4 hours @ 900W (1 HP Pump)</span>
                </div>
                <div className="text-[10px] text-stone-600 mt-1 font-sans">
                  Illustrative estimate (80% DoD, 90% inverter efficiency). Starting inrush current must be verified.
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Pilot Plans From</span>
                <div className="text-lg font-bold font-mono text-stone-900">
                  ₹{farmPkg.baseMonthlyPriceINR} <span className="text-xs font-normal text-stone-500">/mo</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('solutions')}
                className="px-4 py-2 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Explore Farm Specs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RUNTIME ESTIMATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RuntimeCalculator initialCategory="farm" />
      </section>

      {/* 5. SUBSCRIPTION PLANS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            Subscription Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Flexible Rural Energy Subscriptions
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Configurable battery swaps included each billing period. Transparent rates with zero long-term equipment depreciation risk.
          </p>

          {/* Monthly / Yearly switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Yearly (Save ~16% on Pilot Tier)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPriceINR : plan.yearlyPriceINR;
            const swaps = billingCycle === 'monthly' ? plan.monthlyIncludedSwaps : plan.yearlyIncludedSwaps;

            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm relative ${
                  plan.popular ? 'border-emerald-700 ring-1 ring-emerald-700' : 'border-stone-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Pilot Recommended
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                      {plan.category} Plan
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                      {plan.name}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-mono text-stone-900">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 font-sans">
                        / {billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-800 font-medium mt-1">
                      Includes {swaps} Battery Swaps / {billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Extra Swap Fee:</span>
                      <span className="font-mono font-medium text-stone-900">₹{plan.additionalSwapPriceINR}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Support Level:</span>
                      <span className="text-stone-800 text-right text-[11px]">{plan.supportLevel.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('subscriptions')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                      plan.popular
                        ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                    }`}
                  >
                    Select Plan Details
                  </button>
                  <div className="text-[10px] text-center text-stone-400 mt-2">
                    Illustrative pilot assumption
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BENEFICIARY GROUPS SECTION */}
      <section className="bg-stone-900 text-stone-100 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Community Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Who RREV Serves Across Rural Andhra & Telangana
            </h2>
            <p className="text-sm text-stone-400 mt-2">
              Addressing localized energy bottlenecks where grid power is erratic or agricultural feeders run only during off-peak night hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3">
              <div className="text-emerald-400 font-mono text-xs uppercase font-semibold">01. Smallholder Farmers</div>
              <h3 className="text-base font-bold text-white">Daytime Crop Irrigation</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Run pumps and drip lines during daytime sunlight rather than dangerous night hours when agricultural grid supply is typically energized.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3">
              <div className="text-emerald-400 font-mono text-xs uppercase font-semibold">02. Rural Families</div>
              <h3 className="text-base font-bold text-white">Evening Domestic Security</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Quiet, fume-free battery power for children to study under reliable lighting, air circulation during hot seasons, and connected communications.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3">
              <div className="text-emerald-400 font-mono text-xs uppercase font-semibold">03. Primary Healthcare Clinics</div>
              <h3 className="text-base font-bold text-white">Cold-Chain & Critical Care</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Protect temperature-sensitive vaccines and emergency maternity ward lighting without expensive, polluting diesel generators.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-3">
              <div className="text-emerald-400 font-mono text-xs uppercase font-semibold">04. Village Enterprises</div>
              <h3 className="text-base font-bold text-white">Productivity & Livelihood</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Keep flour mills, tailoring shops, welding units, and milk chilling stations open during peak business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRANSPARENT PILOT ENROLLMENT & CALLBACK FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Early Pilot Registration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Request a Site Assessment for Your Village or Farm
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                We are actively evaluating pilot sites in Kurnool, Anantapur, Warangal, and Nalgonda districts. Register your interest for priority equipment assessment.
              </p>

              <div className="space-y-2 text-xs text-emerald-200/80 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Free on-site pump inrush and load rating check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>No lock-in contract during pilot evaluation</span>
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <div className="lg:col-span-6 bg-white text-stone-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-100">
              {leadSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">Request Received!</h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you, {leadForm.name}. An RREV rural energy coordinator will contact you at {leadForm.phone} within 24 hours.
                  </p>
                  <button
                    onClick={() => setLeadSubmitted(false)}
                    className="text-xs text-emerald-800 font-semibold underline mt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Reddy"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="+91 94400 00000"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Village / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.villageOrTown}
                        onChange={(e) => setLeadForm({ ...leadForm, villageOrTown: e.target.value })}
                        placeholder="e.g. Chinnatekur"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        District *
                      </label>
                      <select
                        value={leadForm.district}
                        onChange={(e) => setLeadForm({ ...leadForm, district: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                      >
                        <option value="Kurnool">Kurnool (AP)</option>
                        <option value="Anantapur">Anantapur (AP)</option>
                        <option value="Warangal">Warangal (TS)</option>
                        <option value="Nalgonda">Nalgonda (TS)</option>
                        <option value="Chittoor">Chittoor (AP)</option>
                        <option value="Other">Other AP / TS District</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">
                      Primary Application
                    </label>
                    <select
                      value={leadForm.customerType}
                      onChange={(e) => setLeadForm({ ...leadForm, customerType: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="farmer">Agricultural Irrigation / Farm Power</option>
                      <option value="home">Rural Household Domestic Lighting & Fans</option>
                      <option value="healthcare">Primary Health Centre / Clinic</option>
                      <option value="school">Rural School / Study Center</option>
                      <option value="business">Village Enterprise / Small Shop</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm"
                  >
                    Request Callback & Site Evaluation
                  </button>
                  <div className="text-[10px] text-center text-stone-500">
                    No spam. Your details will only be used by the RREV pilot coordination team.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
