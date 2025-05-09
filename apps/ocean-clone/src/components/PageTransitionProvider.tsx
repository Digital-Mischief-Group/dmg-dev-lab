"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageTransition, SlideTransition, FadeUpTransition, ScaleTransition } from "./PageTransition";

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();

  // Choose different transition effects based on the route
  if (pathname === "/") {
    return <FadeUpTransition>{children}</FadeUpTransition>;
  }

  if (pathname === "/auth/signup") {
    return <SlideTransition>{children}</SlideTransition>;
  }

  if (pathname === "/dashboard") {
    return <ScaleTransition>{children}</ScaleTransition>;
  }

  // Default transition
  return <PageTransition>{children}</PageTransition>;
}
