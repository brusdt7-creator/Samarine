import React, { useState } from 'react';
import { CatalogItem } from '../types/maritime';
import { useMaritime } from '../context/MaritimeContext';
import { Ship, Clock, ArrowRight, ShieldCheck, Check, FileSpreadsheet, Eye } from 'lucide-react';

interface CatalogCardProps {
  item: CatalogItem;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ item }) => {
  const { openRfqModal, navigateTo } = useMaritime();
  const [imageError, setImageError] = useState(false);

  const isService = item.type === 'service';

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Visual Asset Container with Zoom effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        {!imageError ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Styled Fallback Container */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400">
            <Ship className="w-12 h-12 stroke-1 text-blue-500/60 mb-2" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
              Super Marine Operations
            </span>
          </div>
        )}

        {/* Minimalist Top Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category & Lead Time - Clean unboxed text layout */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="font-semibold tracking-wide bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-md">
            {item.categoryLabel}
          </span>
          {item.leadTimeHours && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-blue-900/80 px-2 py-0.5 rounded backdrop-blur-md">
              <Clock className="w-3 h-3 text-blue-300" />
              <span>{item.leadTimeHours}h Mobilization</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Metadata Bar (IMPA / Standards) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
            {item.impaCodeRange && <span>{item.impaCodeRange}</span>}
            {item.impaCodeRange && <span aria-hidden="true">·</span>}
            <span>KPT / PQA</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {item.shortDescription}
          </p>

          {/* Key Specs List */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            {item.specifications.slice(0, 3).map((spec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>

          {/* Certifications (SOLAS / Halal / Class) */}
          {item.certifications && item.certifications.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{item.certifications.join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Action Button Row */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          {isService && (
            <button
              type="button"
              onClick={() => navigateTo('service-detail', item.slug)}
              className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Specs</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => openRfqModal(item.name, item.categoryLabel)}
            className={`${
              isService ? 'flex-1' : 'w-full'
            } py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer inline-flex items-center justify-center gap-1.5`}
          >
            <span>Inquire Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
