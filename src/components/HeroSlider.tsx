import React, { useState, useEffect } from 'react';
import { useMaritime } from '../context/MaritimeContext';
import { ChevronLeft, ChevronRight, Anchor, ArrowRight, ShieldCheck, Compass, Droplet } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  const { heroSlides, openRfqModal, navigateTo } = useMaritime();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = heroSlides.length > 0 ? heroSlides : [];

  // Auto slide interval
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((currentSlideIndex - 1 + slides.length) % slides.length);
  };

  const handleAction = (action: string) => {
    if (action === 'rfq') {
      openRfqModal();
    } else if (action === 'products') {
      navigateTo('products');
    } else if (action === 'services') {
      navigateTo('services');
    } else if (action === 'ports') {
      navigateTo('ports');
    }
  };

  return (
    <div
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Measured Scrims */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Fallback and Scale Zoom effect */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transform transition-transform duration-10000 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                // Fallback to high-res cargo ship if URL fails
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1920&q=80';
              }}
            />

            {/* Measured Deep Oceanic Contrast Scrims */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>
        );
      })}

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          
          {/* Active Port Badges: KPT & PQA [LIVE 24/7] */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Karachi Port Trust (KPT) [LIVE 24/7]</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Port Qasim (PQA) [LIVE 24/7]</span>
            </span>
          </div>

          {/* Marquee Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading" style={{ textWrap: 'balance' }}>
            {currentSlide.title}
          </h1>

          {/* Sub-headline prose */}
          <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed max-w-2xl">
            {currentSlide.subtitle}
          </p>

          {/* Port Location Tagline */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 font-medium">
            <Compass className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{currentSlide.portHighlight}</span>
          </div>

          {/* Action Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => handleAction(currentSlide.ctaAction)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-base shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => openRfqModal()}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-base border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <Anchor className="w-4 h-4 text-slate-300" />
              <span>Instant Port RFQ Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Left / Right Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlideIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentSlideIndex
                ? 'w-8 h-2.5 bg-blue-500 shadow-md'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
