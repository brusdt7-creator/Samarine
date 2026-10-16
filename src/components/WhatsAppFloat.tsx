import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useMaritime } from '../context/MaritimeContext';

export const WhatsAppFloat: React.FC = () => {
  const { settings } = useMaritime();
  const [isHovered, setIsHovered] = useState(false);

  const rawDigits = settings.primaryWhatsApp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawDigits}?text=${encodeURIComponent(
    'Hello Super Marine, I have an urgent vessel supply/service inquiry for Karachi ports (KPT/PQA).'
  )}`;

  return (
    // Hidden on mobile (< 768px) as MobileBottomNav provides a dedicated thumb-zone WhatsApp button
    <div
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on Hover */}
      <div
        className={`flex flex-col items-end pointer-events-none transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-slate-700 max-w-xs text-right space-y-0.5">
          <p className="font-bold text-emerald-400">24/7 Port Boarding Direct Line</p>
          <p className="text-slate-300 text-[11px]">Chat with Shoukat ({settings.primaryWhatsApp})</p>
        </div>
      </div>

      {/* Floating Pulsing Emerald Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Hotline to Shoukat"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 animate-marine-pulse cursor-pointer group"
      >
        <MessageCircle className="w-7 h-7 stroke-[2.2] group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
