import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                <span>⚡R</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">RREV</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Renewable Rural Energy Vision — decentralized modular battery swapping and clean solar backup systems tailored for rural homes, farmers, and healthcare clinics across Andhra Pradesh and Telangana.
            </p>
            <div className="text-xs text-stone-500 pt-1">
              <span>Pilot Coordination Hub: Kurnool & Warangal</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 tracking-wider uppercase mb-4">
              Energy Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  Home Energy (2.5 kWh)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-emerald-400 transition-colors">
                  Farm Energy & 1 HP Pumps (3.0 kWh)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specifications')} className="hover:text-emerald-400 transition-colors">
                  Technical Specifications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subscriptions')} className="hover:text-emerald-400 transition-colors">
                  Monthly & Yearly Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-emerald-400 transition-colors">
                  Decentralized Swapping Network
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Access */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 tracking-wider uppercase mb-4">
              Platform & Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('customer-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customer-swaps')} className="hover:text-emerald-400 transition-colors">
                  Request Battery Swap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Operations & Admin Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">
                  Rural Energy Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Pilot Village Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Startup Transparency Notice */}
          <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-800 space-y-2 text-xs">
            <div className="font-semibold text-stone-200">
              Early-Stage Startup Prototype
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              RREV is currently an early-stage startup concept and academic entrepreneurship prototype. Specifications, pricing models (e.g. ₹100–₹180 per swap), and agricultural runtime scenarios are engineered planning hypotheses undergoing field validation.
            </p>
            <p className="text-stone-500 text-[10px]">
              Prototype specifications are subject to actual electrical motor inrush verification, ambient battery temperatures, and grid safety standards.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} RREV — Renewable Rural Energy Vision. Designed for rural energy resilience in India.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-stone-400 transition-colors">About Us</button>
            <button onClick={() => onNavigate('specifications')} className="hover:text-stone-400 transition-colors">Engineering Model</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-stone-400 transition-colors">Contact Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
