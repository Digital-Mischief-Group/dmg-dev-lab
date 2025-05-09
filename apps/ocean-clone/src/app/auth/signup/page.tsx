"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OceanScene } from "@/components/OceanScene";
import { AnimatedLogo, AnimatedHeading, AnimatedText, AnimatedFormContainer, AnimatedFormItem, AnimatedButton } from "@/components/AnimatedElements";
import { motion } from "framer-motion";

// Wrap images in client-only component to avoid hydration issues
const ClientOnlyImage = ({ src, alt, width, height, ...props }) => {
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // Simulating API call with a timeout
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-black overflow-hidden">
      <div className="absolute h-full w-full overflow-hidden">
        <div className="absolute h-[100vh] w-[100vw] overflow-hidden">
          <div className="absolute z-[1] h-full w-full opacity-50 pointer-events-none"></div>
        </div>
        <OceanScene />
        <div className="pointer-events-none relative flex flex-1 flex-col p-8">
          <AnimatedLogo>
            <Link
              href="/"
              className="origin-top-center pointer-events-auto relative z-10 translate-x-[0%] transition-all duration-700"
            >
              {mounted && (
                <ClientOnlyImage
                  src="https://ext.same-assets.com/2885869193/3783633550.svg"
                  alt="Origin Logo"
                  width={150}
                  height={40}
                />
              )}
            </Link>
          </AnimatedLogo>
          <div className="container z-[2] flex flex-1 flex-col lg:flex-row lg:items-center">
            <div className="pointer-events-none flex flex-1 flex-row items-center"></div>
            <div
              className="pointer-events-auto fixed right-0 top-0 flex h-dvh w-screen flex-1 flex-col justify-end gap-5 border-l border-gray-900 p-8 backdrop-blur-[40px] transition-all duration-700 lg:w-[720px]"
              style={{ background: "rgba(17, 17, 17, 0.01)" }}
            >
              <div className="custom-scrollbar flex flex-1 flex-col justify-between gap-2 overflow-y-auto pt-16 lg:pt-0">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-4">
                    <AnimatedHeading>
                      <h2 className="text-4xl font-light text-white">Create Account</h2>
                    </AnimatedHeading>
                    <AnimatedText>
                      <p className="text-base font-light text-gray-400">
                        Already have an account?{" "}
                        <Link href="/" className="cursor-pointer text-white">
                          Sign In
                        </Link>
                        .
                      </p>
                    </AnimatedText>
                  </div>
                </div>
                <AnimatedFormContainer>
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <AnimatedFormItem>
                      <div className="relative flex w-full flex-row items-start">
                        <input
                          className="flex file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-white border-b border-gray-800 bg-transparent caret-white !px-0 h-10 px-3 py-2 text-base w-full"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </AnimatedFormItem>
                    <AnimatedFormItem delay={0.1}>
                      <div className="flex flex-col gap-5">
                        <button
                          className="uppercase font-mono gap-2 inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none bg-white hover:bg-white/70 text-black disabled:bg-gray-800 disabled:text-gray-900 h-11 px-4 py-2 text-xs"
                          type="submit"
                          disabled={!email || isLoading}
                        >
                          {isLoading ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center"
                            >
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                            </motion.span>
                          ) : (
                            <span>Continue</span>
                          )}
                        </button>
                      </div>
                    </AnimatedFormItem>
                  </form>
                </AnimatedFormContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatedButton delay={0.8}>
        <div className="intercom-lightweight-app fixed bottom-4 right-4 z-50">
          <div className="intercom-lightweight-app-launcher intercom-launcher" role="button" tabIndex={0} aria-label="Open Intercom Messenger" aria-live="polite">
            <div className="intercom-lightweight-app-launcher-icon intercom-lightweight-app-launcher-icon-minimize">
              {mounted && (
                <ClientOnlyImage
                  src="https://ext.same-assets.com/2885869193/2563901416.svg"
                  alt="Chat"
                  width={28}
                  height={28}
                />
              )}
            </div>
          </div>
        </div>
      </AnimatedButton>
    </main>
  );
}
