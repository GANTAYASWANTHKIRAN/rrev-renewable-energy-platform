import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RuntimeCalculator } from '../../components/RuntimeCalculator';
import { ShieldCheck, AlertTriangle, ArrowRight, Zap, Check, HelpCircle } from 'lucide-react';

interface SolutionsPageProps {
  onNavigate: (view: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  const { packages } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'farm'>('home');

  const homePkg = packages.find(p => p.category === 'home') || packages[0];
  const farmPkg = packages.find(p => p.category === 'farm') || packages[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Energy Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Purpose-Built Clean Energy Architecture
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Engineered to withstand rural conditions, erratic village grid supply, and agricultural duty cycles.
        </p>

        {/* Tab switch */}
        <div className="pt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === 'home'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            Home Energy (2.5 kWh)
          </button>
          <button
            onClick={() => setActiveTab('farm')}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === 'farm'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            Farm Energy (3.0 kWh)
          </button>
        </div>
      </div>

      {/* Content for Home Energy */}
      {activeTab === 'home' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-xs font-mono font-semibold text-emerald-800 uppercase">
                    Model: {homePkg.name}
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900 mt-1">
                    Home Backup Battery System
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-emerald-800">2.5 kWh</div>
                  <div className="text-[11px] text-stone-500">Nominal Storage</div>
                </div>
              </div>

              <div className="h-64 rounded-xl overflow-hidden bg-stone-100 relative border border-stone-200">
                <img
                  src="/src/assets/images/rrev_home_battery_pack_1793288536714.jpg"
                  alt="RREV HomePack 2.5 kWh battery pack wall mounted"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {homePkg.description}
              </p>

              {/* Technical breakdown table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Technical Specifications & Limits
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Continuous Load:</span>
                    <span className="font-mono font-bold text-stone-900">{homePkg.maxContinuousWatts} W</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Peak Surge:</span>
                    <span className="font-mono font-bold text-stone-900">{homePkg.peakSurgeWatts} W (5s)</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Battery Chemistry:</span>
                    <span className="font-medium text-stone-900">LiFePO4 Safe Cells</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">System Voltage:</span>
                    <span className="font-mono font-bold text-stone-900">48V DC Nominal</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Pack Weight:</span>
                    <span className="font-mono font-bold text-stone-900">~{homePkg.weightKg} kg</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Ingress Rating:</span>
                    <span className="font-medium text-stone-900">{homePkg.outdoorRating}</span>
                  </div>
                </div>
              </div>

              {/* Suitable use cases */}
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Recommended Equipment Loads (Subject to actual ratings)
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {homePkg.suitableUseCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right sidebar: Domestic planning scenario & actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span>Domestic Planning Scenario</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Typical Evening Load (190W)
                </h3>
                <div className="py-2">
                  <div className="text-4xl font-extrabold font-mono text-emerald-400">
                    ~9.5 Hours
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Continuous backup runtime
                  </div>
                </div>
                <div className="text-xs text-stone-300 space-y-2 border-t border-stone-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Nominal Energy:</span>
                    <span className="font-mono">2,500 Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Usable (80% DoD):</span>
                    <span className="font-mono">2,000 Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Delivered (90% Eff):</span>
                    <span className="font-mono text-emerald-400">1,800 Wh</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed pt-2">
                  {homePkg.sampleScenarioCaveat}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('subscriptions')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    View Home Subscription Plans
                  </button>
                </div>
              </div>

              {/* Safety notice */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Safety & Thermal Protection</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Lithium Iron Phosphate (LiFePO4) chemistry offers superior thermal stability in high ambient Indian temperatures compared to conventional NMC cells. Built-in Battery Management System (BMS) monitors over-voltage, under-voltage, over-current, and cell temperature continuously.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for Farm Energy */}
      {activeTab === 'farm' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-xs font-mono font-semibold text-amber-900 uppercase">
                    Model: {farmPkg.name}
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900 mt-1">
                    Agricultural Field Battery Cart
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-stone-900">3.0 kWh</div>
                  <div className="text-[11px] text-stone-500">Nominal Storage</div>
                </div>
              </div>

              <div className="h-64 rounded-xl overflow-hidden bg-stone-100 relative border border-stone-200">
                <img
                  src="/src/assets/images/rrev_farm_irrigation_1793288535938.jpg"
                  alt="RREV AgriPack 3.0 kWh battery in agricultural field"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {farmPkg.description}
              </p>

              {/* Technical breakdown table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Agricultural Specifications & Surge Tolerances
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Continuous Load:</span>
                    <span className="font-mono font-bold text-stone-900">{farmPkg.maxContinuousWatts} W</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Starting Surge:</span>
                    <span className="font-mono font-bold text-stone-900">{farmPkg.peakSurgeWatts} W (Pump Start)</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Portability:</span>
                    <span className="font-medium text-stone-900">Pneumatic Wheeled Cart</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Field Protection:</span>
                    <span className="font-mono font-bold text-stone-900">{farmPkg.outdoorRating}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Total Weight:</span>
                    <span className="font-mono font-bold text-stone-900">~{farmPkg.weightKg} kg (trolley)</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                    <span className="text-stone-500 block text-[11px]">Solar Coupling:</span>
                    <span className="font-medium text-stone-900">Direct MC4 DC Inflow</span>
                  </div>
                </div>
              </div>

              {/* Agricultural applications */}
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  Compatible Agricultural Scenarios
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {farmPkg.suitableUseCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right sidebar: 1 HP pump calculation scenario as explicitly specified */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>Agricultural Pump Planning Scenario</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Compatible 1 HP Agricultural Pump (900W Load)
                </h3>
                <div className="py-2">
                  <div className="text-4xl font-extrabold font-mono text-amber-400">
                    ~2.4 Hours
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Illustrative irrigation runtime
                  </div>
                </div>

                <div className="text-xs text-stone-300 space-y-2 border-t border-stone-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Nominal Battery Energy:</span>
                    <span className="font-mono">3,000 Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Usable DoD (80%):</span>
                    <span className="font-mono">2,400 Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Inverter Efficiency (90%):</span>
                    <span className="font-mono">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Net Delivered Energy:</span>
                    <span className="font-mono text-amber-300">2,160 Wh</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-800/80 pt-1">
                    <span className="text-stone-400">Calculated Runtime:</span>
                    <span className="font-mono font-semibold text-white">2,160 / 900W = 2.40 hrs</span>
                  </div>
                </div>

                {/* Important caveat as requested */}
                <div className="bg-stone-800 p-3.5 rounded-xl border border-amber-500/30 text-[11px] text-stone-300 space-y-2">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Estimate, Not a Performance Guarantee</span>
                  </div>
                  <p className="leading-relaxed text-stone-400">
                    {farmPkg.sampleScenarioCaveat}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('subscriptions')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-amber-950 bg-amber-300 hover:bg-amber-200 transition-colors"
                  >
                    View Farm Subscription Plans
                  </button>
                </div>
              </div>

              {/* On-site technical support box */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>On-Farm Compatibility Protocol</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Before distributing an AgriPack 3.0 to a farm, an RREV field technician conducts a clamp-meter inrush current measurement on your specific pump motor to ensure inverter surge capacitors will not trip during start-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded interactive calculator */}
      <div className="pt-6">
        <RuntimeCalculator initialCategory={activeTab} />
      </div>
    </div>
  );
};
