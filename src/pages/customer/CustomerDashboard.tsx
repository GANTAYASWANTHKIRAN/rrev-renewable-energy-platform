import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BatteryCharging, RefreshCw, Zap, Calendar, MapPin, AlertCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface CustomerDashboardProps {
  onNavigate: (view: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  const { 
    currentUser, 
    subscriptions, 
    plans, 
    packages, 
    batteries, 
    swapRequests,
    cancelSwapRequest
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Please Sign In</h2>
        <p className="text-xs text-stone-600">You must be logged into a customer account to access this portal.</p>
        <button
          onClick={() => onNavigate('auth')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const activeSub = subscriptions.find(s => s.userId === currentUser.id && s.status === 'active');
  const activePlan = activeSub ? plans.find(p => p.id === activeSub.planId) : null;
  const activePackage = (activeSub 
    ? packages.find(p => p.id === activeSub.packageId) 
    : packages.find(p => p.id === currentUser.preferredPackageId)) || packages[0];

  const assignedBattery = batteries.find(b => b.assignedCustomerId === currentUser.id && b.status === 'in_use');
  const mySwaps = swapRequests.filter(r => r.customerId === currentUser.id);

  const swapPct = activeSub ? Math.round((activeSub.usedSwaps / activeSub.includedSwaps) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold uppercase tracking-wider mb-1">
            <span>Customer Portal</span>
            <span aria-hidden="true">·</span>
            <span>{currentUser.customerType.toUpperCase()} Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{currentUser.village}, {currentUser.district} ({currentUser.state})</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <span>Mobile: {currentUser.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('customer-swaps')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Request Battery Swap</span>
          </button>
          <button
            onClick={() => onNavigate('customer-support')}
            className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors whitespace-nowrap"
          >
            Report Issue
          </button>
        </div>
      </div>

      {/* Demonstration Banner */}
      <div className="bg-stone-100 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span><strong>Demonstration Sandbox:</strong> Connected to RREV Andhra Pradesh & Telangana pilot database.</span>
        </div>
        <span className="text-[11px] text-stone-400 hidden sm:inline">All actions persist locally</span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Subscription & Swaps */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Active Energy Plan
              </span>
              <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                activeSub ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
              }`}>
                {activeSub ? 'Active' : 'No Active Plan'}
              </span>
            </div>

            {activeSub ? (
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  {activePlan ? activePlan.name : 'Custom Plan'}
                </h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  ₹{activeSub.pricePaidINR} / {activeSub.billingCycle} · Renews {activeSub.renewalDate}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-stone-900">No active plan selected</h3>
                <p className="text-xs text-stone-500 mt-1">Select a monthly or yearly plan to enable battery swaps.</p>
              </div>
            )}
          </div>

          {activeSub ? (
            <div className="space-y-2 pt-3 border-t border-stone-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600 font-medium">Billing Period Swaps:</span>
                <span className="font-mono font-bold text-stone-900">
                  {activeSub.remainingSwaps} <span className="text-stone-400 font-normal">of {activeSub.includedSwaps} remaining</span>
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-700 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, 100 - swapPct)}%` }}
                ></div>
              </div>
              <div className="text-[11px] text-stone-400 flex justify-between">
                <span>{activeSub.usedSwaps} used</span>
                <span>{activeSub.remainingSwaps} left</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('subscriptions')}
              className="w-full py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
            >
              Choose a Subscription Plan
            </button>
          )}
        </div>

        {/* Card 2: Connected Battery Status */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Current Battery Pack
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                {assignedBattery ? assignedBattery.id : 'Pending Assignment'}
              </span>
            </div>

            {assignedBattery ? (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-stone-900">
                    {assignedBattery.stateOfChargePct}%
                  </span>
                  <span className="text-xs text-stone-500 font-medium">State of Charge (SoC)</span>
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Nominal: {assignedBattery.nominalKwh} kWh ({activePackage.chemistry.split(' ')[0]})
                </div>
              </div>
            ) : (
              <div>
                <div className="text-base font-bold text-stone-900">No active battery attached</div>
                <p className="text-xs text-stone-500 mt-1">
                  Once your swap request is approved, a fresh battery unit will appear here.
                </p>
              </div>
            )}
          </div>

          {assignedBattery && (
            <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs font-mono text-stone-600">
              <div className="flex justify-between">
                <span>Battery Health (SOH):</span>
                <span className="text-emerald-700 font-semibold">{assignedBattery.healthPct}%</span>
              </div>
              <div className="flex justify-between">
                <span>Cycle Count:</span>
                <span>{assignedBattery.cycleCount} cycles</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature:</span>
                <span>{assignedBattery.temperatureCelsius}°C (Normal)</span>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Energy Package Quick Spec */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Assigned Hardware Model
              </span>
              <span className="text-[11px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                {activePackage.outdoorRating}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900">{activePackage.name}</h3>
              <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                {activePackage.description}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Continuous Output:</span>
              <span className="font-mono font-semibold text-stone-900">{activePackage.maxContinuousWatts}W</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Peak Surge:</span>
              <span className="font-mono font-semibold text-stone-900">{activePackage.peakSurgeWatts}W</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Sample Scenario:</span>
              <span className="font-mono text-emerald-800 text-right">{activePackage.sampleScenarioName.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Swap Activity Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Recent Battery Swaps & Requests</h2>
            <p className="text-xs text-stone-500 mt-0.5">Track live swap status, scheduled pickups, and battery IDs.</p>
          </div>
          <button
            onClick={() => onNavigate('customer-swaps')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
          >
            <span>View All Swaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {mySwaps.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="text-sm font-semibold text-stone-700">No Swap Requests Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              When your battery state of charge drops, click the "Request Battery Swap" button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">Request ID</th>
                  <th className="py-3.5 px-6">Date & Time</th>
                  <th className="py-3.5 px-6">Delivery Mode</th>
                  <th className="py-3.5 px-6">Slot</th>
                  <th className="py-3.5 px-6">Assigned Battery</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {mySwaps.map((req) => (
                  <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-semibold text-stone-900">{req.id}</td>
                    <td className="py-3.5 px-6 font-mono text-stone-500">{req.requestDate}</td>
                    <td className="py-3.5 px-6">
                      {req.deliveryMode === 'doorstep_delivery' ? 'Field / Doorstep e-Trike' : 'Village Hub Pickup'}
                    </td>
                    <td className="py-3.5 px-6 text-stone-600">{req.preferredTimeSlot}</td>
                    <td className="py-3.5 px-6 font-mono">
                      {req.assignedBatteryId || <span className="text-stone-400">Assigning...</span>}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        req.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800'
                          : req.status === 'pending'
                          ? 'bg-amber-50 text-amber-800'
                          : req.status === 'approved_dispatched'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {req.status === 'approved_dispatched' ? 'Dispatched' : req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {req.status === 'pending' && (
                        <button
                          onClick={() => cancelSwapRequest(req.id)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
