import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Zap, ArrowRight, Shield } from 'lucide-react';

interface CustomerPackagesViewProps {
  onNavigate: (view: string) => void;
}

export const CustomerPackagesView: React.FC<CustomerPackagesViewProps> = ({ onNavigate }) => {
  const { packages, currentUser } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Hardware Catalog
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Available Battery Packages
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review technical ratings, usable depths of discharge, and supported appliance loads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isSelected = currentUser?.preferredPackageId === pkg.id;

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl border p-6 flex flex-col justify-between shadow-sm space-y-6 ${
                isSelected ? 'border-emerald-700 ring-2 ring-emerald-700/80' : 'border-stone-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {pkg.category} Tier
                    </span>
                    <h2 className="text-xl font-bold text-stone-900 mt-2">{pkg.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-stone-900">{pkg.nominalKwh}</span>
                    <span className="text-xs text-stone-500 block">kWh</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Continuous Load:</span>
                    <span className="font-mono font-bold text-stone-900">{pkg.maxContinuousWatts}W</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Peak Surge (5s):</span>
                    <span className="font-mono font-bold text-stone-900">{pkg.peakSurgeWatts}W</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Usable DoD:</span>
                    <span className="font-mono font-bold text-stone-900">{pkg.usableDoD * 100}%</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Inverter Efficiency:</span>
                    <span className="font-mono font-bold text-stone-900">{pkg.inverterEfficiency * 100}%</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Casing Rating:</span>
                    <span className="font-medium text-stone-900">{pkg.outdoorRating}</span>
                  </div>
                </div>

                {/* Scenarios */}
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 text-xs space-y-1">
                  <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Planning Benchmark</span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {pkg.sampleScenarioName}: ~{pkg.sampleScenarioEstimatedHours} hrs runtime.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('subscriptions')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                >
                  View Plans for this Package
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
