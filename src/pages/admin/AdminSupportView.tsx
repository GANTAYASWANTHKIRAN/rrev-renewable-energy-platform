import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, PhoneCall, CheckCircle2, Clock, Check, AlertCircle, X, Send } from 'lucide-react';
import { SupportTicket, ContactInquiry } from '../../types';

interface AdminSupportViewProps {
  onNavigate: (view: string) => void;
}

export const AdminSupportView: React.FC<AdminSupportViewProps> = ({ onNavigate }) => {
  const { 
    supportTickets, 
    inquiries, 
    updateSupportTicket, 
    updateInquiryStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tickets' | 'inquiries'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketReply, setTicketReply] = useState('');
  const [ticketStatus, setTicketStatus] = useState<SupportTicket['status']>('resolved');

  const openTickets = supportTickets.filter(t => t.status !== 'resolved');
  const resolvedTickets = supportTickets.filter(t => t.status === 'resolved');

  const handleOpenTicketModal = (t: SupportTicket) => {
    setSelectedTicket(t);
    setTicketReply(t.adminResponse || '');
    setTicketStatus(t.status);
  };

  const handleTicketUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;
    updateSupportTicket(selectedTicket.id, ticketStatus, ticketReply);
    setSelectedTicket(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          Operations & Customer Care
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Support Tickets & Field Inquiries
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Respond to inverter alerts, farm compatibility queries, and evaluate incoming pilot village requests.
        </p>

        {/* Tab switch */}
        <div className="pt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === 'tickets'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            Support Tickets ({supportTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === 'inquiries'
                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            Public Leads & Callbacks ({inquiries.length})
          </button>
        </div>
      </div>

      {/* Basic Operational Health KPIs as requested in Section 10 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Ticket Resolution Rate
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-800">
            {Math.round((resolvedTickets.length / (supportTickets.length || 1)) * 100)}%
          </div>
          <p className="text-xs text-stone-500">
            {resolvedTickets.length} of {supportTickets.length} issues successfully addressed.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Average Field Response
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900">
            3.4 Hours
          </div>
          <p className="text-xs text-stone-500">
            Average time for technician inspection dispatch in pilot clusters.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Inbound Pilot Pipeline
          </span>
          <div className="text-2xl font-bold font-mono text-amber-700">
            {inquiries.length} Inquiries
          </div>
          <p className="text-xs text-stone-500">
            Farmers and clinics awaiting site assessment visits.
          </p>
        </div>
      </div>

      {/* TICKETS TAB */}
      {activeTab === 'tickets' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              Customer Support Tickets ({supportTickets.length})
            </h2>
            <span className="text-xs text-stone-400 font-mono">Central Helpdesk</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">ID & Date</th>
                  <th className="py-3.5 px-6">Customer & Village</th>
                  <th className="py-3.5 px-6">Subject & Category</th>
                  <th className="py-3.5 px-6">Priority</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {supportTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono">
                      <span className="font-bold text-stone-900 block">{t.id}</span>
                      <span className="text-[11px] text-stone-400">{t.createdAt}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-stone-900 block">{t.customerName}</span>
                      <span className="text-stone-500 text-[11px]">{t.village} ({t.customerPhone})</span>
                    </td>
                    <td className="py-3.5 px-6 max-w-sm">
                      <span className="font-medium text-stone-900 block truncate">{t.subject}</span>
                      <span className="text-stone-500 text-[11px] capitalize">{t.category.replace('_', ' ')}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono ${
                        t.priority === 'high'
                          ? 'bg-rose-50 text-rose-800'
                          : t.priority === 'medium'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        t.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-800'
                          : t.status === 'in_progress'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => handleOpenTicketModal(t)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Reply / Resolve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INQUIRIES TAB */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              Inbound Site Assessment Requests ({inquiries.length})
            </h2>
            <span className="text-xs text-stone-400 font-mono">Pilot Waitlist Pipeline</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">ID & Date</th>
                  <th className="py-3.5 px-6">Applicant Name</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Phone & Email</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Notes / Message</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono">
                      <span className="font-bold text-stone-900 block">{inq.id}</span>
                      <span className="text-[11px] text-stone-400">{inq.createdAt}</span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-stone-900">
                      {inq.name}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-medium text-stone-900 block">{inq.villageOrTown}</span>
                      <span className="text-stone-500 text-[11px]">{inq.district}, {inq.state}</span>
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      <span className="text-stone-900 block">{inq.phone}</span>
                      <span className="text-stone-400 text-[11px]">{inq.email || '—'}</span>
                    </td>
                    <td className="py-3.5 px-6 capitalize">
                      {inq.customerType}
                    </td>
                    <td className="py-3.5 px-6 max-w-xs text-stone-600 truncate">
                      {inq.message}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        inq.status === 'contacted'
                          ? 'bg-emerald-50 text-emerald-800'
                          : inq.status === 'pilot_waitlist'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        {inq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {inq.status === 'new' && (
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'contacted')}
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg whitespace-nowrap"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {inq.status === 'contacted' && (
                        <button
                          onClick={() => updateInquiryStatus(inq.id, 'pilot_waitlist')}
                          className="px-3 py-1.5 text-xs font-semibold text-sky-800 hover:bg-sky-50 rounded-lg whitespace-nowrap"
                        >
                          Move to Waitlist
                        </button>
                      )}
                      {inq.status === 'pilot_waitlist' && (
                        <span className="text-stone-400 font-mono text-[11px]">Enrolled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TICKET RESPONSE MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900">Respond to Ticket {selectedTicket.id}</h3>
                <span className="text-xs text-stone-500">
                  {selectedTicket.customerName} ({selectedTicket.village})
                </span>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTicketUpdate} className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1.5 text-xs">
                <div className="font-semibold text-stone-900">{selectedTicket.subject}</div>
                <p className="text-stone-600 leading-relaxed">{selectedTicket.message}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Status
                </label>
                <select
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white font-medium"
                >
                  <option value="in_progress">In Progress (Field Tech Assigned)</option>
                  <option value="resolved">Resolved</option>
                  <option value="open">Open</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Technician Response / Advisory
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketReply}
                  onChange={(e) => setTicketReply(e.target.value)}
                  placeholder="Explain findings, pump motor compatibility verdict, or swap scheduling instructions..."
                  className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm"
                >
                  Save & Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
