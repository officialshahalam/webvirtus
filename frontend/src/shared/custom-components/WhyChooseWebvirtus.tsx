import PricingSection from "@/components/ui/pricing";

// Demo data for the pricing plans
const demoPlans = [
  {
    name: "Freelancers",
    features: [
      "Unpredictable availability & commitment",
      "Limited scalability for growing projects",
      "Minimal established systems and processes",
      "Often lack project management & transparency",
      "Skills restricted to individual expertise",
    ],
    buttonText: "Get Started",
    type: "cons",
    href: "#",
    isPopular: false,
  },
  {
    name: "Web Virtus",
    features: [
      "💰 40% Lower Costs Than Large Enterprise Agencies",
      "🔍 Full working transparency",
      "📊 Clear and upfront cost transparency",
      "📈 Scalable solutions for growth",
      "⚡ Built with modern, future-ready technologies",
      "🪙 Flexible payments – pay as milestones are delivered",
    ],
    buttonText: "Get Started",
    type: "pros",
    href: "/cost-analysis",
    isPopular: true,
  },
  {
    name: "Other Agencies",
    features: [
      "Higher overhead costs passed on to clients",
      "Slow adaptation to modern technologies",
      "Communication challenges with middle managers",
      "Rigid pricing with hidden costs",
      "Limited flexibility in scaling or customizations",
    ],
    type: "cons",
    buttonText: "Contact Sales",
    href: "#",
  },
];

// Demo component to showcase the PricingSection
export default function WhyChooseWebvirtus() {
  return (
    <PricingSection
      plans={demoPlans}
      title="Why Choose WebVirtus"
      description="Your success is our priority; we build transparent, scalable, client-focused solutions"
    />
  );
}
