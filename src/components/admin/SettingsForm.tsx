import React, { useState } from 'react';
import { useMaritime } from '../../context/MaritimeContext';
import { Save, RotateCcw, CheckCircle2, Phone, Mail, MapPin, Bell } from 'lucide-react';

export const SettingsForm: React.FC = () => {
  const { settings, updateSettings, resetAllToFactoryDefaults } = useMaritime();

  const [contactPerson, setContactPerson] = useState(settings.contactPerson);
  const [primaryWhatsApp, setPrimaryWhatsApp] = useState(settings.primaryWhatsApp);
  const [secondaryHotline, setSecondaryHotline] = useState(settings.secondaryHotline);
  const [officialEmail1, setOfficialEmail1] = useState(settings.officialEmail1);
  const [officialEmail2, setOfficialEmail2] = useState(settings.officialEmail2);
  const [physicalAddress, setPhysicalAddress] = useState(settings.physicalAddress);
  const [officeNumber, setOfficeNumber] = useState(settings.officeNumber);
  const [buildingName, setBuildingName] = useState(settings.buildingName);
  const [area, setArea] = useState(settings.area);
  const [postalCode, setPostalCode] = useState(settings.postalCode);
  const [city, setCity] = useState(settings.city);
  const [country, setCountry] = useState(settings.country);
  const [noticeBannerText, setNoticeBannerText] = useState(settings.noticeBannerText);
  const [noticeBannerActive, setNoticeBannerActive] = useState(settings.noticeBannerActive);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      contactPerson,
      primaryWhatsApp,
      secondaryHotline,
      officialEmail1,
      officialEmail2,
      physicalAddress,
      officeNumber,
      buildingName,
      area,
      postalCode,
      city,
      country,
      noticeBannerText,
      noticeBannerActive,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to restore all original Super Marine verified credentials and catalog items?')) {
      resetAllToFactoryDefaults();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-sm">
            Operational credentials and notice banner updated across the entire site!
          </span>
        </div>
      )}

      {/* 24/7 Top Notice Strip Control */}
      <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
              Top 24/7 Notification Strip
            </h4>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={noticeBannerActive}
              onChange={(e) => setNoticeBannerActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Active</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Emergency Port Notice Ticker
          </label>
          <input
            type="text"
            value={noticeBannerText}
            onChange={(e) => setNoticeBannerText(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      {/* Primary Personnel & Phones */}
      <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
            Direct Contacts & Operational Hotline
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Contact Person / Port Director
            </label>
            <input
              type="text"
              required
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Primary WhatsApp & Direct Line
            </label>
            <input
              type="text"
              required
              value={primaryWhatsApp}
              onChange={(e) => setPrimaryWhatsApp(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Secondary Mobile / 24/7 Hotline
            </label>
            <input
              type="text"
              required
              value={secondaryHotline}
              onChange={(e) => setSecondaryHotline(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Official Email 1
            </label>
            <input
              type="email"
              required
              value={officialEmail1}
              onChange={(e) => setOfficialEmail1(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Official Email 2
            </label>
            <input
              type="email"
              required
              value={officialEmail2}
              onChange={(e) => setOfficialEmail2(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Keamari Harbour Headquarters Address */}
      <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
            Physical Headquarters (Keamari Harbour Facility)
          </h4>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Complete Physical Address
          </label>
          <input
            type="text"
            required
            value={physicalAddress}
            onChange={(e) => setPhysicalAddress(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Office / Suite</label>
            <input
              type="text"
              value={officeNumber}
              onChange={(e) => setOfficeNumber(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Building</label>
            <input
              type="text"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Area / Port District</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Super Marine Credentials</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes Instantly</span>
        </button>
      </div>
    </form>
  );
};
