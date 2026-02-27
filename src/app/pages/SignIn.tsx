import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Sparkles, ListChecks } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleAppleSignIn() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      
      // OAuth will redirect, so we don't need to handle navigation here
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Apple');
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
      
      // OAuth will redirect, so we don't need to handle navigation here
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#F26B5E] to-[#5FB3A6] rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-4xl text-white font-bold">N</span>
          </div>
          <h1 className="text-3xl font-bold text-[#F26B5E] mb-2">
            Naya Dream Home
          </h1>
          <p className="text-[#6F6F6F] text-sm">
            Your Home, Beautifully Organized
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[20px] p-8 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-3 text-center">
            Sign in to continue
          </h2>
          <p className="text-[#6F6F6F] text-sm mb-6 text-center">
            Choose your preferred sign in method
          </p>

          {/* Social Sign In Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleAppleSignIn}
              disabled={loading}
              className="w-full rounded-2xl h-12 border-2 border-gray-200 hover:border-[#F26B5E] hover:bg-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Sign in with Apple
            </Button>

            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full rounded-2xl h-12 border-2 border-gray-200 hover:border-[#F26B5E] hover:bg-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <ListChecks className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-xs text-[#6F6F6F] font-medium">Chore Scheduling</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xs text-[#6F6F6F] font-medium">Meal Planning</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-xs text-[#6F6F6F] font-medium">AI-Powered</p>
          </div>
        </div>

        {/* Test Mode Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.setItem('testMode', 'true');
              navigate('/');
            }}
            className="text-sm text-[#9C9C9C] hover:text-[#F26B5E] transition-colors underline"
          >
            Continue without login (Test Mode)
          </button>
        </div>
      </div>
    </div>
  );
}