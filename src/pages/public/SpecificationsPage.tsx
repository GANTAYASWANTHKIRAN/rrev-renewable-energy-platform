import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface SpecificationsPageProps {
  onNavigate: (view: string) => void;
}

export const SpecificationsPage: React.FC<SpecificationsPageProps> = ({ onNavigate }) => {
  const { packages } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Engineering Specifications
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Battery System Specifications & Standards
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Comprehensive technical comparison of RREV prototype battery packs, chemistries, electrical protections, and field ratings.
        </p>
      </div>

      {/* Startup Prototype Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-950">Prototype Engineering Notice</div>
          <p className="leading-relaxed">
            The specifications listed below represent early-stage prototype engineering benchmarks. They have not yet received formal BIS (Bureau of Indian Standards) or AIS certification. Inverter surge compatibility, cell thermal behavior under 45°C ambient field conditions, and cycle longevity are undergoing active pilot validation in Andhra Pradesh and Telangana.
          </p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <h2 className="text-lg font-bold text-stone-900">Technical Comparison Matrix</h2>
          <p className="text-xs text-stone-500 mt-1">Cross-pack electrical, mechanical, and operational parameters.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 w-1/4">Specification Parameter</th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="py-4 px-6 w-1/4">
                    <div className="text-stone-900 font-bold text-sm">{pkg.name}</div>
                    <div className="text-stone-500 font-normal uppercase text-[10px] mt-0.5">{pkg.category} Tier</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono text-stone-800">
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Nominal Energy Capacity</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-bold text-emerald-800">{p.nominalKwh} kWh ({p.nominalKwh * 1000} Wh)</td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Usable DoD & Efficiency</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6">
                    {(p.usableDoD * 100)}% DoD · {(p.inverterEfficiency * 100)}% Inverter
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Net Delivered Energy</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-bold text-stone-950">
                    {((p.nominalKwh * 1000) * p.usableDoD * p.inverterEfficiency).toFixed(0)} Wh
                  </td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Max Continuous Output</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-semibold">{p.maxContinuousWatts} Watts</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Peak Surge Inrush Tolerance</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6">{p.peakSurgeWatts} Watts (up to 5s)</td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Cell Chemistry</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-sans text-stone-700">{p.chemistry}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Nominal Voltage</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6">{p.nominalVoltage}V DC (16S Configuration)</td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Cycle Life Expectancy</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-sans">&gt; 3,000 cycles to 80% SOH</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Pack Weight & Mobility</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-sans">{p.weightKg} kg · {p.formFactor}</td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Ingress / Weather Rating</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-semibold">{p.outdoorRating}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Operating Temperature</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-sans">0°C to 50°C (Active BMS cut-off)</td>
                ))}
              </tr>
              <tr className="bg-stone-50/50">
                <td className="py-3.5 px-6 font-sans font-medium text-stone-600">Quick Swap Connector</td>
                {packages.map(p => (
                  <td key={p.id} className="py-3.5 px-6 font-sans">Anderson SB120 / IP67 quick lock</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety & Standards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="text-sm font-bold text-stone-900">1. Thermal Management</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Internal cell temperature sensors prevent rapid charging if internal pack core temperature exceeds 45°C during hot summer afternoons in Rayalaseema.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="text-sm font-bold text-stone-900">2. Motor Inrush Capacitors</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Agricultural inverter docks incorporate specialized heavy-duty film capacitors to swallow the 3.8 kW inrush spike when a 1 HP pump motor starts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <h3 className="text-sm font-bold text-stone-900">3. Quick-Lock Connectors</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Polarity-keyed, spark-inhibited connectors ensure safe, tool-free swapping even when handled by farm workers with gloves or in dusty field environments.
          </p>
        </div>
      </div>

      <div className="p-8 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-stone-900">Ready to Review Pilot Subscriptions?</h3>
          <p className="text-xs text-stone-600 mt-1">Explore our monthly and yearly subscription tiers with included swapping allowances.</p>
        </div>
        <button
          onClick={() => onNavigate('subscriptions')}
          className="px-6 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shadow-sm"
        >
          View Subscription Plans
        </button>
      </div>
    </div>
  );
};
