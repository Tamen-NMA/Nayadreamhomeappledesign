import { Home } from "lucide-react";

interface LiquidGlassLogoProps {
  size?: number;
}

export function LiquidGlassLogo({ size = 96 }: LiquidGlassLogoProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, #F26B5E 0%, #5fb3a6 50%, #F26B5E 100%)",
        }}
      />

      {/* Glass container */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: size * 0.85,
          height: size * 0.85,
          background:
            "linear-gradient(135deg, rgba(242, 107, 94, 0.4) 0%, rgba(95, 179, 166, 0.4) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow:
            "0 8px 32px 0 rgba(242, 107, 94, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)",
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />

        {/* Liquid blobs */}
        <div
          className="absolute rounded-full blur-xl opacity-60"
          style={{
            width: size * 0.4,
            height: size * 0.4,
            top: "-10%",
            right: "-10%",
            background: "rgba(242, 107, 94, 0.6)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-xl opacity-60"
          style={{
            width: size * 0.35,
            height: size * 0.35,
            bottom: "-5%",
            left: "-5%",
            background: "rgba(95, 179, 166, 0.6)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        {/* Home icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Home
            size={size * 0.4}
            className="text-white drop-shadow-lg"
            strokeWidth={2.5}
          />
        </div>

        {/* Top highlight/reflection */}
        <div
          className="absolute top-0 left-0 right-0 h-1/3 rounded-t-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
          }}
        />

        {/* Bottom shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/4 rounded-b-3xl"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            transform: translateX(100%);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10px, -10px) scale(1.1);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
