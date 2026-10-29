import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, MapPin, Save, CheckCircle2 } from 'lucide-react';
import { CustomerCategory } from '../../types';

interface CustomerProfileViewProps {
  onNavigate: (view: string) => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({ onNavigate }) => {
  const { currentUser, updateUserProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    customerType: (currentUser?.customerType || 'farmer') as CustomerCategory,
    village: currentUser?.village || '',
    mandal: currentUser?.mandal || '',
    district: currentUser?.district || 'Kurnool',
    state: currentUser?.state || 'Andhra Pradesh',
    notes: currentUser?.notes || ''
  });

  const [saved, setSaved] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(currentUser.id, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Account Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Customer Profile & Service Location
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Keep your address, phone number, and agricultural equipment notes updated for accurate field delivery.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
        {saved && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Registered Mobile Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-200 bg-stone-50 rounded-xl text-stone-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-stone-400 mt-0.5 block">Primary account identifier</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Customer Type
              </label>
              <select
                value={formData.customerType}
                onChange={(e) => setFormData({ ...formData, customerType: e.target.value as CustomerCategory })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white capitalize"
              >
                <option value="farmer">Farmer (Agri Irrigation & Sprayers)</option>
                <option value="home">Rural Household (Domestic Lighting)</option>
                <option value="healthcare">Healthcare Clinic / Sub-centre</option>
                <option value="school">Rural School / Study Center</option>
                <option value="business">Village Enterprise / Small Shop</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Village / Town *
              </label>
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Mandal (Sub-District)
              </label>
              <input
                type="text"
                value={formData.mandal}
                onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                District *
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
              >
                <option value="Kurnool">Kurnool</option>
                <option value="Anantapur">Anantapur</option>
                <option value="Chittoor">Chittoor</option>
                <option value="Guntur">Guntur</option>
                <option value="Warangal">Warangal</option>
                <option value="Nalgonda">Nalgonda</option>
                <option value="Nizamabad">Nizamabad</option>
                <option value="Mahbubnagar">Mahbubnagar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Field & Equipment Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. 1 HP monoblock pump, 4 acres groundnut crop, farm located 1.2 km past village water tank..."
              className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
