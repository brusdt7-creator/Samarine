import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CatalogItem, 
  HeroSlide, 
  PortInfo, 
  RFQLead, 
  CompanySettings, 
  LeadStatus,
  PortId
} from '../types/maritime';
import { 
  INITIAL_COMPANY_SETTINGS, 
  INITIAL_HERO_SLIDES, 
  INITIAL_PORTS, 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES, 
  INITIAL_LEADS 
} from '../data/initialData';

interface RFQModalState {
  isOpen: boolean;
  initialItemName?: string;
  initialCategory?: string;
  portHint?: PortId;
}

interface MaritimeContextType {
  products: CatalogItem[];
  services: CatalogItem[];
  heroSlides: HeroSlide[];
  ports: PortInfo[];
  leads: RFQLead[];
  settings: CompanySettings;
  theme: 'light' | 'dark';
  currentRoute: string;
  serviceDetailSlug: string | null;
  rfqModal: RFQModalState;
  
  // Navigation
  navigateTo: (route: string, slug?: string) => void;
  toggleTheme: () => void;
  
  // RFQ Modal controls
  openRfqModal: (initialItemName?: string, initialCategory?: string, portHint?: PortId) => void;
  closeRfqModal: () => void;
  submitRFQLead: (leadData: Omit<RFQLead, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  
  // Admin CRUD for Catalog Items (Products & Services)
  addProduct: (item: Omit<CatalogItem, 'id'>) => void;
  updateProduct: (id: string, item: Partial<CatalogItem>) => void;
  deleteProduct: (id: string) => void;
  
  addService: (item: Omit<CatalogItem, 'id'>) => void;
  updateService: (id: string, item: Partial<CatalogItem>) => void;
  deleteService: (id: string) => void;
  
  // Admin Hero Slider
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (slides: HeroSlide[]) => void;
  
  // Admin Leads management
  updateLeadStatus: (id: string, status: LeadStatus, adminNotes?: string, quotedAmount?: string) => void;
  deleteLead: (id: string) => void;
  
  // Settings management
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  resetAllToFactoryDefaults: () => void;
}

const MaritimeContext = createContext<MaritimeContextType | undefined>(undefined);

export const MaritimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sm_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default Light mode as requested
  });

  useEffect(() => {
    localStorage.setItem('sm_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [serviceDetailSlug, setServiceDetailSlug] = useState<string | null>(null);

  const navigateTo = (route: string, slug?: string) => {
    setCurrentRoute(route);
    if (slug) {
      setServiceDetailSlug(slug);
    } else if (route !== 'service-detail') {
      setServiceDetailSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RFQ Modal state
  const [rfqModal, setRfqModal] = useState<RFQModalState>({
    isOpen: false,
  });

  const openRfqModal = (initialItemName?: string, initialCategory?: string, portHint?: PortId) => {
    setRfqModal({
      isOpen: true,
      initialItemName,
      initialCategory,
      portHint,
    });
  };

  const closeRfqModal = () => {
    setRfqModal(prev => ({ ...prev, isOpen: false }));
  };

  // Data states with LocalStorage persistence
  const [products, setProducts] = useState<CatalogItem[]>(() => {
    try {
      const saved = localStorage.getItem('sm_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [services, setServices] = useState<CatalogItem[]>(() => {
    try {
      const saved = localStorage.getItem('sm_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('sm_hero_slides');
      return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
    } catch {
      return INITIAL_HERO_SLIDES;
    }
  });

  const [ports] = useState<PortInfo[]>(INITIAL_PORTS);

  const [leads, setLeads] = useState<RFQLead[]>(() => {
    try {
      const saved = localStorage.getItem('sm_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem('sm_settings');
      return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
    } catch {
      return INITIAL_COMPANY_SETTINGS;
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('sm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sm_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('sm_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('sm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('sm_settings', JSON.stringify(settings));
  }, [settings]);

  // Product CRUD
  const addProduct = (item: Omit<CatalogItem, 'id'>) => {
    const newItem: CatalogItem = {
      ...item,
      id: `prod-${Date.now()}`,
      type: 'product',
    };
    setProducts(prev => [newItem, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<CatalogItem>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Service CRUD
  const addService = (item: Omit<CatalogItem, 'id'>) => {
    const newItem: CatalogItem = {
      ...item,
      id: `serv-${Date.now()}`,
      type: 'service',
    };
    setServices(prev => [newItem, ...prev]);
  };

  const updateService = (id: string, updated: Partial<CatalogItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Hero Slider CRUD
  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const updateHeroSlide = (id: string, updated: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const reorderHeroSlides = (newSlides: HeroSlide[]) => {
    setHeroSlides(newSlides);
  };

  // Leads CRUD
  const submitRFQLead = async (leadData: Omit<RFQLead, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    const leadId = `SM-${new Date().getFullYear()}-${leadData.portOfCall}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: RFQLead = {
      ...leadData,
      id: leadId,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setLeads(prev => [newLead, ...prev]);
    return leadId;
  };

  const updateLeadStatus = (id: string, status: LeadStatus, adminNotes?: string, quotedAmount?: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {}),
          ...(quotedAmount !== undefined ? { quotedAmount } : {}),
        };
      }
      return l;
    }));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAllToFactoryDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setServices(INITIAL_SERVICES);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setLeads(INITIAL_LEADS);
    setSettings(INITIAL_COMPANY_SETTINGS);
    localStorage.removeItem('sm_products');
    localStorage.removeItem('sm_services');
    localStorage.removeItem('sm_hero_slides');
    localStorage.removeItem('sm_leads');
    localStorage.removeItem('sm_settings');
  };

  return (
    <MaritimeContext.Provider
      value={{
        products,
        services,
        heroSlides,
        ports,
        leads,
        settings,
        theme,
        currentRoute,
        serviceDetailSlug,
        rfqModal,
        navigateTo,
        toggleTheme,
        openRfqModal,
        closeRfqModal,
        submitRFQLead,
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
        updateLeadStatus,
        deleteLead,
        updateSettings,
        resetAllToFactoryDefaults,
      }}
    >
      {children}
    </MaritimeContext.Provider>
  );
};

export const useMaritime = () => {
  const context = useContext(MaritimeContext);
  if (!context) {
    throw new Error('useMaritime must be used within a MaritimeProvider');
  }
  return context;
};
