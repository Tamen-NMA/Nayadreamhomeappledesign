import { Outlet, useNavigate, useLocation, Navigate } from 'react-router';
import { Home, CheckCircle, Utensils, ShoppingCart, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { api } from '../utils/api';
import CountrySetupModal from '../components/CountrySetupModal';
import { LiquidGlassLogo } from '../components/LiquidGlassLogo';

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showCountrySetup, setShowCountrySetup] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    // Check for test mode first
    const testMode = localStorage.getItem('testMode');
    if (testMode === 'true') {
      setIsAuthenticated(true);
      
      // Check if user needs country setup (first time)
      const country = localStorage.getItem('naya_country_set');
      if (!country) {
        setShowCountrySetup(true);
      }
      return;
    }

    // Check if there's a valid session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      setIsAuthenticated(true);
      
      // Check if user needs country setup (first time)
      const country = localStorage.getItem('naya_country_set');
      if (!country) {
        setShowCountrySetup(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="animate-pulse text-[#F26B5E] text-lg font-semibold">
          Loading Naya Dream Home...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const tabs = [
    { path: '/', icon: Home, label: 'Today' },
    { path: '/chores', icon: CheckCircle, label: 'Chores' },
    { path: '/meals', icon: Utensils, label: 'Meals' },
    { path: '/shopping', icon: ShoppingCart, label: 'Shopping' },
    { path: '/more', icon: MoreHorizontal, label: 'More' },
  ];

  const isTabActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20 md:pb-0">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>

      {/* iOS-style Tab Bar - Fixed at bottom on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden shadow-lg z-50">
        <div className="flex justify-around items-center h-20 safe-area-inset-bottom">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
              >
                <Icon 
                  className={`w-6 h-6 mb-1 transition-colors ${
                    active ? 'text-[#5FB3A6]' : 'text-gray-400'
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span 
                  className={`text-xs transition-colors ${
                    active ? 'text-[#5FB3A6] font-semibold' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* iPad Sidebar - Shows on larger screens */}
      <nav className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <LiquidGlassLogo size={40} />
            <div>
              <h1 className="text-lg font-bold text-[#2F2F2F]">Naya</h1>
              <p className="text-xs text-[#6F6F6F]">Dream Home</p>
            </div>
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isTabActive(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active 
                      ? 'bg-[#5FB3A6] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Adjust content padding on iPad */}
      <style>{`
        @media (min-width: 768px) {
          .max-w-7xl {
            margin-left: 16rem;
          }
        }
      `}</style>

      {/* Country Setup Modal */}
      {showCountrySetup && (
        <CountrySetupModal
          isOpen={showCountrySetup}
          onClose={() => {
            setShowCountrySetup(false);
            localStorage.setItem('naya_country_set', 'true');
          }}
          onSelectCountry={async (countryCode) => {
            try {
              const testMode = localStorage.getItem('testMode');
              if (testMode === 'true') {
                // In test mode, just save locally
                setShowCountrySetup(false);
                localStorage.setItem('naya_country_set', 'true');
                return;
              }

              await api.setCountry(countryCode as any);
              
              setShowCountrySetup(false);
              localStorage.setItem('naya_country_set', 'true');
            } catch (error) {
              console.error('Failed to save country:', error);
            }
          }}
        />
      )}
    </div>
  );
}