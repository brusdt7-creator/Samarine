import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { 
  Anchor, 
  Compass, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Ship, 
  Users, 
  Droplet,
  Send
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, openRfqModal, navigateTo } = useMaritime();

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Premier Maritime Agency & Chandlery
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
          Dedicated Harbour Attendance at Karachi\'s Gateway
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Super Marine provides round-the-clock technical repairs, fresh water barging, and certified ship chandlery supplies to merchant fleets calling at Karachi Port Trust (KPT) and Port Muhammad Bin Qasim (PQA).
        </p>
      </div>

      {/* 2. Keamari Base Spotlight */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-4 h-4" />
            <span>Strategic Port Location</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Headquartered in Keamari Front Harbour
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike distant brokers, Super Marine operates directly from <strong className="text-slate-900 dark:text-white">Office 38, Goldline Front Harbour Building, Keamari, Karachi</strong>. Situated steps from the KPT boat basin and pilot station, our logistical squads can board vessels berthed at East/West Wharves, KICT, SAPT, or outer anchorage in 15 to 35 minutes.
          </p>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Direct harbor water barges for immediate potable water replenishment</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Secured temperature-controlled chillers for fresh Halal crew provisions</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Full compliance with Pakistan Customs, KPT, and PQA Port Health authorities</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() => openRfqModal()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Request Port Assistance
            </button>
            <a
              href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Direct Line with Shoukat →
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-slate-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
            alt="Keamari Harbour and Karachi Port"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
            <span className="font-bold text-sm block font-heading">Keamari Logistical Facility</span>
            <span className="text-slate-300 text-[11px]">Immediate launch embarkation point for KPT and outer anchorage</span>
          </div>
        </div>
      </div>

      {/* 3. Leadership & Operations Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            Master Mariner Leadership
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Super Marine is directed by maritime professionals with sea-going command experience. Under the leadership of <strong className="text-slate-900 dark:text-white">{settings.contactPerson}</strong>, our teams coordinate directly with shipboard Masters, Chief Engineers, and port superintendents to provide clear communication, accurate delivery tallies, and zero administrative friction.
          </p>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
            Strict Maritime Quality & Safety
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We adhere strictly to international maritime safety frameworks. All life raft servicing complies with SOLAS Chapter III standards; all sludge disposal meets MARPOL Annex I environmental mandates with certified receipts; and all food stores carry certified Halal veterinary inspection clearance.
          </p>
        </div>
      </div>

      {/* 4. Strict Ports Covered Disclaimer */}
      <div className="p-8 bg-blue-50 dark:bg-blue-950/30 rounded-3xl border border-blue-200 dark:border-blue-900 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          Geographic Coverage Policy
        </span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
          Dedicated Exclusively to Karachi Ports (KPT & PQA)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          To maintain our rapid 15 to 35-minute mobilization promise and direct operational oversight, Super Marine exclusively operates across <strong className="text-slate-800 dark:text-slate-200">Karachi Port Trust (KPT)</strong> and <strong className="text-slate-800 dark:text-slate-200">Port Muhammad Bin Qasim (PQA)</strong>. We do not dilute our resources across other regional ports (such as Gwadar), ensuring our clients receive focused, executive-level harbor care.
        </p>
      </div>
    </div>
  );
};
