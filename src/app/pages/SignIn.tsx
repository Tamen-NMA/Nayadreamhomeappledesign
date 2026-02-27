import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import { api } from '../utils/api';
import svgPaths from '../../imports/svg-vspingldlx';

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        toast.success('Signed in successfully!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Email sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Background Gradient Container */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-full"
          style={{ 
            backgroundImage: "linear-gradient(114.785deg, rgb(249, 250, 251) 0%, rgb(255, 255, 255) 50%, rgb(243, 244, 246) 100%)" 
          }}
        >
          {/* Rotated gradient overlay */}
          <div 
            className="absolute top-0 left-0 w-[513px] h-[972px] flex items-center justify-center"
            style={{ transform: "rotate(4.99deg)", transformOrigin: "center" }}
          >
            <div 
              className="w-[433px] h-[938px] opacity-30"
              style={{ 
                backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 433.29 938.07" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(0 -61.388 -53.73 0 86.659 469.04)"><stop stop-color="rgba(242,107,94,0.3)" offset="0"/><stop stop-color="rgba(121,54,47,0.15)" offset="0.25"/><stop stop-color="rgba(0,0,0,0)" offset="0.5"/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 433.29 938.07" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(0 -84.855 -74.269 0 346.64 750.46)"><stop stop-color="rgba(95,179,166,0.3)" offset="0"/><stop stop-color="rgba(48,90,83,0.15)" offset="0.25"/><stop stop-color="rgba(0,0,0,0)" offset="0.5"/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 433.29 938.07" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(0 -80.71 -70.642 0 173.32 187.61)"><stop stop-color="rgba(242,107,94,0.2)" offset="0"/><stop stop-color="rgba(121,54,47,0.1)" offset="0.25"/><stop stop-color="rgba(0,0,0,0)" offset="0.5"/></radialGradient></defs></svg>')`
              }}
            />
          </div>
        </div>

        {/* Blur orbs */}
        <div 
          className="absolute w-[360px] h-[360px] rounded-full opacity-20 blur-[64px] top-[110px] left-[19px]"
          style={{ backgroundImage: "linear-gradient(135deg, rgb(242, 107, 94) 0%, rgb(255, 154, 139) 100%)" }}
        />
        <div 
          className="absolute w-[352px] h-[352px] rounded-full opacity-20 blur-[64px] top-[466px] left-[48px]"
          style={{ backgroundImage: "linear-gradient(135deg, rgb(95, 179, 166) 0%, rgb(125, 211, 192) 100%)" }}
        />
        <div 
          className="absolute w-[279px] h-[279px] rounded-full opacity-15 blur-[40px] top-[516px] left-[133px]"
          style={{ backgroundImage: "linear-gradient(135deg, rgb(242, 107, 94) 0%, rgb(95, 179, 166) 100%)" }}
        />

        {/* Floating dots */}
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-20 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[850px] left-[83px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-85 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[761px] left-[297px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-20 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[698px] left-[231px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-90 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[372px] left-[155px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-20 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[753px] left-[385px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-48 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[176px] left-[53px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-30 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[103px] left-[236px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-22 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[625px] left-[309px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-83 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[27px] left-[53px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-25 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[35px] left-[168px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(242,107,94,0.4)] opacity-69 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[14px] left-[197px]" />
        <div className="absolute w-3 h-3 rounded-full bg-[rgba(95,179,166,0.4)] opacity-41 shadow-[0px_0px_20px_0px_rgba(255,255,255,0.5)] top-[513px] left-[298px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-8 max-w-md mx-auto">
        {/* Hero Section with App Icon */}
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          {/* App Icon */}
          <div className="relative mb-12 mt-20">
            {/* Background blur */}
            <div 
              className="absolute w-[124px] h-[124px] rounded-[24px] opacity-40 blur-[40px] top-0 left-0"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(242, 107, 94) 0%, rgb(95, 179, 166) 50%, rgb(242, 107, 94) 100%)" }}
            />
            
            {/* Icon Container */}
            <div 
              className="relative w-[106px] h-[106px] rounded-[24px] border border-[rgba(255,255,255,0.3)] shadow-[0px_8px_32px_0px_rgba(242,107,94,0.2)] overflow-hidden"
              style={{ 
                backgroundImage: "linear-gradient(135deg, rgba(242, 107, 94, 0.4) 0%, rgba(95, 179, 166, 0.4) 100%)",
                boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.5), 0px 8px 32px 0px rgba(242,107,94,0.2)"
              }}
            >
              {/* Gradient overlay effects */}
              <div 
                className="absolute w-[101px] h-[101px] top-0 left-[43px] opacity-71"
                style={{ backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.3) 50%, rgba(0, 0, 0, 0) 70%)" }}
              />
              <div className="absolute w-[53px] h-[53px] rounded-full bg-[rgba(242,107,94,0.6)] blur-[24px] opacity-60 top-[-23px] left-[73px]" />
              <div className="absolute w-[38px] h-[38px] rounded-full bg-[rgba(95,179,166,0.6)] blur-[24px] opacity-60 top-[77px] left-[-12px]" />
              
              {/* Home Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[50px] h-[50px]">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 58.4445 60.5139">
                    <g filter="url(#filter0_d_11_1141)">
                      <path d={svgPaths.p4d9f0c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.17616" />
                      <path d={svgPaths.p1e390900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.17616" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="65.6911" id="filter0_d_11_1141" width="65.6911" x="-3.62331" y="-1.55392">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="4" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_11_1141" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_11_1141" mode="normal" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              
              {/* Top gradient */}
              <div 
                className="absolute top-0 left-0 right-0 h-[35px] rounded-tl-[24px] rounded-tr-[24px]"
                style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(0,0,0,0))" }}
              />
              {/* Bottom gradient */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[26px] rounded-bl-[24px] rounded-br-[24px]"
                style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2))" }}
              />
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-[36px] font-bold leading-[45px] text-[#101828] tracking-[0.37px] mb-2">
              Manage your home,
            </h1>
            <p 
              className="text-[36px] font-bold leading-[45px] tracking-[0.37px] bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, rgb(242, 107, 94) 0%, rgb(95, 179, 166) 100%)" }}
            >
              effortlessly
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-center text-[16px] font-medium leading-[26px] text-[#364153] tracking-[-0.31px] max-w-[323px]">
            Plan meals, track chores, and organize your household
          </p>
        </div>

        {/* Sign In Options */}
        {!showEmailLogin ? (
          <div className="w-full space-y-3 pb-4">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 bg-white border border-white rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex items-center justify-center gap-3 hover:shadow-[0px_12px_18px_0px_rgba(0,0,0,0.12),0px_5px_7px_0px_rgba(0,0,0,0.12)] transition-shadow disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M18.17 8.35H9.29v3.34h5.18c-.43 1.22-1.76 2.85-4.35 2.85-2.62 0-4.76-2.17-4.76-4.85s2.14-4.85 4.76-4.85c1.49 0 2.49.64 3.07 1.19l2.63-2.53C14.46 2.18 12.03 1 9.29 1 4.8 1 1.16 4.64 1.16 9.14s3.64 8.14 8.13 8.14c4.69 0 7.81-3.3 7.81-7.94 0-.53-.05-1-.12-1.43z" fill="#4285F4"/>
                <path d="M2.38 5.8L5.38 8.06c.61-1.82 2.32-3.14 4.37-3.14 1.49 0 2.49.64 3.07 1.19l2.63-2.53C14.1 2.26 11.67 1.08 8.93 1.08c-2.62 0-4.94 1.35-6.26 3.39l-.29.33z" fill="#EA4335"/>
                <path d="M9.29 17.28c2.67 0 5.04-1.11 6.71-2.92l-3.08-2.61c-.85.58-1.94.94-3.13.94-2.57 0-4.76-1.69-5.55-3.99l-3.04 2.34c1.32 2.62 4.02 4.24 7.09 4.24z" fill="#34A853"/>
                <path d="M3.92 9.69c-.22-.64-.35-1.33-.35-2.04s.13-1.4.35-2.04L.88 3.27C.31 4.41 0 5.72 0 7.13s.31 2.72.88 3.86l3.04-2.3z" fill="#FBBC05"/>
              </svg>
              <span className="text-[17px] font-semibold text-black tracking-[-0.43px]">
                Continue with Google
              </span>
            </button>

            {/* Apple Sign In */}
            <button
              onClick={handleAppleSignIn}
              disabled={loading}
              className="w-full h-14 bg-black border border-black rounded-full flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p2c758c00} fill="#F26B5E" />
                <path d={svgPaths.p211b2a80} stroke="#F26B5E" strokeLinecap="round" strokeWidth="1.36355" />
              </svg>
              <span className="text-[17px] font-semibold text-white tracking-[-0.43px]">
                Continue with Apple
              </span>
            </button>
          </div>
        ) : (
          /* Email Login Form */
          <form onSubmit={handleEmailSignIn} className="w-full space-y-3 pb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-14 bg-white border border-[#E5E7EB] rounded-full px-6 text-[17px] focus:outline-none focus:border-[#F26B5E] transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full h-14 bg-white border border-[#E5E7EB] rounded-full px-6 text-[17px] focus:outline-none focus:border-[#F26B5E] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#F26B5E] border border-[#F26B5E] rounded-full flex items-center justify-center gap-3 hover:bg-[#E15A4E] transition-colors disabled:opacity-50"
            >
              <span className="text-[17px] font-semibold text-white tracking-[-0.43px]">
                {loading ? 'Signing in...' : 'Sign In'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowEmailLogin(false)}
              className="w-full text-center text-sm text-[#9C9C9C] hover:text-[#F26B5E] transition-colors underline pt-2"
            >
              Back to social login
            </button>
          </form>
        )}

        {/* Email Login Toggle / Test Mode Link */}
        {!showEmailLogin && (
          <>
            <button
              onClick={() => setShowEmailLogin(true)}
              className="text-sm text-[#9C9C9C] hover:text-[#F26B5E] transition-colors underline pb-2"
            >
              Sign in with Email & Password
            </button>
            <button
              onClick={() => {
                localStorage.setItem('testMode', 'true');
                navigate('/');
              }}
              className="text-sm text-[#9C9C9C] hover:text-[#F26B5E] transition-colors underline pb-4"
            >
              Continue without login (Test Mode)
            </button>
          </>
        )}
      </div>
    </div>
  );
}