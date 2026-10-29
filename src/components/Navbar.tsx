import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCustomerPortal = currentView.startsWith('customer');
  const isAdminPortal = currentView.startsWith('admin');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-md py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-emerald-900 transition-colors">
              <span className="tracking-tighter">⚡R</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
              RREV
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {isCustomerPortal ? (
              <>
                <button 
                  onClick={() => onNavigate('customer-dashboard')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer-dashboard' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('customer-swaps')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer-swaps' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Battery Swaps
                </button>
                <button 
                  onClick={() => onNavigate('customer-subscription')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer-subscription' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  My Plan
                </button>
                <button 
                  onClick={() => onNavigate('customer-packages')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer-packages' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Packages
                </button>
                <button 
                  onClick={() => onNavigate('customer-support')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer-support' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Support
                </button>
              </>
            ) : isAdminPortal ? (
              <>
                <button 
                  onClick={() => onNavigate('admin-dashboard')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'admin-dashboard' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => onNavigate('admin-inventory')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'admin-inventory' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Batteries
                </button>
                <button 
                  onClick={() => onNavigate('admin-swaps')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'admin-swaps' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Swap Queue
                </button>
                <button 
                  onClick={() => onNavigate('admin-customers')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'admin-customers' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Customers
                </button>
                <button 
                  onClick={() => onNavigate('admin-subscriptions')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'admin-subscriptions' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Plans
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('solutions')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'solutions' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Solutions
                </button>
                <button 
                  onClick={() => onNavigate('specifications')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'specifications' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Specifications
                </button>
                <button 
                  onClick={() => onNavigate('subscriptions')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'subscriptions' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Plans
                </button>
                <button 
                  onClick={() => onNavigate('how-it-works')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'how-it-works' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  How It Works
                </button>
                <button 
                  onClick={() => onNavigate('about')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'about' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  About
                </button>
                <button 
                  onClick={() => onNavigate('contact')}
                  className={`hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 ${currentView === 'contact' ? 'text-emerald-800 font-semibold' : ''}`}
                >
                  Contact
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => onNavigate(isAdminPortal ? 'home' : 'admin-dashboard')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {isAdminPortal ? 'Public Site' : 'Admin Portal'}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate(isCustomerPortal ? 'home' : 'customer-dashboard')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {isCustomerPortal ? 'Public Site' : 'Customer Portal'}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-600 hover:text-stone-900 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('solutions'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Solutions
            </button>
            <button
              onClick={() => { onNavigate('specifications'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Specifications
            </button>
            <button
              onClick={() => { onNavigate('subscriptions'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Subscription Plans
            </button>
            <button
              onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              About Mission
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              Contact / Request Callback
            </button>
            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('customer-dashboard'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-md"
              >
                Customer Portal
              </button>
              <button
                onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 text-sm font-medium text-stone-800 bg-stone-100 rounded-md"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
