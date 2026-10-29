/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoSwitcher } from './components/DemoSwitcher';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { SpecificationsPage } from './pages/public/SpecificationsPage';
import { SubscriptionsPage } from './pages/public/SubscriptionsPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { AuthPage } from './pages/public/AuthPage';

// Customer pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CustomerSubscriptionView } from './pages/customer/CustomerSubscriptionView';
import { CustomerSwapRequestsView } from './pages/customer/CustomerSwapRequestsView';
import { CustomerPackagesView } from './pages/customer/CustomerPackagesView';
import { CustomerProfileView } from './pages/customer/CustomerProfileView';
import { CustomerSupportView } from './pages/customer/CustomerSupportView';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminInventoryView } from './pages/admin/AdminInventoryView';
import { AdminSwapRequestsView } from './pages/admin/AdminSwapRequestsView';
import { AdminCustomersView } from './pages/admin/AdminCustomersView';
import { AdminSubscriptionsView } from './pages/admin/AdminSubscriptionsView';
import { AdminSupportView } from './pages/admin/AdminSupportView';

import { 
  LayoutDashboard, 
  RefreshCw, 
  CreditCard, 
  Package, 
  User, 
  HelpCircle,
  Battery, 
  Users, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const { currentUser } = useApp();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const isCustomerPortal = currentView.startsWith('customer');
  const isAdminPortal = currentView.startsWith('admin');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* 3-Zone Top Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Secondary Portal Bar for Customer */}
      {isCustomerPortal && currentUser && (
        <div className="bg-emerald-950 text-emerald-100 border-b border-emerald-900/80 sticky top-16 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-6 scrollbar-none">
              <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Customer Portal</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0 text-xs">
                <button
                  onClick={() => handleNavigate('customer-dashboard')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-dashboard'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNavigate('customer-swaps')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-swaps'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Battery Swaps</span>
                </button>

                <button
                  onClick={() => handleNavigate('customer-subscription')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-subscription'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>My Plan</span>
                </button>

                <button
                  onClick={() => handleNavigate('customer-packages')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-packages'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Packages</span>
                </button>

                <button
                  onClick={() => handleNavigate('customer-profile')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-profile'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => handleNavigate('customer-support')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'customer-support'
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Portal Bar for Admin */}
      {isAdminPortal && currentUser?.role === 'admin' && (
        <div className="bg-stone-900 text-stone-200 border-b border-stone-800 sticky top-16 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-6 scrollbar-none">
              <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Operations Console</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0 text-xs">
                <button
                  onClick={() => handleNavigate('admin-dashboard')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-dashboard'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => handleNavigate('admin-inventory')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-inventory'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Battery className="w-3.5 h-3.5" />
                  <span>Battery Fleet</span>
                </button>

                <button
                  onClick={() => handleNavigate('admin-swaps')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-swaps'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Swap Queue</span>
                </button>

                <button
                  onClick={() => handleNavigate('admin-customers')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-customers'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Customers</span>
                </button>

                <button
                  onClick={() => handleNavigate('admin-subscriptions')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-subscriptions'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Plans & Pricing</span>
                </button>

                <button
                  onClick={() => handleNavigate('admin-support')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    currentView === 'admin-support'
                      ? 'bg-stone-800 text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Support & Leads</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1">
        {/* Public Views */}
        {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentView === 'solutions' && <SolutionsPage onNavigate={handleNavigate} />}
        {currentView === 'specifications' && <SpecificationsPage onNavigate={handleNavigate} />}
        {currentView === 'subscriptions' && <SubscriptionsPage onNavigate={handleNavigate} />}
        {currentView === 'how-it-works' && <HowItWorksPage onNavigate={handleNavigate} />}
        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentView === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentView === 'auth' && <AuthPage onNavigate={handleNavigate} />}

        {/* Customer Portal Views */}
        {currentView === 'customer-dashboard' && <CustomerDashboard onNavigate={handleNavigate} />}
        {currentView === 'customer-subscription' && <CustomerSubscriptionView onNavigate={handleNavigate} />}
        {currentView === 'customer-swaps' && <CustomerSwapRequestsView onNavigate={handleNavigate} />}
        {currentView === 'customer-packages' && <CustomerPackagesView onNavigate={handleNavigate} />}
        {currentView === 'customer-profile' && <CustomerProfileView onNavigate={handleNavigate} />}
        {currentView === 'customer-support' && <CustomerSupportView onNavigate={handleNavigate} />}

        {/* Admin Portal Views */}
        {currentView === 'admin-dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {currentView === 'admin-inventory' && <AdminInventoryView onNavigate={handleNavigate} />}
        {currentView === 'admin-swaps' && <AdminSwapRequestsView onNavigate={handleNavigate} />}
        {currentView === 'admin-customers' && <AdminCustomersView onNavigate={handleNavigate} />}
        {currentView === 'admin-subscriptions' && <AdminSubscriptionsView onNavigate={handleNavigate} />}
        {currentView === 'admin-support' && <AdminSupportView onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Demo Switcher for fast evaluation */}
      <DemoSwitcher onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
