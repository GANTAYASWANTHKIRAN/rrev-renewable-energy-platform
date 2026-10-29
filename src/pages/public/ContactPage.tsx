import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Phone, Mail, MapPin, Send } from 'lucide-react';
import { CustomerCategory } from '../../types';

interface ContactPageProps {
  onNavigate: (view: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { submitContactInquiry } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    villageOrTown: '',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    customerType: 'farmer' as CustomerCategory,
    interestedPackage: 'pkg-farm-30',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }
    if (!formData.villageOrTown.trim()) {
      setErrorMessage('Please enter your village or town name.');
      return;
    }

    submitContactInquiry(formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Request a Callback or Site Evaluation
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Whether you are a farmer wanting to test your 1 HP pump, a rural school headmaster, or a prospective investor in decentralized energy, reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact info & hub locations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-3xl border border-stone-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                Direct Contact
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Pilot Operations Team
              </h2>
            </div>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Andhra Pradesh Pilot Hub:</strong>
                  <span>Chinnatekur Village, Kallur Mandal, Kurnool District, AP — 518218</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Telangana Pilot Station:</strong>
                  <span>Madikonda Industrial Corridor, Kazipet Mandal, Warangal, TS — 506142</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-stone-400">Field Hotline:</span>
                  <div className="font-mono font-medium text-white">+91 98480 12345 (8 AM – 7 PM)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-stone-400">General Inquiries:</span>
                  <div className="font-mono font-medium text-white">pilot@rrev.energy</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="font-bold text-stone-900">
              Interested in Becoming a Village Hub Partner?
            </div>
            <p className="leading-relaxed">
              We collaborate with village panchayats, local self-help groups (SHGs), and youth entrepreneurs who wish to host a solar charging battery hub on their property.
            </p>
          </div>
        </div>

        {/* Lead capture form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Inquiry Logged</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Your inquiry has been stored in the RREV database. An operations coordinator will connect with you via mobile at <span className="font-mono font-semibold text-stone-800">{formData.phone}</span>.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      villageOrTown: '',
                      district: 'Kurnool',
                      state: 'Andhra Pradesh',
                      customerType: 'farmer',
                      interestedPackage: 'pkg-farm-30',
                      message: ''
                    });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
                >
                  Submit Another Inquiry
                </button>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                >
                  Explore Energy Packages
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-stone-900 pb-2 border-b border-stone-100">
                Send an Inquiry or Schedule a Field Visit
              </h2>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94401 00000"
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Category of Applicant
                  </label>
                  <select
                    value={formData.customerType}
                    onChange={(e) => setFormData({ ...formData, customerType: e.target.value as CustomerCategory })}
                    className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                  >
                    <option value="farmer">Farmer (Irrigation & Agricultural)</option>
                    <option value="home">Rural Household (Domestic Lighting)</option>
                    <option value="healthcare">Primary Healthcare / Clinic</option>
                    <option value="school">Rural School / Educational Center</option>
                    <option value="business">Local Small Enterprise / Shop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Village or Town Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.villageOrTown}
                    onChange={(e) => setFormData({ ...formData, villageOrTown: e.target.value })}
                    placeholder="e.g. Chinnatekur"
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
                    <option value="Kurnool">Kurnool (AP)</option>
                    <option value="Anantapur">Anantapur (AP)</option>
                    <option value="Chittoor">Chittoor (AP)</option>
                    <option value="Guntur">Guntur (AP)</option>
                    <option value="Warangal">Warangal (TS)</option>
                    <option value="Nalgonda">Nalgonda (TS)</option>
                    <option value="Nizamabad">Nizamabad (TS)</option>
                    <option value="Mahbubnagar">Mahbubnagar (TS)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Message or Equipment Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your motor rating (e.g., 1 HP monoblock, 2 HP submersible), number of lights, or questions about battery swapping..."
                  className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to RREV Operations</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
