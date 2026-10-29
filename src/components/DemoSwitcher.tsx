import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Shield, RotateCcw, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface DemoSwitcherProps {
  onNavigate: (view: string) => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({ onNavigate }) => {
  const { currentUser, allUsers, switchDemoUser, logout, resetAllData, subscriptions, batteries } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const activeSub = currentUser ? subscriptions.find(s => s.userId === currentUser.id && s.status === 'active') : null;
  const activeBattery = currentUser ? batteries.find(b => b.assignedCustomerId === currentUser.id && b.status === 'in_use') : null;

  return (
    <aside 
      aria-label="Demo Role Switcher"
      className="fixed bottom-4 right-4 z-50 text-xs font-sans"
    >
      {isOpen ? (
        <div className="bg-white border border-stone-300 rounded-xl shadow-2xl p-4 w-80 max-w-[90vw] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5 font-semibold text-stone-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Interactive Demo Controller</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-stone-500 hover:text-stone-800 p-1 rounded hover:bg-stone-100"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2.5 space-y-2">
            <div className="text-[11px] text-stone-500">Switch active user role for evaluation:</div>
            
            {allUsers.map((user) => {
              const isSelected = currentUser?.id === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    switchDemoUser(user.id);
                    if (user.role === 'admin') {
                      onNavigate('admin-dashboard');
                    } else {
                      onNavigate('customer-dashboard');
                    }
                  }}
                  className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-medium' 
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {user.role === 'admin' ? (
                        <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      )}
                      <span className="font-semibold text-xs">{user.name}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 truncate mt-0.5">
                      {user.role === 'admin' ? 'Operations Admin' : `${user.customerType.toUpperCase()} · ${user.village}, ${user.district}`}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                </button>
              );
            })}

            <button
              onClick={() => {
                logout();
                onNavigate('home');
              }}
              className="w-full text-left p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium"
            >
              Log out (Guest Public View)
            </button>
          </div>

          {currentUser && (
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 space-y-1 my-2 text-[11px]">
              <div className="text-stone-500 font-medium">Active Session State:</div>
              <div className="text-stone-800">
                Plan: <span className="font-semibold">{activeSub ? `${activeSub.planId}` : 'No active subscription'}</span>
              </div>
              {activeSub && (
                <div className="text-stone-800">
                  Swaps: <span className="font-semibold">{activeSub.remainingSwaps} / {activeSub.includedSwaps} remaining</span>
                </div>
              )}
              {activeBattery && (
                <div className="text-stone-800">
                  Connected Battery: <span className="font-semibold">{activeBattery.id} ({activeBattery.stateOfChargePct}% SoC)</span>
                </div>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                if (confirm('Reset all demo data back to default initial seed?')) {
                  resetAllData();
                  onNavigate('home');
                }
              }}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Seed</span>
            </button>
            <span className="text-stone-400">RREV AP & TS Pilot</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900 text-stone-100 shadow-xl hover:bg-stone-800 border border-stone-700 hover:scale-[1.02] transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="font-medium">
            Demo Mode: {currentUser ? currentUser.name.split(' ')[0] : 'Guest'}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
        </button>
      )}
    </aside>
  );
};
