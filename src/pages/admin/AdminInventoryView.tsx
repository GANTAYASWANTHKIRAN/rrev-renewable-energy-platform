import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Battery, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Sliders,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { BatteryItem, BatteryStatus } from '../../types';

interface AdminInventoryViewProps {
  onNavigate: (view: string) => void;
}

export const AdminInventoryView: React.FC<AdminInventoryViewProps> = ({ onNavigate }) => {
  const { batteries, addBattery, updateBattery, deleteBattery } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'home' | 'farm' | 'commercial'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingBattery, setEditingBattery] = useState<BatteryItem | null>(null);

  // Form states
  const [addForm, setAddForm] = useState({
    packageId: 'pkg-farm-30',
    category: 'farm' as 'home' | 'farm' | 'commercial',
    nominalKwh: 3.0,
    stateOfChargePct: 100,
    status: 'available' as BatteryStatus,
    assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
    healthPct: 100,
    cycleCount: 0,
    temperatureCelsius: 28,
    compatibilityNotes: 'New unit. Inrush surge checked for 1 HP pump.'
  });

  const [editForm, setEditForm] = useState<Partial<BatteryItem>>({});

  const filteredBatteries = batteries.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.assignedHubLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.compatibilityNotes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBattery(addForm);
    setIsAddOpen(false);
    setAddForm({
      packageId: 'pkg-farm-30',
      category: 'farm',
      nominalKwh: 3.0,
      stateOfChargePct: 100,
      status: 'available',
      assignedHubLocation: 'Kurnool Central Hub #1 (Chinnatekur)',
      healthPct: 100,
      cycleCount: 0,
      temperatureCelsius: 28,
      compatibilityNotes: 'New unit. Inrush surge checked for 1 HP pump.'
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBattery) return;
    updateBattery(editingBattery.id, editForm);
    setEditingBattery(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Operations & Assets
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Battery Fleet Inventory
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track individual battery pack state of charge, hub docking location, cycle health, and maintenance status.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Battery Unit</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search battery ID, hub, or notes..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg focus:outline-none bg-white font-medium"
            >
              <option value="all">All Tiers</option>
              <option value="home">Home (2.5 kWh)</option>
              <option value="farm">Farm (3.0 kWh)</option>
              <option value="commercial">Commercial (5.0 kWh)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-stone-300 rounded-lg focus:outline-none bg-white font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="charging">Charging</option>
              <option value="in_use">In Use (Field)</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Hardware Fleet ({filteredBatteries.length} Records)
          </h2>
          <span className="text-xs text-stone-400 font-mono">Live BMS Sync Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Battery ID</th>
                <th className="py-3.5 px-6">Tier & Capacity</th>
                <th className="py-3.5 px-6">State of Charge (SoC)</th>
                <th className="py-3.5 px-6">Operational Status</th>
                <th className="py-3.5 px-6">Current Hub Location</th>
                <th className="py-3.5 px-6">Health / Cycles</th>
                <th className="py-3.5 px-6">Last Synchronized</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredBatteries.map((bat) => (
                <tr key={bat.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-stone-900">{bat.id}</td>
                  <td className="py-3.5 px-6">
                    <span className="font-semibold capitalize text-stone-900">{bat.category}</span>
                    <span className="text-stone-500 font-mono ml-1.5">({bat.nominalKwh} kWh)</span>
                  </td>
                  <td className="py-3.5 px-6 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            bat.stateOfChargePct > 70
                              ? 'bg-emerald-600'
                              : bat.stateOfChargePct > 30
                              ? 'bg-amber-500'
                              : 'bg-rose-600'
                          }`}
                          style={{ width: `${bat.stateOfChargePct}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-stone-900">{bat.stateOfChargePct}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      bat.status === 'available'
                        ? 'bg-emerald-50 text-emerald-800'
                        : bat.status === 'charging'
                        ? 'bg-amber-50 text-amber-800'
                        : bat.status === 'in_use'
                        ? 'bg-stone-100 text-stone-800'
                        : bat.status === 'reserved'
                        ? 'bg-sky-50 text-sky-800'
                        : 'bg-rose-50 text-rose-800'
                    }`}>
                      {bat.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-stone-700 max-w-xs truncate">
                    {bat.assignedHubLocation}
                  </td>
                  <td className="py-3.5 px-6 font-mono text-stone-600">
                    {bat.healthPct}% SOH · {bat.cycleCount} cyc
                  </td>
                  <td className="py-3.5 px-6 font-mono text-stone-500 text-[11px]">
                    {bat.lastUpdated}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingBattery(bat);
                          setEditForm({ ...bat });
                        }}
                        className="p-1.5 text-stone-500 hover:text-emerald-800 rounded hover:bg-stone-100"
                        title="Edit Battery"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete battery ${bat.id}?`)) {
                            deleteBattery(bat.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100"
                        title="Delete Battery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD BATTERY MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-xl font-bold text-stone-900">Provision New Battery Unit</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Battery Tier
                  </label>
                  <select
                    value={addForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const nom = cat === 'home' ? 2.5 : cat === 'farm' ? 3.0 : 5.0;
                      setAddForm({ ...addForm, category: cat, nominalKwh: nom });
                    }}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    <option value="farm">Farm Pack (3.0 kWh)</option>
                    <option value="home">Home Pack (2.5 kWh)</option>
                    <option value="commercial">Commercial Pack (5.0 kWh)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Initial State of Charge (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={addForm.stateOfChargePct}
                    onChange={(e) => setAddForm({ ...addForm, stateOfChargePct: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    <option value="available">Available (Ready to swap)</option>
                    <option value="charging">Charging</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nominal Capacity (kWh)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={addForm.nominalKwh}
                    onChange={(e) => setAddForm({ ...addForm, nominalKwh: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Assigned Hub Location
                </label>
                <select
                  value={addForm.assignedHubLocation}
                  onChange={(e) => setAddForm({ ...addForm, assignedHubLocation: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                >
                  <option value="Kurnool Central Hub #1 (Chinnatekur)">Kurnool Central Hub #1 (Chinnatekur)</option>
                  <option value="Warangal Rural Hub #2 (Madikonda)">Warangal Rural Hub #2 (Madikonda)</option>
                  <option value="Nalgonda Agri Hub #1 (Nakrekal)">Nalgonda Agri Hub #1 (Nakrekal)</option>
                  <option value="Anantapur South Station (Bukkarayasamudram)">Anantapur South Station (Bukkarayasamudram)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Hardware Compatibility & Inspection Notes
                </label>
                <textarea
                  rows={2}
                  value={addForm.compatibilityNotes}
                  onChange={(e) => setAddForm({ ...addForm, compatibilityNotes: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm"
                >
                  Add Battery to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT BATTERY MODAL */}
      {editingBattery && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">Edit Battery {editingBattery.id}</h3>
                <span className="text-xs text-stone-500">Update live telemetry and station assignment.</span>
              </div>
              <button onClick={() => setEditingBattery(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    State of Charge (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.stateOfChargePct || 0}
                    onChange={(e) => setEditForm({ ...editForm, stateOfChargePct: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white font-medium"
                  >
                    <option value="available">Available (Ready to swap)</option>
                    <option value="charging">Charging at Dock</option>
                    <option value="reserved">Reserved for Swap</option>
                    <option value="in_use">In Use (Field)</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    State of Health (SOH %)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={editForm.healthPct || 100}
                    onChange={(e) => setEditForm({ ...editForm, healthPct: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Cycle Count
                  </label>
                  <input
                    type="number"
                    value={editForm.cycleCount || 0}
                    onChange={(e) => setEditForm({ ...editForm, cycleCount: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Hub Location
                </label>
                <input
                  type="text"
                  value={editForm.assignedHubLocation || ''}
                  onChange={(e) => setEditForm({ ...editForm, assignedHubLocation: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Compatibility Notes
                </label>
                <textarea
                  rows={2}
                  value={editForm.compatibilityNotes || ''}
                  onChange={(e) => setEditForm({ ...editForm, compatibilityNotes: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBattery(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm"
                >
                  Save Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
