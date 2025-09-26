import { cn } from "@/lib/utils";
import { memo, ReactNode } from "react";

type OrbitingCirclesProps = {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
};

const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <section
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={cn(
          "absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10",
          { "[animation-direction:reverse]": reverse },
          className
        )}
      >
        {children}
      </section>
    </>
  );
});

type IconConfig = {
  className?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: () => React.ReactNode;
};

type TechnologyOrbitDisplayProps = {
  iconsArray: IconConfig[];
  text?: string;
};

export const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = "Animated Login",
}: TechnologyOrbitDisplayProps) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-blue-100 text-center text-7xl font-semibold leading-none">
        {text}
      </span>

      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}
    </section>
  );
});
