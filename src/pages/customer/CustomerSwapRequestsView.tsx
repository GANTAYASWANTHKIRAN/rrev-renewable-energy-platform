import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, Plus, AlertCircle, CheckCircle2, Clock, Truck, Store, X } from 'lucide-react';

interface CustomerSwapRequestsViewProps {
  onNavigate: (view: string) => void;
}

export const CustomerSwapRequestsView: React.FC<CustomerSwapRequestsViewProps> = ({ onNavigate }) => {
  const { 
    currentUser, 
    subscriptions, 
    packages, 
    batteries, 
    swapRequests, 
    requestSwap, 
    cancelSwapRequest 
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferredSlot, setPreferredSlot] = useState('Morning (07:00 - 10:00)');
  const [deliveryMode, setDeliveryMode] = useState<'hub_pickup' | 'doorstep_delivery'>('doorstep_delivery');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Please Sign In</h2>
        <button onClick={() => onNavigate('auth')} className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-xl">
          Sign In
        </button>
      </div>
    );
  }

  const activeSub = subscriptions.find(s => s.userId === currentUser.id && s.status === 'active');
  const userSwaps = swapRequests.filter(s => s.customerId === currentUser.id);

  // Check available batteries in user's category
  const userPkg = activeSub ? packages.find(p => p.id === activeSub.packageId) : null;
  const availableBatteriesCount = userPkg 
    ? batteries.filter(b => b.category === userPkg.category && b.status === 'available').length 
    : 0;

  const handleSubmitSwap = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const result = requestSwap({
      customerId: currentUser.id,
      preferredTimeSlot: preferredSlot,
      deliveryMode,
      notes
    });

    setFeedback(result);
    if (result.success) {
      setNotes('');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Customer Services
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Battery Swap Requests & History
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Exchange your discharged battery for a fresh pack at your local hub or schedule an on-farm e-trike drop-off.
          </p>
        </div>

        <button
          onClick={() => {
            setFeedback(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Swap Request</span>
        </button>
      </div>

      {/* Allowance & Availability Notice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Your Swap Allowance
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900">
            {activeSub ? `${activeSub.remainingSwaps} / ${activeSub.includedSwaps}` : '0'}
          </div>
          <p className="text-xs text-stone-500">
            Remaining swaps for the current active billing cycle.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Hub Ready Inventory
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-700">
            {availableBatteriesCount} Units Ready
          </div>
          <p className="text-xs text-stone-500">
            Fully charged {userPkg ? userPkg.name : 'compatible'} packs at your local cluster hub.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Turnaround Window
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900">
            &lt; 45 Mins
          </div>
          <p className="text-xs text-stone-500">
            Average field dispatch turnaround for scheduled slots.
          </p>
        </div>
      </div>

      {/* Inventory separation notice as requested */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-800">Operational Notice:</strong> Subscription swap allowance and physical battery availability are decoupled. In the event that a temporary spike in agricultural irrigation demand consumes hub inventory, requests are queued by timestamp for the next available charging slot.
        </p>
      </div>

      {/* Swap Requests Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">All Submitted Swap Requests</h2>
          <span className="text-xs text-stone-500">{userSwaps.length} total records</span>
        </div>

        {userSwaps.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-stone-300 mx-auto" />
            <h3 className="text-sm font-semibold text-stone-700">No swap requests found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Ready to swap? Click "New Swap Request" to schedule your next charged battery.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">Request ID</th>
                  <th className="py-3.5 px-6">Date Requested</th>
                  <th className="py-3.5 px-6">Mode</th>
                  <th className="py-3.5 px-6">Scheduled Window</th>
                  <th className="py-3.5 px-6">Assigned Battery</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Notes / Destination</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {userSwaps.map((req) => (
                  <tr key={req.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-stone-900">{req.id}</td>
                    <td className="py-3.5 px-6 font-mono text-stone-500">{req.requestDate}</td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5 font-medium">
                        {req.deliveryMode === 'doorstep_delivery' ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-stone-500" />
                            <span>e-Trike Delivery</span>
                          </>
                        ) : (
                          <>
                            <Store className="w-3.5 h-3.5 text-stone-500" />
                            <span>Hub Pickup</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6">{req.preferredTimeSlot}</td>
                    <td className="py-3.5 px-6 font-mono">
                      {req.assignedBatteryId ? (
                        <span className="font-semibold text-stone-900">{req.assignedBatteryId}</span>
                      ) : (
                        <span className="text-stone-400">Queueing...</span>
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
                    <td className="py-3.5 px-6 text-stone-600 max-w-xs truncate">
                      {req.notes || '—'}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {req.status === 'pending' && (
                        <button
                          onClick={() => cancelSwapRequest(req.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-medium underline"
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

      {/* SWAP REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">Schedule a Battery Swap</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Request a fully charged pack from your local village hub.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                feedback.success ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}>
                {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />}
                <p>{feedback.message}</p>
              </div>
            )}

            {!activeSub ? (
              <div className="space-y-4 py-4 text-center">
                <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                <div className="font-bold text-stone-900 text-sm">No Active Subscription</div>
                <p className="text-xs text-stone-600">
                  You need an active energy subscription plan to request battery swaps.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onNavigate('subscriptions');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                >
                  View Subscription Plans
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitSwap} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Delivery / Exchange Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('doorstep_delivery')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                        deliveryMode === 'doorstep_delivery'
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-2 text-emerald-800" />
                      <div>
                        <div className="font-semibold">Field / Doorstep</div>
                        <div className="text-[10px] text-stone-500">e-Trike delivery to farm/home</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMode('hub_pickup')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                        deliveryMode === 'hub_pickup'
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <Store className="w-4 h-4 mb-2 text-emerald-800" />
                      <div>
                        <div className="font-semibold">Village Hub Pickup</div>
                        <div className="text-[10px] text-stone-500">Direct 3-min swap at hub</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    <option value="Morning (07:00 - 10:00)">Morning (07:00 – 10:00) — Best for Agri Irrigation</option>
                    <option value="Afternoon (11:00 - 14:00)">Afternoon (11:00 – 14:00)</option>
                    <option value="Evening (16:00 - 19:00)">Evening (16:00 – 19:00) — Best for Domestic Lights</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Field Notes or Landmark
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Near Chinnatekur North canal borewell, or home near village temple..."
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs flex justify-between items-center text-stone-600">
                  <span>Allowance after this swap:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {Math.max(0, activeSub.remainingSwaps - 1)} remaining
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors"
                  >
                    Confirm Swap Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
