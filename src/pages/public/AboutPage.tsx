import React from 'react';
import { Target, Lightbulb, Compass, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Founding Mission
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Renewable Rural Energy Vision (RREV)
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Solving the rural energy accessibility trilemma in South India through decentralized battery swapping, clean solar microgrids, and service-based subscriptions.
        </p>
      </div>

      {/* The Problem & Context */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Why Rural Andhra Pradesh & Telangana?
          </h2>
          <p>
            Across regions like Rayalaseema (Kurnool, Anantapur, Kadapa, Chittoor) and rural Telangana (Warangal, Nalgonda, Mahbubnagar), grid electrification exists on paper, but reliability remains a daily crisis.
          </p>
          <p>
            Agricultural three-phase power is often supplied for only 6 to 7 hours a day, frequently scheduled at 1:00 AM or 2:00 AM. Farmers are forced to venture into pitch-black fields amid venomous snakes and flooded terrain to switch on borewell pumps.
          </p>
          <p>
            Meanwhile, rural households face sudden voltage sags and 4–8 hour load-shedding during peak evening hours, impacting children studying for competitive board examinations and putting primary healthcare vaccine refrigerators at risk.
          </p>
        </div>

        <div className="bg-stone-100 p-8 rounded-3xl border border-stone-200 space-y-5">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
            The Traditional Trap vs The RREV Vision
          </div>
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <strong className="text-stone-900 block font-semibold mb-1">
                The Traditional Fix: High Upfront Debt
              </strong>
              <span className="text-stone-600">
                Purchasing a private solar pump system or heavy lead-acid inverter costs ₹1.5L – ₹3.5L. Smallholder farmers must take high-interest microloans, and lead-acid batteries degrade after 24–36 months, stranding households in debt.
              </span>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <strong className="text-emerald-950 block font-semibold mb-1">
                The RREV Solution: Energy as a Service
              </strong>
              <span className="text-emerald-900">
                Zero capital expenditure for the battery. Users pay a modest monthly or seasonal subscription, exchange packs at local village hubs, and benefit from professionally maintained, long-life LiFePO4 cells.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Prototype Statement */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Startup Stage & Roadmap
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            Honest Startup Status & Pilot Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            RREV is an academic and entrepreneurial venture prototype. We are currently preparing for Phase 1 proof-of-concept testing:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="font-mono text-emerald-800 font-bold text-xs uppercase">Phase 1: Proof of Concept</div>
            <h3 className="font-bold text-stone-900 text-sm">Hardware Benchmarking (Current)</h3>
            <p className="text-stone-600 leading-relaxed">
              Testing 2.5 kWh and 3.0 kWh prototype battery packs in lab settings. Calibrating inverter inrush suppression for 1 HP monoblock pumps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="font-mono text-stone-500 font-bold text-xs uppercase">Phase 2: 2-Village Pilot</div>
            <h3 className="font-bold text-stone-900 text-sm">Cluster Deployment (Q2 2027)</h3>
            <p className="text-stone-600 leading-relaxed">
              Deploying 20 battery units across Chinnatekur (Kurnool) and Madikonda (Warangal) to validate battery swap ergonomics and solar charging uptime.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="font-mono text-stone-500 font-bold text-xs uppercase">Phase 3: District Expansion</div>
            <h3 className="font-bold text-stone-900 text-sm">Network Scale (2028+)</h3>
            <p className="text-stone-600 leading-relaxed">
              Institutional partnerships with farmer producer organizations (FPOs), primary health centers, and rural district administrations.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Focus */}
      <div className="p-8 bg-stone-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Regional Development Anchor</span>
          </div>
          <h3 className="text-xl font-bold">Rooted in Andhra Pradesh & Telangana</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Our technology architecture is intentionally tailored for semi-arid agro-climatic conditions, groundnut and cotton cropping seasons, and the specific distribution grid topology of southern India.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl transition-colors whitespace-nowrap shadow-sm"
        >
          Contact the Pilot Team
        </button>
      </div>
    </div>
  );
};
