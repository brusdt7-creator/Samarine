import React, { useState } from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { 
  ArrowLeft, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Check, 
  Send, 
  FileCheck, 
  PhoneCall, 
  Ship,
  MapPin
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { serviceDetailSlug, services, navigateTo, openRfqModal, settings } = useMaritime();
  const [imgError, setImgError] = useState(false);

  const currentService = services.find(s => s.slug === serviceDetailSlug) || services[0];

  if (!currentService) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-500">Service not found.</p>
        <button
          type="button"
          onClick={() => navigateTo('services')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Return to Technical Services
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Technical Services</span>
        </button>
      </div>

      {/* Main Service Hero & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column: Visual Asset */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            {!imgError ? (
              <img
                src={currentService.imageUrl}
                alt={currentService.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-slate-500">
                <Wrench className="w-16 h-16 text-blue-500/60 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Super Marine Technical Division</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg font-semibold">
                {currentService.categoryLabel}
              </span>
              <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-lg font-mono">
                {currentService.impaCodeRange || 'Service Spec'}
              </span>
            </div>
          </div>

          {/* Rapid Mobilization Strip */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Port Mobilization</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {currentService.leadTimeHours} Hours Fast Track
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Port Coverage</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  KPT & Port Qasim
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Engineering Specification
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading mt-1">
              {currentService.name}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
              {currentService.shortDescription}
            </p>
          </div>

          {/* Full Scope of Works */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Scope of Work & Procedures</span>
            </h3>

            <div className="space-y-2.5">
              {currentService.specifications.map((spec, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications and Compliance */}
          {currentService.certifications && currentService.certifications.length > 0 && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Class Approvals & Compliance</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {currentService.certifications.join(' · ')}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => openRfqModal(currentService.name, currentService.categoryLabel)}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Book / Inquire for {currentService.name}</span>
            </button>

            <a
              href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello Shoukat, I need immediate technical attendance for ${currentService.name} at Karachi ports.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct WhatsApp Hotline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
