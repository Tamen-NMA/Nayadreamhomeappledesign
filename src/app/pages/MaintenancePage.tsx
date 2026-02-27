import { Coffee, Sparkles, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F3F1] via-[#FDF8F6] to-[#F9F3F1] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden">
          {/* Image Section */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1764290543246-14494218102c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjb29raW5nJTIwa2l0Y2hlbiUyMGhvbWV8ZW58MXx8fHwxNzcyMTk3ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Person cooking in kitchen"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#F26B5E] animate-spin" />
              <span className="text-sm font-semibold text-[#2F2F2F]">Updating</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#F26B5E] to-[#e05a4e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Coffee className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#2F2F2F] mb-4">
              We're Cooking Up Something Special
            </h1>

            {/* Description */}
            <p className="text-lg text-[#6F6F6F] mb-6 max-w-2xl mx-auto leading-relaxed">
              Naya Dream Home is currently being updated to serve you better. 
              We're adding fresh features to help you manage your household with ease.
            </p>

            {/* Status Items */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🍳</span>
                </div>
                <h3 className="font-bold text-[#2F2F2F] mb-1">Meal Planning</h3>
                <p className="text-sm text-[#6F6F6F]">Enhanced recipes & shopping lists</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-teal-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold text-[#2F2F2F] mb-1">Chore Scheduling</h3>
                <p className="text-sm text-[#6F6F6F]">Smarter task management</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border-2 border-purple-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#2F2F2F] mb-1">AI Features</h3>
                <p className="text-sm text-[#6F6F6F]">Intelligent suggestions</p>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F26B5E]/10 to-[#e05a4e]/10 rounded-full px-6 py-3 border-2 border-[#F26B5E]/20">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#F26B5E] rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-[#F26B5E] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-[#F26B5E] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm font-semibold text-[#2F2F2F]">
                Expected back online shortly
              </span>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-[#9C9C9C]">
                Thank you for your patience! 🏡
              </p>
            </div>
          </div>
        </div>

        {/* Sub Text */}
        <p className="text-center text-sm text-[#9C9C9C] mt-6">
          Need help? Contact us at{' '}
          <a 
            href="mailto:support@nayadreamhome.com" 
            className="text-[#F26B5E] hover:underline font-semibold"
          >
            support@nayadreamhome.com
          </a>
        </p>
      </div>
    </div>
  );
}
