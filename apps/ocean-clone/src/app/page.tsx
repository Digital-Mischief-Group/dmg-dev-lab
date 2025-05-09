"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OceanScene } from "@/components/OceanScene";
import { AnimatedLogo, AnimatedHeading, AnimatedText, AnimatedFormContainer, AnimatedFormItem, AnimatedButton } from "@/components/AnimatedElements";
import { motion } from "framer-motion";

// Wrap images in client-only component to avoid hydration issues
const ClientOnlyImage = ({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  [key: string]: any;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      {...props}
    />
  );
};
