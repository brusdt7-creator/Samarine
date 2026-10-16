import React, { useState, useRef, useEffect } from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { 
  Anchor, 
  Ship, 
  ChevronDown, 
  Sun, 
  Moon, 
  X, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  SlidersHorizontal,
  Droplet,
  ChevronRight,
  Sparkles,
  Utensils,
  ShieldAlert,
  Trash2,
  Wrench,
  BedDouble,
  LifeBuoy,
  BookOpen,
  Paintbrush,
  Stethoscope,
  Fuel,
  Zap,
  Cable,
  ShoppingBag,
  RotateCw,
  Gauge,
  Cpu,
  Cog,
  Flame,
  Wind,
  Activity,
  Layers,
  Waves,
  Brush,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    theme, 
    toggleTheme, 
    openRfqModal, 
    products, 
    services, 
    settings 
  } = useMaritime();

  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);

  // Accordion open/close states inside drawer
  const [drawerProductsOpen, setDrawerProductsOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);

  // Touch swipe to dismiss state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);

  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Screen Body Scroll Lock when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent accidental horizontal scroll on iOS
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileDrawerOpen]);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (route: string, slug?: string) => {
    navigateTo(route, slug);
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
  };

  // Touch handlers for swipe-to-close (swipe right to close drawer)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchCurrentX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchCurrentX !== null) {
      const deltaX = touchCurrentX - touchStartX;
      // If user swiped right by more than 70px, close drawer
      if (deltaX > 70) {
        setMobileDrawerOpen(false);
      }
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
  };

  // Micro-icon map for 14 products in compact mobile grid
  const getProductMicroIcon = (slug: string) => {
    switch (slug) {
      case 'provision-stores': return <Utensils className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'razor-wire': return <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'waste-container': return <Trash2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'deck-engine-stores': return <Wrench className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 'cabin-store': return <BedDouble className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
      case 'safety-equipments': return <LifeBuoy className="w-3.5 h-3.5 text-orange-500 shrink-0" />;
      case 'stationery-stores': return <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />;
      case 'marine-paint': return <Paintbrush className="w-3.5 h-3.5 text-cyan-500 shrink-0" />;
      case 'medical-store': return <Stethoscope className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'lubricants': return <Fuel className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'electrical-store': return <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0" />;
      case 'marine-rope': return <Cable className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
      case 'bonded-store': return <ShoppingBag className="w-3.5 h-3.5 text-pink-500 shrink-0" />;
      case 'fresh-water': return <Droplet className="w-3.5 h-3.5 text-sky-500 shrink-0" />;
      default: return <Anchor className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
    }
  };

  // Micro-icon map for 11 services in compact mobile grid
  const getServiceMicroIcon = (slug: string) => {
    switch (slug) {
      case 'life-raft-service': return <LifeBuoy className="w-3.5 h-3.5 text-orange-500 shrink-0" />;
      case 'motor-rewinding': return <RotateCw className="w-3.5 h-3.5 text-yellow-500 shrink-0" />;
      case 'hydraulic-systems': return <Gauge className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 'electrical-engineering': return <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />;
      case 'mechanical-work': return <Cog className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'fabrication': return <Flame className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'air-conditioning': return <Wind className="w-3.5 h-3.5 text-cyan-500 shrink-0" />;
      case 'preventive-maintenance': return <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'spare-parts-supply': return <Layers className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
      case 'removal-of-sludge': return <Waves className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
      case 'ship-paint': return <Brush className="w-3.5 h-3.5 text-teal-500 shrink-0" />;
      default: return <Wrench className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
    }
  };

  // Desktop Mega Menu partitions
  const provisionsAndLiving = products.filter(p => ['provisions', 'chandlery'].includes(p.category));
  const deckEngineAndSafety = products.filter(p => ['deck_engine', 'safety', 'electrical'].includes(p.category));
  const industrialAndEnvironmental = products.filter(p => ['paint_chemical', 'environmental'].includes(p.category));

  const mechanicalAndHydraulic = services.filter(s => ['technical_repairs'].includes(s.category)).slice(0, 4);
  const electricalAndAutomation = services.filter(s => ['electrical'].includes(s.category));
  const environmentalAndCoating = services.filter(s => ['environmental', 'paint_chemical'].includes(s.category));
  const remainingServices = services.filter(s => !mechanicalAndHydraulic.includes(s) && !electricalAndAutomation.includes(s) && !environmentalAndCoating.includes(s));

  return (
    <>
      {/* ============================================================ */}
      {/* 1. COMPACT 64px MAIN HEADER (STICKY & GLASSMORPHIС)          */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
          
          {/* Left: Brand Identity (Compact, Plus Jakarta Sans 700) */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Anchor className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.3]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 dark:text-white font-heading leading-tight whitespace-nowrap">
                SUPER MARINE
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 leading-none">
                KPT • Port Qasim
              </span>
            </div>
          </button>

          {/* Center (Desktop Only): Main Navigation Links with Mega-Menus */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                currentRoute === 'home'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                currentRoute === 'about'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              About Us
            </button>

            {/* Desktop Products Mega-Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}
                onMouseEnter={() => setActiveMegaMenu('products')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentRoute === 'products' || activeMegaMenu === 'products'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>Chandlery Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'products' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Desktop Services Mega-Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMegaMenu(activeMegaMenu === 'services' ? null : 'services')}
                onMouseEnter={() => setActiveMegaMenu('services')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentRoute === 'services' || activeMegaMenu === 'services'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>Technical Repairs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('ports')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                currentRoute === 'ports'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Ports & Coverage
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                currentRoute === 'contact'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Contact & Keamari
            </button>
          </div>

          {/* Right Actions: Theme Toggle, Quick RFQ Pill Button, Animated Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Dark/Light Mode toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700" />
              )}
            </button>

            {/* Quick "RFQ" Pill Button (Instant Quote Modal Trigger on Mobile & Desktop) */}
            <button
              type="button"
              onClick={() => openRfqModal()}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Ship className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>RFQ</span>
            </button>

            {/* Animated Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label={mobileDrawerOpen ? "Close menu drawer" : "Open menu drawer"}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors active:scale-95 cursor-pointer lg:hidden shrink-0 relative"
            >
              {/* Three animated bars transforming into an 'X' */}
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  mobileDrawerOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-200 ease-in-out ${
                  mobileDrawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  mobileDrawerOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. DESKTOP MEGA-MENUS (CHANDLERY & TECHNICAL SERVICES)        */}
      {/* ============================================================ */}
      {activeMegaMenu === 'products' && (
        <div
          ref={megaMenuRef}
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden lg:block absolute top-24 left-0 w-full z-30 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  14 Dedicated Ship Chandlery Stores
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Full IMPA & ISSA coded shipboard provisioning for vessels berthed or anchored at KPT & PQA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('products')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Catalog Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Provisions, Galley & Hotel
                </span>
                <div className="space-y-2">
                  {provisionsAndLiving.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick('products')}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Deck, Engine, Ropes & Safety
                </span>
                <div className="space-y-2">
                  {deckEngineAndSafety.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick('products')}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Coatings, Fresh Water & Bonded
                </span>
                <div className="space-y-2">
                  {industrialAndEnvironmental.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick('products')}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMegaMenu === 'services' && (
        <div
          ref={megaMenuRef}
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden lg:block absolute top-24 left-0 w-full z-30 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  11 Certified Marine Technical Services
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Class-approved riding squads, workshop overhauls, and port compliance in Karachi (KPT & PQA).
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('services')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All 11 Services & Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Mechanical, Hydraulics & Steel
                </span>
                <div className="space-y-2">
                  {mechanicalAndHydraulic.map(service => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleNavClick('service-detail', service.slug)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {service.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {service.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Electrical, SOLAS & Diagnostics
                </span>
                <div className="space-y-2">
                  {electricalAndAutomation.concat(remainingServices).map(service => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleNavClick('service-detail', service.slug)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {service.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {service.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 block">
                  Sludge De-slopping & Painting
                </span>
                <div className="space-y-2">
                  {environmentalAndCoating.map(service => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleNavClick('service-detail', service.slug)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {service.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {service.shortDescription}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. MOBILE SLIDE-OVER DRAWER (APP-LIKE EXPERIENCE)            */}
      {/* ============================================================ */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          
          {/* Semi-transparent dark backdrop blur */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-[85%] max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 overflow-hidden"
          >
            
            {/* Drawer Header: Branding + Status Badge + Close Button */}
            <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Anchor className="w-4 h-4 stroke-[2.3]" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-slate-950 dark:text-white font-heading block leading-tight">
                    SUPER MARINE
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                      KPT • PQA LIVE 24/7
                    </span>
                  </div>
                </div>
              </div>

              {/* Prominent 'X' close button at top-right */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close drawer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer active:scale-95 transition-colors"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 overscroll-contain">
              
              {/* Direct Main Links */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    currentRoute === 'home'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    currentRoute === 'about'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>About Us & Facility</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('ports')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    currentRoute === 'ports'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Ports & Operational Scope</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    currentRoute === 'contact'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Contact Us & Keamari Base</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Collapsible Accordion 1: Chandlery Products (14 Stores) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDrawerProductsOpen(!drawerProductsOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Products (14 Stores)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      drawerProductsOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {drawerProductsOpen && (
                  <div className="px-2.5 pb-3 pt-1 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 animate-in fade-in duration-200">
                    {/* 2-Column Compact Grid with Micro-Icons */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {products.map(product => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleNavClick('products')}
                          className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-left hover:border-blue-500 transition-all cursor-pointer group active:scale-95"
                        >
                          {getProductMicroIcon(product.slug)}
                          <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {product.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavClick('products')}
                      className="w-full py-1.5 text-center text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      View All 14 Stores Catalog →
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Accordion 2: Technical Services (11 Repairs) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDrawerServicesOpen(!drawerServicesOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span>Services (11 Repairs)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      drawerServicesOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {drawerServicesOpen && (
                  <div className="px-2.5 pb-3 pt-1 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 animate-in fade-in duration-200">
                    {/* 2-Column Compact Grid with Micro-Icons */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map(service => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleNavClick('service-detail', service.slug)}
                          className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-left hover:border-indigo-500 transition-all cursor-pointer group active:scale-95"
                        >
                          {getServiceMicroIcon(service.slug)}
                          <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {service.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavClick('services')}
                      className="w-full py-1.5 text-center text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline block"
                    >
                      View All 11 Services & Specs →
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Port Selector: Direct buttons for KPT and PQA */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Port Requisition
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      openRfqModal(undefined, undefined, 'KPT');
                    }}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left cursor-pointer hover:border-blue-500 active:scale-95 transition-all shadow-sm"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Karachi Port (KPT)</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">East/West • SAPT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      openRfqModal(undefined, undefined, 'PQA');
                    }}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left cursor-pointer hover:border-blue-500 active:scale-95 transition-all shadow-sm"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Port Qasim (PQA)</span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">QICT • FOTCO</span>
                  </button>
                </div>
              </div>

              {/* Client Admin Access Link */}
              <button
                type="button"
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Client Admin Portal Access</span>
              </button>

            </div>

            {/* Bottom Action Card (Thumb Zone) */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 space-y-2.5 shrink-0">
              <div className="grid grid-cols-2 gap-2">
                {/* Direct WhatsApp to Shoukat */}
                <a
                  href={`https://wa.me/${settings.primaryWhatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Shoukat, I have an urgent vessel inquiry for Super Marine.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>WhatsApp</span>
                </a>

                {/* Direct Call to Shoukat */}
                <a
                  href={`tel:${settings.secondaryHotline.replace(/[^0-9+]/g, '')}`}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
                  <span>Call Hotline</span>
                </a>
              </div>

              {/* Office Address Snippet */}
              <div className="flex items-start gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                <MapPin className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{settings.physicalAddress}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
