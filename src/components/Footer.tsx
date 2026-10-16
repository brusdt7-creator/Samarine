import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { Anchor, Phone, Mail, MapPin, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigateTo } = useMaritime();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Operational Scope */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <Anchor className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight">SUPER MARINE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Premier ship chandlers and certified marine technical engineering specialists. Operating 24/7 rapid harbour launches and water barges directly across Karachi Port Trust (KPT) and Port Muhammad Bin Qasim (PQA).
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001 · SOLAS · MARPOL Annex I/V</span>
            </div>
          </div>

          {/* Col 2: Operational Ports */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Operational Ports Covered
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Karachi Port Trust (KPT)</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  East/West Wharves, KICT, SAPT & Outer Anchorage
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Port Muhammad Bin Qasim (PQA)</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  QICT Container, Bulk, LNG/FSRU Berths & Fairway Channel
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct 24/7 Contacts (Shoukat) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              24/7 Port Boarding Desk
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Primary WhatsApp / Direct Line</span>
                  <a
                    href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-white hover:text-emerald-400 font-semibold transition-colors"
                  >
                    {settings.primaryWhatsApp} ({settings.contactPerson})
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">24/7 Port Operations Hotline</span>
                  <a
                    href={`tel:${settings.secondaryHotline.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-white hover:text-blue-400 font-semibold transition-colors"
                  >
                    {settings.secondaryHotline}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Official Requisition Inquiries</span>
                  <a
                    href={`mailto:${settings.officialEmail1}`}
                    className="text-white hover:underline block truncate"
                  >
                    {settings.officialEmail1}
                  </a>
                  <a
                    href={`mailto:${settings.officialEmail2}`}
                    className="text-slate-400 hover:underline block truncate text-[11px]"
                  >
                    {settings.officialEmail2}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Keamari Harbour Headquarters */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Harbour Headquarters
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {settings.physicalAddress}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Client Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Super Marine (supermarinepk.com). All rights reserved. Keamari, Karachi.</p>
          <div className="flex items-center gap-4">
            <span>Karachi Port Trust (KPT)</span>
            <span>·</span>
            <span>Port Muhammad Bin Qasim (PQA)</span>
            <span>·</span>
            <span className="text-emerald-400 font-mono">24/7 Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
