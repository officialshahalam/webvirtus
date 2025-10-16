import { Scene } from "@/components/ui/hero-section";
import { Badge } from "@/components/ui/badge";
import { Cpu, ShieldCheck, Layers, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Cpu,
    title: "Performance",
    description: "Ultra-fast data processing in every situation.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description: "Advanced protection for complete peace of mind.",
  },
  {
    icon: Layers,
    title: "Modularity",
    description: "Easy integration with existing architecture.",
  },
  {
    icon: Zap,
    title: "Responsiveness",
    description: "Instant response to every command.",
  },
];

const Hero = () => {
  return (
    <div className="min-h-svh w-screen bg-linear-to-tr from-blue-300 to-blue-400 text-white flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 pt-28 md:pt-32 lg:pt-35">
      <div className="w-full space-y-8 md:space-y-10 lg:space-y-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-7 lg:space-y-8">
          <Badge
            variant="secondary"
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm"
          >
            ✨ Next Generation Tools
          </Badge>

          <div className="space-y-4 md:space-y-5 lg:space-y-6 flex items-center justify-center flex-col">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight w-full md:w-2/3">
              Building Digital Products that Power Startups
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-neutral-300 leading-relaxed w-full md:w-2/3">
              From web platforms to mobile apps, we craft scalable,
              high-performance solutions to accelerate your startup journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center w-full sm:w-auto">
              <Link
                href={"/cost-analysis"}
                className="text-xs md:text-sm px-6 md:px-7 lg:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white text-black border border-white/10 shadow-none hover:bg-white/90 transition-all duration-200 w-full sm:w-auto text-center font-medium"
              >
                Start a Project
              </Link>
              <Link
                href={"/services"}
                className="text-xs md:text-sm px-6 md:px-7 lg:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-all duration-200 w-full sm:w-auto text-center font-medium"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 h-32 md:h-40 lg:h-48 flex flex-col justify-start items-start space-y-2 md:space-y-2.5 lg:space-y-3 hover:bg-white/8 transition-all duration-300"
            >
              <feature.icon
                size={16}
                className="text-white/80 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0"
              />
              <h3 className="text-xs md:text-sm lg:text-base font-medium text-white leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs md:text-xs lg:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0">
        <Scene />
      </div>
    </div>
  );
};

export { Hero };
