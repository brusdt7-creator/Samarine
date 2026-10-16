import React from 'react';
import { MaritimeProvider, useMaritime } from './context/MaritimeContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { RFQModal } from './components/RFQModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortsPage } from './pages/PortsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useMaritime();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'services':
        return <ServicesPage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'ports':
        return <PortsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. Mobile-Optimized Top Notification Ticker (Zero Overflow) */}
      <TopBar />

      {/* 2. Compact 64px Mobile-First Navigation Header with Animated Hamburger & Drawer */}
      <Navbar />

      {/* 3. Main Content with Bottom Padding for Sticky Mobile Navigation Bar */}
      <main className="flex-grow pb-16 md:pb-0">
        {renderCurrentView()}
      </main>

      {/* 4. Maritime Footer */}
      <Footer />

      {/* 5. Sticky Mobile Bottom Navigation Bar (Thumb-Accessible, < 768px) */}
      <MobileBottomNav />

      {/* 6. Desktop Floating WhatsApp Button (>= 768px) */}
      <WhatsAppFloat />

      {/* 7. Accessible RFQ Modal Form */}
      <RFQModal />
    </div>
  );
};

export default function App() {
  return (
    <MaritimeProvider>
      <AppContent />
    </MaritimeProvider>
  );
}
