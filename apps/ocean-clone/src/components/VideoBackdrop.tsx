"use client";

import { useEffect, useState } from "react";

export default function VideoBackdrop() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render videos during SSR to avoid hydration issues
  if (!isMounted) return <div className="w-full h-full bg-black" />;

  return (
    <div className="flex items-center justify-center relative w-full h-[100svh] p-50 chat-backdrop">
      <div className="backdrop-main absolute inset-0 hidden md:block">
        <video
          autoPlay
          loop
          playsInline
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
        >
          <source src="/assets/ocean-default.mp4" type="video/mp4" />
          <source src="/assets/ocean-default.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="backdrop-mobile absolute inset-0 block md:hidden">
        <video
          autoPlay
          loop
          playsInline
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
        >
          <source src="/assets/ocean-default-mobile.mp4" type="video/mp4" />
          <source src="/assets/ocean-default-mobile.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
