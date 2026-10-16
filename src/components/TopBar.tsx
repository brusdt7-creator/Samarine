import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { Phone, Anchor, ShieldCheck, Zap } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { settings } = useMaritime();

  if (!settings.noticeBannerActive) return null;

  const rawPhone = settings.primaryWhatsApp.replace(/[^0-9+]/g, '');

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800/80 text-xs py-1.5 px-3 sm:px-4 transition-colors z-40 relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Mobile View (< 768px): Compact Single-Line High-Contrast Horizontal Flex Ticker (Zero Wrapping) */}
        <div className="flex md:hidden items-center w-full justify-between overflow-hidden gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-tight whitespace-nowrap">
              24/7 Port Boarding
            </span>
          </div>

          <div className="text-[11px] text-slate-300 font-medium truncate flex-1 text-center px-1">
            <span className="text-slate-400">KPT • Port Qasim</span>
          </div>

          {/* Direct 1-Tap Dial to Shoukat */}
          <a
            href={`tel:${rawPhone}`}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 px-2 py-0.5 rounded-full shrink-0 transition-colors active:scale-95"
            aria-label={`Direct call Shoukat at ${settings.primaryWhatsApp}`}
          >
            <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono">{settings.primaryWhatsApp}</span>
          </a>
        </div>

        {/* Desktop View (>= 768px): Full Rich Maritime Status Bar */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-blue-400 shrink-0">
              <Anchor className="w-3.5 h-3.5" />
              <span>KPT • PQA 24/7 Rapid Supply</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-300 font-medium text-xs">
              {settings.noticeBannerText}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <a
              href={`tel:${rawPhone}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="text-xs">Direct:</span>
              <span className="font-mono font-semibold text-emerald-400">{settings.primaryWhatsApp}</span>
              <span className="text-slate-500 text-[11px]">({settings.contactPerson})</span>
            </a>
            <span className="text-slate-700">·</span>
            <div className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">SOLAS / ISO 9001</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
