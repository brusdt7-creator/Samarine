import React, { useState } from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { CatalogItem, HeroSlide } from '../types/maritime';
import { CatalogItemForm } from '../components/admin/CatalogItemForm';
import { HeroSlideForm } from '../components/admin/HeroSlideForm';
import { LeadsTable } from '../components/admin/LeadsTable';
import { SettingsForm } from '../components/admin/SettingsForm';
import { 
  Lock, 
  LayoutDashboard, 
  Package, 
  Wrench, 
  SlidersHorizontal, 
  FileText, 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  CheckCircle2, 
  Ship, 
  Anchor, 
  Eye, 
  MoveUp, 
  MoveDown,
  ArrowRight
} from 'lucide-react';

type AdminTab = 'overview' | 'products' | 'services' | 'slider' | 'leads' | 'settings';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    services, 
    heroSlides, 
    leads, 
    settings,
    addProduct, 
    updateProduct, 
    deleteProduct,
    addService, 
    updateService, 
    deleteService,
    addHeroSlide, 
    updateHeroSlide, 
    deleteHeroSlide,
    reorderHeroSlides,
    navigateTo 
  } = useMaritime();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sm_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Form editing states
  const [editingProduct, setEditingProduct] = useState<CatalogItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [editingService, setEditingService] = useState<CatalogItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isAddingSlide, setIsAddingSlide] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode: supermarine2026 or 1234
    if (passwordInput === 'supermarine2026' || passwordInput === 'admin' || passwordInput === '1234' || passwordInput === 'shoukat') {
      setIsAuthenticated(true);
      localStorage.setItem('sm_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sm_admin_auth');
  };

  // If not authenticated, render Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Client Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              Authorized access for {settings.contactPerson} & Super Marine Operations Desk
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 text-xs rounded-xl text-center">
                Invalid passcode. Try: <strong className="font-mono">supermarine2026</strong>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Admin Access Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(true);
                localStorage.setItem('sm_admin_auth', 'true');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              One-Click Instant Demo Login →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate KPIs
  const totalProducts = products.length;
  const totalServices = services.length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const totalBanners = heroSlides.length;

  return (
    <div className="space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            SUPER MARINE CONTROL CONSOLE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading mt-0.5">
            Operations & Catalog Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>View Public Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('leads');
            setEditingProduct(null);
            setIsAddingProduct(false);
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>RFQ Inquiries</span>
          {newLeads > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
              {newLeads}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('products');
            setEditingProduct(null);
            setIsAddingProduct(false);
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Chandlery Products ({totalProducts})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('services');
            setEditingService(null);
            setIsAddingService(false);
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Technical Services ({totalServices})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('slider');
            setEditingSlide(null);
            setIsAddingSlide(false);
          }}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'slider'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Hero Banners ({totalBanners})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Live Settings & Contacts</span>
        </button>
      </div>

      {/* 3. Tab Content Bodies */}

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Stores</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{totalProducts}</div>
              <p className="text-[11px] text-slate-400">Provisions, deck, engine & safety</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Technical Services</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{totalServices}</div>
              <p className="text-[11px] text-slate-400">SOLAS, rewinding, hydraulics & sludge</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">RFQ Inquiries</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono flex items-center gap-2">
                <span>{totalLeads}</span>
                {newLeads > 0 && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">{newLeads} New</span>}
              </div>
              <p className="text-[11px] text-slate-400">Vessel manifests logged from ports</p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hero Banners</span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{totalBanners}</div>
              <p className="text-[11px] text-slate-400">Cinematic maritime showcase slides</p>
            </div>
          </div>

          {/* Quick Actions & Recent RFQs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Recent Vessel RFQs & Requisitions
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Full Leads Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <LeadsTable />
          </div>
        </div>
      )}

      {/* TAB: RFQ LEADS DESK */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Live Vessel RFQ Desk (KPT & PQA)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review vessel quote requests, update statuses, record quoted figures, and WhatsApp vessel captains directly.
              </p>
            </div>
          </div>

          <LeadsTable />
        </div>
      )}

      {/* TAB: CHANDLERY PRODUCTS CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Chandlery Stores Catalog Manager ({products.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, or delete any of the 14 ship chandlery departments with instant live image preview.
              </p>
            </div>

            {!isAddingProduct && !editingProduct && (
              <button
                type="button"
                onClick={() => setIsAddingProduct(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Store Item</span>
              </button>
            )}
          </div>

          {/* Form when adding or editing */}
          {(isAddingProduct || editingProduct) && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 font-heading">
                {editingProduct ? `Edit Store: ${editingProduct.name}` : 'Add New Chandlery Store'}
              </h4>
              <CatalogItemForm
                initialItem={editingProduct}
                itemType="product"
                onSave={(data) => {
                  if (editingProduct) {
                    updateProduct(editingProduct.id, data);
                    setEditingProduct(null);
                  } else {
                    addProduct(data);
                    setIsAddingProduct(false);
                  }
                }}
                onCancel={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                }}
              />
            </div>
          )}

          {/* Product Items Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">IMPA Code</th>
                  <th className="py-3 px-4">Lead Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white font-heading">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.categoryLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-xs font-mono text-slate-500">
                      {item.impaCodeRange || '—'}
                    </td>
                    <td className="py-2.5 px-4 text-xs font-mono">
                      {item.leadTimeHours}h
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(item);
                            setIsAddingProduct(false);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete store item "${item.name}"?`)) {
                              deleteProduct(item.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: TECHNICAL SERVICES CRUD */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Technical Services Manager ({services.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage the 11 class-approved marine technical repair disciplines, specs, and procedures.
              </p>
            </div>

            {!isAddingService && !editingService && (
              <button
                type="button"
                onClick={() => setIsAddingService(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Technical Service</span>
              </button>
            )}
          </div>

          {(isAddingService || editingService) && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 font-heading">
                {editingService ? `Edit Service: ${editingService.name}` : 'Add New Technical Service'}
              </h4>
              <CatalogItemForm
                initialItem={editingService}
                itemType="service"
                onSave={(data) => {
                  if (editingService) {
                    updateService(editingService.id, data);
                    setEditingService(null);
                  } else {
                    addService(data);
                    setIsAddingService(false);
                  }
                }}
                onCancel={() => {
                  setEditingService(null);
                  setIsAddingService(false);
                }}
              />
            </div>
          )}

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Discipline</th>
                  <th className="py-3 px-4">Mobilization</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {services.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white font-heading">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                        {item.categoryLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-xs font-mono">
                      {item.leadTimeHours}h Turnaround
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(item);
                            setIsAddingService(false);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete service "${item.name}"?`)) {
                              deleteService(item.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: HERO SLIDER / BANNERS */}
      {activeTab === 'slider' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Hero Slider & Banner Pictures ({heroSlides.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update homepage carousel slides, upload new banner pictures, reorder sequence, and edit headline text.
              </p>
            </div>

            {!isAddingSlide && !editingSlide && (
              <button
                type="button"
                onClick={() => setIsAddingSlide(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Banner Slide</span>
              </button>
            )}
          </div>

          {(isAddingSlide || editingSlide) && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 font-heading">
                {editingSlide ? `Edit Slide: ${editingSlide.title}` : 'Add New Hero Banner Slide'}
              </h4>
              <HeroSlideForm
                initialSlide={editingSlide}
                onSave={(data) => {
                  if (editingSlide) {
                    updateHeroSlide(editingSlide.id, data);
                    setEditingSlide(null);
                  } else {
                    addHeroSlide(data);
                    setIsAddingSlide(false);
                  }
                }}
                onCancel={() => {
                  setEditingSlide(null);
                  setIsAddingSlide(false);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Slide #{index + 1}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading line-clamp-2">
                      {slide.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {slide.subtitle}
                    </p>
                    <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                      CTA: {slide.ctaText} ({slide.ctaAction})
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => {
                        if (index > 0) {
                          const newSlides = [...heroSlides];
                          const temp = newSlides[index];
                          newSlides[index] = newSlides[index - 1];
                          newSlides[index - 1] = temp;
                          reorderHeroSlides(newSlides);
                        }
                      }}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === heroSlides.length - 1}
                      onClick={() => {
                        if (index < heroSlides.length - 1) {
                          const newSlides = [...heroSlides];
                          const temp = newSlides[index];
                          newSlides[index] = newSlides[index + 1];
                          newSlides[index + 1] = temp;
                          reorderHeroSlides(newSlides);
                        }
                      }}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSlide(slide);
                        setIsAddingSlide(false);
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete banner slide #${index + 1}?`)) {
                          deleteHeroSlide(slide.id);
                        }
                      }}
                      className="text-red-500 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SETTINGS & DIRECT CREDENTIALS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Live Platform Credentials & Notice Manager
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates phone numbers, WhatsApp, emails, Keamari address, and the 24/7 top emergency banner.
            </p>
          </div>

          <SettingsForm />
        </div>
      )}
    </div>
  );
};
