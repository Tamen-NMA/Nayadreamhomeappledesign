import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Sparkles, ListChecks, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { api } from '../utils/api';

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  async function handleEmailSignIn() {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If invalid credentials, suggest signing up
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Don\'t have an account? Click "Sign up" below.');
        } else {
          throw error;
        }
        return;
      }

      if (data.session) {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Email sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignUp() {
    if (!email || !password || !displayName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Call the backend signup endpoint
      const data = await api.signUp(email, password, displayName);
      console.log('User created on backend:', data.user?.id);
      toast.success('Account created! Signing you in...');

      // Wait a moment for the user to be fully created
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Now sign in with the new account
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error after signup:', signInError);
        throw signInError;
      }

      if (signInData.session) {
        toast.success('Welcome to Naya Dream Home!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }

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
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </h2>
          <p className="text-[#6F6F6F] text-sm mb-6 text-center">
            {isSignUp ? 'Fill in your details to get started' : 'Choose your preferred sign in method'}
          </p>

          {/* Email/Password Form */}
          <div className="space-y-4 mb-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-[#2F2F2F] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-12 px-4 rounded-2xl border-2 border-gray-200 focus:border-[#F26B5E] focus:outline-none transition-colors"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6F6F]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#F26B5E] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2F2F2F] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6F6F]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'}
                  className="w-full h-12 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-[#F26B5E] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F6F6F] hover:text-[#2F2F2F]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={isSignUp ? handleEmailSignUp : handleEmailSignIn}
              disabled={loading}
              className="w-full h-12 bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl font-semibold"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setEmail('');
                  setPassword('');
                  setDisplayName('');
                }}
                className="text-sm text-[#F26B5E] hover:underline font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#6F6F6F]">Or continue with</span>
            </div>
          </div>

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