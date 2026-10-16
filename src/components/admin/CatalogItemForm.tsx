import React, { useState } from 'react';
import { CatalogItem, ItemCategory } from '../../types/maritime';
import { Upload, Image as ImageIcon, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface CatalogItemFormProps {
  initialItem?: CatalogItem | null;
  itemType: 'product' | 'service';
  onSave: (item: Omit<CatalogItem, 'id'>) => void;
  onCancel: () => void;
}

export const CatalogItemForm: React.FC<CatalogItemFormProps> = ({
  initialItem,
  itemType,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialItem?.name || '');
  const [slug, setSlug] = useState(initialItem?.slug || '');
  const [category, setCategory] = useState<ItemCategory>(initialItem?.category || (itemType === 'product' ? 'provisions' : 'technical_repairs'));
  const [categoryLabel, setCategoryLabel] = useState(initialItem?.categoryLabel || '');
  const [shortDescription, setShortDescription] = useState(initialItem?.shortDescription || '');
  const [imageUrl, setImageUrl] = useState(initialItem?.imageUrl || '');
  const [impaCodeRange, setImpaCodeRange] = useState(initialItem?.impaCodeRange || '');
  const [leadTimeHours, setLeadTimeHours] = useState<number>(initialItem?.leadTimeHours || 6);
  
  // Specifications array
  const [specInput, setSpecInput] = useState('');
  const [specifications, setSpecifications] = useState<string[]>(
    initialItem?.specifications || [
      'Certified commercial marine grade standard',
      'Class surveyor inspection approved upon request',
      'Rapid delivery to vessel gangway or outer anchorage'
    ]
  );

  // Certifications
  const [certInput, setCertInput] = useState('');
  const [certifications, setCertifications] = useState<string[]>(
    initialItem?.certifications || ['ISO 9001 Compliant', 'Port Authority Cleared']
  );

  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Automatically generate slug from name if empty
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialItem) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  // Handle local image file upload and convert to base64 for instant preview & persistence
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setImagePreviewError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpecification = () => {
    if (specInput.trim()) {
      setSpecifications([...specifications, specInput.trim()]);
      setSpecInput('');
    }
  };

  const removeSpecification = (idx: number) => {
    setSpecifications(specifications.filter((_, i) => i !== idx));
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setCertifications([...certifications, certInput.trim()]);
      setCertInput('');
    }
  };

  const removeCertification = (idx: number) => {
    setCertifications(certifications.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Item name is required.');
      return;
    }
    if (!shortDescription.trim()) {
      setErrorMsg('Short description is required.');
      return;
    }
    if (!imageUrl.trim()) {
      setErrorMsg('Please provide an Image URL or upload a picture.');
      return;
    }

    onSave({
      type: itemType,
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      categoryLabel: categoryLabel.trim() || (itemType === 'product' ? 'Chandlery Store' : 'Marine Service'),
      shortDescription: shortDescription.trim(),
      specifications,
      imageUrl: imageUrl.trim(),
      impaCodeRange: impaCodeRange.trim() || undefined,
      certifications,
      leadTimeHours: Number(leadTimeHours) || 6,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Row 1: Basic Identifiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            {itemType === 'product' ? 'Product / Store Title' : 'Service Name'} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={itemType === 'product' ? 'e.g. Engine Valve Packings' : 'e.g. Turbocharger Dynamic Balancing'}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            URL Slug Identifier
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. engine-valve-packings"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Row 2: Category & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ItemCategory)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="provisions">Provisions & Rations</option>
            <option value="deck_engine">Deck & Engine Hardware</option>
            <option value="safety">Safety & SOLAS LSA</option>
            <option value="paint_chemical">Paints, Chemicals & Blasting</option>
            <option value="electrical">Electrical & Automation</option>
            <option value="chandlery">Cabin & Bonded Chandlery</option>
            <option value="technical_repairs">Technical Repairs & Machining</option>
            <option value="environmental">Environmental, Water & Sludge</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            Category Badge / Sub-label
          </label>
          <input
            type="text"
            value={categoryLabel}
            onChange={(e) => setCategoryLabel(e.target.value)}
            placeholder="e.g. Fresh Rations, Heavy Machining"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
            IMPA / Service Code
          </label>
          <input
            type="text"
            value={impaCodeRange}
            onChange={(e) => setImpaCodeRange(e.target.value)}
            placeholder="e.g. IMPA 73 11 00 or SRV-02"
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Row 3: Short Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Executive Summary Description *
        </label>
        <textarea
          rows={3}
          required
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Concise, professional maritime description of the item or engineering scope..."
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      {/* Row 4: Image Management with Instant Live Thumbnail Preview Card */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-blue-500" />
          <span>Image Asset Management & Live Preview</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Input column */}
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Image Web URL (HTTPS)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreviewError(false);
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="relative">
              <span className="text-xs text-slate-400 block mb-1">OR Upload Local Image File:</span>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm">
                <Upload className="w-4 h-4 text-blue-500" />
                <span>Choose Image from Disk</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* INSTANT LIVE THUMBNAIL PREVIEW CARD */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Instant Live Preview
            </span>
            <div className="w-44 h-32 rounded-xl overflow-hidden border-2 border-dashed border-blue-500/50 bg-slate-200 dark:bg-slate-700 flex items-center justify-center relative shadow-md">
              {imageUrl && !imagePreviewError ? (
                <img
                  src={imageUrl}
                  alt="Thumbnail preview"
                  referrerPolicy="no-referrer"
                  onError={() => setImagePreviewError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2 text-slate-400">
                  <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                  <span className="text-[10px] block">No image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Specifications List Builder */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
          Technical Specifications & Features
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={specInput}
            onChange={(e) => setSpecInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSpecification();
              }
            }}
            placeholder="Type a technical specification and press Add..."
            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
          <button
            type="button"
            onClick={addSpecification}
            className="px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded-xl hover:bg-blue-700 cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Spec</span>
          </button>
        </div>

        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
            >
              <span className="truncate pr-2">• {spec}</span>
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow cursor-pointer"
        >
          Save to Platform
        </button>
      </div>
    </form>
  );
};
