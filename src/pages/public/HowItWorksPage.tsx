import React from 'react';
import { ArrowRight, RefreshCw, Zap, Shield, Battery, CheckCircle2 } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (view: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Architecture & Operations
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          How Decentralized Rural Battery Swapping Works
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          A closed-loop energy infrastructure combining village-level solar charging microgrids, ruggedized smart batteries, and localized logistics.
        </p>
      </div>

      {/* Hero photo of community swap hub */}
      <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xl relative min-h-[380px] sm:min-h-[460px] bg-stone-900">
        <img
          src="/src/assets/images/rrev_community_swap_hub_1793288536706.jpg"
          alt="RREV village clean energy charging station and battery swap racks"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
          <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            Village Hub Concept · Chinnatekur, Kurnool
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Solar-Powered Village Charging Microgrids
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            Standardized battery racks continuously recharged via ground-mounted and rooftop solar arrays, providing ready-to-swap energy regardless of transmission grid outages.
          </p>
        </div>
      </div>

      {/* Detailed 4-Stage Lifecycle */}
      <div className="space-y-8">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          The 4-Stage Service Lifecycle
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold flex items-center justify-center text-sm border border-emerald-200">
              01
            </div>
            <h3 className="text-base font-bold text-stone-900">Central Solar Recharging</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Batteries recharge in temperature-regulated multi-bay docks at village hubs during peak daytime solar irradiance (9 AM - 4 PM), utilizing pure solar DC power.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold flex items-center justify-center text-sm border border-emerald-200">
              02
            </div>
            <h3 className="text-base font-bold text-stone-900">Rapid 3-Minute Swapping</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Subscribers bring their depleted pack to the hub. The operator scans the QR code, verifies battery health via BMS reader, and issues a 100% charged pack in minutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold flex items-center justify-center text-sm border border-emerald-200">
              03
            </div>
            <h3 className="text-base font-bold text-stone-900">Doorstep & Field Delivery</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              For agricultural fields located 2-5 km away from village centers, RREV electric cargo trikes dispatch scheduled swap replacements directly to farm borewells.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-bold flex items-center justify-center text-sm border border-emerald-200">
              04
            </div>
            <h3 className="text-base font-bold text-stone-900">Cloud Diagnostics & Safety</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Each swap syncs cell impedance, cycle count, and temperature logs to our operational console. Weak or abnormal cells are automatically quarantined for maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* Agriculture & Harvest Season Alignment */}
      <div className="bg-stone-50 rounded-3xl p-8 sm:p-10 border border-stone-200 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Socio-Economic Design
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            Tailored to Agricultural Seasons in Andhra Pradesh & Telangana
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Rural incomes in the Deccan plateau fluctuate dramatically between planting and post-harvest sales. RREV plans are designed around seasonal reality:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900">Kharif Season (June - October)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Monsoon crop cycles (cotton, paddy, groundnut, pulses). Critical focus on supplementary irrigation during dry spells and high-throughput battery sprayer recharges.
            </p>
            <div className="text-[11px] font-semibold text-emerald-800">
              High swap frequency · Flexible rollover allowances
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900">Rabi Season (November - March)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Winter horticultural crops (chilli, vegetables, sunflower, maize). Essential daytime borewell pumping when state electricity boards ration 3-phase agricultural power to unpredictable midnight windows.
            </p>
            <div className="text-[11px] font-semibold text-emerald-800">
              Daytime irrigation priority · Field dispatch support
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 bg-emerald-950 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Have Questions About Compatibility?</h3>
          <p className="text-xs text-emerald-200 mt-1">Our field engineering team can review your specific domestic or agricultural load.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl transition-colors whitespace-nowrap"
          >
            Request a Field Call
          </button>
          <button
            onClick={() => onNavigate('subscriptions')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl transition-colors whitespace-nowrap"
          >
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );
};
