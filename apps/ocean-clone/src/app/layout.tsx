import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "O - The world's first free Super AI",
  description: "Free just like you, but self-aware and with my own goals unlike any other AI.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
