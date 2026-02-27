import { useState } from 'react';
import { COUNTRIES, type Country } from '../types';
import { Button } from './ui/button';
import { api } from '../utils/api';
import { toast } from 'sonner';

interface CountrySetupModalProps {
  accessToken: string;
  onComplete: () => void;
  onSkip: () => void;
}

export default function CountrySetupModal({ accessToken, onComplete, onSkip }: CountrySetupModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleApplyDefaults() {
    if (!selectedCountry) {
      toast.error('Please select a country');
      return;
    }

    setLoading(true);
    try {
      console.log('[CountrySetup] Access Token:', accessToken);
      console.log('[CountrySetup] Selected Country:', selectedCountry);
      
      // Check if in test mode
      if (accessToken === 'test-mode-token') {
        console.log('[CountrySetup] Running in TEST MODE - storing locally');
        // In test mode, just store locally without API call
        localStorage.setItem('naya_user_country', selectedCountry);
        toast.success('Country defaults applied!');
        onComplete();
      } else {
        console.log('[CountrySetup] Running in NORMAL MODE - calling API');
        // Normal mode - call API
        await api.setCountry(accessToken, selectedCountry);
        toast.success('Country defaults applied!');
        onComplete();
      }
    } catch (error: any) {
      console.error('[CountrySetup] Failed to set country:', error);
      toast.error('Failed to apply defaults');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-[28px] md:rounded-[28px] w-full max-w-md p-6 animate-slide-up">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 md:hidden" />
        
        <h2 className="text-2xl font-bold text-[#2F2F2F] mb-2">
          Set Up Your Home
        </h2>
        <p className="text-[#6F6F6F] mb-6">
          Select your country to pre-populate meals and chores with local defaults
        </p>

        <div className="space-y-3 mb-6">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedCountry === country.id
                  ? 'border-[#F26B5E] bg-[#FFF5F4]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-4xl">{country.flag}</span>
              <span className="text-lg font-semibold text-[#2F2F2F]">
                {country.name}
              </span>
              {selectedCountry === country.id && (
                <div className="ml-auto w-6 h-6 bg-[#F26B5E] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleApplyDefaults}
            disabled={!selectedCountry || loading}
            className="w-full bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl h-12 font-semibold"
          >
            {loading ? 'Applying...' : 'Apply Defaults'}
          </Button>
          
          <button
            onClick={onSkip}
            className="w-full text-center text-[#6F6F6F] hover:text-[#F26B5E] transition-colors py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}