import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BatteryCharging, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  MapPin,
  Plus
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { 
    allUsers, 
    subscriptions, 
    batteries, 
    swapRequests, 
    supportTickets, 
    inquiries 
  } = useApp();

  const customerCount = allUsers.filter(u => u.role === 'customer').length;
  const activeSubsCount = subscriptions.filter(s => s.status === 'active').length;
  
  const availableBatteries = batteries.filter(b => b.status === 'available').length;
  const inUseBatteries = batteries.filter(b => b.status === 'in_use').length;
  const chargingBatteries = batteries.filter(b => b.status === 'charging').length;
  const maintenanceBatteries = batteries.filter(b => b.status === 'maintenance' || b.status === 'unavailable').length;

  const pendingSwaps = swapRequests.filter(s => s.status === 'pending');
  const openTickets = supportTickets.filter(t => t.status === 'open' || t.status === 'in_progress');

  // Customer type breakdown
  const customers = allUsers.filter(u => u.role === 'customer');
  const farmCustomers = customers.filter(c => c.customerType === 'farmer').length;
  const homeCustomers = customers.filter(c => c.customerType === 'home').length;
  const otherCustomers = customers.length - farmCustomers - homeCustomers;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <span>RREV Operations Management</span>
            <span aria-hidden="true">·</span>
            <span>Andhra & Telangana Grid Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Network Operations Console
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Real-time hub inventory telemetry, customer swap fulfillment queue, and subscription administration across pilot village clusters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('admin-swaps')}
            className="px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Process Swap Queue ({pendingSwaps.length})</span>
          </button>
          <button
            onClick={() => onNavigate('admin-inventory')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors whitespace-nowrap"
          >
            Manage Battery Fleet
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Total Customers
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900">
            {customerCount}
          </div>
          <div className="text-[11px] text-stone-500">
            Registered pilot members
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Active Subscriptions
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800">
            {activeSubsCount}
          </div>
          <div className="text-[11px] text-emerald-800">
            Generating recurring MRR
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Ready to Swap
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
            {availableBatteries}
          </div>
          <div className="text-[11px] text-stone-500">
            Available at village hubs
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            In Field / In Use
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900">
            {inUseBatteries}
          </div>
          <div className="text-[11px] text-stone-500">
            Powering homes & pumps
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Charging / Solar Bay
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-700">
            {chargingBatteries}
          </div>
          <div className="text-[11px] text-stone-500">
            Docks active & charging
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            Pending Swaps
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700">
            {pendingSwaps.length}
          </div>
          <div className="text-[11px] text-rose-700">
            Awaiting dispatch approval
          </div>
        </div>
      </div>

      {/* Operations Grid: Fulfillment Queue & Fleet Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pending Swap Requests Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">Immediate Swap Fulfillment Queue</h2>
              <p className="text-xs text-stone-500 mt-0.5">Customer requests pending dispatch or hub handover.</p>
            </div>
            <button
              onClick={() => onNavigate('admin-swaps')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
            >
              <span>View Full Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingSwaps.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-semibold text-stone-800 text-sm">Fulfillment Queue Clear</div>
              <p className="text-xs text-stone-500">All customer swap requests have been processed.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {pendingSwaps.map((req) => (
                <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 text-xs">{req.id}</span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs font-semibold text-stone-800">{req.customerName}</span>
                      <span className="text-[11px] text-stone-500">({req.customerVillage}, {req.district})</span>
                    </div>
                    <div className="text-xs text-stone-600">
                      Tier: <span className="font-medium capitalize">{req.packageCategory}</span> · {req.preferredTimeSlot}
                    </div>
                    {req.notes && (
                      <p className="text-[11px] text-stone-500 italic max-w-md">"{req.notes}"</p>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate('admin-swaps')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                  >
                    Review & Dispatch
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Fleet Telemetry & Demographics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Battery Status Breakdown */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900">Battery Fleet Utilization</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-600">Available Ready:</span>
                  <span className="font-mono font-bold text-emerald-800">{availableBatteries} of {batteries.length} ({Math.round((availableBatteries / batteries.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-700 h-2 rounded-full" style={{ width: `${(availableBatteries / batteries.length) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-600">In Active Field Deployment:</span>
                  <span className="font-mono font-bold text-stone-900">{inUseBatteries} of {batteries.length} ({Math.round((inUseBatteries / batteries.length) * 100)}%)</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-stone-800 h-2 rounded-full" style={{ width: `${(inUseBatteries / batteries.length) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-600">Charging at Solar Hubs:</span>
                  <span className="font-mono font-bold text-amber-700">{chargingBatteries} of {batteries.length}</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${(chargingBatteries / batteries.length) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-600">Under Maintenance / Inspection:</span>
                  <span className="font-mono font-bold text-stone-500">{maintenanceBatteries} units</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-stone-400 h-2 rounded-full" style={{ width: `${(maintenanceBatteries / batteries.length) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
              <span className="text-stone-500">Total Battery Hardware Capital:</span>
              <span className="font-mono font-bold text-stone-900">{batteries.length} Pack Units</span>
            </div>
          </div>

          {/* Customer Category Demographics */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900">Customer Base Distribution</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
                <div className="text-2xl font-bold font-mono text-stone-900">{farmCustomers}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Farmers (Agri)</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
                <div className="text-2xl font-bold font-mono text-stone-900">{homeCustomers}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Rural Homes</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80">
                <div className="text-2xl font-bold font-mono text-stone-900">{otherCustomers}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Clinics / Shops</div>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 leading-relaxed">
              Target pilot distribution prioritizes 1 HP pump irrigation users in Kurnool (AP) and domestic student households in Warangal (TS).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
