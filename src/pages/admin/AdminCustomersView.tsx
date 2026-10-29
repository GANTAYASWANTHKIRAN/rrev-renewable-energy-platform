import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Filter, Phone, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface AdminCustomersViewProps {
  onNavigate: (view: string) => void;
}

export const AdminCustomersView: React.FC<AdminCustomersViewProps> = ({ onNavigate }) => {
  const { allUsers, subscriptions, batteries, packages } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const customers = allUsers.filter(u => u.role === 'customer');

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery) ||
                          c.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || c.customerType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Customer Management
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Registered Rural Customers
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review customer profiles, active energy plans, connected battery hardware, and regional distribution.
        </p>
      </div>

      {/* Search and filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, village, or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs">
          <span className="text-stone-500 font-medium">Category:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none bg-white font-medium capitalize"
          >
            <option value="all">All Categories</option>
            <option value="farmer">Farmers (Agri)</option>
            <option value="home">Rural Households</option>
            <option value="healthcare">Healthcare</option>
            <option value="school">Schools</option>
            <option value="business">Small Businesses</option>
          </select>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Customer Directory ({filtered.length})
          </h2>
          <span className="text-xs text-stone-400 font-mono">Pilot Cluster Roster</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Customer Name & ID</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Service Location</th>
                <th className="py-3.5 px-6">Active Subscription</th>
                <th className="py-3.5 px-6">Connected Battery</th>
                <th className="py-3.5 px-6">Joined Date</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((cust) => {
                const sub = subscriptions.find(s => s.userId === cust.id && s.status === 'active');
                const bat = batteries.find(b => b.assignedCustomerId === cust.id && b.status === 'in_use');

                return (
                  <tr key={cust.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <span className="font-bold text-stone-900 block">{cust.name}</span>
                      <span className="font-mono text-[11px] text-stone-500">{cust.phone}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold capitalize bg-stone-100 text-stone-700">
                        {cust.customerType}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-medium text-stone-900 block">{cust.village}</span>
                      <span className="text-stone-500 text-[11px]">{cust.district}, {cust.state}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      {sub ? (
                        <div>
                          <span className="font-bold text-emerald-800 block">{sub.planId}</span>
                          <span className="text-stone-500 text-[11px] font-mono">
                            {sub.remainingSwaps} / {sub.includedSwaps} swaps left
                          </span>
                        </div>
                      ) : (
                        <span className="text-stone-400">No active plan</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      {bat ? (
                        <div>
                          <span className="font-bold text-stone-900">{bat.id}</span>
                          <span className="text-emerald-700 text-[11px] block">{bat.stateOfChargePct}% SoC</span>
                        </div>
                      ) : (
                        <span className="text-stone-400">None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-stone-500">
                      {cust.joinedDate}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => setSelectedUser(cust)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">{selectedUser.name}</h3>
                <span className="text-xs text-stone-500 font-mono">ID: {selectedUser.id} · {selectedUser.customerType.toUpperCase()}</span>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-1 text-stone-400 hover:text-stone-700">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                <div>
                  <span className="text-stone-500 block">Mobile Phone:</span>
                  <span className="font-mono font-bold text-stone-900">{selectedUser.phone}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Email Address:</span>
                  <span className="font-mono text-stone-900">{selectedUser.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Village & District:</span>
                  <span className="font-semibold text-stone-900">{selectedUser.village}, {selectedUser.district}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Member Since:</span>
                  <span className="font-mono text-stone-900">{selectedUser.joinedDate}</span>
                </div>
              </div>

              {selectedUser.notes && (
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-stone-700">
                  <span className="font-semibold block text-emerald-950 mb-0.5">Field / Equipment Notes:</span>
                  <p>{selectedUser.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
