import React, { useState } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { CatalogCard } from '../components/CatalogCard';
import { useMaritime } from '../context/MaritimeContext';
import { 
  Anchor, 
  Ship, 
  ShieldCheck, 
  Clock, 
  Droplet, 
  Wrench, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  Navigation,
  Compass,
  FileText,
  PhoneCall
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, services, ports, openRfqModal, navigateTo, settings } = useMaritime();

  // Tabbed catalog state
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'products' | 'services' | 'safety' | 'environmental'>('all');

  // Filter items based on active tab
  const allItems = [...products, ...services];

  const filteredShowcaseItems = allItems.filter(item => {
    if (activeCatalogTab === 'all') return true;
    if (activeCatalogTab === 'products') return item.type === 'product';
    if (activeCatalogTab === 'services') return item.type === 'service';
    if (activeCatalogTab === 'safety') return item.category === 'safety';
    if (activeCatalogTab === 'environmental') return item.category === 'environmental';
    return true;
  }).slice(0, 8); // Top 8 featured items on homepage

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Full-Bleed Animated Hero Slider */}
      <HeroSlider />

      {/* 2. Operational Metrics & Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Anchor className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">24/7/365</span>
              <span className="text-xs text-slate-500 font-medium">Boarding & Anchorage</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Ship className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">2 Ports</span>
              <span className="text-xs text-slate-500 font-medium">KPT & Port Qasim Exclusively</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">SOLAS/ISO</span>
              <span className="text-xs text-slate-500 font-medium">Class Approved Standards</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">15-35 Min</span>
              <span className="text-xs text-slate-500 font-medium">Keamari Launch Transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Image-First Tabbed Catalog Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              <Compass className="w-4 h-4" />
              <span>Full Chandlery & Technical Capability</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              Shipboard Stores & Technical Services
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              14 dedicated ship chandlery departments and 11 class-approved technical repair disciplines ready for immediate boarding.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveCatalogTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCatalogTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Items ({allItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCatalogTab('products')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCatalogTab === 'products'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Chandlery Stores (14)
            </button>
            <button
              type="button"
              onClick={() => setActiveCatalogTab('services')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCatalogTab === 'services'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Technical Repairs (11)
            </button>
            <button
              type="button"
              onClick={() => setActiveCatalogTab('safety')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCatalogTab === 'safety'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SOLAS & Safety
            </button>
            <button
              type="button"
              onClick={() => setActiveCatalogTab('environmental')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCatalogTab === 'environmental'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Water & Sludge
            </button>
          </div>
        </div>

        {/* 4-column responsive grid of high-fidelity cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShowcaseItems.map(item => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>

        {/* Directory Link Action */}
        <div className="mt-10 text-center flex items-center justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer shadow-md"
          >
            <span>Explore All 14 Chandlery Stores</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigateTo('services')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all cursor-pointer"
          >
            <span>View 11 Technical Services & Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Strategic Operational Ports: KPT & PQA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
              Exclusive Coastal Focus (No Gwadar)
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Dedicated Logistics Across Karachi\'s Twin Deepwater Ports
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Super Marine maintains dedicated shore-to-ship supply launches and water barges strategically positioned at Keamari Harbour to ensure zero turnaround delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {ports.map((port) => (
              <div
                key={port.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-semibold">{port.id}</span>
                    <h3 className="text-xl font-bold font-heading mt-0.5">{port.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    Live 24/7 Attendance
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {port.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Launch Transit: <strong className="text-white">{port.launchTransitTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Key Terminals: <strong className="text-white">{port.keyTerminals.join(', ')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Anchor className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Draft Capability: <strong className="text-white">{port.draftLimits}</strong></span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openRfqModal(undefined, undefined, port.id)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Request Supply at {port.id}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Super Marine: Enterprise Credentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Enterprise Ship Agency Standards
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Why International Masters & Owners Trust Us
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Built on maritime rigor, experienced Master Mariner management, and immediate harbour launch availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Master Mariner Leadership
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Headed by seasoned maritime professionals who understand cargo hold turnarounds, port state inspections, and strict departure schedules.
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Class Certified Quality
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Halal veterinary certificates for food, SOLAS inspection test sheets for life-saving gear, and mill test certs for high-tensile mooring hawsers.
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Keamari Launch & Water Barges
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our prime Keamari front-harbour base maintains direct launch access to KPT outer anchorage and dedicated high-rate fresh water supply barges.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quick RFQ Section with Store List Upload */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Fast Manifest Submission
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
                Have an IMPA/ISSA Requisition Ready?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Send us your ship requisition list (Excel, PDF, or Word) directly. Our port logistics desk in Keamari calculates immediate vessel delivery schedules and competitive quotes for KPT and Port Qasim berths or anchorage.
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Immediate turnaround on quotation within 2 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Customs-cleared bonded supplies & Halal certifications included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct phone line with Port Director Shoukat: {settings.primaryWhatsApp}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-5">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Launch the Rapid RFQ Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Specify your vessel IMO, expected port of call, and upload store list files.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => openRfqModal()}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Vessel RFQ Modal</span>
                </button>

                <a
                  href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Shoukat, I have an urgent vessel store requisition for Karachi (KPT/PQA).'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-semibold text-xs rounded-xl border border-emerald-300 dark:border-emerald-800 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Direct WhatsApp to Shoukat ({settings.primaryWhatsApp})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Agency Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">
            Trusted Port Attendance & Logistics Partner
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block font-heading">Container Liners</span>
            <span className="text-[11px] text-slate-400">KICT, SAPT & QICT Berths</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block font-heading">Bulk Carriers</span>
            <span className="text-[11px] text-slate-400">Grain, Coal, Fertiliser & Steel</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block font-heading">Tankers & Gas</span>
            <span className="text-[11px] text-slate-400">FOTCO, OP-I/II/III & FSRU</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block font-heading">Outer Anchorage</span>
            <span className="text-[11px] text-slate-400">24/7 Crew & Supply Launches</span>
          </div>
        </div>
      </section>
    </div>
  );
};
