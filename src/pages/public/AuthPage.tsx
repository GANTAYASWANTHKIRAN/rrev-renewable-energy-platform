import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Shield, Lock, ArrowRight, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import { CustomerCategory } from '../../types';

interface AuthPageProps {
  onNavigate: (view: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { allUsers, login, registerCustomer, switchDemoUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('ramesh.reddy@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    customerType: 'farmer' as CustomerCategory,
    village: '',
    mandal: '',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    preferredPackageId: 'pkg-farm-30'
  });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or phone.');
      return;
    }

    const success = login(loginEmail);
    if (success) {
      const user = allUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
      if (user?.role === 'admin') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('customer-dashboard');
      }
    } else {
      setLoginError('Account not recognized. Try one of the 1-click demo logins below or register a new pilot account.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regData.name.trim() || !regData.email.trim() || !regData.phone.trim() || !regData.village.trim()) {
      setRegError('Please complete all required fields.');
      return;
    }

    try {
      const newUser = registerCustomer(regData);
      setRegSuccess(true);
      setTimeout(() => {
        onNavigate('customer-dashboard');
      }, 1000);
    } catch (err: any) {
      setRegError('Error during registration. Please check fields.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* 1-Click Evaluation Switcher Bar */}
      <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h2 className="text-sm font-bold text-white">Instant 1-Click Evaluator Access</h2>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">Pilot Sandbox Mode</span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">
          Skip manual typing by selecting any pre-seeded persona to test the customer or administrator portal immediately:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => {
              switchDemoUser('usr-customer-farm-1');
              onNavigate('customer-dashboard');
            }}
            className="p-3 bg-stone-800 hover:bg-stone-700/80 rounded-xl border border-stone-700 text-left transition-all group"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Ramesh Reddy (Farmer)</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Kurnool (AP) · Active 1 HP Pump Plan
            </div>
          </button>

          <button
            onClick={() => {
              switchDemoUser('usr-customer-home-1');
              onNavigate('customer-dashboard');
            }}
            className="p-3 bg-stone-800 hover:bg-stone-700/80 rounded-xl border border-stone-700 text-left transition-all group"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Lakshmi Devi (Home)</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Warangal (TS) · Home Backup Plan
            </div>
          </button>

          <button
            onClick={() => {
              switchDemoUser('usr-admin-1');
              onNavigate('admin-dashboard');
            }}
            className="p-3 bg-stone-800 hover:bg-stone-700/80 rounded-xl border border-stone-700 text-left transition-all group"
          >
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Operations Admin</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              Full Inventory, Swaps & Pricing Controls
            </div>
          </button>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-stone-100">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              {mode === 'login' ? 'Sign In to RREV Portal' : 'Register New Customer Account'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {mode === 'login' 
                ? 'Access your battery swap history, subscription status, and field support.'
                : 'Join our decentralized clean energy network in Andhra Pradesh and Telangana.'}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => { setMode('login'); setLoginError(''); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setRegError(''); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="pt-6 space-y-4 max-w-md mx-auto">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
                {loginError}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Email Address or Registered Mobile
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ramesh.reddy@example.com or admin@rrev.energy"
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">
                  Password
                </label>
                <span className="text-[11px] text-stone-400">Demo: password123</span>
              </div>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-xs text-stone-500 hover:text-emerald-800 font-medium"
              >
                Don't have an account yet? Register here
              </button>
            </div>
          </form>
        )}

        {/* REGISTRATION FORM */}
        {mode === 'register' && (
          <div className="pt-6">
            {regSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Registration Successful!</h3>
                <p className="text-xs text-stone-600">
                  Welcome to RREV, {regData.name}. Redirecting to your customer dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
                    {regError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      placeholder="e.g. Venkat Reddy"
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      placeholder="venkat@example.com"
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      placeholder="+91 94401 23456"
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Customer Category *
                    </label>
                    <select
                      value={regData.customerType}
                      onChange={(e) => setRegData({ ...regData, customerType: e.target.value as CustomerCategory })}
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="farmer">Farmer (Agri Irrigation & Sprayers)</option>
                      <option value="home">Rural Household (Domestic Backup)</option>
                      <option value="healthcare">Primary Health Centre / Clinic</option>
                      <option value="school">Rural School / Study Center</option>
                      <option value="business">Village Enterprise / Small Shop</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Preferred Battery Package
                    </label>
                    <select
                      value={regData.preferredPackageId}
                      onChange={(e) => setRegData({ ...regData, preferredPackageId: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="pkg-farm-30">RREV AgriPack 3.0 (3.0 kWh - 1 HP Pump)</option>
                      <option value="pkg-home-25">RREV HomePack 2.5 (2.5 kWh - Domestic)</option>
                      <option value="pkg-comm-50">RREV CommunityPro 5.0 (5.0 kWh - Clinic/Commercial)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Village / Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.village}
                      onChange={(e) => setRegData({ ...regData, village: e.target.value })}
                      placeholder="e.g. Chinnatekur"
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Mandal (Sub-district)
                    </label>
                    <input
                      type="text"
                      value={regData.mandal}
                      onChange={(e) => setRegData({ ...regData, mandal: e.target.value })}
                      placeholder="e.g. Kallur"
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      District *
                    </label>
                    <select
                      value={regData.district}
                      onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="Kurnool">Kurnool</option>
                      <option value="Anantapur">Anantapur</option>
                      <option value="Chittoor">Chittoor</option>
                      <option value="Guntur">Guntur</option>
                      <option value="Warangal">Warangal</option>
                      <option value="Nalgonda">Nalgonda</option>
                      <option value="Nizamabad">Nizamabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      State *
                    </label>
                    <select
                      value={regData.state}
                      onChange={(e) => setRegData({ ...regData, state: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
