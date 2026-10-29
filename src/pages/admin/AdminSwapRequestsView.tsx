import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, Search, CheckCircle2, Clock, Truck, Store, X, AlertCircle } from 'lucide-react';
import { SwapRequest, SwapRequestStatus } from '../../types';

interface AdminSwapRequestsViewProps {
  onNavigate: (view: string) => void;
}

export const AdminSwapRequestsView: React.FC<AdminSwapRequestsViewProps> = ({ onNavigate }) => {
  const { swapRequests, batteries, updateSwapRequestStatus } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dispatch modal
  const [activeRequest, setActiveRequest] = useState<SwapRequest | null>(null);
  const [selectedBatteryId, setSelectedBatteryId] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const filteredSwaps = swapRequests.filter(req => {
    const matchesSearch = req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.customerVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Ready batteries for dispatch modal
  const readyBatteries = activeRequest
    ? batteries.filter(b => b.category === activeRequest.packageCategory && (b.status === 'available' || b.id === activeRequest.assignedBatteryId))
    : [];

  const handleOpenDispatch = (req: SwapRequest) => {
    setActiveRequest(req);
    setSelectedBatteryId(req.assignedBatteryId || (readyBatteries[0]?.id || ''));
    setAdminNote(req.adminNotes || '');
  };

  const handleDispatchConfirm = () => {
    if (!activeRequest) return;
    updateSwapRequestStatus(activeRequest.id, 'approved_dispatched', selectedBatteryId, adminNote);
    setActiveRequest(null);
  };

  const handleCompleteSwap = (reqId: string) => {
    updateSwapRequestStatus(reqId, 'completed', undefined, 'Swap completed successfully at hub/field.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Fulfillment Operations
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Customer Swap Request Queue
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review pending requests, assign charged battery serials from hub racks, and track field delivery handoffs.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, village, or ID..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs">
          <span className="text-stone-500 font-medium">Status Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none bg-white font-medium"
          >
            <option value="all">All ({swapRequests.length})</option>
            <option value="pending">Pending Queue ({swapRequests.filter(s => s.status === 'pending').length})</option>
            <option value="approved_dispatched">Dispatched ({swapRequests.filter(s => s.status === 'approved_dispatched').length})</option>
            <option value="completed">Completed ({swapRequests.filter(s => s.status === 'completed').length})</option>
            <option value="cancelled">Cancelled ({swapRequests.filter(s => s.status === 'cancelled').length})</option>
          </select>
        </div>
      </div>

      {/* Swap table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Swap Records ({filteredSwaps.length})
          </h2>
          <span className="text-xs text-stone-400 font-mono">Central Fulfillment Queue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">ID & Date</th>
                <th className="py-3.5 px-6">Customer & Village</th>
                <th className="py-3.5 px-6">Category & Mode</th>
                <th className="py-3.5 px-6">Requested Window</th>
                <th className="py-3.5 px-6">Assigned Battery</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Fulfillment Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredSwaps.map((req) => (
                <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono">
                    <span className="font-bold text-stone-900 block">{req.id}</span>
                    <span className="text-[11px] text-stone-400">{req.requestDate}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="font-semibold text-stone-900 block">{req.customerName}</span>
                    <span className="text-stone-500">{req.customerVillage}, {req.district}</span>
                    <span className="text-[11px] text-stone-400 block font-mono">{req.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="font-medium capitalize text-stone-900">{req.packageCategory} Tier</span>
                    <span className="text-stone-500 block text-[11px]">
                      {req.deliveryMode === 'doorstep_delivery' ? 'Field e-Trike' : 'Hub Pickup'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-stone-600">
                    {req.preferredTimeSlot}
                  </td>
                  <td className="py-3.5 px-6 font-mono">
                    {req.assignedBatteryId ? (
                      <span className="font-bold text-stone-900">{req.assignedBatteryId}</span>
                    ) : (
                      <span className="text-stone-400">Not Assigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      req.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800'
                        : req.status === 'pending'
                        ? 'bg-amber-50 text-amber-800'
                        : req.status === 'approved_dispatched'
                        ? 'bg-sky-50 text-sky-800'
                        : 'bg-stone-100 text-stone-500'
                    }`}>
                      {req.status === 'approved_dispatched' ? 'Dispatched' : req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {req.status === 'pending' && (
                        <button
                          onClick={() => handleOpenDispatch(req)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm whitespace-nowrap"
                        >
                          Approve & Dispatch
                        </button>
                      )}

                      {req.status === 'approved_dispatched' && (
                        <button
                          onClick={() => handleCompleteSwap(req.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-emerald-200 hover:bg-emerald-300 rounded-lg whitespace-nowrap"
                        >
                          Mark Completed
                        </button>
                      )}

                      {req.status === 'completed' && (
                        <span className="text-stone-400 text-xs font-mono">Fulfilled</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPATCH APPROVAL MODAL */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">Approve Swap: {activeRequest.id}</h3>
                <span className="text-xs text-stone-500">
                  Customer: {activeRequest.customerName} ({activeRequest.customerVillage})
                </span>
              </div>
              <button onClick={() => setActiveRequest(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Assign Ready Battery from Inventory ({activeRequest.packageCategory} tier)
                </label>
                {readyBatteries.length === 0 ? (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
                    No batteries currently marked 'available' for {activeRequest.packageCategory} category. Please mark a charged pack available in Inventory first.
                  </div>
                ) : (
                  <select
                    value={selectedBatteryId}
                    onChange={(e) => setSelectedBatteryId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white font-mono"
                  >
                    {readyBatteries.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.stateOfChargePct}% SoC ({b.assignedHubLocation})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Fulfillment & Dispatch Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="e.g. Assigned to Cargo e-Trike Driver Kumar for morning route 2..."
                  className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRequest(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDispatchConfirm}
                  disabled={!selectedBatteryId}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-xl shadow-sm"
                >
                  Confirm & Dispatch Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
