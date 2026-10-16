import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { Phone, Anchor, ShieldCheck } from 'lucide-react';

export const NotificationStrip: React.FC = () => {
  const { settings } = useMaritime();

  if (!settings.noticeBannerActive) return null;

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 font-semibold text-blue-400 shrink-0">
            <Anchor className="w-3.5 h-3.5" />
            <span>KPT • PQA 24/7</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-300 font-medium">
            {settings.noticeBannerText}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-slate-300">
          <a
            href={`tel:${settings.primaryWhatsApp.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span className="font-mono">{settings.primaryWhatsApp}</span>
          </a>
          <span className="text-slate-600">·</span>
          <div className="inline-flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">SOLAS / ISO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
