import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Anchor, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, openRfqModal } = useMaritime();

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          24/7 Port Boarding Operations
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
          Contact Super Marine & Operations Desk
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Immediate vessel boarding, fresh water barging, and technical inquiries across Karachi Port Trust (KPT) and Port Muhammad Bin Qasim (PQA).
        </p>
      </div>

      {/* 2. Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shoukat Primary WhatsApp Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">Primary Direct Line</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              {settings.contactPerson} (Port Operations)
            </h3>
            <p className="text-xs text-slate-500 mt-1">Available 24/7 on WhatsApp & cellular call</p>
          </div>
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Shoukat, I have an urgent vessel inquiry for Super Marine.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.primaryWhatsApp}</span>
            </a>
          </div>
        </div>

        {/* 24/7 Operations Hotline */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Phone className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">Secondary / Hotline</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              24/7 Dispatch Hotline
            </h3>
            <p className="text-xs text-slate-500 mt-1">Harbour launch and water barge duty officer</p>
          </div>
          <div className="pt-2">
            <a
              href={`tel:${settings.secondaryHotline.replace(/[^0-9+]/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.secondaryHotline}</span>
            </a>
          </div>
        </div>

        {/* Official Email Desk */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Mail className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">Formal Requisitions</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              Email Operations Desk
            </h3>
            <p className="text-xs text-slate-500 mt-1">Send Excel / PDF manifests & voyage orders</p>
          </div>
          <div className="pt-2 space-y-1">
            <a
              href={`mailto:${settings.officialEmail1}`}
              className="block text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {settings.officialEmail1}
            </a>
            <a
              href={`mailto:${settings.officialEmail2}`}
              className="block text-xs text-slate-500 dark:text-slate-400 hover:underline truncate"
            >
              {settings.officialEmail2}
            </a>
          </div>
        </div>
      </div>

      {/* 3. Physical Keamari Harbour Headquarters & Interactive Map */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            <MapPin className="w-4 h-4" />
            <span>Harbour Base Location</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Keamari Harbour Base
          </h2>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-slate-900 dark:text-white">
              {settings.companyName}
            </p>
            <p className="leading-relaxed">
              {settings.physicalAddress}
            </p>
            <div className="pt-2 text-xs text-slate-500 font-mono flex items-center gap-2">
              <span>Keamari District 75620</span>
              <span>·</span>
              <span>Karachi Port Zone</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Office Operations: 24 Hours / 7 Days a Week</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Anchor className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct launch access to KPT East & West Wharves and SAPT</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Pakistan Customs and Port Health clearance escort</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => openRfqModal()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Open Vessel Requisition Form (RFQ)</span>
            </button>
          </div>
        </div>

        {/* Interactive Map Embed Placeholder for Keamari Harbour */}
        <div className="relative min-h-[350px] lg:min-h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
          <iframe
            title="Keamari Harbour Karachi Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14486.29910543265!2d66.96942007823908!3d24.80998818579043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c5b5aa7738f%3A0xe2da2e1764654859!2sKeamari%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            className="w-full h-full min-h-[360px] rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
