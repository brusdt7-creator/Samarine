import React, { useState } from 'react';
import { RFQLead, LeadStatus } from '../../types/maritime';
import { useMaritime } from '../../context/MaritimeContext';
import { 
  Ship, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  Paperclip, 
  Trash2, 
  Edit3, 
  Check, 
  Filter,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

export const LeadsTable: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useMaritime();

  const [filterPort, setFilterPort] = useState<'ALL' | 'KPT' | 'PQA'>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [tempQuote, setTempQuote] = useState('');

  const filteredLeads = leads.filter(l => {
    if (filterPort !== 'ALL' && l.portOfCall !== filterPort) return false;
    if (filterStatus !== 'ALL' && l.status !== filterStatus) return false;
    return true;
  });

  const handleStartEdit = (lead: RFQLead) => {
    setEditingLeadId(lead.id);
    setTempNotes(lead.adminNotes || '');
    setTempQuote(lead.quotedAmount || '');
  };

  const handleSaveEdit = (lead: RFQLead) => {
    updateLeadStatus(lead.id, lead.status, tempNotes, tempQuote);
    setEditingLeadId(null);
  };

  return (
    <div className="space-y-4">
      {/* Table Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            <span>Filter By:</span>
          </div>

          <select
            value={filterPort}
            onChange={(e) => setFilterPort(e.target.value as any)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Ports (KPT & PQA)</option>
            <option value="KPT">Karachi Port Trust (KPT)</option>
            <option value="PQA">Port Muhammad Bin Qasim (PQA)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Quoted">Quoted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredLeads.length}</span> of {leads.length} vessel leads
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Ref & Date</th>
              <th className="py-3 px-4">Vessel & IMO</th>
              <th className="py-3 px-4">Port / Berth</th>
              <th className="py-3 px-4">Required Stores / Service</th>
              <th className="py-3 px-4">Contact Agent</th>
              <th className="py-3 px-4">Status & Quote</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-sans">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <Ship className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                  <p>No vessel inquiries found matching the selected criteria.</p>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const isEditing = editingLeadId === lead.id;

                const statusColor = {
                  New: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300',
                  Contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300',
                  Quoted: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300',
                  Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300',
                }[lead.status];

                const whatsappLink = `https://wa.me/${lead.contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${lead.contactPerson}, this is Shoukat from Super Marine regarding your vessel ${lead.vesselName} (IMO: ${lead.imoNumber}) at ${lead.portOfCall}.`
                )}`;

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Ref & Date */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 block">{lead.id}</span>
                      <span className="text-[11px] text-slate-400">{lead.createdAt}</span>
                    </td>

                    {/* Vessel & IMO */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block font-heading">{lead.vesselName}</span>
                      <span className="font-mono text-xs text-slate-500">IMO: {lead.imoNumber}</span>
                    </td>

                    {/* Port & Berth */}
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        lead.portOfCall === 'KPT' ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200' : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200'
                      }`}>
                        {lead.portOfCall}
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5 truncate max-w-[150px]">{lead.berthOrAnchorage}</span>
                    </td>

                    {/* Required Category & Details */}
                    <td className="py-3 px-4 max-w-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">{lead.requiredCategory}</span>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{lead.details}</p>
                      
                      {lead.attachmentName && (
                        <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                          <Paperclip className="w-3 h-3" />
                          <span className="truncate max-w-[120px]">{lead.attachmentName}</span>
                        </div>
                      )}
                    </td>

                    {/* Contact Agent */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold block">{lead.contactPerson}</span>
                      <a href={`mailto:${lead.contactEmail}`} className="text-xs text-slate-500 hover:underline block truncate max-w-[140px]">
                        {lead.contactEmail}
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{lead.contactPhone}</span>
                      </a>
                    </td>

                    {/* Status & Quoted Price */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <div className="space-y-1.5 w-36">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="w-full text-xs p-1 border rounded bg-white dark:bg-slate-800 dark:border-slate-700"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Quote Amount (USD/PKR)"
                            value={tempQuote}
                            onChange={(e) => setTempQuote(e.target.value)}
                            className="w-full text-xs p-1 border rounded bg-white dark:bg-slate-800 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            placeholder="Admin Notes"
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            className="w-full text-xs p-1 border rounded bg-white dark:bg-slate-800 dark:border-slate-700"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor}`}>
                            {lead.status}
                          </span>
                          {lead.quotedAmount && (
                            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block font-semibold mt-1">
                              {lead.quotedAmount}
                            </span>
                          )}
                          {lead.adminNotes && (
                            <span className="text-[11px] text-slate-400 italic block mt-0.5 line-clamp-1">
                              Note: {lead.adminNotes}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(lead)}
                          className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                          title="Save notes"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(lead)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                            title="Edit notes and quote"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete RFQ ${lead.id} for ${lead.vesselName}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                            title="Delete RFQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
