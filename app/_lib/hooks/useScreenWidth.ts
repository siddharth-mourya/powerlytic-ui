import { useEffect, useState } from "react";

// Tailwind CSS default breakpoints (in pixels)
const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof TAILWIND_BREAKPOINTS;

export interface ScreenSize {
  width: number;
  currentBreakpoint: BreakpointKey | "xs";
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  // Convenient aliases
  isMobile: boolean; // < sm
  isTablet: boolean; // >= sm and < lg
  isDesktop: boolean; // >= lg
}

/**
 * Hook to detect current screen width and responsive breakpoints
 * Dynamically synced with Tailwind CSS breakpoints
 *
 * @returns {ScreenSize} Screen size information with breakpoint states
 *
 * @example
 * const { isMobile, isDesktop, currentBreakpoint } = useScreenWidth();
 */
export function useScreenWidth(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    currentBreakpoint: "xs",
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2Xl: false,
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Determine current breakpoint
      let currentBreakpoint: BreakpointKey | "xs" = "xs";
      if (width >= TAILWIND_BREAKPOINTS["2xl"]) {
        currentBreakpoint = "2xl";
      } else if (width >= TAILWIND_BREAKPOINTS.xl) {
        currentBreakpoint = "xl";
      } else if (width >= TAILWIND_BREAKPOINTS.lg) {
        currentBreakpoint = "lg";
      } else if (width >= TAILWIND_BREAKPOINTS.md) {
        currentBreakpoint = "md";
      } else if (width >= TAILWIND_BREAKPOINTS.sm) {
        currentBreakpoint = "sm";
      }

      setScreenSize({
        width,
        currentBreakpoint,
        isSm: width >= TAILWIND_BREAKPOINTS.sm,
        isMd: width >= TAILWIND_BREAKPOINTS.md,
        isLg: width >= TAILWIND_BREAKPOINTS.lg,
        isXl: width >= TAILWIND_BREAKPOINTS.xl,
        is2Xl: width >= TAILWIND_BREAKPOINTS["2xl"],
        // Aliases
        isMobile: width < TAILWIND_BREAKPOINTS.sm,
        isTablet:
          width >= TAILWIND_BREAKPOINTS.sm && width < TAILWIND_BREAKPOINTS.lg,
        isDesktop: width >= TAILWIND_BREAKPOINTS.lg,
      });
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
