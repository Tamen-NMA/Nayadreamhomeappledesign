import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { COUNTRIES, type CountryCode } from '../data/countries';

interface CountrySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countryCode: CountryCode) => void;
}

export default function CountrySetupModal({ isOpen, onClose, onSelectCountry }: CountrySetupModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[28px] w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#2F2F2F] mb-2">
                Welcome to Naya Dream Home
              </h2>
              <p className="text-sm text-[#6F6F6F] leading-relaxed">
                Select your country to get started with local meal plans and chore schedules
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ml-2"
            >
              <X className="w-5 h-5 text-[#6F6F6F]" />
            </button>
          </div>
        </div>

        {/* Country Cards */}
        <div className="px-6 pb-6 space-y-3">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                selectedCountry === country.id
                  ? 'border-[#F26B5E] bg-[#F26B5E]/5'
                  : 'border-gray-200 hover:border-[#F26B5E]/30'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Flag */}
                <div className="text-4xl">{country.flag}</div>

                {/* Country Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-[#2F2F2F]">
                    {country.name}
                  </h3>
                  <p className="text-sm text-[#6F6F6F]">
                    {country.currency} • Weekly Budget: {country.weeklyBudget.toLocaleString()}
                  </p>
                </div>

                {/* Checkmark */}
                {selectedCountry === country.id && (
                  <div className="w-6 h-6 rounded-full bg-[#F26B5E] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!selectedCountry}
            className="w-full h-12 bg-[#5FB3A6] hover:bg-[#4fa396] text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
          <button
            onClick={onClose}
            className="w-full text-sm text-[#6F6F6F] hover:text-[#F26B5E] transition-colors font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}