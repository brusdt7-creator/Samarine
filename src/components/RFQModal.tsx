import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { useMaritime } from '../context/MaritimeContext';
import { PortId } from '../types/maritime';
import { 
  Anchor, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Send, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Ship,
  PhoneCall
} from 'lucide-react';

export const RFQModal: React.FC = () => {
  const { rfqModal, closeRfqModal, submitRFQLead, settings } = useMaritime();

  const [vesselName, setVesselName] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [portOfCall, setPortOfCall] = useState<PortId>('KPT');
  const [berthOrAnchorage, setBerthOrAnchorage] = useState('');
  const [eta, setEta] = useState('');
  const [requiredCategory, setRequiredCategory] = useState('');
  const [details, setDetails] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [urgency, setUrgency] = useState<'Normal' | 'Express 24h' | 'Emergency Anchorage'>('Express 24h');
  
  // File upload state
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync initial state when modal opens
  useEffect(() => {
    if (rfqModal.isOpen) {
      if (rfqModal.initialItemName) {
        setRequiredCategory(rfqModal.initialItemName);
        setDetails(`Inquiry regarding: ${rfqModal.initialItemName}. Please provide price quotation and delivery timeframe to berth/anchorage.`);
      } else if (rfqModal.initialCategory) {
        setRequiredCategory(rfqModal.initialCategory);
      }
      if (rfqModal.portHint) {
        setPortOfCall(rfqModal.portHint);
      }
      setSubmissionSuccess(null);
      setFormError(null);
    }
  }, [rfqModal.isOpen, rfqModal.initialItemName, rfqModal.initialCategory, rfqModal.portHint]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeMb} MB`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeMb} MB`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!vesselName.trim()) {
      setFormError('Please enter the Vessel Name.');
      return;
    }
    if (!imoNumber.trim()) {
      setFormError('Please enter the vessel IMO Number.');
      return;
    }
    if (!contactPerson.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      setFormError('Please provide your Contact Name, Email, and WhatsApp/Phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedId = await submitRFQLead({
        vesselName: vesselName.trim().toUpperCase(),
        imoNumber: imoNumber.trim(),
        portOfCall,
        berthOrAnchorage: berthOrAnchorage.trim() || (portOfCall === 'KPT' ? 'KPT Berth / Anchorage' : 'PQA Berth / Channel'),
        eta: eta.trim() || 'Prompt (Within 24 Hours)',
        requiredCategory: requiredCategory.trim() || 'General Chandlery Stores / Technical Work',
        details: details.trim(),
        contactPerson: contactPerson.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        attachmentName: fileName || undefined,
        urgency,
      });

      setSubmissionSuccess(generatedId);
    } catch {
      setFormError('An unexpected error occurred while dispatching your inquiry. Please contact Shoukat directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setVesselName('');
    setImoNumber('');
    setBerthOrAnchorage('');
    setEta('');
    setRequiredCategory('');
    setDetails('');
    setContactPerson('');
    setContactEmail('');
    setContactPhone('');
    setFileName(null);
    setFileSize(null);
    setSubmissionSuccess(null);
    setFormError(null);
    closeRfqModal();
  };

  const whatsappInquiryUrl = submissionSuccess
    ? `https://wa.me/923462536491?text=${encodeURIComponent(
        `Hello Shoukat, I have submitted RFQ Reference ${submissionSuccess} for vessel ${vesselName} (IMO: ${imoNumber}) at ${portOfCall}. Please confirm receipt and boarding schedule.`
      )}`
    : '';

  return (
    <Modal
      isOpen={rfqModal.isOpen}
      onClose={resetAndClose}
      title={submissionSuccess ? 'Quote Request Dispatched' : 'Request Rapid Vessel RFQ'}
      subtitle={
        submissionSuccess
          ? 'Your maritime supply requisition has been logged with our Keamari Operations Desk.'
          : '24/7 Rapid Port Boarding & Anchorage Supply | Karachi Port Trust (KPT) & Port Qasim (PQA)'
      }
      maxWidth="3xl"
    >
      {submissionSuccess ? (
        /* Submission Success Confirmation View */
        <div className="text-center py-4 space-y-6">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/30">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
              Assigned Requisition Reference
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight mt-1">
              {submissionSuccess}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-2">
              Our Port Operations Director <strong className="text-slate-900 dark:text-white">{settings.contactPerson}</strong> has received your manifest specs for <strong className="text-slate-900 dark:text-white">{vesselName}</strong> at <strong className="text-slate-900 dark:text-white">{portOfCall}</strong>.
            </p>
          </div>

          {/* Quick summary badge card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 text-left border border-slate-200 dark:border-slate-800 text-xs sm:text-sm grid grid-cols-2 gap-3 max-w-lg mx-auto">
            <div>
              <span className="text-slate-400 block text-xs">Vessel / IMO</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{vesselName} ({imoNumber})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Port & Terminal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{portOfCall}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Service Category</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{requiredCategory || 'Stores & Repairs'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">Priority Response</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{urgency}</span>
            </div>
          </div>

          {/* Immediate Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Notify Shoukat via WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <button
              type="button"
              onClick={resetAndClose}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl transition-all cursor-pointer"
            >
              OK / Done
            </button>
          </div>
        </div>
      ) : (
        /* RFQ Form View */
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 rounded-xl text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Port & Urgency Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Target Operational Port <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPortOfCall('KPT')}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                    portOfCall === 'KPT'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span>Karachi (KPT)</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded">24/7</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPortOfCall('PQA')}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                    portOfCall === 'PQA'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span>Port Qasim (PQA)</span>
                  <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded">24/7</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Operational Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Normal">Routine Store Delivery (48h Notice)</option>
                <option value="Express 24h">Express 24h Port Turnaround</option>
                <option value="Emergency Anchorage">Emergency Anchorage Launch Supply</option>
              </select>
            </div>
          </div>

          {/* 2. Vessel Identifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Vessel Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Ship className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. MV PACIFIC STAR"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                IMO Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="7-digit IMO e.g. 9482104"
                value={imoNumber}
                onChange={(e) => setImoNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Estimated Arrival (ETA)
              </label>
              <input
                type="text"
                placeholder="Date / Time or Prompt"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* 3. Berth / Anchorage & Required Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Berth / Anchorage Location
              </label>
              <input
                type="text"
                placeholder={portOfCall === 'KPT' ? 'e.g. SAPT Berth 2, KICT, Outer Anchorage' : 'e.g. QICT Berth 6, FOTCO Oil, Channel'}
                value={berthOrAnchorage}
                onChange={(e) => setBerthOrAnchorage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Primary Required Category
              </label>
              <input
                type="text"
                placeholder="e.g. Fresh Water, Provisions, Life Raft, Sludge"
                value={requiredCategory}
                onChange={(e) => setRequiredCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* 4. Scope & Requisition Details */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Store Requisition & Technical Scope Details
            </label>
            <textarea
              rows={3}
              placeholder="List items, IMPA codes, tonnages of fresh water, technical symptoms, or special galley preferences..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          {/* 5. Drag-and-Drop Store List Upload (Excel / PDF) */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Upload Stores List Manifest (Excel, PDF, or Word)
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center bg-slate-50/50 dark:bg-slate-800/40 transition-colors relative"
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.pdf,.doc,.docx,.csv"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {fileName ? (
                <div className="flex items-center justify-center gap-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                  <FileText className="w-5 h-5 shrink-0" />
                  <span className="truncate max-w-xs">{fileName}</span>
                  <span className="text-xs text-slate-400">({fileSize})</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileName(null);
                      setFileSize(null);
                    }}
                    className="text-xs text-red-500 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Click to attach requisition file</span> or drag & drop here
                  </p>
                  <p className="text-[11px] text-slate-400">Supports .xlsx, .xls, .pdf, .docx (Max 15MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* 6. Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Your Name / Rank <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Capt. / Chief Eng / Agent"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Official Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="ops@shippingline.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Direct WhatsApp / Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+92 / +1 / International"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Immediate acknowledgement by Shoukat (+92 346 2536491)</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetAndClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit RFQ Requisition</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
