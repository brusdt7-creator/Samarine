export type ItemCategory = 
  | 'provisions' 
  | 'deck_engine' 
  | 'safety' 
  | 'paint_chemical' 
  | 'electrical' 
  | 'chandlery' 
  | 'technical_repairs' 
  | 'environmental';

export interface CatalogItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  slug: string;
  category: ItemCategory;
  categoryLabel: string;
  shortDescription: string;
  specifications: string[];
  imageUrl: string;
  impaCodeRange?: string;
  certifications?: string[];
  featured?: boolean;
  leadTimeHours?: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  portHighlight: string;
  imageUrl: string;
  ctaText: string;
  ctaAction: 'rfq' | 'products' | 'services' | 'ports';
  order: number;
}

export type PortId = 'KPT' | 'PQA';

export interface PortInfo {
  id: PortId;
  name: string;
  fullName: string;
  coveragePoints: string[];
  anchorageDetails: string;
  launchTransitTime: string;
  keyTerminals: string[];
  draftLimits: string;
  description: string;
  imageUrl: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Completed';

export interface RFQLead {
  id: string;
  vesselName: string;
  imoNumber: string;
  portOfCall: PortId;
  berthOrAnchorage: string;
  eta: string;
  requiredCategory: string;
  details: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  attachmentName?: string;
  attachmentUrl?: string;
  urgency: 'Normal' | 'Express 24h' | 'Emergency Anchorage';
  status: LeadStatus;
  createdAt: string;
  quotedAmount?: string;
  adminNotes?: string;
}

export interface CompanySettings {
  companyName: string;
  targetDomain: string;
  contactPerson: string;
  primaryWhatsApp: string;
  secondaryHotline: string;
  officialEmail1: string;
  officialEmail2: string;
  physicalAddress: string;
  officeNumber: string;
  buildingName: string;
  area: string;
  postalCode: string;
  city: string;
  country: string;
  noticeBannerText: string;
  noticeBannerActive: boolean;
}
