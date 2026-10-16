import React, { useState } from 'react';
import { HeroSlide } from '../../types/maritime';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface HeroSlideFormProps {
  initialSlide?: HeroSlide | null;
  onSave: (slide: Omit<HeroSlide, 'id'>) => void;
  onCancel: () => void;
}

export const HeroSlideForm: React.FC<HeroSlideFormProps> = ({
  initialSlide,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialSlide?.title || '');
  const [subtitle, setSubtitle] = useState(initialSlide?.subtitle || '');
  const [portHighlight, setPortHighlight] = useState(initialSlide?.portHighlight || 'Karachi Port Trust (KPT) & Port Qasim (PQA)');
  const [imageUrl, setImageUrl] = useState(initialSlide?.imageUrl || '');
  const [ctaText, setCtaText] = useState(initialSlide?.ctaText || 'Dispatch Vessel RFQ');
  const [ctaAction, setCtaAction] = useState<'rfq' | 'products' | 'services' | 'ports'>(initialSlide?.ctaAction || 'rfq');
  const [order, setOrder] = useState<number>(initialSlide?.order || 1);

  const [previewError, setPreviewError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setPreviewError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      setErrorMsg('Headline and Image are required.');
      return;
    }

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      portHighlight: portHighlight.trim(),
      imageUrl: imageUrl.trim(),
      ctaText: ctaText.trim() || 'Dispatch Vessel RFQ',
      ctaAction,
      order: Number(order) || 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Hero Headline *
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 24/7 Deep Sea Berthing Supplies & Anchorage Launches"
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Hero Subtitle Prose
        </label>
        <textarea
          rows={2}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Detailed secondary value proposition..."
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Port Location Tagline
          </label>
          <input
            type="text"
            value={portHighlight}
            onChange={(e) => setPortHighlight(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Display Order Priority
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            CTA Button Label
          </label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            CTA Action Destination
          </label>
          <select
            value={ctaAction}
            onChange={(e) => setCtaAction(e.target.value as any)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="rfq">Open Instant RFQ Modal</option>
            <option value="products">Go to Chandlery Products</option>
            <option value="services">Go to Technical Repairs</option>
            <option value="ports">Go to Ports & Operations</option>
          </select>
        </div>
      </div>

      {/* Banner Image Asset with Live Preview */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
          Banner Picture Asset (16:9 Recommended)
        </label>
        
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setPreviewError(false);
          }}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        />

        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm">
            <Upload className="w-3.5 h-3.5 text-blue-500" />
            <span>Upload Banner Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Live Preview Box */}
        {imageUrl && !previewError && (
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2">
            <img
              src={imageUrl}
              alt="Slide preview"
              referrerPolicy="no-referrer"
              onError={() => setPreviewError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-sm font-bold font-heading line-clamp-1">{title || 'Headline Preview'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow cursor-pointer"
        >
          Save Banner Slide
        </button>
      </div>
    </form>
  );
};
