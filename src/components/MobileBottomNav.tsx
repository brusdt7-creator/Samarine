import React from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { Home, Wrench, Phone, MessageCircle, FileText } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentRoute, navigateTo, openRfqModal, settings } = useMaritime();

  const rawPhone = settings.primaryWhatsApp.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Super Marine, I have an urgent vessel supply/service inquiry for Karachi ports (KPT/PQA).'
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[max(env(safe-area-inset-bottom),0px)]">
      <div className="grid grid-cols-5 h-[60px] items-center px-1">
        
        {/* 1. Home Button */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 text-[10px] font-semibold transition-colors cursor-pointer active:scale-95 ${
            currentRoute === 'home'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentRoute === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Home</span>
        </button>

        {/* 2. Technical Services Button */}
        <button
          type="button"
          onClick={() => navigateTo('services')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 text-[10px] font-semibold transition-colors cursor-pointer active:scale-95 ${
            currentRoute === 'services' || currentRoute === 'service-detail'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Wrench className={`w-5 h-5 mb-0.5 ${currentRoute === 'services' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Services</span>
        </button>

        {/* 3. Direct Phone Call (Shoukat) */}
        <a
          href={`tel:${rawPhone}`}
          className="flex flex-col items-center justify-center h-full w-full py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors active:scale-95 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-0.5 text-blue-600 dark:text-blue-400 shadow-sm">
            <Phone className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="font-medium text-[9px] text-slate-500 dark:text-slate-400">Call Now</span>
        </a>

        {/* 4. Instant WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full w-full py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 transition-colors active:scale-95 cursor-pointer relative"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-0.5 shadow-md shadow-emerald-500/20">
            <MessageCircle className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="font-bold text-[9px]">WhatsApp</span>
        </a>

        {/* 5. Highlighted RFQ Action Pill */}
        <button
          type="button"
          onClick={() => openRfqModal()}
          className="flex flex-col items-center justify-center h-full w-full py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-0.5 shadow-md shadow-blue-600/30">
            <FileText className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-[9px]">Vessel RFQ</span>
        </button>

      </div>
    </div>
  );
};
