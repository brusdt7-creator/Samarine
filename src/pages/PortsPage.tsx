import React, { useState } from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { PortId } from '../types/maritime';
import { 
  Anchor, 
  Ship, 
  Clock, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Droplet,
  ExternalLink
} from 'lucide-react';

export const PortsPage: React.FC = () => {
  const { ports, openRfqModal, settings } = useMaritime();
  const [selectedPortId, setSelectedPortId] = useState<PortId>('KPT');

  const selectedPort = ports.find(p => p.id === selectedPortId) || ports[0];

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Exclusive Port Operations (Strictly KPT & PQA)
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
          Operational Ports & Anchorage Coverage
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Super Marine coordinates rapid harbour boarding, fresh water barging, and chandlery deliveries across Pakistan\'s two primary deepwater ports.
        </p>
      </div>

      {/* 2. Interactive Port Switcher Tabs */}
      <div className="flex items-center justify-center gap-3">
        {ports.map((port) => (
          <button
            key={port.id}
            type="button"
            onClick={() => setSelectedPortId(port.id)}
            className={`px-6 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
              selectedPortId === port.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>{port.name}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
              24/7 LIVE
            </span>
          </button>
        ))}
      </div>

      {/* 3. Selected Port Showcase Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Banner with Port Specs */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-950">
          <img
            src={selectedPort.imageUrl}
            alt={selectedPort.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold block mb-1">
                OPERATIONAL PORT IDENTITY: {selectedPort.id}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
                {selectedPort.fullName}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => openRfqModal(undefined, undefined, selectedPort.id)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md self-start sm:self-auto cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Supply at {selectedPort.id}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Port Detail Metrics & Berths */}
        <div className="p-8 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Launch Transit Time</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>{selectedPort.launchTransitTime}</span>
              </div>
              <p className="text-[11px] text-slate-500">From our Keamari Harbour launch station</p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Permissible Vessel Draft</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <Ship className="w-5 h-5 text-emerald-500" />
                <span>{selectedPort.draftLimits}</span>
              </div>
              <p className="text-[11px] text-slate-500">Subject to tide and terminal authority windows</p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase">Fresh Water Barges</span>
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
                <Droplet className="w-5 h-5 text-cyan-500" />
                <span>24/7 Barges Available</span>
              </div>
              <p className="text-[11px] text-slate-500">WHO certified potable drinking water</p>
            </div>
          </div>

          {/* Operational Berth & Terminal List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Covered Terminals, Berths & Anchorage Roads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPort.coveragePoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Anchorage Logistics Protocol */}
          <div className="p-6 bg-blue-50/70 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-2">
            <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 font-heading flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Outer Anchorage Transfer & Security Clearances</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedPort.anchorageDetails}
            </p>
          </div>
        </div>
      </div>

      {/* Explicit Geographic Limitation Notice */}
      <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
          Geographic Clarity Note
        </span>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Super Marine operates solely within <strong className="text-slate-900 dark:text-white">Karachi Port Trust (KPT)</strong> and <strong className="text-slate-900 dark:text-white">Port Muhammad Bin Qasim (PQA)</strong>. We do not service Gwadar or third-party non-Karachi ports, focusing all fleet launches on delivering rapid, faultless service to Karachi vessel calls.
        </p>
      </div>
    </div>
  );
};
