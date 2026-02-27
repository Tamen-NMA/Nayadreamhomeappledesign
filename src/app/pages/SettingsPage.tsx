import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Globe, Utensils, Heart, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { COUNTRIES } from '../data/countries';
import type { User as UserType } from '../types';
import { api } from '../utils/api';

const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 
  'Nut-free', 'Halal', 'Kosher',
];

const CUISINE_PREFERENCES = [
  'East African', 'West African', 'North African', 'Mediterranean',
  'Asian', 'European',
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('kenya');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const userData = await api.getUser();
      setUser(userData);
      setDisplayName(userData.displayName);
      setEmail(userData.email);
      setSelectedCountry(userData.country || 'kenya');
      setSelectedDietary(userData.dietaryRestrictions || []);
      setSelectedCuisines(userData.cuisinePreferences || []);
    } catch (error) {
      console.error('Failed to load user:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile() {
    try {
      await api.updateUser({
        displayName,
        email,
      });
      toast.success('Profile updated');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    }
  }

  async function handleSaveCountry() {
    try {
      await api.setCountry(selectedCountry as any);
      toast.success('Country updated');
    } catch (error) {
      console.error('Failed to update country:', error);
      toast.error('Failed to update country');
    }
  }

  async function handleSavePreferences() {
    try {
      await api.updateUser({
        dietaryRestrictions: selectedDietary,
        cuisinePreferences: selectedCuisines,
      });
      toast.success('Preferences updated');
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to update preferences');
    }
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      navigate('/sign-in');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  }

  const toggleDietary = (item: string) => {
    setSelectedDietary(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const toggleCuisine = (item: string) => {
    setSelectedCuisines(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Settings</h1>
        <div className="bg-white rounded-[20px] p-12 text-center">
          <p className="text-[#6F6F6F]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl pb-24">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#2F2F2F]">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F26B5E] to-[#5FB3A6] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#2F2F2F]">Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2F2F2F] mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 focus:border-[#F26B5E] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2F2F2F] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 focus:border-[#F26B5E] focus:outline-none transition-colors"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            className="w-full h-12 bg-[#5FB3A6] hover:bg-[#4fa396] text-white rounded-2xl font-semibold"
          >
            Save Profile
          </Button>
        </div>
      </div>

      {/* Country Selector */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-[#2F2F2F]">Country</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                selectedCountry === country.id
                  ? 'border-[#F26B5E] bg-[#F26B5E]/5'
                  : 'border-gray-200 hover:border-[#F26B5E]/30'
              }`}
            >
              <div className="text-3xl mb-2">{country.flag}</div>
              <div className="text-sm font-semibold text-[#2F2F2F]">
                {country.name}
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleSaveCountry}
          className="w-full h-12 bg-[#5FB3A6] hover:bg-[#4fa396] text-white rounded-2xl font-semibold"
        >
          Save Country
        </Button>
      </div>

      {/* Dietary Restrictions */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[#2F2F2F]">Dietary Restrictions</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {DIETARY_RESTRICTIONS.map((item) => (
            <button
              key={item}
              onClick={() => toggleDietary(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDietary.includes(item)
                  ? 'bg-[#5FB3A6] text-white'
                  : 'bg-gray-100 text-[#6F6F6F] hover:bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Utensils className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-[#2F2F2F]">Cuisine Preferences</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {CUISINE_PREFERENCES.map((item) => (
            <button
              key={item}
              onClick={() => toggleCuisine(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCuisines.includes(item)
                  ? 'bg-[#F26B5E] text-white'
                  : 'bg-gray-100 text-[#6F6F6F] hover:bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Button
          onClick={handleSavePreferences}
          className="w-full h-12 bg-[#5FB3A6] hover:bg-[#4fa396] text-white rounded-2xl font-semibold"
        >
          Save Preferences
        </Button>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-[#2F2F2F]">Account</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#FAF7F2] rounded-2xl">
            <div>
              <p className="font-semibold text-[#2F2F2F]">Current Plan</p>
              <p className="text-sm text-[#6F6F6F]">
                {user?.currentPlan === 'pro' ? 'Pro' : user?.currentPlan === 'family' ? 'Family' : 'Free'}
              </p>
            </div>
            <button
              onClick={() => navigate('/billing')}
              className="flex items-center gap-2 text-[#F26B5E] font-semibold hover:underline"
            >
              Manage
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={handleSignOut}
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}