import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { SupportTicket } from '../../types';

interface CustomerSupportViewProps {
  onNavigate: (view: string) => void;
}

export const CustomerSupportView: React.FC<CustomerSupportViewProps> = ({ onNavigate }) => {
  const { currentUser, supportTickets, submitSupportTicket } = useApp();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('technical');
  const [priority, setPriority] = useState<SupportTicket['priority']>('medium');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const myTickets = supportTickets.filter(t => t.customerId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    submitSupportTicket({
      customerId: currentUser.id,
      category,
      subject,
      message,
      priority
    });

    setSubmitted(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Support & Assistance
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Customer Service & Field Support
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Report technical inverter issues, request motor compatibility inspections, or get billing assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Submit Ticket Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Create a Support Ticket</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Field engineers usually reply within 4 hours during daylight operational windows.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Ticket logged successfully! Operations team has been notified.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
              >
                <option value="technical">Technical (Inverter, Battery Tripping, Pump Inrush)</option>
                <option value="swap_inquiry">Swap Inquiry / Rescheduling</option>
                <option value="battery_damage">Physical Casing or Cable Damage</option>
                <option value="billing">Subscription & Billing Questions</option>
                <option value="general">General Feedback or Request</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue..."
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as SupportTicket['priority'])}
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
              >
                <option value="low">Low (General question)</option>
                <option value="medium">Medium (Scheduled swap question)</option>
                <option value="high">High (Urgent pump outage / dark home)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Description & Symptoms
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain the problem in detail (e.g., error code on inverter, tripping upon motor startup)..."
                className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>

        {/* Tickets History */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">Your Support History</h2>
            <span className="text-xs text-stone-500">{myTickets.length} records</span>
          </div>

          {myTickets.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
              <MessageSquare className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="text-sm font-semibold text-stone-700">No support tickets found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                All systems normal. If you encounter any equipment problems, submit a ticket on the left.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {myTickets.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 text-xs">{t.id}</span>
                      <span className="text-xs text-stone-500">·</span>
                      <span className="text-xs text-stone-500 font-mono">{t.createdAt}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                      t.status === 'resolved'
                        ? 'bg-emerald-50 text-emerald-800'
                        : t.status === 'in_progress'
                        ? 'bg-sky-50 text-sky-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-stone-900">{t.subject}</h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {t.message}
                    </p>
                  </div>

                  {t.adminResponse && (
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 text-xs space-y-1">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>RREV Operations Response:</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed text-[11px]">
                        {t.adminResponse}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
